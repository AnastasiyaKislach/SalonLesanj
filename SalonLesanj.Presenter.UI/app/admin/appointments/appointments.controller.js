(function () {
    'use strict';

    angular.module('appointment')
        .controller('AppointmentEditController', AppointmentEditController);

    AppointmentEditController.$inject = ['$scope', 'dataContext', 'accountService', 'NgTableParams'];

    function AppointmentEditController($scope, dataContext, accountService, NgTableParams) {

        $scope.add = add;
        $scope.cancel = cancel;
        $scope.del = del;
        $scope.save = save;
        $scope.init = init;

        dataContext.appointments.getAll(function (response) {
            $scope.tableParams = new NgTableParams({ count: 5 }, {
                counts: [5, 10],
                dataset: response.map(function (item) {
                    item.$originalRow = angular.copy(item);
                    return item;
                })
            });
        });

        dataContext.dresses.getAll(function(response) {
            $scope.dresses = response;
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
                dataContext.appointments.remove(row.Id)
                    .success(function (response) {
                        console.log(response);
                        $scope.tableParams.settings().dataset.remove(row);
                        $scope.tableParams.reload();
                    })
                    .error(function (response) {
                        console.log(response);
                    });
            }
        }
        function save(row) {
            if (row.Id == 0) {
                dataContext.appointments.post(row)
                    .success(function (response) {
                        row.isEditing = false;
                        row.isAdding = false;
                        angular.extend(row, response);
                        row.$originalRow = response;
                    });
            } else {
                dataContext.appointments.put(row)
                    .success(function (response) {
                        row.isEditing = false;
                        row.isAdding = false;
                        angular.extend(row, response);
                        row.$originalRow = response;
                    });
            }

            $scope.tableParams.reload();
        }

        function init() {
            var config = {
                '.chosen-select': {},
                '.chosen-select-deselect': { allow_single_deselect: true },
                '.chosen-select-no-single': { disable_search_threshold: 4 },
                '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
                '.chosen-select-width': { width: "95%" }
            }
            for (var selector in config) {
                $(selector).chosen(config[selector]);
            }
        }

    }
})();