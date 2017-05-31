
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', table => {
      table.increments('id');
      table.string('latitude');
      table.string('longitude');
      table.integer('user_id');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table location cascade')
};
