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
            var pages = scope.globalPages = [];

            function initialize() {
                var pageSize = ($routeParams.pageSize && parseInt($routeParams.pageSize)) || scope.defaultPageSize || 6;
                var pageIndex = (($routeParams.pageIndex && parseInt($routeParams.pageIndex)) || 1) - 1;
                var totalPages = Math.ceil(scope.items.length / pageSize);
                scope.globalPages = [];
                for (var i = 0; i < totalPages; i++) {
                    scope.globalPages.push({
                        index: i + 1,
                        path: $location.path() + '?pageIndex=' + (i + 1) + '&pageSize=' + pageSize,
                        isFirst: i == 0,
                        isLast: i == (totalPages - 1),
                        hasNext: i < (totalPages - 1),
                        hasLast: i > 0
                    });
                }

                var before = Math.floor(scope.maxSize / 2);
                var after = scope.maxSize - before - 1;

                var start = (pageIndex - before) === -1 ? 0 : (pageIndex - before);
                var end = (pageIndex + after + 1) < scope.maxSize ? scope.maxSize : (pageIndex + after + 1);

                scope.activePage = scope.globalPages[pageIndex];

                scope.pages = scope.globalPages.slice(start, end);
            }
            initialize();
        }
    };
}]);

