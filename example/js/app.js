var app = angular.module('App', ['simpleWizard']);

app.controller('MainCtrl', ['$scope', function($scope) {

  // This object will be filled with
  // the user input gathered form the wizard
  $scope.wizard = {};


  // The template from which our wizard is created
  $scope.wizardTmpl = {
    step1: {
      view: 'views/step1.html',
      next: 'step2',
    },
    step2: {
      view: 'views/step2.html',
      prev: 'step1',
      next: function(data) {
        // 'data' contains the contents of the form from all steps
        // It is the same as '$scope.wizard'
        // We return the name of the next step as gathered from the form
        return data.nextStep;
      },
    },
    step3a: {
      view: 'views/step3a.html',
      prev: 'step2',
      next: function(data) {
        return data.goToStep3b ? 'step3b' : 'finish'
      },
    },
    step3b: {
      view: 'views/step3b.html',
      prev: function(data) {
        // Depending on where we came from we return to the appropriate
        // place if the "Back" button is pressed
        return data.nextStep === 'step3a' ? 'step3a' : 'step2';
      },
      next: function(data) {
        return data.something;
      },
    },
    deadend: {
      view: 'views/deadend.html',
      prev: 'step3b',
    },
    finish: {
      view: 'views/finish.html',
      prev: function(data) {
        return ((data.nextStep === 'step3a') && !data.goToStep3b) ? 'step3a' : 'step3b';
      },
    },
  };

},]);
