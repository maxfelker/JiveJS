/*
 * Tabs v1.0 | Max Felker
 * Builds and maintains tabbed UI components 
*/

var Tabs = Class.create({
	
	// initialize class with config	
	initialize: function(config) {
		
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		
		// config elements
		this.container = $("#"+config.container);
		this.tabs = this.container.find(".tab");
		this.panels = this.container.find('.panel');
		
		// current index of tab, default to 0 if not set in init config
		this.current_index = (config.index ? config.index : 0);
		
		// hide panels
		this.panels.hide();
		
		// loop through tabs
		this.tabs.each(function(index) {
			
			// when they're clicked
			$(this).click(function() {
				
				// if the tab isn't already active
				if($this.current_index!=index) {
					$this.show_tab(index);
				}
				
			});
			
		});
		
		// show first tab
		this.show_tab(this.current_index);
		
		// assign to jive tabs collector
		$j.tabs[config.container] = this;
		
	},
	
	// displays a tab
	show_tab: function(index) {
		
		// set current index
		this.current_index = index;
		
		// hide all panels
		this.panels.hide();
		
		// find the panel associated with current tab and show it
		this.container.find("#"+this.tabs[index].id.replace('tab-','panel-')).show();
		
	},
	
	// move ahead one tab
	next_tab: function() {
		
        this.show_tab((this.current_index+1 + this.tabs.length) % this.tabs.length);
		
	},
	
	// move back one tab
	previous_tab: function() {
		
		this.show_tab((this.current_index+1 + this.tabs.length) % this.tabs.length);
		
	}
	
});

// on dom ready
$(document).ready(function() {
	
	// find all the tab containers 
	$('.tabs-container').each(function() {
		
		// create tabs ui components
		new Tabs({
		    container:this.id
		});
		
	});	
	
});