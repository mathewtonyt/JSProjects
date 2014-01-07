define(['require','jQuery'],function (require,$) {
	var mod = {};
	
	// this func is called when the create is done
	mod.create = function(includes){
		var result = function(){
			this.initializer.apply(this, arguments);
			this.init.apply(this, arguments);
		};
		
		// (1)--- proxy + prototype related code
		// the prototype is give a fn name
		result.fn = result.prototype;
		// init function
		result.fn.init = function(){};
		// proxy function = to ensure the callback is called in the correct context.
		result.proxy = function(func){ return $.proxy(func, this); };
		result.fn.proxy = result.proxy;
		
		// (2)--- include for properties on prototype and exlude for the instance
		result.include = function(ob){ $.extend(this.fn, ob); };
		result.extend = function(ob){ $.extend(this, ob); };
		
		result.include({
			initializer: function(options){
				this.options = options;
				
				for (var key in this.options)
					this[key] = this.options[key];
				
				if (this.events) this.delegateEvents();
				if (this.elements) this.refreshElements();
			},
			
			$: function(selector){
				return $(selector, this.el);
			},
			
			//(3)--- for event binding all the elements
			refreshElements: function(){
				for (var key in this.elements) {
					this[this.elements[key]] = this.$(key);
				}
			},
			
			eventSplitter: /^(\w+)\s*(.*)$/,
			
			//(4)--- for event binding all the elements
			delegateEvents: function(){
				for (var key in this.events) {
					var methodName = this.events[key];
					var method = this.proxy(this[methodName]);
					
					var match = key.match(this.eventSplitter);
					var eventName = match[1], selector = match[2];
					
					if (selector === '') {
						this.el.bind(eventName, method);
					} else {
						this.el.delegate(selector, eventName, method);
					}
				}
			}
		});
		
		if (includes) result.include(includes);
		
		return result;
	};
	
	return mod;
	
});