(function () {
    'use strict';

    angular.module('brands')
        .controller('BrandEditController', BrandEditController);

    BrandEditController.$inject = ['$scope', 'dataContext', 'accountService', 'NgTableParams'];

    function BrandEditController($scope, dataContext, accountService, NgTableParams) {

        $scope.add = add;
        $scope.cancel = cancel;
        $scope.del = del;
        $scope.save = save;

        dataContext.brands.getAll(function (response) {
            $scope.tableParams = new NgTableParams({}, {
                counts: [],
                dataset: response.map(function (item) {
                    item.$originalRow = angular.copy(item);
                    return item;
                })
            });
        });

        function add() {
            $scope.tableParams.settings().dataset.unshift({
                Id: 0,
                Title: '',
                ImageUrl: '',
                isEditing: true,
                isAdding: true
            });
            $scope.tableParams.sorting({});
            $scope.tableParams.reload();
        }

        function cancel(row) {
            if (row.isAdding) {
                $scope.tableParams.settings().dataset.remove(row);
                $scope.tableParams.reload();
            } else {
                row.isEditing = false;
                angular.extend(row, row.$originalRow);
            }
            $scope.tableParams.reload();
        }

        function del(row) {
            if (row.isAdding) {
                $scope.tableParams.settings().dataset.remove(row);
                $scope.tableParams.reload();
            } else {
                dataContext.brands.remove(row.Id, function (response) {
                    console.log(response);
                    $scope.tableParams.settings().dataset.remove(row);
                    $scope.tableParams.reload();
                }, function (response) {
                    console.log(response);
                });
            }
        }

        function save(row) {
            if (row.Id == 0) {
                $scope.file = row.ImageUrl;
                row.ImageUrl = row.ImageUrl.name;
                dataContext.brands.post(row,
                    function (response) {
                        row.isEditing = false;
                        row.isAdding = false;
                        angular.extend(row, response);
                        row.$originalRow = response;
                    },
                    function (response) {
                        console.log(response);
                    });
            } else {
                $scope.file = row.ImageUrl;
                if (row.ImageUrl.name) {
                    if (row.ImageUrl.name.indexOf("/Images/")) {
                        row.ImageUrl = row.ImageUrl.name.replace("/Images/", "");
                    }
                } else {
                    row.ImageUrl = row.ImageUrl.replace("/Images/", "");
                }

                dataContext.brands.put(row,
                    function (response) {
                        row.isEditing = false;
                        row.isAdding = false;
                        angular.extend(row, response);
                        row.$originalRow = response;
                    },
                    function (response) {
                        console.log(response);
                    });
            }
            if (typeof $scope.file == "object") {
                dataContext.files.upload($scope.file,
                    function (response) {
                        $scope.filesResponse = response;
                        console.log($scope.filesResponse);
                    });
            }
            $scope.tableParams.reload();
        }
    }
})();
