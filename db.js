const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const config = fs.readFileSync(path.resolve(__dirname, 'config.json'));
const parsed = JSON.parse(config);

const pool = mysql.createPool({
  host: parsed.host,
  user: parsed.user,
  port: parsed.port,
  password: parsed.password,
  database: parsed.database,
});

module.exports = pool.promise();
