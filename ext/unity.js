/* 
 * Unity JS
 * jQuery / Unity Web Player interface
 * by Max Felker | felkerm@gmail.com
 * 
*/ 

window.$j.unity = {
	
	players:{},
		
	// detects unity player
	detect: function() {
		
		if (typeof unityObject != "undefined") {
			return true
		} else {
			false
		}
		
	}	
	
}

var UnityPlayer = Class.create({
	
	initialize: function(config) { 
		
		var $this = this
				
		// form DOM
		this.container = $("#"+config.container)
		
		
		if($j.unity.detect) {
			
			this.container.css({
				width:(config.width ? config.width : $j.viewport.x )+"px",
				height:(config.height ? config.height : $j.viewport.y )+"px"
			})
				
			this.params = {
				disableContextMenu: true
			}
				
			unityObject.embedUnity(
				config.container, 
				config.path,
				( config.width ? config.width : $j.viewport.x ),
				( config.height ? config.height : $j.viewport.y ),
				this.params
			)
			
			$j.unity.players[config.container] = this
			
		} else {
			
			console.log('$j.unity: Unity not detected, exiting')
			
		} // end if unity is detected
		
	}, // end init
	
	// get unity object
	get: function() {
		
		return unityObject.getObjectById(this.container.attr('id'))
		
	},
	
	call: function(options) {
		
		this.get().SendMessage(
			( options.gameobject ? options.gameobject : 'Jive' ), 
			options.fn, 
			options.params
		)
		
	}
	
}) // end class