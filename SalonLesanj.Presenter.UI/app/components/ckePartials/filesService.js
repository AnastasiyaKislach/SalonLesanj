(function () {
    'use strict';

    angular.module('file')
        .service('fileService', fileService);

    fileService.$inject = ['$http', 'config', '$rootScope'];

    function fileService($http, $rootScope) {
        var self = this;

        self.data = {
            images: [],
            selectedImage: null
        };

        this.add = function (imgs) {
            self.data.images.push(imgs);
        };

        this.setSelected = function(img) {
            self.data.selectedImage = img;
        }

        this.getImages = function () {
            return self.data.images;
        };

        this.getSelected = function () {
            return self.data.selectedImage;
        };

        this.clear = function () {
            self.data.images.length = 0;
            self.data.selectedImage = null;
        }
    }
})();
