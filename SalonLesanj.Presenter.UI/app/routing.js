(function () {
    'use strict';

    angular.module('app')
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    title: 'Home',
                    templateUrl: 'app/home/view.html'
                })
                .when('/wedding-dresses', {
                    title: 'Wedding dresses',
                    templateUrl: 'app/wedding_dresses/view.html',
                    controller: 'WeddingDressesController',
                    controllerAs: 'ctrl'
                })
                .when('/wedding-dresses/:brand', {
                    title: 'Wedding dresses',
                    templateUrl: 'app/wedding_dresses/view.html',
                    controller: 'WeddingDressesController',
                    controllerAs: 'ctrl'
                })
                .when('/wedding-dresses/:brand/details/:id', {
                    title: 'Wedding dresses',
                    templateUrl: 'app/wedding_dresses/view.html',
                    controller: 'WeddingDressesController',
                    controllerAs: 'ctrl'
                })
                .when('/wedding-dresses/:brand*', {
                    title: 'Wedding dresses',
                    templateUrl: 'app/wedding_dresses/view.html',
                    controller: 'WeddingDressesController',
                    controllerAs: 'ctrl'
                })
                .when('/accessories', {
                    title: 'Accessories',
                    templateUrl: 'app/accessories/view.html',
                    controller: 'AccessoriesController',
                    controllerAs: 'ctrl'
                })
                .when('/accessories/:kind', {
                    title: 'Accessories',
                    templateUrl: 'app/accessories/view.html',
                    controller: 'AccessoriesController',
                    controllerAs: 'ctrl'
                })
                .when('/accessories/:kind/details/:id', {
                    title: 'Accessories',
                    templateUrl: 'app/accessories/view.html',
                    controller: 'AccessoriesController',
                    controllerAs: 'ctrl'
                })
                .when('/accessories/:kind/:pageIndex*', {
                    title: 'Accessories',
                    templateUrl: 'app/accessories/view.html',
                    controller: 'AccessoriesController',
                    controllerAs: 'ctrl'
                })
                .when('/news', {
                    title: 'News',
                    templateUrl: 'app/news/view.html',
                    controller: 'NewsController',
                    controllerAs: 'ctrl'
                })
                .when('/news/:id', {
                    title: 'News',
                    templateUrl: 'app/news/details.html',
                    controller: 'NewsController',
                    controllerAs: 'ctrl'
                })
                .when('/about', {
                    title: 'About',
                    templateUrl: 'app/about/view.html',
                    controller: 'FeedBackController',
                    controllerAs: 'ctrl'
                })
                .when('/appointment', {
                    title: 'Appointment',
                    templateUrl: 'app/appointment/view.html',
                    controller: 'FormController',
                    controllerAs: 'ctrl'
                })
                .when('/partners', {
                    title: 'Partners',
                    templateUrl: 'app/components/partners/view.html'
                })
                .when('/login', {
                    title: 'Login',
                    templateUrl: 'app/account/view.html',
                    controller: 'AccountController',
                    controllerAs: 'ctrl'
                })
                .when('/admin', {
                    title: 'Admin',
                    templateUrl: 'app/admin/home/view.html',
                    controller: 'HomeController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/wedding-dresses/create', {
                    title: 'Dresses',
                    templateUrl: 'app/admin/dresses/view.html',
                    controller: 'DressCreateController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/wedding-dresses/edit/:id', {
                    title: 'Dresses',
                    templateUrl: 'app/admin/dresses/edit.html',
                    controller: 'DressEditController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/accessories/create', {
                    title: 'Dresses',
                    templateUrl: 'app/admin/accessories/view.html',
                    controller: 'AccessoryCreateController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/accessories/edit/:id', {
                    title: 'Dresses',
                    templateUrl: 'app/admin/accessories/edit.html',
                    controller: 'AccessoryEditController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/brands', {
                    title: 'Brands',
                    templateUrl: 'app/admin/brands/view.html',
                    controller: 'BrandEditController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/kinds', {
                    title: 'Kinds',
                    templateUrl: 'app/admin/kinds/view.html',
                    controller: 'KindEditController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/news/create', {
                    title: 'News',
                    templateUrl: 'app/admin/news/view.html',
                    controller: 'NewsCreateController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/news/edit/:id', {
                    title: 'News',
                    templateUrl: 'app/admin/news/edit.html',
                    controller: 'NewsEditController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/appointments', {
                    title: 'Appointments',
                    templateUrl: 'app/admin/appointments/view.html',
                    controller: 'AppointmentEditController',
                    controllerAs: 'ctrl'
                })
                .when('/admin/settings', {
                    title: 'Settings',
                    templateUrl: 'app/admin/settings/view.html',
                    controller: 'SettingsController',
                    controllerAs: 'ctrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        }
        ]);
})();