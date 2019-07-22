'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
  return gulp.src('src/styles/styles.scss')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest('public'));
});

gulp.task('clean', function () {
  return (async () => {
    const deletedPaths = await del(['public/**']);
  })();
});

gulp.task('assets', function() {
  return gulp.src('src/assets/**', {since: gulp.lastRun('assets')})
    .pipe(debug({title: 'assets'}))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.*', gulp.series('styles'));
  gulp.watch('src/assets/**/*.*', gulp.series('assets'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('assets','styles')));

gulp.task('dev', gulp.series('build', 'watch'));
