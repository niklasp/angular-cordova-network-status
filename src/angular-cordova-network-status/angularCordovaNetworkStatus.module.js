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
  angular.module('angularCordovaNetworkStatus.services', []);
  angular.module('angularCordovaNetworkStatus',
      [
          'angularCordovaNetworkStatus.config',
          'angularCordovaNetworkStatus.services'
      ]);

})(angular);
