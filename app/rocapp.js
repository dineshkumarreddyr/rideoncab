var rocapp = angular.module('rocapp',['ui.router','ui.bootstrap']);

rocapp.value('$anchorScroll', angular.noop);

// Configure angular routing
rocapp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        // Actual routing
        $stateProvider.state('home', {
            url: "/home",
            templateUrl: "app/partials/common.html",
        }).state('home.search',{
		url:'/search',
		templateUrl:"app/partials/inner/home.html"	
		});

        $urlRouterProvider.otherwise("/home/search");
        $locationProvider.html5Mode(true).hashPrefix('!');
	}]);