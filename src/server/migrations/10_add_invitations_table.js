var knex = require('./../knex.js');

exports.up = function() {
  return Promise.all([
    knex.schema.createTableIfNotExists('invitations', function(invitations) {
      invitations.string('id', 20).notNullable().primary();
      invitations.string('email', 60);
      invitations.string('complete_name', 60);
    })
      .then(function() {
        console.log('Invitations table in place!');
      })
  ])
}

exports.down = function() {
  return Promise.all([
    knex.schema.dropTableIfExists('invitations')
  ]);
}
