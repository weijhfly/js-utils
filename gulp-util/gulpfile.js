//加载gulp模块
var gulp = require('gulp');
//加载browser-sync模块
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
//加载less模块
var less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer');

/*var px2rem = require('gulp-px2rem-plugin');
* 该插件支持忽略指定的px、类名，但生成的rem附带不需要的小数，如0.2000rem，所以暂不使用
*/
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');

/**
 * 这里静态服务器 + 监听 html/css/less文件 js未监听，可添加
 */
gulp.task('server',function(){
    browserSync.init({
        server:'./', //这里指的是根目录，如果你的index.html在根目录下，会直接打开index页面，不然会显示Get Not，自己写路径就行
        port:8081  //默认打开localhost:3000,现在改成localhost:8081
    });
    //监听文件
    gulp.watch('css/*.less',['less']);
    gulp.watch('css/*.css').on('change',reload);
	//gulp.watch('js/*.js').on('change',reload);
	gulp.watch('*.html').on('change',reload);
});

/**
 * 编译less
 */
gulp.task('less', function () {   //创建gulp任务
	var processors = [px2rem({remUnit: 100})];
	
    gulp.src('css/*.less')   //获取所有less文件路径
        .pipe(less())　　　　　　　　   //执行less
		.pipe(autoprefixer({//补全前缀
			browsers: ['last 20 versions']
		}))
		//.pipe(px2rem({'width_design':750,'valid_num':6,'pieces':10,'ignore_px':[1,2],'ignore_selector':['.class1']}));
		//.pipe(px2rem({'width_design':750,'valid_num':2,'pieces':7.5}))
		.pipe(postcss(processors))
        .pipe(gulp.dest('css'));  //输出CSS文件路径
});
/**
 * 默认运行
 */
gulp.task('default',['server','less']);