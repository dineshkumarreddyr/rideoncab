(function(){
	"use strict";

	angular.module('roc.constants',[]).constant('$roconstants', {
		mandatory:'Please fill all the mandatory fields',
		invalidemail:'Invalid Email address',
		usernotexist:'User does not exists. Please check your username or password',
		passwordnotmatch:'Password and confirm password does not match',
		accountcreated:'Account created successfully.An email has been sent to your provided email address.',
		userexists:'User already registered with email address',
		apiFailed:'Sorry for incovenience. API Failed.',
		advancebook:'Please Book any cab service min 2 hrs in advance',
        passwordlink:'Your password has been sent to your email address',
        invalidphone:'Phone number should be 10 digits',
        invalidPassword:'Password should be in 6-12 range',
        vendorsignupsuccess:"Accoutn created successfully.",
        vendoraccountexists:"Account already exists. Please try sign in.",
        vendornotexist:"Account does not exists. Please create a new account and try sign in.",
        contactussuccess:'Thanks for contact us. Our executives will reach you soon.'
	});
})();