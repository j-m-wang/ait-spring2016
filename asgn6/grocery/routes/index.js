var express = require('express');
var router = express.Router();
require('./../db.js');

var mongoose = require('mongoose');
var ImagePost = mongoose.model('ImagePost');
var Image = mongoose.model('Image');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//getting imageposts/form
router.get('/image-posts', function(req, res, next) {
  ImagePost.find({}, function(err, imageposts, count) {
    res.render('image-posts', {obj: imageposts});
  });
});

//displaying imageposts
router.post('/image-posts', function(req, res, next) {
  var newImagePost = new ImagePost({
    title: req.body.title
  });
  for (var x = 0; x < 4; x++) {
    if (req.body['url' + x]) {
      var newImage = new Image({
        caption: req.body['caption' + x],
        url: req.body['url' + x]
      });
      newImagePost.images.push(newImage);
    }
  }
  newImagePost.save(function(err, list, count) {
    if (err) {
      res.render('image-posts', {error: 'Error: Missing Field(s)'});
    } else {
      res.redirect('/image-posts');
    }
  });
});

//getting slug page
router.get('/image-posts/:slug', function(req, res, next) {
  ImagePost.find({ title:req.params.slug }, function(err, imageposts, count) {
    res.render('slug', {obj: imageposts});
  });
});

//changing slug page
router.post('/image-posts/:slug', function(req, res, next) {
  //when adding an image...
  if (req.body.addURL) {
    ImagePost.findOne({ slug:req.params.slug }, function(err, imageposts, count) {
      imageposts.images.push({ url: req.body.addURL, caption: req.body.addCaption});
      imageposts.save(function(saveErr, saveImage, saveCount) {
        res.redirect('/image-posts/' + req.params.slug);
      });
    });
  //when deleting an image..
  } else if (req.body.imageBox) {
    //if deleting more than 1..
      if (Array.isArray(req.body.imageBox)) {
        ImagePost.findOne({slug:req.params.slug}, function(err, imageposts, count) {
          for (var key in req.body.imageBox) {
            imageposts.images.id(req.body.imageBox[key]).remove();
          }
          imageposts.save(function(err) {
            if (err) return (err);
            console.log('the sub-doc was removed');
          });
        });
      //if only deleting 1..
      } else {
        ImagePost.findOne({slug:req.params.slug}, function(err, imageposts, count) {
          imageposts.images.id(req.body.imageBox).remove();
          imageposts.save(function(err) {
            if (err) return (err);
            console.log('the sub-doc was removed');
          });
        });
      }
      res.redirect('/image-posts/' + req.params.slug);
  //when doing nothing..
  } else {
      res.redirect('/image-posts/' + req.params.slug);
  }
});


module.exports = router;
