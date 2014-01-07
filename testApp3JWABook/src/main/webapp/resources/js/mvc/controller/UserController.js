var Controller();

//using the anonymous function to encapsulate the scope
(Controller.users = function($){
	
	// the actual fuction
	var itemClick = function(){
		alert("clicked the item");
	}
	
	// adding the event handler on the fuction
	document.observe('dom:loaded', function () {
		$("todoName").click(itemClick);
	});
	
});