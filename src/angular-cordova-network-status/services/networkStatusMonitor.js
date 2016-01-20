/* globals ionic */

'use strict';

angular
  .module('angularCordovaNetworkStatus.services')
  .provider('NetworkStatusMonitor', networkStatusProvider);

function networkStatusProvider() {
  /* jshint validthis:true */
  this.$get = networkHelperFactory;

  function networkHelperFactory($rootScope, $cordovaNetwork, NETWORK_EVENTS) {

    var service = {
      isOnline: isOnline,
      isOffline: isOffline,
      watchNetworkStatus: watchNetworkStatus
    };

    return service;

    ///////////////// ///////////////// /////////////////

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
}
