'use strict';

import gulp 				from 'gulp';
import uglify 			from 'gulp-uglify';
import htmlreplace 	from 'gulp-html-replace';
import source 			from 'vinyl-source-stream';
import browserify 	from 'browserify';
import watchify 		from 'watchify';
import reactify 		from 'reactify';
import babelify 		from 'babelify';
import babel 				from 'gulp-babel';
import streamify 		from 'gulp-streamify';
import autoprefix		from 'gulp-autoprefixer';
import less					from 'gulp-less';
import deploy				from 'gulp-gh-pages';

const PATH = {
	HTML: 'src/index.html',
	LESS: 'src/less/*/**.less',
	CNAME: 'src/CNAME',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	DEST: 'dist',
	DEST_SRC: 'dist/src',
	DEST_BUILD: 'dist/build',
	DEST_CSS: 'dist/src/css',
	ENTRY_POINT: 'src/js/App.js'
}

gulp.task('default', ['watch']);

gulp.task('watch', ['copy', 'buildCSS'], () => {
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



gulp.task('prod', ['replaceHTML', 'build', 'buildCSS']);

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
		.pipe(less())
		.pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
		.pipe(gulp.dest(PATH.DEST_CSS));
});

gulp.task('buildHTML', () => {
	// do templates stuff
});


gulp.task('browser-sync', ['build'], () => {
	var files = ['./build/**/*'];

	browserSync.init(files, {
		server: {
			baseDir: './build/templates'
		}
	});
});

/**
 * Push build to gh-pages
 */
gulp.task('deploy', () =>  {
  return gulp.src("./src/**/*")
    .pipe(deploy())
});