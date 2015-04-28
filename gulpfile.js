'use strict'

var packageJson = require('./package.json');
var sequence = require('run-sequence');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  rename: {
    'gulp-download-electron': 'electron'
  }
});

// App options
var options = {
  dev: process.argv.indexOf('release') === -1,
  app: 'Youdown.app',
  name: 'Youdown',
  icon: './src/resources/util/youdown.icns',
  bundle: 'com.youdown.youdown'
};

// Paths
var paths = {
  APP: ['src/index.html', 'src/browser.js'],
  FONTS: 'src/resources/fonts/**',
  IMAGES: 'src/resources/images/**',
  JS_FILES: ['src/scripts/*.js'],
  CSS_FILES: ['src/styles/**/*.less', 'src/styles/*.less'],
  BUILD: './build',
  DIST: './release/osx/' + options.app + '/Contents/Resources/' + options.name
};

// Download task
gulp.task('download', function(cb){
  $.electron({
    version: packageJson['electron-version'],
    outputDir: 'cache'
  }, cb);
});

// Copy task
gulp.task('copy', function(){
  return gulp.src(paths.APP)
  .pipe(gulp.dest(paths.BUILD))
  .pipe($.livereload());
});

// Fonts task
gulp.task('fonts', function(){
  return gulp.src(paths.FONTS)
  .pipe($.if(options.dev, $.changed(paths.BUILD)))
  .pipe(gulp.dest(paths.BUILD))
  .pipe($.if(options.dev, $.livereload()));
});

// Images task
gulp.task('images', function(){
  return gulp.src(paths.IMAGES)
  .pipe($.if(options.dev, $.changed(paths.BUILD)))
  .pipe(gulp.dest(options.dev ? paths.BUILD : paths.DIST))
  .pipe($.if(options.dev, $.livereload()));
});

// Styles task
gulp.task('styles', function(){
  return gulp.src('src/styles/main.less')
  .pipe($.plumber(function(error) {
      $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message + ' in ' + error.fileName));
      this.emit('end');
  }))
  .pipe($.if(options.dev, $.changed(paths.BUILD)))
  .pipe($.less())
  .pipe($.if(!options.dev, $.cssmin()))
  .pipe(gulp.dest(options.dev ? paths.BUILD : paths.DIST))
  .pipe($.if(options.dev, $.livereload()));
});

// Later use webpack to compile scripts
// Scripts task
gulp.task('scripts', function(){
  return gulp.src(paths.JS_FILES)
  .pipe($.plumber(function(error) {
      $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message + ' in ' + error.fileName));
      this.emit('end');
  }))
  .pipe($.if(options.dev, $.changed(paths.BUILD)))
  .pipe($.react({
    es6module: true
  }))
  .pipe($.babel({ blacklist: ['regenerator']}))
  .pipe(gulp.dest(options.dev ? paths.BUILD : paths.DIST))
  .pipe($.if(options.dev, $.livereload()));
});

// Build task
gulp.task('build', function(){
  var s = gulp.src('').pipe($.shell([

  ]));
});

// Release task
gulp.task('release', function(){
  sequence('compile', 'build');
});

// Compile task
gulp.task('compile', ['download'], function(cb){
  sequence('copy', 'fonts', 'images', 'styles', 'scripts', cb);
});

// Watch task
gulp.task('watch', ['compile'], function(){
  gulp.watch(paths.APP, ['copy']);
  gulp.watch(paths.JS_FILES, ['scripts']);
  gulp.watch(paths.CSS_FILES, ['styles']);

  $.livereload.listen();

  var env = process.env;
  env.NODE_ENV = 'development';
  return gulp.src('')
  .pipe($.shell(['./cache/Electron.app/Contents/MacOS/Electron .'], {
    env: env
  }));
});


// Default task
gulp.task('default', ['watch']);