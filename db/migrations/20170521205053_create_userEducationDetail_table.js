exports.up = function(knex, Promise) {
  return knex.schema.createTable('userEducationDetail', function (table) {
    table.increments();
    table.string('name');
    table.integer('yearOfPassing');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('user');
    table.integer('educationDegree_id');
    table.foreign('educationDegree_id').references('id').inTable('educationDegree');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userEducationDetail');
};