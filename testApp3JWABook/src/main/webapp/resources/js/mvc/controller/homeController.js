/*
the file will act as a controller
*/
define(function (require) {
	var homeController = {
	};
	
	
	
	homeController.refreshTodoList = function($) {
		var Items = require('js/mvc/collection/ItemCollection.js');
		var Item = require('js/mvc/class/Item.js');
		var items = new Items();
		var itemList = items.fetch('todos');
		if(Array.isArray(itemList)){
			for (var i = 0; i < itemList.length; i++){
				var item = itemList[i];
				
				{
					$('resultBody').insert('<td><label>'+ item.name +'</label></td>'+'<td><label>'+ item.desc +'</label></td>');
				}
			}
			
		}
	}
	
	//The method is used to handle the startup functions alone
	homeController.startupFn = function($) {
		var Item = require('js/mvc/class/Item.js');
		var Items = require('js/mvc/collection/ItemCollection.js');
		var item;
		
		
		//onclick of the ADD button
		$('addButton').observe('click', function (e) {
			// logging
			console.log($("todoName").value + " : " + $("todoDescription").value);
			
			// create a model object
			// console.log(Item);
			item = new Item($("todoName").value,$("todoDescription").value);
			$('resultBody').insert('<td><label>'+ item.name +'</label></td>'+'<td><label>'+ item.desc +'</label></td>')
			var items = new Items();
			items.save('todos',item);
		});
		
		
		
	}
	
	/*
 	 *	The method will return the climate of the place
 	 */
	homeController.getClimateMax = function($) {
		var url = "http://localhost:8080/testApp2/rest/notes";
		var returnValue = "";
		//var transport = new XMLHttpRequest();
		var json = "";
		try {
			var ajaxCall = new Ajax.Request(url, {
				method: "post",
				requestHeaders: {Accept: 'application/json'},
				//requestHeaders: {"Access-Control-Allow-Headers: Origin": "X-Requested-With, Content-Type, Accept"},
				onSuccess: function (transport) {
					var json = transport.responseText.evalJSON();
					var content = transport.responseJSON;
					alert(json ? Object.inspect(json) : "no JSON1 object");
				},
				onFailure: function () {
					alert("hi onFailure");
				},
				onComplete: function (response) {
					if (200 == response.status)
						alert(response);
				}
			});
		}
		catch (e) {
			alert(e);
		}
		//    returnValue = ajaxCall.
		return returnValue;
	}
	
	
	return homeController;
	
});
