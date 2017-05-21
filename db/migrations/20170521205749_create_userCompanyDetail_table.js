exports.up = function(knex, Promise) {
  return knex.schema.createTable('userCompanyDetail', function (table) {
    table.increments();
    table.integer('yearOfJoining');
    table.integer('yearOfLeaving');
    table.foreign('user_id').references('id').inTable('user');
    table.foreign('company_id').references('id').inTable('companyMaster');
    table.foreign('jobTitle_id').references('id').inTable('jobTitle');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userCompanyDetail');
};