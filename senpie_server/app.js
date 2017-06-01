require('dotenv').config();

const PORT  = process.env.PORT || 8000;
const ENV   = process.env.ENV || 'development';

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const SocketServer = require('ws').Server;
const http = require('http');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

const knexConfig    = require('../knexfile');
const knex          = require('knex')(knexConfig[ENV]);
// const knexLogger    = require('knex-logger');


const CORS = require('cors');
const searchRoute = require('./routes/search');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(CORS());  // Cross-Origin Resource Sharing

// app.use(knexLogger(knex));

app.use('/', index);
app.use('/users', users(knex));

app.use('/search', searchRoute(knex, CORS));

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

const server = http.createServer(app);
const wss = new SocketServer({ server });


server.listen(PORT, function() {
  console.log(`Server listening on ${this.address().port}`);
});
// const server = app.listen(PORT, () => {
//   console.log('Example app listening on port ' + PORT);
// });


// student sents a request. request will have sender ID, reciever ID, request body, message type
// mentor recieves a request, responds with a response, sender ID, reciever ID, response body, message type
const STUDENT = 1;
//const MENTOR = 2;

var outGoingMsg = {};
wss.on('connection', (ws) => {
  console.log('there\' 1 connection');
  ws.on('message', (msg) => {
    const message = JSON.parse(msg);
    console.log('message is ', message);
    console.log('message.sender is', message.sender);
    switch (message.sender) {
      case STUDENT:
        console.log('student sent a connect message');
        outGoingMsg.sender = STUDENT;
        outGoingMsg.content = 'CONNECT REQUEST';
        outGoingMsg.reciever = '';
        outGoingMsg.requestMessage = message.requestMessage;
        break;
      //case MENTOR:
      default:
        console.log('mentor set a request');
         if (message.type === 'initialize') {
            console.log('mentor send in a initialize request');
            outGoingMsg.content = 'WAITING ON REQUEST';
            outGoingMsg.reciever = '';
            outGoingMsg.requestMessage = '';
            outGoingMsg.sender = 'SYSTEM MESSAGE';
          }
          if (message.type === 'confirm request')  {
            console.log('mentor is confirming a request');
            outGoingMsg.content = 'Accepted';
            outGoingMsg.reciever = STUDENT;
            outGoingMsg.requestMessage = '';
            outGoingMsg.sender = 'SYSTEM MESSAGE';
          }
      }

    wss.clients.forEach(function each(client) {
      console.log('sending message to client');
      client.send((JSON.stringify(outGoingMsg)));
    });
  });

  ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      console.log('a connection was closed');
    });
  });
});

module.exports = app;
