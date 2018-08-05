'use strict';

describe('myApp.patients controller', function() {
  var scope, controller;
  beforeEach(module('myApp.patients'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller(PatientDetailsController);
  }));
  
  it("should define controller", () => {
    expect(controller).toBeDefined();
  });

  describe('convertBooleanToString', () => {
    it("should return Yes when passed is true", () => {
      expect(controller.convertBooleanToString(true)).toEqual("Yes");
    });
    it("should return No when passed is false", () => {
      expect(controller.convertBooleanToString(false)).toEqual("No");
    });
    it("should return the same value is passed value isnt boolean", () => {
      expect(controller.convertBooleanToString("Tester")).toEqual("Tester");
    });
  });

  describe("convertKeyToFieldName", () => {
    it("should convert object key to readable key name", () => {
      expect(controller.convertKeyToFieldName("userName")).toEqual("User Name");
      expect(controller.convertKeyToFieldName("userId")).toEqual("User Id");
    });
  });
});