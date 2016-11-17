﻿(function () {
    'use strict';

    angular.module('settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$rootScope', '$scope', 'dataContext', 'accountService', 'config'];

    function SettingsController($rootScope, $scope, dataContext, accountService, config) {
        $scope.init = function () {
            CKEDITOR.replace('about',
            {
                filebrowserImageBrowseUrl: config.CTRL_FILE,
                filebrowserImageUploadUrl: config.CTRL_FILE
            });
            CKEDITOR.replace('interior',
            {
                filebrowserImageBrowseUrl: config.CTRL_FILE,
                filebrowserImageUploadUrl: config.CTRL_FILE
            });
        }
        $scope.saveChanges = function (settingsForm) {
            if (!accountService.getUser().isAdmin) {
                $location.path('/login');
            } else {
                $scope.update = true;
                if (settingsForm.$valid) {
                    var about = CKEDITOR.instances.about.getData();
                    var interior = CKEDITOR.instances.interior.getData();
                    var data = {
                        PhoneNumber1: $rootScope.settings.PhoneNumber1,
                        PhoneNumber2: $rootScope.settings.PhoneNumber2,
                        Address: $rootScope.settings.Address,
                        Email: $rootScope.settings.Email,
                        Worktime1: $rootScope.settings.Worktime1,
                        Worktime2: $rootScope.settings.Worktime2,
                        Worktime3: $rootScope.settings.Worktime3,
                        Socialhub: $rootScope.settings.Socialhub,
                        AboutShort: $rootScope.settings.AboutShort,
                        About: about,
                        Interior: interior,
                        Appointment: $rootScope.settings.Appointment
                    }
                    dataContext.settings.put(data, function (){}, function (){});
                    dataContext.settings.getAll(function (response) {
                        $rootScope.settings = response;
                    });
                }
            }
        }
    }
})();