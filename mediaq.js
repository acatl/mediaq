var mediaq = (function () {
	
	function run(queries) {
		var query;
		for (var i=0; i < queries.length; i++) {
			query = queries[i];
			if(evalQuery(query)) {
				query.run();
			}
		};
	}
	
	function evalQuery(query) {
		var statements = query.statements;
		var statement;
		var valid = true;
		var passed = true;
		
		var viewport = getDimensions();
		
		for (var i in statements){
			statement = statements[i];
			passed = true;
			switch(i) {
				case "min-width": 
					passed = viewport.width >= statement;
				break;
				case "max-width": 
					passed = viewport.width <= statement;
				break;
			}
			valid = valid && passed;
		};
		return valid;
	}
	
	
	function create(statements, executefunction) {
		return {
			statements: statements,
			run: executefunction
		};
	}
	
	
	function getDimensions() {
		var viewportwidth;
		 var viewportheight;

		 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

		 if (typeof window.innerWidth != 'undefined')
		 {
		      viewportwidth = window.innerWidth,
		      viewportheight = window.innerHeight
		 }

		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

		 else if (typeof document.documentElement != 'undefined'
		     && typeof document.documentElement.clientWidth !=
		     'undefined' && document.documentElement.clientWidth != 0)
		 {
		       viewportwidth = document.documentElement.clientWidth,
		       viewportheight = document.documentElement.clientHeight
		 }

		 // older versions of IE

		 else
		 {
		       viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
		       viewportheight = document.getElementsByTagName('body')[0].clientHeight
		 }
		return {
			width: viewportwidth,
			height: viewportheight
		};
	}
	
	
	return {
		run: run,
		create: create
	}
})();