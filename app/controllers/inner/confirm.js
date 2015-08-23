(function(){
	"use strict";

	angular
	.module('rocapp')
	.controller('confirmController', ['$scope', '$http', '$state', '$log', '$stateParams', '$roconfig','$cookieStore','managecookies',
		function ($scope, $http, $state, $log, $stateParams, $roconfig,$cookie,$managecookies) {

			$scope.referenceid = null;
			function init(){
				this.getReferenceID = function(){
					$scope.referenceid = $roconfig.bookingdetail.transid;
				}
			}
			(new init()).getReferenceID();
		}]);
})();