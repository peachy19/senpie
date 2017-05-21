exports.up = function(knex, Promise) {
  return knex.schema.createTable('userType', function (table) {
    table.increments();
    table.string('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userType');
};
