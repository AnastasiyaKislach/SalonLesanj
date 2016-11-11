
(function () {
    'use strict';

    angular.module('filters')
        .filter('accessoryFilter', accessoryFilter);

    accessoryFilter.$inject = ['$location', '$routeParams'];

    function accessoryFilter($location, $routeParams) {
        return function (items) {
            return items.filter(function (item) {
                var selectKind = $routeParams.kind;
                return item.kind === selectKind;
            });
        }
    }
})();
