/**
 * JiveJS
 * the "less is more" jQuery UI library
 * @author Max Felker (http://maxfelker.com) (@maxfelker)
 */

window.$j = {

	// regexp object
	regex: {
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
		this.tabbed = {};

		// forms collector
		this.forms = {};

		// slideshows collector
		this.slideshows = {};

		// popups collector
		this.popups = {};
		this.popup_index = 0;

		// crontab collector
		this.crontab = {};
		this.crontab_index = 0;

		// gets the time
		this.cron(this.get_time, 1000, "jiveTime");

		// initializes dom components when ready
		$(document).ready(function() {
			$j.init_dom();
		});

	},

	// intializes dom elements and functions
	init_dom: function() {

		// when mouse moves, store its position
		$(document).mousemove(this.get_mouse_position);

		// when window is loaded or resized, store viewport dimensions
		this.get_viewport_dimensions();
		$(window).resize(this.get_viewport_dimensions);

	},

	// gets position of mouse
	get_mouse_position: function(e) {

		// stores mouse x and y positions
		$j.mouse = {
			x: e.pageX,
			y: e.pageY
		};

	},

	// gets viewport dimensions
	get_viewport_dimensions: function() {

		// stores viewport width and height
		$j.viewport = {
			x: $(window).width(),
			y: $(window).height()
		};

	},

	// wrapper function for Messenger.createMessage()
	msg: function(config) {
		this.Messenger.createMessage(config);
	},

	// adds an entry into crontab
	cron: function (fn,seconds,id) {

		// sets cron_id
		var cron_id = id ? id : this.crontab_index++;

		// entry
    	var entry = {
    		
    		// timestamp
    	 	created: new Date(),

    	 	// stops entry
      		stop: function () {
      			clearTimeout(this.timer);
      		},

      		// entry timer
      		timer: setInterval(function () {
      			fn(entry);
      		}, seconds)
    	};

    	// sets entry, and away we go!
    	this.crontab[cron_id] = entry;

    },

    // generates the time propetry
    get_time: function() {

		// sets date
		var date = new Date();

		// stores time
    	$j.time = {
			hours: date.getHours(),
			mins: date.getMinutes(),
			secs: date.getSeconds(),
			time_of_day: "am"
		};

		($j.time.mins<10) ? $j.time.mins = "0" + $j.time.mins : $j.time.mins = $j.time.mins;
        ($j.time.secs<10) ? $j.time.secs ="0" + $j.time.secs :  $j.time.secs = $j.time.secs;

        if($j.time.hours > 12) {
        	$j.time.hours = $j.time.hours - 12;
        	$j.time.time_of_day = "pm";
        }

    }

};

// initalize jive
$j.init();