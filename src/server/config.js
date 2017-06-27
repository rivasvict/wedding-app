require('dotenv').config();

const config = {
  database: {
    client: 'pg',
    version: '9.5',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    }
  }
}

module.exports = config;
