/*
 * Canopy
 * Overlay component
 * 
*/

// assign to jive
window.$j.canopy = {
	
	// generate the dom elements
	create: function() {
			
		// container element		
		$j.canopy.container = $('<div id="canopy"/>').append(
			$('<div id="canopy-close-btn"/>').text('Close').click($j.canopy.close)
		);
		
		// overlay component 
		$j.canopy.overlay = $('<div id="canopy-overlay"/>');
		
		// append overlay and canopy
		$(document.body).append($j.canopy.overlay).append($j.canopy.container);

	},
	
	// show the overlay
	display: function() {
		
		// if the container doesn't exist, create it
		if(!$j.canopy.container) {
			$j.canopy.create();
		}
		
		// show overlay and container
		$j.canopy.overlay.show();
		$j.canopy.container.show();
		
	},	
	
	// close the overlay
	close: function() {

		// hide the overlay and container		
		$j.canopy.overlay.hide();
		$j.canopy.container.hide();
		
	}
	
};