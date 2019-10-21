/**
 * storage-util v1.0.3
 * (c) 2019-2019 weijhfly https://github.com/weijhfly/js-utils
 * Licensed under MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.StorageUtil = factory());
}(this, function () { 'use strict';

	var StorageUtil = /** @class */ (function () {
	    function StorageUtil(type, callback) {
	        this.type = type ? type : 'sessionStorage';
	        this.success = typeof callback === 'object' ? callback.success : function () { };
	        this.fail = typeof callback === 'object' ? callback.fail : function () { };
	    }
	    StorageUtil.prototype.isSupport = function () {
	        return this.isCookie() ? document.cookie && navigator.cookieEnabled : typeof window[this.type] != 'undefined';
	    };
	    StorageUtil.prototype.get = function (key, callback) {
	        try {
	            var obj = key.split(','), res = this.master(obj, 'get');
	            if (callback) {
	                callback.apply(this, res);
	                return this;
	            }
	            else {
	                return obj.length > 1 ? res : res[0] || null;
	            }
	        }
	        catch (e) {
	            console.error(e);
	            return null;
	        }
	    };
	    StorageUtil.prototype.set = function (key, value, time) {
	        try {
	            var obj = {};
	            if (typeof key != 'object') {
	                obj[key] = value;
	            }
	            else {
	                time = value;
	                obj = key;
	            }
	            this.master(obj, 'set', time);
	            this.success();
	        }
	        catch (e) {
	            console.error(e);
	            this.fail();
	        }
	        return this;
	    };
	    StorageUtil.prototype.remove = function (key) {
	        try {
	            var obj = key.split(',');
	            this.master(obj, 'remove');
	        }
	        catch (e) {
	            console.error(e);
	        }
	        return this;
	    };
	    StorageUtil.prototype.setType = function (type) {
	        this.type = type || 'sessionStorage';
	        return this;
	    };
	    StorageUtil.prototype.master = function (obj, flag, time) {
	        var result = [], isCookie = this.isCookie(), _this = this;
	        if (flag == 'get') {
	            for (var o in obj) {
	                get(obj[o]);
	            }
	            return result;
	        }
	        else if (flag == 'set') {
	            for (var o in obj) {
	                set(o, obj[o], time);
	            }
	        }
	        else if (flag == 'remove') {
	            for (var o in obj) {
	                remove(obj[o]);
	            }
	        }
	        function get(key) {
	            if (isCookie) {
	                var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"), arr = document.cookie.match(reg), value = arr ? unescape(arr[2]) : null;
	                result.push(_this.isJson(value) || value);
	            }
	            else {
	                var value = window[_this.type][key];
	                result.push(_this.isJson(value) || value);
	            }
	        }
	        function set(key, value, time) {
	            var value = typeof value == 'object' ? JSON.stringify(value) : value;
	            if (isCookie) {
	                time = time || 2 * 60 * 60 * 1000;
	                var date = new Date();
	                date.setTime(date.getTime() + time);
	                document.cookie = key + "=" + escape(value) + ";expires=" + date.toUTCString();
	            }
	            else {
	                window[_this.type][key] = value;
	            }
	        }
	        function remove(key) {
	            if (isCookie) {
	                var date = new Date(), value = _this.get(key);
	                date.setTime(date.getTime() - 1);
	                if (value != null)
	                    document.cookie = key + "=" + value + ";expires=" + date.toUTCString();
	            }
	            else {
	                delete window[_this.type][key];
	            }
	        }
	    };
	    StorageUtil.prototype.isJson = function (str) {
	        var data;
	        try {
	            data = JSON.parse(str);
	        }
	        catch (e) {
	            return false;
	        }
	        return data;
	    };
	    StorageUtil.prototype.isCookie = function () {
	        return this.type === 'cookie';
	    };
	    return StorageUtil;
	}());

	return StorageUtil;

}));
