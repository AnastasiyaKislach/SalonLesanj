(function () {
    'use strict';

    angular.module('appointment')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'dataContext', '$location', '$route', 'dressesService', '$rootScope'];

    function FormController($scope, dataContext, $location, $route, dressesService, $rootScope) {

        $scope.show = true;
        $scope.selected = [];
        $scope.remove = remove;
        $scope.submitApp = submitApp;

        dataContext.brands.getAll(function (response) {
            $scope.selected = dressesService.getSelectDresses(response);
            $scope.brands = response;
            //var dresses = localStorage.getItem("selectedDresses");
            //$scope.selected = dressesService.dressesMatching(response, dresses);

            $scope.isEmptyCart = $scope.selected ? ($scope.selected.length > 0 ? false : true) : true;

            $scope.noPermit = $scope.selected ? ($scope.selected.length > 5 ? true : false) : false;

            $scope.isEnable = !$scope.isEmptyCart && !$scope.noPermit;

        });
        
        function clearSelected() {
            dressesService.clean($scope.brands);
            localStorage.clear();
            $scope.selected = [];
        }

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

                dataContext.appointments.post(data, function (response) {
                    console.log(response);

                    clearSelected();

                    $('#appModal').modal('show');

                    $('#appModal').on('hidden.bs.modal', function (event) {
                        $location.path('/');
                        $route.reload();
                    });
                }, function (response) {
                    alert('Произошла неизвестная ошибка при формировании заявки.');
                });
            }

        }

        function remove(dress) {
            dress.isSelect = false;
            dress.BrandTitle = null;
            $scope.selected.remove(dress);
        }
    }
})();