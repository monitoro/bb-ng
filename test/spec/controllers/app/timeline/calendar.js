'use strict';

describe('Controller: AppTimelineCalendarCtrl', function () {

  // load the controller's module
  beforeEach(module('bbNgApp'));

  var AppTimelineCalendarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppTimelineCalendarCtrl = $controller('AppTimelineCalendarCtrl', {
      $scope: scope
    });
  }));

});