(function () {
    'use strict';

    angular.module('gallery')
        .controller('GalleryController', GalleryController);


    GalleryController.$inject = ['$scope', '$routeParams', 'dataContext', 'accountService', '$route', '$rootScope', 'config', '$location'];

    function GalleryController($scope, $routeParams, dataContext, accountService, $route, $rootScope, config, $location) {

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            dataContext.photos.getAll(function (response) {
                $scope.photos = response;
            });
        }

        $scope.isRow = function (index) {
            var bool = (index + 1) % 3 === 0;
            return bool;
        }

        $scope.isLast = function (index) {
            var bool = index === (photos.length - 1);
            return bool;
        }

        $scope.remove = function (id) {
            dataContext.photos.remove(id,
                function () {
                },
                function () {
                    alert("Произошла ошибка при удалении.");
                });
        }

        $scope.add = function (photoForm) {
            $scope.create = true;

            if (!$scope.file) {
                photoForm.$valid = false;
                return;
            }

            if (photoForm.$valid) {

                var data = {
                    Author: $scope.Author,
                    ImageUrl: $scope.file.name
                }
                //dataContext.photos.disableCash();
                dataContext.photos.post(data,
                    function (response) {
                        $scope.responseData = response;

                        dataContext.files.upload($scope.file,
                           function (response) {
                               $scope.filesResponse = response;
                               $('#appModal').modal('show');
                               $('#appModal').on('hidden.bs.modal', function (event) {
                                   $location.path('/admin/gallery');
                                   $route.reload();
                               });
                           });
                        //dataContext.photos.getAll(function (response) {
                        //    $scope.photos = response;
                        //});
                    },
                    function () {
                    });
            }
        }
    }
})();