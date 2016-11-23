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
                var dresses = localStorage.getItem("selectedDresses");
                dresses = JSON.parse(dresses);
                var selected = dressesService.dressesMatching(response, dresses);
                localStorage.removeItem("selectedDresses");
            });
       

        window.onunload = function () {
            console.log("ykjsdjnfjjfjdnfjdnf");
            dataContext.brands.getAll(function (response) {
                var selectedIds = dressesService.getDressesArrayId(response);
                var str = JSON.stringify(selectedIds);
                var selected = localStorage.setItem("selectedDresses", str);
                sessionStorage.setItem("selectedDresses", str);
            });
        };

        dataContext.settings.getAll(function (response) {
            $rootScope.settings = response;
        });

        //dataContext.brands.getAll(function (response) {
        //    var selectedIds = localStorage.getItem("selectedDresses");
        //    var selectedDresses = dressesService.dressesMatching(response, selectedIds);
        //});
    }
})();