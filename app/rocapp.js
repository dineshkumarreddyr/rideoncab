var rocapp = angular.module('rocapp', ['ui.router', 'ui.bootstrap', 'roc.config','datatables','ngCookies']);

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
            templateUrl:'app/partials/vendorcommon.html',
            controller:'vendorhomeController'
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
        }).state('adminhome',{
            url:'/admin',
            templateUrl:'app/partials/admincommon.html',
            controller:'adminController'
        }).state('adminhome.manage',{
            url:'/manageaccounts',
            templateUrl:'app/partials/admin/adminoperations.html',
            controller:'adminController'
        })

        $urlRouterProvider.otherwise("/home/search");
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);

rocapp.run(['$rootScope','$location', '$state', '$timeout','managecookies',
    function($rootScope, $location, $state, $timeout,$managecookies){

        $rootScope.$on('$stateChangeSuccess', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $managecookies.bind();
            $managecookies.bindvendor();
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

// Directive for Close Modal
rocapp.directive('rocmodalActions', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.dismiss = function () {
                element.modal('hide');
            };

            scope.toggle = function () {
                element.modal('show');
            };
        }
    }
});

//Factory
rocapp.factory('managecookies',['$cookieStore','$roconfig','$state',function($cookie,$roconfig,$state){
    return{
        bind:function(){
            if($cookie.get('email')!=undefined && $cookie.get('email')!=null){
                $roconfig.userdetail.fullname = $cookie.get('fullname');
                $roconfig.userdetail.email = $cookie.get('email');
                $roconfig.userdetail.userid = $cookie.get('userid');
            }
        },
        remove:function(){
            $roconfig.userdetail.fullname = null;
            $roconfig.userdetail.email = null;
            $roconfig.userdetail.userid = null;
            $cookie.remove('fullname');
            $cookie.remove('email');
            $cookie.remove('userid');
        },
        bindvendor:function(){
            if($cookie.get('vendordetail')!=undefined && $cookie.get('vendordetail')!=null){
                $roconfig.vendordetail = $cookie.get('vendordetail');
            }
        },
        removevendor:function(){
            $roconfig.vendordetail = {};
            $cookie.remove('vendordetail');
        }
    }
}]);

