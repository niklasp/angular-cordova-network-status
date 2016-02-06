/* globals ionic */

'use strict';

angular
  .module('angularCordovaNetworkStatus.services')
  .provider('NetworkStatusMonitor', function NetworkStatusMonitorProvider () {

  // this is just a service with the provider function !!

  /* jshint validthis:true */
  this.$get = function ($rootScope, $injector, NETWORK_EVENTS) {

    var dummyService = {
      isOnline: function () { return false; },
      isOffline: function () { return true; },
      watchNetworkStatus: function(){}
    };    

    if (typeof ionic === 'undefined') {
      console.log('The angular-cordova-network-status is made to run with ionic' +
       'installed. Please install the ionic framework.');
      return dummyService;
    }
    try {
      var $cordovaNetwork = $injector.get('$cordovaNetwork');
    } catch(err) {
      console.log('You need to install cordova network plugin for ' +
      'angular-cordova-network-status to work. Do it via: \n$ cordova plugin ' +
      'add cordova-plugin-network-information');
      return dummyService;
    }

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
  };
});
