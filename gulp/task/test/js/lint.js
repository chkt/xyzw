import _gulp from 'gulp';
import _lint from 'gulp-jshint';



_gulp.task('test-js-lint', done =>
	_gulp
		.src('{source,gulp}/**/*.js')
		.pipe(_lint())
		.pipe(_lint.reporter('default'))
);
