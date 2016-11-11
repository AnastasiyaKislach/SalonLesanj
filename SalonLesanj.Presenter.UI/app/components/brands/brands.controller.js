(function () {
    'use strict';

    angular.module('brands')
        .controller('BrandsListCtrl', BrandsListCtrl);

    BrandsListCtrl.inject = ['$scope', 'dataContext'];

    function BrandsListCtrl($scope, dataContext) {

        dataContext.brands.getAll(function (response) {
            $scope.brands = response;
        });
    }
})();