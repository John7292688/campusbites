require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

async function testDatabase() {
  try {
    for (let i = 1; i <= 10; i++) {
  const result = await pool.query("SELECT NOW()");
  console.log(`Test ${i}: SUCCESS`, result.rows[0]);
}

    console.log("DATABASE CONNECTION SUCCESSFUL");
    console.log(result.rows[0]);
  } catch (error) {
    console.error("DATABASE CONNECTION FAILED");
    console.error(error);
  } finally {
    await pool.end();
  }
}

testDatabase();