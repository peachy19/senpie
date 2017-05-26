const fs = require('fs');
const faker = require('faker');


const end = 2000;
const start = 1960;

const userTypes = ['mentor', 'user'];
const degrees = ['BSc', 'MSc', 'BASC', 'MENG', 'PhD'];
const companyType = ['tech'];
const titles = ['Software Engineer', 'Software Developer', 'Junior Software Developer', 'QA engineer', 'Software Engineer in Test', 'Senior Software Engineer', 'Intermediate Software Engineer', 'Programmer', 'QA Analyst'];

function randYear(start, end) {
  return start + Math.floor(Math.random() * (end - start));
}

function randAry(ary) {
  return ary[Math.floor(Math.random() * ary.length)];
}

function fakerF() {
  const data = {
    name: faker.name.findName(),
    userType: randAry(userTypes),
    email: faker.internet.email(),
    educationDegree: randAry(degrees),
    gradYear: randYear(start, end),
    companyName: randAry(companyList),
    companyType: randAry(companyType),
    size: randYear(200000, 1000),
    title: randAry(titles)
  }

  mentorList.push(data);
}

const companyList = [];
const mentorList = [];
// fs.readFile('company_list.txt', function (err, data) {
//   if (err) {
//     return console.error(err);
//   }
//   const res = data.toString().split(',');
//
//   for (let i = 0; i < res.length; i++) {
//    empty.push(res[i].trim());
//   }
//
//   fakerF();
// });

const data = fs.readFileSync('company_list.txt');
const res = data.toString().split(',');
for (let i = 0; i < res.length; i++) {
  companyList.push(res[i].trim());
}
for (let i = 0; i < 10; i++) {
  fakerF();
}

console.log(mentorList);
