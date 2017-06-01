
var express = require('express');
var router = express.Router();


module.exports = knex => {
  const queryHelper = require('../../db/query-helper')(knex);
    /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.get('/:id/profile', function(req, res) {
    queryHelper.getUser(req.params.id).then(user => {
      res.json(user);
    });
  });

  return router;
};

