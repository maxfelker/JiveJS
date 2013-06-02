/**
 * JiveJS
 * Tab component
 * @author Max Felker (http://maxfelker.com) (@maxfelker)
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
		
		// look for #my_tab_name is url and show if it exists
		this.check_hash();

		// assign to jive tabbed collector
		$j.tabbed[config.container] = this;
				
		// if we support onpopstate 
		if(window.onpopstate) {
			window.onpopstate = function(event) { $this.check_hash(); }
		// or we are ie
		} else {
			window.onhashchange = function(event) { $this.check_hash(); }
		}

	},
	
	// look for #my_tab_name is url and show if it exists
	check_hash: function() {
		
		var $this = this;
		
		//look for # mark at end of url
		var urlHash =/#.+(?!\s)/g;
		
		// get the hash match
		var hashMatch = urlHash.exec(document.location);

		// did we get results
		if( $.isArray(hashMatch) ) {
			
			// get the tabID
			tabID = hashMatch[0].replace("#",'');
			
			// loop through tabbs
			this.tabs.each(function(index) {
			
				// if id matches up, show it
				if(this.id=="tab-"+tabID){
					$this.show_tab(index);
					return;
				}
				
			});
			
	   	}
		
	},

	// updates dom containers
	update_dom: function(container_id,index) {

		var $this = this;

		this.container = $("#"+container_id);

		// get tabs and panels
		this.tabs = this.container.find(".tab:not(#"+container_id+" .tabbed .tab)");
		this.panels = this.container.find(".panel:not(#"+container_id+" .tabbed .panel)");

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
	show_tab: function(tabID) {
		
		var $this = this;
		
		// hide all panels
		this.panels.hide().removeClass('current');
		
		// remove the current tabs
		this.tabs.removeClass('current')
		
		var intRegex = /^\d+$/;
		
		if(intRegex.test(tabID)) {
		  
		  	// set current index
			this.current_index = tabID;
			
		} else {
			
			this.tabs.each(function(index) {
				
				if(this.id=="tab-"+tabID){
					$this.current_index = index;
					return;
				}
				
			});
				
		}

		// build panel selector
		var panel_selector = "#"+this.tabs[this.current_index].id.replace('tab-','panel-');

		// Find tab and add current class
		this.container.find("#"+this.tabs[this.current_index].id)
			.addClass('current');

		// find the panel associated with current tab, show it, add current class
		this.container.find(panel_selector)
			.show()
			.addClass('current');

	},

	// move ahead one tab
	next_tab: function() {

        this.show_tab((this.current_index+1 + this.tabs.length) % this.tabs.length);

	},

	// move back one tab
	previous_tab: function() {

		this.show_tab((this.current_index-1 + this.tabs.length) % this.tabs.length);

	},

	add_tab: function(config) {

		this.container.append(config.tab,config.panel);
		this.update_dom(this.container_id);

	}

}); // end Tabs class

// on dom ready
$(document).ready(function() {

	// find all the tabs
	$('.tabbed').each(function() {

		// does it have an id?
		if(this.id) {
			
			// create tabbed area components
			new Tabs({
			    container: this.id
			});
		
		// error out	
		} else {
			
			console.error("Jive Tabbed UI [FAIL] > ID attribute required to make Tabbed UI but no found on element below:");
			console.log(this);
			
		}
	
	});


});