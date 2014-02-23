/**
 * Messenger 
 * 
 * Notification sytem
 * 
 * Read more https://github.com/maxatbrs/JiveJS/wiki/Messenger
 * 
 * @author Max Felker (https://github.com/maxatbrs)
 * 
*/

$j.Messenger = {
	
	// index for messages
	index: 0,
	
	// messages object collector
	messages: {},

	// initialize class 
	initialize: function() {

		// class reference, for use in each loops to resolve scope conflict
		var $this = this;

		// DOM nodes for messages display
		this.container = $('<div id="Messenger"/>');
		this.messageContainer = $('<div id="MessageList"/>');

		// add container to body when dom is ready
		$(document).ready(function() {
			
			$this.container.append($this.messageContainer);
			$(document.body).append($this.container);
			
		});

	},

	// creates a message object and displays it
	createMessage:function(messageObject) {

		// class reference, for use in each loops to resolve scope conflict
		var $this = this;
		
		// extend messageObject  passed to Messenger 
		var messageObject = $.extend({
			id: "message-"+$this.index,
			type:null,
			timer:5000,
			sticky:false
		},messageObject);
		
		// create messageObject DOM nodes
		messageObject.container = $('<div class="message" id="'+messageObject.id+'"/>').append(
			
			$('<div class="message-contents"/>').html(messageObject.content).click(function() {
				$this.removeMessage(messageObject.id);
			})
			
		);
		
		// if we have a message type, add that class to 
		if(messageObject.type){
			messageObject.container.addClass("message-"+messageObject.type);
		}
	
		// if messageObject is not a sticky message
		if(!messageObject.sticky) {

			// set timeout to hide the message
			setTimeout(function() {
				$this.removeMessage(messageObject.id);
			},messageObject.timer)
			
		}

		// append messageObject dom container to the messenger container
		this.messageContainer.append(messageObject.container);

		// show container
		this.container.show();

		// add msgObject to this.msgs
		this.messages[messageObject.id] = messageObject;
		
		// increase message index 
		this.index++;

	},
	
	// removes a message from Messenger
	removeMessage: function(messageID){
		
		// remove message from DOM
		$("#"+messageID).remove();
		
		// delete messageObject from Messenger.messages
		delete this.messages[messageID];
		
	}

}; // end Messenger object

// Init Messenger Object
$j.Messenger.initialize();