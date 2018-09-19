const createError = require('http-errors');
const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const fs = require('fs');

/** redis */
// const redis = require('redis');
// const client = require('redis').createClient();
/** ioredis */
//const Redis = require('ioredis');
//구독 redis
//const redis = new Redis(6379, '127.0.0.1');
//게시 레디스
//const pub = new Redis(6379, '127.0.0.1');
/** rsmq */
const RedisSMQ = require('rsmq');
const rsmq = new RedisSMQ({host:'127.0.0.1', port: 6379, ns: 'rsmq'});

const session = require('express-session');
var indexRouter = require('./routes');
var redisRouter = require('./routes/redis/redis');
var usersRouter = require('./routes/users/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use((req, res, next) => {
  req.rsmq = rsmq; //rsmq setting
  next();
})
/*
app.use((req, res, next) => {
  // req.cache = client; //redis
  req.redis = redis; //ioredis subcribe
  req.pub = pub; //ioredis publish
  next();
})

redis.on('message', function (channel, message) {
  // Receive message Hello world! from channel news
  // Receive message Hello again! from channel music
  console.log('Receive message %s from channel %s', message, channel);
});
// 또한 'messageBuffer'라는 이벤트가 있는데, 이는 'message'와 동일하지만
// 문자열 대신 버퍼를 반환합니다.
redis.on('messageBuffer', function (channel, message) {
// `channel`과`message` 둘 다 버퍼입니다.
});
*/

app.use('/', indexRouter);
app.use('/redis', redisRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;