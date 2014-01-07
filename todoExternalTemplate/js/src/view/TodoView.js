define([
	'jquery',
	'underscore',
	'backbone',
	'mustache'
], 
	   function(
	   $,
		_,
		Backbone,
		Mustache
	   ) {
		   
		   //var template = 
		   
		   var TodoView = Backbone.View.extend({
			   
			   tagName : 'li',
			   
			   template : function(name,model) {
				   var returnVal = Mustache.render($('#' + name + '-template').html(),model);
				   return returnVal;
			   },
			   events : {
				   
				   "change   .check"        : "toggleDone",
				   "dblclick .todo-content" : "edit",
				   "click    .todo-destroy" : "destroy",
				   "keypress .todo-input"   : "updateOnEnter",
				   "blur     .todo-input"   : "close"
			   },
			   
			   initialize : function(){
				   _.bindAll(this, 'render', 'close' , 'remove');
				   console.log('binding the values');
				   this.model.bind('change', this.render);
				   this.model.bind('destroy', this.remove);
				   
			   },
			   
			   // ******************** render close move methods begins *****************************************
			   render : function(){
				   console.log('trying to render - item template');
				   event.preventDefault();
				   var data = {
					   content : this.model.attributes.content,
					   done : this.model.attributes.done
				   };
				   var element = this.template('item',data);
				   //console.log(element);
				   $(this.el).html(element);
				   this.input = this.$(".todo-input");
				   return this;
			   },
			   
			   close: function(e) {    
				   this.model.save({content: this.input.val()});    
				   $(this.el).removeClass("editing");  
			   },
			   // Remove element when model is destroyed  
			   remove: function() {    
				   $(this.el).remove();  
			   },
			   // ******************** render close move methods ends *****************************************
			   
			   
			   toggleDone : function() {
				   this.model.toggle();  
			   },
			   
			   edit : function (){
				   $(this.el).addClass("editing");    
				   this.input.focus(); 
			   },
			   
			   // If you hit `enter`, we're through editing the item.  
			   // Fire the blur event on the input, triggering close() 
			   updateOnEnter: function(e) {    
				   if (e.keyCode == 13) 
					   e.target.blur();  
			   },
			   
			   // Destroy model when '.todo-destroy' is clicked  
			   destroy: function() {    
				   this.model.destroy();  
			   } 
		   });
		   
		   return TodoView;
		   
	   });