import { FastifyInstance } from 'fastify';
import { Redis } from 'ioredis';

import { getTradesHistory, getStakingTransactions, getAccountBalance, getAssetPrices, getLedgerInfo } from '../services/kraken-service';
import { appConfig } from '../config/appConfig';
import { createEventHandler } from '../db/db';

const redisPort = appConfig.get('Redis.Port');
const redisHost = appConfig.get('Redis.Host');
const defaultCacheTime = appConfig.get('Redis.DefaultCacheTime');

// connect to default redis instance
const redis = new Redis({ host: redisHost, port: redisPort, });

export const krakenRoutes = async (server: FastifyInstance) => {

  // endpoint which returns the account balance for all assets
  server.get('/account-balance', async (request, reply) => {

    let response;

    const cachedResponse = await redis.get('kraken-account-balance');

    if (cachedResponse) {
      console.log('Used cached response - "kraken-account-balance"')
      response = JSON.parse(cachedResponse);
    } else {

      const accountBalance = await getAccountBalance();
      response = accountBalance;

      // cache the response
      await redis.set('kraken-account-balance', JSON.stringify(response), 'EX', defaultCacheTime);
    }

    reply.send(response);
  });

  // endpoint which returns staking transactions
  server.get('/staking', async (request, reply) => {

    let response;

    const cachedResponse = await redis.get('kraken-staking-transactions');

    if (cachedResponse) {
      console.log('Used cached response - "kraken-staking-transactions"')
      response = JSON.parse(cachedResponse);
    } else {

      const stakingTransactions = await getStakingTransactions();
      response = stakingTransactions;

      // cache the response
      await redis.set('kraken-staking-transactions', JSON.stringify(response), 'EX', defaultCacheTime);
    }

    reply.send(response);
  });

  // endpoint which returns trade history
  server.get('/trade-history', async (request, reply) => {

    let response;

    const cachedResponse = await redis.get('kraken-trade-history');

    if (cachedResponse) {
      console.log('Used cached response - "kraken-trade-history"');
      response = JSON.parse(cachedResponse);
    } else {
      response = await getTradesHistory();

      // cache the response
      console.log('Caching response - "kraken-trade-history"');
      await redis.set('kraken-trade-history', JSON.stringify(response), 'EX', defaultCacheTime);
    }

    reply.send(response);
  });

  // endpoint which syncs all ticker prices into redis
  server.get('/sync-prices', async (request, reply) => {

    const response = await getAssetPrices();

    // cache the response
    console.log('Caching response - "kraken-asset-prices"');
    await redis.set('kraken-asset-prices', JSON.stringify(response), 'EX', defaultCacheTime);

    reply.send(response);
  });

  // Endpoint to synchronize trading data from Kraken to DynamoDB
  server.get('/sync/kraken', async (request, reply) => {

    let ofs = 0; // Offset for Kraken API ledger data request
    let completeLedger: { [key: string]: any } = {}; // Stores all the ledger entries from Kraken API

    while (true) {
      const params = { ofs }; // Parameters for Kraken API
      const ledgerData = await getLedgerInfo(params); // Fetch ledger data from Kraken

      // If there's no ledger data left to fetch from Kraken, break the loop
      if (!ledgerData || Object.keys(ledgerData?.ledger).length === 0) {
        console.log('No more ledger entries');
        break;
      }

      // Merge the newly fetched ledger entries with the previously fetched entries
      completeLedger = { ...completeLedger, ...ledgerData.ledger };

      // Increment the offset to fetch the next page of ledger entries
      ofs = Object.keys(ledgerData.ledger).length + ofs;
    }

    // Prepare the result, which includes the complete ledger and the total count of ledger entries
    const result = {
      ledger: completeLedger,
      count: Object.keys(completeLedger).length,
    };

    // Transform the ledger entries from an object to an array and normalize the data
    const response = Object
      .values(result.ledger)
      .map((trade: any) => ({
        amount: trade.amount, // Amount of the asset being traded
        asset: trade.asset, // The asset being traded
        balance: trade.balance, // Balance after the trade
        fee: trade.fee, // Fee paid for the trade
        refid: trade.refid, // Unique reference ID for the trade
        time: new Date(parseInt(trade.time) * 1000).toISOString(), // Time of the trade
        type: trade.type, // Type of the trade (buy/sell)
      }));

    // Save the normalized ledger entries to DynamoDB using the event handler
    await Promise.all(response.map(trade => createEventHandler(trade)));

    // Send the ledger entries back in the response
    reply.send(response);
  });

}
