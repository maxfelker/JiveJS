/**
 * JiveJS
 * Dropdown menu component
 * @author Max Felker (http://maxfelker.com) (@maxfelker)
 */

var Dropdown = Class.create({

	// initialize dropdown elements and configuration
	initialize: function(componentID) {

		// class reference, for use in .each() loops to resolve scope conflict
		var $this = this;

		// set container element
		this.container = $("#"+componentID);
		
		// set menu element and hide it
		this.menu = $(this.container.find('> .dropdown-menu')[0]);
		
		// pull configuration off of data atttribute
		var config = this.container.data();

		// time
		this.timer = (config.timer ? config.timer : 200)

		// menu state
		this.open = false
		this.menu.hide();

		// display menu on mouse enter
		this.container.mouseenter(function() {
			$this.display()
		})

		// close menu on mouse leave
		this.container.mouseleave(function() {
			$this.close()
		})

		// register with JiveJS
		$j.dropdowns[componentID] = this

	},

	// display the menu
	display: function() {

		// class ref
		var $this = this

		// clear menu timeout
		clearTimeout(this.timeout)

		// if menu isn't open,
        if(!this.open) {

			// set a time out
            this.timeout = setTimeout(function() {

				// show the menu and set open = true
                $this.open = true
                $this.menu.slideDown($this.timer)

            },this.timer)

        }

	},

	// closes the menu
	close: function() {

		// class ref
		var $this = this

		// clear menu timeout
		clearTimeout(this.timeout)

		// if menu is open
        if(this.open) {

			// set a time out
            this.timeout = setTimeout(function() {

				// hide the menu and set open = false
                $this.open = false
                $this.menu.slideUp($this.timer)

            },this.timer)

        }

	}

}) // end Dropdown class

// when DOM is ready,
$(document).ready(function() {

	// find all the tab containers
	$('.dropdown').each(function() {

		// does it have an id?
		if(this.id) {
			
			// create dropdown component
			new Dropdown(this.id);
			
		// error out
		} else {
			
			console.error("Jive Dropdown UI [FAIL] > ID attribute required to make Dropdown UI but no found on element below:");
			console.log(this);
			
		}

	});

})