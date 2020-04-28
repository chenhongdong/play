/**
 * 统计代码
 * author : 远古时期的某人[战毅]、曜子、屈屈（本版维护:quguangyu@360.cn）
 * update : 2014.07.30
 * v1.3.1-modify (2014.07.30) 删掉了移动搜索用不到的方法
 */
(function(window) {
	var version = 'v1.3.1-modify (2014.07.30)';

	var QIHOO_MONITOR = (function(window, undefined) {
		var doc = document,
			nav = navigator,
			screen = window.screen,
			domain = document.domain.toLowerCase(),
			ua = nav.userAgent.toLowerCase();

		/**
		 * Object相关方法
		 * @type {Object}
		 */
		var ObjectH = (function() {
			function getConstructorName(o) {
				//加o.constructor是因为IE下的window和document
				if(o != null && o.constructor != null){
					return  Object.prototype.toString.call(o).slice(8, -1);
				}else{
					return '';
				}
			}

			return {
				/**
				 * 判断一个变量是否Array对象
				 * @param  {Object}  obj 目标变量
				 * @return {Boolean}
				 */
				isArray: function(obj) {
					return getConstructorName(obj) == 'Array';
				},

				/**
				 * 判断一个变量是否typeof object
				 * @param  {Object}  obj 目标变量
				 * @return {Boolean}
				 */
				isObject: function(obj) {
					return obj !== null && typeof obj == 'object';
				},

				/**
				 * 将源对象的属性并入到目标对象
				 * @param  {Object} des      目标对象
				 * @param  {Object} src      源对象，如果是数组，则依次并入
				 * @param  {Boolean} override 是否覆盖已有属性
				 * @return {Object}          des
				 */
				mix: function(des, src, override) {
					for (var i in src) {
						//这里要加一个des[i]，是因为要照顾一些不可枚举的属性
						if (override || !(des[i] || (i in des))) {
							des[i] = src[i];
						}
					}
					return des;
				},

				/**
				 * 将Object序列化为key=val键值对字符串，不处理val为数组的情况]
				 * @param  {Object} json 需要序列化的对象
				 * @return {String}      序列化后的字符串
				 */
				encodeURIJson : function(obj){
					var result = [];
					for( var p in obj ){
						var val = obj[p];

						/*过滤 value 等于 undefined 或 null 的情况*/
						if(val == null) continue;

						/*如果 key 是某些特殊字符，过滤掉*/
						if(/^(password|pass|username)$/i.test(p)) {
							p = '__key__';
							val = '__val__';
						}

						/*如果 value 包含特殊字符，过滤掉*/
						if(/(password|pass|username)=/i.test(val)) {
							val = '__val__';
						}

						result.push( encodeURIComponent(p) + '=' + encodeURIComponent(val));
					}
					return result.join('&');
				}
			};
		})();

		/**
		 * Cookie读写操作的封装
		 * @type {Object}
		 */
		var Cookie = {
			get : function(key) {
				try {
					var a, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
					if(a = doc.cookie.match(reg)){
						return unescape(a[2]);
					}else{
						return "";
					}
				} catch(e) {
					return "";
				}
			},
			set : function(key, val, options) {
				options = options || {};
				var expires = options.expires;

				if(typeof(expires) === "number"){
					expires = new Date();
					expires.setTime(expires.getTime() + options.expires);
				}

				try {
					doc.cookie =
						key + "=" + escape(val)
						+ (expires ? ";expires=" + expires.toGMTString() : "")
						+ (options.path ? ";path=" + options.path : "")
						+ (options.domain ? "; domain=" + options.domain : "");
				} catch(e) {}
			}
		};

		/**
		 * 工具集，用来获取具体项目的值
		 * 可通过QIHOO_MONITOR.util.[方法名]来访问
		 * 增加或覆盖这里的方法，可以实现更多功能
		 * @type {Object}
		 */
		var util = {
			getLocation : function() {
				var url = location.href;

				//去掉queryString和Hash
				url = url.replace(/[?#].*$/, '');

				//如果不是.html .htm .shtml .php结尾的url，补上/
				url = /\.(s?htm|php)/.test(url) ? url : (url.replace(/\/$/,'') + '/');

				return url;
			},

			getGuid : (function() {
				function hash(s) {
					var h = 0,
						g = 0,
						i = s.length - 1;
					for(i; i>= 0; i--) {
						var code = parseInt(s.charCodeAt(i), 10);
						h = ((h << 6) & 0xfffffff) + code + (code << 14);
						if ((g = h & 0xfe00000) != 0) {
							h = (h ^ (g >> 21));
						}
					}
					return h;
				}

				function guid() {
					var s = [nav.appName, nav.version, nav.language || nav.browserLanguage, nav.platform, nav.userAgent, screen.width, 'x', screen.height, screen.colorDepth, doc.referrer].join(""),
						sLen = s.length,
						hLen = window.history.length;

					while(hLen) {
						s += (hLen--) ^ (sLen++);
					}

					return (Math.round(Math.random() * 2147483647) ^ hash(s)) * 2147483647;
				}

				var guidKey = '__guid',
					id = Cookie.get(guidKey);

				if(!id) {
					id = [ hash(domain), guid(), +new Date + Math.random() + Math.random() ].join('.');

					var config = {
						expires : 24 * 3600 * 1000 * 300,
						domain : document.domain.replace(/^.*?(\w+\.\w+)$/i, '$1'),
						path : '/'
					};

					Cookie.set(guidKey, id, config);
				}

				return function() {
					return id;
				};
			})()
		};

		/**
		 * 获取数据集合的方法
		 * 可通过QIHOO_MONITOR.data.[方法名]来访问
		 * 增加或覆盖这里的方法，可以实现更多功能
		 * @type {Object}
		 */
		var data = {
			getBase : function() {
				return { };
			}
		};

		/**
		 * 配置项
		 * @type {Object}
		 */
		var config = { };

		return {
			version : version,

			util : util,

			data : data,

			config : config,

			sendLog : (function() {
				window.__qihoo_monitor_imgs = {};

				return function(url) {
					var id = 'log_' + (+new Date),
						img = window['__qihoo_monitor_imgs'][id] = new Image();

					img.onload = img.onerror = function() {
						if(window.__qihoo_monitor_imgs && window['__qihoo_monitor_imgs'][id]) {
							window['__qihoo_monitor_imgs'][id] = null;
							delete window["__qihoo_monitor_imgs"][id];
						}
					};
					
                    img.src = url;
				};
			})(),

			buildLog : (function() {
				var lastLogParams = '';

				return function(params, url, excludeParams) {
					if(params === false) return;

					params = params || {};

					var baseParams = data.getBase();
					params = ObjectH.mix(baseParams, params, true);

					var logParams = url + ObjectH.encodeURIJson(params);
					if(logParams == lastLogParams) {
						return;
					}

					lastLogParams = logParams;
					setTimeout(function() { //100ms后允许发相同数据
						lastLogParams = '';
					}, 100);

					//需要排除的参数，通过这里来过滤
					if(excludeParams) {
						excludeParams.forEach(function(key) {
							delete params[key];
						});
					}

					var sendParams = ObjectH.encodeURIJson(params);
					sendParams += '&t=' + (+ new Date); //加上时间戳，防止缓存

					url = url.indexOf('?') > -1 ?
						url + '&' + sendParams :
						url + '?' + sendParams;

					this.sendLog(url);
				};
			})(),

			log : function(params, type, excludeParams) {
				type = type || 'click';

				var url = config[type + 'Url'];

				/*如果没配置打点url，就什么都不做*/
				if(url) {
					this.buildLog(params, url, excludeParams);
				}
			},

			setConf : function(key, val) {
				var newConfig = {};
				if(!ObjectH.isObject(key)) {
					newConfig[key] = val;
				} else {
					newConfig = key;
				}

				this.config = ObjectH.mix(this.config, newConfig, true);
				return this;
			},

			setUrl : function(url) {
				if(url) {
					this.util.getLocation = function() {
						return url;
					};
				}
				return this;
			}
		};
	})(window);

	window.monitor = QIHOO_MONITOR;
})(window);