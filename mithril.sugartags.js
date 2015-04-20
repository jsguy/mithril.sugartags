//	Mithril sugar tags.
//	Copyright (C) 2015 jsguy (Mikkel Bergmann)
//	MIT licensed
(function(){
//	initialise sugar tags - set window.localSugarTags to true 
//	if you want to not have global sugar tags on the client.
var mithrilSugartags = function(m, scope, debugFunc){
	m.sugarTags = m.sugarTags || {};
	scope = scope || m;

	if(m.localSugarTags || scope.localSugarTags) {
		scope = m.sugarTags;
	}

	var arg = function(l1, l2){
			var i;
			for (i in l2) {if(l2.hasOwnProperty(i)) {
				l1.push(l2[i]);
			}}
			return l1;
		}, 
		getClassList = function(args){
			var i, result;
			for(i in args) {
				if(args[i] && args[i]['class']) {
					return typeof (args[i]['class'] == "string")? 
						args[i]['class'].split(" "):
						false;
				}
			}
		},
		makeSugarTag = function(tag) {
			var c, el;
			return function() {
				var args = Array.prototype.slice.call(arguments);
				//	if class is string, allow use of cache
				if(c = getClassList(args)) {
					el = [tag + "." + c.join(".")];
					//	Remove class tag, so we don't duplicate
					for(var i in args) {
						if(args[i] && args[i]['class']) {
							delete args[i]['class'];
						}
					}
				} else {
					el = [tag];
				}
				args = arg(el, args);
				if(debugFunc) {
					return debugFunc(tag, (m.e? m.e: m).apply(this, args), el, args);
				} else {
					return (m.e? m.e: m).apply(this, args);
				}
			};
		},
		tagList = ["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BODY","BR","BUTTON","CANVAS","CAPTION","CITE","CODE","COL","COLGROUP","COMMAND","DATALIST","DD","DEL","DETAILS","DFN","DIV","DL","DT","EM","EMBED","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAME","FRAMESET","H1","H2","H3","H4","H5","H6","HEAD","HEADER","HGROUP","HR","HTML","I","IFRAME","IMG","INPUT","INS","KBD","KEYGEN","LABEL","LEGEND","LI","LINK","MAP","MARK","META","METER","NAV","NOSCRIPT","OBJECT","OL","OPTGROUP","OPTION","OUTPUT","P","PARAM","PRE","PROGRESS","Q","RP","RT","RUBY","SAMP","SCRIPT","SECTION","SELECT","SMALL","SOURCE","SPAN","SPLIT","STRONG","STYLE","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TITLE","TR","TRACK","TT","UL","VAR","VIDEO","WBR"],
		lowerTagCache = {},
		i;

	//	Create sugar'd functions in the required scopes
	for (i in tagList) {if(tagList.hasOwnProperty(i)) {
		var lowerTag = tagList[i].toLowerCase();
		scope[tagList[i]] = lowerTagCache[lowerTag] = makeSugarTag(lowerTag);
	}}

	//	Lowercased sugar tags
	m.sugarTags.lower = function(){
		return lowerTagCache;
	};

	//	Ability to add custom elements (eg: from mithril.elements)
	m.sugarify = function(elements){
		elements = elements || m.elements || [];
		for(var key in elements) {if(elements.hasOwnProperty(key)){
			var lowerTag = key.toLowerCase();
			scope[key.toUpperCase()] = lowerTagCache[lowerTag] = makeSugarTag(key);
		}}
	};

	m.sugarify();

	return scope;
};

if (typeof module != "undefined" && module !== null && module.exports) {
	module.exports = mithrilSugartags;
} else if (typeof define === "function" && define.amd) {
	define(function() {
		return mithrilSugartags;
	});
} else {
	mithrilSugartags(
		typeof window !== "undefined"? window.m || {}: {},
		typeof window !== "undefined"? window: {},
		typeof window !== "undefined" && window.sugartagsDebug !== "undefined"? window.sugartagsDebug: null
	);
}

}());