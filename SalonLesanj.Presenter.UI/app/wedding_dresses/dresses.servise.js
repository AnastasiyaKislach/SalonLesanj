(function () {
    'use strict';

    angular.module('dresses')
        .service('dressesService', dressesService);

    dressesService.$inject = [];

    function dressesService() {

        var self = this;

        self.getSelectDresses = getSelectDresses;
        self.dressesMatching = dressesMatching;
        self.clean = clean;
        self.getDressesArrayId = getDressesArrayId;

        //get all brands and return selected dresses
        function getSelectDresses(brands) {
            var selected = [];
            each(brands,
                function (brand, dress, index) {
                    if (dress.isSelect) {
                        //dress.BrandTitle = brand.Title;
                        selected.push(dress);
                    }
                });
            return selected;
        }

        //returns only ids of selected dresses for localstorage 
        function getDressesArrayId(brands) {
            var selected = getSelectDresses(brands);
            var selectedIds = selected.map(function (dress) {
                return dress.Id;
            });
            return selectedIds;
        }

        //get all brands and matching dresses and ids
        function dressesMatching(brands, ids) {
            var selected = [];
            each(brands, function (brand, dress, index) {
                if (ids.includes(dress.Id)) {
                    dress.isSelect = true;
                    dress.BrandTitle = brand.Title;
                    selected.push(dress);
                }
            });
            return selected;
        }

        function clean(brands) {
            each(brands, function (brand, dress, index) {
                if (dress.isSelect) {
                    dress.isSelect = false;
                    dress.BrandTitle = null;
                }
            });
        }

        function each(brands, callback) {
            var index = 0;
            for (var i = 0; i < brands.length; i++) {
                var brand = brands[i];
                var dresses = brand.Dresses;
                for (var k = 0; k < dresses.length; k++) {
                    var dress = dresses[k];
                    callback(brand, dress, index);
                    index++;
                }
            }
        }
    }

})();