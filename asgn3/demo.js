//demo.js
//create a demo site using node's http module

var http = require('http');
var fs = require('fs');

function serveStatic(res, path, contentType, resCode) {
  fs.readFile(path, function(err, data) {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end("500 - Internal Error");
    } else {
      res.writeHead(resCode, {'Content-Type': contentType});
      res.end(data);
    }
  });
}

function handleRequest(req,res) {
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  var statusCode = 0;
  var dateTime = new Date();

	switch(path) {
		case '':
      statusCode = 200;
      serveStatic(res, './public/index.html', 'text/html', 200);
      console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
			break;
    case '/homepage':
      statusCode = 200;
  		serveStatic(res, './public/index.html', 'text/html', 200);
      console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
  		break;
		case '/about':
      statusCode = 200;
			serveStatic(res, './public/about.html', 'text/html', 200);
      console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
			break;
    case '/me':
      fs.readFile('./public/about.html', function(err, data) {
        if (err) {
          console.log('err ' + err);
          statusCode = 500;
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end("500 - Internal Error");
          console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
        } else {
          statusCode = 301;
          res.writeHead(301, {'Location': '/about'});
          res.end(data);
          console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
        }
      });
      break;
    case '/img/dougie.png':
      statusCode = 200;
  		serveStatic(res, './public/img/dougie.png', 'image/png', 200);
      console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
  		break;
    case '/img/dougie.png/':
      statusCode = 200;
      serveStatic(res, './public/img/dougie.png', 'image/png', 200);
      console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
      break;
    case '/img/dougie2.png':
      statusCode = 200;
  		serveStatic(res, './public/img/dougie2.png', 'image/png', 200);
      console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
    	break;
    case '/css/base.css':
      statusCode = 200;
  		serveStatic(res, './public/css/base.css', 'text/css', 200);
      console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
    	break;
		default:
      statusCode = 404;
      serveStatic(res, './public/404.html', 'text/html', 200);
      console.log(dateTime + " " + req.method + " " + req.url + " " + statusCode + " " + http.STATUS_CODES[statusCode]);
			break;
   }
}

http.createServer(handleRequest).listen(3000);
console.log('Server started on localhost:3000; Ctrl-C to quit...');
