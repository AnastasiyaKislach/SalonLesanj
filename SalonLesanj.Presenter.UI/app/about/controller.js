(function () {
    'use strict';

    angular.module('about')
        .controller('FeedBackController', FeedBackController);

    FeedBackController.$inject = ['$scope', 'feedBackService', '$location', '$route', '$sanitize'];

    function FeedBackController($scope, feedBackService, $location, $route, $sanitize) {

        $scope.send = function (feedbackForm) {
            $scope.sending = true;
            if (feedbackForm.$valid) {
                var data = {
                    name: $scope.name,
                    email: $scope.email,
                    message: $scope.message
                }
                feedBackService.send(data).success(function (response) {
                    console.log(response);
                    $('#fbModal').modal('show');
                    $scope.name = '';
                    $scope.email = '';
                    $scope.message = '';
                    $('#fbModal').on('hidden.bs.modal', function (event) {
                        $location.path('/');
                        $route.reload();
                    });
                }).error(function (response) {
                    alert('Произошла неизвестная ошибка при формировании заявки.');
                    console.log(response);
                });
            }
        };
    }
})();