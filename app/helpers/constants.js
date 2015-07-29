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
		advancebook: 'Please plan advance booking',
        passwordlink:'Your password has been sent to your email address'
	});
})();