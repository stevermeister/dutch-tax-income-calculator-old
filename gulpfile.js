var gulp = require('gulp');
var inject = require('gulp-inject');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

var targetPath = './build/target/';
var antiCacheMarker = +new Date();
var compiledAppFileName = 'app.' + antiCacheMarker + '.js';
var compiledLibsFileName = 'libs.' + antiCacheMarker + '.js';

var libs = [];
libs.push('bower_components/angular/angular.js');
libs.push('bower_components/angular-animate/angular-animate.js');
libs.push('bower_components/angular-aria/angular-aria.js');
libs.push('bower_components/angular-material/angular-material.js');

gulp.task('install', function() {

  gulp.src(libs).pipe(gulp.dest('./src/javascript/libs/'));
  gulp.src('bower_components/angular-material/angular-material.css').pipe(gulp.dest('./src/css/'));
  return gulp.src('./src/index.src.html', { base: 'src' })
    .pipe(rename('index.html'))
    .pipe(inject(gulp.src(['./src/css/main.css', './src/css/angular-material.css']), { ignorePath: '/src/' }))
    .pipe(inject(gulp.src('./src/javascript/libs/'), { ignorePath: '/src/' }))
    .pipe(inject(gulp.src(['./src/javascript/creditRates.js', './src/javascript/app.js']), { ignorePath: '/src/', starttag: '<!-- inject:app:js -->'}))
    .pipe(gulp.dest('./src/'));
});

gulp.task('compile-app', function() {
  return gulp.src([
    './src/javascript/creditRates.js',
    './src/javascript/app.js'
  ])
    .pipe(concat(compiledAppFileName))
    .pipe(gulp.dest(targetPath + 'javascript/'));
});

gulp.task('compile-libs', function() {
  return gulp.src(libs)
    .pipe(concat(compiledLibsFileName))
    .pipe(gulp.dest(targetPath + 'javascript/'));
});

gulp.task('copy-css', function() {
  return gulp.src(['./src/css/main.css', './src/css/angular-material.css'])
    .pipe(cssmin())
    .pipe(rename('main.' + antiCacheMarker + '.min.css'))
    .pipe(gulp.dest(targetPath + 'css/'))
});

gulp.task('build', ['copy-css', 'compile-app', 'compile-libs'], function() {
  return gulp.src('./src/index.src.html', { base: 'src' })
    .pipe(rename('index.html'))
    .pipe(inject(gulp.src(targetPath + 'css/main.' + antiCacheMarker + '.min.css'), { ignorePath: '/build/target' }))
    .pipe(inject(gulp.src([
      targetPath + 'javascript/' + compiledLibsFileName,
      targetPath + 'javascript/' + compiledAppFileName]), { ignorePath: '/build/target' }))
    .pipe(gulp.dest(targetPath));
});