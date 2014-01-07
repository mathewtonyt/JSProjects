requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		// the left side is the module ID,
		// the right side is the path to
		// the jQuery file, relative to baseUrl.
		// Also, the path should NOT include
		// the '.js' file extension. This example
		// is using jQuery 1.9.0 located at
		// js/lib/jquery-1.9.0.js, relative to
		// the HTML page.
		'prototype': 'prototype',
		'tablekit' : 'tablekit'
	},
	shim: {
		'prototype': {
			// Don't actually need to use this object as 
			// Prototype affects native objects and creates global ones too
			// but it's the most sensible object to return
			exports: 'Prototype'
			
		},
		'tablekit' : {
			exports : 'tablekit'
		}
	}
});