'use strict';
function NavbarController($scope, Patients) {
  let vm = this;
  vm.patientsList =  Patients.query();
  //Pass the keys on which typeahead will search and display
  vm.fieldsToShow =  ["name", "doctor", "phone", "city"];
}
NavbarController.$inject = ['$scope', 'Patients'];