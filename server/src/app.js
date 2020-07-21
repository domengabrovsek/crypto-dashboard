'use strict';

const express = require('express');
const Logger = require('./loaders/logger');

async function startServer() {

  const { port } = require('./config/index');
  const app = express();

  // load on startup
  await require('./loaders/index')({ app });

  app.listen(port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }

    Logger.info(`Server listening on port: ${port}`);
  });
}

startServer();
