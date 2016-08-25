import _gulp from 'gulp';
import _mocha from 'gulp-mocha';



_gulp.task('test-js-unit', done =>
	_gulp
		.src('test/**/*.js')
		.pipe(_mocha())
);
