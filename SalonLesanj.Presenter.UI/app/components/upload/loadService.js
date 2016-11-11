(function () {

    'use strict';

    angular
		.module('file')
		.service('loadService', loadService);

    loadService.$inject = ['$http', 'Upload'];

    function loadService($http, Upload) {

        this.uploadFiles = uploadFiles;
        this.uploadFile = uploadFile;

        function uploadFiles(files, data) {
        }
        function uploadFile(files, data) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        Upload.upload({
                            url: config.URL_DRESSES,
                            data: data,
                            file: file,
                            xsrfHeaderName: 'Authorization',
                            headers: {
                                'Authorization': "Bearer " + token()
                            }
                        });

                    }
                }
            }
        }
    }
})();