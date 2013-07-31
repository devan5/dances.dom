/**
 * @name dances.contains
 * @overview 检测一个元素是否包含另一个元素
 * @firstDate 2013.07.31
 * @lastDate 2013.07.31
 * @desc 我去啊! ie9/10 不支持 contains(Text)
 */
(function(exports){

	var fContains;

	if("function" === typeof document.documentElement.contains){

		fContains = function(parent, child){

			return parent && child && 1 === parent.nodeType && 1 === child.nodeType ?
				parent.contains(child) :
				null
			;
		};

	}else if("function" === typeof document.documentElement.compareDocumentPosition){

		fContains = function(parent, child){

			return parent && child && 1 === parent.nodeType && 1 === child.nodeType ?
				!!(parent.compareDocumentPosition(child) & 16) :
				null
			;
		};

	}else{

		fContains = function(parent, child){
			var _parent;

			if(!parent || !child || 1 !== parent.nodeType || 1 !== child.nodeType){
				return null;
			}

			_parent = parent;

			while(parent = child.parentNode){
				if(_parent === parent){ return true; }
				child = parent;
			}

			return false;
		};
	}

	exports.contains = fContains;

})(dances);
