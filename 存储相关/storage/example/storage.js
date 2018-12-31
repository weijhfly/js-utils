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
        get: function(key,callback) {
            try {
                var obj = key.split(','),
                    res = this.master(obj,'get');

                if(callback){
                    callback.apply(this,res);
                    return this;
                }else{
                    return obj.length > 1? res : res[0] || null;
                }
            } catch(e) {
                console.error(e);
                return null;
            }
        },
        set: function(key, value, time) {
            try {
                var obj = {};

                if(typeof key != 'object'){
                    obj[key] = value;
                }else{
                    var time = value;

                    obj = key;
                }
                this.master(obj,'set',time);

                this.success();
            } catch(e) {
                console.error(e);
                this.fail();
            }
            return this;
        },
        remove: function(key) {
            try {
                var obj = key.split(',');

                this.master(obj,'remove');
            } catch(e) {
                console.error(e);
            }
            return this;
        },
        setType:function(type){
            this.type = type;

            return this;
        },
        master:function(obj,flag,time){
            var result = [],
                isCookie = this.isCookie(),
                _this = this;

            if(flag == 'get'){
                for(var o in obj){
                     get(obj[o]);
                }
                return result;
            }else if(flag == 'set'){
                for(var o in obj){
                     set(o,obj[o],time);
                }
            }else if(flag == 'remove'){
                for(var o in obj){
                     remove(obj[o]);
                }
            }
            function get(key){
                if(isCookie){
                    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)"),
                        arr = document.cookie.match(reg),
                        value = arr? unescape(arr[2]) : null;

                    result.push(_this.isJson(value) || value);
                }else{
                    var value = window[_this.type][key];

                    result.push(_this.isJson(value) || value);
                }
            }
            function set(key,value,time){
                var value = typeof value == 'object' ? JSON.stringify(value) : value;

                if(isCookie){
                    time = time || 2 * 60 * 60 * 1000;

                    var date = new Date();
                        
                    date.setTime(date.getTime() + time);
                    document.cookie = key + "=" + escape(value) + ";expires=" + date.toGMTString();
                }else{
                    window[_this.type][key] = value;
                }
            }
            function remove(key){
                if(isCookie){
                    var exp = new Date(),
                        value = _this.get(key);

                    exp.setTime(exp.getTime() - 1);

                    if (value != null) document.cookie = key + "=" + value + ";expires=" + exp.toGMTString();
                }else{
                    delete window[_this.type][key];
                }
            }
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