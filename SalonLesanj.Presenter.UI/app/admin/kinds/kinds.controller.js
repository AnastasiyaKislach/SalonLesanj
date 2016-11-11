(function () {
    'use strict';

    angular.module('kinds')
        .controller('KindEditController', KindEditController);

    KindEditController.$inject = ['$scope', 'dataContext', 'accountService', '$location', 'NgTableParams'];

    function KindEditController($scope, dataContext, accountService, $location, NgTableParams) {

        $scope.add = add;
        $scope.cancel = cancel;
        $scope.del = del;
        $scope.save = save;

        dataContext.kinds.getAll(function (response) {
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
                TitleRus: '',
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
                dataContext.kinds.remove(row.Id, function (response) {
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
                dataContext.kinds.post(row,
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
                dataContext.kinds.put(row,
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
            $scope.tableParams.reload();
        }

    }
})();
