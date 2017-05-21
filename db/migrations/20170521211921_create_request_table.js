
exports.up = function(knex, Promise) {
  return knex.schema.createTable('request', function (table) {
    table.increments();
    table.string('message');
    table.dateTime('dateOfRequest');
    table.dateTime('dateOfResponse');
    table.integer('sender_id');
    table.foreign('sender_id').references('id').inTable('user');
    table.integer('receiver_id');
    table.foreign('receiver_id').references('id').inTable('user');
    table.integer('response_id');
    table.foreign('response_id').references('id').inTable('response');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('request');
};
