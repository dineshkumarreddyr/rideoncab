rocapp.controller('registerController', ['$scope', '$http', '$state', '$log', '$stateParams', '$roconfig','$cookieStore','managecookies','$roconstants','$commonsvc',
	function ($scope, $http, $state, $log, $stateParams, $roconfig,$cookie,$managecookies,$roconstants,$commonsvc) {


		$scope.indianstates = [{
			sid:1,
			sname:'Andhra Pradesh'
		},{
			sid:2,
			sname:'Telangana'
		},{
			sid:3,
			sname:'Karnataka'
		},{
			sid:4,
			sname:'Tamilnadu'
		},{
			sid:5,
			sname:'Kerala'
		},{
			sid:6,
			sname:'Maharastra'
		},{
			sid:7,
			sname:'Madhya Pradesh'
		},{
			sid:8,
			sname:'Orissa'
		},{
			sid:9,
			sname:'West Bengal'
		},{
			sid:10,
			sname:'Goa'
		},{
			sid:11,
			sname:'New Delhi'
		}];

		$scope.indiancities = [{
			cid:1,
			cname:'Hyderabad'
		},{
			cid:2,
			cname:'Visakapatnam'
		},{
			cid:3,
			cname:'Vijayawada'
		},{
			cid:4,
			cname:'Tirupati'
		},{
			cid:5,
			cname:'Warangal'
		}];

		$scope.eaddress = null;
		$scope.isuserloggedin = false;

		function init(){
			this.binduserprofile = function(){
				if($roconfig.userdetail.hasOwnProperty('uid') && $roconfig.userdetail.uid!=null){
					$scope.ufname = $roconfig.userdetail.fname;
					$scope.ulname = $roconfig.userdetail.lname;
					$scope.umobilenumber = $roconfig.userdetail.mobile;
					$scope.uemail = $roconfig.userdetail.email;
					$scope.uaddress1 = $roconfig.userdetail.address1;
					$scope.uaddress2 =$roconfig.userdetail.address2;
					$scope.uselectedcity = $roconfig.userdetail.city;
					$scope.uselectedstate = $roconfig.userdetail.state;
					$scope.upostalcode = $roconfig.userdetail.pincode;

					if(this.isuserdetailsexists())
						$scope.isuserloggedin = true;
					$scope.userverify = $roconfig.userdetail;
				}

				if($roconfig.bookingdetail.hasOwnProperty('vendorid') && $roconfig.bookingdetail.vendorid!=null){
					$scope.fromaddress = $roconfig.bookingdetail.fromaddress;
					$scope.toaddress = $roconfig.bookingdetail.toaddress;
					$scope.estdistance = $roconfig.bookingdetail.estdistance;
					$scope.esttime = $roconfig.bookingdetail.esttime;
					$scope.approxTotal = $roconfig.bookingdetail.approxTotal;
					$scope.bookingdatetime = new Date($roconfig.bookingdetail.bookingdatetime);
				}
			},
			this.userlogged = function(){
				if(this.isuserdetailsexists())
					$scope.isuserloggedin = true;
				$scope.userverify = $roconfig.userdetail;
			},
			this.getuserdetails = function(){

			},
			this.isuserdetailsexists = function(){
				if(($roconfig.userdetail.address1!=undefined && $roconfig.userdetail.address1!='') && 
					($roconfig.userdetail.address2!=undefined && $roconfig.userdetail.address2!='') && 
					($roconfig.userdetail.city!=undefined && $roconfig.userdetail.city!='') && 
					($roconfig.userdetail.state!=undefined && $roconfig.userdetail.state!='') && 
					($roconfig.userdetail.pincode!=undefined && $roconfig.userdetail.pincode!='') &&
					($roconfig.userdetail.mobile!=undefined && $roconfig.userdetail.mobile))
					return true;
				return false;
			}
		}
		(new init()).binduserprofile();


		$scope.saveuserinfo = function(){
			var data = {};
			try{
				if(!registerFormValid()){
					$scope.danger();
					$scope.addrerrMsg = $roconstants.mandatory;
					return;
				};

				if(!$commonsvc.validateEmail($scope.uemail)){
					$scope.danger();
					$scope.addrerrMsg = $roconstants.invalidemail;
					return;
				}
				if($roconfig.userdetail.hasOwnProperty('uid'))
					data.uid = $roconfig.userdetail.uid;
				data.fname = $scope.ufname;
				data.lname = $scope.ulname;
				data.mobile = $scope.umobilenumber;
				data.email = $scope.uemail;
				data.address1 = $scope.uaddress1;
				data.address2 = $scope.uaddress2;
				data.state = $scope.uselectedstate;
				data.city = $scope.uselectedcity;
				data.pincode = $scope.upostalcode;

				$http.post($roconfig.apiUrl+'user/register',data).success(function(res,status,headers,conf){
					if(status!=undefined && (status===200 || status===201)){
						$scope.errorhide();
						$cookie.put('userdetail',res);
						$managecookies.bind();
						$state.go($state.current, {}, {reload: true});
					}
				})
				.error(function(res,status,headers,conf){
					$log.error(res);
				});
			}
			catch(e){
				$log.error(e.message);
			}
		}

		// Valiate user form
		var registerFormValid = function(){
			if($scope.ufname!=null && $scope.ufname!=undefined && $scope.ulname!=undefined && $scope.ulname!=null && $scope.umobilenumber!=undefined && $scope.umobilenumber!=null 
				&& $scope.uemail!=undefined && $scope.uemail!=null && $scope.uaddress1!=undefined && $scope.uaddress1!=null && $scope.uselectedstate!=undefined && $scope.uselectedstate!=null && 
				$scope.uselectedcity!=undefined && $scope.uselectedcity!=null && $scope.upostalcode!=null && $scope.upostalcode!=undefined)
				return true;
			return false;
		}

		$scope.editaddress = function(){
			$scope.isuserloggedin = false;
		}


		// Book a cab - Final
		$scope.confirmbooking = function(){
			var data = {};
			try{
				data.servicetype = $roconfig.bookingdetail.servicetype;
				data.servicename = $roconfig.bookingdetail.vendorname;
				data.servicechargeperkm = $roconfig.bookingdetail.chargeperkm;
				data.servicekm = $roconfig.bookingdetail.estdistance;
				data.servicestimatedrs = $roconfig.bookingdetail.approxTotal.toString();
				data.bookingfromlocation = $roconfig.bookingdetail.fromaddress;
				data.bookingtolocation = $roconfig.bookingdetail.toaddress;
				data.serviceclass = 'Business';
				data.userid = $roconfig.userdetail.uid;
				data.bookingdatetime = $roconfig.bookingdetail.bookingdatetime;
				data.vendorid = $roconfig.bookingdetail.vendorid;
				data.bookingstatus = 'book';

				$http.post($roconfig.apiUrl+'bookcab',data).success(function(res,status,headers,conf){
					if(status!=undefined && (status===200 || status===201)){
						$roconfig.bookingdetail.transid = res.transid;
						$cookie.put('bookingdetail',$roconfig.bookingdetail);
						$state.go('home.confirm');
					}
				})
				.error(function(res,status,headers,conf){
					$log.error(res);
				});
			}
			catch(e){
				$log.error(e.message);
			}
		}
	}]);
