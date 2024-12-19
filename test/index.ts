import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as xyzw from '../source';
import * as complex from '../source/complex';
import * as matrix2 from '../source/matrix2';
import * as matrix3 from '../source/matrix3';
import * as matrix4 from '../source/matrix4';
import * as matrix4Frustrum from '../source/matrix4Frustrum';
import * as matrix4Ortho from '../source/matrix4Ortho';
import * as vector2 from '../source/vector2';
import * as vector3 from '../source/vector3';
import * as vector4 from '../source/vector4';


describe('xyzw', () => {
	it('should expose vector2', () => {
		assert.deepStrictEqual(xyzw.vector2, vector2);
	});

	it('should expose complex', () => {
		assert.deepStrictEqual(xyzw.complex, complex);
	});

	it('should expose vector3', () => {
		assert.deepStrictEqual(xyzw.vector3, vector3);
	});

	it('should expose vector4', () => {
		assert.deepStrictEqual(xyzw.vector4, vector4);
	});

	it('should expose matrix2', () => {
		assert.deepStrictEqual(xyzw.matrix2, matrix2);
	});

	it('should expose matrix3', () => {
		assert.deepStrictEqual(xyzw.matrix3, matrix3);
	});

	it('should expose matrix4', () => {
		assert.deepStrictEqual(xyzw.matrix4, matrix4);
	});

	it('should expose matrix4Frustrum', () => {
		assert.deepStrictEqual(xyzw.matrix4Frustrum, matrix4Frustrum);
	});

	it('should expose matrix4Ortho', () => {
		assert.deepStrictEqual(xyzw.matrix4Ortho, matrix4Ortho);
	});
});
