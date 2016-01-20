'use strict';

angular
  .module('angularCordovaNetworkStatus.constants', [])
  .constant('NETWORK_EVENTS', {
    online: 'network-status-online',
    offline: 'network-status-offline',
  });
