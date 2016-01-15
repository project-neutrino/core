var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/config');
mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('ya!');
    console.log(config.name);
});

app.use(function(req, res, next){
    next();
}, express.static('static'));

app.get('/', function(req, res){
    res.sendFile('./static/site/index.html', {root: __dirname});
});

app.get('/admin/', function(req, res){
    res.sendFile('./static/admin/index.html', {root: __dirname});
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});

