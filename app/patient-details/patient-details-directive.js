'use strict';
angular.module('myApp.patient-details.patient-details-directive', [])
  .directive('patientDetails', [ () => {
    return {
      restrict: 'E',
      templateUrl: './patient-details/patient-details.html',
      controller: PatientDetailsController,
      controllerAs: 'vm',
      bindToController: true
    };
  }]);

