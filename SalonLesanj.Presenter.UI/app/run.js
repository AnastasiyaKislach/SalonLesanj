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

        window.onload = function() {
            dataContext.brands.getAll(function (response) {
                var dresses = localStorage.getItem("selectedDresses");
                $rootScope.selected = dressesService.dressesMatching(response, dresses);
                //localStorage.setItem("selectedDresses", selectedIds);
            });
        }

        window.onunload = function () {
            dataContext.brands.getAll(function (response) {
                var selectedIds = dressesService.getDressesArrayId(response);
               var selected = localStorage.setItem("selectedDresses", selectedIds);
            });
        }

        dataContext.settings.getAll(function (response) {
            $rootScope.settings = response;
        });

        //dataContext.brands.getAll(function (response) {
        //    var selectedIds = localStorage.getItem("selectedDresses");
        //    var selectedDresses = dressesService.dressesMatching(response, selectedIds);
        //});
    }
})();