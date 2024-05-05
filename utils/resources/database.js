const mysql = require("mysql2");
require('dotenv').config()

const   data=process.env

const pool = mysql.createPool({
  host: data.DATABASEHOST,
  user: data.DATABASEUSER,
  database: data.DATABASENAME,
  password: data.DATABASEPASSWORD
});

module.exports = pool.promise();
