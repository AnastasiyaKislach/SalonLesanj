angular.module('paging').directive('pagination', ['$routeParams', '$location', function ($routeParams, $location) {
    return {
        restrict: 'E',
        scope: {
            maxSize: '=maxSize',
            defaultPageSize: '=defaultPageSize',
            boundaryLinks: '=boundaryLinks',
            items: '=items'
        },
        templateUrl: 'app/components/paging/view.html',
        replace: true,
        link: function (scope, element, attr) {
            var pages = scope.pages = [];

            function initialize() {
                var pageSize = ($routeParams.pageSize && parseInt($routeParams.pageSize)) || scope.defaultPageSize || 6;
                var pageIndex = (($routeParams.pageIndex && parseInt($routeParams.pageIndex)) || 1) - 1;
                var totalPages = Math.ceil(scope.items.length / pageSize);
                scope.pages = [];
                for (var i = 0; i < totalPages; i++) {
                    scope.pages.push({
                        index: i + 1,
                        path: $location.path() + '?pageIndex=' + (i + 1) + '&pageSize=' + pageSize,
                        isFirst: i == 0,
                        isLast: i == (totalPages - 1),
                        hasNext: i < (totalPages - 1),
                        hasLast: i > 0
                    });
                }
                scope.activePage = scope.pages[pageIndex];
            }
            initialize();
        }
    };
}]);

