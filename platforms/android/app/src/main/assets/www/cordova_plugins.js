cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-deeplinks.universalLinks",
      "file": "plugins/cordova-plugin-deeplinks/www/universal_links.js",
      "pluginId": "cordova-plugin-deeplinks",
      "clobbers": [
        "universalLinks"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-deeplinks": "1.1.0",
    "cordova-plugin-geolocation": "4.0.1",
    "cordova-plugin-whitelist": "1.3.3"
  };
});