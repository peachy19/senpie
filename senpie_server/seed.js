require('dotenv').config();
const ENV   = process.env.ENV || 'development';

const elasticsearch = require('elasticsearch');
const knexConfig    = require('../knexfile');
const knex          = require('knex')(knexConfig[ENV]);
// elasticsearch config
const index = 'user';
const type = 'userDetail';
const prop = 'content';
const query = 'software engineer';
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const insertTables = require('../db/insert-tables')(knex);

const log = console.log.bind(console);

const data = [{
  name: 'Jon',
  userType: 'mentor',
  email: 'jon@hi.com',
  educationDegree: 'PhD',
  gradYear: 2015,
  companyName: 'Google',
  companyType: 'tech',
  size: 100000,
  title: 'Software Engineer',
}, {
  name: 'Ben',
  userType: 'user',
  email: 'ben@hi.com',
  educationDegree: 'PhD',
  gradYear: 2011,
  companyName: 'Amaz',
  companyType: 'tech',
  size: 120000,
  title: 'Full Stack Software Engineer',
}, {
  name: 'Ashin',
  userType: 'user',
  email: 'shin@hi.com',
  educationDegree: 'PhD',
  gradYear: 2011,
  companyName: 'Amaz',
  companyType: 'tech',
  size: 120000,
  title: 'Front End Software Engineer',
}];

initializeES();

for (let i = 0; i < data.length; i++) {
  insertUser(data[i]).then((result) => {
    console.log('result', result);
  }).catch(err => {
    console.error(err);
  })
}



async function initializeES() {
  // await dropIndex();
  await dropDocIndex();
  await createIndex();
}

async function insertUser(data) {
  const userType = await insertTables.insertUserType(data.userType);
  const user = await insertTables.insertUser(data.name, data.email, userType[0]);
  const educationDegree = await insertTables.insertEducationDegree(data.educationDegree);
  const title = await insertTables.insertTitle(data.title);
  const company = await insertTables.insertCompany(data.companyName, data.companyType, data.size);
  const educationDetail = await insertTables.insertEducationDetail(user[0], educationDegree[0], data.gradYear);
  const companyDetail = await insertTables.insertCompanyDetail(user[0], company[0], title[0]);

  const concatData = parseObject(data);
  console.log('concatData', concatData, user[0]);
  await addToIndex(concatData, user[0]);
  // await getFromIndex(user[0]);
  // await waitForIndexing();
  // await search();
}


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

function dropIndex() {
  console.log('in dropIndex()');
  return client.indices.delete({
    index: index,
    ignore: [404]
  });
}

function dropDocIndex() {
  console.log('in dropDocIndex()');
  return client.delete({
    index: index,
    type: type,
    id: 1,
    ignore: [404]
  }, function (error, response) {
    console.log('error', error);
  });
}

function createIndex() {
  console.log('in createIndex()');
  const mappings = {};
  mappings[type] = {
    properties: {}
  };
  mappings[type].properties[prop] = {
    type: 'string',
    analyzer: 'text_body_analyzer'
  };
  return client.indices.create({
    index: index,
    body: {
      settings: {
        analysis: {
          filter: {
            filter_snowball_en: {
              type: "snowball",
              language: "English"
            }
          },
          analyzer: {
            text_body_analyzer: {
              filter: [
                "lowercase",
                "filter_snowball_en"
              ],
              type: "custom",
              tokenizer: "standard"
            }
          }
        }
      },
      mappings: mappings
    }
  });
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

function search() {
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
  }).then(log);
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
