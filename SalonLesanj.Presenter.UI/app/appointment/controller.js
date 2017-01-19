(function () {
    'use strict';

    angular.module('appointment')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'dataContext', '$location', '$route', 'dressesService'];

    function FormController($scope, dataContext, $location, $route, dressesService) {

        $scope.show = true;
        $scope.selected = [];
        $scope.remove = remove;
        $scope.submitApp = submitApp;

        dataContext.brands.getAll(function (response) {
            $scope.brands = response;

            $scope.selected = dressesService.dressesMatching(response);
            $scope.selectedIds = dressesService.getDressesArrayId(response);
            
            $scope.isEmptyCart = $scope.selected ? ($scope.selected.length > 0 ? false : true) : true;

            $scope.noPermit = $scope.selected ? ($scope.selected.length > 5 ? true : false) : false;

            $scope.isEnable = !$scope.isEmptyCart && !$scope.noPermit;

        });
        
        function clearSelected() {
            dressesService.clean($scope.brands);
            $scope.selected = [];
            $scope.selectedIds = [];
        }

        function submitApp(appForm) {
            $scope.submiting = true;
           
            if (appForm.$valid) {

                //var time = $scope.time;
                //var date = $scope.date.toLocaleDateString();

                //var hours = $scope.time.match(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])/)[1];
                var year = $scope.date.getFullYear();
                var month = $scope.date.getMonth() + 1;
                var day = $scope.date.getDate();
                //var minutes = '00';
                //var date = new Date("" + year + "-" + month + "-" + day + " " + $scope.time);
               // date = moment(date).format("YYYY-MM-DD HH:mm:ss");
                var date = "" + year + "/" + month + "/" + day + " " + $scope.time;
              //  date = date.replace(/\./g, "/") + " " + time;

                var data = {
                    Name: $scope.name,
                    Phone: $scope.phone,
                    Date: date,
                    Details: $scope.details || 'Детали отсутствуют.',
                    dresses: $scope.selected
                };
              
                dataContext.appointments.post(data, function (response) {

                    //alert(JSON.stringify(response));

                    clearSelected();

                    $('#appModal').modal('show');

                    $('#appModal').on('hidden.bs.modal', function (event) {
                        $location.path('/');
                        $route.reload();
                    });
                }, function (response) {
                    
                    alert('Произошла неизвестная ошибка при формировании заявки.  ' + JSON.stringify(response.ExceptionMessage));
                    
                });
            }
        }

        function remove(dress) {
            dress.isSelect = false;
            dress.BrandTitle = null;
            $scope.selected.remove(dress);
            $scope.selectedIds.remove(dress.Id);
            dressesService.dressLocalStorage($scope.selectedIds);
        }
    }
})();