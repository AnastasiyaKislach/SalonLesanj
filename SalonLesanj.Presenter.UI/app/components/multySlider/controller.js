(function () {
    'use strict';

    angular.module('multysliderController', ['ui.bootstrap', 'ngAnimate'])
        .controller('MultysliderControllers', MultysliderControllers);

    MultysliderControllers.$inject = ['$scope', '$timeout', 'dataContext'];

    function MultysliderControllers($scope, $timeout, dataContext) {

        $scope.myInterval = 3000;
       
        dataContext.photos.getAll(function (response) {
            $scope.slides = response;
        });

        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prev = function () {
            var total = $scope.slides.length;
            if (total > 0) {
                $scope.currentIndex = ($scope.currentIndex == 0) ? total - 1 : $scope.currentIndex - 1;
            }
        };

        $scope.next = function () {
            var total = $scope.slides.length;
            if (total > 0) {
                $scope.currentIndex = ($scope.currentIndex == total - 1) ? 0 : $scope.currentIndex + 1;
            }
        };

        $scope.IsShowGallery = false;

        var mult = 4;
        var mult2 = 4;

        $scope.showGallery = function () {
            if ($scope.slides.length >= mult) {
                $scope.slidesPart = $scope.slides.slice(0, mult);
            } else {
                $scope.slidesPart = $scope.slides.slice(0, $scope.slides.length);
            }
            $scope.IsShowGallery = !$scope.IsShowGallery;

            mult = 4;
        }

        $scope.showSomeMore = function () {
            var count = mult + mult2;
            if ($scope.slides.length >= count) {
                $scope.slidesPart = $scope.slides.slice(0, count);
                mult = count;
            } else {
                $scope.slidesPart = $scope.slides.slice(0, $scope.slides.length);
            }

            console.log("everything is working");
        }


        $scope.showImg = function (index) {
            $scope.setCurrentSlideIndex(index);
        }
    }


})();