exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('invitation', table => {
      table.dropForeign('response_id')
    }),
    knex.schema.dropTable('response')])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('response', table => {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.table('invitation', table => {
      table.foreign('response_id').references('response.id')
    })])
};
