rocapp.controller('vendorhomeController',['$scope','$http','$log','$roconfig',function($scope,$http,$log,$roconfig){
	(function(){
		"use strict";

		$scope.signup = function(){
			var data = {};
			try{
				data = {
					"name":$scope.vfullname,
					"email":$scope.vemailaddress,
					"username":$scope.vemailaddress,
					"password":$scope.vpassword,
					"address":"NA",
					"number1": $scope.vmobilenumber,
					"number2": "NA",
					"contactperson": "NA",
					"logo": "NA"
				};

				$http.post($roconfig.apiUrl+'vendor/signup',data).success(function(res,status,headers,conf){
					debugger;
				}).error(function(res,status,headers,conf){
					if(status!=undefined){
						switch(status){
							case 409:
							alert('Already registered. Please try sign in!!');
							break;
							case 500:
							alert('Successfully registered. Please sign in to fill cab details');
							break;
							default:
							alert('API error');
							break;
						}
					}

				});
			}
			catch(e){
				$log.error(e.message);
			}

		}

		$scope.signin = function(){
			var data = {};
			try{
				data = {
					"username": $scope.vloginmemailaddress,
					"password": $scope.vloginemailpassword
				}

				$http.post($roconfig.apiUrl+'vendor/login',data).success(function(res,status,headers,conf){
					if(status!=undefined && status===200){
						alert('User logged in Successfully');
					}
				}).error(function(res,status,headers,conf){
					if(status!=undefined){
						switch(status){
							case 401:
							alert('Invalid username / password');
							break;
						}
					}
				});
			}
			catch(e){
				$log.error(e.message);
			}
		}

	})();
}]);