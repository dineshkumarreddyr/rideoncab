rocapp.controller('resultsController', ['$scope', '$http', '$state', '$log', '$stateParams', '$roconfig','$cookieStore',
    function ($scope, $http, $state, $log, $stateParams, $roconfig,$cookie) {
        (function () {
            "use strict";

            //Default array
            $scope.cabresults = [];

            $scope.approxTotal = '--';


            $scope.fromaddress = $stateParams.from;
            $scope.toaddress = $stateParams.to;
            $scope.estdistance = '';
            $scope.esttime = '';
            //Search results page
            var getResults = function () {
                var data = {};
                try {
                    if ($stateParams.stype != undefined && $stateParams.stype != null) {
                        data.servicetype = $stateParams.stype;
                        $http.post($roconfig.apiUrl + 'search', data).success(function (res, status, headers, conf) {
                            $scope.cabresults = res.results;
                        }).error(function (res, status, headers, conf) {
                            $log.error(res);
                        });

                        var distanceService = new google.maps.DistanceMatrixService();
                        distanceService.getDistanceMatrix({
                            origins: [$stateParams.from],
                            destinations: [$stateParams.to],
                            travelMode: google.maps.TravelMode.DRIVING,
                            unitSystem: google.maps.UnitSystem.METRIC,
                            durationInTraffic: true,
                            avoidHighways: false,
                            avoidTolls: false
                        },
                        function (response, status) {
                            if (status !== google.maps.DistanceMatrixStatus.OK) {
                            } else {
                                $scope.estdistance = response.rows[0].elements[0].distance.text;
                                $scope.esttime = response.rows[0].elements[0].duration.text;
                            }
                        });
                    }
                }
                catch (e) {
                    $log.error(e.message);
                }
            }
            getResults();


            $scope.continueaddress = function (index) {
                $roconfig.bookingdetail.cabtype = $scope.cabresults[index].cabtype;
                $roconfig.bookingdetail.cabmodel = $scope.cabresults[index].cabmodel;
                $roconfig.bookingdetail.chargeperkm = $scope.cabresults[index].chargeperkm;
                $roconfig.bookingdetail.vendorid = $scope.cabresults[index].vendorid;
                $roconfig.bookingdetail.vendorname = $scope.cabresults[index].vendorname;
                $roconfig.bookingdetail.vendoraddress = $scope.cabresults[index].vendoraddress;
                $roconfig.bookingdetail.estdistance = $scope.estdistance;
                $roconfig.bookingdetail.esttime = $scope.esttime;
                $roconfig.bookingdetail.approxTotal = $scope.approxTotal;
                $cookie.put('bookingdetail',$roconfig.bookingdetail);
                debugger;
                
                $state.go('home.address');
            }

            $scope.selectCab = function (e) {
                $(".terms-wrap").hide();
                $('.unselected').removeClass('selected');
                $('.list-each').removeClass('selectedcab');
                $(e.currentTarget).find('.unselected').addClass('selected');
                $(e.currentTarget).find(".terms-wrap").slideToggle();
                $(e.currentTarget).addClass('selectedcab');

                var price = parseInt($(e.currentTarget).find('.pricing').text());
                $scope.approxTotal = price * parseInt($scope.estdistance);
            }

        })();
    }]);