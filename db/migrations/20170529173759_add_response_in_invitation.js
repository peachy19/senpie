exports.up = function(knex, Promise) {
 return Promise.all([
    knex.schema.table('invitation', function(table){
      table.string('invitation_status')
    })
  ])
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.table('invitation', function(table){
      table.dropColumn('invitation_status');
    })
  ])
};
