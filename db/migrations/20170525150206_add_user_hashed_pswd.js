
exports.up = function(knex, Promise) {
 return knex.schema.table('users', function(t) {
      t.integer('hs_pswd').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.dropColumn('hs_pswd');
  })
};
