const ENV   = process.env.ENV || 'development';
const knexConfig    = require('../knexfile');
const knex          = require('knex')(knexConfig[ENV]);
const queryHelper = require('../db/query-helper')(knex);

id = 200;

queryHelper.getUser(id).then(res => {
  console.log('user is',res[0]);
});
