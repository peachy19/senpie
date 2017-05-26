const express = require('express');
const elasticsearch = require('elasticsearch');
const router  = express.Router();

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
  const insertTables = require('../../db/insert-tables')(knex);

  router.get('/', (req, res) => {
    const query = 'Software Developer who has worked at Airbnb and has a PhD';

    res.send('Hello');
    searching(query).then(res => {
    });
  });

  async function insertUser(data) {
    const userType = await insertTables.insertUserType(data.userType);
    const user = await insertTables.insertUser(data.name, data.email, userType[0]);
    const educationDegree = await insertTables.insertEducationDegree(data.educationDegree);
    const title = await insertTables.insertTitle(data.title);
    const company = await insertTables.insertCompany(data.companyName, data.companyType, data.size);
    const educationDetail = await insertTables.insertEducationDetail(user[0], educationDegree[0], data.gradYear);
    const companyDetail = await insertTables.insertCompanyDetail(user[0], company[0], title[0]);

    const concatData = parseObject(data);

    await addToIndex(concatData, user[0]);
    // await getFromIndex(user[0]);
    // await waitForIndexing();
    // await search();
    return data;
  }

  async function searching(query) {
    await waitForIndexing();
    const searchResult = await search(query);
    // console.log(searchResult.hits.hits);
    console.log(searchResult.hits.hits);
    for (let i = 0; searchResult.hits.hits.length; i++) {
      console.log(searchResult.hits.hits[i]._source.content);
    }
  }

  return router;
};

function parseObject(data){
  let str = "";
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
  body = {};
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
