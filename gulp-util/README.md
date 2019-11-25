# gulp-util
>配置gulp，实现自动刷新 + 编译ES6/less + 补全css前缀 + px转rem + 压缩图片 + 压缩代码等，方便写纯静态页。

### 安装
```js
npm install
//如果没有全局安装gulp,需要进行全局安装
npm install -g gulp
```
### 运行
```js
gulp // 运行本地服务
gulp build // 打包,前后端不分离项目建议去除代码压缩、忽略css hash计算(gulp-rev-all->dontRenameFile)
```