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
SparkMD5.file(url,function(md5){
  //跨域、网络请求、文件读取失败等，md5为null
  console.log(md5)
})
```

#### SparkMD5官方示例
```js
SparkMD5.hash('hello world')
//"5eb63bbbe01eeed093cb22bb8f5acdc3"
```
更多官方示例查看[SparkMD5](https://github.com/satazor/js-spark-md5)   
 
#### 演示
[md5-util](https://weijhfly.github.io/md5-util.html "md5-util")(下方直接扫码即可体验)  

![rolldate](https://weijhfly.github.io/images/md5-util.png)
### License

MIT