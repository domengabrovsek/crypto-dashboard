import { FastifyInstance } from 'fastify';
import { Redis } from 'ioredis';

import { getTradesHistory, getStakingTransactions, getAccountBalance, getAssetPrices } from '../services/kraken-service';
import { appConfig } from '../config/appConfig';

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
}
