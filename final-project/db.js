//db.js
var mongoose = require('mongoose');

// users
// users can have several saved locations associated with their account
var User = new mongoose.Schema({
  locations:  [{type: mongoose.Schema.Types.ObjectId, ref: 'SavedLocation' }]
});

// users saved locations
var SavedLocation = new mongoose.Schema({
  name: String,
  lat: Number,
  long: Number
});
mongoose.model('SavedLocation', SavedLocation);

// background gifs
var Background = new mongoose.Schema({
  name: {type:String, enum:['sunny', 'cloudy', 'rainy', 'snowy', 'thunder']},
  timeOfDay: {type:String, enum:['morning', 'night']},
  url: {type: String, required: true}
});

// clothing icons
var ClothingIcons = new mongoose.Schema({
  name: String,
  url: {type: String, required: true}
});

// weather info
var Weather = new mongoose.Schema({
  forecast: {type:String, enum:['sunny', 'cloudy', 'rainy', 'snowy', 'thunder']},
  high: Number,
  low: Number,
  sunrise: Number,
  sunset: Number,
  current: Number
});

mongoose.connect('mongodb://localhost/finalProject');
