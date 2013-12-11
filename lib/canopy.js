/*
 * JiveJS - Canopy Overlay
 * 
 * Simple overlay 
 *  
*/
window.$j.canopy = {
	
	// create canopy elements
	create: function() {
		
		// set overlay element
		$j.canopy.overlay = $('<div id="canopy"/>').append(
			$('<div id="canopy-close"/>').text('x').click($j.canopy.close)
		);;
		
		// append overlay and container to document.body
		$(document.body).append($j.canopy.overlay);
	},

	// display canopy
	display: function() {
		
		// if canopy container doesn't exist, create one
		if( $("#canopy").length===0 ) {
			$j.canopy.create();
		}

		// show  overlay 
		$j.canopy.overlay.show();
		
	},

	// close canopy
	close: function() {
		
		// hide overlay
		$j.canopy.overlay.hide();
		
	}
	
};