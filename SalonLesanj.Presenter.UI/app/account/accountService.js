(function () {
    'use strict';

    angular.module('account')
        .service('accountService', accountService);

    accountService.$inject = ['$http', 'config', '$rootScope'];

    function accountService($http, config, $rootScope) {

        $rootScope.user = {
            isAuthorize: false,
            isAdmin: false,
            isSuperAdmin: false,
            logOut: function () {
                logout();
            }
        }

        this.register = register;
        this.login = login;
        this.logout = logout;
        this.confirmLogin = confirmLogin;
        this.getUser = getUser;
        this.token = token;
        this.tokenType = tokenType;

        function register(user) {
            return $http({
                method: 'POST',
                url: config.CTRL_ACCOUNT_REGISTER,
                data: $.param(user),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        }
        function login(login, password) {
            return $http({
                method: 'POST',
                url: config.CTRL_ACCOUNT_LOGIN,
                data: $.param({
                    grant_type: 'password',
                    username: login,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function (response) {
                token(response.access_token);
                tokenType(response.token_type);
                confirmLogin();
            }).error(function () {
                logout();
            });
        }
        function logout() {
            token(null);
            tokenType(null);
            $rootScope.user.isAuthorize = false;
            $rootScope.user.isAdmin = false;
            $rootScope.user.isSuperAdmin = false;
        }
        function getUser() {
            return $rootScope.user;
        }

        function confirmLogin() {
            return $http({
                method: 'GET',
                url: config.CTRL_ACCOUNT_CONFIRMLOGIN,
                xsrfHeaderName: 'Authorization',
                headers: {
                    'Authorization': tokenType() + ' ' + token(),
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function (response) {
                $rootScope.user.isAuthorize = response.IsAuthorize;
                $rootScope.user.isAdmin = response.IsAdmin;
                $rootScope.user.isSuperAdmin = response.IsSuperAdmin;
            }).error(function () {
                logout();
            });
        }

        function token(value) {
            if (arguments.length) {
                localStorage.setItem(config.AUTH_TOKEN, value);
            }
            return localStorage.getItem(config.AUTH_TOKEN);
        }
        function tokenType(value) {
            if (arguments.length) {
                localStorage.setItem(config.AUTH_TOKEN_TYPE, value);
            }
            return localStorage.getItem(config.AUTH_TOKEN_TYPE);
        }
    }
})();
