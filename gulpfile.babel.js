'use strict';

import gulp 		from 'gulp';
import uglify 		from 'gulp-uglify';
import htmlreplace 	from 'gulp-html-replace';
import source 		from 'vinyl-source-stream';
import browserify 	from 'browserify';
import watchify 	from 'watchify';
import reactify 	from 'reactify';
import babelify 	from 'babelify';
import babel 		from 'gulp-babel';
import streamify 	from 'gulp-streamify';
import autoprefix	from 'gulp-autoprefixer';
import less			from 'gulp-less';
import cssmin		from 'gulp-cssmin';
import deploy		from 'gulp-gh-pages';

const PATH = {
	HTML: 'src/index.html',
	BOOTSTRAP: ['src/bootstrap/bootstrap.min.css', 'src/bootstrap/bootstrap.min.js'],
	IMG: 'src/img/*',
	JQUERY: 'src/jquery/jquery-3.1.1.min.js',
	LESS: 'src/less/styles.less',
	CNAME: 'src/CNAME',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	DEST: 'dist',
	DEST_SRC: 'dist/src',
	DEST_BUILD: 'dist/build',
	DEST_BOOTSTRAP: 'dist/bootstrap',
	DEST_IMG: 'dist/img',
	DEST_JQUERY: 'dist/jquery',
	DEST_CSS: 'dist/src',
	ENTRY_POINT: 'src/js/App.js'
}

gulp.task('default', ['watch']);

gulp.task('watch', ['copy', 'copyLibraries', 'buildCSS'], () => {
	gulp.watch(PATH.HTML, ['copy']);
	gulp.watch(PATH.LESS, ['buildCSS']);

	var watcher = watchify(browserify({
		entries: [PATH.ENTRY_POINT],
		transform: [[babelify, {"presets": ["es2015", "react"]}]],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true
	}));

	return watcher
		.on('update', () => {
			watcher.bundle()
				.pipe(source(PATH.OUT))
				.pipe(gulp.dest(PATH.DEST_SRC));
			console.log('Updated');
		})
		.on('error', (err) => {
			console.log(err.message);
			this.emit('end');
		})
		.bundle()
		.pipe(source(PATH.OUT))
		.pipe(gulp.dest(PATH.DEST_SRC))
});

gulp.task('copy', () => {
	gulp.src(PATH.HTML)
		.pipe(gulp.dest(PATH.DEST))
});

gulp.task('copyLibraries', () => {
	gulp.src(PATH.BOOTSTRAP)
		.pipe(gulp.dest(PATH.DEST_BOOTSTRAP));
	gulp.src(PATH.JQUERY)
		.pipe(gulp.dest(PATH.DEST_JQUERY));
	gulp.src(PATH.IMG)
		.pipe(gulp.dest(PATH.DEST_IMG));
});


gulp.task('prod', ['replaceHTML', 'copyLibraries', 'build', 'buildCSS']);

gulp.task('build', () => {
	browserify({
		entries: [PATH.ENTRY_POINT],
		transform: [[babelify, {"presets": ["es2015", "react"]}]]
	})
		.bundle()
		.pipe(source(PATH.MINIFIED_OUT))
		.pipe(streamify(uglify(PATH.MINIFIED_OUT)))
		.pipe(gulp.dest(PATH.DEST_BUILD));

	gulp.src(PATH.CNAME)
		.pipe(gulp.dest(PATH.DEST));
});

gulp.task('replaceHTML', () => {
	gulp.src(PATH.HTML)
		.pipe(htmlreplace({
			'js': 'build/' + PATH.MINIFIED_OUT
		}))
		.pipe(gulp.dest(PATH.DEST));
});

gulp.task('buildCSS', () => {
	gulp.src(PATH.LESS)
		.pipe(less().on('error', (err) => console.log(err)))
		.pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
		.pipe(cssmin().on('error', (err) => console.log(err)))
		.pipe(gulp.dest(PATH.DEST_CSS));
});

gulp.task('buildHTML', () => {
	// do templates stuff
});

/**
 * Push build to gh-pages
 */
gulp.task('deploy', () =>  {
  return gulp.src("./src/**/*")
    .pipe(deploy())
});