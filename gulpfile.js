var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var server = require('gulp-webserver');
var livereload = require('gulp-livereload');


gulp.task('serve', function(){
  return gulp.src('./')
    .pipe(server({
      livereload: true,
      open: true,
    }));
});

gulp.task('copy', function(){
  return gulp.src(['./pages/index.html', './pages/bg.png', './pages/yoda.png', './pages/screen.png'])
    .pipe(gulp.dest('./'));
});

gulp.task('icons', function(){
  return gulp.src('./pages/fonts/**')
    .pipe(gulp.dest('./fonts/'));
});

gulp.task('less', function(){
  return gulp.src('./pages/index.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['serve', 'copy', 'icons', 'less'], function(){
  gulp.watch('./pages/index.html', ['copy']);
  gulp.watch('./pages/index.less', ['less']);

  livereload.listen();
});
