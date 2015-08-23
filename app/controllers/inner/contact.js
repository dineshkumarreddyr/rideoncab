(function(){
	"use strict";

	angular
	.module('rocapp')
	.controller('ContactController',['$scope','$http','$log','$roconfig','$roconstants',function ($scope,$http,$log,$roconfig,$roconstants){
		// Default
		$scope.alertShow = false;
		$scope.submit = function(invalid){
			if(invalid){
				$scope.alertShow = true;
				$scope.alertType = 'danger';
				$scope.alertMsg = $roconstants.mandatory;
				return;
			}
			var data = {};

			try{
				data.name = $scope.name;
				data.email = $scope.email;
				data.mobile = $scope.phone;
				data.subject = $scope.subject;
				data.msg = $scope.message;

				if(data!=undefined){
					$http.post($roconfig.apiUrl+'contact',data).success(function(res,status){
						if(status!=undefined && status===200){
							$scope.alertShow = true;
							$scope.alertType = 'success';
							$scope.alertMsg = $roconstants.contactussuccess
							clearform();
						}
					})
					.error(function(res){
						$log.error("API Url -" + res);
					})
				}
			}
			catch(e){
				$log.error(e.message);
			}

		}

		// Clear form
		var clearform = function(){
			$scope.name = $scope.email = $scope.phone = $scope.subject = $scope.message = null;
		}
	}]);
})();