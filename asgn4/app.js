// app.js
var express = require('express');
var app = express();
var path = require('path');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var session = require('express-session');

app.set('view engine', 'hbs');

var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));

var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));

//global vars
var objG = new Object();
objG.complaint = "The person sitting next to me was eating hard-boiled eggs in the subway car (???!!!)";
objG.line = "G";
var objF = new Object();
objF.complaint = "There was a possum loose on the platform";
objF.line = "F";
var objA = new Object();
objA.complaint = "The train was an hour late!";
objA.line = "A";
var complaints = [objG, objF, objA];
var objAArr = [objA];
var objGArr = [objG];
var objFArr = [objF];

//logs for troubleshooting
app.use(function(req, res, next) {
	console.log(req.method, req.path);
	console.log("=====");
  console.log("req.query :", req.query);
  console.log("req.body :", req.body);
	console.log();
	next();
});

//populates homepage; applies filter capabilities
app.get('/', function(req, res) {
	var filter = req.query.filter;
	if (filter === 'a' || filter === 'A') {
		res.render('index', {layout: 'homepage-layout', obj: objAArr});
	} else if (filter === 'g' || filter === 'G') {
		res.render('index', {layout: 'homepage-layout', obj: objGArr});
	} else if (filter === 'f' || filter === 'F') {
		res.render('index', {layout: 'homepage-layout', obj: objFArr});
	} else {
		//if no filter ... print all in reverse
		res.render('index', {layout: 'homepage-layout', obj: complaints.slice().reverse()});
	}
});

//complain form page
app.get('/complain', function(req, res) {
  res.render('complain');
});

//adding new complaints
app.post('/complain', function(req, res) {
	//increments complaint count for stats page
	if (req.session.count) {
		++req.session.count;
	} else {
		req.session.count = 1;
	}
	//creates and adds new complaint
	var newComplaint = req.body.complaint;
	var newSubwayLine = req.body.subwayLine;
	var newObject = new Object();
	newObject.complaint = req.body.complaint;
	newObject.line = req.body.subwayLine;
	complaints.push(newObject);
	//redirects to homepage
	res.redirect(303, '/');
});

//stats page
app.get('/stats', function(req, res) {
	//if complaint(s) have been added..
	if (req.session.count) {
		res.render('stats', {obj: req.session.count});
	} else {
		//if new session - reset counter
		req.session.count = 0;
		res.render('stats', {obj: req.session.count});
	}
});

app.listen(3000);
console.log('Server started on localhost:3000; Ctrl-C to quit...');
