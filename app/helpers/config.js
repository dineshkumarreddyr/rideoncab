(function () {
	"use strict";

	angular.module('roc.config', []).value('$roconfig', {
		apiUrl: 'http://crestdzines.com/rideoncabservice/',
		vendordetail:{},
		userdetail:{},
		bookingdetail:{},
		navstate:''
	});
})();