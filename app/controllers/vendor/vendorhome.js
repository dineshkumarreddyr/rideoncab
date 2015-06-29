rocapp.controller('vendorhomeController',['$scope','$http','$log','$roconfig','$state',
	function($scope,$http,$log,$roconfig,$state){
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
						"address":"",
						"number1": $scope.vmobilenumber,
						"number2": "",
						"contactperson": "",
						"logo": ""
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
							i(res!=undefined){
								$roconfig.vendordetail = res;
								$state.go('vendorhome.manageaccount');
							}
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