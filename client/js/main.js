var app = angular.module('App', ['ngRoute', 'ngCookies', 'ngFlash']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/partials/_loginReg.html',
		controller: 'LoginRegController',
	})
	.when('/messages', {
		templateUrl: '/partials/_wall.html',
		controller: 'WallController',
	})
	.when('/users', {
		templateUrl: '/partials/_allUsers.html',
		controller: 'LoginRegController',
	})
	.otherwise({
		redirecTo: '/',
	});
})