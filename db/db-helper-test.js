const dbHelper = require('./db-helper.js')

const dbResult = dbHelper();

dbResult.then((res) => {
  console.log(res[0].id);
})