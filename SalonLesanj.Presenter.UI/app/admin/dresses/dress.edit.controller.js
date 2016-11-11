(function () {
    'use strict';

    angular.module('dresses')
        .controller('DressEditController', DressEditController);

    DressEditController.$inject = ['$scope', 'dataContext', 'accountService', '$location', '$routeParams', '$route'];

    function DressEditController($scope, dataContext, accountService, $location, $routeParams, $route) {

        $scope.editDresses = [];
        $scope.dressBrands = [];
        $scope.selected = 0;
        $scope.activeDress = {};
        $scope.isSelect = isSelect;

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            if ($routeParams.id) {

                dataContext.brands.getAll(function (response) {
                    $scope.dressBrands = response;
                });
                dataContext.dresses.getAll(function (response) {
                    $scope.editDresses = response;
                    $scope.activeDress = $scope.editDresses.find(
                        function (item, index) {
                            return item.Title === $routeParams.id;
                        });
                    $scope.selected = $scope.dressBrands.find(
                       function (item) {
                           return item.Id == $scope.activeDress.BrandId;
                       }).Title;
                });
                $scope.saveChanges = function (dressEditForm) {
                    $scope.update = true;

                    if (dressEditForm.$valid) {
                        var imageUrl1 = $scope.activeDress.ImageUrl1.replace("/Images/", "");
                        var imageUrl2 = $scope.activeDress.ImageUrl2.replace("/Images/", "");
                        var imageUrl3 = $scope.activeDress.ImageUrl3.replace("/Images/", "");
                        var data = {
                            Id: $scope.activeDress.Id,
                            ImageUrl1: imageUrl1,
                            ImageUrl2: imageUrl2,
                            ImageUrl3: imageUrl3,
                            Title: $scope.activeDress.Title,
                            Description: $scope.activeDress.Description,
                            BrandId: $scope.activeDress.BrandId
                        };

                        dataContext.dresses.put(data, function (response) {

                            if (typeof $scope.file == "object") {
                                for (var i = 0; i < 3 ; i++) {
                                    dataContext.files.upload($scope.files[i],
                                         function (response) {
                                             $scope.filesResponse = response;
                                             console.log($scope.filesResponse);
                                         });
                                }
                            }

                            dataContext.brands.getById(response.BrandId, function (responseBrand) {
                                var editItemIndex = responseBrand.Dresses.find(function (item) {
                                    return item.Id == response.Id;
                                });
                                angular.extend(editItemIndex, response);
                            }, function (response) { });

                            
                            $('#dressEditModal').modal('show');
                            $('#dressEditModal').on('hidden.bs.modal', function (event) {
                                $location.path('/wedding-dresses');
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

        function isSelect(id) {
            return $scope.activeDress.BrandId == id;
        }
    }
})();
