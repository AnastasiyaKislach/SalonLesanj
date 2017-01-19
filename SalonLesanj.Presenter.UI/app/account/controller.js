(function () {
    'use strict';

    angular.module('account')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$scope', 'accountService', '$location'];

    function AccountController($scope, accountService, $location) {

        $scope.submitReg = submitReg;
        $scope.submitLog = submitLog;

        function submitLog(loginForm) {
            $scope.submitingLog = true;
            if (loginForm.$valid) {
                accountService.login($scope.emailLog, $scope.passwordLog).success(function (response) {
                    $location.path('/admin').replace();
                }).error(function (response, e) {
                    $scope.errorLog = response.error_description;
                });
            }
        }
        function submitReg(registerForm) {
            $scope.submitingReg = true;
            var user = getRegModel();
            if (registerForm.$valid) {
                accountService.register(user).success(
                    function (response, e) {
                        alert("Регистрация прошла успешно!");
                        accountService.login($scope.emailReg, $scope.passwordReg);
                    }).error(function (response) {
                    alert('Произошла неизвестная ошибка при регистрации.');
                });
            }
        }
        function getRegModel() {
            return {
                email: $scope.emailReg,
                password: $scope.passwordReg,
                confirmPassword: $scope.confirmReg
            }
        }
    }
})();