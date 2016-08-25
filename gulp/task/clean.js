import _gulp from 'gulp';

import _del from 'del';



_gulp.task('clean', done => {
	_del('es5/**/*.js')
		.then(done.bind(null, undefined));
});