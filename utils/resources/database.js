const mysql = require('mysql2')

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "ai store",
  password: "Which1isit?",
});

module.exports = pool.promise();
