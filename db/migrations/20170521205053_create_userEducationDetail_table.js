exports.up = function(knex, Promise) {
  return knex.schema.createTable('userEducationDetail', function (table) {
    table.increments();
    table.string('name');
    table.integer('yearOfPassing');
    table.foreign('user_id').references('id').inTable('user');
    table.foreign('educationDegree_id').references('id').inTable('educationDegree');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userEducationDetail');
};