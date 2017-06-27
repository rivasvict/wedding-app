const config = require('./config.js');

const knex = require('knex')(config.database);

module.exports = knex;
