(function () {

    'use strict';

    angular.module('app')
		.run(run);

    run.$inject = ['accountService', '$rootScope', 'dataContext'];

    function run(accountService, $rootScope, dataContext) {
        accountService.confirmLogin();

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current.$$route) {
                $rootScope.title = current.$$route.title;
            }
        });

        dataContext.settings.getAll(function (response) {
            $rootScope.settings = response;
        });
    }
})();