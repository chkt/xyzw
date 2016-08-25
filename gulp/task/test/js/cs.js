import _gulp from 'gulp';
import _jscs from 'gulp-jscs';



_gulp.task('test-js-cs', done =>
	_gulp
		.src('{source,gulp}/**/*.js')
		.pipe(_jscs({
			configPath : '.jscs.json',
			esnext : true
		}))
);
