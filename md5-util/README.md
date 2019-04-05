# md5-util [![npm](https://img.shields.io/npm/v/md5-util.svg)](https://www.npmjs.com/package/md5-util) 
>拓展spark-md5，支持计算网络文件md5的小插件。

### 安装
```js
npm install md5-util --save
```

### 使用方式

#### 计算本地文件md5
```js
SparkMD5.file(file,function(md5){
  //如果文件读取失败，md5为null
  console.log(md5)
})
```

#### 计算网络文件md5
```js
/*
 使用了XMLHttpRequest responseType = 'blob'，在部分浏览器存在兼容性问题，
 已知ios uc浏览器及安卓5.1.1系统浏览器中返回blob不正确，导致md5计算错误，
 如果要计算网络文件请慎用，或者计算已知md5的网络文件，对比md5是否准确，考量使用。
*/

SparkMD5.file(url,function(md5){
  //网络请求失败、文件读取失败等，md5为null
  console.log(md5)
})

//提前验证md5
var rightMd5 = '2b07d9a0a5f3918d876f5acfb8416401';
SparkMD5.file('https://weijhfly.github.io/favicon.ico',function(md5){
  if(md5 && md5 !== rightMd5){
    console.log('md5计算错误，请停止使用');
  }
})
```

#### SparkMD5官方示例
```js
SparkMD5.hash('hello world')
//"5eb63bbbe01eeed093cb22bb8f5acdc3"
```
更多官方示例查看[SparkMD5](https://github.com/satazor/js-spark-md5)   
 
### 演示
[md5-util](https://weijhfly.github.io/md5-util.html "md5-util")(下方直接扫码即可体验)  

![rolldate](https://weijhfly.github.io/images/md5-util.png)   

### 浏览器兼容性
除了计算网络文件md5外，兼容性与SparkMD5一致，关于计算网络文件md5兼容性问题，请参考上面：使用方式>计算网络文件md5

### License

MIT