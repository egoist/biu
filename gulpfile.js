var
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
  serve = require('gulp-serve'),
  babel = require('rollup-plugin-babel'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  rollup = require('gulp-rollup')

var rollupConfig = {
  plugins: [
    babel()
  ],
  format: 'umd',
  moduleName: 'biu'
}

gulp.task('serve', serve({
  root: ['./demo'],
  port: 3000
}));

gulp.task('js', function() {
  gulp.src('./src/js/biu.js')
    .pipe(rollup(rollupConfig))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./demo'))
})

gulp.task('js:cjs', function() {
  var config = Object.assign({}, rollupConfig, {
    format: 'cjs'
  })
  gulp.src('./src/js/biu.js')
    .pipe(rollup(config))
    .pipe(rename('biu.cjs.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./demo'))
})

gulp.task('js:min', function() {
  var config = Object.assign({}, rollupConfig, {
    sourceMap: true
  })
  gulp.src('./src/js/biu.js')
    .pipe(sourcemaps.init())
    .pipe(rollup(config))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
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
      cssnano()
    ]))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./demo'))
})

gulp.task('watch', function() {
  gulp.watch('./src/jade/index.jade', ['html'])
  gulp.watch('./src/styl/biu.styl', ['css'])
  gulp.watch('./src/js/biu.js', ['js', 'js:min'])
})

gulp.task('build', ['js', 'js:min', 'js:cjs', 'css', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])
