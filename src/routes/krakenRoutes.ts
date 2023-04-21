import { FastifyInstance } from 'fastify';
import { Redis } from 'ioredis';

import {
  getStakingTransactions,
  getAccountBalance,
  getTradeHistory,
  getTickerInfo
} from '../kraken';

import { getTokenInfo } from '../coingecko';
import { Crypto } from 'shared/constants/enums';
import { mapFromKrakenTicker } from '../lib/AssetMapper';
import { KrakenTicker } from '../types/Kraken';
import { AccountBalance, StakingTransaction, Trade } from '../../shared/types/Account';
import { appConfig } from '../config/appConfig';

const redisPort = appConfig.get('Redis.Port');
const redisHost = appConfig.get('Redis.Host');
const defaultCacheTime = appConfig.get('Redis.DefaultCacheTime');

// connect to default redis instance
const redis = new Redis({ host: redisHost, port: redisPort, });

export const krakenRoutes = async (server: FastifyInstance) => {

  // endpoint which returns the account balance for all assets
  server.get('/account-balance', async (request, reply) => {

    let response: AccountBalance;

    const cachedResponse = await redis.get('kraken-account-balance');

    if (cachedResponse) {
      console.log('using cached response');
      response = JSON.parse(cachedResponse) as AccountBalance;
    } else {
      // list of all kraken assets and their balance
      const allAssets = await getAccountBalance();

      // get the current price of each asset
      const promises = Object.keys(allAssets)
        .filter(ticker => ticker !== 'ZEUR')
        .map(ticker => mapFromKrakenTicker(ticker as KrakenTicker))
        .map(asset => getTokenInfo(asset as Crypto));

      const tokensInfo = await Promise.all(promises);

      // map the current price to the asset
      response = Object.keys(allAssets).map(krakenTicker => {
        const balance = allAssets[krakenTicker as KrakenTicker];
        const tokenInfo = tokensInfo.find(token => token.id === mapFromKrakenTicker(krakenTicker as KrakenTicker))

        return {
          name: tokenInfo?.name || '',
          ticker: tokenInfo?.symbol || '',
          krakenTicker: krakenTicker,
          balance: balance,
          currentPrice: tokenInfo?.price || 0,
          priceEur: parseFloat(((tokenInfo?.price || 0) * balance).toFixed(5)),
          isStaking: krakenTicker.includes('.S')
        }
      })
        .filter(token => token.priceEur > 0)
        .sort((a, b) => a.krakenTicker > b.krakenTicker ? 1 : -1);

      // cache the response for 5 minutes
      await redis.set('kraken-account-balance', JSON.stringify(response), 'EX', defaultCacheTime);
    }

    reply.send(response);
  });

  // endpoint which returns staking transactions
  server.get('/staking', async (request, reply) => {

    let response: StakingTransaction[];

    const cachedResponse = await redis.get('kraken-staking-transactions');

    if (cachedResponse) {
      console.log('using cached response');
      response = JSON.parse(cachedResponse) as StakingTransaction[];
    } else {
      response = await getStakingTransactions();

      // cache the response for 5 minutes
      await redis.set('kraken-staking-transactions', JSON.stringify(response), 'EX', defaultCacheTime);
    }

    reply.send(response);
  });

  // endpoint which returns trade history
  server.get('/trade-history', async (request, reply) => {

    let response: Trade[];
    const cachedResponse = await redis.get('kraken-trade-history');

    if (cachedResponse) {
      console.log('using cached response');
      response = JSON.parse(cachedResponse) as Trade[];
    } else {
      response = await getTradeHistory();

      // cache the response for 5 minutes
      await redis.set('kraken-trade-history', JSON.stringify(response), 'EX', defaultCacheTime);
    }

    reply.send(response);
  });

  // endpoint which returns the current price of an asset
  server.get('/ticker', async (request, reply) => {

    const { cryptoTicker, fiatTicker } = request.query as any;

    const response = await getTickerInfo(cryptoTicker, fiatTicker);
    reply.send(response);
  });

}