exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_type', table => {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('content_type', table => {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('title', table => {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('company', table => {
      table.increments('id');
      table.string('name');
      table.string('type_of_company');
      table.integer('size');
    }),
    knex.schema.createTable('response', table => {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('education_degree', table => {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('name');
      table.string('email');
      table.integer('user_type_id');
      table.foreign('user_type_id').references('user_type.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('education_detail', table => {
      table.increments('id');
      table.integer('list_id');
      table.integer('grad_year');
      table.integer('user_id');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('education_degree_id');
      table.foreign('education_degree_id').references('education_degree.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('company_detail', table => {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('company_id');
      table.foreign('company_id').references('company.id').onDelete('CASCADE');
      table.integer('title_id');
      table.foreign('title_id').references('title.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('invitation', table => {
      table.increments('id');
      table.integer('sender_id');
      table.foreign('sender_id').references('users.id').onDelete('CASCADE');
      table.integer('receiver_id');
      table.foreign('receiver_id').references('users.id').onDelete('CASCADE');
      table.integer('response_id');
      table.foreign('response_id').references('response.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('user_upload', table => {
      table.increments('id');
      table.timestamp('uploaded_at');
      table.integer('content_type_id');
      table.foreign('content_type_id').references('content_type.id').onDelete('CASCADE');
      table.integer('user_id');
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('drop table "users" cascade'),
    knex.raw('drop table user_type cascade'),
    knex.raw('drop table content_type cascade'),
    knex.raw('drop table title cascade'),
    knex.raw('drop table company cascade'),
    knex.raw('drop table response cascade'),
    knex.raw('drop table education_degree cascade'),
    knex.raw('drop table education_detail cascade'),
    knex.raw('drop table company_detail cascade'),
    knex.raw('drop table invitation cascade'),
    knex.raw('drop table user_upload cascade')
  ]);
};
