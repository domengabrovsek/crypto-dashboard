import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

import { appConfig } from './config/appConfig';
import { krakenRoutes } from './routes/krakenRoutes';

// setup logger
const envToLogger = {
  development: {
    // trace	debug	info	warn	error	fatal	silent
    level: 'error',
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

// run server
server.listen({
  port: appConfig.get('Port'),
  host: appConfig.get('Host')
});