/**
 * JiveJS
 * Modal component
 * @author Max Felker (http://maxfelker.com) (@maxfelker)
 */

$j.modal = {

	display: function(config) {

		var $this = this;

		// extend config object
		var config = $.extend({
			container:"modal"
		},config);

		// create popup
		new Popup(config);

		// set popup for easy use
		this.popup = $j.popups.modal;
		
		if(!this.popup.fullscreen) {

			// display overlay
			$j.canopy.display();
	
			// hide canopy
			$('#canopy-close').hide();

			// on popup close, close canopy
			$("#modal").find(".popup-close").click(function($this) {
				$j.canopy.close();
			});
		
		}

		

	},

	// close modal
	close: function () {
		
		if(!this.popup.fullscreen) {
			$j.canopy.close();
		}
		
		this.popup.close();
		
	}
	
};