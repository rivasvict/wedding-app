var knex = require('./../knex.js');

exports.up = function() {
  return Promise.all([
    knex.schema.createTableIfNotExists('testtable', function(testable) {
      testable.string('testField', 20).notNullable().primary();
    })
      .then(function() {
        console.log('done!');
      })
  ])
}

exports.down = function() {
  return Promise.all([
    knex.schema.dropTableIfExists('testable')
  ]);
}
