describe('Patients Resource Service', function () {
  var Patients;
  var $resource;
  var PatientsResourceMock;
  beforeEach(module('myApp.patients', function ($provide) {
      // Mock out $resource here
      $provide.factory('$resource', function () {
          PatientsResourceMock = {};
          var $resource = jasmine.createSpy('$resource');
          $resource.and.returnValue(PatientsResourceMock);
          return $resource;
      });
  }));
  beforeEach(inject(function (_Patients_, _$resource_) {
      Patients = _Patients_;
      $resource = _$resource_;
  }));

  it('should initialize resource', function () {
      expect($resource).toHaveBeenCalledWith( 
        'data/patientsList.json', {}, {
           query: {
              method: 'GET', 
              isArray: true 
            } 
          }
        );
      expect(Patients).toBe(PatientsResourceMock);
  });
});