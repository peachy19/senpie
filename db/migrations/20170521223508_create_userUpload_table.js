exports.up = function(knex, Promise) {
  return knex.schema.createTable('userUpload', function (table) {
    table.increments();
    table.dateTime('dateOfUploading');
    table.integer('numberOfViews');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('user');
    table.integer('uploadType_id');
    table.foreign('uploadType_id').references('id').inTable('uploadType');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('userUpload');
};
