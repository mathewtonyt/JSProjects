/*global define */

define( "HelloWorld/HelloWorldController", [ "jquery" ], function($) {
    
    /**
     * Controls the showing of a 'Hello World' message.
     * 
     * This is a "supervising controller" otherwise known as a "presenter".
     * @see http://martinfowler.com/eaaDev/SupervisingPresenter.html
     * 
     * @class Controls the showing of a 'Hello World' message.
     * @name HelloWorldController
     */
    function HelloWorldController() {
    }
    
    /**
     * The HelloWorldView instance (injected)
     */
    HelloWorldController.prototype.view = undefined;
    
    /**
     * The HelloWorldCommand instance (injected)
     */
    HelloWorldController.prototype.command = undefined;
    
    /**
     * Success callback for the HelloWorldCommand.
     * Show the 'Hello World' message using the view.
     * 
     * @param message The message to show.
     */
    HelloWorldController.prototype.getTextSuccess = function(message) {
        var self = this;
        
        self.view.setHelloWorldDivText(message);
    };
    
    /**
     * Failure callback for the HelloWorldCommand.
     * Show the error message using the view.
     * 
     * @param errorMessage A description of the error
     */
    HelloWorldController.prototype.getTextFailure = function(errorMessage) {
        var self = this;
        
        self.view.showError(errorMessage);
    };
    
    /**
     * Initialization method for this controller.
     */
    HelloWorldController.prototype.start = function() {
        var self = this, text;
        
        // Inject our helloButtonClick handler into the view
        self.view.helloButtonClick = $.proxy(self.helloButtonClick, self);
        // Initialize the view
        self.view.initialize();
        
        // Fetch the 'hello world' text using a command object
        text = self.command.execute( $.proxy(self.getTextSuccess, self), $.proxy(self.getTextFailure, self) );
    };
    
    /**
     * Handle a click on the #helloButton element.
     * 
     * @param event The event object which triggered this handler.
     */
    HelloWorldController.prototype.helloButtonClick = function(event) {
        var self = this;
        
        self.view.setHelloButtonText("Clicked");
    };
    
    // Return the function
    return HelloWorldController;
  
});;
/*global define, window */

define( "HelloWorld/desktop/HelloWorldView", [ "jquery-ui" ], function($) {
    
    /**
     * User interface part of HelloWorld*.
     * Shows messages to the user and reacts to user input.
     * This view is part of the desktop view implementation.
     * 
     * This is a "view" as defined by "supervising controller".
     * @see http://martinfowler.com/eaaDev/SupervisingPresenter.html
     * 
     * @class User interface part of HelloWorld*.
     * @name HelloWorldView
     */
    function HelloWorldView() {
    }
    
    /**
     * The div used for the hello world message.
     */
    HelloWorldView.prototype.div = undefined;
    
    /**
     * The event handler for a click on #helloButton.
     */
    HelloWorldView.prototype.helloButtonClick = undefined;
    
    /**
     * Initialize the view.
     * - Setup buttons
     */
    HelloWorldView.prototype.initialize = function() {
        var self = this;
        
        // Setup #helloButton as a button and bind click to helloButtonClick event
        $("#helloButton", self.div).button()
            .click( function(event){
                self.helloButtonClick(event);
            });
    };
    
    /**
     * Sets the hello world message in the #helloWorld div.
     * 
     * @param message The message to set.
     */
    HelloWorldView.prototype.setHelloWorldDivText = function(message) {
        var self = this;
        
        // Set message on the hello world div
        $("#helloMessage", self.div).text(message);
    };
    
    /**
     * Sets the hello world message in the #helloButton button.
     * 
     * @param message The message to set.
     */
    HelloWorldView.prototype.setHelloButtonText = function(message) {
        var self = this;
        
        // Set message on the hello world div
        $("#helloButton span", self.div).text(message);
    };
    
    /**
     * Show an error message.
     * 
     * @param message The message to show.
     */
    HelloWorldView.prototype.showError = function(message) {
        var self = this;
        
        // Show error message
        window.alert("Error: " + message);
    };
    
    // Return the function
    return HelloWorldView;
  
});;
/*global define*/

define( "model/HelloWorldCommand", [ ], function() {
    
    /**
     * Command object to retrieve the 'Hello World' text.
     * 
     * @class Command object to retrieve the 'Hello World' text.
     * @name HelloWorldCommand
     */
    function HelloWorldCommand() {
    }

    /**
     * Execute this command and then call the supplied success or
     * failure callback as appropriate.
     * 
     * @param success Callback function for a successful execution.
     * @param failure Callback function for a failed execution.
     */
    HelloWorldCommand.prototype.execute = function(success, failure) {
        success("Hello World");
    };
    
    // Return the function
    return HelloWorldCommand;
  
});;
/*global define */

define( "IndexContext", [ "jquery", "HelloWorld/HelloWorldController", "HelloWorld/desktop/HelloWorldView", "model/HelloWorldCommand" ], function($, HelloWorldController, HelloWorldView, HelloWorldCommand) {
    
    /**
     * Context for our index.html entry point.
     * 
     * Sets up required objects, handles dependency injection, and starts
     * the HelloWorldController.
     * 
     * @class Context for our index.html entry point.
     * @name IndexContext
     */
    function IndexContext(){}
    
    /**
     * Initialize this context.
     * 
     * Instantiates HelloWorld components, injects dependencies, and starts
     * the HelloWorldController.
     */
    IndexContext.prototype.initialize = function() {
        var controller, view, command;
        
        // Instantiate objects
        controller = new HelloWorldController();
        view = new HelloWorldView();
        command = new HelloWorldCommand();
        
        // Perform dependency injection by extending objects
        $.extend(view, {
            div: $("#helloWorld")
        });
        
        $.extend(controller, {
           view: view,
           command: command
        });
        
        // Start the HelloWorldController
        controller.start();
    };
    
    // Return the function
    return IndexContext;
    
});
;
/*global $, require */

// When the document is ready:
$().ready(function() {

	require(  [ "IndexContext" ], function(IndexContext) {

		// Create a new IndexContext and initialize it which will create and
		// start a HelloWorldController
		var indexContext = new IndexContext();
		indexContext.initialize();
	});

});
;
