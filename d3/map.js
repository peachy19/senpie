const fs = require('fs');
const faker = require('faker');

const userTypes = ['mentor', 'user'];
const degrees = ['BSc', 'MSc', 'BASC', 'MENG', 'PhD'];
const companyType = ['tech'];
const titles = ['Software Engineer', 'Software Developer', 'Junior Software Developer', 'QA engineer', 'Software Engineer in Test', 'Senior Software Engineer', 'Intermediate Software Engineer', 'Programmer', 'QA Analyst'];
const companyList = [];
const mentorList = [];
const start = 1980;
const end = 2017;

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

const data = fs.readFileSync('../senpie_server/fileio/company_list.txt');
const res = data.toString().split(',');
for (let i = 0; i < res.length; i++) {
  companyList.push(res[i].trim());
}

for (let i = 0; i < 100; i++) {
  fakerF();
}

const map = {};
let buffer = 'id,value,\nmentor,\n';
parseCSV(map);
reformatCSV();
writeNewCSV();
console.log(buffer);

function parseCSV(map) {
  mentorList.forEach(ele => {
    if (map[ele['companyName']]) {
      if (map[ele['companyName']][ele['educationDegree']]) {
        map[ele['companyName']][ele['educationDegree']].push(ele['name']);
      } else {
        map[ele['companyName']][ele['educationDegree']] = [];
        map[ele['companyName']][ele['educationDegree']].push(ele['name']);
      }
    } else {
      map[ele['companyName']] = {};
      map[ele['companyName']][ele['educationDegree']] = [];
      map[ele['companyName']][ele['educationDegree']].push(ele['name']);
    }
  });


  for (let company in map) {
    let str = '';
    if (map.hasOwnProperty(company)) {
      str += 'mentor.' + company;
    }
    buffer += str + ',\n';
    for (let degree in map[company]) {
      let prepend = str + '.' + degree + '.';
      buffer += str + '.' + degree + ',\n';
      if (map[company].hasOwnProperty(degree)) {
        map[company][degree].forEach(ele => {
          buffer += prepend + ele + ',\n';
        })
      }
    }
  }
}

function writeNewCSV() {
  fs.writeFile('./mentor.csv', buffer, err => {
    if(err) {
      console.log(err);
    } else {
      console.log('Successfully written to file');
    }
  })
}

function reformatCSV() {
  buffer = buffer.replace(/Mr.|Dr.|Miss.|Ms.|Jr.|Sr.|Mrs.|Miss|Mister/g, match => {
    return '';
  });
}
