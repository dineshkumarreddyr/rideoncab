rocapp.controller('searchController', ['$scope', '$http', '$state', '$log', '$roconfig','$cookieStore','managecookies',
   function ($scope, $http, $state, $log, $roconfig,$cookie,$managecookies) {
    (function () {
        "use strict";

        $scope.cabservicetype = [];

        var init = function(){
            $http.get($roconfig.apiUrl+'cabservices').success(function(res,status,headers,conf){
                if(status!=undefined && status===200){
                    $scope.cabservicetype = res;
                }
            }).error(function(res,status,headers,conf){
                $log.error(res);
            });
        }
        init();

        $scope.book = function () {
            try {
                if (isSearchFormValid()) {
                    $roconfig.bookingdetail.servicetype = $scope.servicetype;
                    $roconfig.bookingdetail.fromaddress = $scope.fromaddress;
                    $roconfig.bookingdetail.toaddress = $scope.toaddress;
                    $roconfig.bookingdetail.bookingdatetime = $scope.pickuptime;
                    $cookie.put('bookingdetail',$roconfig.bookingdetail);
                    $state.go('home.results', { stype: $scope.servicetype , from: $scope.fromaddress, to: $scope.toaddress });
                }
            }
            catch (e) {
                $log.error(e.message);
            }
        }

        //Validate search form
        var isSearchFormValid = function () {
            if ($scope.servicetype != undefined && $scope.servicetype != null && $scope.pickuptime != null && $scope.pickuptime != undefined
                && $scope.fromaddress != undefined && $scope.fromaddress != null && $scope.toaddress != undefined && $scope.toaddress != null)
                return true;
            return false;
        }


    })();
}]);