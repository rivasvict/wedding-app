var dotenv = require('dotenv').config();

const config = {
  database: {
    client: process.env.DATABASE_DIALECT,
    version: process.env.DATABASE_VERSION,
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    }
  }
}

module.exports = config;
