;(function() {
    'use strict';

    function StorageUtil(type, callback) {
        if (! (this instanceof StorageUtil)) {
            return new StorageUtil(type, callback);
        }

        this.type = type ? type: 'sessionStorage';
        this.success = typeof callback === 'object' ? callback.success: function(){};
        this.fail = typeof callback === 'object' ? callback.fail: function(){};

        return this;
    }

    StorageUtil.prototype = {
        constructor: StorageUtil,
        isSupport: function() {
            return this.isCookie ? document.cookie && navigator.cookieEnabled: typeof window[this.type] != 'undefined';
        },
        get: function(key) {
            try {
                if (this.isCookie()) {
                    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"),
                    arr = document.cookie.match(reg);

                    if (arr) {
                        var value = unescape(arr[2]);
                        
                        return this.isJson(value) || value;
                    } else {
                        return null;
                    }
                } else {
                    var value = window[this.type][key];
                    return this.isJson(value) || value;
                }
            } catch(e) {
                console.error(e);
                return null;
            }
        },
        set: function(key, value, time) {
            try {
                var value = typeof value == 'object' ? JSON.stringify(value) : value;

                if (this.isCookie()) {
                    var time = time || 2 * 60 * 60 * 1000,
                    date = new Date();

                    date.setTime(date.getTime() + time);

                    document.cookie = key + "=" + escape(value) + ";expires=" + date.toGMTString();
                } else {
                    window[this.type][key] = value;
                }
                this.success();
            } catch(e) {
                console.error(e);
                this.fail();
            }
            return this;
        },
        remove: function(key) {
            try {
                if (this.isCookie()) {
                    var exp = new Date();

                    exp.setTime(exp.getTime() - 1);

                    var content = this.get(key);

                    if (content != null) document.cookie = key + "=" + content + ";expires=" + exp.toGMTString();

                } else {
                    delete window[this.type][key];
                }
            } catch(e) {
                console.error(e);
            }
            return this;
        },
        setType:function(type){
            this.type = type;

            return this;
        },
        isJson: function(str) {
            var data;
            try {
                data = JSON.parse(str);
            } catch(e) {
                return false;
            }
            return data;
        },
        isCookie: function() {
            return this.type === 'cookie';
        }
    }

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return StorageUtil;
        });
    } else if (typeof exports === "object") {
        module.exports = StorageUtil;
    } else {
        window.StorageUtil = StorageUtil;
    }
})();