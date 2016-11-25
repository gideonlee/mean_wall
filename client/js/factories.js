app.factory('UserFactory', ['$http', function($http) {
	var factory = {};

	// Shows all users in db on /#/users
	factory.index = function() {
		return $http.get('/users');
	};

	factory.create = function(user) {
		return $http.post('/users', user);
	};

	factory.login = function(user) {
		return $http.post('/login', user);
	};

	factory.findUser = function(user_id) {	
		return $http.post('/users/'+user_id);
	};

	return factory; 
}]);

app.factory('PostFactory', ['$http', function($http) {
	var factory = {};
	
	// Populates all the users, posts, and comments on _wall.html
	factory.index = function() {
		return $http.get('/posts');
	};

	factory.create = function(post) {
		return $http.post('/posts', post);
	};


	return factory;
}]);

app.factory('CommentFactory', ['$http', function($http) {
	var factory = {};

	// Populates all comments, users, posts in db. Used for testing on _allUsers.html
	factory.index = function() {
		return $http.get('/comments');
	};

	factory.create = function(comment) {
		return $http.post('/comments', comment);
	};

	return factory;

}]);
