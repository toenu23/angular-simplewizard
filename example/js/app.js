var app = angular.module('App', ['simpleWizard']);

app.controller('MainCtrl', ['$scope', function($scope) {

  $scope.forms = {
    wizard: {},
  };

  $scope.wizardTmpl = {
    step1: {
      view: 'views/step1.html',
      prev: () => false,
      next: () => 'step2',
    },
    step2: {
      view: 'views/step2.html',
      prev: () => 'step1',
      next: data => data.goToStep3 === '3a' ? 'step3a' : 'step3b',
    },
    step3a: {
      view: 'views/step3a.html',
      prev: () => 'step2',
      next: data => data.goToStep3b ? 'step3b' : 'finish',
    },
    step3b: {
      view: 'views/step3b.html',
      prev: data => data.goToStep3 === '3a' ? 'step3a' : 'step2',
      next: data => data.something,
    },
    deadend: {
      view: 'views/deadend.html',
      prev: () => 'step3b',
    },
    finish: {
      view: 'views/finish.html',
      prev: data => ((data.goToStep3 === '3a') && !data.goToStep3b) ? 'step3a' : 'step3b',
    },
  };

},]);
