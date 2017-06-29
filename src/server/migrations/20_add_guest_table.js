var knex = require('./../knex.js');

exports.up = function() {
  return Promise.all([
    knex.schema.createTableIfNotExists('guest', function(guest) {
      guest.increments('id').notNullable();
      guest.string('invitation_id').unsigned();
      guest.foreign('invitation_id').references('id').inTable('invitations');
      guest.string('name', 60);
      guest.boolean('confirmed').defaultTo(false);
    })
      .then(function() {
        console.log('Guest table in place!');
      })
  ])
}

exports.down = function() {
  return Promise.all([
    knex.schema.dropTableIfExists('guest')
  ]);
}
