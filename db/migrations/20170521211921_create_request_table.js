
exports.up = function(knex, Promise) {
  return knex.schema.createTable('request', function (table) {
    table.increments();
    table.string('message');
    table.dateTime('dateOfRequest');
    table.dateTime('dateOfResponse');
    table.foreign('sender_id').references('id').inTable('user');
    table.foreign('reciever_id').references('id').inTable('user');
    table.foreign('response_id').references('id').inTable('response');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('request');
};
