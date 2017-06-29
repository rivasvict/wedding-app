var knex = require('./../knex.js');

exports.up = function() {
  return Promise.all([
    knex.schema.createTableIfNotExists('comments', function(comments) {
      comments.increments('id').notNullable();
      comments.string('invitation_id').unsigned();
      comments.foreign('invitation_id').references('id').inTable('invitations');
      comments.text('comment', 'longtext');
    })
      .then(function() {
        console.log('Invitations table in place!');
      })
  ])
}

exports.down = function() {
  return Promise.all([
    knex.schema.dropTableIfExists('comments')
  ]);
}
