(function(){

	var
		fView
	;

	fView = function(/*[optional]*/w){
		var
			doc,
			oResults = {}
		;

		doc = w && top === w.top ?
			w.document :
			top.document
		;


		if("CSS1Compat" === doc.compatMode){
			oResults.width = doc.documentElement.clientWidth;
			oResults.height = doc.documentElement.clientHeight;

		}else{
			oResults.width = doc.body.clientWidth;
			oResults.height = doc.body.clientHeight;
		}

		// gc
		doc = null;

		return oResults;
	};

	exports.getViewSize = fView;

})(dances);
