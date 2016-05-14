var
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
  serve = require('gulp-serve'),
  babel = require('gulp-babel'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano')

gulp.task('serve', serve({
  root: ['./demo'],
  port: 3000
}));

gulp.task('js', function() {
  gulp.src('./src/js/biu.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./demo'))
})

gulp.task('html', function() {
  gulp.src('./src/jade/index.jade')
    .pipe(jade({
      locals: {
        buildTime: new Date().getTime()
      }
    }))
    .pipe(gulp.dest('./demo'))
})

gulp.task('css', function() {
  gulp.src('./src/styl/biu.styl')
    .pipe(stylus())
    .pipe(postcss([
      autoprefixer({
        browsers: ['ie > 8', 'last 2 versions']
      }),
    ]))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./demo'))
})

gulp.task('watch', function() {
  gulp.watch('./src/jade/index.jade', ['html'])
  gulp.watch('./src/styl/biu.styl', ['css'])
  gulp.watch('./src/js/biu.js', ['js'])
})

gulp.task('build', ['js', 'css', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])
