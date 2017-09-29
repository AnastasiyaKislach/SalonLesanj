(function () {
    'use strict';

    angular.module('testimonials')
        .controller('TestimonialEditController', TestimonialEditController);

    TestimonialEditController.$inject = ['$scope', 'dataContext', 'accountService', '$location', '$routeParams', '$route'];

    function TestimonialEditController($scope, dataContext, accountService, $location, $routeParams, $route) {

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            if ($routeParams.id) {

                dataContext.testimonials.getById($routeParams.id, function (response) {
                    $scope.activeTestimonial = response;
                });
            }

            $scope.update = function (testimonialEditForm) {
                $scope.edition = true;
                var imageUrl;
                if (testimonialEditForm.$valid) {
                    if ($scope.file) {
                        imageUrl = $scope.file.name;
                    } else {
                        imageUrl = $scope.activeTestimonial.ImageUrl.replace("/Images/", "");
                    }

                    var data = {
                        Id: $scope.activeTestimonial.Id,
                        Author: $scope.activeTestimonial.Author,
                        Email: $scope.activeTestimonial.Email,
                        ImageUrl: imageUrl,
                        Text: $scope.activeTestimonial.Text,
                        CreationTime: $scope.activeTestimonial.CreationTime,
                        IsApproved: true
                    }

                    dataContext.testimonials.put(data, function (response) {

                        angular.extend($scope.activeTestimonial, response);
                        if (typeof $scope.file == "object") {
                            dataContext.files.upload($scope.file,
                                function (response) {
                                    $scope.filesResponse = response;
                                    console.log($scope.filesResponse);
                                });
                        }
                        $('#testimonialEditModal').modal('show');
                        $('#testimonialEditModal').on('hidden.bs.modal', function (event) {
                            $location.path('/testimonials');
                            $route.reload();
                        });

                    },
                    function (response) {
                        alert('Произошла неизвестная ошибка при обновлении.');
                        console.log(response);
                    });
                }
            }
        }



    }
})();
