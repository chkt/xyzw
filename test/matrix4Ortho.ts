import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as vec3 from '../source/vector3';
import * as mat4 from '../source/matrix4';
import { ortho, Ortho, OrthographicLens } from '../source/matrix4Ortho';


const epsilon = 1e-10;
const turn = Math.PI * 2.0;


function assertEquals(actual:vec3.Vector3, expected:vec3.Vector3, e:number, message?:string) : void {
	if (
		Math.abs(expected.x - actual.x) > e ||
		Math.abs(expected.y - actual.y) > e ||
		Math.abs(expected.z - actual.z) > e
	) {
		throw new assert.AssertionError({
			expected,
			actual,
			message,
			operator : `!==[${ e }]`
		});
	}
}

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
		assert.strictEqual(m, r);

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
