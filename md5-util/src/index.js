let SparkMD5 = require('spark-md5');

SparkMD5.file = function(file, callback) {
	if(typeof file === 'string'){
		var request = new XMLHttpRequest();

		request.open('GET', file, true);
		request.responseType = 'blob';
		request.onload = function(e) {
			if(e.target.status == 200){
				SparkMD5.file(request.response,callback);
			}else{
				console.error(e);
				callback(null);
			}
		};
		request.onerror = function(e){
			console.error(e);
			callback(null);
		}
		request.send();
		return;
	}
	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        chunkSize = 2097152, // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();

    fileReader.onload = function (e) {
        spark.append(e.target.result);
        currentChunk++;

        if (currentChunk < chunks) {
            loadNext();
        } else {
            callback(spark.end());
        }
    };

    fileReader.onerror = function () {
        console.error('文件读取失败');
        callback(null);
    };

    function loadNext() {
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
}
if (typeof define === 'function' && define.amd) {
	define(function() {
		return SparkMD5;
	});
} else if(typeof window === "object"){
	window.SparkMD5 = SparkMD5;
} else if (typeof exports === "object") {
	module.exports = SparkMD5;
}