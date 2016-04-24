var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');

//my schema goes here!
var Image = new mongoose.Schema({
  caption: String,
  url: {type: String, required: true}
});

var ImagePost = new mongoose.Schema({
  title: {type: String, required: true},
  images: {type: [Image], required: true}
});

ImagePost.plugin(URLSlugs('title'));

mongoose.model('Image', Image);
mongoose.model('ImagePost', ImagePost);

mongoose.connect('mongodb://localhost/hw06');
