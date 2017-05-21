exports.up = function(knex, Promise) {
  return knex.schema.createTable('userCompanyDetail', function (table) {
    table.increments();
    table.integer('yearOfJoining');
    table.integer('yearOfLeaving');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('user');
    table.integer('company_id');
    table.foreign('company_id').references('id').inTable('companyMaster');
    table.integer('jobTitle_id');
    table.foreign('jobTitle_id').references('id').inTable('jobTitle');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userCompanyDetail');
};
