(function () {
    'use strict';

    angular.module('filters')
        .filter('selectDressFilter', selectDressFilter);

    selectDressFilter.$inject = [];

    function selectDressFilter() {
        return function (items) {
            return items.filter(function(item) {
                return item.isSelect;
            });
        }
    }
})();
