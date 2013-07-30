/**
 * @overview 计算出子元素(包括隐藏子元素)相对父元素的坐标
 * @desc warning: contextEl 在ie7及之前版本 若没有触发 hasLayout 则计算的误差会很大
 * @require dances.contain
 * @require dances.ss
 */
(function(exports){

	var offset;

	offset = function(elemOffset, elemScope){

		var
			nTop,
			nLeft,
			commonOffsetParent,
			_nTop,
			_nLeft
		;

		if(!elemOffset || !elemScope || !dances.contains(elemScope, elemOffset)){
			return {};
		}

		nTop = 0;
		nLeft = 0;
		commonOffsetParent = elemScope.offsetParent;
		_nTop = elemScope.offsetTop;
		_nLeft = elemScope.offsetLeft;

		if("none" === dances.ss(elemOffset, "display")){
			elemOffset = elemOffset.parentNode;

			nTop += parseInt(dances.ss(elemOffset, "paddingTop"));
			nTop += parseInt(dances.ss(elemOffset, "borderTopWidth"));

			nLeft += parseInt(dances.ss(elemOffset, "paddingLeft"));
			nLeft += parseInt(dances.ss(elemOffset, "borderLeftWidth"));
		}

		while(elemOffset !== commonOffsetParent){
			nTop += elemOffset.offsetTop;
			nLeft += elemOffset.offsetLeft;
			elemOffset = elemOffset.offsetParent;
		}

		// gc
		commonOffsetParent = null;

		return {
			left: nLeft - _nLeft,
			top: nTop - _nTop
		};

	};

	exports.offset = offset;

})(dances);
