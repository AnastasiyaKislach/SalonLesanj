(function () {
    'use strict';

    angular.module('filters')
        .filter('dressFilter', dressFilter);

    dressFilter.$inject = ['$location', '$routeParams'];

    function dressFilter($location, $routeParams) {
       return function (items) {
            return items.filter(function (item) {
                var selectBrand = $routeParams.brand;
                return item.brand === selectBrand;
            });
        }
    }
})();
