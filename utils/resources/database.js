const mysql = require('mysql2')

const pool = mysql.createPool({
  host: "zpj83vpaccjer3ah.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user: "b8bysgy5n652b51k",
  database: "td3jk8bmljxi8x9t",
  password: "j1wkc98j9l2l7qus",
});

module.exports = pool.promise();
