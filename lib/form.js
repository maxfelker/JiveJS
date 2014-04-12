/**
 * JiveForm 
 * 
 * Form UI Component. Controlls submission state and field validation. 
 * 
 * Read more https://github.com/maxatbrs/JiveJS/wiki/JiveForm
 * 
 * @author Max Felker (https://github.com/maxatbrs)
 * 
*/

var JiveForm = Class.create({

	// Initialize the Form Object
	initialize: function(componentID) {

		// scope reference to FormObject
		var $this = this;

		// Form container element
		this.container = $("#"+componentID);
		
		// Get the Form Name of the form
		this.formName = this.container.attr('name');

		// Fields object, contains references to all fields inside the container
		this.fields = {
			text: this.container.find('input[type=text]'),
			textareas: this.container.find('textarea'),
			radios: this.container.find('input[type=radio]'),
			checkboxes: this.container.find('input[type=checkbox]'),
			selects: this.container.find('select'),
			submits: this.container.find('input[type=submit]'),
			buttons: this.container.find('button')
		};

		// Flag for click tracking
		//this.clicked = null;

		// Prevent buttons from submitting form, call $this.submit instead
		this.fields.buttons.click(function(e) {
			e.preventDefault();
		//	$this.clicked = this;
			$this.submit(e);
		});

		// when this form submits, prevent it and validate first
		this.container.submit(function(e) {
			$this.submit(e);
		});

		// add form to jive
		$j.forms[componentID] = this;

	}, // end init


	// loops through each input in this.fields and validates input value
	validate: function() {
		
		// scope reference to FormObject
		var $this = this;

		// Loop through each fieldType (text,textarea,etc) in this.fields
		for (var fieldType in $this.fields) {

			// if the fieldType is not buttons
			if(fieldType!="submits" && fieldType!="buttons") {

				// loop through each field in that fieldType list
				$this.fields[fieldType].each(function() {

					// disable field so we can't edit form mid-valiation
					$(this).attr('disabled','disabled');
					
					// get the field's data-validate attribute, going to used for field validation
					var regexPattnern = $(this).data("validate");
					
					// does jive have that regex pattern
					if($j.regex[regexPattnern]) {

						// If the field value tests successful against regex 
						if($j.regex[regexPattnern].test(this.value)) {
							
							// add valid class to field, remove invalid
							$(this).addClass('valid').removeClass('invalid');
							
						// failed to validate the value
						} else {
							
							// add invalid class to field, remove valid
							$(this).addClass('invalid').removeClass('valid');
		
						}

					}

					// enable the field for edditing again
					$(this).removeAttr('disabled');

				}); // end each on field type

			} // if not submit buttons

		} // loop through field types


		// find all invalid fields inside the form
		this.invalidFields = this.container.find('.invalid');

		// if invalid field count is 0, form is valid
		if(this.invalidFields.length==0) {
			return true;
		} else {
			return false;
		}

	}, // end validate

	// the submit override
	submit: function(event) {

		// prevent submission
		event.preventDefault();

		// validate the submission
		if(this.validate()) {
			
			// setup data property
			this.data = {};
			
			// get the fields in an array
			var fields = this.container.serializeArray();
										
			// loop through the array											
			for(fieldID in fields) {

				// set data properties
				var field = fields[fieldID];
				this.data[field.name] = field.value;
				
			}
			
			// if a successCallBack function is available
			if(this.successCallBack) {

				// call successCallBack function
				this.successCallBack(this);

			// default to returning true
			} else {

				return true;

			}

		// form did not validate
		} else {

			// if failureCallback function exists
			if(this.failureCallback) {

				// call failureCallback function
				this.failureCallback(this);

			// else default to returning false
			} else {

				return false;

			}

		}

	}, // end submit

	// sets the successCallBack function
	success: function(customFunction) {

		this.successCallBack = customFunction

	},

	// sets the failureCallback function
	failure: function(customFunction) {

		this.failureCallback = customFunction;

	},

	// resets text and textarea fields values to empty
	reset: function() {

		// reset text fields values
		this.fields["text"].each(function() {
			$(this).attr('value','');
		});
		
		// reset textarea fields values
		this.fields["textarea"].each(function() {
			$(this).attr('value','');
		});

	}

}); // end JiveForm class

// when DOM is ready,
$(document).ready(function() {

	// find all the forms
	$('.jive-form').each(function() {

		// create form components
		new JiveForm(this.id);

	});

});