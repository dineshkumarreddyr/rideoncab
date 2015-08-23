(function(){
	"use strict";

	angular
	.module('rocapp')
	.controller('manageuserController', ['$scope', '$http', '$state', '$log', '$stateParams', '$roconfig','$cookieStore','managecookies','$roconstants','$commonsvc','DTOptionsBuilder',
		'DTColumnBuilder','DTColumnDefBuilder','DTInstances',
		function ($scope, $http, $state, $log, $stateParams, $roconfig,$cookie,$managecookies,$roconstants,$commonsvc,DTOptionsBuilder,DTColumnBuilder,DTColumnDefBuilder,DTInstances) {


			$scope.statelist = [{
				"name":"Andhra Pradesh"
			},{
				"name":"Telangana"
			},{
				"name":"Karnataka"
			}];

			$scope.citylist = [{
				"name":"Hyderbad"
			},{
				"name":"Visakapatnam"
			},{
				"name":"Warangal"
			},{
				"name":"Khammam"
			},{
				"name":"Guntur"
			},{
				"name":"Kadapa"
			}]
			$scope.userdetails = [];
			$scope.mybookings = [];
			function init(){
				this.getuserinfo = function(){
					$scope.userdetails = $roconfig.userdetail;
				// Binding city and state
				$scope.userdetails.state = {"name":$roconfig.userdetail.state};
				$scope.userdetails.city = {"name":$roconfig.userdetail.city};
			},
			this.getmybookings = function(){
				$http.get($roconfig.apiUrl+'user/bookings/'+$roconfig.userdetail.uid).success(function(res,status,header,conf){
					if(res!=undefined){
						$scope.mybookings = res.results;
						$scope.dtInstance = $scope.mybookings;
					}
				}).error(function(res,status,header,conf){

				});
			}
		}
		(new init()).getuserinfo();
		(new init()).getmybookings();

		$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
		.withOption('responsive',true)
		.withOption('autoWidth',false)
		.withOption('bLengthChange',false)
		.withOption('bInfo',false)


		// Update details
		$scope.udpateprofile = function(){
			var data = {};
			try{
				if(isUserformvalid()){
					data.fname = $scope.userdetails.fname;
					data.lname = $scope.userdetails.lname;
					data.address1 = $scope.userdetails.address1;
					data.address2 = $scope.userdetails.address2;
					data.city = $scope.userdetails.city;
					data.state = $scope.userdetails.state;
					data.pincode = $scope.userdetails.pincode;
					data.mobile = $scope.userdetails.mobile;

					$http.put($roconfig.apiUrl+'user/updatedetails/'+$roconfig.userdetail.uid,data).success(function(res,status,header,conf){
						if(res!=undefined){
							alert('User updated successfully');
						}
					}).error(function(res,status,header,conf){
						console.log(res);
					});
				}
				else{
					alert('Please enter all mandatory fields');
				}
			}
			catch(e){
				$log.error(e.message);
			}
		}

		// form validation
		var isUserformvalid = function(){
			if($scope.userdetails.fname!=undefined && $scope.userdetails.fname!=null && $scope.userdetails.lname!=undefined && $scope.userdetails.lname!=null && 
				$scope.userdetails.address1!=undefined && $scope.userdetails.address1!=null && $scope.userdetails.address2!=undefined && $scope.userdetails.address2!=null && 
				$scope.userdetails.city!=undefined && $scope.userdetails.city!=null && $scope.userdetails.state!=undefined && $scope.userdetails.state!=null && 
				$scope.userdetails.pincode!=undefined && $scope.userdetails.pincode!=null && $scope.userdetails.mobile!=undefined && $scope.userdetails.mobile!=null)
				return true;
			return false;
		}

		// Reset form
		$scope.resetuserform = function(){
			(new init()).getuserinfo();
		}

		$scope.udaptepassword = function(){
			var data = {};
			try{
				if($scope.useroldpassword!=undefined && $scope.useroldpassword!=null && $scope.usernewpassword!=undefined && $scope.usernewpassword!=null && 
					$scope.userconfirmpassword!=undefined && $scope.userconfirmpassword!=null){
					if($scope.usernewpassword===$scope.userconfirmpassword){
						data.password = $scope.usernewpassword;
						data.opassword = $scope.useroldpassword;

						$http.put($roconfig.apiUrl+'user/changepassword/'+$roconfig.userdetail.uid,data)
						.success(function(res,status,header,conf){
							if(res!=undefined){
								alert('password changed successfully');
								clearPasswordform();
							}
						}).error(function(res,status,header,conf){
							if(res.error.indexOf('Invalid')>-1){
								alert('Invalid old password');
							}
						});
					}
					else{
						alert('Password and confirm password are not same');
					}
				}
				else{
					alert('Please enter all mandatory fields');
				}
			}
			catch(e){
				$log.error(e.message);
			}
		}

		var clearPasswordform = function(){
			$scope.usernewpassword = null;
			$scope.useroldpassword = null;
			$scope.userconfirmpassword = null;
		}

	}]);
})();
