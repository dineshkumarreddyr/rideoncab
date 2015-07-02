rocapp.controller('vendoraccountController',['$scope','$http','$log','$roconfig','$state','DTOptionsBuilder',
	'DTColumnBuilder','DTColumnDefBuilder','DTInstances',
	function($scope,$http,$log,$roconfig,$state,DTOptionsBuilder,DTColumnBuilder,DTColumnDefBuilder,DTInstances){
		(function(){
			"use strict";

			$scope.$parent.vendorloggedin = $roconfig.vendordetail.hasOwnProperty('vid') ? true : false;
			$scope.$parent.vendorfullname = $roconfig.vendordetail.name;

			$scope.cabservices = [];

			$scope.cabtypes = [];

			$scope.cabprices = [];

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
					$scope.vofficenumber = $roconfig.vendordetail.landline;

					$http.get($roconfig.apiUrl+'cabservices').success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							$scope.cabservices = res;
						}
					}).error(function(res,status,headers,conf){
						$log.error(res);
					});

					$http.get($roconfig.apiUrl+'cabtypes').success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							$scope.cabtypes = res;
						}
					}).error(function(res,status,headers,conf){
						$log.error(res);
					});

					function getCabpirces(){
						$http.get($roconfig.apiUrl+'vendor/services/'+$roconfig.vendordetail.vid)
						.success(function(res,status,headers,conf){
							if(status!=undefined && status===200){
								if(res!=undefined && res.results!=undefined){
									_.each(res.results,function(v,i){
										if($scope.cabservices!=undefined && $scope.cabservices.length>0){
											var cs = _.filter($scope.cabservices,function(r){
												return v.csid==r.sid;
											});

											v.cservice = cs[0].service;
										}
										if($scope.cabtypes!=undefined && $scope.cabtypes.length>0){
											var ct = _.filter($scope.cabtypes,function(r){
												return v.vctype==r.ctid;
											});
											v.vcabtype = ct[0].ctype;
										}
									});
								}
								$scope.cabprices = res.results;
								$scope.dtInstance = $scope.cabprices;
							}
						})
						.error(function(res,status,headers,conf){

						});	
					}
					getCabpirces();
				}

				$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
				.withOption('responsive',true)
				.withOption('autoWidth',false)
				.withOption('bLengthChange',false)
				.withOption('bInfo',false)
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
					data.tcards = '-NA-'; //@@TODO -  Implement,
					data.landline = $scope.vofficenumber,
					data.tarrif = '-NA-' //@@TODO


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
						ctype:$scope.vcabtypes,
						vcmid:$scope.vcabmodel,
						cpkm:$scope.vcabprice,
						csid:$scope.vendorcabservices	
					}];

					$http.post($roconfig.apiUrl+'vendor/prices',data).success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							init();
							alert('price inserted successfully');
						}
					}).error(function(res,status,headers,conf){
						//$log.error(res);
						init();
						//alert('price inserted successfully');
					});
					
				}
				catch(e){
					$log.error(e.message);
				}
			}
		})();
	}]);