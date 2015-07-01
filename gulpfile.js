var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var react = require('gulp-react');
var stylus = require('gulp-stylus');
var del = require('del');

gulp.task('vendor', ['clean:vendor'], function() {
	return gulp.src('bower_components/react/react.min.js')
		.pipe(rename('vendor.min.js'))
		.pipe(gulp.dest('build/js/'));
});

gulp.task('clean:vendor', function(cb) {
	del(['build/js/vendor.min.js'], cb);
});

gulp.task('jsx', ['clean:javascript'], function() {
	return gulp.src('src/jsx/*.jsx')
		.pipe(sourcemaps.init())
		.pipe(concat('script.jsx'))
		.pipe(react())
		.pipe(uglify())
		.pipe(rename('script.min.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('build/js/'));
});

gulp.task('clean:javascript', function (cb) {
	del(['build/js/script.min.js', 'build/js/script.min.js.map'], cb);
});

gulp.task('stylus', ['clean:css'], function() {
	return gulp.src('src/styl/*.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('build/css'));
});

gulp.task('clean:css', function (cb) {
	del(['build/css/style.min.css', 'build/js/style.min.css.map'], cb);
});

// Default Task
gulp.task('default', ['vendor', 'jsx', 'stylus']);
