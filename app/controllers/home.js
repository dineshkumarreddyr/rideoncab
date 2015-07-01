rocapp.controller('homeController', ['$scope', '$http', '$log', '$roconfig','$cookieStore','managecookies',
 function ($scope, $http, $log, $roconfig,$cookie,$managecookies) {
    (function () {
        "use strict";

        //Default display none for messages
        $scope.hideSuccess = true;
        $scope.hideError = true;
        $scope.userlogeedin = $roconfig.userdetail.hasOwnProperty('userid');
        $scope.fullname = $roconfig.userdetail.hasOwnProperty('fullname') ? $roconfig.userdetail.fullname:'';


        //Sign in
        $scope.signin = function () {
            var data = {};
            try {
                if (signinformValid()) {
                    data = {
                        "username": $scope.signemail,
                        "password": $scope.signpassword
                    }

                    $http.post($roconfig.apiUrl + 'user/login', data).success(function (res, status, headers, conf) {
                        if (status != undefined && status === 200) {
                            $scope.fullname = res.fname;
                            $scope.userlogeedin = true;
                            $cookie.put('fullname',res.fname);
                            $cookie.put('email',res.email);
                            $cookie.put('userid',res.uid);
                            $managecookies.bind();
                            $scope.dismiss();
                        }
                    }).error(function (res, status, headers, conf) {
                        switch (status) {
                            case 401:
                            $scope.hideError = false;
                            $scope.hideSuccess = true;
                            $scope.errorMsg = 'User does not exists. Please check your username or password';
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

        //Sign up
        $scope.usersignup = function () {
            var data = {};
            try {
                if (isSignupFormvalid()) {
                    if (!verifyPasswords()) {
                        $scope.hideError = false;
                        $scope.hideSuccess = true;
                        $scope.errorMsg = 'Password and confirm password does not match';
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
                            $scope.successMsg = 'Account created successfully. Enjoy our services.';
                        }
                    }).error(function (res, status, headers, conf) {
                        switch (status) {
                            case 409:
                            $scope.hideError = false;
                            $scope.hideSuccess = true;
                            $scope.errorMsg = 'User already registered with email address';
                            break;
                            case 200:
                            $scope.hideError = false;
                            $scope.hideSuccess = true;
                            $scope.errorMsg = 'Sorry for incovenience. API Failed.';
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
    })();
}]);