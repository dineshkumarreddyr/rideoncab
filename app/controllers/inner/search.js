rocapp.controller('searchController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    (function () {
        "use strict";


        $scope.book = function () {
            $state.go('home.results');
        }
    })();
}]);