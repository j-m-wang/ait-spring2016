//app.js
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var bodyParser = require('body-parser');

require('./db.js');
var mongoose = require('mongoose');
var SavedLocation = mongoose.model('SavedLocation');
var Background = mongoose.model('Background');
var PastViewed = mongoose.model('PastViewed');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.set('view engine', 'hbs');
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  Background.find({}, function(err, background, count) {
    res.render('index', {layout:'main', obj: background});
  });
});

app.get('/today', function(req, res) {
  Background.find({}, function(err, background, count) {
    res.render('today', {layout:'main', obj: background});
  });
});

app.post('/today', function(req, res, next) {
  res.redirect('/forecast');
});

app.get('/forecast', function(req, res) {
  Background.find({}, function(err, background, count) {
    res.render('forecast', {layout:'main', obj: background});
  });
});

app.post('/forecast', function(req, res) {
  var days = req.body.numOfDays;
  Background.find({}, function(err, background, count) {
    res.render('forecast', {layout:'main', obj: days, back: background});
  });
});

app.get('/location', function(req, res) {
  PastViewed.find({}, function(err, pastViewed, count) {
    Background.find({}, function(err, background, count) {
    res.render('location', {layout:'main', obj: pastViewed, back: background});
  })});
});

//ajax post specific location information
//add new location to pastViewed
app.post('/api/location', function(req, res) {
  var newPastViewed = new PastViewed({
    name: req.body.name,
  });
  newPastViewed.save(function(err, list, count) {
    if (err) {
      return res.send(500, 'Error occurred: database error.');
    } else {
    }
  });
});

app.get('/settings', function(req, res) {
  Background.find({}, function(err, background, count) {
    res.render('settings', {layout:'main', obj: background});
  });
});

//ajax post new background gif
//add new background to backgrounds
app.post('/api/settings', function(req, res) {
  var newBackground = new Background({
    url: req.body.url,
    name: req.body.weatherType,
    timeOfDay: req.body.timeOfDay
  });
  newBackground.save(function(err, list, count) {
    if (err) {
      return res.send(500, 'Error occurred: database error.');
    } else {
    }
  });
  });

app.get('/saved', function(req, res, next) {
  SavedLocation.find({}, function(err, savedLocations, count) {
    Background.find({}, function(err, background, count) {
    res.render('saved', {layout:'main', obj: savedLocations, back: background});
  })});
});

//add new location to savedLocations
app.post('/saved', function(req, res, next) {
  var newSavedLocation = new SavedLocation({
    name: req.body.name,
    lat: req.body.lat,
    long: req.body.lng,
    forecast: req.body.forecast,
    temp: req.body.temp
  });
  newSavedLocation.save(function(err, list, count) {
    if (err) {
      console.log('err', err);
      res.render('today', {error: 'Error: Missing Field(s)'});
    } else {
      res.redirect('/saved');
    }
  });
});

app.listen(12646);
console.log('Server started on localhost:12646; Ctrl-C to quit...');
