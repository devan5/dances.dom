
	for(var prop in _oProto){
		if(_oProto.hasOwnProperty(prop)){
			if("function" === typeof _oProto[prop]){
				oProto[prop] = fAdapt(prop);

			}else{
				oProto[prop] = _oProto[prop];
			}
		}
	}

	DOM.prototype = oProto;
	oProto.constructor = DOM;

	window.DOM = DOM;
	exports.DOM = DOM;

})(dances);
