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

	app.post('/game', function(req, res, next) {
		rp('http://jservice.io/api/random?count=13')
		.then(function(body) {
			return JSON.parse(body);
		})
		.then(function(array) { 
			var categories = [];
			_.shuffle(array).forEach(category => {
				if (categories.indexOf(category.category_id) > -1 || categories.length > 5) {
				} else {
					categories.push(category.category_id)
				}
			})
			return categories
		})
		.then(function(categories){
			var payload = [[],[]];
			for(var i = 0; i < categories.length; i++){
				rp('http://jservice.io/api/category?id=' + categories[i])
				.then(function(clues) {
					payload[0].push(JSON.parse(clues).title);
					for(var j = 0; j < 5; j++){
						payload[1].push(JSON.parse(clues).clues[j]);
					}
				})
				.catch(function(err) {
					console.log('this is err', err);
				})
			}
			setTimeout(function(){ console.log(payload) }, 500);
			// res.json({ clues: clues });
		})
		.catch(function(err) {
			console.log(err);
		});
	});
}