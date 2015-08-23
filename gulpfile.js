'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');

var DEST = 'build/';
var baseJslocation = 'app/controllers/';



gulp.task('controllers',function(){
	var jsSrc = ['app/rocapp.js','app/factory/*.js','app/filters/*.js','app/helpers/*.js',baseJslocation+'home.js',baseJslocation+'*/*.js'];
	return gulp.src(jsSrc)
	.pipe(uglify())
	.pipe(concat('app.min.js'))
	.pipe(gulp.dest(DEST+'app/js'));
});

gulp.task('minify-css', function() {
  return gulp.src('app/assets/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST+'app/assets/css/'));
});

gulp.task('bowerfiles', function() {
    return gulp.src(mainBowerFiles(), { base: 'bower_components' })
        .pipe(gulp.dest(DEST+'libs/'));
});

gulp.task('index',function(){
	return gulp.src('index.html')
			.pipe(gulp.dest(DEST));
})


gulp.task('default',['controllers','minify-css','bowerfiles','index']);