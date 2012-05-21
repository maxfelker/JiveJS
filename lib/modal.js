$j.modal = {
	
	display: function(config) {
		
		var $this = this;
		
		// extend config object
		var config = $.extend({
			container:"modal",
		},config);
		
		// create popup
		new Popup(config);
		
		// set popup for easy use
		this.popup = $j.popups.modal;
			
		// display overlay
		$j.canopy.display();
		
		// hide canopy
		$('#canopy-close-btn').hide();
		
		// twitter bootstrap classes
		$("#modal").find(".popup-close").addClass('btn btn-large');
		
		// on popup close, close canopy
		$("#modal").find(".popup-close").click(function($this) {
			$j.canopy.close();
		});
		
	},
	
	// close modal
	close: function () {
		$j.canopy.close();
		this.popup.close();
	}
	
};