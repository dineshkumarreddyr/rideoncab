rocapp.controller('vendoraccountController',['$scope','$http','$log','$roconfig','$state',
	function($scope,$http,$log,$roconfig,$state){
		(function(){
			"use strict";

			$scope.vendordetails=  {};
			var fngetVendorDetail = function(){
				if($roconfig.vendordetail!=undefined){
					$scope.vendordetails = $roconfig.vendordetail;
				}
			}
			fngetVendorDetail();
		})();
	}]);