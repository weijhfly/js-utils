var pkg = require('./package.json');
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var replaceName = require('gulp-replace-name');
var header = require('gulp-header');
var browserSync = require('browser-sync').create();

// 打包
gulp.task("build", function () {
  return browserify('./src/index.js')
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .pipe(source('md5-util.js'))
    .pipe(header('/*! \n <%= pkg.name %> v<%= pkg.version %>\n <%= pkg.description %> \n License: <%= pkg.license %>\n <%= pkg.repository.url %> By <%= pkg.author %>\n */\n ;', {pkg: pkg}))
    .pipe(gulp.dest('./dist'))
    .pipe(streamify(uglify()))
    .pipe(header('/*! <%= pkg.name %> v<%= pkg.version %> <%= pkg.description %> License: <%= pkg.license %> <%= pkg.repository.url %> By <%= pkg.author %> */ ;', {pkg: pkg}))
    .pipe(streamify(replaceName(/\.js/g, '.min.js')))
    .pipe(gulp.dest('./dist'))
});

gulp.task('server',function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
    gulp.watch(`dist/*.html`).on('change', browserSync.reload);
	gulp.watch(`dist/*.js`).on('change', browserSync.reload);
})

gulp.task('watch', function(){
    gulp.watch('src/*.js', ['build']);
}); 
/**
 * 默认运行
 */
gulp.task('default',['watch','server']);