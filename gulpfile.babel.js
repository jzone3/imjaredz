'use strict';

import autoprefix	from 'gulp-autoprefixer';
import concat		from 'gulp-concat';
import deploy		from 'gulp-gh-pages';
import gulp			from 'gulp';
import jshint		from 'gulp-jshint';
import less			from 'gulp-less';
import uglify		from 'gulp-uglify';

/**
 * Push build to gh-pages
 */
gulp.task('test', () => {
  console.log("Hello");
});

gulp.task('minify_js', () => {
	gulp.src('./dist/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('build_less', () => {
	gulp.src('./dist/app.less')
		.pipe(less())
		.pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
		.pipe(gulp.dest('build'));
});

gulp.task('build_templates', () => {
	// do templates stuff
});

gulp.task('watch', () => {
	gulp.watch('./dist/templates/*', ['build']);
});

gulp.task('build', ['minify_js', 'build_templates', 'build_less']);

gulp.task('deploy', () =>  {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});