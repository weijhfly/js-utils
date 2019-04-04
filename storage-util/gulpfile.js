var pkg = require('./package.json');
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var replaceName = require('gulp-replace-name');
var header = require('gulp-header');
var browserSync = require('browser-sync').create();
var banner = header('/*! \n <%= pkg.name %> v<%= pkg.version %>\n <%= pkg.description %> \n License: <%= pkg.license %>\n <%= pkg.repository.url %> By <%= pkg.author %>\n */\n ;', {pkg: pkg});

// ES6转化为ES5
gulp.task("build", function () {
  return browserify('./src/storage-util.js')
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(rename('storage-util.js'))
    .pipe(banner)
    .pipe(gulp.dest('./dist'))
    .pipe(streamify(uglify()))
    .pipe(banner)
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