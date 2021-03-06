# storage-util [![npm](https://img.shields.io/npm/v/storage-util.svg)](https://www.npmjs.com/package/storage-util)
>一个整合sessionStorage、localStorage、cookie的小插件，你可以更方便地使用这三个存储对象，也无需担心因兼容性问题而导致页面崩溃报错。

### 安装
```js
npm install storage-util --save
```

### 使用方式

#### 相关参数
```js
/*
  type: 可选 值->sessionStorage(0)、localStorage(1)、cookie(2)之一，默认sessionStorage(0)
  success: 可选 设置成功后的回调，注意要放在对象里，下同
  fail: 可选 设置失败后的回调
  
  方法：
    get 获取值
    set 设置值
    remove 删除值
    isSupport 判断是否支持sessionStorage/localStorage/cookie
    setType 修改type
*/
var storage = new StorageUtil(type,{
  success:function(){
    console.log('成功了');
  },
  fail:function(){
    console.log('失败了');
  }
});
```
#### 环境检测  
注意：在兼容性方面，工具并不会自动降级处理，如果需要，可以在回调函数中做相关操作
```js
new StorageUtil().isSupport();//sessionStorage
// new StorageUtil('localStorage').isSupport(); 
new StorageUtil(1).isSupport();//localStorage
new StorageUtil(2).isSupport();//cookie
```
#### 增删改查  
设置cookie略有不同，可选设置时间
```js
//sessionStorage
var storage = new StorageUtil();

storage.set('sessionStoragekey',1);
storage.get('sessionStoragekey');//1
sessionStorage.sessionStoragekey//1

//localStorage
var storage = new StorageUtil(1);

storage.set('localStoragekey',1);
storage.get('localStoragekey');//1
localStorage.localStoragekey//1

//cookie
var storage = new StorageUtil(2),
    time = 5 * 60 * 60 * 1000; //5小时，默认2小时

storage.set('cookiekey',1,time);
console.log(storage.get('cookiekey'));//1
```
#### 链式调用  
由于get为取值操作，这里的链式操作只能是set或remove
```js
//set/remove
new StorageUtil().set('key1',1).set('key2',2).remove('key1').get('key2');//2
```
#### 直接存储对象  
无需手动转换对象数据
```js
//sessionStorage/localStorage/cookie
new StorageUtil().set('obj',{'test':1}).get('obj')//{test: 1}
new StorageUtil(1).set('obj',{'test':1}).get('obj')//{test: 1}
new StorageUtil(2).set('obj',{'test':1}).get('obj')//{test: 1}
```
#### 批量操作  
批量设置cookie时，time参数往前移一位
```js
//批量get
new StorageUtil().get('key1,key2');
//批量set sessionStorage/localStorage
new StorageUtil().set({ke1:1,key2:2});
//批量set cookie time 可选
var time = 5 * 60 * 60 * 1000;

new StorageUtil(2).set({ke1:1,key2:2},time);
//批量删除 sessionStorage/localStorage/cookie
new StorageUtil().remove('key1,key2');
```
#### 变换type  
只需一行代码，就可以玩转三个存储对象
```js
new StorageUtil().set('key1',1).setType(1).set('key2',2).
	.setType(2).set('key3',3)
```
#### 无限链式  
```js
new StorageUtil().set('msg','你翩翩地路过').get('msg',function(msg){
    console.log(msg);
  }).setType(1).set('msg','以为不曾留下什么').get('msg',function(msg){
    console.log(msg);
  }).setType(2).set('msg','却在我心里有了思念').get('msg',function(msg){
    console.log(msg);
  }).setType().set('msg','若你还记得').get('msg',function(msg){
    console.log(msg);
  }).setType(1).set('msg','那个蝉鸣的夏天').get('msg',function(msg){
    console.log(msg);
  }).setType(2).set('msg','有一个你，也有一个我').get('msg',function(msg){
    console.log(msg);
  })

```
#### 无限链式+批量  
```js
new StorageUtil().set({key3:3,key4:4}).get('key3,key4',function(key3,key4){
    console.log(key3,key4);
  }).remove('key3,key4');
```

#### 清空所有  
```js
new StorageUtil().clear();
new StorageUtil(1).clear();
new StorageUtil(2).clear();
```
### License

MIT
