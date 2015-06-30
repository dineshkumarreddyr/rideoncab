rocapp.controller('vendoraccountController',['$scope','$http','$log','$roconfig','$state',
	function($scope,$http,$log,$roconfig,$state){
		(function(){
			"use strict";

			var fngetVendorDetail = function(){
				if($roconfig.vendordetail!=undefined){
					$scope.vname = $roconfig.vendordetail.name;
					$scope.vemailaddress = $roconfig.vendordetail.email;
					$scope.vnumber = $roconfig.vendordetail.number1;
				}
			}
			fngetVendorDetail();
		})();
	}]);