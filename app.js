var express = require('express');
var app = express();
var swig = require('swig');

// 获取路由级别中间件
var router = require('./src/middleware');

// 通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等
app.use(express.static('public'));
// 设置模板引擎
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/', router);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
