	exports || (exports = (function(){
		function Foo(){ }

		Foo.prototype.root = "dances.javascript";
		window.dances = new Foo();
		return window.dances;

	})());

	for(var prop in _oProto){
		if(_oProto.hasOwnProperty(prop)){
			if("function" === _oProto[prop]){
				oProto[prop] = fAdapt(prop);

			}else{
				oProto[prop] = _oProto[prop];
			}
		}
	}

	DOM.prototype = oProto;

	window.DOM = DOM;
	exports.DOM = DOM;

})(window.dances);
