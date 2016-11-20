(function () {
    'use strict';

    angular.module('accessories')
        .controller('AccessoryCreateController', AccessoryCreateController);

    AccessoryCreateController.$inject = ['$scope', 'dataContext', 'accountService', '$location', '$route'];

    function AccessoryCreateController($scope, dataContext, accountService, $location, $route) {

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            dataContext.kinds.getAll(function (response) {
                $scope.accessoryKinds = response;
            });
        }
        $scope.create = function (accessoryCreateForm) {
            $scope.creation = true;

            if (!$scope.file) {
                accessoryCreateForm.$valid = false;
                return;
            }

            if (accessoryCreateForm.$valid) {
                var data = {
                    ImageUrl: $scope.file.name,
                    Title: $scope.accessoryTitle,
                    Description: $scope.description,
                    KindId: $scope.kindId
                }
                dataContext.accessories.post(data,
                    function (response) {
                        $scope.responseData = response;
                        dataContext.kinds.getById(response.KindId,
                            function (responseKind) {
                                var kind = responseKind;
                                responseKind.Accessories.push($scope.responseData);
                            },
                            function (response) {
                                alert('Произошла неизвестная ошибка при добавлении.');
                                console.log(response);
                            });

                        dataContext.files.upload($scope.file,
                            function (response) {
                                $scope.filesResponse = response;
                                console.log($scope.filesResponse);
                                $('#accessoryCreateModal').modal('show');
                                $('#accessoryCreateModal').on('hidden.bs.modal', function (event) {
                                    $location.path('/accessories');
                                    $route.reload();
                                });
                            });
                        console.log($scope.responseData);
                    },
                    function (response) {
                        console.log(response);
                    });
            }
        }
    }
})();
