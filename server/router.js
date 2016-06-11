const CreateSession = require('./controllers/createsession');
const path = require('path');
const request = require('request');

module.exports = function(app, io) {

	app.disable('etag');

	app.get('/', function(req, res) {
		res.sendFile(path.resolve(__dirname + '/../index.html'));
	});

	app.get('/bundle.js', function(req, res) {
	  res.sendFile(path.resolve(__dirname + '/../bundle.js'));
	});

	app.get('/style/style.css', function(req, res) {
	  res.sendFile(path.resolve(__dirname + '/../style/style.css'));
	});

	app.get('/*', function(req, res) {
		res.sendFile(path.resolve(__dirname + '/../index.html'));
	});

	app.get('/node_modules/socket.io-client/socket.io.js', function(req, res) {
	  res.sendFile(path.resolve(__dirname + '/../node_modules/socket.io-client/socket.io.js'))
	});

	app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../style/icon/favicon.ico'));
  });

	app.post('/create', CreateSession.createSession, function(req, res, next) {
		res.json({ session: req.body.session })
	});

	app.get('/game', function(req, res, next) {
		console.log('poop');
		// request('http://jservice.io/api/random?count=6', function(err, response, body) {
		// 	console.log('poop');
		// 	if(err) { console.log(err) }
		// 	if(!err && response.statusCode === 200){ console.log('poop'); }
		// })();
	});
}