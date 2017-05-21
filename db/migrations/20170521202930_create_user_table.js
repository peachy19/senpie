exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments();
    table.string('firstname');
    table.string('lastname');
    table.string('email');
    table.string('password_hash');
    table.foreign('userType_id').references('id').inTable('userType');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
