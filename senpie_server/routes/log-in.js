import dbHelper from '../../db/db-helper.js'
var router = express.Router();
const cookieSession = require('cookie-session');
const knexConfig    = require('../../knexfile');
const knex          = require('knex')(knexConfig[ENV]);


// user login
// currently faking log in
router.get('/', function(req, res) {
  res.json('userId : 1');
});


module.exports = router;
