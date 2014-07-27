//	Mithril template.
//	Copyright (C) 2014 jsguy (Mikkel Bergmann)
//	MIT licensed
(function(context){
	context.m = context.m || {};
	context.m.template = function(tmpl, data){
		try{
			var isFunc = (typeof tmpl == 'function'), t, f, result;
			if(isFunc) {
				result = tmpl(data);
			} else {
				t = document.getElementById(tmpl).innerHTML;
				//	Use sugar tags if they are available
				f = (m.sugarTags? 
					new Function("data", 'with(m.sugarTags) {return(' + t + ')};'):
					new Function("data", 'return(' + t + ')'));
				result = f(data);
			}

			return result;
		} catch(e){
			var msg = e.message;
			return "Mithril template error: " + msg + ".";
		}
	};
}(window));