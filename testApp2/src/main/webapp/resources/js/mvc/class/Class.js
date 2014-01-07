var Class = function(parent)
{
	var klass = function(){
		// two ways of calling a function are
		// apply (context, [array of arguments])
		// call(context, arg1,arg2,arg....)
		this.init.apply(this,arguments);
	};
	
	// code for the parent class
	if(parent)
	{
		// we will inherit only the instance properties not the class properties
		var subClass = function(){};
		subClass.prototype = parent.prototype;
		klass.prototype = new subClass;
	}
	
	
	//keep a scope for the class constructor open just incase
	klass.prototype.init = function(){};
	
	//	shortcut to access the Prototype
	klass.fn = klass.prototype;
	
	
	//	adding the proxy logic here...
	klass.proxy = function(func){
		var self = this;
		return(function(){
			return func.apply(self,arguments);
		});
	}
	
	// passing the proxy to the instances
	klass.fn.proxy = klass.proxy;
	
	//klass as super class
	klass._super = klass._proto_;
	
	//	shortcut to accesss the class
	klass.fn.parent = klass;
	
	klass.extend = function(obj){
		var extended = obj.extended;
		for (var i in obj)
		{
			klass[i] = obj[i];
		}
		if(extended) extended(klass)
			};
	
	//adding instance properties
	klass.include = function(obj){
		var included = obj.included;
		for (var i in obj)
		{
			klass[i] = obj[i];
		}
		if(included) included(klass)
			};
	
};

