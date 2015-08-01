(function(){
	"use strict";

	angular.module('rocapp').factory('$commonsvc', ['$http','$q','$roconfig', function($http,$q,$roconfig){
		return{
			getCabmodel:function(){
				return $http.get($roconfig.apiUrl+'cabmodels');
			},
			getTermsandCondition:function(vendorid){
				return $http.get($roconfig.apiUrl+'vendor/terms');
			},
			validateEmail:function(email){
				var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
				return EMAIL_REGEXP.test(email);
			},
			validatePhone:function(number){
				if(number!=undefined && number!=null){
					if(number.length===10)
						return true;
					return false;
				}
			},
			validatePassword:function(password){
				if(password!=undefined && password!=null){
					if(password.length>=6 && password.length<=12){
						return true;
					}
				}
				return false;
			}
		}
	}]);
})();