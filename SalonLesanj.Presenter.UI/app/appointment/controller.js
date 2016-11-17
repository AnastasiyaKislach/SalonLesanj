  (function() {
    'use strict';

    angular.module('appointment')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'dataContext', '$location', '$route'];

    function FormController($scope, dataContext, $location, $route) {
        $scope.show = true;
        $scope.selected = [];
        $scope.remove = remove;
        $scope.submitApp = submitApp;

        dataContext.brands.getAll(function(response) {
            $scope.brands = response;
        });

        if ($scope.brands) {
            for (var i = 0; i < $scope.brands.length; i++) {
                for (var k = 0; k < $scope.brands[i].Dresses.length; k++) {
                    if ($scope.brands[i].Dresses[k].isSelect) {
                        $scope.selected.push($scope.brands[i].Dresses[k]);
                    }
                }
            }
        }
        if ($scope.selected.length > 0) {
            for (var j = 0; j < $scope.selected.length; j++) {
                $scope.selected[j].BrandTitle = $scope.brands.find(function(tmp) {
                    return tmp.Id === $scope.selected[j].BrandId;
                }).Title;
            }
        }

        $scope.isEmptyCart = $scope.selected ? ($scope.selected.length > 0 ? false : true) : true;

        $scope.noPermit = $scope.selected ? ($scope.selected.length > 5 ? true : false) : false;

        //$scope.isEnable = !$scope.isEmptyCart && !$scope.noPermit;

        function submitApp(appForm) {
            $scope.submiting = true;
            if (appForm.$valid) {
                var hours = $scope.time.match(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])/)[1];
                var year = $scope.date.getFullYear();
                var month = $scope.date.getMonth() + 1;
                var day = $scope.date.getDate();
                var minutes = '00';
                var date = new Date("" + year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":00");
                date = moment(date).format("YYYY-MM-DD HH:mm:ss");
                var data = {
                    Name: $scope.name,
                    Phone: $scope.phone,
                    Date: date,
                    Details: $scope.details || 'Детали отсутствуют.',
                    dresses: $scope.selected
                }
                dataContext.appointments.post(data, function(response) {
                    console.log(response);
                    $('#appModal').modal('show');
                    
                    $('#appModal').on('hidden.bs.modal', function (event) {
                        $location.path('/');
                        $route.reload();
                    });
                }, function(response) {
                    alert('Произошла неизвестная ошибка при формировании заявки.');
                    console.log(response);
                });
            }

        }
        function remove(dress) {
            dress.isSelect = false;
            dress.BrandTitle = null;
        }

    }
})();