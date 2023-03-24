import { appConfig } from './config/appConfig';
import { invokeKrakenApi } from './kraken';

import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';


const server = fastify({ logger: true });

server.register(cors);
server.register(helmet);

server.get('/kraken/balance', async (request, reply) => {
  const response = await invokeKrakenApi('Balance');
  reply.send(response);
});

server.listen({
  port: appConfig.get('Port'),
  host: appConfig.get('Host')
});