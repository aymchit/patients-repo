'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'ngResource',
  'myApp.root',
  'myApp.navbar',
  'myApp.dropdown',
  'myApp.utils',
  'myApp.patient-details',
  'myApp.patients'
]).
config(['$locationProvider', '$routeProvider', ($locationProvider, $routeProvider) => {
  $locationProvider.hashPrefix('');
  $routeProvider.otherwise({redirectTo: '/index'});
}]);

