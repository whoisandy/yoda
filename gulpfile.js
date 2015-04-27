'use strict'

var packageJson = require('./package.json');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  rename: {
    'gulp-download-electron': 'electron'
  }
});

// Paths
var paths = {
  APP: ['src/index.html', 'src/browser.js'],
  FONTS: 'src/resources/fonts/**',
  IMAGES: 'src/resources/images/**',
  JS_FILES: ['src/scripts/*.js'],
  CSS_FILES: ['src/styles/**/*.less', 'src/styles/*.less'],
  BUILD: './build',
  DIST: './dist'
};

// Download task
gulp.task('download', function(cb){
  $.electron({
    version: packageJson['electron-version'],
    outputDir: '.cache'
  }, cb);
});

// Copy task
gulp.task('copy', function(){
  gulp.src(paths.APP)
  .pipe(gulp.dest(paths.BUILD))
  .pipe($.livereload());
});

// Fonts task
gulp.task('fonts', function(){
  gulp.src(paths.FONTS)
  .pipe(gulp.dest(paths.BUILD))
  .pipe($.livereload());
});

// Images task
gulp.task('images', function(){
  gulp.src(paths.IMAGES)
  .pipe(gulp.dest(paths.BUILD))
  .pipe($.livereload());
});

// Styles task
gulp.task('styles', function(){
  gulp.src('src/styles/main.less')
  .pipe($.plumber(function(error) {
      $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message + ' in ' + error.fileName));
      this.emit('end');
  }))
  .pipe($.less())
  .pipe(gulp.dest(paths.BUILD))
  .pipe($.livereload());
});

// Scripts task
gulp.task('scripts', function(){
  gulp.src(paths.JS_FILES)
  .pipe($.plumber(function(error) {
      $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message + ' in ' + error.fileName));
      this.emit('end');
  }))
  .pipe($.react({
    es6module: true
  }))
  .pipe($.babel({ blacklist: ['regenerator']}))
  .pipe(gulp.dest(paths.BUILD))
  .pipe($.livereload());
});

// Default task
gulp.task('default', ['download', 'copy', 'fonts', 'images',  'styles', 'scripts'], function(){
  gulp.watch(paths.APP, ['copy']);
  gulp.watch(paths.JS_FILES, ['scripts']);
  gulp.watch(paths.CSS_FILES, ['styles']);

  $.livereload.listen();

  var env = process.env;
  env.NODE_ENV = 'development';
  gulp.src('').pipe($.shell(['./.cache/Electron.app/Contents/MacOS/Electron .'], {
    env: env
  }));
});