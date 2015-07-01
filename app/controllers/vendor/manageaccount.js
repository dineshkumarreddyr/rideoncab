rocapp.controller('vendoraccountController',['$scope','$http','$log','$roconfig','$state',
	function($scope,$http,$log,$roconfig,$state){
		(function(){
			"use strict";

			$scope.cabservices = [];

			$scope.cabtypes = [{
				'mid':'1',
				'type':'Economy'
			},{
				'mid':'2',
				'type':'Business'
			}]

			var init = function(){
				if($roconfig.vendordetail!=undefined){
					$scope.vname = $roconfig.vendordetail.name;
					$scope.vemailaddress = $roconfig.vendordetail.email;
					$scope.vcnumber = $roconfig.vendordetail.number1;
					$scope.vcnumber2 = $roconfig.vendordetail.number2;
					$scope.vcontactperson = $roconfig.vendordetail.contactperson;
					$scope.vaddress = $roconfig.vendordetail.address;
					$scope.vexp = $roconfig.vendordetail.exp;
					$scope.vcabs = $roconfig.vendordetail.nocif;
					$scope.vlocation = $roconfig.vendordetail.slocation;
					$scope.vfname = $roconfig.vendordetail.fname;
					$scope.vfemail = $roconfig.vendordetail.femail;

					$http.get($roconfig.apiUrl+'cabservices').success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							$scope.cabservices = res;
						}
					}).error(function(res,status,headers,conf){

					});
				}
			}
			init();



			$scope.updatevendor = function(){
				var data = {};
				try{
					data.name = $scope.vname;
					data.contactperson = $scope.vcontactperson;
					data.number1 = $scope.vcnumber;
					data.number2 = $scope.vcnumber2;
					data.address = $scope.vaddress;
					data.exp = $scope.vexp;
					data.nocif = $scope.vcabs;
					data.fname = $scope.vfname;
					data.femail = $scope.vfemail;
					data.slocation = $scope.vlocation;
					data.tlproof = '-NA-'; //@@TODO -  Implement
					data.tcards = '-NA-'; //@@TODO -  Implement


					$http.put($roconfig.apiUrl+'vendor/updatedetails/'+$roconfig.vendordetail.vid,data).success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							alert('Updated successfully');
						}
					}).error(function(res,status,headers,conf){
						$log.error(res);
					});
				}
				catch(e){
					$log.error(e.message);
				}
			}

			$scope.savecabprice = function(){
				var data = {};
				try{
					data.vid = $roconfig.vendordetail.vid;
					data.prices = [{
						vcmid:$scope.vcabtypes,
						cpkm:$scope.vcabprice,
						csid:$scope.vendorcabservices	
					}];

					$http.post($roconfig.apiUrl+'vendor/prices',data).success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							alert('price inserted successfully');
						}
					}).error(function(res,status,headers,conf){
						$log.error(res);
					});
					
				}
				catch(e){
					$log.error(e.message);
				}
			}
		})();
	}]);