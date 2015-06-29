var rocapp = angular.module('rocapp', ['ui.router', 'ui.bootstrap', 'roc.config']);

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
            url: '/results/:stype/:from/:to',
            templateUrl: "app/partials/inner/results.html",
            controller: 'resultsController'
        }).state('home.address', {
            url: '/address',
            templateUrl: "app/partials/inner/address.html"
        }).state('vendorhome',{
            url:'/vendor',
            templateUrl:'app/partials/vendorcommon.html'
        }).state('vendorhome.signin',{
            url:'/signin',
            templateUrl:'app/partials/vendor/signin.html',
            controller:'vendorhomeController'
        }).state('vendorhome.signup',{
            url:'/signup',
            templateUrl:'app/partials/vendor/signup.html',
            controller:'vendorhomeController'
        }).state('vendorhome.manageaccount',{
            url:'/manageaccount',
            templateUrl:'app/partials/vendor/manageservices.html',
            controller:'vendoraccountController'
        })

        $urlRouterProvider.otherwise("/home/search");
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);

rocapp.run(['$rootScope','$location', '$state', '$timeout',
    function($rootScope, $location, $state, $timeout){

        $rootScope.$on('$stateChangeSuccess', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    }]);

//Directives
rocapp.directive('gmapSearch', function () {
    var mapDirective = {
        restrict: 'AEC',
        link: function (scope, element, attributes) {
            if (element != undefined) {
                var options = {
                    componentRestrictions: { country: "in" }
                };
                var autocomplete = new google.maps.places.Autocomplete(element[0], options);
                google.maps.event.addListener(autocomplete, 'place_changed', function () {
                    scope[attributes.ngModel] = $(element)[0].value;
                    scope.$apply();
                });
            }
        }
    }
    return mapDirective;
});