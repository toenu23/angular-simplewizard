# angular-simplewizard
A simple wizard directive for angular.js

It's easy to use and fully customize-able and allows you to setup complex multi-step forms with diverging/converging branches.

The HTML for each step must be in an own file which is ng-included by the directive. Each step is a regular angular form, but you may do validation with data from all steps.


## Demo
To do


## Installation ##
Include the library in your HTML file

    <script src="angular-simplewizard.js"></script>

Add `simpleWizard` to your app's dependencies:

    var app = angular.module('App', ['simpleWizard']);


## Usage
You may now use the `wizard` directive:

    <wizard model="orderForm" step="product" template="wizardTmpl"></wizard>


The `<wizard>` directive has the following attributes:

### `model`
The variable to be populated with the results of the wizard

### `step` (optional)
The initial step from which the wizard begins. If not specified, the first element in the `template` object is the initial step.

### `template`
 Template object describing the steps of the wizard and their logic.
 A step is identified by its object key and has the following parameters:


  - `view` [string] URL to the template (required)
  - `prev` and `next` [string or function] The name of the previous and next step, or a function returning it.
  - `validate` [function] Custom validation function

A template may look something like this: (See example for more details)


    $scope.wizardTmpl = {
    
      product: {
      ...
      },
    
      account: {
        view: 'views/account.html',
        prev: 'product',
        next: function(model) {
          return (model.type === 'ebook') ? 'payment' : 'shipping';
        },
        validate: function(model) {
          // 'model' contains data from all steps
          // Do some validation
          return true;
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
Submit the current step. The wizard will perform validation and navigate to the next step if successful. Ideally, this function is given as the `ng-submit` parameter of the form.

#### `wizardBack([toReset])`
Navigate to the previous step. The optional parameter `toReset` (Array) contains the names of keys of the model to reset to their inital state. This may be necessary if the user navigates back multiple steps.

#### `wizardNext()`
Go to the next step without validation

#### `wizardGoTo(step)`
Go to any step defined in the template

#### `wizardReset()`
Completely reset the wizard and return to the inital step


### Example step
A minimal view file might look like this:

    <!-- step2.html -->
    <form name="forms.wizard" ng-submit="wizardSubmit()" novalidate>
    
      <label>A text field</label>
      <input type="text" name="text" ng-model="model.text" />
    
      <button type="button" ng-click="wizardBack()">Back</button>
      <button type="submit">Continue</button>
    
    </form>



