// Geolocation tweet sample.

var BASE_MAP_URL = "https://maps.google.com/maps/api/geocode/json?sensor=false&latlng=";
var ADMIN_POLITICAL = "administrative_area_level_1"
,   LOCALITY = "locality"
,   SUBLOCALITY = "sublocality_level_1"
,   SUBLOCALITY_2 = "sublocality_level_2";

$(document).ready(function () {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
      function(position) {
        alert(position.coords.latitude + ":" + position.coords.longitude);
        var SEARCH_URL = (
          BASE_MAP_URL + 
          position.coords.latitude + 
          "," + 
          position.coords.longitude
        );

        $.get(SEARCH_URL, function(data) {
          var results = data.results;
          var address = {};
          for (var i = 0; i < results.length; i++) {
            var addressComponents = results[i].address_components;
            for (var j = 0; j < addressComponents.length; j++) {
              var component = addressComponents[j];
              if (component.types.indexOf(ADMIN_POLITICAL) != -1) {
                address.political = component.long_name;
              }
              if (component.types.indexOf(LOCALITY) != -1) {
                address.locality = component.long_name;
              }
              if (component.types.indexOf(SUBLOCALITY) != -1) {
                address.sublocality = component.long_name;
              }
              if (component.types.indexOf(SUBLOCALITY_2) != -1) {
                address.sublocality_2 = component.long_name;
              }
            }
          }
          console.dir(address);

          var message = (
            address.political + 
            address.locality +
            address.sublocality + 
            address.sublocality_2
          );

          $("#message").val(message);
          $("#tweet-test").html(
            '<a href="https://twitter.com/share" class="twitter-share-button" data-lang="ja" data-size="large" data-via="hogehogehoge" data-hashtags="sample" data-text="' + message + '">ツイート</a>'
          );
          twttr.widgets.load();
        }, "json");
      }, 
      function(err) {
        if (err.code == error.PERMISSION_DENIED) {
          alert("位置情報の取得を許可してください。");
        }
        else if (err.code == error.POSITION_UNAVAILABLE) {
          alert("位置情報が取得できませんでした。");
        }
        else if(err.code == eerror.PERMISSION_DENIED_TIMEOUT) {
          alert("もう一度やり直してみてください。");
        }
    });
  }
  else {
    alert("どうやら利用している端末だと位置情報とれないようです。");
  }
});
