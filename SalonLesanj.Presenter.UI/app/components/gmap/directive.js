angular.module('maps').directive('gmap', function () {
    return {
        restrict: 'E',
        scope: {
            latitude: '=lat',
            longitude: '=lng',
            zoom: '=zoom'
        }, 
        templateUrl: 'app/components/gmap/view.html',
        link: function(scope, element, attr) {
            var map;
            function initialize() {
                map = new google.maps.Map(document.getElementById('map-canvas'), {
                    zoom: 12,
                    center: { lat: scope.latitude, lng: scope.longitude }
                });
                var marker = new google.maps.Marker({
                    position: { lat: scope.latitude, lng: scope.longitude },
                    map: map,
                    title: 'Lesanj'
                });
            }

            initialize();
        }
    };
});