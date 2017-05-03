var express = require('express');
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'homepage',
		data: 'hello Express'
	});
});

router.get('/test', function(req, res, next) {
	res.json({
		title: 'homepage',
		data: 'hello Express'
	});
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 'add') next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.send('regular');
});

router.get('/user/:id', function (req, res, next) {
  res.send('specified');
});

// 处理 /user/:id， 渲染一个特殊页面
var addUserName = require('./mysql/index.adduser');
router.get('/receive/adduser', function (req, res, next) {
  console.log(req.params, req.query);
  // res.send('special');
  addUserName({
  	username: req.query.username,
  	email: req.query.email,
  	password: req.query.password
  }, res);
});

router.get('*', function(req, res, next) {
	res.status(404);
	res.end('404');
});

router.use(function(err, req, res, next) {
	res.status(500);
	res.end('error');
});

// 将路由挂载至应用
module.exports = router;