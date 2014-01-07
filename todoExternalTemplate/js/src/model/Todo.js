define(['jquery'
		 ,'underscore'
		 ,'backbone'], 
		function (
		 $,
		 _,
		 Backbone
		 ) {
	
	var Todo = Backbone.Model.extend({
		defaults : {
			done : false
		},
		toggle : function(){
			this.save({done : !this.get('done')});
		}
	});
	
	return Todo;
	
});