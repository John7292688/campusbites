const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", (client) => {
  client
    .query(
      "SET TIME ZONE 'Africa/Lagos'"
    )
    .catch(console.error);
});

pool.on("error", (err) => {
  console.error(
    "DATABASE POOL ERROR:",
    err
  );
});

module.exports = pool;