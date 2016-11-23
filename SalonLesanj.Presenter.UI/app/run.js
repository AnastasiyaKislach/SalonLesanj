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
            var dresses = localStorage.getItem("selectedDresses");
            dresses = JSON.parse(dresses);
            var selected = dressesService.dressesMatching(response, dresses);
        });


        window.onunload = function () {
            dataContext.brands.getAll(function (response) {
                var selectedIds = dressesService.getDressesArrayId(response);
                var str = JSON.stringify(selectedIds);
                var selected = localStorage.setItem("selectedDresses", str);
                alert(selected);
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