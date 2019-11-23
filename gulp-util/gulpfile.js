//加载gulp模块
const gulp = require('gulp');
//加载browser-sync模块
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
//加载less模块
const less = require('gulp-less');
//补全css前缀
const autoprefixer = require('gulp-autoprefixer');

//rem转换
const postcss = require('gulp-postcss');
const px2rem = require('postcss-px2rem');

//图片压缩
const imagemin = require('gulp-imagemin');

//文件加hash
const RevAll = require("gulp-rev-all");

const babel = require('gulp-babel');

const gulpIf = require('gulp-if');

const del = require('del');

const uglify = require('gulp-uglify');

//const gutil = require('gulp-util');
const minifyCss = require('gulp-clean-css');

const htmlmin = require('gulp-htmlmin');

/**
 * 这里静态服务器 + 监听 html/css/less等文件
 */
gulp.task('server', done => {
    browserSync.init({
        server: 'src', //这里指的是根目录，如果你的index.html在根目录下，会直接打开index页面，不然会显示Get Not，自己写路径就行
        port: 8081,  //默认打开localhost:3000,现在改成localhost:8081
        open: false
    });
    //监听文件
    gulp.watch('src/less/**/*.less', gulp.series('less'));
    gulp.watch('src/css/**/*.css').on('change', reload);
    gulp.watch('src/js/**/*.js').on('change', reload);
    gulp.watch('src/**/*.html').on('change', reload);
    done();
});

/**
 * 编译less
 */
gulp.task('less', done => {
    var processors = [px2rem({ remUnit: 100 })];

    gulp.src('src/less/**/*.less')   //获取所有less文件路径
        .pipe(less())　　　　　　　　   //执行less
        .pipe(autoprefixer({//补全前缀
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        }))
        .pipe(postcss(processors))//px转rem tips: 如果某个px不转换，可使用大写代替，类似1PX
        .pipe(gulp.dest('src/css'));  //输出CSS文件路径
    done();
});
// 清空dist目录
gulp.task('clean', function () {
    return del(['dist']);
});

let isImage = function (file) {
    if (file.history[0].match(/\.jpg|\.jpeg|\.png/i)) {
        return true;
    } else {
        return false;
    }
}

/**
 * hash
 */
gulp.task("hash", done => {
    gulp
        .src("src/**")
        .pipe(
            gulpIf('*.js', babel({
                presets: ['@babel/env']
            }))
        )
        .pipe(
            gulpIf('*.js', uglify())
        )
        .pipe(
            gulpIf('*.css', minifyCss())
        )
        .pipe(
            gulpIf('*.html', htmlmin({ collapseWhitespace: true }))
        )
        .pipe(
            gulpIf(isImage, imagemin())
        )
        .pipe(
            RevAll.revision({
                dontRenameFile: [/\.html$/, /\.less$/]
            })
        )
        .pipe(gulp.dest("dist"))

    done();
});

// 开发
gulp.task('default', gulp.parallel('server', 'less'));
// 打包
gulp.task('build', gulp.series('clean', gulp.parallel('hash')));