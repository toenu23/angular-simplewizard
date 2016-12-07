---
layout: page
title: Docs
permalink: /docs/
---

## Installation ##
Install via NPM ...

    npm install angular-simplewizard

... or install via bower ...

    bower install angular-simplewizard

... or clone the repo

    git clone https://github.com/toenu23/angular-simplewizard

Include the library in your HTML file

    <script src="angular-simplewizard.js"></script>

Add `simpleWizard` to your app's dependencies:

    var app = angular.module('App', ['simpleWizard']);


## Usage
You may now use the `wizard` directive:

    <wizard model="orderForm" step="step" template="wizardTmpl"></wizard>


The `<wizard>` directive has the following attributes:

### `model`
The scope variable (object) to be populated with the results of the wizard.
The ng-model parameter for each form field should be a member of this object.


### `step` (optional)
A scope variable containing the initial step from which the wizard begins. If not specified, the first element in the `template` object is the initial step.

### `template`
 Scope variable (object) describing the steps of the wizard and their logic.
 A step is identified by its object key and has the following parameters:


  - `view` [string] URL to the template (required)
  - `prev` and `next` [string or function] The name of the previous and next step, or a function returning it.
  

A template may look something like this: (See example for more details)


    $scope.wizardTmpl = {
    
      product: {
      ...
      },
    
      account: {
        view: 'views/account.html',
        prev: 'product',
        next: function(data) {
          return (data.type === 'ebook') ? 'payment' : 'shipping';
        },
      },
    
      shipping: {
        ...
      },

      payment: {
        ...
      },

      ...

    };




The following functions are exposed to the scope and available in your view files:


#### `wizardSubmit()`
Submit the current step. The wizard will navigate to the next step. This function should be given as the `ng-submit` parameter of the form.

#### `wizardBack([toReset])`
Navigate to the previous step. The optional parameter `toReset` (Array) contains the names of keys of the model to reset to their inital state. This may be necessary if the user navigates back multiple steps.

#### `wizardGoTo(step)`
Go to any step defined in the template

#### `wizardReset()`
Completely reset the wizard and return to the inital step


### Example step
A minimal view file might look like this:

    <!-- step2.html -->
    <form name="forms.wizard.step2" ng-submit="wizardSubmit()" novalidate>
    
      <label>A text field</label>
      <input type="text" name="text" ng-model="wizard.text" />
    
      <button type="button" ng-click="wizardBack()">Back</button>
      <button type="submit">Continue</button>
    
    </form>



