require('dotenv').config();
const ENV   = process.env.ENV || 'development';

const elasticsearch = require('elasticsearch');
const knexConfig    = require('../knexfile');
const knex          = require('knex')(knexConfig[ENV]);
const fs = require('fs');
const faker = require('faker');
const synonyms = require('./synonyms');

// elasticsearch config
const index = 'user';
const type = 'userDetail';
const prop = 'content';
const query = 'software engineer';
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const userTypes = ['mentor', 'user'];
const degrees = ['BSc', 'MSc', 'BASC', 'MENG', 'PhD'];
const companyType = ['tech'];
const titles = ['Software Engineer', 'Software Developer', 'Junior Software Developer', 'QA engineer', 'Software Engineer in Test', 'Senior Software Engineer', 'Intermediate Software Engineer', 'Programmer', 'QA Analyst'];
const languages = ['C', 'C#', 'C++', 'Assembly', 'Python', 'Java', 'Haskell', 'Javascript', 'PHP', 'ruby', 'SQL', 'Rust', 'R', 'Swift', 'Julia', 'Miranda'];
const companyList = [];
const start = 1980;
const end = 2017;
const NUM_USERS = 100;
const latitude = {
  start: 49.10,
  end: 49.27
};
const longitude = {
  start: -122.40,
  end: -123.14
};
const mentorList = [{name: 'Ray Chung',
    userType: randAry(userTypes),
    email: 'ray.chung@cisco.com',
    educationDegree: 'PhD',
    gradYear: 2017,
    companyName: 'Cisco',
    companyType: randAry(companyType),
    size: randNum(200000, 1000),
    title: 'Software & Hardware Engineer Master',
    description: generateDescription('Ray Chung', 2017, 'Software & Hardware Engineer Guru', 'Cisco', 'PhD'),
    languages: 'Assembly VHDL Verilog C C++ C# Objective-C Haskell',
    location: randLocation(latitude, longitude),
    synon: synonyms('Cisco', 'PhD')}];

const insertTables = require('../db/insert-helper')(knex);

const log = console.log.bind(console);

// const path = require('path');
// path.resolve(__dirname, './synonym.txt')

function randNum(start, end) {
  return start + Math.floor(Math.random() * (end - start));
}

function randLocation(latitude, longitude){
  const lat = latitude.start + Math.random() * (latitude.end - latitude.start);
  const long = longitude.start + Math.random() * (longitude.end - longitude.start);
  const location = {
    latitude: lat,
    longitude: long
  }
  //console.log("Location is", location);
  return location;
}

function randAry(ary) {
  return ary[Math.floor(Math.random() * ary.length)];
}

function randLanguages() {
  let set = new Set();
  const num = Math.floor(Math.random() * 10);
  let array = '';

  for (let i = 0; i < num; i++) {
    const index = Math.floor(Math.random() * languages.length);
    set.add(languages[index]);
  }

  set.forEach(s => {
    array += s + ' ';
  })

  return array;
}

function generateDescription(name, year, title, company, degree) {
  const experience = end - year;
  const str = `Hi, my name is ${name}. I'm a ${title} at ${company}. I graduated with
  a ${degree} degree. I have ${experience} years of experience, love mentoring, and
  is looking to make the world a better place`;

  return str;
}

function fakerF() {
  let name = faker.name.findName();
  const gradYear = randNum(start, end);
  const title = randAry(titles);
  const companyName = randAry(companyList);
  const degree = randAry(degrees);
  name = name.replace(/Mr.|Dr.|Miss.|Ms.|Jr.|Sr.|Mrs.|Miss|Mister|MD/g, '');

  const data = {
    name: name,
    userType: randAry(userTypes),
    email: faker.internet.email(),
    educationDegree: degree,
    gradYear: gradYear,
    companyName: companyName,
    companyType: randAry(companyType),
    size: randNum(200000, 1000),
    title: title,
    description: generateDescription(name, gradYear, title, companyName, degree),
    languages: randLanguages(),
    location: randLocation(latitude, longitude),
    synon: synonyms(companyName, degree)
  }

  mentorList.push(data);
}

const data = fs.readFileSync('./fileio/company_list.txt');
const res = data.toString().split(',');
for (let i = 0; i < res.length; i++) {
  companyList.push(res[i].trim());
}

for (let i = 0; i < NUM_USERS; i++) {
  fakerF();
}

initializeES();

for (let i = 0; i < mentorList.length; i++) {
  insertUser(mentorList[i]).then(() => {

  }).catch(err => {
    console.error(err);
  })
}

async function insertUser(data) {
  const userType = await insertTables.insertUserType(data.userType);
  const user = await insertTables.insertUser(data.name, data.email, userType[0], data.description, 123);
  const educationDegree = await insertTables.insertEducationDegree(data.educationDegree);
  const title = await insertTables.insertTitle(data.title);
  const company = await insertTables.insertCompany(data.companyName, data.companyType, data.size);
  await insertTables.insertEducationDetail(user[0], educationDegree[0], data.gradYear);
  await insertTables.insertCompanyDetail(user[0], company[0], title[0]);
  await insertTables.insertSkill(data.languages, user[0]);
  const location = await insertTables.insertLocation(user[0], randLocation(latitude, longitude));

  const concatData = parseObject(data);

  console.log('concatData', concatData, user[0]);
  await addToIndex(concatData, user[0]);
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

async function initializeES() {
  await dropIndex();
  await dropDocIndex();
  await createIndex();
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
            // filter_snowball_en: {
            //   type: 'snowball',
            //   language: 'English'
            // },
            synonym: {
              type: 'synonym',
              // synonyms_path: './synonym.txt'
              synonyms: [
                'big 4 => Google, Facebook, Amazon, Microsoft',
                'government => NASA',
                'space => NASA, SpaceX',
                'Steve Jobs => Apple',
                'hardware => Intel, Apple',
                'unicorn => Snap, Uber, Airbnb',
                'teaching => Khan Academy',
                'breakout list => Uber, Airbnb, Hyperloop One, SpaceX',
                'automobile, car => Tesla'
              ]
            }
          },
          analyzer: {
            // text_body_analyzer: {
            //   filter: [
            //     'lowercase',
            //     'filter_snowball_en'
            //   ],
            //   type: 'custom',
            //   tokenizer: 'standard'
            // },
            synonym: {
              tokenizer: 'whitespace',
              filter: ['synonym']
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
