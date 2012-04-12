/*
 * Slideshow v1.0 | Max Felker
 * Builds and maintains tabbed UI components 
*/

// START Class
var Slideshow = Class.create({

	initialize: function(config) {
	
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		 // assign to jive slides collector
		$j.slides[config.container] = this;
		
		// config DOM elements
		this.container = $("#"+config.container);
		this.slides = this.container.find(".slide");

		// slideshow configs
        this.slide_duration = ( config.duration ? config.duration :  5.0 );
        this.autostart = ( config.autostart ? config.autostart : false );
        this.loop = ( config.loop ? config.loop :  false );
        this.reverse = ( config.reverse ? config.reverse : false);
        		
		//set the current slide
		this.slideshow_counter = ( this.reverse ?  this.slides.length-1 : this.slideshow_counter = 0 );
		this.playing = false;
		this.completed = false;
		
		this.slides.hide();
		
		//show and store the current slide
		this.slides[this.slideshow_counter].show();
		
		/*if(this.autostart) {
			Event.on(window,'load',function() {
				this.start();
				this.show_slide();
			}.bind(this));
		}*/
		
	},
	
	show_slide: function() {
	
		if(!this.loop && this.slideshow_counter >= this.slides.length) {
			
			this.slideshow_counter = this.slides.length-1;	
	
			this.stop();
				
			return false;
			
		} else if(this.slideshow_counter>=this.slides.length) {	
		
			this.slideshow_counter = 0;	
			
		}
			
		if(!this.loop && this.slideshow_counter<0) {
		
			this.slideshow_counter = 0;	
	
			this.stop();
				
			return false;
			
		} else if(this.slideshow_counter<0) {
		
			this.slideshow_counter = this.slides.length-1;
			
		}
		
		
		this.current_slide = this.slides[this.slideshow_counter];

		//fade out the other slides
		//fix me...
		this.other_slides = this.current_slide.siblings();
		this.other_slides.each(function(slide) {
			if(slide.hasClassName('slide')) {
				Effect.Fade(slide, { duration: 0.5 }); 
			} 
		});
		
		//show the current slide
		this.current_slide = this.slides[this.slideshow_counter];
		Effect.Appear(this.current_slide, { duration: 0.5 }); 	

		
	},
	
	start: function() {
	
		if(!this.playing) {
		
			if(this.reverse) {
			
				this.playing = true;
			
				this.executer = new PeriodicalExecuter(function() {
					this.previous_slide();
				}.bind(this),this.slide_duration);
			
			} else {
			
				this.playing = true;
			
				this.executer = new PeriodicalExecuter(function() {
					this.next_slide();
				}.bind(this),this.slide_duration);
				
			}
			
			this.completed = false;
			
			this.slides.invoke('hide');
			
		} else {
		
			return false;
		
		}
  
	},
	
	stop: function() {
		if(this.executer) {
			this.executer.stop();
		}
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
			this.slideshow_counter = this.slides.length-1;
		} else {
			this.slideshow_counter = 0;
		}
		
		this.show_slide();
	},
	
	next_slide: function() {
		
		this.slideshow_counter++;
		
		this.show_slide();

	},
	
	previous_slide: function() {
		
		this.slideshow_counter--;
		
		this.show_slide();
		
	}
});
// END CLass
