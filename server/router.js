const CreateSession = require('./controllers/createsession');
const path = require('path');
const rp = require('request-promise');
const _ = require('lodash');

module.exports = function(app, io) {

	app.set('etag', false);

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

	var clues = [];
	app.post('/game', function(req, res, next) {
		rp('http://jservice.io/api/random?count=13')
		.then(function(body) {
			return JSON.parse(body);
		})
		.then(function(array) { 
			var categories = [];
			_.shuffle(array).forEach(clue => {
				if (categories.indexOf(clue.category_id) > -1 || categories.length > 5) {
				} else {
					categories.push(clue.category_id)
				}
			})
			return clues = categories;
		});
		// .then(function(categories) {
		// 	categories.forEach(category => {
		// 		return clues.push([rp('http://jservice.ip/api/categories?int' + category)]);
		// 	})
		// });
		console.log(clues);
	});
}