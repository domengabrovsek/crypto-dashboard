import { FastifyInstance } from 'fastify';

import {
  getStakingTransactions,
  getAccountBalance,
  getTradeHistory,
  getLedgerInfo
} from '../kraken';

export const krakenRoutes = async (server: FastifyInstance) => {

  server.get('/kraken/balance', async (request, reply) => {
    const response = await getAccountBalance();
    reply.send(response);
  });

  server.get('/kraken/staking', async (request, reply) => {
    const response = await getStakingTransactions();
    reply.send(response);
  });

  server.get('/kraken/trade-history', async (request, reply) => {
    const response = await getTradeHistory();
    reply.send(response);
  });

  server.get('/kraken/ledgers', async (request, reply) => {
    const response = await getLedgerInfo();
    reply.send(response);
  });
}