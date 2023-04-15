import { FastifyInstance } from 'fastify';

import { Crypto, Fiat } from '../../shared/constants/enums';
import { getTokenInfo } from '../coingecko';

export const cryptoRoutes = async (server: FastifyInstance) => {

  interface IQuerystring {
    crypto: Crypto;
    fiat: Fiat;
  }

  server.get<{ Querystring: IQuerystring }>('/crypto/current-price', async (request, reply) => {

    const { crypto, fiat } = request.query;

    const response = await getTokenInfo(crypto, fiat);
    reply.send(response);

  });
}