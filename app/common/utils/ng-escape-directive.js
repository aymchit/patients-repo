angular.module('myApp.utils.ng-escape-directive', [])
.directive('ngEscape', function () {
    return function (scope, element, attrs) {
      //Directive for escape key
      element.bind('keydown keypress', function (event) {
        if(event.which === 27) { // 27 = esc key
          scope.$apply(function (){
            scope.$eval(attrs.ngEscape);
          });
  
          event.preventDefault();
        }
      });
    };
  })