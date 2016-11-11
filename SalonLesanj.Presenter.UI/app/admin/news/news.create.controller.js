(function () {
    'use strict';

    angular.module('news')
        .controller('NewsCreateController', NewsCreateController);

    NewsCreateController.$inject = ['$scope', 'dataContext', 'Upload', 'accountService', '$location', '$route', '$rootScope'];

    function NewsCreateController($scope, dataContext, Upload, accountService, $location, $route, $rootScope) {


        $scope.init = function () {

            CKEDITOR.replace('newsContent',
            {
                filebrowserImageBrowseUrl: '/app/components/ckePartials/uploadPartial.html',
                filebrowserImageUploadUrl: '/home/uploadnow',
                filebrowserWindowWidth: '640',
                filebrowserWindowHeight: '480'
            });
        }

        $scope.chooseImg = function () {
            alert('ghbdthb');
        }

        if (!accountService.getUser().isAdmin) {
            $location.path('/login');
        } else {
            dataContext.files.getAll(function (response) {
                $rootScope.images = response;
                alert($rootScope.images);
            });
            $scope.create = function (newsCreateForm) {
                $scope.creation = true;
                if (newsCreateForm.$valid) {
                    var content = CKEDITOR.instances.newsContent.getData();
                    var data = {
                        ImageUrl: $scope.file.name,
                        Title: $scope.Title,
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
