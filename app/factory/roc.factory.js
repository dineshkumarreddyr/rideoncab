(function(){
	"use strict";

	angular.module('rocapp').factory('$commonsvc', ['$http','$q','$roconfig', function($http,$q,$roconfig){
		return{
			getCabmodel:function(){
				return $http.get($roconfig.apiUrl+'cabmodels');
			}
		}
	}]);
})();