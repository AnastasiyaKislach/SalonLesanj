(function () {
    'use strict';

    angular.module('home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'accountService', '$location'];

    function HomeController($scope, accountService, $location) {

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        }
    }
})();