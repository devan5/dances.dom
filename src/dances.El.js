/**
 * @name dances.El
 */
(function(exports){
	var
		rTag = /<[^\/<>]+>.+<[^<>]+>|<[^<>\s]+\s*\/?\s*>/
	;

	exports.El = function(/*sHtml, window*/){
		var
			args = slice(arguments),
			sHtml = args.shift(),
			win,

			Els,
			elemContainer,
			results,

			elemItem
		;

		if(!sHtml){
			return false;
		}

		"function" === typeof sHtml && (sHtml = sHtml());

		// 嗅探 window
		win = args.shift();

		if(!win || top !== win.top){
			win = window;
		}

		sHtml = sHtml.replace(/^\s+|\s+$/g, "");

		if(!rTag.test(sHtml)){
			throw("dances.expect expects valid HTML construct");
		}

		elemContainer = win.createElement("div");
		elemContainer.innerHTML = sHtml;

		results = [];

		if(elemContainer.childNodes.length){
			Els = elemContainer.childNodes;
			elemItem = Els[0];

			while(elemItem && 3 === elemItem.nodeType){
				results.push(elemContainer.removeChild(elemItem));
			}

		}

		1 === results.length && (results = results[0]);

		// ladder gc
		elemItem =
			Els =
				win =
					elemContainer = null
		;

		return results;
	};

})(dances);
