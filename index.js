var express = require('express');
var app = express();
var router = express.Router();
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var product = require('./routs/product');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webPackConfig = require('./webpack.config');

mongoose.connect('mongodb://localhost/test');

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  //console.log('ya!');
  //console.log(config.name);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log('Something is happening.');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  next();
}, express.static('static'));

app.get('/api/', function (req, res) {
  res.json({"message": "API"});
});

router.route('/api/products/')
  .get(product.getProducts)
  .post(product.createProduct);

app.get('/', function(req, res){
  res.sendFile('./static/site/index.html', {root: __dirname});
});

app.get('/admin/', function(req, res){
  res.sendFile('./static/admin/index.html', {root: __dirname});
});

router.use(function(req, res, next){
  next();
});

app.use('/', router);

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

