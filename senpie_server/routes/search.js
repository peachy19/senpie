const express = require('express');
const elasticsearch = require('elasticsearch');
const router  = express.Router();

const CORS = require('cors');
router.use(CORS());

// elasticsearch config
const index = 'user';
const type = 'userDetail';
const prop = 'content';
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const log = console.log.bind(console);

module.exports = (knex) => {
  const queryHelper = require('../../db/query-helper')(knex);

  router.get('/', (req, res) => {
    res.send('In /search');
  });

  router.get('/:query', (req, res) => {
    const query = req.params.query;
    console.log('in get search/');
    console.log('query is ',query);
    const ids = [];
    searching(query).then(ress => {
      ress.hits.hits.forEach(ele => {
        ids.push(ele._id);
      });
      assembleData(queryHelper, ids, res);
    });
  });

  return router;
};

async function assembleData(queryHelper, ids, res) {
  Promise.all(ids.map(id => queryHelper.getUser(id))).then(users => {
    console.log(users);
    res.json(users);
  });
}

async function searching(query) {
    await waitForIndexing();
    const searchResult = await search(query);
    // for (let i = 0; i < searchResult.hits.hits.length; i++) {
    //   console.log('searchResult is ', searchResult.hits.hits[i]._id._source.content);
    // }

    return searchResult;
}

function addToIndex(content, id) {
  console.log('in addToIndex');
  let body = {};
  body[prop] = content;

  return client.create({
    index: index,
    type: type,
    id: id,
    body: body
  });
}

function search(query) {
  console.log('in search()');
  const body = {
    query: {
      multi_match: {
        type: 'most_fields',
        query: query,
        fields: [
          prop
        ]
      }
    }
  };
  return client.search({
    size: 15,
    index: index,
    body: body
  });
}

function getFromIndex(id) {
  console.log('in getFromIndex()');
  return client.get({
    id: id,
    index: index,
    type: type
  }).then(log);
}

function waitForIndexing() {
  log('Wait for indexing ....');
  return new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
}
