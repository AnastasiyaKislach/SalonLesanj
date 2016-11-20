(function () {
    'use strict';

    angular.module('dresses')
        .controller('DressCreateController', DressCreateController);

    DressCreateController.$inject = ['$scope', 'dataContext', 'accountService', '$location', '$route'];

    function DressCreateController($scope, dataContext, accountService, $location, $route) {

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            dataContext.brands.getAll(function (response) {
                $scope.editBrands = response;
            });

        }

        $scope.submit = function () {
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        $scope.create = function (dressCreateForm) {
            $scope.creation = true;

            if (!$scope.files) {
                dressCreateForm.$valid = false;
                return;
            }

            if (dressCreateForm.$valid) {
                var data = {
                    ImageUrl1: $scope.files[0].name,
                    ImageUrl2: $scope.files[1].name,
                    ImageUrl3: $scope.files[2].name,
                    Title: $scope.dressTitle,
                    Description: $scope.dressDescription,
                    BrandId: $scope.brandId
                }

                dataContext.dresses.post(data,
                    function (response) {
                        $scope.responseData = response;
                        dataContext.brands.getById(response.BrandId,
                            function (responseBrand) {
                                var brand = responseBrand;
                                responseBrand.Dresses.push($scope.responseData);

                                for (var i = 0; i < 3 ; i++) {
                                    dataContext.files.upload($scope.files[i],
                                         function (response) {
                                             $scope.filesResponse = response;
                                         });
                                }

                                $('#dressCreateModal').modal('show');
                                $('#dressCreateModal').on('hidden.bs.modal', function (event) {
                                    $location.path('/wedding-dresses');
                                    $route.reload();
                                });
                            },
                            function (response) {
                                alert('Произошла неизвестная ошибка при добавлении.');
                                //console.log(response);
                            });

                        //console.log($scope.responseData);
                    },
                    function (response) {
                        //console.log(response);
                    });
            }
        }
    }
})();
