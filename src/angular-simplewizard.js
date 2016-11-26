angular.module('simpleWizard', []).directive('wizard', function() {

  return {

    restrict: 'E',

    scope: {
      template: '=',
      model: '=',
      step: '=?',
    },

    template: '<ng-include src="getViewUrl()"/>',


    controller: function($scope) {


      // Save step and model in original state so we can
      // reset the entire wizard
      var _model = angular.copy($scope.model);
      var _step = angular.copy($scope.step);


      $scope.getViewUrl = function() {
        // Use first element in template if step not specified
        // or doesn't exist
        if (!$scope.step || !$scope.template[$scope.step]) {
          $scope.step = Object.keys($scope.template)[0];
        }
        return $scope.template[$scope.step].view;
      };


      $scope.wizardBack = function(toDelete) {
        toDelete = toDelete ||  [];
        toDelete.forEach(function(e) {
          delete $scope.model[e];
        });
        var step = $scope.template[$scope.step];
        if (typeof step.prev === 'function') {
          $scope.step = step.prev($scope.model);
        }
      };


      $scope.wizardNext = function() {
        var step = $scope.template[$scope.step];
        if (typeof step.next === 'function') {
          $scope.step = step.next($scope.model);
        }
      };


      $scope.wizardSubmit = function(data) {
        var step = $scope.template[$scope.step];
        if (typeof step.validate === 'function') {
          if (!step.validate($scope.model)) {
            return;
          }
        }
        $scope.wizardNext();
      };


      $scope.wizardReset = function() {
        $scope.model = _model;
        $scope.step = _step || Object.keys($scope.template)[0];
      };


      $scope.wizardGoTo = function(step) {
        if ($scope.template[step]) {
          $scope.step = step;
        }
      };


    },

  };

});
