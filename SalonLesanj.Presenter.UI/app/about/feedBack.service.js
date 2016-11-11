(function () {
    'use strict';

    angular.module('about')
       .service('feedBackService', feedBackService);

    feedBackService.$inject = ['$http', 'config'];

    function feedBackService($http, config) {
        this.send = send;

        function send(data) {
            return $http({
                method: 'POST',
                url: config.URL_FEEDBACK,
                data: $.param(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        }
    }
})();