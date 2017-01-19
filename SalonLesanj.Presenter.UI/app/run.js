(function () {

    'use strict';

    angular.module('app')
		.run(run);

    run.$inject = ['accountService', '$rootScope', 'dataContext', 'dressesService'];

    function run(accountService, $rootScope, dataContext, dressesService) {

        accountService.confirmLogin();

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current.$$route) {
                $rootScope.title = current.$$route.title;
            }
        });

        dataContext.brands.getAll(function (response) {
            $rootScope.brands = response;

            var selected = dressesService.dressesMatching(response);
        });


        window.onunload = function () {
            dataContext.brands.getAll(function (response) {
                var selectedIds = dressesService.getDressesArrayId(response);
                dressesService.dressLocalStorage(selectedIds);
            });
        };

        dataContext.settings.getAll(function (response) {
            $rootScope.settings = response;
        });
       
        dataContext.kinds.getAll(function (response) {
            $rootScope.kinds = response;
        });
        
    }
})();