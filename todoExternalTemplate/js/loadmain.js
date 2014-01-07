require.config({
	baseUrl: 'js/lib',
	paths: {
		'json2' : 'json2',
		'jquery': 'jquery'
		//'underscore' : 'underscore',
		//'backbone' : 'backbone',
		//'backboneLocalstorage' : 'backboneLocalstorage',
		//'mustache' : 'mustache'
	},
	
	shim: {
		//'json2': {exports : 'json2'},
		//'underscore' : {exports: '_'},
		//'jquery': {exports: 'jquery'},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ["underscore", "jQuery"],
			exports: "Backbone"
		},
		'backboneLocalstorage' : {
			deps: ['backbone'],
			exports:'backboneLocalstorage'
		},
		'mustache' : {exports:'Mustache'}
		
		
	}
});

// Load the main app module to start the app
require(['js/src/helper/TodosHelper.js']);