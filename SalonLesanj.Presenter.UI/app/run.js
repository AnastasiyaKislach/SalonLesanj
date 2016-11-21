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

        //$rootScope.$on('onUnload', function (e) {
            //dataContext.brands.getAll(function(response) {
            //    var selectedIds = dressesService.getDressesArrayId(response);
            //    localStorage.setItem();
            //});
           
          //  console.log('leaving page'); // Use 'Preserve Log' option in Console
        //});
        window.unload = function () {
            alert('xmdfhsjhfgjsdhgfjshdgfjh');
            localStorage.setItem('asdsd', 13);
            //dataContext.brands.getAll(function(response) {
            //    var selectedIds = dressesService.getDressesArrayId(response);
            //    localStorage.setItem("selectedIds", selectedIds);
            //});
        }
     
        dataContext.settings.getAll(function (response) {
            $rootScope.settings = response;
        });
    }
})();