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

			$scope.termscond = [];

			function init(){
				this.getTerms = function(){
					$http.get($roconfig.apiUrl+'vendor/terms/'+$roconfig.vendordetail.vid)
					.success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							$scope.termscond = res;
							$scope.termsinstance = $scope.termscond;
						}
					})
					.error(function(res,status,headers,conf){

					});	
				}
				this.getCabpirces = function(){
					$http.get($roconfig.apiUrl+'vendor/services/'+$roconfig.vendordetail.vid)
					.success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							$scope.cabprices = res.results;
							$scope.dtInstance = $scope.cabprices;
						}
					})
					.error(function(res,status,headers,conf){

					});
				}
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
				}

				$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
				.withOption('responsive',true)
				.withOption('autoWidth',false)
				.withOption('bLengthChange',false)
				.withOption('bInfo',false)
			}
			(new init()).getCabpirces();
			(new init()).getTerms();



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
							(new init()).getCabpirces();
							alert('price inserted successfully');
							$scope.vcabtypes = null;
							$scope.vcabmodel = null;
							$scope.vcabprice = null;
							$scope.vendorcabservices = null;
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

			$scope.addterms = function(){
				var data = {};
				try{
					data.vid = $roconfig.vendordetail.vid;
					data.content = $scope.vterms;

					$http.post($roconfig.apiUrl+'vendor/terms',data).success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							(new init()).getTerms();
							alert('Terms and conditions added successfully');
							$scope.vterms = null;
						}
					}).error(function(res,status,headers,conf){
						$log.error(res);
					});
				}
				catch(e){
					$log.error(e.message);
				}
			}

			$scope.changepassword = function(){
				try{
					if(isPasswordSame()){
						$http.put($roconfig.apiUrl+'vendor/changepassword/'+$roconfig.vendordetail.vid,{
							opassword:$scope.voldpassword,
							password:$scope.vnewpassword
						})
						.success(function(res,status,headers,conf){
							if(status!=undefined && status===200){
								alert('password updated successfully');
							}
						})
						.error(function(res,status,headers,conf){
							if(status!=undefined && status===401)
								alert('Old password not matching. Please check and enter again');
							$log.error(res);
						});
					}
					else
						alert('Password and confirm password are not same');
				}
				catch(e){
					$log.error(e.message);
				}
			}

			var isPasswordSame = function(){
				if($scope.vnewpassword===$scope.vcnewpassword)
					return true;
				return false;
			}

			// Update prices
			$scope.updateprices = function(index){
				var data = {};
				try{
					if($scope.cabprices!=undefined){
						$scope.vcabprice = $scope.cabprices[index].cpkm;
						$scope.vcabmodel = $scope.cabprices[index].vcmid;
					}
				}
				catch(e){
					$log.error(e.message);
				}
			}

			// Update terms and conditions
			$scope.updateterms = function(index){
				var data = {};
				try{
					if($scope.termscond!=undefined){
						$scope.vterms = $scope.termscond[index].terms;
					}
				}
				catch(e){
					$log.error(e.message);
				}
			}
		})();
	}]);