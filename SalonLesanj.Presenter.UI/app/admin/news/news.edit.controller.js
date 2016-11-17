(function () {
    'use strict';

    angular.module('news')
        .controller('NewsEditController', NewsEditController);

    NewsEditController.$inject = ['$scope', 'dataContext', 'accountService', '$location', '$routeParams', '$route'];

    function NewsEditController($scope, dataContext, accountService, $location, $routeParams, $route) {


        $scope.init = function () {

            CKEDITOR.replace('newsContent',
            {
                filebrowserImageBrowseUrl: 'api/File',
                filebrowserImageUploadUrl: 'api/File'
                //,filebrowserWindowWidth: '640',
                //filebrowserWindowHeight: '480'
            });
        }

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            if ($routeParams.id) {

                dataContext.news.getById($routeParams.id, function (response) {
                    $scope.activeNews = response;
                    //$scope.trustAsHtml = function (string) {
                    //    return $sce.trustAsHtml(string);
                    //};
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
                    var content = CKEDITOR.instances.newsContent.getData();
                    var data = {
                        Id: $scope.activeNews.Id,
                        ImageUrl: imageUrl,
                        Title: $scope.activeNews.Title,
                        PreviewContent: $scope.activeNews.PreviewContent,
                        Content: content,
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
