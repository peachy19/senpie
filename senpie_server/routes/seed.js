const express = require('express');
const router  = express.Router();

// return error({error: 404, message: "error"});
module.exports = (knex) => {
  // const dbInsert = require("../db/insert-tables")(knex);
  const insertTables = require('../../db/insert-tables')(knex);

  router.get('/', (req, res) => {
    const data = {
      name: 'Jon',
      userType: 'mentor',
      email: 'jon@hi.com',
      educationDegree: 'cs',
      gradYear: 2015,
      companyName: 'Google',
      companyType: 'tech',
      size: 100000,
      title: 'Software Engineer',
    }
    insertUser(data).then((result) => {
      // console.log('Successfully inserted user', result);
    }).catch(err => {
      console.error(err);
    })
  });

  async function insertUser(data) {
    const userType = await insertTables.insertUserType(data.userType);
    const user = await insertTables.insertUser(data.name, data.email, userType[0]);
    const educationDegree = await insertTables.insertEducationDegree(data.educationDegree);
    const title = await insertTables.insertTitle(data.title);
    const company = await insertTables.insertCompany(data.companyName, data.companyType, data.size);
    const educationDetail = await insertTables.insertEducationDetail(user[0], educationDegree[0], data.gradYear);
    const companyDetail = await insertTables.insertCompanyDetail(user[0], company[0], title[0]);

    return data;
  }

  return router;
};
