(function () {
    'use strict';

    angular.module('news')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['$scope', '$location', '$routeParams', 'dataContext', '$route', '$rootScope', '$sanitize'];

    function NewsController($scope, $location, $routeParams, dataContext, $route, $rootScope, $sanitize) {
        dataContext.news.getAll(function (response) {
            $scope.newsS = response;
        });
        $scope.isLast = function (item) {
            return $scope.newsS.indexOf(item) == ($scope.newsS.length - 1);
        }

        if ($routeParams.id) {
            var cnId = parseInt($routeParams.id);
            dataContext.news.getById(cnId, function (response) {
                if (!response) {
                    $location.path('/');
                }
                $scope.currentNews = response;
                $scope.init = function () {
                    if ($scope.currentNews) {
                        document.getElementById('vk_share_button').innerHTML = VK.Share.button({
                            url: 'http://localhost:1874/',
                            title: $scope.currentNews.Title,
                            description: $scope.currentNews.Content,
                            image: 'http://loveza.ru/birthday/86.jpg',
                            noparse: true
                        }, { type: 'button', text: 'Опубликовать' });
                    }
                }
            });
        }

        $scope.remove = function (id) {
            if ($rootScope.user.isAdmin)
                dataContext.news.remove(id,
                    function (response) {
                        console.log(response);
                        $route.reload();
                    },
                    function (response) {
                        console.log(response);
                    });
        }

        $scope.shareVK = function (news) {
            sharingService.share.vkontakte('http://localhost:1874', news.Title, news.ImageUrl1, news.Description);
        }
        $scope.shareOK = function (news) {
            sharingService.share.odnoklassniki('http://localhost:1874', news.Description);
        }
    }
})();