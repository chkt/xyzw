import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as vec3 from '../source/vector3';
import * as mat4 from '../source/matrix4';
import { frustrum, Frustrum, PerspectiveLens } from '../source/matrix4Frustrum';


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

function t(lens:PerspectiveLens, z:number) : number {
	const zinv = 1.0 / (lens.far - lens.near);

	return (lens.far + lens.near) * zinv + 1.0 / z * (-2.0 * lens.far * lens.near * zinv);
}


describe('Frustrum', () => {
	it('should return a Matrix4 representing a Frustrum', () => {
		const f:PerspectiveLens = { fov : 0.25 * turn, aspect : 1.0, near : 0.1, far : 1000 };
		const m = Frustrum(f);

		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.0, 0.0, -0.1)), vec3.Create(0.0, 0.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.0, 0.0, -1000.0)), vec3.Create(0.0, 0.0, 1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.1, 0.1, -0.1)), vec3.Create(1.0, 1.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-0.1, -0.1, -0.1)), vec3.Create(-1.0, -1.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(1.0, 1.0, -1.0)), vec3.Create(1.0, 1.0, t(f, 1.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-1.0, -1.0, -1.0)), vec3.Create(-1.0, -1.0, t(f, 1.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(2.0, 2.0, -2.0)), vec3.Create(1.0, 1.0, t(f, 2.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-2.0, -2.0, -2.0)), vec3.Create(-1.0, -1.0, t(f, 2.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(1000.0, 1000.0, -1000.0)), vec3.Create(1.0, 1.0, 1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-1000.0, -1000.0, -1000.0)), vec3.Create(-1.0, -1.0, 1.0), epsilon);
	});
});

describe('frustrum', () => {
	it('should assign a Matrix4 representing a Frustrum', () => {
		const f:PerspectiveLens = { fov : 0.25 * turn, aspect : 1.0, near : 0.1, far : 1000 };
		const m = mat4.Identity();
		const r = frustrum(m, f);

		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.0, 0.0, -0.1)), vec3.Create(0.0, 0.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.0, 0.0, -1000.0)), vec3.Create(0.0, 0.0, 1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(0.1, 0.1, -0.1)), vec3.Create(1.0, 1.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-0.1, -0.1, -0.1)), vec3.Create(-1.0, -1.0, -1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(1.0, 1.0, -1.0)), vec3.Create(1.0, 1.0, t(f, 1.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-1.0, -1.0, -1.0)), vec3.Create(-1.0, -1.0, t(f, 1.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(2.0, 2.0, -2.0)), vec3.Create(1.0, 1.0, t(f, 2.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-2.0, -2.0, -2.0)), vec3.Create(-1.0, -1.0, t(f, 2.0)), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(1000.0, 1000.0, -1000.0)), vec3.Create(1.0, 1.0, 1.0), epsilon);
		assertEquals(vec3.MultiplyMatrix4(m, vec3.Create(-1000.0, -1000.0, -1000.0)), vec3.Create(-1.0, -1.0, 1.0), epsilon);
	});
});
