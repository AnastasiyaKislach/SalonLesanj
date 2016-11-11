(function () {
    'use strict';

    angular.module('app')
        .factory('paginationFactory', paginationFactory);

    paginationFactory.$inject = [];

    function paginationFactory() {
        return {
            createPagination: createPagination
        };

        function createPagination(lenght) {
            return PaginationService(lenght);
        }

        function PaginationService(lenght) {
            var self = this;

            self.itemPerPage = 3;
            self.lenght = lenght;
            self.getTotalPages = getTotalPages;
            self.pages = null;
            self.getPage = getPage;
            self.getPageList = getPageList;

            function getTotalPages() {
                return (length % itemPerPage == 0) ? lenght / itemPerPage : lenght / itemPerPage + 1;
            }

            function getAll(success) {
                if (pages) {
                    return pages;
                } else {
                    pages = [];
                    for (var i = 0; i < getTotalPages; i++) {
                        self.pages.push(createPage(i));
                    }
                    return self.pages;
                }
            }

            function getPageList() {
                if (pages.length > 0)
                    for (var i = 0; i < getTotalPages; i++) {
                        self.pages.push(createPage(i));
                    }
                return self.pages;
            }

            function getPage(index) {
                if (index < length && index > 0) {
                    return self.pages[index];
                }
            }

            function createPage(index) {
                return {
                    index: index,
                    hasNextPage: index !== getTotalPages,
                    hasPreviousPage: index !== 0,
                    isFirstPage: index === 0,
                    isLastPage: index === getTotalPages
                };
            }

        }
    }

})();