//const invitations = require('./../data/test/invitations.js');
const knex = require('./../knex.js');
const invitationsTable = 'invitations';
const JsonConverter = require('csvtojson');
const fs = require('fs'); 
const _ = require('lodash');
const IdGenerator = require('./../util/idGenerator');
const invitationIdGenerator = new IdGenerator({
  limitOfCharacters: 10
});

const invitationsSeed = (knex, Promise) => {

  const csvToJsonConverterForInvitations = new JsonConverter({});
  const csvToJsonConverterForGuests = new JsonConverter({});
  const csvFileForInvitations = './databaseCsv/weddingInvitation.csv';
  const csvFileForGuests = './databaseCsv/weddingGuest.csv';
  const invitationsRelatedPromises = [];
  const showErrorLog = error => console.log(error);
  let invitations;

  const startCsvToJsonConversion = (csvFile, converter) => {
    fs.createReadStream(csvFile).pipe(converter);
  }
  startCsvToJsonConversion(csvFileForInvitations, csvToJsonConverterForInvitations);

  const getInvitationsWithRelatedGuests = guestsConvertedFromFile => {
    return invitations.map(invitation => {
      let guestsRelatedToThisInvitation = guestsConvertedFromFile.filter(guestConvertedFromFile => {
        return guestConvertedFromFile.invitationId === invitation.invitationId
      });
      invitation.guests = guestsRelatedToThisInvitation;
      return invitation;
    });
  }

  const prepareInvitationToBeInserted = invitationToBeInserted => {
    const generatedInvitationId = invitationIdGenerator.getGeneratedId(invitationToBeInserted.invitationId);
    invitationToBeInserted.id = generatedInvitationId;
    delete invitationToBeInserted.invitationId;
    delete invitationToBeInserted.guests;
  }

  const executeQueryForGuestInserction = guestsToBeInserted => {
    knex('guest').insert(guestsToBeInserted)
      .then(queryResult => console.log('Guest inserted'))
      .catch(showErrorLog);
  }

  const populateInvitationsInsertPromises = (invitationToBeInserted, guestsToBeInserted) => {
    invitationsRelatedPromises.push(knex(invitationsTable).insert(invitationToBeInserted).returning('id')
      .then(queryResult => {
        const invitationIdFromDatabase = queryResult.shift();
        const teatedGuestsToBeInserted = guestsToBeInserted.map(guestToBeInserted => {
          guestToBeInserted.invitation_id = invitationIdFromDatabase;
          guestToBeInserted.confirmed = false;
          delete guestToBeInserted.invitationId;
          return guestToBeInserted;
        });
        teatedGuestsToBeInserted.forEach(guestToBeInserted => executeQueryForGuestInserction(guestToBeInserted));
      })
      .catch(showErrorLog));
  }

  const constructAllInvitationsRelatedPromises = invitationsWithRelatedGuests => {
    invitationsWithRelatedGuests.forEach(invitationWithRelatedGuests => {
      let invitationToBeInserted = _.mapValues(invitationWithRelatedGuests);
      let guestsToBeInserted = invitationWithRelatedGuests.guests;
      prepareInvitationToBeInserted(invitationToBeInserted);
      populateInvitationsInsertPromises(invitationToBeInserted, guestsToBeInserted);
    });
  }

  return new Promise((resolve, reject) => {
    csvToJsonConverterForInvitations.on('end_parsed', invitationsConvertedFromFile => {
      invitations = invitationsConvertedFromFile;
      startCsvToJsonConversion(csvFileForGuests, csvToJsonConverterForGuests);
    });

    csvToJsonConverterForGuests.on('end_parsed', guestsConvertedFromFile => {
      const invitationsWithRelatedGuests = getInvitationsWithRelatedGuests(guestsConvertedFromFile);
      constructAllInvitationsRelatedPromises(invitationsWithRelatedGuests);

      return Promise.all(invitationsRelatedPromises)
        .then(() => {
          console.log('Data corractly inserted to database');
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  });

  csvToJsonConverterForInvitations.on('error', showErrorLog);
  csvToJsonConverterForGuests.on('error', showErrorLog);
};

exports.seed = invitationsSeed;
