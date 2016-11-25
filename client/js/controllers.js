app.controller('LoginRegController', ['$scope', 'UserFactory', 'CommentFactory','Flash', '$location', '$cookies', function($scope, UserFactory, CommentFactory,Flash, $location, $cookies) {
	// Use /#/users to see if the database logic is setup correctly.
	// Displays all the users in /#/users
	UserFactory.index().then(function(res) {
		$scope.users = res.data;
	});

	// Displays all the users, comments, posts, in /#/users
	CommentFactory.index().then(function(res) {
		$scope.comments = res.data;
	});

	$scope.register = function() {
		UserFactory.create($scope.register_user).then(function(res) {
			$cookies.put('user_id', res.data._id)
			$location.url('/messages');
		}).catch(function(res) {
			for (var key in res.data.errors) {
				Flash.create('danger', res.data.errors[key].message);
			}
		});
	};

	$scope.login = function() {
		UserFactory.login($scope.login_user).then(function(res) {
			$cookies.put('user_id', res.data._id);
			$location.url('/messages');
		}).catch(function(res) {
			console.log(res);
			Flash.create('danger', res.data.errors);
		});
	};
}]);

app.controller('WallController', ['$scope', '$cookies', '$location', 'UserFactory', 'PostFactory', 'CommentFactory', function($scope, $cookies, $location, UserFactory, PostFactory, CommentFactory) {
	
	// If the user has logged in, assign $scope.user to that user
	if ($cookies.get('user_id') !== undefined) {
		UserFactory.findUser($cookies.get('user_id')).then(function(res) {
			$scope.user = res.data;
		}).catch(function(res) {
			// If there is an error, display the error, log the user out. 
			console.log(res);
			$cookies.put('user_id', undefined);
			$location.url('/');
		});
	} else {
		$location.url('/');
	}

	$scope.logout = function() {
		$cookies.put('user_id', undefined);
		$location.url('/');
	};

	$scope.postMessage = function() {
		if ($scope.post !== undefined) {
			$scope.post.user_id = $scope.user._id;
			PostFactory.create($scope.post).then(function(res) {
				// When new post is created, reload the posts/comments.
				PostFactory.index().then(function(res) {
					$scope.posts = res.data;
				})
			});
		}
	};

	$scope.postComment = function(comment, id) {
		if (comment) {
			if (comment.text !== '') {
				comment.post_id = id;
				comment.user_id = $scope.user._id;
				CommentFactory.create(comment).then(function(res) {
					// When new comment is created, reload all the posts/comments.
					PostFactory.index().then(function(res) {
						$scope.posts = res.data; 
					});
				});
			}
		}
	};

	// Loads all the posts/comments when the user is routed to this partial page. 
	PostFactory.index().then(function(res) {
		$scope.posts = res.data;
	});

}]);
