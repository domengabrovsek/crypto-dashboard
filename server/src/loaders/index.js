const expressLoader = require('./express');
const dbLoader = require('./db');
const Logger = require('./logger');

module.exports = async ({ app }) => {

  await dbLoader();
  Logger.info('Database loaded!');

  expressLoader({ app });
  Logger.info('Express loaded!');
};
