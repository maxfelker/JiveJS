/**
 * JiveJS
 * Canopy overlay component
 * @author Max Felker (http://maxfelker.com) (@maxfelker)
 */

window.$j.canopy = {
	// create canopy elements
	create: function() {
		// set overlay element
		$j.canopy.overlay = $('<div id="canopy-overlay"/>');

		// set container element
		$j.canopy.container = $('<div id="canopy"/>').append(
			$('<div id="canopy-close-btn"/>').text('Close').click($j.canopy.close)
		);

		// append overlay and container to document.body
		$(document.body).append($j.canopy.overlay).append($j.canopy.container);
	},

	// display canopy
	display: function() {
		// if canopy container doesn't exist, create one
		if(!$j.canopy.container) {
			$j.canopy.create();
		}

		// show canopy overlay and container
		$j.canopy.overlay.show();
		$j.canopy.container.show();
	},

	// close canopy
	close: function() {
		// hide canopy overlay and container
		$j.canopy.overlay.hide();
		$j.canopy.container.hide();
	}
};