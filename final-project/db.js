//db.js
var mongoose = require('mongoose');

// users saved locations
var SavedLocation = new mongoose.Schema({
  name: String,
  lat: Number,
  long: Number,
  forecast: String,
  temp: Number
});
mongoose.model('SavedLocation', SavedLocation);

// background gifs
var Background = new mongoose.Schema({
  name: {type:String, enum:['sunny', 'cloudy', 'rainy', 'snowy', 'thunder']},
  timeOfDay: {type:String, enum:['morning', 'night']},
  url: {type: String, required: true}
});
mongoose.model('Background', Background);

//past viewed locations
var PastViewed = new mongoose.Schema({
  name: String
});
mongoose.model('PastViewed', PastViewed);

mongoose.connect('mongodb://localhost/finalProject');
