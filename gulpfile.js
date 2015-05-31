'use strict'

var packageJson = require('./package.json');
var sequence = require('run-sequence');
var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')({
  rename: {
    'gulp-download-electron': 'electron'
  }
});

// Application dependencies
var dependencies = Object.keys(packageJson.dependencies);

// App options
var options = {
  dev: process.argv.indexOf('release') === -1,
  app: 'Youdown.app',
  dmg: 'Youdown-1.0.0.dmg',
  name: 'Youdown',
  icon: './src/resources/utils/youdown.icns',
  plist: './src/resources/utils/Info.plist',
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
  TMP: './.tmp',
  RELEASE: './release'
};

// Clean build task
gulp.task('clean:build', function(cb){
  del([
    paths.BUILD
  ], cb);
});

// Clean Release task
gulp.task('clean:release', function(cb){
  del([
    paths.TMP,
    paths.RELEASE
  ], cb);
});

// Download task
gulp.task('download', ['clean:build'], function(cb){
  $.electron({
    version: packageJson['electron-version'],
    outputDir: 'cache'
  }, cb);
});

// Copy task
gulp.task('copy', function(){
  return gulp.src(paths.APP)
  .pipe(gulp.dest(options.dev ? paths.BUILD : paths.TMP))
  .pipe($.livereload());
});

// Fonts task
gulp.task('fonts', function(){
  return gulp.src(paths.FONTS)
  .pipe($.if(options.dev, $.changed(paths.BUILD)))
  .pipe(gulp.dest(options.dev ? paths.BUILD : paths.TMP))
  .pipe($.if(options.dev, $.livereload()));
});

// Images task
gulp.task('images', function(){
  return gulp.src(paths.IMAGES)
  .pipe($.if(options.dev, $.changed(paths.BUILD)))
  .pipe(gulp.dest(options.dev ? paths.BUILD : paths.TMP))
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
  .pipe(gulp.dest(options.dev ? paths.BUILD : paths.TMP))
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
  .pipe($.babel({ blacklist: ['regenerator']}))
  .pipe(gulp.dest(options.dev ? paths.BUILD : paths.TMP))
  .pipe($.if(options.dev, $.livereload()));
});

// Build task
gulp.task('build', function(){
  var s = gulp.src('').pipe($.shell([
    'rm -rf ./release',
    'mkdir -p <%= release %>',
    'cp -R <%= electron_app %> <%= release_app %>',
    'mv <%= release_electron %> <%= release_youdown %>',
    'mkdir -p <%= release_build %> <%= release_build %>/build <%= release_modules %>',
    'cp package.json <%= release_build %>/',
    'cp -R .tmp/** <%= release_build %>/build/',
    'cp <%= release_youdown_icon %> <%= release_electron_icon %>',
    'cp <%= release_youdown_plist %> <%= release_plist %>',

    '/usr/libexec/PlistBuddy -c "Set :CFBundleVersion <%= release_version %>" <%= release_plist %>',
    '/usr/libexec/PlistBuddy -c "Set :CFBundleDisplayName <%= release_name %>" <%= release_plist %>',
    '/usr/libexec/PlistBuddy -c "Set :CFBundleName <%= release_name %>" <%= release_plist %>',
    '/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier <%= release_bundle %>" <%= release_plist %>',
    '/usr/libexec/PlistBuddy -c "Set :CFBundleExecutable <%= release_name %>" <%= release_plist %>'
  ], {
    templateData: {
      electron_app: './cache/Electron.app',
      release: './release/osx',
      release_app: './release/osx/' + options.app,
      release_build: './release/osx/' + options.app + '/Contents/Resources/app',
      release_modules: './release/osx/' + options.app + '/Contents/Resources/app/node_modules',
      release_electron: './release/osx/' + options.app + '/Contents/MacOS/Electron',
      release_youdown: './release/osx/' + options.app + '/Contents/MacOS/' + options.name,
      release_youdown_icon: options.icon,
      release_electron_icon: './release/osx/' + options.app + '/Contents/Resources/atom.icns',
      release_plist: './release/osx/' + options.app + '/Contents/Info.plist',
      release_youdown_plist: options.plist,
      release_name: options.name,
      release_bundle: options.bundle,
      release_version: packageJson.version
    }
  }));

  dependencies.forEach(function(d){
    s = s.pipe($.shell([
      'cp -R node_modules/' + d + ' <%= release_modules %>'
    ], {
      templateData: {
        release_modules: './release/osx/' + options.app + '/Contents/Resources/app/node_modules/'
      }
    }));
  });

  return s;
});

// Release task
gulp.task('release', function(cb){
  sequence('compile', 'build', 'dmg', 'clean:release', cb);
});

// Build a disk image file
gulp.task('dmg', function(){
  var s = gulp.src('').pipe($.shell([
    'rm -rf ./dist',
    'mkdir -p ./dist',
    'node_modules/.bin/appdmg ./appdmg.json <%= release_dmg %>'
  ], {
    templateData: {
      release_dmg: './dist/' + options.dmg
    }
  }));

  return s;
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
  gulp.src('')
  .pipe($.shell(['./cache/Electron.app/Contents/MacOS/Electron .'], {
    env: env
  }));
});


// Default task
gulp.task('default', ['watch']);