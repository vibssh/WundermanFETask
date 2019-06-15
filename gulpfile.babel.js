/**
 * ========================================================
 * Name       : Gulp File
 * Project    : Wunderman Thomson Commerce Accorion FE Task 
 * Author     : Vaibhav Shringarpure
 * Created    : 15.06.2019 
 * ========================================================
 */

 'use strict';

 /**
  * Global Require
  */

 const gulp         = require('gulp'),
       path         = require('path'),
       fs           = require('fs'),
       prefix       = require('gulp-autoprefixer'),
       sass         = require('gulp-sass'),
       plumber      = require('gulp-plumber'),
       sourcemaps   = require('gulp-sourcemaps'),
       browserify   = require('browserify'),
       babelify     = require('babelify'),
       source       = require('vinyl-source-stream'),
       buffer       = require('vinyl-buffer'),
       uglify       = require('gulp-uglify'),
       clean        = require('gulp-clean'),
       browserSync  = require('browser-sync');

/**
 * Directories / Paths
 */

const paths = {
  dist        : './dist',
  html        : './src/*.html',
  img         : './src/assets/img/**',
  sass        : './src/assets/scss/**/*.scss',
  js          : './src/assets/js/**/*.js',
  css         : './dist/assets/css/',
  script      : './dist/assets/js/',
  images      : './dist/assets/img/',
  htmlOutput  : './dist/'
}


/**
 * Scss files compile and put them in dist/assets/css folder
 */

gulp.task('sass', function() {
  return gulp.src(paths.sass)
      .pipe(sourcemaps.init())
      .pipe(plumber({
        handleError: function(err){
          console.log(err);
          this.emit('end');
        }
      }))
      .pipe(sass({
          includePaths: [paths.sass],
          outputStyle: 'compact'
        }).on('error', function(err){
          console.log(err.message);
          this.emit('end');
        })
      )
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.css))
});

/**
 * Compile JS Files
 */

gulp.task('js', function () {
  return browserify({entries: './src/assets/js/app.js', debug: true})
  .transform("babelify", { presets: ["@babel/preset-env"] })
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.script))
});


/**
 * Static HTML Files
 */

gulp.task('html', function() {
    gulp.src(paths.html)
        .pipe(gulp.dest(paths.htmlOutput));
});

/**
 * Static Image Files
 */

gulp.task('img', function() {
    gulp.src(paths.img)
        .pipe(gulp.dest(paths.images));
});


/**
 * Clean
 */
gulp.task('clean', function() {
  return gulp.src(['dist/*'], {read: false})
    .pipe(clean());
});


/**
 * Launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'js', 'html', 'img'],  function() {
  browserSync({
    server: {
      baseDir: paths.dist
    },
    notify: false,
    browser: 'google chrome'
  });
});



/**
 * Watch files
 */

gulp.task('watch', function () {
  gulp.watch(paths.js , ['js', browserSync.reload]);
  gulp.watch(paths.sass , ['sass', browserSync.reload]);  
  gulp.watch(paths.html , ['html', browserSync.reload]);
  gulp.watch(paths.img , ['img', browserSync.reload]);
});

// Build task compile sass and JS.
gulp.task('build', ['html','sass','js', 'img']);
/**
 * Default task, running just `gulp` will compile the sass,
 * compile the project site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['clean'], function() {
  gulp.start(['build', 'browser-sync', 'watch']);
});