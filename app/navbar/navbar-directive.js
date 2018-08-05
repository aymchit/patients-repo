'use strict';
angular.module('myApp.navbar.navbar-directive', [])
  .directive('navbar', [ () => {
    return {
      restrict: 'E',
      templateUrl: './navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm'
    };
  }]);

