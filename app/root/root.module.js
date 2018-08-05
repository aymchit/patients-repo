'use strict';

angular.module('myApp.root', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', ($routeProvider) => {
  $routeProvider.when('/index', {
    templateUrl: './root/root.html',
    controller: RootController,
    controllerAs: 'vm'
  });
}]);