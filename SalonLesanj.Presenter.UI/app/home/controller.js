(function () {
    'use strict';

    angular.module('app')
        .controller('InfoController', InfoController);

    InfoController.inject = ['$scope', 'dataContext'];

    function InfoController($scope, dataContext) {

        dataContext.brands.getAll(function (response) {
            $scope.brands = response;
        });
        dataContext.kinds.getAll(function (response) {
            $scope.kinds = response;
        });
        $scope.$watch("brands", function (newValue) {
            $scope.brands = newValue;
        });
        $scope.$watch("kinds", function (newValue) {
            $scope.kinds = newValue;
        });

    }
})();