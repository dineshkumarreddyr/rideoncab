(function () {
    "use strict";

    angular
    .module('rocapp')
    .controller('searchController', ['$scope', '$http', '$state', '$log', '$roconfig', '$cookieStore', 'managecookies', '$roconstants', '$timeout','$rootScope',
       function ($scope, $http, $state, $log, $roconfig, $cookie, $managecookies, $roconstants, $timeout,$rootScope) {
           $scope.cabservicetype = [];

           // $scope.errorhide();
           // $scope.errMsg = null;

           var init = function () {
               $http.get($roconfig.apiUrl + 'cabservices').success(function (res, status, headers, conf) {
                   if (status != undefined && status === 200) {
                       $scope.cabservicetype = res;
                   }
               }).error(function (res, status, headers, conf) {
                   $log.error(res);
               });
           }
           init();

           $scope.book = function () {
               try {
                   if (isSearchFormValid()) {

                       if (!validDateandTime()) {
                           $scope.danger();
                           $scope.errMsg = $roconstants.advancebook;
                           return;
                       }

                       if ($rootScope.currentcity == undefined || $rootScope.currentcity == null || $rootScope.currentcity == '') {
                           $scope.danger();
                           $scope.errMsg = $roconstants.city;
                           return;
                       }
                       // Hide the error msg
                       $scope.errorhide();
                       $roconfig.bookingdetail.servicetype = $scope.servicetype;
                       $roconfig.bookingdetail.fromaddress = $scope.fromaddress;
                       $roconfig.bookingdetail.toaddress = $scope.toaddress;
                       $roconfig.bookingdetail.bookingdatetime = $scope.pickuptime;
                       $roconfig.bookingdetail.selectedcity = $scope.currentcity;
                       $cookie.put('bookingdetail', $roconfig.bookingdetail);
                       $state.go('home.results', { stype: $scope.servicetype, from: $scope.fromaddress, to: $scope.toaddress, c: $scope.currentcity });
                   }
                   else {
                       $scope.danger();
                       $scope.errMsg = $roconstants.mandatory;
                   }
               }
               catch (e) {
                   $log.error(e.message);
               }
           }

           // Advance booking validation
           var validDateandTime = function () {
               if (new Date().addHours(2).getTime() <= new Date($scope.pickuptime).getTime()) {
                   return true;
               }
               return false;
           }

           //Validate search form
           var isSearchFormValid = function () {
               if ($scope.servicetype != undefined && $scope.servicetype != null && $scope.pickuptime != null && $scope.pickuptime != undefined
                   && $scope.fromaddress != undefined && $scope.fromaddress != null && $scope.toaddress != undefined && $scope.toaddress != null)
                   return true;
               return false;
           };
           $scope.changeservicetype = function () {
               if ($scope.servicetype && ($scope.servicetype == '1' || $scope.servicetype == '5')) {
                   alert('We gonna start this service very soon, meanwhile you can access our HOURLY PACKAGE or OUTSTATION service');
                   $scope.servicetype = '3';
               }
           };

           $rootScope.$watch('currentcity', function () {
               if ($rootScope.currentcity)
                   $scope.currentcity = $rootScope.currentcity;
           });
       }]);
})();