'use strict';

(function () {

    angular.module('dresses')
        .controller('WeddingDressesController', WeddingDressesController);

    WeddingDressesController.$inject = ['$scope', '$location', '$routeParams', 'dataContext', '$rootScope', '$route', 'sharingService', 'dressesService'];

    function WeddingDressesController($scope, $location, $routeParams, dataContext, $rootScope, $route, sharingService, dressesService) {

        dataContext.brands.getAll(function (response) {
            $scope.allBrands = response;

            var selectedDresses = dressesService.dressesMatching($scope.allBrands);

            $scope.selectedIds = dressesService.getDressesArrayId($scope.allBrands);

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
                    
                    if ($scope.currentDress.ImageUrl2) {
                        if ($scope.currentDress.ImageUrl2.indexOf(".") === -1) {
                            $scope.currentDress.ImageUrl2 = $scope.currentDress.ImageUrl2.replace("/Images/", "");
                        }
                    }
                    if ($scope.currentDress.ImageUrl3) {
                        if ($scope.currentDress.ImageUrl3.indexOf(".") === -1) {
                            $scope.currentDress.ImageUrl3 = $scope.currentDress.ImageUrl3.replace("/Images/", "");
                        }
                    }

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

        $scope.IsShowImg = function(src) {
            if (src.indexOf(".") === -1) {
                return false;
            }
            return true;
        }

        $scope.IsShow = function (text) {
            return text === "";
        }

        $scope.selectImage = function (selectedImage) {
            $scope.selectedImage = selectedImage;
        }

        $scope.selectDress = function (dress) {
            if (dress.isSelect) {
                dress.isSelect = false;
                $scope.selectedIds.remove(dress.Id);
                var dresses = dressesService.dressLocalStorage($scope.selectedIds);
            } else {
                dress.isSelect = true;
                $scope.selectedIds.push(dress.Id);
                var selected = dressesService.dressLocalStorage($scope.selectedIds);
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
            sharingService.share.vkontakte(location.href, dress.Title, location.origin + dress.ImageUrl1, dress.Description);
        }
     
    };
})();
