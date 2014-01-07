var Item = new Class;

//function by id is written with private scope
(function(){
	var findById = function(){
		console.log("find by id");
	};
	
	Item.find = function(id){
		if(typeof id == "integer")
		{
			return findById(id);
		};
	};
})();

// properties added on to the class
Item.extend({
	find : function(id){console.log("finding the class")},
//	callback function that shows the following class was extended
	exented : function(klass){ console.log(klass, "was extended")}
});

// properties added onto the protoype
Item.include({
	save : function(id){console.log("saving the class")},
	destroy : function(id) {console.log("destroying the existence of the class")}
});

//this is used to include the ORMModule which is a module present
Item.include(ORMModule);

