/**
 * @name dances.uAgent
 */
(function(exports){

	var
		agent
	;

	agent = function(){
		var
			sAgent = navigator.userAgent.toLowerCase(),

			uAgent = {
				ua: sAgent
			},

			rVer = /^\d*\.\d*/,
			vClient,
			vEngine,
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
			if(/presto\/([\d\.]*)/.test(sAgent)){
				vEngine = RegExp.$1.match(rVer);
				uAgent.presto = vEngine ? vEngine[0] : 0;
			}

			// 检测 webkit
		}else if(/applewebkit\/([\d\.]*)/.test(sAgent)){
			engine = "webkit";
			vEngine = RegExp.$1.match(rVer);
			uAgent.webkit = vEngine ? vEngine[0] : 0;

			// 检测 chrome
			if(/chrome\/([\d\.]*)/.test(sAgent)){
				environment = "chrome";
				vClient = RegExp.$1.match(rVer);
				uAgent.chrome = vClient ? vClient[0] : 0;

				// 检测 safari
			}else if(/safari\/([\d\.]*)/.test(sAgent)){
				environment = "safari";
				if(/version\/([\d\.]*)/.test(sAgent)){
					vClient = RegExp.$1.match(rVer);
					uAgent.safari = vClient ? vClient[0] : 0;
				}
			}

			// 检测 msie trident
		}else if(/msie\s*([\d\.]*)/.test(sAgent)){
			engine = "trident";
			environment = "msie";
			vClient = RegExp.$1.match(rVer);
			uAgent.msie = vClient ? vClient[0] : 0;

			// 检测 trident 版本
			if(/^([\d\.]*)/.test(navigator.appVersion.toLowerCase())){
				vEngine = RegExp.$1.match(rVer);
				uAgent.trident = vEngine ? vEngine[0] : 0;
			}

			// 检测 Gecko
		}else if(/rv:([\d\.]*)[^\/]*gecko\/\d{8}/.test(sAgent)){
			engine = "gecko";
			vEngine = RegExp.$1.match(rVer);
			uAgent.gecko = vEngine ? vEngine[0] : 0;

			// 检测 firefox
			if(/firefox\/([\d\.]*)/.test(sAgent)){
				environment = "firefox";
				vClient = RegExp.$1.match(rVer);
				uAgent.firefox = vClient ? vClient[0] : 0;
			}
		}

		uAgent.whois = environment;
		uAgent.ver = vClient ? vClient[0] : false;
		uAgent.engine = engine;
		uAgent.engineVer = vEngine;

		exports.uAgent = uAgent;
		exports.uAgent.agent = agent;

	};

	agent();

})(dances);
