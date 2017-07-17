const comments = require('./../data/test/comments.js');
const knex = require('./../knex.js');
const commentsTable = 'comments';

const commentsSeed = (knex, Promise) => {

  const getInvitations = () => {
    return new Promise((resolve, reject) => {
      knex.select('id').from('invitations')
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }

  const getCommentsPromises = () => {
    return new Promise((resolve, reject) => {
      getInvitations().then(invitationIds => {
        const commentsPromises = invitationIds.map(invitation => {
          return knex(commentsTable).insert({
            invitation_id: invitation.id
          })
        });

        Promise.all(commentsPromises)
          .then(() => resolve())
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    });
  };

  return getCommentsPromises()
    .then(() => console.log('All comments seed were built'))
    .catch(error => console.log(error));
};

exports.seed = commentsSeed;

