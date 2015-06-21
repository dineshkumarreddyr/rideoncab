rocapp.controller('resultsController', ['$scope', '$http', '$state', '$log', '$stateParams', '$roconfig',
    function ($scope, $http, $state, $log, $stateParams, $roconfig) {
        (function () {
            "use strict";

            //Default array
            $scope.cabresults = [];

            //Search results page
            var getResults = function () {
                var data = {};
                try {
                    if ($stateParams.stype != undefined && $stateParams.stype != null) {
                        data.cabtype = $stateParams.stype;
                        $http.post($roconfig.apiUrl + 'search', data).success(function (res, status, headers, conf) {
                            $scope.cabresults = res.results;
                        }).error(function (res, status, headers, conf) {
                            $log.error(res);
                        });
                    }
                }
                catch (e) {
                    $log.error(e.message);
                }
            }
            getResults();


            $scope.bookcab = function () {
                $state.go('home.address');
            }

            $scope.selectCab = function () {
                $(".terms-wrap").hide();
                $('.unselected').removeClass('selected');
                $('.list-each').removeClass('selectedcab');
                $('.list-each').find('.unselected').addClass('selected');
                $('.list-each').find(".terms-wrap").slideToggle();
                $('.list-each').addClass('selectedcab');
            }

        })();
    }]);