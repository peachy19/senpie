const ENV   = process.env.ENV || 'development';
const knexConfig    = require('../knexfile');
const knex          = require('knex')(knexConfig[ENV]);
const queryHelper = require('./insert-helper.js')

const query = queryHelper(knex);

query.insertInvitation(2,200,'pending').then(res => {
  console.log(res);
});