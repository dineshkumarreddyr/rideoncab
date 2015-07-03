rocapp.controller('adminController', ['$scope', '$http', '$state', '$log', '$stateParams', '$roconfig','DTOptionsBuilder',
	'DTColumnBuilder','DTColumnDefBuilder','DTInstances',
	function ($scope, $http, $state, $log, $stateParams, $roconfig,DTOptionsBuilder,DTColumnBuilder,DTColumnDefBuilder,DTInstances) {


		$scope.vendorlist = [];
		$scope.cabprices = [];
		$scope.cabservices = [];
		$scope.cabtypes = [];
		$scope.termscond = [];

		function init(){
			this.getvendor = function(){
				$http.get($roconfig.apiUrl+'admin/vendors').success(function(res,status,headers,conf){
					if(status!=undefined && status===200){
						$scope.vendorlist = res.results;
					}
				}).error(function(res,status,headers,conf){
					$log.error(res);
				});
			}
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
		init();
		(new init()).getvendor();

		$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
		.withOption('responsive',true)
		.withOption('autoWidth',false)
		.withOption('bLengthChange',false)
		.withOption('bInfo',false)


		/* -------------- Terms and Conditions ----------------------------------- */
		// Add terms
		$scope.addterms = function(){
			var data = {};
			try{
				data.vid = $scope.selectedvendor;
				data.content = $scope.evterms;

				$http.post($roconfig.apiUrl+'vendor/terms',data).success(function(res,status,headers,conf){
					if(status!=undefined && status===200){
						getTerms();
						alert('Terms and conditions added successfully');
						$scope.evterms = null;
					}
				}).error(function(res,status,headers,conf){
					$log.error(res);
				});
			}
			catch(e){
				$log.error(e.message);
			}
		}

		// Get terms and conditions
		var getTerms = function(){
			$http.get($roconfig.apiUrl+'vendor/terms/'+$scope.selectedvendor)
			.success(function(res,status,headers,conf){
				if(status!=undefined && status===200){
					$scope.termscond = res;
					$scope.termsinstance = $scope.termscond;
				}
			})
			.error(function(res,status,headers,conf){

			});	
		}

		// Update terms and conditions
		$scope.updateterms = function(index){
			var data = {};
			try{
				if($scope.termscond!=undefined){
					$scope.evterms = $scope.termscond[index].terms;
				}
			}
			catch(e){
				$log.error(e.message);
			}
		}
		/* ---------------------- End of terms and conditions -----------------------------*/

		/* -------------------------- Start of Price section -------------------------------*/

		$scope.savecabprice = function(){
			var data = {};
			try{
				data.vid = $scope.selectedvendor;
				data.prices = [{
					ctype:$scope.evcabtypes,
					vcmid:$scope.evcabmodel,
					cpkm:$scope.evcabprice,
					csid:$scope.evendorcabservices	
				}];

				$http.post($roconfig.apiUrl+'vendor/prices',data).success(function(res,status,headers,conf){
					if(status!=undefined && status===200){
						getCabpirces();
						alert('price inserted successfully');
						$scope.evcabtypes = null;
						$scope.evcabmodel = null;
						$scope.evcabprice = null;
						$scope.evendorcabservices = null;
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


		var getCabpirces = function(){
			$http.get($roconfig.apiUrl+'vendor/services/'+$scope.selectedvendor)
			.success(function(res,status,headers,conf){
				if(status!=undefined && status===200){
					$scope.cabprices = res.results;
					$scope.dtInstance = $scope.cabprices;
				}
			})
			.error(function(res,status,headers,conf){

			});
		}

		/* -------------------------- End of Price -----------------------------------*/

		/* ---------------------------- Start of Vendor details  ----------------------------*/
		// Bind the vendor details based on selection of vendor

		$scope.bindvendordetails = function(){
			if($scope.selectedvendor!=undefined && $scope.vendorlist!=undefined){
				var vlist = _.filter($scope.vendorlist,function(rows){
					return $scope.selectedvendor==rows.vid;
				});

				if(vlist!=undefined && vlist!=null && vlist.length>0){
					$scope.evname = vlist[0].name;
					$scope.evemail = vlist[0].email;
					$scope.evmobilenumber = vlist[0].number1;
					$scope.evalternatenumber = vlist[0].number2;
					$scope.evcperson = vlist[0].contactperson;
					$scope.evaddress = vlist[0].address;
					$scope.evexp = vlist[0].exp;
					$scope.evcabs = vlist[0].nocif;
					$scope.evslocation = vlist[0].slocation;
					$scope.evfname = vlist[0].fname;
					$scope.evfemail = vlist[0].femail;
					$scope.evphonenumber = vlist[0].landline;
				}
				getCabpirces();
				getTerms();
			}
		}

		// Udpate vendor details
		$scope.updatesavevendor = function(){
			var data = {};
			try{
				data.name = $scope.evname;
				data.contactperson = $scope.evcperson;
				data.number1 = $scope.evmobilenumber;
				data.number2 = $scope.evalternatenumber;
				data.address = $scope.evaddress;
				data.exp = $scope.evexp;
				data.nocif = $scope.evcabs;
				data.fname = $scope.evfname;
				data.femail = $scope.evfemail;
				data.slocation = $scope.evslocation;
					data.tlproof = '-NA-'; //@@TODO -  Implement
					data.tcards = '-NA-'; //@@TODO -  Implement,
					data.landline = $scope.evphonenumber,
					data.tarrif = '-NA-' //@@TODO


					$http.put($roconfig.apiUrl+'vendor/updatedetails/'+$scope.selectedvendor,data)
					.success(function(res,status,headers,conf){
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
			/* ------------------------------ End of vendor details -----------------------------------*/


			/* ------------------------------- Vendor account creation -----------------------------------*/

			$scope.generatePassword = function(){
				var password = randomString(8);
				$scope.avpassword = password;
			}


			function randomString(len, an){
				an = an&&an.toLowerCase();
				var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
				for(;i++<len;){
					var r = Math.random()*(max-min)+min <<0;
					str += String.fromCharCode(r+=r>9?r<36?55:61:48);
				}
				return str;
			}

			$scope.cretevendoraccount = function(){
				var data = {};
				try{
					data = {
						"name":$scope.avname,
						"email":$scope.avemail,
						"username":$scope.avemail,
						"password":$scope.avpassword,
						"address":"",
						"number1": $scope.avmobilenumber,
						"number2": "",
						"contactperson": "",
						"logo": ""
					};
					$http.post($roconfig.apiUrl+'vendor/signup',data).success(function(res,status,headers,conf){
						if(status!=undefined && status===200){
							(new init().getvendor());
							alert('Account created Successfully');
						}
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

			/* --------------------- end of vendor account -----------------------------*/

		}]);