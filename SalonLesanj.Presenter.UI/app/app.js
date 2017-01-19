(function () {
    'use strict';

    angular.module('home', []);
    angular.module('apiFactory', []);
    angular.module('data-access', []);
    angular.module('sliderControllers', []);
    angular.module('brands', []);
    angular.module('kinds', []);
    angular.module('dresses', []);
    angular.module('accessories', []);
    angular.module('maps', []);
    angular.module('appointment', []);
    angular.module('acControllers', []);
    angular.module('filters', []);
    angular.module('news', []);
    angular.module('about', []);
    angular.module('account', []);
    angular.module('paging', []);
    angular.module('sharing', []);
    angular.module('file', []);
    angular.module('settings', []);


    angular.module('app',
    [
        'ngRoute',
        'ngFileUpload',
        'ngMessages',
        'ngAnimate',
        'home',
        'apiFactory',
        'data-access',
        'sliderControllers',
        'brands',
        'kinds',
        'dresses',
        'accessories',
        'acControllers',
        'maps',
        'appointment',
        'filters',
        'news',
        'about',
        'account',
        'paging',
        'ngTable',
        'sharing',
        'file',
        'settings',
        'ngSanitize'
    ]);
})();