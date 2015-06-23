var
  gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps')
	

gulp.task('js', function() {
  gulp.src('./src/js/biu.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
})

gulp.task('html', function() {
  gulp.src('./src/jade/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
})

gulp.task('css', function() {
  gulp.src('./src/styl/biu.styl')
    .pipe(stylus({compress: true}))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', function() {
  gulp.watch('./src/jade/index.jade', ['html'])
  gulp.watch('./src/styl/biu.styl', ['css'])
  gulp.watch('./src/js/biu.js', ['js'])
})

gulp.task('build', ['js', 'css', 'html'])

gulp.task('default', ['build', 'watch'])
