require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  pool
    .query("SELECT NOW()")
    .then(() => console.log("✅ Connected to Neon PostgreSQL"))
    .catch((err) =>
      console.error("❌ Database connection failed:", err.message)
    );
});