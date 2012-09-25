/*
 * Tabs v1.0 | Max Felker
 * Builds and maintains tabbed UI components 
*/

var Tabs = Class.create({
	
	// initialize class with config	
	initialize: function(config) {
		
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		
		// set container id
		this.container_id = config.container;
				
		// config elements
		this.update_dom(this.container_id,config.index);

		// assign to jive tabs collector
		$j.tabs[config.container] = this;
		
	},
	
	// updates dom containers
	update_dom: function(container_id,index) {
		
		var $this = this;
		
		this.container = $("#"+container_id);
		
		// get tabs and panels
		this.tabs = this.container.find(".tab:not(#"+container_id+" .jive-tabs .tab)");
		this.panels = this.container.find(".panel:not(#"+container_id+" .jive-tabs .panel)");		
	
		// current index of tab, default to 0 if not set in init config
		this.current_index = (index ? index : 0);

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
		
		// hide panels
		this.panels.hide();
		
		// show first tab
		this.show_tab(this.current_index);
		
	},
	
	// displays a tab
	show_tab: function(index) {
		
		// set current index
		this.current_index = index;
		
		// hide all panels
		this.panels.hide().removeClass('current');
		
		// remove the current tabs
		this.tabs.removeClass('current');
			
		// Find tab and add current class
		this.container.find("#"+this.tabs[index].id).addClass('current');
		
		// build panel selector
		var panel_selector = "#"+this.tabs[index].id.replace('tab-','panel-');
		
		// find the panel associated with current tab and show it
		this.container.find(panel_selector).show().addClass('current');
		
	},
	
	// move ahead one tab
	next_tab: function() {
		
        this.show_tab((this.current_index+1 + this.tabs.length) % this.tabs.length);
		
	},
	
	// move back one tab
	previous_tab: function() {
		
		this.show_tab((this.current_index+1 + this.tabs.length) % this.tabs.length);
		
	},
	
	add_tab: function(config) {
		
		this.container.append(config.tab,config.panel);
		this.update_dom(this.container_id);
		
	}
	
});

// on dom ready
$(document).ready(function() {
	
	// find all the tab containers 
	$('.jive-tabs').each(function() {
		
		// create tabs ui components
		new Tabs({
		    container:this.id
		});
		
	});	
	
	
});