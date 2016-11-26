**angular-simplewizard** is a simple wizard directive for angular.js (who would have thought?)

It's easy to use and fully customize-able and allows you to setup complex multi-step forms with diverging/converging branches.

The HTML for each step must be in an own file which is ng-included by the directive. Each step is a regular angular form, but you may do validation with data from all steps.

### Usage ###
Include the library in your HTML file

    <script src="angular-simplewizard.js"></script>

Add `simpleWizard` to your app's dependencies:

    var app = angular.module('App', ['simpleWizard']);

Use the `wizard` directive:

    <wizard model="orderForm" step="product" template="wizardTmpl"></wizard>


The `<wizard>` directive has the following attributes:

 - `model`
The variable to be populated with the results of the wizard

 - `step` (optional)
The initial step from which the wizard begins. If not specified, the first element in the `template` object is the initial step.

 - `template`
 Template object containing the steps of the wizard and their logic.
 A step is identified by its object key and has the following parameters:


   - `view`: [string] URL to the template (required)
   - `prev` and `next`: [string or function] The name of the previous and next step, or a function returning it.
   - `validate`: [function] Custom validation function

A template may look something like this: (See example for more details)



    $scope.wizardTmpl = {
      product: {
    	...
      },
      account: {
        view: 'views/account.html',
        prev: 'product',
        next: function(model) {
	      // 'model' contains data from all steps
	      if(model.type === 'ebook') {
	        return 'payment';
	      } else {
			return 'shipping';
		  }
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

In your view files, the follwing functions are available:
`wizardSubmit()`: Submit the current step. The wizard will perform validation and navigate to the next step if successful. Ideally, this function is given as the `ng-submit`parameter of the form.

`wizardBack([toReset])`: Navigate to the previous step. The optional parameter `toReset` (Array) contains the names of keys of the model to reset to their inital state. This may be necessary if the user navigates back multiple steps.

`wizardNext()`: Go to the next step without validation

`wizardGoTo(step)`: Go to any step defined in the template

`wizardReset()`: Completely reset the wizard and return to the inital step

### Demo ###
To do
