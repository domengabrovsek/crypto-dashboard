import { appConfig } from './config/appConfig';

import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

const server = fastify({ logger: true });

server.register(cors);
server.register(helmet);

server.listen({
  port: appConfig.get('Port'),
  host: appConfig.get('Host')
});