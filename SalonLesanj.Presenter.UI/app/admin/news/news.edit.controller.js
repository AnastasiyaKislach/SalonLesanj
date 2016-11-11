(function () {
    'use strict';

    angular.module('news')
        .controller('NewsEditController', NewsEditController);

    NewsEditController.$inject = ['$scope', 'dataContext', 'Upload', 'accountService', '$location', '$routeParams', '$route', '$sce'];

    function NewsEditController($scope, dataContext, Upload, accountService, $location, $routeParams, $route, $sce) {
        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            if ($routeParams.id) {

                dataContext.news.getById($routeParams.id, function (response) {
                    $scope.activeNews = response;
                    $scope.trustAsHtml = function (string) {
                        return $sce.trustAsHtml(string);
                    };
                });
            }

            $scope.update = function (newsEditForm) {
                $scope.edition = true;
                var imageUrl;
                if (newsEditForm.$valid) {
                    if ($scope.file) {
                        imageUrl = $scope.file.name;
                    } else {
                        imageUrl = $scope.activeNews.ImageUrl.replace("/Images/", "");
                    }

                    var data = {
                        Id: $scope.activeNews.Id,
                        ImageUrl: imageUrl,
                        Title: $scope.activeNews.Title,
                        Content: $scope.activeNews.Content,
                        Date: $scope.activeNews.Date
                    }

                    dataContext.news.put(data, function (response) {

                        angular.extend($scope.activeNews, response);
                        if (typeof $scope.file == "object") {
                            dataContext.files.upload($scope.file,
                                function (response) {
                                    $scope.filesResponse = response;
                                    console.log($scope.filesResponse);



                                });
                        }
                        $('#newsEditModal').modal('show');
                        $('#newsEditModal').on('hidden.bs.modal', function (event) {
                            $location.path('/news');
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
