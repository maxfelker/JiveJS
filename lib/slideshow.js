/*
 * Slideshow v1.0 | Max Felker
 * Builds and maintains tabbed UI components 
*/

// START Class
var Slideshow = Class.create({

	initialize: function(config) {
	
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		
		 // assign to jive slideshow collector
		$j.slideshows[config.container] = this;
		
		// config DOM elements
		this.container = $("#"+config.container);
		this.slides = this.container.find(".slide");

		// slideshow configs
        this.slide_duration = ( config.duration ? config.duration :  5000 );
        this.autostart = ( config.autostart ? config.autostart : false );
        this.loop = ( config.loop ? config.loop :  true );
        this.reverse = ( config.reverse ? config.reverse : false);
        		
		//set the current slide
		this.current_index = ( this.reverse ?  this.slides.length-1 : 0 );
		this.playing = false;
		this.completed = false;
		
		// hide slides
		this.slides.hide();
		
		// show first slide
		this.show_slide();
		
		
	},
	
	show_slide: function() {
	
		if(!this.loop && this.current_index >= this.slides.length) {
			
			this.current_index = this.slides.length-1;	
	
			this.stop();
				
			return false;
			
		} else if(this.current_index>=this.slides.length) {	
		
			this.current_index = 0;	
			
		}
			
		if(!this.loop && this.current_index<0) {
		
			this.current_index = 0;	
	
			this.stop();
				
			return false;
			
		} else if(this.current_index<0) {
		
			this.current_index = this.slides.length-1;
			
		}
				
		this.current_slide = $(this.slides[this.current_index]);
		
		// add current slide class
		//this.slides[this.current_index].addClass('slide-current');

		//fade out the other slides
		//fix me...
		
		this.slides.each(function() {
			
			if(!$(this).hasClass('slide-current')) {
				$(this).hide();
			}
			
		});

		this.current_slide.show();


		//this.slides[this.current_index].show();
		
		//show the current slide
		//this.current_slide = this.slides[this.current_index];
		//Effect.Appear(this.current_slide, { duration: 0.5 }); 	

		
	},
	
	start: function() {
		
		var $this = this;
	
		if(!this.playing) {
		
			if(this.reverse) {
			
				this.playing = true;
				
				$j.cron(function() {
				    $this.previous_slide();
				},this.slide_duration,this.container.id);
			
			
			} else {
			
				this.playing = true;
			
				$j.cron(function() {
				    $this.next_slide();
				},this.slide_duration,this.container.id);
				
			}
			
			this.completed = false;
			
			//this.slides.hide();
			
		} else {
		
			return false;
		
		}
  
	},
	
	stop: function() {
		
		$j.crontab[this.container.id].stop();
		
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
});
// END CLass

$(document).ready(function() {
	
	// find all the tab containers 
	$('.jive-slideshow').each(function() {
		
		// create tabs ui components
		new Slideshow({
		    container:this.id
		});
		
	});	
	
});
