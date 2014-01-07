define(function (require) {
	require('prototype');

// properties are directly passed to `create` method
var Item = Class.create({
  initialize: function(name,desc) {
    this.name = name;
	this.desc = desc;
  },
  find : function(name) {
    console.log('find function is to be added here');
  }
});
	
return Item;
	
});