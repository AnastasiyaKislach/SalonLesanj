'use strict';

(function () {

    angular.module('dresses')
        .controller('WeddingDressesController', WeddingDressesController);

    WeddingDressesController.$inject = ['$scope', '$location', '$routeParams', 'dataContext', '$rootScope', '$route', 'sharingService', 'dressesService'];

    function WeddingDressesController($scope, $location, $routeParams, dataContext, $rootScope, $route, sharingService, dressesService) {

        dataContext.brands.getAll(function (response) {
            $scope.allBrands = response;

            //for (var i = 0; i < $scope.allBrands.length; i++) {
            //    for (var j = 0; j < $scope.allBrands[i].Dresses.length; j++) {
            //        var dress = $scope.allBrands[i].Dresses[j];
            //        if (localStorage.getItem(dress.Title)) {
            //            $scope.allBrands[i].Dresses[j].isSelect = true;
            //        }
            //    }
            //}
            var selectedIds = localStorage.getItem("selectedDresses");
            var selectedDresses = dressesService.dressesMatching(response, selectedIds);

            if ($routeParams.brand) {
                $scope.currentBrandTitle = $routeParams.brand;
                $scope.currentBrand = $scope.allBrands.find(
                    function (item) {
                        return item.Title === $routeParams.brand;
                    });

            } else {
                $location.path($location.path() + '/' + $scope.allBrands[0].Title);
                $scope.currentBrand = $scope.allBrands[0];
            }

            $scope.subview = 'List';

            if ($routeParams.id) {

                var currentDress = $scope.currentBrand.Dresses.find(
                       function (item) {
                           return item.Title === $routeParams.id;
                       });
                if (!currentDress) {
                    $location.path('/');
                } else {

                    $scope.currentDress = currentDress;
                    $scope.subview = 'Details';

                    var nextIndex = $scope.currentBrand.Dresses.indexOf($scope.currentDress) + 1;
                    if (nextIndex >= $scope.currentBrand.Dresses.length) {
                        $scope.hasNext = false;
                    } else {
                        $scope.hasNext = true;
                        $scope.nextDress = $scope.currentBrand.Dresses[nextIndex].Title;
                    }

                    var previousIndex = $scope.currentBrand.Dresses.indexOf($scope.currentDress) - 1;
                    if (previousIndex < 0) {
                        $scope.hasPrevious = false;
                    } else {
                        $scope.hasPrevious = true;
                        $scope.previousDress = $scope.currentBrand.Dresses[previousIndex].Title;
                    }
                }
            }
        });

        $scope.selectImage = function (selectedImage) {
            $scope.selectedImage = selectedImage;
        }

        $scope.selectDress = function (dress) {
            if (dress.isSelect) {
                dress.isSelect = false;
            } else {
                dress.isSelect = true;
            }
        }

        $scope.remove = function (id) {
            if ($rootScope.user.isAdmin)
                dataContext.dresses.remove(id,
                function (response) {
                    $scope.responseData = response;
                    dataContext.brands.getById(response.BrandId, function (responseBrand) {
                        var brand = responseBrand;
                        var obj = responseBrand.Dresses.find(function (item) {
                            return item.Id == $scope.responseData.Id;
                        });
                        responseBrand.Dresses.remove(obj);
                    });
                },
                function (response) {
                });

        }

        $scope.shareVK = function (dress) {
            sharingService.share.vkontakte('http://localhost:1874', dress.Title, dress.ImageUrl1, dress.Description);
        }
        $scope.shareOK = function (dress) {
            sharingService.share.odnoklassniki('http://localhost:1874', dress.Description);
        }
    };
})();
