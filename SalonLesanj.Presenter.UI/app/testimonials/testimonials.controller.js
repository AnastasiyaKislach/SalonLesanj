(function () {
    'use strict';

    angular.module('testimonials')
        .controller('TestimonialsController', TestimonialsController);


    TestimonialsController.$inject = ['$scope', '$routeParams', 'dataContext', 'accountService', '$route', '$rootScope', '$sanitize', 'config', '$location'];

    function TestimonialsController($scope, $routeParams, dataContext, accountService, $route, $rootScope, $sanitize, config, $location) {

        if ($routeParams.id) {
            if (!accountService.getUser().isAdmin) {
                $location.path('/login');
            } else {
                dataContext.testimonials.getById(id,
                    function (response) {
                        $scope.activeTestimonial = response;
                    });
            }
        }

        if (accountService.getUser().isAdmin) {
            dataContext.testimonials.disableCash();
        } else {

            $scope.getAll = function () {
                dataContext.testimonials.getAll(function (response) {
                    $scope.testimonials = response;
                    response.forEach(function (item, i, arr) {
                        var date = new Date(item.CreationTime);
                        item.CreationTime = ('0' + date.getDate()).slice(-2) +
                            '-' +
                            ('0' + (date.getMonth() + 1)).slice(-2) +
                            '-' +
                            date.getFullYear();
                    });
                });
            }

            $scope.getAll();

            $scope.isLast = function (item) {
                return $scope.testimonials.indexOf(item) == ($scope.testimonials.length - 1);
            }

            $scope.approve = function (id) {
                if ($rootScope.user.isAdmin) {
                    dataContext.testimonials.getById(id,
                        function (response) {
                            $scope.testimonial = response;

                            var data = {
                                Id: $scope.testimonial.Id,
                                Author: $scope.testimonial.Author,
                                Email: $scope.testimonial.Email,
                                ImageUrl: $scope.testimonial.ImageUrl.replace("/Images/", ""),
                                Text: $scope.testimonial.Text,
                                CreationTime: $scope.testimonial.CreationTime,
                                IsApproved: true
                            };


                            dataContext.testimonials.put(data,
                                function (response) {
                                    console.log(response);
                                    //$route.reload();
                                },
                                function (response) {
                                    console.log(response);
                                });
                        });
                }
            }

            $scope.edit = function (testimonialEditForm) {
                if ($rootScope.user.isAdmin) {
                    $scope.update = true;
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
                            IsApproved: $scope.activeTestimonial.IsApproved
                        };
                        dataContext.testimonials.put(data,
                            function (response) {

                                if (typeof ($scope.file) == "object") {
                                    dataContext.files.upload($scope.file,
                                        function (response) {
                                            $scope.filesResponse = response;
                                            console.log($scope.filesResponse);
                                        });
                                }

                                $('#testimonialEditModal').modal('show');
                                $('#testimonialEditModal')
                                    .on('hidden.bs.modal',
                                        function (event) {
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

            $scope.remove = function (id) {
                if ($rootScope.user.isAdmin) {

                    dataContext.testimonials.remove(id,
                        function (response) {
                            $scope.responseData = response;
                            $scope.getAll();
                        },
                        function (response) {
                            alert('Произошла неизвестная ошибка при удалении.');
                            console.log(response);
                        });

                }
            }

            $scope.create = function (testimonialForm) {
                $scope.creation = true;

                if (!$scope.file) {
                    testimonialForm.$valid = false;
                    return;
                }

                if (testimonialForm.$valid) {

                    var data = {
                        Author: $scope.author,
                        Email: $scope.email,
                        ImageUrl: $scope.file.name,
                        Text: $scope.text
                    };

                    dataContext.testimonials.disableCash();

                    dataContext.testimonials.post(data,
                        function (response) {
                            $scope.responseData = response;
                            dataContext.files.upload($scope.file,
                                function (response) {
                                    $scope.filesResponse = response;
                                    console.log($scope.filesResponse);
                                    dataContext.testimonials.enableCash();

                                    $('#testimonialCreateModal').modal('show');
                                    $('#testimonialCreateModal')
                                        .on('hidden.bs.modal',
                                            function (event) {
                                                $location.path('/testimonials');
                                                $route.reload();
                                            });
                                });
                        },
                        function (response) {
                            alert('Произошла неизвестная ошибка при добавлении.');
                            console.log(response);
                        });
                }
            }
        }
    }
})();