var rocapp = angular.module('rocapp', ['ui.router', 'ui.bootstrap','roc.config']);

rocapp.value('$anchorScroll', angular.noop);

// Configure angular routing
rocapp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        // Actual routing
        $stateProvider.state('home', {
            url: "/home",
            templateUrl: "app/partials/common.html",
            controller: 'homeController'
        }).state('home.search', {
            url: '/search',
            templateUrl: "app/partials/inner/search.html",
            controller: 'searchController'
        }).state('home.results', {
            url: '/results',
            templateUrl: "app/partials/inner/results.html",
            controller: 'resultsController'
        }).state('home.address', {
            url: '/address',
            templateUrl: "app/partials/inner/address.html"
        });

        $urlRouterProvider.otherwise("/home/search");
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);