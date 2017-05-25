var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:query', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.json({data : [req.params.query]});
});


module.exports = router;
