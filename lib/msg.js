/*
 * Messenger v1.0 | Max Felker
 * Creates system messages
*/

var Messenger = Class.create({
	
	// initialize class with config	
	initialize: function(config) {
		
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		
		// dom elements
		this.container = $('<div id="jive-messenger"/>');
		this.messages_container = $('<div id="jive-messenger-messages"/>');			
		this.close_btn = $('<div id="jive-messenger-close" style="display:none;"/>').text('x').click(this.close);
		
		// add container to body when dom is ready
		$(document).ready(function() {
			$this.container.append($this.messages_container);
			$this.container.append($this.close_btn);
			$(document.body).append($this.container);
		});
			
	},
	
	create:function(config) {
		
		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		
		// msg object
		var msg = {
			id: "msg-"+$j.msg_index,
			type: ( config.type ? config.type : 'notify' ),
			content: config.content,
			timer: ( config.timer ? config.timer : 5000 ),
			sticky: ( config.sticky ? config.sticky : false ),
		};
		
		// container
		msg.container = $('<div class="jive-msg jive-msg-'+msg.type+'" id="'+msg.id+'"/>').append(
			$('<div class="jive-msg-contents"/>').html(msg.content)
		);
		
		// if it's sticky
		if(msg.sticky) {
	
			this.close_btn.show();
			
		} else {
			
			this.close_btn.hide();
			
		}

		// append msg dom object to the messenger container
		this.messages_container.append(msg.container);
		
		// show container
		this.container.show();
		
		// assign to jive tabs collector
		$j.msgs[$j.msg_index] = msg;
		$j.msg_index++;
		
		// if this msg isn't sticky
		if(!msg.sticky) {
			
			// set timeout to hide the message
			setTimeout(function() {
				$this.close();
			},msg.timer)
			
		}
		
	},
	
	
	clear: function(){
		
		this.close_btn.hide();
		this.messages_container.empty();
	},
	
	// fades out the message
	close: function(timer) {
		
		$j.messenger.container.fadeOut();
		
		setTimeout(function() {
			$j.messenger.messages_container.html('');
		},1000)
			
	}
	
	
});

// assign to jive
$j.messenger = new Messenger(); 