// dbConnect.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: getDatabaseUrl(),
});

function getDatabaseUrl() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.DATABASE_URL_AZURE;
    case 'test':
      return process.env.DATABASE_URL_TEST;
    default:
      return process.env.DATABASE_URL_LOCAL;
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};
