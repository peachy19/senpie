require('dotenv').config();

const PORT  = process.env.PORT || 8080;
const ENV   = process.env.ENV || 'development';

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const SocketServer = require('ws').Server;

// importing all router files
const index = require('./routes/index');
const users = require('./routes/users');
const search = require('./routes/search');
const cors = require('cors');

const app = express();

const knexConfig    = require('../knexfile');
const knex          = require('knex')(knexConfig[ENV]);
// const knexLogger    = require('knex-logger');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());  // Cross-Origin Resource Sharing

// app.use(knexLogger(knex));

app.use('/', index);
app.use('/users', users);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});

const wss = new SocketServer({ server });

var outGoingMsg;
wss.on('connection', (ws) => {
  console.log('there\' 1 connection');
  ws.on('message', (msg) => {
    const message = JSON.parse(msg);
    console.log('a message is recieved');
    console.log('message is ', message);
    console.log('message.type is', message.type);
    switch (message.type) {
      case 'connect':
        console.log('recieved a connect message');
        outGoingMsg = 'connected';
        break;
      case 'accept':
        outGoingMsg = 'accepted';
        break;
      case 'reject':
        outGoingMsg = 'rejected';
        break;
    }
    wss.clients.forEach(function each(client) {
      console.log('sending message to client');
      client.send(('hi'));
    });
  });

  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      console.log('a connection was closed');
    });
  });
});

module.exports = app;
