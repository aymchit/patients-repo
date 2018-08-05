angular.
  module('myApp.patients').
  factory('Patients', ['$resource',
    ($resource) => {
      //Fetch the patients list
      return $resource('data/patientsList.json', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);