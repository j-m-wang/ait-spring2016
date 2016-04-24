//app.js
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var jquery = require('jquery');
// var gmaps = require('gmaps');

require('./db.js');
var mongoose = require('mongoose');
var SavedLocation = mongoose.model('SavedLocation');

app.set('view engine', 'hbs');
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('index', {layout: 'main'});
});

app.get('/today', function(req, res) {
  res.render('today', {layout: 'main'});
});

app.get('/clothing', function(req, res) {
  res.render('clothing', {layout: 'main'});
});

app.get('/location', function(req, res) {
  res.render('location', {layout: 'main'});
});

app.get('/login', function(req, res) {
  res.render('login', {layout: 'main'});
});

app.get('/saved', function(req, res, next) {
  SavedLocation.find({}, function(err, savedLocations, count) {
    res.render('saved', {layout:'main', obj: savedLocations});
  });
});

app.post('/saved', function(req, res, next) {
  var newSavedLocation = new SavedLocation({
    name: req.body.name,
    lat: req.body.lat,
    long: req.body.lng
  });
  newSavedLocation.save(function(err, list, count) {
    if (err) {
      res.render('saved', {error: 'Error: Missing Field(s)'});
    } else {
      res.redirect('/saved');
    }
  });
});

app.listen(3000);
console.log('Server started on localhost:3000; Ctrl-C to quit...');
