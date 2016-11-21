(function () {
    'use strict';

    angular.module('app')
        .controller('InfoController', InfoController);

    InfoController.inject = ['$scope', 'dataContext'];

    function InfoController($scope, dataContext) {

        //dataContext.brands.getAll(function (response) {
        //    $scope.brands = response;
        //    for (var i = 0; i < $scope.brands.length; i++) {
        //        for (var j = 0; j < $scope.brands[i].Dresses.length; j++) {
        //            var dress = $scope.brands[i].Dresses[j];
        //            if (localStorage.getItem(dress.Title)) {
        //                $scope.brands[i].Dresses[j].isSelect = true;
        //            }
        //        }
        //    }
        //});

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