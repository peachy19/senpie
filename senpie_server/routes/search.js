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
  const insertHelper = require('../../db/insert-helper')(knex);
  const queryHelper = require('../../db/query-helper')(knex);



  router.get('/:query', (req, res) => {
    const query = req.params.query;

    ids = [];
    searching(query).then(ress => {
      ress.hits.hits.forEach( ele => {
        ids.push(ele._id);
      });
      assembleData(queryHelper ,ids, res);
    });
  });

  return router;
};

  // async function insertUser(data) {
  //   const userType = await insertHelper.insertUserType(data.userType);
  //   const user = await insertHelper.insertUser(data.name, data.email, userType[0]);
  //   const educationDegree = await insertHelper.insertEducationDegree(data.educationDegree);
  //   const title = await insertHelper.insertTitle(data.title);
  //   const company = await insertHelper.insertCompany(data.companyName, data.companyType, data.size);
  //   const educationDetail = await insertHelper.insertEducationDetail(user[0], educationDegree[0], data.gradYear);
  //   const companyDetail = await insertHelper.insertCompanyDetail(user[0], company[0], title[0]);

  //   const concatData = parseObject(data);

  //   await addToIndex(concatData, user[0]);
  //   // await getFromIndex(user[0]);
  //   // await waitForIndexing();
  //   // await search();
  //   return data;
  // }

async function assembleData(queryHelper, ids, res) {
  var data = [];
  Promise.all(ids.map(id => queryHelper.getUser(id))).then(users => res.json(users) );
}

async function searching(query) {
    await waitForIndexing();
    const searchResult = await search(query);
    // for (let i = 0; i < searchResult.hits.hits.length; i++) {
    //   console.log('searchResult is ', searchResult.hits.hits[i]._id._source.content);
    // }

    return searchResult;
  }


function parseObject(data){
  let str = '';
  const ary = [];

  for (let property in data) {
    if (data.hasOwnProperty(property)) {
      str += data[property] + ' ';
    }
  }

  ary.push(str);
  return ary;
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
