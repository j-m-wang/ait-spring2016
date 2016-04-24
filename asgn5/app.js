//app.js
//require modules
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var bodyParser = require('body-parser');

//sets up mongoose/movie object + db
require('./db.js');
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

//sets up other modules
app.set('view engine', 'hbs');
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));

//displays all movies
app.get('/', function(req, res) {
  Movie.find({}, function(err, movies, count) {
    res.render('index', {layout:'layout', obj:movies});
  });
});

//filters movies based on director
app.get('/movies', function(req, res) {
  if (req.query.filter) {
    Movie.find({director: req.query.filter}, function(err, movies, count) {
      res.render('director', {layout:'layout', obj:movies});
    });
  } else {
    //if no director is specificed.. list all movies
    Movie.find({}, function(err, movies, count) {
      res.render('movies', {layout:'layout', obj:movies});
    });
  }
});

//adding a movie - GET
app.get('/movies/add', function(req, res) {
  res.render('add', {layout:'add-layout'});
});

//adding a movie - POST
app.post('/movies/add', function(req, res) {
  //create new movie query
  new Movie({
		title: req.body.title,
    director: req.body.director,
    year: req.body.year
  //insert
	}).save(function(err, cat, count){
		res.redirect('/movies');
	});
});

app.listen(3000);
console.log('Server started on localhost:3000; Ctrl-C to quit...');
