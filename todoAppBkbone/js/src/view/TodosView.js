define([
	'jquery',
	'underscore',
	'backbone',
	'js/src/collections/TodoList.js',
	'js/src/view/TodoView.js',
	'mustache'
], 
	   function(
	   $,
		_,
		Backbone,
		TodoList,
		TodoView,
		Mustache
	   ) {
		   
		   
		   // Our overall **AppView** is the top-level piece of UI.
		   var TodosView = Backbone.View.extend({
			   
			   // Instead of generating a new element, bind to the existing skeleton of
			   // the App already present in the HTML.
			   el: $("#todoapp"),
			   
			   template : function(name,model) {
				   var returnVal = Mustache.render($('#' + name + '-template').html(),model);
				   return returnVal;
			   },
			   
			   //statTemplate: this.template('status'),
			   
			   events: {
				   "keypress #new-todo": "createOnEnter",
				   "click .todo-clear a": "clearCompleted"
			   },
			   
			   // At initialization we bind to the relevant events on the `Todos`
			   // collection, when items are added or changed. Kick things off by
			   // loading any preexisting todos that might be saved in *localStorage*.
			   initialize: function() {
				   
				   this.Todos = new TodoList;
				   _.bindAll(this, 'addOne', 'addAll', 'render');
				   
				   this.input = this.$("#new-todo");
				   
				   this.Todos.bind('add', this.addOne);
				   this.Todos.bind('refresh', this.addAll);
				   this.Todos.bind('all', this.render);
				   
				   this.Todos.fetch();
			   },
			   
			   // Re-rendering the App just means refreshing the statistics -- the rest
			   // of the app doesn't change.
			   render: function() {
				   var data = {
					   done : this.Todos.done().length,
					   total : this.Todos.length,
					   done : this.Todos.done().length,
					   remaining : this.Todos.remaining().length,
					   remainingWord : (this.Todos.remaining().length == 1) ? 'item':'items',
					   doneWord : (this.Todos.done().length == 1) ? 'item':'items'
				   }
				   
				   var element = this.template('stats', data);
				   this.$('#todo-stats').html(element);
				   
			   },
			   
			   // Add a single todo item to the list by creating a view for it, and
			   // appending its element to the `<ul>`.
			   addOne: function(todo) {
				   event.preventDefault();
				   var view = new TodoView({model: todo});
				   this.$("#todo-list").append(view.render().el);
			   },
			   
			   // Add all items in the **Todos** collection at once.
			   addAll: function() {
				   this.Todos.each(this.addOne);
			   },
			   
			   // If you hit return in the main input field, create new **Todo** model
			   createOnEnter: function(e) {
				   if (e.keyCode != 13) return;
				   
				   var value = this.input.val();
				   if ( !value ) return;
				   
				   this.Todos.create({content: value});
				   this.input.val('');
			   },
			   
			   clearCompleted: function() {
				   _.each(this.Todos.done(), function(todo){ todo.destroy(); });
				   return false;
			   }
		   });
		   
		   return TodosView;
	   });