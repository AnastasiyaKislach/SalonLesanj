(function () {
    'using strict';

    angular
        .module('data-access')
        .factory('apiFactory', apiFactory);

    apiFactory.$inject = ['$http', '$rootScope', 'accountService', 'Upload'];

    function apiFactory($http, $rootScope, accountService, Upload) {

        $http.defaults.cache = false;

        return {
            createApiService: createApiService
        };

        function createApiService(baseUrl) {
            return new BaseApiService(baseUrl);
        }

        function BaseApiService(baseUrl) {

            var self = this;
            var cash = null;

            self.baseUrl = baseUrl;
            self.getAll = getAll;
            self.getById = getById;
            self.post = post;
            self.put = put;
            self.upload = upload;
            self.remove = remove;


            function getAll(success) {
                if (cash) {
                    success(cash);
                } else {
                    $http.get(self.baseUrl).success(function (response) {
                        cash = response;
                        success(response);
                    });
                }
            }

            function getById(id, success) {
                if (cash) {
                    var item = cash.find(function (item) {
                        return item.Id == id;
                    });
                    success(item);
                } else {
                    $http.get(self.baseUrl + '/' + id).success(function (response) {
                        success(response);
                    });
                }
            }

            function post(data, success, error) {
                return $http({
                    method: 'POST',
                    url: self.baseUrl,
                    data: $.param(data),
                    xsrfHeaderName: 'Authorization',
                    headers: {
                        'Authorization': accountService.tokenType() + ' ' + accountService.token(),
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).success(function (response) {
                    if (cash) {
                        cash.push(response);
                    }
                    success(response);
                }).error(function (response) {
                    error(response);
                });
            }

            function put(data, success, error) {
                return $http({
                    method: 'PUT',
                    url: self.baseUrl,
                    data: $.param(data),
                    xsrfHeaderName: 'Authorization',
                    headers: {
                        'Authorization': accountService.tokenType() + ' ' + accountService.token(),
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).success(function (response) {
                    if (cash) {
                        if (response.Id) {
                            var edit = cash.find(function (item) {
                                return item.Id === response.Id;
                            });
                            angular.extend(edit, response);
                        }
                    }
                    success(response);
                }).error(function (response) {
                    error(response);
                });
            }

            function remove(id, success, error) {
                return $http({
                    method: 'DELETE',
                    url: self.baseUrl + '/' + id,
                    xsrfHeaderName: 'Authorization',
                    headers: {
                        'Authorization': accountService.tokenType() + ' ' + accountService.token(),
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).success(function (response) {
                    if (cash) {
                        var rem = cash.find(function (item) {
                            return item.Id == response.Id;
                        });
                        cash.remove(rem);
                    }
                    success(response);
                }).error(function (response) {
                    error(response);
                });
            }


            function upload(file, success, progress, error) {
                if (!file.$error) {
                    Upload.upload({
                        url: self.baseUrl,
                        file: file,
                        xsrfHeaderName: 'Authorization',
                        headers: {
                            'Authorization': accountService.tokenType() + ' ' + accountService.token()
                        }
                    })
					.progress(progress || function () { })
					.success(success || function () { })
					.error(error || function (q, w) {
					    console.log(q);
					    console.log(w);
					});
                }
            }
        }
    }
})();