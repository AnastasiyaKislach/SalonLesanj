(function () {
    'use strict';

    angular.module('filters')
        .filter('trusted', trusted);

    trusted.$inject = ['$sce'];

    function trusted($sce) {
        return function (html) {
            return $sce.trustAsHtml(html);
        }
    }
})();
