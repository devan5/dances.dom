/*~~~~~~~~
with dances

	called: dom

	version: 2.0

	firstDate: 2013.05.06

	lastDate: 2013.05.06

	require: [
		dances.amd
	],

	log: {
		"v2.0": [
			+ 实现五大 dances.core 之一 dances.dom
			+ TODO 完善文档
		]
	}

~~~~~~~~*/

/*_______
# dances.uAgent

## syntax
### 获取浏览器客户端
	dances.uAgent.whois

### 获取浏览器核心引擎
	dances.uAgent.engine

### 获取浏览器版本号
	dances.uAgent.ver

### 嗅探
	dances.uAgent.firefox
	dances.uAgent.chrome
	dances.uAgent.msie
	dances.uAgent.opera
	dances.uAgent.safari

	dances.uAgent.gecko
	dances.uAgent.trident
	dances.uAgent.webkit
	dances.uAgent.presto

_______*/

/*_______
# dances.addCss

## syntax
	dances.addCss(ss[, headEl]);

### ss
css rule

### headEl
可选, style element 添加到的元素


_______*/

(function(dances){
	"use strict";

	// dances.uAgent
	dances && (function(exports){

		var Agent = navigator.userAgent.toLowerCase(),
			uAgent = {
				ua: Agent
			},

			numREG = /^\d*\.\d*/,
			vClient, vEngine,
			environment = false,
			engine = false
		;

		// 检测 Opera presto
		if(window.opera){
			engine = "presto";
			environment = "opera";
			uAgent.opera = window.opera.version();
			vClient = [uAgent.opera];

			// 检测 presto 版本
			if(/presto\/([\d\.]*)/.test(Agent)){
				vEngine = RegExp.$1.match(numREG);
				uAgent.presto = vEngine ? vEngine[0] : 0;
			}

			// 检测 webkit
		}else if(/applewebkit\/([\d\.]*)/.test(Agent)){
			engine = "webkit";
			vEngine = RegExp.$1.match(numREG);
			uAgent.webkit = vEngine ? vEngine[0] : 0;

			// 检测 chrome
			if(/chrome\/([\d\.]*)/.test(Agent)){
				environment = "chrome";
				vClient = RegExp.$1.match(numREG);
				uAgent.chrome = vClient ? vClient[0] : 0;

				// 检测 safari
			}else if(/safari\/([\d\.]*)/.test(Agent)){
				environment = "safari";
				if(/version\/([\d\.]*)/.test(Agent)){
					vClient = RegExp.$1.match(numREG);
					uAgent.safari = vClient ? vClient[0] : 0;
				}
			}

			// 检测 msie trident
		}else if(/msie\s*([\d\.]*)/.test(Agent)){
			engine = "trident";
			environment = "msie";
			vClient = RegExp.$1.match(numREG);
			uAgent.msie = vClient ? vClient[0] : 0;

			// 检测 trident 版本
			if(/^([\d\.]*)/.test(navigator.appVersion.toLowerCase())){
				vEngine = RegExp.$1.match(numREG);
				uAgent.trident = vEngine ? vEngine[0] : 0;
			}

			// 检测 Gecko
		}else if(/rv:([\d\.]*)[^\/]*gecko\/\d{8}/.test(Agent)){
			engine = "gecko";
			vEngine = RegExp.$1.match(numREG);
			uAgent.gecko = vEngine ? vEngine[0] : 0;

			// 检测 firefox
			if(/firefox\/([\d\.]*)/.test(Agent)){
				environment = "firefox";
				vClient = RegExp.$1.match(numREG);
				uAgent.firefox = vClient ? vClient[0] : 0;
			}
		}

		// gc
		numREG = null;

		uAgent.whois = environment;
		uAgent.ver = vClient ? vClient[0] : false;
		uAgent.engine = engine;
		uAgent.engineVer = vEngine;

		exports.uAgent = uAgent;

	})(dances);

	// dances.addCss
	dances && (function(exports){

		var
			addCss,
			newFlag
		;

		addCss = function(ss, hEl){

			// 劫持
			// 以防 保留第一次引用
			if(newFlag){
				return exports.addCss.apply(this, arguments);
			}

			var
				headEl = document.getElementsByTagName("head")[0],
				styleEl
			;

			styleEl = document.createElement("style");
			styleEl.type = "text/css";

			try{
				styleEl.appendChild(document.createTextNode(ss));
				styleEl = null;

				exports.addCss = function(ss, hEl){
					var styleEl;
					styleEl = document.createElement("style");
					styleEl.type = "text/css";
					styleEl.appendChild(document.createTextNode(ss));
					(hEl || headEl).appendChild(styleEl);

					return styleEl;
				}

			}catch(e){
				exports.addCss = function(ss, hEl){
					var styleEl;
					styleEl = document.createElement("style");
					styleEl.type = "text/css";
					styleEl.styleSheet.cssText = ss;
					(hEl || headEl).appendChild(styleEl);

					return styleEl;
				}

			}

			newFlag = true;

			return  exports.addCss.apply(this, arguments);
		};

		exports.addCss = addCss;

	})(dances);

	// dances.El
	dances && (function(exports){
		var
			rTag = /<[^\/<>]+>.+<[^<>]+>|<[^<>\s]+\s*\/?\s*>/
		;

		exports.El = function(/*sHtml, context*/){
			var args = Array.prototype.slice.call(arguments, 0),
				sHTML = args.shift(),
				doc,

				Els,
				archive,
				expect,

				item
				;

			if(!sHTML){
				return false;
			}

			// 嗅探 document
			doc = args.shift();
			if(doc && "function" === dances.type){
				doc = dances.type(doc);

				switch(doc){
					case "document":
						break;

					case "window":
						doc = doc.document;
						break;

					default :
						doc = document;
				}

			}else{
				doc = document;
			}

			sHTML = dances.trim(sHTML);

			if(!rTag.test(sHTML)){
				throw("dances.expect expects valid HTML construct");
			}

			archive = doc.createElement("div");
			archive.innerHTML = sHTML;

			if(archive.childNodes.length){
				Els = archive.childNodes;
				expect = [];
				while(item = Els[0]){
					expect.push(archive.removeChild(item));
				}
			}

			// ladder gc
			args =
				item =
					Els =
						doc =
							archive = null
			;

			return expect;
		};

	})(dances);

	dances && window.define && define.amd && define.amd.dancesDom && define(function(){
		return dances;
	});

})(window.dances);

