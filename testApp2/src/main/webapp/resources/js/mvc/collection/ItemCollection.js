define(function (require) {
	require('prototype');
	
	
	// properties are directly passed to `create` method
	var ItemCollection = Class.create({
		initialize: function() {
			this.itemList = [];
		},
		fetch : function(key) {
			console.log('fetching the item collection');
			var baseDao = require('js/mvc/dao/BaseDao.js');
			var itemList = baseDao.fetch(key);
			this.itemList = itemList;
			return itemList;
			
		},
		saveAll : function(key,items){
			console.log('saving the item collection');
			var baseDao = require('js/mvc/dao/BaseDao.js');
			var saved = baseDao.save(key,items);
			this.itemList = items;
			return saved;
		},
		save : function(key,itemObj){
			console.log('saving the item object in the existing collection');
			
			var baseDao = require('js/mvc/dao/BaseDao.js');
			var items = baseDao.fetch(key);
			var returnValue = false;
			
			if(Array.isArray(items)){
				for (var i = 0; i < items.length; i++) {
					console.log(items[i]);
				}
				items.push(itemObj);
				baseDao.save(key,items);
				this.itemList = items;
				returnValue = true;
				
			}else
			{
				console.error('the value stored is not of type items');
				var items = this.itemList;
				items.push(itemObj);
				baseDao.save(key,items);
				returnValue = true;
			}
			
			return returnValue;
			
		},
		exists : function(key){
			console.log('Checking if the value is present in the DB');
			var returnValue = false;
			var items = baseDao.fetch(key);
			if(Array.isArray(items)){
				returnValue = true;
			}
			else{
				returnValue = false;
				console.error('the itemList is not present in the local storage');
			}
			
			return returnValue;
		}
		
	});
	
	return ItemCollection;
	
});