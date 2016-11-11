(function () {
    'use strict';

    angular.module('accessories')
        .controller('AccessoryEditController', AccessoryEditController);

    AccessoryEditController.$inject = ['$scope', 'dataContext', 'accountService', '$location', '$routeParams', '$route'];

    function AccessoryEditController($scope, dataContext, accountService, $location, $routeParams, $route) {

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            if ($routeParams.id) {
                dataContext.kinds.getAll(function (response) {
                    $scope.accessoryKinds = response;
                });
                dataContext.accessories.getAll(function (response) {
                    $scope.editAccessories = response;
                    $scope.activeAccessory = $scope.editAccessories.find(
                        function (item, index) {
                            return item.Title === $routeParams.id;
                        });
                    $scope.selected = $scope.accessoryKinds.find(
                        function(item) {
                            return item.Id == $scope.activeAccessory.KindId;
                        }).TitleRus;
                });
            }

            $scope.update = function (accessoryEditForm) {
                $scope.update = true;
                var imageUrl;
                if (accessoryEditForm.$valid) {
                    if ($scope.file) {
                        imageUrl = $scope.file.name;
                    } else {
                        imageUrl = $scope.activeAccessory.ImageUrl.replace("/Images/", "");
                    }

                    var data = {
                        Id: $scope.activeAccessory.Id,
                        ImageUrl: imageUrl,
                        Title: $scope.activeAccessory.Title,
                        Description: $scope.activeAccessory.Description,
                        KindId: $scope.activeAccessory.KindId
                    };
                    dataContext.accessories.put(data,
                        function (response) {

                        if (typeof ($scope.file) == "object") {
                            dataContext.files.upload($scope.file,
                                function (response) {
                                    $scope.filesResponse = response;
                                    console.log($scope.filesResponse);
                                });
                        }

                        dataContext.kinds.getById(response.KindId, function (responseKind) {
                            var editItemIndex = responseKind.Accessories.find(function (item) {
                                return item.Id == response.Id;
                            });
                            angular.extend(editItemIndex, response);
                        }, function (response) { });

                        
                        $('#accessoryEditModal').modal('show');
                        $('#accessoryEditModal').on('hidden.bs.modal', function (event) {
                            $location.path('/accessories');
                            $route.reload();
                        });

                    }, function (response) {
                        alert('Произошла неизвестная ошибка при обновлении.');
                        console.log(response);
                    });
                }
            }
        }
    }
})();
