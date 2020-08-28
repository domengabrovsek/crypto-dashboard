const sql = require('mssql');
const Sequelize = require('sequelize');
const Logger = require('./logger');

const createDefaultDbIfNotExists = async (options) => {
  const query = `if(db_id(N'${process.env.DB_NAME}') IS NULL) create database ${process.env.DB_NAME};`

  await sql.connect(options)
    .then(async (conn) => await conn.query(query))
    .catch(error => {
      Logger.error(`Error while trying to connect to master!`);
      Logger.error(error);
      throw (error);
    })
}

module.exports = async () => {

  // mssql options
  const options = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.HOST,
    database: process.env.DB_DEFAULT_NAME,
    options: {
      validateBulkLoadParameters: true,
      enableArithAbort: true
    }
  };

  // if database doesn't exists, create it, otherwise just connect to it
  await createDefaultDbIfNotExists(options);

  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
  });

  await sequelize
    .authenticate()
    .then(() => {
      Logger.info(`Successfully estabilished connection to database: ${process.env.DB_NAME}`);
    })
    .catch(error => {
      Logger.error(`Error while trying to connect to database: ${process.env.DB_NAME}`);
      Logger.error(error);
    });
}
