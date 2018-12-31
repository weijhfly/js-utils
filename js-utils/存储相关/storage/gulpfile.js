let gulp = require('gulp');
let browserSync = require('browser-sync').create();

gulp.task('server',function() {
    browserSync.init({
        server: {
            baseDir: './example'
        }
    })
    gulp.watch(`example/*.html`).on('change', browserSync.reload);
	gulp.watch(`example/*.js`).on('change', browserSync.reload);
})