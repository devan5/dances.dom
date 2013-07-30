(function(exports){
	var
		addCss
	;

	addCss = function(ss, hEl){

		var
			elemContainer = document.getElementsByTagName("head")[0],
			elemTest,
			isNormal
		;

		elemTest = document.createElement("style");
		elemTest.type = "text/css";

		try{
			elemTest.appendChild(document.createTextNode(ss));
			elemTest = null;
			isNormal = true
		}catch (e){ }

		addCss = function(ss, elemHead){
			var styleEl = document.createElement("style");

			styleEl.type = "text/css";

			if(isNormal){
				styleEl.appendChild(document.createTextNode(ss));
			}else{
				styleEl.styleSheet.cssText = ss;
			}

			(elemHead || elemContainer).appendChild(styleEl);

			return styleEl
		};

		exports.addCss = addCss;

		return  addCss.apply(exports, arguments);
	};

	exports.addCss = addCss;

})(dances);
