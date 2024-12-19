import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as mat4 from '../source/matrix4';
import { Ortho, OrthographicLens, ortho } from '../source/matrix4Ortho';
import * as vec3 from '../source/vector3';
import { assertEqualsVec3 as assertEquals } from './assert/assert';


const epsilon = 1e-10;


function t(lens:OrthographicLens, z:number) : number {
	return 2.0 * (z - lens.near) / (lens.far - lens.near) - 1.0;
}


describe('Ortho', () => {
	it('should return a Matrix4 representing an orthographic projection', () => {
		const lens:OrthographicLens = { extend : 10.0, aspect : 1.0, near : 0.1, far : 1000.0 };
		const m = Ortho(lens);

		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.0, 0.0, -0.1)), vec3.Create(0.0, 0.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.0, 0.0, -1000.0)), vec3.Create(0.0, 0.0, 1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(5.0, 5.0, -0.1)), vec3.Create(1.0, 1.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-5.0, -5.0, -0.1)), vec3.Create(-1.0, -1.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(5.0, 5.0, -1.0)), vec3.Create(1.0, 1.0, t(lens, 1.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-5.0, -5.0, -1.0)), vec3.Create(-1.0, -1.0, t(lens, 1.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(5.0, 5.0, -1000.0)), vec3.Create(1.0, 1.0, 1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-5.0, -5.0, -1000.0)), vec3.Create(-1.0, -1.0, 1.0), epsilon);
	});
});

describe('ortho', () => {
	it('should return a Matrix4 representing an orthographic projection', () => {
		const lens:OrthographicLens = { extend : 10.0, aspect : 1.0, near : 0.1, far : 1000.0 };
		const m = mat4.Identity();
		const r = ortho(m, lens);

		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.0, 0.0, -0.1)), vec3.Create(0.0, 0.0, -1.0), epsilon);
		assert.strictEqual(m, r);

		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.0, 0.0, -1000.0)), vec3.Create(0.0, 0.0, 1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(5.0, 5.0, -0.1)), vec3.Create(1.0, 1.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-5.0, -5.0, -0.1)), vec3.Create(-1.0, -1.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(5.0, 5.0, -1.0)), vec3.Create(1.0, 1.0, t(lens, 1.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-5.0, -5.0, -1.0)), vec3.Create(-1.0, -1.0, t(lens, 1.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(5.0, 5.0, -1000.0)), vec3.Create(1.0, 1.0, 1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-5.0, -5.0, -1000.0)), vec3.Create(-1.0, -1.0, 1.0), epsilon);
	});
});
