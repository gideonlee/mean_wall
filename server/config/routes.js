var UserController = require('./../controllers/users');
var PostController = require('./../controllers/posts');
var CommentController = require('./../controllers/comments');
var path = require('path');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../../client/index.html'));
	});

	app.get('/users', UserController.index);
	app.post('/users', UserController.create);
	app.post('/users/:id', UserController.findUser);
	app.post('/login', UserController.login);

	app.get('/posts', PostController.index);
	app.post('/posts', PostController.create);

	app.get('/comments', CommentController.index);
	app.post('/comments', CommentController.create);
};