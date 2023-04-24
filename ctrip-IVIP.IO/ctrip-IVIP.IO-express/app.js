var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session')

var hotelmsgRouter = require('./routes/hotel'); //获取新路由
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/order');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var indentRouter = require('./routes/indent');
var managementRouter = require('./routes/management');
var commentRouter = require('./routes/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 解析jwt
// app.use(
//   expressjwt({
//     secret:"test12345",// token 中的参数
//     algorithms: ["HS256"],
//   }).unless({
//     // 需要排除的路由 方法也可以排除
//     path:[
//       "/api/users",
//       /^\/api\/articles\/user\/\w+/,
//       {
//         url: /^\/api\/articles\/\w+/,
//         method:["GET"]
//       }
//     ]
//   })
// )
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: "zhanshen123",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 48 * 1000 }, // 两天过期
  })
);


app.use('/api/hotel', hotelmsgRouter); //创建新路由
app.use('/api/users', usersRouter);
app.use('/api/order', orderRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/indent', indentRouter);
app.use('/api/management', managementRouter);
app.use('/api/comment', commentRouter);

// token传递出错需要声明

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.use(function (err, req, res, next) {
  res.status(500).json({ message: err.message });
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
