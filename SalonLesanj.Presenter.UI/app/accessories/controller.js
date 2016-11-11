'use strict';

(function () {

    angular.module('accessories')
        .controller('AccessoriesController', AccessoriesController);

    AccessoriesController.$inject = ['$scope', '$location', '$routeParams', 'dataContext', '$rootScope', '$route'];

    function AccessoriesController($scope, $location, $routeParams, dataContext, $rootScope, $route) {

        dataContext.kinds.getAll(function (response) {
            $scope.allKinds = response;
            if ($routeParams.kind) {
                $scope.currentKindTitle = $routeParams.kind;
                $scope.currentKind = $scope.allKinds.find(
                    function (item) {
                        return item.Title === $routeParams.kind;
                    });
            } else {
                $location.path($location.path() + '/' + $scope.allKinds[0].Title); 3
                $scope.currentKind = $scope.allKinds[0];
            }
            $scope.subview = 'List';
        });

        if ($routeParams.id) {
            var currentAccessory = $scope.currentKind.Accessories.find(
                    function (item) {
                        return item.Title === $routeParams.id;
                    });
            if (!currentAccessory) {
                $location.path('/');
            } else {
                $scope.currentAccessory = currentAccessory;
                $scope.subview = 'Details';

                var nextIndex = $scope.currentKind.Accessories.indexOf($scope.currentAccessory) + 1;
                if (nextIndex >= $scope.currentKind.Accessories.length) {
                    $scope.hasNext = false;
                } else {
                    $scope.hasNext = true;
                    $scope.nextAccessory = $scope.currentKind.Accessories[nextIndex].Title;
                }

                var previousIndex = $scope.currentKind.Accessories.indexOf($scope.currentAccessory) - 1;
                if (previousIndex < 0) {
                    $scope.hasPrevious = false;
                } else {
                    $scope.hasPrevious = true;
                    $scope.previousAccessory = $scope.currentKind.Accessories[previousIndex].Title;
                }
            }
        }

        $scope.remove = function (id) {
            if ($rootScope.user.isAdmin)
                dataContext.accessories.remove(id, function (response) {
                    $scope.responseData = response;
                    console.log(response);
                    dataContext.kinds.getById(response.KindId, function (responseKind) {
                        var kind = responseKind;
                        var obj = responseKind.Accessories.find(function (item) {
                            return item.Id == $scope.responseData.Id;
                        });
                        responseKind.Accessories.remove(obj);
                    });
                }, function (response) {
                    console.log(response);
                });
            //$location.path('/accessories');
        }
        $scope.isExist = function (item) {
            return item.Description !== "";
        }
    };
})();
