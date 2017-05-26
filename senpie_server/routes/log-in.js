import dbHelper from '../../db/db-helper.js'
var router = express.Router();
const cookieSession = require('cookie-session');
const knexConfig    = require('../../knexfile');
const knex          = require('knex')(knexConfig[ENV]);


// user login
router.get('/', function(req, res) {
  let userName = req.body.username;
  let password = req.body.password;
  console.log(dbHelper());
});


module.exports = router;
