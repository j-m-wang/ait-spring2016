//test.js
//create a browser test page site using Express

var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var path = require("path");
var publicPath = path.resolve(__dirname, "views");
app.use(express.static(publicPath))

app.get('/', function(req, res) {
  res.render('index', {obj: req.headers});
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.use(error404);
function error404(req, res, next) {
  res.render('404');
};

app.listen(3000);
console.log('Server started on localhost:3000; Ctrl-C to quit...');
