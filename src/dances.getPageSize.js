/**
 * @name dances.getPageSize
 */
(function(exports){

	var
		fView
	;

	fView = function(/*[optional]*/w){
		var
			elemDoc
		;

		elemDoc = w && top === w.top ?
			w.document.documentElement :
			top.document.documentElement
		;

		return {
			width : Math.max(elemDoc.scrollWidth, elemDoc.offsetHeight),
			height: Math.max(elemDoc.scrollHeight, elemDoc.offsetHeight)
		};

	};

	exports.getPageSize = fView;

})(dances);
