//	Mithril sugar tags.
//	Copyright (C) 2014 jsguy (Mikkel Bergmann)
//	MIT licensed
(function(context){
	context.m = context.m || {};
	context.m.sugarTags = {};
	var arg = function(l1, l2){
			var i;
			for (i in l2) {if(l2.hasOwnProperty(i)) {
				l1.push(l2[i]);
			}}
			return l1;
		}, 
		tagList = ['a', 'article', 'aside', 'audio', 'b', 'div', 'form', 'hr', 'i', 'li', 'p', 'span', 'script', 'video', 'ul'],
		i;

	//	Create sugar'd functions on the given "m "context
	for (i in tagList) {if(tagList.hasOwnProperty(i)) {
		(function(tag){
			context.m.sugarTags[tag] = function(){
				return m.apply(this, arg([tag], arguments));
			};
		}(tagList[i]));
	}}
}(window));