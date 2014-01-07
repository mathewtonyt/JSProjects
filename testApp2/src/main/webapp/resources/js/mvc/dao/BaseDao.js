/*
the file will act as a base dao
The database is the local storage
*/
define(function (require) {
	var baseDao = {
	};
	
	baseDao.save = function(key, value){
		var strValue = JSON.stringify(value);
		localStorage.setItem(key,strValue);
		return true;
	}
	
	baseDao.fetch = function(key){
		var strValue = localStorage.getItem(key);
		var object = JSON.parse(strValue);
		return object;
	}
	
	baseDao.clearAll = function(){
		window.localStorage.clear();
		return true;
	}
	
	return baseDao;
	
});