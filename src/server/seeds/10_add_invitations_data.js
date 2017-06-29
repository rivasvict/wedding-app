const invitations = require('./../data/test/invitations.js');
const knex = require('./../knex.js');
const invitationsTable = 'invitations';

const invitationsSeed = (knex, Promise) => {

  const getInvitationsPromises = () => {
    let invitationsForDatabase = [];
    invitations.forEach(invitation => invitationsForDatabase.push(knex(invitationsTable).insert(invitation)));

    return invitationsForDatabase;
  };

  return Promise.all(getInvitationsPromises())
    .then(() => {
      console.log('All invitations seed were built');
    });
};

exports.seed = invitationsSeed;

