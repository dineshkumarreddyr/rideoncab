rocapp.controller('resultsController', ['$scope', '$http', '$state', '$log', '$stateParams', '$roconfig','$cookieStore','$commonsvc','$filter',
    function ($scope, $http, $state, $log, $stateParams, $roconfig,$cookie,$commonsvc,$filter) {
        (function () {
            "use strict";

            //Default array
            $scope.cabresults = [];
            $scope.tempCabresults = [];

            $scope.approxTotal = '--';


            $scope.fromaddress = $stateParams.from;
            $scope.toaddress = $stateParams.to;
            $scope.estdistance = '';
            $scope.esttime = '';
            $scope.allcabmodels = [];

            function init(){
                this.getCabmodel = function(){
                    $commonsvc.getCabmodel().then(function(response){
                        if(response.status!=undefined && response.status===200){
                            $scope.allcabmodels = response.data.result;
                        }
                    });
                };
                this.getTermsConditions = function(vid){
                    $commonsvc.getTermsandCondition(vid).then(function(response){
                        if(response.status!=undefined && response.status===200){
                            // @@TODO -  Terms and Conditions
                        }
                    });
                }
            }
            (new init()).getCabmodel();

            //Search results page
            var getResults = function () {
                var data = {};
                try {
                    if ($stateParams.stype != undefined && $stateParams.stype != null) {
                        data.servicetype = $stateParams.stype;
                        $http.post($roconfig.apiUrl + 'search', data).success(function (res, status, headers, conf) {
                            $scope.cabresults = res.results;
                            $scope.tempCabresults = res.results;
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

            // Filter for cab model change
            $scope.cabmodelChange = function(){
                var filteredItems =  [];
                if($scope.filterVendor!=undefined)
                    filteredItems = $filter('filter')($scope.tempCabresults,{cabmodel:$scope.filterCabmodel,vendorname:$scope.filterVendor});
                else
                    filteredItems = $filter('filter')($scope.tempCabresults,{cabmodel:$scope.filterCabmodel});
                $scope.cabresults = filteredItems;
            }
            // Filter for vendor name
            $scope.vendornameChange = function(){
                var filteredItems =  [];
                if($scope.filterCabmodel!=undefined)
                    filteredItems = $filter('filter')($scope.tempCabresults,{cabmodel:$scope.filterCabmodel,vendorname:$scope.filterVendor});
                else
                    filteredItems = $filter('filter')($scope.tempCabresults,{cabmodel:$scope.filterVendor});
                $scope.cabresults = filteredItems;
            }

            // Reset filters
            $scope.resetall = function(){
                angular.copy($scope.tempCabresults,$scope.cabresults);
            }

            // Sory by price
            $scope.sortprice = function(){
                _.each($scope.cabresults,function(v,i){
                    v.chargeperkm = parseInt(v.chargeperkm);
                });
                $scope.cabresults = $filter('orderBy')($scope.cabresults,'-chargeperkm');
            }

            // Sort high to low
            $scope.sortlowprice = function(){
                _.each($scope.cabresults,function(v,i){
                    v.chargeperkm = parseInt(v.chargeperkm);
                });
                $scope.cabresults = $filter('orderBy')($scope.cabresults,'+chargeperkm');
            }

        })();
    }]);