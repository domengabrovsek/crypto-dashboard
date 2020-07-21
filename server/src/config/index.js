const config = require('./config.json');

// set environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  // default port
  port: 3030,

  // winston logging (error, warn, info, http, verbose, debug, silly)
  logs: {
    level: 'silly'
  },

  // crypto accounts
  accounts: {
    XLM: ""
  },

  kraken: {
    publicUri: 'https://api.kraken.com/0/public',
    privateUri: 'https://api.kraken.com/0/private',
    apiKey: config.kraken.apiKey,
    apiPrivateKey: config.kraken.apiPrivateKey
  }
};
