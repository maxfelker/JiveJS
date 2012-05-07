/*
	 __  __                  
	/\_\/\_\  __  __    __   
	\/\ \/\ \/\ \/\ \ /'__`\ 
	 \ \ \ \ \ \ \_/ |\  __/ 
	 _\ \ \ \_\ \___/\ \____\
	/\ \_\ \/_/\/__/  \/____/
	\ \____/                 
	 \/___/              
    
    The less is more UI library
    By Max Felker
	 
*/   

window.$j = {

	// regexp object
	regex: {
		empty: /^.*$/,
		bit: /^(0|1)$/, 
		num: /^-?([0-9]*)$/,
		alpha: /^[a-zA-z\s]+$/,
		alphanum:  /^[a-zA-Z0-9]?[\s||\'||\"||\.||\?||\!||\-||a-zA-Z0-9]+$/,
		email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		phone: /^([0-9]{3}( |-|.)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-|.)?([0-9]{3}( |-|.)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
		cc: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
		zip: /^(([0-9]{5})|([0-9]{5}[-][0-9]{4}))$/,
		decimal: /^\d+\.\d{0,4}$/,
		price: /^\$?\s?[0-9\,]+(\.\d{0,4})?$/
	},
	
	// initialization method
	init: function(config) {
		
		// tabs collector
		this.tabs = {};
		
		// forms collector
		this.forms = {};
		
		// messages collector
		this.msgs = {};
		this.msg_index = 0;
		
		// forms collector
		this.slideshows = {};
		
		//dropdowns
		this.dropdowns = {};
		
		//popups
		this.popups = {};
		this.popup_index = 0;
		
		// crontab
		this.crontab = {};
		this.crontab_index = 0;
		
		// init dom components when ready
		$(document).ready(function() {
			$j.init_dom();
		});
		
	},
	
	// intializes dom elements and functions
	init_dom:function() {
		
		// when the mouse moves, store it's position
		$(document).mousemove(this.get_mouse_position);
		
		// when window is load or resized, store viewport dimensions
		this.get_viewport_dimensions();
		$(window).resize(this.get_viewport_dimensions);	
		
	},
	
	// stores mouse x / y position
	get_mouse_position: function(e) {
		
		$j.mouse = {
			x: e.pageX,
			y: e.pageY
		};
				
	},
	
	// store viewport dimensions
	get_viewport_dimensions: function() {
		
		$j.viewport = {
			x: $(window).width(),
			y: $(window).height()
		};
		
	},
	
	// wrapper function for messenger.create()
	msg:function(config) {
		
		this.messenger.create(config);
		
	},
	
	// hello word example
	hello_world: function() {
		
		this.msg({
			type:'success',
			content:"<h2>Hello World!</h2><p>If you're seeing this message, it means jive is ready to use!</p>",
			sticky:1
		});
		
	},
	
	cron: function (fn,seconds,id) {
		
		if(id) {
			var cron_id = id;
		} else {
			var cron_id = this.crontab_index;
			this.crontab_index++;
		}

		// entry
    	var entry = {
    		
    	 	created: new Date(),
    	 	
      		stop: function () {    
      			clearTimeout(this.timer); 
      		},
      		
      		timer: setInterval(function () { 
      			fn(entry);    
      		}, seconds)
      		
    	};
    	
    	this.crontab[cron_id] = entry;
    
    }
	
};

// initalize jive
$j.init();