//db.js
var mongoose = require('mongoose');

//schema goes here!!
var Movie = new mongoose.Schema({
  title: String,
  director: String,
  year: Number
});

mongoose.model('Movie', Movie);

mongoose.connect('mongodb://localhost/hw05');
