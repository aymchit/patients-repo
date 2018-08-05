'use strict';
function PatientDetailsController($rootScope) {
  let vm = this;
  vm.patient = null;
  
  //Listen to the item select event of dropdown
  $rootScope.$on('dropdown-item-select', (event, {selectedItem}) => {
    vm.patient = selectedItem;
  });

  //Convert any boolean values to Yes/No
  vm.convertBooleanToString = (value) => {
    if(value === true) {
      return 'Yes';
    } else if(value === false) {
      return 'No';
    } else {
      return value;
    }
  } 
  
  /**
   * Convert object keys to readable Column names
   * eg. itemName to "Item Name"
   */
  vm.convertKeyToFieldName = (key) => {
    return key.replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); });
  }
}

PatientDetailsController.$inject = ['$rootScope'];