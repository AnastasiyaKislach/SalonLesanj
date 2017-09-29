(function () {
    'use strict';

    angular.module('data-access')
        .service('dataContext', dataContext);

    dataContext.$inject = ['apiFactory', 'config'];

    function dataContext(apiFactory, config) {

        this.dresses = apiFactory.createApiService(config.URL_DRESSES);
        this.brands = apiFactory.createApiService(config.URL_BRANDS);
        this.accessories = apiFactory.createApiService(config.URL_ACCESSORIES);
        this.kinds = apiFactory.createApiService(config.URL_KINDS);
        this.news = apiFactory.createApiService(config.URL_NEWS);
        this.appointments = apiFactory.createApiService(config.URL_APPOINTMENT);
        this.files = apiFactory.createApiService(config.CTRL_FILE);
        this.settings = apiFactory.createApiService(config.URL_SETTINGS);
        this.testimonials = apiFactory.createApiService(config.URL_TESTIMONIALS);
        this.photos = apiFactory.createApiService(config.URL_PHOTOS);
    }
})();