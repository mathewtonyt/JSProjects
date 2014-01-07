//Load common code that includes config, then load the app logic for this page.
require(['require','jQuery','js/mvc/controller/Controller.js'], function (require,jQuery,Controller) {
	
	var exports = this;
	var $ = require('jQuery');
	
	jQuery(function($){
		
		exports.SearchView = Controller.create({
			elements: {
				"input[type=search]": "searchInput",
				"form": "searchForm"
			},
			
	events: {
				"submit form": "search"
			},
			
			init: function(){ /* ... */ },
			
			search: function(){
				alert("Searching: " + this.searchInput.val());
				return false;
			},
		},exports);
		
		new SearchView({el: $("#users")});
	});
	
});