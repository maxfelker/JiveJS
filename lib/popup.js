/*
 * Popup | Max Felker
 * Simple popup constructor 
*/

var Popup = Class.create({
	
	// initialize class with config	
	initialize: function(config) {
		
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		
		var container_id = config.container ? config.container : "popup-"+$j.popup_index++;   
			
		// container element
		this.container = $('<div id="'+container_id+'" class="popup"/>').append(
			$('<div class="popup-toolbar"/>').append(
				$('<div class="popup-title"/>').text('Title'),
				$('<div class="popup-close"/>').text('x')
			)
		);
		
		// width / height
		this.width = config.width ? config.width : $j.viewport.x/2;
		this.height = config.height ? config.height : $j.viewport.y/2;
        this.static_dimensions = config.width && config.height ? true : false;
		
		// position
		this.position = {
	        top: config.top ? config.top : ($j.viewport.y-this.height)/2,
	        top_static: config.top ? true : false,
	        left: config.left ? config.left : ($j.viewport.x-this.width)/2, 
	        left_static: config.left ? true : false
        };
        
        // offset
        this.offset = config.offset ? config.offset : {top:50,left:50};
     
		// apply css
		this.container.css({
			width: $this.width,
			height: $this.height,
			top: $this.position.top,
			left: $this.position.left
		});   
		
		// popup options
        this.confirm_close = config.confirm_close ? config.confirm_close : false;
        this.drag = config.drag ? config.drag : false;
        this.minimize = config.minimize ? config.minimize : false;
		
		// register with jive
		$j.popups[container_id] = this;
		
		// append to body
		$(document.body).append(this.container);
		
		$(window).resize(function() {
			$this.update();
		});
		
		// update popup
		this.update();
		
	},
	
	update: function() {
		
		var $this = this;
		
		//console.log('update');
		
		if(!this.static_dimensions) {
			this.resize();
		}
		
		this.reposition();
		
		// apply css
		this.container.css({
			width: $this.width,
			height: $this.height,
			top: $this.position.top,
			left: $this.position.left
		});   
		
	},
	
	reposition: function() { 
        
        if(!this.position.top_static) {
            this.position.top = ($j.viewport.y-this.height)/2;
            if(this.position.top<this.offset.top) {
                    this.position.top = this.offset.top;
            }
        }
        
        if(!this.position.left_static) {
            this.position.left = ($j.viewport.x-this.width)/2;
            if(this.position.left<this.offset.left) {
                    this.position.left = this.offset.left;
            }
        }
		
	},
	
	resize: function() {
		
		//console.log('resize');
        
		this.width = $j.viewport.x/2;
		this.height = $j.viewport.y/2;
               
    }
	
});