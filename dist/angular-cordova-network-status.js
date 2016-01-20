(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularCordovaNetworkStatus.config', [])
      .value('angularCordovaNetworkStatus.config', {
          debug: true
      });

  // Modules
  angular.module('angularCordovaNetworkStatus.constants', []);
  angular.module('angularCordovaNetworkStatus.services', [
    'angularCordovaNetworkStatus.constants'
  ]);
  angular.module('angularCordovaNetworkStatus',
      [
          'angularCordovaNetworkStatus.constants',
          'angularCordovaNetworkStatus.config',
          'angularCordovaNetworkStatus.services'
      ]);

})(angular);

'use strict';

angular
  .module('angularCordovaNetworkStatus.constants', [])
  .constant('NETWORK_EVENTS', {
    online: 'network-status-online',
    offline: 'network-status-offline',
  });

/* globals ionic */

'use strict';

angular
  .module('angularCordovaNetworkStatus.services')
  .factory('NetworkStatusMonitor', factory);

function factory($rootScope, $cordovaNetwork, NETWORK_EVENTS) {
  var service = {
    isOnline: isOnline,
    isOffline: isOffline,
    watchNetworkStatus: watchNetworkStatus
  };

  return service;

  function isOnline (){
    if (ionic.Platform.isWebView()) {
      return $cordovaNetwork.isOnline();
    } else {
      return navigator.onLine;
    }
  }

  function isOffline (){
    if (ionic.Platform.isWebView()) {
      return !$cordovaNetwork.isOnline();
    } else {
      return !navigator.onLine;
    }
  }

  function watchNetworkStatus () {
    if (ionic.Platform.isWebView()) {

      $rootScope.$on('$cordovaNetwork:online', function () {
        $rootScope.$broadcast(NETWORK_EVENTS.online);
      });

      $rootScope.$on('$cordovaNetwork:offline', function () {
        $rootScope.$broadcast(NETWORK_EVENTS.offline);
      });

    }
    else {

      window.addEventListener('online', function () {
        $rootScope.$broadcast(NETWORK_EVENTS.online);
      }, false);

      window.addEventListener('offline', function () {
        $rootScope.$broadcast(NETWORK_EVENTS.offline);
      }, false);
    }
  }
}
