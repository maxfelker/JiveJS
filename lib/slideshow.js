/**
 * JiveJS
 * Slideshow component
 * @author Max Felker (http://maxfelker.com) (@maxfelker)
 */

var Slideshow = Class.create({

	initialize: function(componentID) {
	
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;

		 // assign to jive slideshow collector
		$j.slideshows[componentID] = this;

		// config DOM elements
		this.container = $("#"+componentID);
		this.slides = this.container.find(".slide");
		
		// pull configuration off of data atttribute
		var config = this.container.data();

		// slideshow configs
        this.slide_duration = ( config.duration ? config.duration :  5000 );
        this.autostart = ( config.autostart ? config.autostart : false );
        this.loop = ( config.loop ? config.loop :  true );
        this.reverse = ( config.reverse ? config.reverse : false);
        this.transition_interval = ( config.transition_interval ? config.transition_interval : 200);

		//set the current slide
		this.current_index = ( this.reverse ?  this.slides.length-1 : 0 );
		this.playing = false;
		this.completed = false;

		// hide slides
		this.slides.hide();

		// show first slide
		this.show_slide(true);

		// does this slide show have autostart
		if(this.autostart) {
			this.start();
		}
	},

	// sets the current slide and shows it
	show_slide: function() {

		// if we're not looping and the current slide index is greater or equal to the count of slides
		if(!this.loop && this.current_index >= this.slides.length) {

			// set index as last one
			this.current_index = this.slides.length-1;

			// stop the cron job
			this.stop();

			// peace!
			return false;

		// the current slide index is greater or equal to the count of slides
		} else if(this.current_index>=this.slides.length) {

			this.current_index = 0;

		}

		// if we're not looping and the current slide index less than 0 (we're playing in reverse)
		if(!this.loop && this.current_index<0) {

			// set it back to first slide
			this.current_index = 0;

			// stop the cron job
			this.stop();

			// peace
			return false;

		// if the current index is less than 0
		} else if(this.current_index<0) {

			// set it to last slide
			this.current_index = this.slides.length-1;

		} // end if

		// fade all slides and remove current class
		this.slides.fadeOut(this.transition_interval).removeClass('current');

		// set current slide, add current class, fade it in
		this.current_slide = $(this.slides[this.current_index]).addClass('current').fadeIn(this.transition_interval);

	},

	// start the show!
	start: function() {

		var $this = this;

		var id = $(this.container).attr('id');

		if(!this.playing) {

			if(this.reverse) {

				this.playing = true;

				$j.cron(function() {
				    $this.previous_slide();
				},this.slide_duration,id);


			} else {

				this.playing = true;

				$j.cron(function() {
				    $this.next_slide();
				},this.slide_duration,id);

			}

			this.completed = false;

		} else {

			return false;

		}

	},

	stop: function() {

		var id = $(this.container).attr('id');

		$j.crontab[id].stop();

		this.completed = true;
		this.playing = false;

	},

	restart: function() {

		if(!this.playing) {

			this.reset();

			this.start();

		} else {

			return false;

		}
	},

	reset: function() {
		this.stop();

		//set the slideshow_position
		if(this.reverse) {
			this.current_index = this.slides.length-1;
		} else {
			this.current_index = 0;
		}

		this.show_slide();
	},

	next_slide: function() {

		this.current_index++;

		this.show_slide();

	},

	previous_slide: function() {

		this.current_index--;

		this.show_slide();

	}
}); // end Slideshow class

// when DOM is ready,
$(document).ready(function() {

	// find all the slideshows
	$('.slideshow').each(function() {

		// does it have an id?
		if(this.id) {
			
			// create slideshow UI component
			new Slideshow(this.id);
		
		// error out	
		} else {
			
			console.error("Jive Slideshow UI [FAIL] > ID attribute required to make Slideshow UI but no found on element below:");
			console.log(this);
			
		}

	});

});
