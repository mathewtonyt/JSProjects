define(function (require) {
	require('prototype');
	//require('tablekit');
	document.observe('dom:loaded', function () {
		alert("Ready");
	});

	// Use the module (import)
	require(['js/mvc/controller/homeController.js'], function(homeController){
		console.log($("todoDescription"));
		todoDescriptionWidth($("todoDescription"));
		todoNameFn($);
		homeController.refreshTodoList($);
		homeController.startupFn($);
		
		//table modifications
		function modifyTable($$){
			$$('th').setStyle('color: #FFF')
		}
		
		//	The method is used to increase the width of the element.
		function todoDescriptionWidth(element) {
			element.setStyle({
				"width": "40%"
			});
		}
		
		
		// function to do the rendering actions
		function todoNameFn($){
			$('todoName').observe('click', function (e) {
			if (e.target.value == "Enter the Item Name") {
				e.target.value = "";
			}
		});
		$('todoName').observe('mouseleave', function (e) {
			if (e.target.value === "") {
				e.target.value = "Enter the Item Name";
			}
		});
		$('todoDescription').observe('click', function (e) {
			if (e.target.value == "Enter the description") {
				e.target.value = "";
			}
		});
		$('todoDescription').observe('mouseleave', function (e) {
			if (e.target.value === "") {
				e.target.value = "Enter the description";
			}
		});
		
		
		$('climateMaxButton').observe('click', function (e) {
			var maxClimate = getClimateMax();
			$("climateMaxButton").value = maxClimate;
		});
		}
		
	});
	
	
});