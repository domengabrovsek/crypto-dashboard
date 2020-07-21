const expressLoader = require('./express');
const Logger = require('./logger');

module.exports = async ({ app }) => {
  Logger.info('TODO: Add database connection!');

  await expressLoader({ app });
  Logger.info('Express loaded!');
};
