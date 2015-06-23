rocapp.controller('searchController', ['$scope', '$http', '$state', '$log', '$roconfig', function ($scope, $http, $state, $log, $roconfig) {
    (function () {
        "use strict";

        $scope.cabservicetype = [{
            id: 1,
            type: 'Point to Point'
        }, {
            id: 2,
            type: 'Outstation'
        }, {
            id: 3,
            type: 'Hourly Packages'
        }, {
            id: 4,
            type: 'Cab Here'
        }]

        $scope.book = function () {
            try {
                if (isSearchFormValid()) {
                    $state.go('home.results', { stype: 'MINI' });
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