	var
		_oProto = {},
		oProto = {},

		dances
	;

	/**
	 * @constructor
	 * @param elem {Element | NodeList}
	 * @returns inst
	 */
	function DOM(elem){
		if(!(this instanceof DOM)){
			return new DOM(elem);
		}

		elem && elem.length > 1 && (elem = elem[0]);

		/**
		 * @type {Element}
		 * @private
		 */
		this.__elem = elem;
	}

	function fAdapt(prop){
		return function(){
			var args = Array.prototype.slice.call(arguments);
			args.unshift(this.__elem);
			return _oProto[prop].apply(this, args);
		}
	}

	dances = _oProto;
