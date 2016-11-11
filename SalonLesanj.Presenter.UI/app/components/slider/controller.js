(function () {
    'use strict';
    var sliderControllers = angular.module('sliderControllers', ['ui.bootstrap', 'ngAnimate']);
    sliderControllers.controller('carouselDemoCtrl', [
        '$scope', '$timeout',
        function ($scope, $timeout) {
            $scope.myInterval = 3000;
            $scope.slides = [
                {
                    image: 'Images/slider_photo/1.jpg',
                    description: 'Image 00'
                },
                {
                    image: 'Images/slider_photo/2.jpg',
                    description: 'Image 01'
                },
                {
                    image: 'Images/slider_photo/3.jpg',
                    description: 'Image 02'
                }
            ];

            $scope.currentIndex = 0;

            $scope.setCurrentSlideIndex = function (index) {
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.$play = false;

            var timeOut = null;

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
            // функция play запускает таймер, который переключает слайд и вызывает её же повторно
            $scope.playSlider = function () {
                timeOut = $timeout(function () {
                    $scope.next();
                    $scope.playSlider();
                }, 4000);
                $scope.$play = true;
            };

            $scope.playSlider();

            $scope.stop = function () {
                $timeout.cancel(timeOut);
                timeOut = null;
                $scope.$play = false;
            };
        }
    ]);
})();