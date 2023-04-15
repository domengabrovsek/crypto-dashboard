import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

import { appConfig } from './config/appConfig';
import { krakenRoutes } from './routes/krakenRoutes';
import { cryptoRoutes } from './routes/cryptoRoutes';

// setup logger
const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname'
      }
    }
  },
  production: true,
  test: false
}

const server = fastify({ logger: envToLogger['development'] });

// register plugins
server.register(cors);
server.register(helmet);

// register routes
server.register(krakenRoutes);
server.register(cryptoRoutes);

// run server
server.listen({
  port: appConfig.get('Port'),
  host: appConfig.get('Host')
});