import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { Redis } from 'ioredis';

import { appConfig } from './config/appConfig';
import { krakenRoutes } from './routes/krakenRoutes';

// load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

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
};

// setup server
const server = fastify({ logger: envToLogger['development'] });

// register plugins
server.register(cors);
server.register(helmet);

// register routes
server.register(krakenRoutes);

const port = appConfig.get('Port');
const host = appConfig.get('Host');

// clear redis cache on startup
const redisPort = appConfig.get('Redis.Port');
const redisHost = appConfig.get('Redis.Host');
const redis = new Redis({ host: redisHost, port: redisPort, });

console.log('Clearing redis cache');
redis.flushall()
  .then(() => console.log('Redis cache cleared'))
  .finally(() => redis.quit());

console.log(`Starting server on ${host}:${port}`);

// run server
server.listen({ port, host });