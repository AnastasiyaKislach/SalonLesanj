(function () {
    'use strict';

    angular.module('settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$rootScope', '$scope', 'dataContext', 'accountService'];

    function SettingsController($rootScope, $scope, dataContext, accountService) {
        $scope.init = function () {
            CKEDITOR.replace('about');
        }
        $scope.saveChanges = function (settingsForm) {
            if (!accountService.getUser().isAdmin) {
                $location.path('/login');
            } else {
                $scope.update = true;
                if (settingsForm.$valid) {
                    var about = CKEDITOR.instances.about.getData();
                    var data = {
                        PhoneNumber1: $rootScope.settings.PhoneNumber1,
                        PhoneNumber2: $rootScope.settings.PhoneNumber2,
                        Adress: $rootScope.settings.Adress,
                        Email: $rootScope.settings.Email,
                        Worktime1: $rootScope.settings.Worktime1,
                        Worktime2: $rootScope.settings.Worktime2,
                        Worktime3: $rootScope.settings.Worktime3,
                        Socialhub: $rootScope.settings.Socialhub,
                        AboutShort: $rootScope.settings.AboutShort,
                        About: about,
                        //Interior: interior,
                        //Appointment: $rootScope.settings.Appointment
                    }
                    dataContext.settings.put(data,
                        function (response) {
                            console.log(response);
                        },
                        function (response) {
                            console.log(response);
                        });
                }
            }
        }
    }
})();