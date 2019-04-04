/*! 
 storage-util v1.0.2
 整合sessionStorage、localStorage、cookie的小插件 
 License: MIT
 https://github.com/weijhfly/js-utils By weijhfly
 */
 ;(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageUtil = function () {
	function StorageUtil(type, callback) {
		_classCallCheck(this, StorageUtil);

		if (!(this instanceof StorageUtil)) {
			return new StorageUtil(type, callback);
		}

		this.type = type ? type : 'sessionStorage';
		this.success = (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' ? callback.success : function () {};
		this.fail = (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' ? callback.fail : function () {};
	}

	_createClass(StorageUtil, [{
		key: 'isSupport',
		value: function isSupport() {
			return this.isCookie() ? document.cookie && navigator.cookieEnabled : typeof window[this.type] != 'undefined';
		}
	}, {
		key: 'get',
		value: function get(key, callback) {
			try {
				var obj = key.split(','),
				    res = this.master(obj, 'get');

				if (callback) {
					callback.apply(this, res);
					return this;
				} else {
					return obj.length > 1 ? res : res[0] || null;
				}
			} catch (e) {
				console.error(e);
				return null;
			}
		}
	}, {
		key: 'set',
		value: function set(key, value, time) {
			try {
				var obj = {};

				if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'object') {
					obj[key] = value;
				} else {
					time = value;

					obj = key;
				}
				this.master(obj, 'set', time);

				this.success();
			} catch (e) {
				console.error(e);
				this.fail();
			}
			return this;
		}
	}, {
		key: 'remove',
		value: function remove(key) {
			try {
				var obj = key.split(',');

				this.master(obj, 'remove');
			} catch (e) {
				console.error(e);
			}
			return this;
		}
	}, {
		key: 'setType',
		value: function setType(type) {
			this.type = type || 'sessionStorage';

			return this;
		}
	}, {
		key: 'master',
		value: function master(obj, flag, time) {
			var result = [],
			    isCookie = this.isCookie(),
			    _this = this;

			if (flag == 'get') {
				for (var o in obj) {
					get(obj[o]);
				}
				return result;
			} else if (flag == 'set') {
				for (var o in obj) {
					set(o, obj[o], time);
				}
			} else if (flag == 'remove') {
				for (var o in obj) {
					remove(obj[o]);
				}
			}
			function get(key) {
				if (isCookie) {
					var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"),
					    arr = document.cookie.match(reg),
					    value = arr ? unescape(arr[2]) : null;

					result.push(_this.isJson(value) || value);
				} else {
					var value = window[_this.type][key];

					result.push(_this.isJson(value) || value);
				}
			}
			function set(key, value, time) {
				var value = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' ? JSON.stringify(value) : value;

				if (isCookie) {
					time = time || 2 * 60 * 60 * 1000;

					var date = new Date();

					date.setTime(date.getTime() + time);
					document.cookie = key + "=" + escape(value) + ";expires=" + date.toGMTString();
				} else {
					window[_this.type][key] = value;
				}
			}
			function remove(key) {
				if (isCookie) {
					var date = new Date(),
					    value = _this.get(key);

					date.setTime(date.getTime() - 1);

					if (value != null) document.cookie = key + "=" + value + ";expires=" + date.toGMTString();
				} else {
					delete window[_this.type][key];
				}
			}
		}
	}, {
		key: 'isJson',
		value: function isJson(str) {
			var data;
			try {
				data = JSON.parse(str);
			} catch (e) {
				return false;
			}
			return data;
		}
	}, {
		key: 'isCookie',
		value: function isCookie() {
			return this.type === 'cookie';
		}
	}]);

	return StorageUtil;
}();

if (typeof define === 'function' && define.amd) {
	define(function () {
		return StorageUtil;
	});
} else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object") {
	window.StorageUtil = StorageUtil;
} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object") {
	module.exports = StorageUtil;
}

},{}]},{},[1]);
