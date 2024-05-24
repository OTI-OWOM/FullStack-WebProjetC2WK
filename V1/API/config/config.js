const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database:  process.env.DEV_DB_NAME,
    host: process.env.DB_URL,
    port:  Number(process.env.DEV_DB_PORT),
    dialect: 'mariadb',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  recette: {
    username: process.env.RCT_DB_USERNAME,
    password: process.env.RCT_DB_PASSWORD,
    database: process.env.RCT_DB_NAME,
    host: process.env.RCT_DB_URL,
    port: process.env.RCT_DB_PORT,
    dialect: 'mariadb',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mariadb'
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mariadb-ca-main.crt')
    //   }
    // }
  }
};