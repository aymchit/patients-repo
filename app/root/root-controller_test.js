'use strict';
describe('myApp.root controller', function() {
  var scope, controller;
  beforeEach(module('myApp.root'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller(RootController);
  }));
  
  it("should define controller", () => {
    expect(controller).toBeDefined();
  });
});