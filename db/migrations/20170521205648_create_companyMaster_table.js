exports.up = function(knex, Promise) {
  return knex.schema.createTable('companyMaster', function (table) {
    table.increments();
    table.string('name');
    table.string('typeOfCompany');
    table.string('size');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companyMaster');
};
