//加载gulp模块
const gulp = require('gulp');

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

//const gulpIf = require('gulp-if');

const del = require('del');

const uglify = require('gulp-uglify');

//const gutil = require('gulp-util');
const minifyCss = require('gulp-clean-css');

const htmlmin = require('gulp-htmlmin');

const jshint = require('gulp-jshint');

const connect = require('gulp-connect');

const revdel = require('gulp-rev-delete-original');

/**
 * 静态服务器
 */
gulp.task('server', done => {
    connect.server({
        root: 'dist',//根目录
        livereload: true,//自动更新
        port: 9090//端口
    })
    done();
});

// 清空dist目录
gulp.task('clean', function () {
    return del(['dist']);
});


gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})

/**
 * 编译less
 */
gulp.task('css', done => {
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
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())

    done();
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        //.pipe(jshint())//检查代码
        .pipe(babel({//编译ES6
            presets: ['@babel/env']
        }))
        .pipe(uglify())//压缩js
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
})

/**
 * 压缩图片
 */
gulp.task('images', function () {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

/**
 * hash
 */
gulp.task("hash", done => {
    gulp
        .src("dist/**")
        .pipe(
            RevAll.revision({
                dontRenameFile: [/\.html$/]
            })
        )
        .pipe(revdel({
            exclude: function (file) {
                if (/\.html$/.test(file.name)) {
                    return true; //if you want to exclude the file from being deleted
                }
            }
        }))
        .pipe(gulp.dest("dist"))

    done();
});

gulp.task('watcher', done => { //监听变化
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/less/**/*.less', gulp.series('css'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/images/**/*', gulp.series('images'));

    done();
})

// 初始化
gulp.task('init', gulp.series('clean', gulp.parallel('html', 'css', 'js', 'images')));

// 开发
gulp.task('default', gulp.series('init', 'server', 'watcher'));

// 打包
gulp.task('build', gulp.series('hash'));