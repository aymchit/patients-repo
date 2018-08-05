'use strict';
describe('myApp.navbar controller', function() {
  var scope, controller;
  //var Patients;
  var PatientsQueryMock;
  beforeEach(module('myApp.navbar'));
  
  var PatientsMock;
  // define the mock Parse service
  beforeEach(() => {
      PatientsMock = {
          query: function() {}
    };
  });

  beforeEach(inject(($rootScope, $controller) =>  {
    scope = $rootScope.$new();
    PatientsQueryMock = {};
    spyOn(PatientsMock, 'query').and.returnValue(PatientsQueryMock);
    controller = $controller(NavbarController, {
      $scope: scope,
      Patients: PatientsMock
    });
  }));
  
  it("should define controller", () => {
    expect(controller).toBeDefined();
  });

  it('should populate patient lists', function () {
    expect(PatientsMock.query).toHaveBeenCalled();
    expect(controller.patientsList).toEqual(PatientsQueryMock);
  });

  it('should set fieldsToShow', function () {
    expect(controller.fieldsToShow).toEqual(["name", "doctor", "phone", "city"]);
  });
});