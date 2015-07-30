(function(){
	"use strict";

	angular.module('roc.constants',[]).constant('$roconstants', {
		mandatory:'Please fill all the below fields',
		invalidemail:'Invalid Email address',
		usernotexist:'User does not exists. Please check your username or password',
		passwordnotmatch:'Password and confirm password does not match',
		accountcreated:'Account created successfully. Enjoy our services.',
		userexists:'User already registered with email address',
		apiFailed:'Sorry for incovenience. API Failed.',
		advancebook:'Please Book any cab service min 2 hrs in advance'
	});
})();