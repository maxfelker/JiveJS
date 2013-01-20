/**
 * JiveJS
 * Dropdown menu component
 * @author Max Felker (http://maxfelker.com) (@maxfelker)
 */

var Dropdown = Class.create({

	// initialize dropdown elements and configuration
	initialize: function(config) {

		// class reference, for use in .each() loops to resolve scope conflict
		var $this = this

		// set container element
		this.container = $("#"+config.container)

		// set menu element
		this.menu = this.container.find('> .dropdown-menu')

		// time
		this.timer = (config.timer ? config.timer : 200)

		// menu state
		this.open = false

		// display menu on mouse enter
		this.container.mouseenter(function() {
			$this.display()
		})

		// close menu on mouse leave
		this.container.mouseleave(function() {
			$this.close()
		})

		// register with JiveJS
		$j.dropdowns[config.container] = this

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

		// create dropdown component
		new Dropdown({
		    container: this.id
		})

	});

})