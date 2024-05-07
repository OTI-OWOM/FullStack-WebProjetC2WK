const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: process.env.MYSQL_NAME,
    password: process.env.MYSQL_PWD,
    database: "C2WK"
}).promise();


async function fetchData() {
    const [res] = await pool.query("SELECT * FROM Users WHERE id=2");
    pool.end()

    return res
}

fetchData().then(function(res) {
    console.log(res);
})
