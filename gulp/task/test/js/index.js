import _lint from './lint';
import _cs from './cs';
import _unit from './unit';

import _gulp from 'gulp';



_gulp.task('test-js', [
	'test-js-lint',
	'test-js-cs',
	'test-js-unit'
]);
