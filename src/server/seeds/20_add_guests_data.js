const guests = require('./../data/test/guests.js');
const knex = require('./../knex.js');
const guestsTable = 'guest';

const guestsSeed = (knex, Promise) => {

  const getGuestsPromises = () => {
    let guestsForDatabase = [];
    guests.forEach(guest => guestsForDatabase.push(knex(guestsTable).insert(guest)));

    return guestsForDatabase;
  };

  return Promise.all(getGuestsPromises())
    .then(() => {
      console.log('All guests seed were built');
    });
};

exports.seed = guestsSeed;

