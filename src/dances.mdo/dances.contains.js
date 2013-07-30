/**
 * @overview 检测一个元素是否包含另一个元素
 */
(function(exports){

	var fContains;

	if("function" === typeof document.documentElement.contains){

		fContains = function(child, parent){
			if(!parent || !child || 1 !== parent.nodeType || 1 !== child.nodeType){
				return false;
			}

			return parent.contains(child);
		};

	}else if("function" === typeof document.documentElement.compareDocumentPosition){

		fContains = function(child, parent){
			if(!parent || !child || 1 !== parent.nodeType || 1 !== child.nodeType){
				return false;
			}

			return !!(parent.compareDocumentPosition(child) & 16);
		};

	}else{

		fContains = function(child, parent){
			var
				oldParent
				;

			if(!parent || !child || 1 !== parent.nodeType || 1 !== child.nodeType){
				return false;
			}

			oldParent = parent;

			while(parent = child.parentNode){

				if(oldParent === parent){
					return true;
				}
				child = parent;
			}

			// ladder gc
			oldParent =
				parent = null
			;
			return false;
		};
	}

	exports["contain"] = fContains;

})(dances);
