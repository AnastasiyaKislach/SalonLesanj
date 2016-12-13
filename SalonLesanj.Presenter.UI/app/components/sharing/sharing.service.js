(function () {
    'use strict';

    angular.module('sharing')
        .service('sharingService', sharingService);

    sharingService.$inject = [];

    function sharingService() {
        var self = this;

        this.share = {
            vkontakte: vkontakte,
            popup: popup
        };

        function vkontakte(purl, ptitle, pimg, text) {
            var url = 'http://vkontakte.ru/share.php?';
            url += 'url=' + encodeURIComponent(purl);
            url += '&title=' + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&image=' + encodeURIComponent(pimg);
            url += '&noparse=true';
            popup(url);
        }

        function popup(url) {
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        }
    }
})();