const mariadb = require('mariadb');
require('dotenv').config();


const pool = mariadb.createPool({
     host: process.env.MYSQL_URL, 
     user: process.env.MYSQL_NAME, 
     password: process.env.MYSQL_PWD,
     database: "C2WK",
     port: 3306,
     connectionLimit: 15
});

async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection()    
        .then(() => console.log('Connected to MariaDB successfully !'))
        .catch((error) => console.log(`MariaDB connection failed !\n${error}`));;
	// const rows = await conn.query("SELECT 1 as val");
	// console.log(rows); //[ {val: 1}, meta: ... ]
	// const res = await conn.query("INSERT INTO TestTable (Name, Age) VALUES (?, ?)", ["mariadb", 6]);
	// console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
    console.log(err)
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

async function getTest() {
  const [rows] = await pool.query(`
  SELECT * 
  FROM TestTable
  `);
  return rows;
}

async function main() {
  try {
    const test = await asyncFunction();
    console.log(test);
  } catch (error) {
    console.error('Error:', error);
  }
}


const db = require("./models");

module.exports = db;
