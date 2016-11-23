(function () {
    'use strict';

    angular.module('app')
        .controller('InfoController', InfoController);

    InfoController.inject = ['$rootScope', 'dataContext'];

    function InfoController($rootScope, dataContext) {

        //dataContext.brands.getAll(function (response) {
        //    $rootScope.brands = response;
        //});
        //dataContext.kinds.getAll(function (response) {
        //    $rootScope.kinds = response;
        //});
        //$scope.$watch("brands", function (newValue) {
        //    $scope.brands = newValue;
        //});
        //$scope.$watch("kinds", function (newValue) {
        //    $scope.kinds = newValue;
        //});

    }
})();