exports.up = function(knex, Promise) {
  return knex.schema.createTable('userTag', function (table) {
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('user');
    table.integer('tag_id');
    table.foreign('tag_id').references('id').inTable('tag');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userTag');
};
