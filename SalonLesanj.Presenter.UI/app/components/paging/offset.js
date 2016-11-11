(function () {
    'use strict';

    angular.module('filters')
        .filter('paging', paging);

    paging.$inject = ['$routeParams'];

    function paging($routeParams) {
        return function (items, defaultPageSize) {
            var pageIndex = (($routeParams.pageIndex && parseInt($routeParams.pageIndex)) || 1) - 1;
            var pageSize = ($routeParams.pageSize && parseInt($routeParams.pageSize)) || defaultPageSize || 6;
            var start = pageIndex * pageSize;
            var end = start + pageSize;
            var result = items.slice(start, end);
            return result;
        }
    }
})();
