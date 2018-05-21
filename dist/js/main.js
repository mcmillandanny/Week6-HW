'use strict';

var GoogleMapModule = function () {

  var map;
  function initMap() {
    var markerPostion = {
      lat: 33.7490,
      lng: -84.3880
    };
    map = new google.maps.Map(document.getElementById('map'), {
      center: markerPostion,
      zoom: 10

    });

    var infoWindow = new google.maps.InfoWindow({
      content: "Welcome!!"
    });
    var marker = new google.maps.Marker({
      position: markerPostion,
      map: map
    });

    marker.addListener('click', function () {
      infoWindow.open(map, marker);
    });
  }

  function showMarkers(results) {
    for (var i = 0; i < results.length; i++) {
      var coords = results[i];
      var latLng = new google.maps.LatLng(coords.lat, coords.lng);
      // console.log(coords.lat, coords.lng);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    }
  }

  return {
    initMap: initMap,
    showMarkers: showMarkers
  };
}();
//# sourceMappingURL=main.js.map
