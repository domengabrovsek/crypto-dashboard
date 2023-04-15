import { FastifyInstance } from 'fastify';

import {
  getStakingTransactions,
  getAccountBalance,
  getTradeHistory,
  getLedgerInfo
} from '../kraken';

import { getCurrentPrice } from '../coingecko';
import { Crypto } from 'shared/constants/enums';
import { AccountBalance } from 'shared/types/Account';

export const krakenRoutes = async (server: FastifyInstance) => {

  server.get('/account-balance', async (request, reply) => {

    // list of all kraken assets and their balance
    const krakenAssets = await getAccountBalance();

    // get the current price of each asset
    const currentPrices = await Promise.all(krakenAssets.map(async ({ asset }) => {
      return getCurrentPrice(asset as Crypto);
    }));

    // map the current price to the asset
    const accountBalance: AccountBalance = currentPrices.map((currentPrice) => {

      const krakenAsset = krakenAssets.find(({ asset }) => asset === currentPrice.id);

      return {
        name: currentPrice.name,
        ticker: currentPrice.id,
        balance: krakenAsset?.balance || 0,
        currentPrice: currentPrice.price,
        valueEur: currentPrice.price * (krakenAsset?.balance || 0)
      }
    });

    reply.send(accountBalance);
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