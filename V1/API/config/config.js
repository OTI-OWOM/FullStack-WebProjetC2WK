const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_NAME,
    password: process.env.MYSQL_PWD,
    database: "C2WK",
    host: process.env.DB_URL,
    port: 3306,
    dialect: 'mariadb',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
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