const gulp     = require('gulp');
const uglify   = require('gulp-uglify');
const concat   = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Dev Paths
const js_src   = "./assets_dev/js/**/*.js";
const css_src  = "./assets_dev/css/**/*.css";
// Dist Paths
const js_dest      = "./assets/js";
const js_file_name      = "scripts.min.js";
const css_dest      = "./assets/css";
const css_file_name      = "style.min.css";

// Scripts Task
gulp.task('minify-js', function() {
  return gulp.src(js_src)
  .pipe(uglify())
  .pipe(concat(js_file_name ))
  .pipe(gulp.dest(js_dest));
});

gulp.task('minify-css', function() {
  return gulp.src(css_src)
    .pipe(cleanCSS())
    .pipe(rename(css_file_name))
    .pipe(gulp.dest(css_dest));
});

gulp.task('watch', function(){
  gulp.watch(css_src, gulp.series('minify-css')); 
  gulp.watch(js_src, gulp.series('minify-js')); 
});