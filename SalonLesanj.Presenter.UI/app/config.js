(function() {
    'use strict';

    angular.module('app')
        .constant('config', {
            URL_BRANDS: '/api/Brand',
            URL_DRESSES: 'api/Dress',
            URL_ACCESSORIES: 'api/Accessory',
            URL_KINDS: '/api/Kind',
            URL_NEWS: 'api/News',
            URL_APPOINTMENT: 'api/Appointment',
            URL_FEEDBACK: 'api/FeedBack',
            CTRL_ACCOUNT_LOGIN: '/Token',
            CTRL_ACCOUNT_LOGOUT: '/api/Account/Logout',
            CTRL_ACCOUNT_REGISTER: '/api/Account/Register',
            CTRL_ACCOUNT_CONFIRMLOGIN: '/api/Account/ConfirmLogin',
            AUTH_TOKEN: 'access_token',
            AUTH_TOKEN_TYPE: 'token_type',
            CTRL_FILE: 'api/File',
            URL_SETTINGS: 'api/AppSettings',
            //URL_INDEX: 'api/Index'
        });
})();