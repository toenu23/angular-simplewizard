angular.module('simpleWizard', []).directive('wizard', function() {

  return {

    restrict: 'E',

    template: '<ng-include src="getViewUrl()"/>',


    controller: function($scope, $attrs) {


      var wizard = {
        template: $scope[$attrs.template],
        model: $scope[$attrs.model],
        step: $scope[$attrs.step],
      };


      // Save step and model in original state so we can
      // reset the entire wizard
      var _model = angular.copy(wizard.model);
      var _step = angular.copy(wizard.step);


      $scope.getViewUrl = function() {
        // Use first element in template if step not specified
        // or doesn't exist
        if (!wizard.step || !wizard.template[wizard.step]) {
          wizard.step = Object.keys(wizard.template)[0];
        }
        return wizard.template[wizard.step].view;
      };


      $scope.wizardBack = function(toReset) {
        toReset = toReset ||  [];
        toReset.forEach(function(e) {
          wizard.model[e] = _model[e] || undefined;
        });
        var step = wizard.template[wizard.step];
        wizard.step = (typeof step.prev === 'function')
          ? step.prev(wizard.model)
          : step.prev;
      };


      $scope.wizardNext = function() {
        var step = wizard.template[wizard.step];
        wizard.step = (typeof step.next === 'function')
          ? step.next(wizard.model)
          : step.next;
      };


      $scope.wizardSubmit = function(data) {
        var step = wizard.template[wizard.step];
        if (typeof step.validate === 'function') {
          if (!step.validate(wizard.model)) {
            return;
          }
        }
        $scope.wizardNext();
      };


      $scope.wizardReset = function() {
        $scope[$attrs.model] = _model;
        wizard.step = _step || Object.keys(wizard.template)[0];
      };


      $scope.wizardGoTo = function(step) {
        if (wizard.template[step]) {
          wizard.step = step;
        }
      };


    },

  };

});
