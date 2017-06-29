const comments = require('./../data/test/comments.js');
const knex = require('./../knex.js');
const commentsTable = 'comments';

const commentsSeed = (knex, Promise) => {

  const getCommentsPromises = () => {
    let commentsForDatabase = [];
    comments.forEach(comment => commentsForDatabase.push(knex(commentsTable).insert(comment)));

    return commentsForDatabase;
  };

  return Promise.all(getCommentsPromises())
    .then(() => {
      console.log('All comments seed were built');
    });
};

exports.seed = commentsSeed;

