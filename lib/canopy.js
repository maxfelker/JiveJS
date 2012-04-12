/*
 *  Canopy v 0.1 | Overlay 
*/

window.$j.canopy = {
	
	create: function() {
				
		$j.canopy.container = $('<div id="canopy"/>').append(
			$('<div id="canopy-close-btn"/>').text('Close')
		);
		
		$j.canopy.overlay = $('<div id="canopy-overlay"/>');
		
		$('body').append($j.canopy.overlay);
		$('body').append($j.canopy.container);
		
		$j.canopy.container.find('#canopy-close-btn').click($j.canopy.close);

	},
	
	display: function() {
		
		if(!$j.canopy.container) {
			!$j.canopy.create();
		}
		
		$j.canopy.overlay.show();
		$j.canopy.container.show();
		
	},	
	
	close: function() {
		
		$j.canopy.overlay.hide();
		$j.canopy.container.hide();
		
	}
	
};