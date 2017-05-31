exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('skill', table => {
      table.increments('id');
      table.string('languages');
      table.integer('user_id');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.table('users', (table) => {
      table.string('description');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('drop table skill cascade'),
    knex.schema.table('users', table => {
      table.dropColumn('description');
    })
  ]);
};
