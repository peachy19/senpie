var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:query', function(req, res) {
  // res.render('index', { title: 'Express' });

const users = [
  {
    "id" : 0,
    "name" : "Prachi",
    "title": "Software Developer",
    "skills": ["Java", "Javascript"],
    "education": "JIIT",
    "experience": "EY"
  },
  {
    "id" : 1,
    "name" : "Jonas",
    "title": "Developer",
    "skills": ["Java", "Javascript", "C"],
    "education": "UFT",
    "experience": "Some"
  },
  {
    "id" : 2,
    "name" : "Bo",
    "title": "Software Dev",
    "skills": ["Javascript"],
    "education": "SFU",
    "experience": "Someother"
  }
]
  //res.json({data : req.params.query});
  res.json({data : users});

});


module.exports = router;
