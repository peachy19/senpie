const elasticsearch = require('elasticsearch');

const log = console.log.bind(console);

const index = 'test';
const type = 'tweet';
const prop = 'content';
const contents = [
  'This is the beginning of the story.',
  'Stories are good, yeah? I like stories',
  'Then the middle comes.',
  'Next, and finally, the end arrives.',
  'That\'s the end of the story.',
  'To be continued...'
];
const query = 'beginning of story';

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

function dropIndex() {
  return client.indices.delete({
    index: index,
    ignore: [404]
  });
}

function createIndex() {
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

function addToIndex() {
  const body = [];
  contents.forEach((content, i) => {
    body.push({
      index: {
        _index: index,
        _type: type,
        _id: i + 1
      }
    });
    const doc = {};
    doc[prop] = content;
    body.push(doc);
  });
  body[prop] = contents;
  return client.bulk({
    body: body
  });
}

function search() {
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

function closeConnection() {
  client.close();
}

function getFromIndex() {
  return client.get({
    id: 1,
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

Promise.resolve()
  .then(dropIndex)
  .then(createIndex)
  .then(addToIndex)
  .then(getFromIndex)
  .then(waitForIndexing)
  .then(search)
  .then(closeConnection);
