(function () {
    'use strict';

    angular.module('news')
        .controller('NewsCreateController', NewsCreateController);

    NewsCreateController.$inject = ['$scope', 'dataContext', 'accountService', '$location', '$route'];

    function NewsCreateController($scope, dataContext, accountService, $location, $route) {

       
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
                $scope.create = function (newsCreateForm) {
                $scope.creation = true;
                if (newsCreateForm.$valid) {
                    var content = CKEDITOR.instances.newsContent.getData();
                    var data = {
                        ImageUrl: $scope.file.name,
                        Title: $scope.Title,
                        PreviewContent: $scope.PreviewContent,
                        Content: content
                    }
                    dataContext.news.post(data,
                        function (response) {
                            $scope.responseData = response;

                            dataContext.files.upload($scope.file,
                               function (response) {
                                   $scope.filesResponse = response;
                                   console.log($scope.filesResponse);
                                   $('#newsCreateModal').modal('show');
                                   $('#newsCreateModal').on('hidden.bs.modal', function (event) {
                                       $location.path('/news');
                                       $route.reload();
                                   });
                               });
                            console.log($scope.responseData);
                        },
                        function (response) {
                            console.log(response);
                        });
                }
            }
        }

    }
})();
