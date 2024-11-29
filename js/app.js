const myApp = angular.module("medium", ['ui.router', 'ui.bootstrap']);
const baseUrl = 'https://enemy-app-22211c61306e.herokuapp.com';

myApp.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
	$httpProvider.interceptors.push('BearerAuthInterceptor');
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state({
			name: 'home',
			url: '/',
			templateUrl: 'view/home.html',
			controller: 'HomeController'
		})
		.state({
			name: 'post',
			url: '/post/:id',
			templateUrl: 'view/post.html',
			controller: 'PostController'
		})

});

const isAuthorized = ($state, $rootScope) => {
	const isLogged = localStorage.getItem("token");

	if (!isLogged) {
		$state.go('login');
		return;
	}

	$rootScope.userLogged = true;
};