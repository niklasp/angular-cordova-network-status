/* globals ionic */

'use strict';

angular
  .module('angularCordovaNetworkStatus.services')
  .factory('NetworkStatusMonitor', factory);

function factory($rootScope, $cordovaNetwork) {
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
        //$log.log('went online');
      });

      $rootScope.$on('$cordovaNetwork:offline', function () {
        //$log.log('went offline');
      });

    }
    else {

      window.addEventListener('online', function () {
        //$log.log('went online');
      }, false);

      window.addEventListener('offline', function () {
        //$log.log('went offline');
      }, false);
    }
  }
}
