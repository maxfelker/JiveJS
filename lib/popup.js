/*
 * Popup
 * Simple popup constructor 
 * 
*/
var Popup = Class.create({
	
	// initialize class with config	
	initialize: function(config) {
		
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		
		
		// extend config object
		var config = $.extend({
			container: "popup-"+$j.popup_index++,
			title: "",
			html: false,
			width: $j.viewport.x/2,
			height: $j.viewport.y/2,
			top: ($j.viewport.y-this.height)/2,
			left: ($j.viewport.x-this.width)/2,
			offset: {top:50,left:50},
			confirm_close: false,
			drag: false,
			minimize: false
		},config);   
		
		this.container_id = config.container;
			
		// container element
		this.container = $('<div id="'+this.container_id+'" class="popup"/>').append(
			$('<div class="popup-toolbar"/>').append(
				$('<div class="popup-title"/>').html(config.title),
				$('<div class="popup-close"/>').text('x').click(function(){ $this.close(); })
			)
		);
		
		// if html is passed append it to popup
		if(config.html) {
			this.set_contents(config.html);
		}
		
		// width / height
		this.width = config.width;
		this.height = config.height;
        this.static_dimensions = config.width && config.height ? true : false;
		
		// position
		this.position = {
			top: config.top,
			left: config.left,
	        top_static: config.top ? true : false,
	        left_static: config.left ? true : false
        };
        
        // offset
        this.offset = config.offset;
     
		// apply css
		this.container.css({
			width: $this.width,
			height: $this.height,
			top: $this.position.top,
			left: $this.position.left
		});   
		
		// popup options
        this.confirm_close = config.confirm_close;
        this.drag = config.drag;
        this.minimize = config.minimize;
		
		// register with jive
		$j.popups[this.container_id] = this;
		
		// append to body
		$(document.body).append(this.container);
		
		// on window resize, update this popup
		$(window).resize(function() {
			$this.update();
		});
		
		// update popup
		this.update();
		
	},
	
	// updates size, position and applies css to the popup
	update: function() {
		
		var $this = this;
		
		// if popup is not a static size, resize it
		if(!this.static_dimensions) {
			this.resize();
		}
		
		// reposition
		this.reposition();
		
		// apply css
		this.container.css({
			width: $this.width,
			height: $this.height,
			top: $this.position.top,
			left: $this.position.left
		});   
		
	},
	
	// generates coordinates to reposition the popup
	reposition: function() { 
        
        // if the top position is not static
        if(!this.position.top_static) {
        	
        	// set the top position
            this.position.top = ($j.viewport.y-this.height)/2;
            
            // if the top position is less than the top offset
            if(this.position.top<this.offset.top) {
            	
            	// set the top to top offset
           		this.position.top = this.offset.top;
           		
            }
            
        }
        
        // if the left position is not static
        if(!this.position.left_static) {
        	
        	// set the left position
            this.position.left = ($j.viewport.x-this.width)/2;
            
            // if the left position is less than the left offset
            if(this.position.left<this.offset.left) {
            	
            	// set the left to left offset
            	this.position.left = this.offset.left;
            	
            }
            
        }
		
	},
	
	// resize the popup
	resize: function() {
		
		// set width & height to 1/2 of the viewport size
		this.width = $j.viewport.x/2;
		this.height = $j.viewport.y/2;
               
   },
   
   
   // closes popup and removed from jive
   close: function() {
            
        // if we need to confirm the close        
        if(this.confirm_close) {
  
  			// prompt them
	        if(confirm("Are you sure you would like to close this window?")) {
				
				// delete the dom element and remove from jive
	        	this.container.remove();
	        	delete $j.popups[this.container_id];
	                
	        } 
        
		} else {
		
			// delete the dom element and remove from jive
			this.container.remove();
			delete $j.popups[this.container_id];
		        
        }
    
    },
    
	set_title: function(title) {
		
		this.container.find(".popup-title").html(title);
		
	},
	
	set_contents: function(html) {
		
		this.container.html(html);
	
	}
    
	
});