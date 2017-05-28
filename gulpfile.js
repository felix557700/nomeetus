var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var stylus = require('gulp-stylus')
var sourcemaps = require('gulp-sourcemaps')
var util = require('gulp-util')
var cssnano = require('gulp-cssnano')
var del = require('del')
var runsequence = require('run-sequence')


// for production: gulp build --env=production
var env = util.env.env || 'development'

gulp.task('clean', function () {
    return del('./build')
})

gulp.task('css', function () {
    return gulp.src(['./src/**/*.styl'])
        .pipe(env === 'production' ? util.noop() : sourcemaps.init())
        .pipe(stylus())
        .pipe(env === 'production' ? util.noop() : sourcemaps.write())
        .pipe(concat('bundle.css'))
        .pipe(autoprefixer('last 3 versions'))

        .pipe(env === 'production' ? cssnano() : util.noop())

        .pipe(gulp.dest('build'))
})

gulp.task('fonts', function () {
    return gulp.src('./src/assets/fonts/**')
        .pipe(gulp.dest('build/fonts'))
})

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.styl'], ['fonts', 'css'])
})

gulp.task('default', function () {
    runsequence('fonts', 'css')
})