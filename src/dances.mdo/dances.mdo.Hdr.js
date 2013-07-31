window.dances || (function(){
	function Foo(){ }

	Foo.prototype.root = "dances.mdo";
	window.dances = new Foo();
	return window.dances;

})();

(function(exports, undefined){
	"use strict";

	exports || (exports = (function(){
		function Foo(){ }

		Foo.prototype.root = "dances.javascript";
		window.dances = new Foo();
		return window.dances;

	})());
