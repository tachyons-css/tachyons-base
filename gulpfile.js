// Gulp tasks for Tachyons

// Load plugins
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    rename = require('gulp-rename');

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
  gulp.src('./background_size.scss')
      .pipe(watch('./background_size.scss', function(files) {
        return files.pipe(sass())
          .pipe(size({gzip: false, showFiles: true, title:'un-prefixed css'}))
          .pipe(size({gzip: true, showFiles: true, title:'un-prefixed gzipped css'}))
          .pipe(prefix())
          .pipe(size({gzip: false, showFiles: true, title:'prefixed css'}))
          .pipe(size({gzip: true, showFiles: true, title:'prefixed css'}))
          .pipe(gulp.dest('./'))
          .pipe(minifyCSS())
          .pipe(rename('background_size.min.css'))
          .pipe(gulp.dest('./'))
          .pipe(size({gzip: false, showFiles: true, title:'minified css'}))
          .pipe(size({gzip: true, showFiles: true, title:'minified css'}))
      }));
});

// Minify all css files in the css directory
// Run this in the root directory of the project with `gulp minify-css `
gulp.task('minify-css', function(){
  gulp.src('./background_size.css')
    .pipe(minifyCSS())
    .pipe(rename('background_size.min.css'))
    .pipe(gulp.dest('./'))
    .pipe(size({gzip: false, showFiles: true, title:'minified css'}))
    .pipe(size({gzip: true, showFiles: true, title:'minified css'}));
});


/*
   DEFAULT TASK
*/

gulp.task('default', ['pre-process', 'minify-css'], function(){
  gulp.start('pre-process');
  gulp.watch('*.scss', ['pre-process']);
});

