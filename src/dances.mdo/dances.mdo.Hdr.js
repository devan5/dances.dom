(function(exports, undefined){
	"use strict";
	var
		_oProto = {
			constructor: DOM
		},
		oProto = {},

		dances,

		create = Object.create || (function(){

			var Foo = function(){ };

			return function(){

				if(arguments.length > 1){
					throw new Error('Object.create implementation only accepts the first parameter.');
				}

				var proto = arguments[0],
					type = typeof proto
					;

				if(!proto || ("object" !== type && "function" !== type)){
					throw new TypeError('TypeError: ' + proto + ' is not an object or null');
				}

				Foo.prototype = proto;

				return new Foo();
			}
		})()
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

	// contains

