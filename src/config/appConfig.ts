import convict from 'convict';

import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = convict({
  IsTest: {
    doc: 'Is this a test environment?',
    format: 'Boolean',
    default: process.env.TEST ? true : false
  },
  Port: {
    doc: 'The port to bind.',
    format: 'Number',
    default: process.env.PORT ? parseInt(process.env.PORT) : 4000
  },
  Host: {
    doc: 'The host to bind.',
    format: 'String',
    default: '0.0.0.0'
  },

  // https://docs.kraken.com/rest/
  Kraken: {
    ApiKey: {
      doc: 'The API key for the Kraken API.',
      format: 'String',
      default: process.env.KRAKEN_API_KEY || ''
    },
    PrivateKey: {
      doc: 'The private key for the Kraken API.',
      format: 'String',
      default: process.env.KRAKEN_PRIVATE_KEY || ''
    },
    BaseUrl: {
      doc: 'The base url for the Kraken API.',
      format: 'String',
      default: 'https://api.kraken.com'
    },
    ApiVersion: {
      doc: 'The API version for the Kraken API.',
      format: 'String',
      default: '0'
    },
    Endpoints: {
      Balance: {
        doc: 'The endpoint for the account balance.',
        format: 'String',
        default: '/private/Balance'
      },
      TradeBalance: {
        doc: 'The endpoint for the trade balance.',
        format: 'String',
        default: '/private/TradeBalance'
      },
      TradesHistory: {
        doc: 'The endpoint for the trade history.',
        format: 'String',
        default: '/private/TradesHistory'
      },
      Staking: {
        doc: 'The endpoint for the staking balance.',
        format: 'String',
        default: '/private/Staking/Transactions'
      },
      Ledgers: {
        doc: 'The endpoint for the ledgers.',
        format: 'String',
        default: '/private/Ledgers'
      },
      Ticker: {
        doc: 'The endpoint for the ticker info.',
        format: 'String',
        default: '/public/Ticker'
      }
    }
  },
  Redis: {
    Host: {
      doc: 'The host for the Redis server.',
      format: 'String',
      default: process.env.REDIS_HOST || 'localhost'
    },
    Port: {
      doc: 'The port for the Redis server.',
      format: 'Number',
      default: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
    },
    DefaultCacheTime: {
      doc: 'The default cache time for Redis.',
      format: 'Number',
      default: 60 // 1 minute
    }
  }
});
