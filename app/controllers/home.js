(function(){
    "use strict";

    angular
    .module('rocapp')
    .controller('homeController', ['$scope', '$http', '$log', '$roconfig','$cookieStore','managecookies','$state','$roconstants','$commonsvc','$timeout',
       function ($scope, $http, $log, $roconfig,$cookie,$managecookies,$state,$roconstants,$commonsvc,$timeout) {
        
        //Default display none for messages
        $scope.hideSuccess = true;
        $scope.hideError = true;
        $scope.userlogeedin = $roconfig.userdetail.hasOwnProperty('uid');
        $scope.fullname = $roconfig.userdetail.hasOwnProperty('fname') ? $roconfig.userdetail.fname : '';
        $scope.hidefgError = true;


        //Sign in
        $scope.signin = function () {
            var data = {};
            try {
                if (signinformValid()) {
                    if(!validEmail($scope.signemail)){
                        $scope.danger();
                        $scope.signinerrMsg = $roconstants.invalidemail;
                        return;
                    }
                    data = {
                        "username": $scope.signemail,
                        "password": $scope.signpassword
                    }

                    $http.post($roconfig.apiUrl + 'user/login', data).success(function (res, status, headers, conf) {
                        $scope.errorhide();
                        if (status != undefined && status === 200) {
                            $scope.fullname = res.fname;
                            $scope.userlogeedin = true;
                            $cookie.put('userdetail',res);
                            $cookie.put('fullname',res.fname);
                            $cookie.put('email',res.email);
                            $cookie.put('userid',res.uid);
                            $managecookies.bind();
                            $scope.dismiss();
                            $timeout(function(){
                                if($state.current.name==='home.address')
                                    $state.go($state.current, {}, {reload: true});
                            },1000);
                        }
                    }).error(function (res, status, headers, conf) {
                        $scope.errorhide();
                        switch (status) {
                            case 401:
                            $scope.danger();
                            $scope.signinerrMsg = $roconstants.usernotexist;
                            break;
                        }
                    });
                }
                else {
                    $scope.danger();
                    $scope.signinerrMsg = $roconstants.mandatory;
                }
            }
            catch (e) {
                $log.error(e.message);
            }
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

        //Sign up
        $scope.usersignup = function () {
            var data = {};
            try {
                if (isSignupFormvalid()) {
                    if (!verifyPasswords()) {
                        $scope.hideError = false;
                        $scope.hideSuccess = true;
                        $scope.errorMsg = $roconstants.passwordnotmatch;
                        return false;
                    }

                    if(!validEmail($scope.emailaddress)){
                        $scope.hideError = false;
                        $scope.hideSuccess = true;
                        $scope.errorMsg = $roconstants.invalidemail;
                        return false;
                    }
                    if(!validPhone($scope.number)){
                        $scope.hideError = false;
                        $scope.hideSuccess = true;
                        $scope.errorMsg = $roconstants.invalidphone;
                        return false;
                    }
                    if(!validPassword($scope.password)){
                        $scope.hideError = false;
                        $scope.hideSuccess = true;
                        $scope.errorMsg = $roconstants.invalidPassword;
                        return false;
                    }  

                    data.fname = $scope.firstname;
                    data.lname = $scope.lastname;
                    data.email = $scope.emailaddress;
                    data.mobile = $scope.number;
                    data.password = $scope.password;
                    data.city = "";
                    data.state = "";

                    //data = JSON.stringify(data);

                    $http.post($roconfig.apiUrl + 'user/signup', {
                        "fname": $scope.firstname,
                        "lname": $scope.lastname,
                        "email": $scope.emailaddress,
                        "city": "hyd",
                        "state": "AP",
                        "mobile": $scope.number,
                        "password": $scope.password
                    }).success(function (res, status, headers, conf) {
                        if (status != undefined && status === 201) {
                            $scope.hideError = true;
                            $scope.hideSuccess = false;
                            $scope.successMsg = $roconstants.accountcreated;
                            clearsignup();
                        }
                    }).error(function (res, status, headers, conf) {
                        switch (status) {
                            case 409:
                            $scope.hideError = false;
                            $scope.hideSuccess = true;
                            $scope.errorMsg = $roconstants.userexists;
                            break;
                            case 200:
                            $scope.hideError = false;
                            $scope.hideSuccess = true;
                            $scope.errorMsg = $roconstants.apiFailed;
                            break;
                        }
                    });
                }
                else {
                    $scope.hideError = false;
                    $scope.hideSuccess = true;
                    $scope.errorMsg = 'Please enter all mandatory fields';
                }
            }
            catch (e) {
                $log.error(e.message);
            }
        }

        // Clear signup form
        var clearsignup = function(){
            $scope.firstname = $scope.lastname = $scope.emailaddress = $scope.password = $scope.confirmpassword = $scope.number = null;
        }

        //Validate sign up form
        var isSignupFormvalid = function () {
            if ($scope.firstname != undefined && $scope.firstname != null && $scope.lastname != undefined && $scope.lastname != null &&
                $scope.emailaddress != undefined && $scope.emailaddress != null && $scope.password != undefined && $scope.password != null &&
                $scope.confirmpassword != undefined && $scope.confirmpassword != null && $scope.number != undefined && $scope.number != null)
                return true;
            return false;
        }

        //Validate passwords
        var verifyPasswords = function () {
            if ($scope.password === $scope.confirmpassword)
                return true;
            return false;
        }

        //Validate Sign in
        var signinformValid = function () {
            if ($scope.signemail != undefined && $scope.signemail != null && $scope.signpassword != undefined && $scope.signpassword != null)
                return true;
            return false;
        }

        // Sign Out
        $scope.signoutuser = function(){
            $managecookies.remove();
            $managecookies.removevendor();
            $managecookies.removebooking();
            $scope.userlogeedin = false;
            if($state.current.name!=='home.search')
                $state.go('home.search');
            else
                $state.go($state.current, {}, {reload: true});
        }

        //Forgot password
        $scope.forgotpassword = function () {
            var data = {};
            try {
                if ($scope.email != undefined && $scope.email != null) {
                    data.email = $scope.email;
                    $http.post($roconfig.apiUrl + 'user/forgotpassword', data).success(function (res, status, headers, conf) {
                        if (res != undefined && res.result.indexOf('success') > -1) {
                            $scope.hidefgError = false;
                            $scope.fgtype = 'success';
                            $scope.forgotMsg = $roconstants.passwordlink;
                            $scope.email = null;
                        }
                    }).error(function (res, status, headers, conf) {
                        $log.error(res);
                    });
                }
                else {
                    $scope.hidefgError = false;
                    $scope.fgtype = 'danger';
                    $scope.forgotMsg = $roconstants.mandatory;
                }
            }
            catch (e) {
                $log.error(e.message);
            }
        }

        //Clearing error messages
        angular.element('#myModal2').on('hidden.bs.modal', function () {
            $scope.hidefgError = true;
            $scope.$apply();
        });

        angular.element('#myModal1').on('hidden.bs.modal',function(){
            $scope.hideSuccess = true;
            $scope.hideError = true;
            $scope.$apply();
        });

        angular.element('#myModal').on('hidden.bs.modal',function(){
            $scope.errorhide();
            $scope.$apply();
        });
    }]);
})();