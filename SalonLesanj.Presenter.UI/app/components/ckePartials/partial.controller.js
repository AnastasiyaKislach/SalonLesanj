(function () {
    'use strict';

    angular.module('partial')
        .controller('PartialController', PartialController);

    PartialController.$inject = ['$scope', 'dataContext', 'accountService', '$location', '$route', '$rootScope', 'fileService'];

    function PartialController($scope, dataContext, accountService, $location, $route, $rootScope, fileService) {

        $scope.chooseImg = function (imageUrl) {
            fileService.setSelected(imageUrl);
        }

        $scope.init = function () {
            dataContext.files.getAll(function (response) {
                fileService.add(response);
                $scope.images = response;
                alert(response);
            });
        }
    }
})();