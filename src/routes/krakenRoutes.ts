import { FastifyInstance } from 'fastify';

import {
  getStakingTransactions,
  getAccountBalance,
  getTradeHistory,
  getLedgerInfo
} from '../kraken';

import { getTokenInfo } from '../coingecko';
import { Crypto } from 'shared/constants/enums';
import { mapFromKrakenAsset } from '../lib/AssetMapper';
import { KrakenAsset } from '../types/Kraken';
import { AccountBalance } from '../../shared/types/Account';

export const krakenRoutes = async (server: FastifyInstance) => {

  server.get('/account-balance', async (request, reply) => {
    // list of all kraken assets and their balance
    const allAssets = await getAccountBalance();

    // get the current price of each asset
    const promises = Object.keys(allAssets)
      .filter(ticker => ticker !== 'ZEUR')
      .map(ticker => mapFromKrakenAsset(ticker as KrakenAsset))
      .map(asset => getTokenInfo(asset as Crypto));

    const tokensInfo = await Promise.all(promises);

    // map the current price to the asset
    const response: AccountBalance = Object.keys(allAssets).map(krakenTicker => {
      const balance = allAssets[krakenTicker as KrakenAsset];
      const tokenInfo = tokensInfo.find(token => token.id === mapFromKrakenAsset(krakenTicker as KrakenAsset))

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

    reply.send(response);
  });

  server.get('/staking', async (request, reply) => {
    const response = await getStakingTransactions();
    reply.send(response);
  });

  server.get('/trade-history', async (request, reply) => {
    const response = await getTradeHistory();
    reply.send(response);
  });

  const response = await getLedgerInfo();
  server.get('/ledgers', async (request, reply) => {
    reply.send(response);
  });
}