const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  try {
    await pool.query('ALTER TABLE "PublicationItem" ADD COLUMN "link" TEXT NOT NULL DEFAULT \'\'');
    console.log("Column added successfully!");
  } catch (err) {
    if (err.message.includes('already exists')) {
      console.log("Column already exists.");
    } else {
      console.error(err);
    }
  } finally {
    pool.end();
  }
}
main();
