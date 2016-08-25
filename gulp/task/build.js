import _gulp from 'gulp';

import _es6 from 'gulp-babel';



_gulp.task('build', ['clean'], () =>
	_gulp
		.src('source/**/*.js')
		.pipe(_es6())
		.pipe(_gulp.dest('es5'))
);
