var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
  gulp.src('dist/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browserSync.reload({stream: true}));
});

//Watch task
gulp.task('watch',function() {

  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('dist/scss/**/*.scss',['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('run', ['styles', 'watch']);
