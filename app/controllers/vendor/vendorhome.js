rocapp.controller('vendorhomeController',['$scope','$http','$log','$roconfig','$state','$cookieStore','managecookies','$roconstants','$commonsvc',
	function($scope,$http,$log,$roconfig,$state,$cookies,$managecookies,$roconstants,$commonsvc){
		(function(){
			"use strict";

			$scope.$parent.vendorloggedin = $roconfig.vendordetail.hasOwnProperty('vid') ? true : false;
			$scope.$parent.vendorfullname = $roconfig.vendordetail.name;

			$scope.signuperror = true;
			$scope.signinerror = true;

			$scope.signup = function(){
				var data = {};
				try{
					if(validateSignupForm()){
						if(!validconfirmpassword()){
							$scope.signuperrorMsg = $roconstants.passwordnotmatch;
							$scope.signuperror = false;
							$scope.msgtype = "danger";
							return false;
						}
						if(!validEmail($scope.vemailaddress)){
							$scope.signuperrorMsg = $roconstants.invalidemail;
							$scope.signuperror = false;
							$scope.msgtype = "danger";
							return false;
						}
						if(!validPhone($scope.vmobilenumber)){
							$scope.signuperrorMsg = $roconstants.invalidphone;
							$scope.signuperror = false;
							$scope.msgtype = "danger";
							return false;
						}
						if(!validPassword($scope.vpassword)){
							$scope.signuperrorMsg = $roconstants.invalidPassword;
							$scope.signuperror = false;
							$scope.msgtype = "danger";
							return false;
						}

						data = {
							"name":$scope.vfullname,
							"email":$scope.vemailaddress,
							"username":$scope.vemailaddress,
							"password":$scope.vpassword,
							"address":"",
							"landline": $scope.vmobilenumber,
							"number2": "",
							"contactperson": "",
							"logo": "",
							"number1":""
						};
						$http.post($roconfig.apiUrl+'vendor/signup',data).success(function(res,status,headers,conf){
							if(status!=undefined && status===200){
								$scope.signuperrorMsg = $roconstants.vendorsignupsuccess;
								$scope.signuperror = false;
								$scope.msgtype = "success";
							}
						}).error(function(res,status,headers,conf){
							if(status!=undefined){
								switch(status){
									case 409:
									$scope.signuperrorMsg = $roconstants.vendoraccountexists;
									$scope.signuperror = false;
									$scope.msgtype = "danger";
									break;
									default:
									$scope.signuperrorMsg = $roconstants.vendoraccountexists;
									$scope.signuperror = false;
									$scope.msgtype = "danger";
									break;
								}
							}

						});
					}
					else{
						$scope.signuperrorMsg = $roconstants.mandatory;
						$scope.signuperror = false;
						$scope.msgtype = "danger";
					}
				}
				catch(e){
					$log.error(e.message);
				}

			}

			// Valiate confirm password
			var validconfirmpassword = function(){
				if($scope.vpassword===$scope.vcfmpassword)
					return true;
				return false;
			}
			// Validate Email
			var validEmail = function(emailaddress){
				return $commonsvc.validateEmail(emailaddress);
			}
	        // valid phone
	        var validPhone = function(number){
	        	return $commonsvc.validatePhone(number);
	        }
	        // Password validate
	        var validPassword = function(password){
	        	return $commonsvc.validatePassword(password);
	        }

			// validate form
			var validateSignupForm = function(){
				if($scope.vfullname!=undefined && $scope.vfullname!=null && $scope.vemailaddress!=undefined && $scope.vemailaddress!=null && 
					$scope.vmobilenumber!=undefined && $scope.vmobilenumber!=null && $scope.vpassword!=null && $scope.vpassword!=undefined && 
					$scope.vcfmpassword!=undefined && $scope.vcfmpassword!=null)
					return true;
				return false;
			}

			$scope.signin = function(){
				var data = {};
				try{
					if(validateSigninform()){
						data = {
							"username": $scope.vloginmemailaddress,
							"password": $scope.vloginemailpassword
						}

						$http.post($roconfig.apiUrl+'vendor/login',data).success(function(res,status,headers,conf){
							if(status!=undefined && status===200){
								if(res!=undefined){
									$cookies.put('vendordetail',res);
									$managecookies.bindvendor();
									$managecookies.remove();
									$state.go('vendorhome.manageaccount');
									$scope.vendorloggedin = true;
									$scope.vendorfullname = $roconfig.vendordetail.name;
								}
							}
						}).error(function(res,status,headers,conf){
							if(status!=undefined){
								switch(status){
									case 401:
									$scope.signinerror = false;
									$scope.alerttype = 'danger';
									$scope.errorMsg = $roconstants.vendornotexist;
									break;
								}
							}
						});
					}
					else{
						$scope.signinerror = false;
						$scope.alerttype = "danger";
						$scope.errorMsg = $roconstants.mandatory;
					}
				}
				catch(e){
					$log.error(e.message);
				}
			}

			// Reset form
			$scope.resetsignupform = function(){
				resetSignupform();
				$scope.signuperror = true;
			}

			// Reset signup form
			var resetSignupform = function(){
				$scope.vfullname = $scope.vemailaddress = $scope.vpassword = $scope.vmobilenumber = $scope.vcfmpassword = null;
			}

			// Reset sign in
			$scope.resetsignin = function(){
				resetSigninform();
				$scope.signinerror = true;
			}
			// Resets sign in common
			var resetSigninForm = function(){
				$scope.vloginemailpassword = $scope.vloginmemailaddress = null;
			}

			// validate sign in form
			var validateSigninform = function(){
				if($scope.vloginmemailaddress!=undefined && $scope.vloginmemailaddress!=null && $scope.vloginemailpassword!=undefined && 
					$scope.vloginemailpassword!=null)
					return true;
				return false;
			}

			// Signout User
			$scope.vsignoutuser = function(){
				$managecookies.removevendor();
				$state.go('vendorhome.signin');
			}

		})();
	}]);