define([
	'js/src/model/Todo.js'
	,'backboneLocalstorage'
	,'jquery'
	,'underscore'
	,'backbone']
	   , function (
	   Todo
		   ,backboneLocalstorage
		   ,$
		   ,_
		   ,Backbone
	   ) {
		   
		   var TodoList = Backbone.Collection.extend({
			   model: Todo,
			   
			   // Save all of the todo items under the `"todos"` namespace.
			   localStorage: new Store("todos"),
			   
			   // Filter down the list of all todo items that are finished.
			   done: function() {
				   return this.filter(function(todo){ return todo.get('done'); });
			   },
			   
			   remaining: function() {
				   return this.without.apply(this, this.done());
			   }
		   });
		   
		   return TodoList;
		   
	   });