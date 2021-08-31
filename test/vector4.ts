import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as vec3 from '../source/vector3';
import * as vec4 from '../source/vector4';
import * as mat3 from '../source/matrix3';


const epsilon = 1e-10;
const turn = 2.0 * Math.PI;


function assertEqualsScalar(actual:number, expected:number, e:number, message?:string) : void {
	if (Math.abs(actual - expected) > e) {
		throw new assert.AssertionError({
			message,
			actual,
			expected,
			operator : `!==[${ e }]`
		});
	}
}

function assertEquals(v:vec4.Vector4, w:vec4.Vector4, e:number, message?:string) : void {
	const dx = w.x - v.x;
	const dy = w.y - v.y;
	const dz = w.z - v.z;
	const dw = w.w - v.w;

	if (
		Math.abs(dx) > e ||
		Math.abs(dy) > e ||
		Math.abs(dz) > e ||
		Math.abs(dw) > e
	) {
		throw new assert.AssertionError({
			message,
			actual : v,
			expected : w,
			operator : `!==[${ e }]`
		});
	}
}


describe('equals', () => {
	it('should return true if two Vector4 are equal within epsilon', () => {
		const v = vec4.Create();
		const w = v;
		const s = { ...v, x : Number.NaN };

		assert.strictEqual(vec4.equals(v, w), true);
		assert.strictEqual(vec4.equals(s, s), false);
		assert.strictEqual(vec4.equals(vec4.Create(2.0), vec4.Create(2.0)), true);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, 1.0, 1.0, 1.0), vec4.Create(1.0, 1.0, 0.0, 1.0)), false);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, 1.0, 1.0, 1.0), vec4.Create(1.0, 0.0, 1.0, 1.0)), false);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, 1.0, 1.0, 1.0), vec4.Create(0.0, 1.0, 1.0, 1.0)), false);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, 1.0, 1.0, 1.0), vec4.Create(1.0, 1.0, 1.0, 0.0)), false);
		assert.strictEqual(vec4.equals(vec4.Create(Number.NaN, 1.0, 1.0, 1.0), vec4.Create(Number.NaN, 1.0, 1.0, 1.0)), false);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, Number.NaN, 1.0, 1.0), vec4.Create(1.0, Number.NaN, 1.0, 1.0)), false);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, 1.0, Number.NaN, 1.0), vec4.Create(1.0, 1.0, Number.NaN, 1.0)), false);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, 1.0, 1.0, Number.NaN), vec4.Create(1.0, 1.0, 1.0, Number.NaN)), false);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, 1.0, 1.0, 1.0), vec4.Create(1.01, 1.0, 1.0, 1.0), 1e-3), false);
		assert.strictEqual(vec4.equals(vec4.Create(1.0, 1.0, 1.0, 1.0), vec4.Create(1.01, 1.0, 1.0, 1.0), 1e-1), true);
	});
});

describe('norm', () => {
	it('should return the norm (length) of a Vector4', () => {
		assert.strictEqual(vec4.norm({ x : 0.0, y : 0.0, z : 0.0, w : 0.0 }), 0.0);
		assert.strictEqual(vec4.norm({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }), 1.0);
		assert.strictEqual(vec4.norm({ x : 2.0, y : 0.0, z : 0.0, w : 1.0 }), Math.sqrt(5.0));
		assert.strictEqual(vec4.norm({ x : 0.0, y : 2.0, z : 0.0, w : 1.0 }), Math.sqrt(5.0));
		assert.strictEqual(vec4.norm({ x : 0.0, y : 0.0, z : 2.0, w : 1.0 }), Math.sqrt(5.0));
		assert.strictEqual(vec4.norm({ x : 1.0, y : 1.0, z : 1.0, w : 1.0 }), Math.sqrt(4.0));
		assert.strictEqual(vec4.norm({ x : 2.0, y : 2.0, z : 2.0, w : 1.0 }), Math.sqrt(13.0));
		assert.strictEqual(vec4.norm({ x : Number.NaN, y : 1.0, z : 1.0, w : 1.0 }), Number.NaN);
		assert.strictEqual(vec4.norm({ x : 1.0, y : Number.NaN, z : 1.0, w : 1.0 }), Number.NaN);
		assert.strictEqual(vec4.norm({ x : 1.0, y : 1.0, z : Number.NaN, w : 1.0 }), Number.NaN);
		assert.strictEqual(vec4.norm({ x : 1.0, y : 1.0, z : 1.0, w : Number.NaN }), Number.NaN);
	});
});

describe('normSquared', () => {
	it('should return the squared norm (length) of a Vector4', () => {
		assert.strictEqual(vec4.normSquared({ x : 0.0, y : 0.0, z : 0.0, w : 0.0 }), 0.0);
		assert.strictEqual(vec4.normSquared({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }), 1.0);
		assert.strictEqual(vec4.normSquared({ x : 2.0, y : 0.0, z : 0.0, w : 1.0 }), 5.0);
		assert.strictEqual(vec4.normSquared({ x : 0.0, y : 2.0, z : 0.0, w : 1.0 }), 5.0);
		assert.strictEqual(vec4.normSquared({ x : 0.0, y : 0.0, z : 2.0, w : 1.0 }), 5.0);
		assert.strictEqual(vec4.normSquared({ x : 1.0, y : 1.0, z : 1.0, w : 1.0 }), 4.0);
		assert.strictEqual(vec4.normSquared({ x : 2.0, y : 2.0, z : 2.0, w : 1.0 }), 13.0);
		assert.strictEqual(vec4.normSquared({ x : Number.NaN, y : 1.0, z : 1.0, w : 1.0 }), Number.NaN);
		assert.strictEqual(vec4.normSquared({ x : 1.0, y : Number.NaN, z : 1.0, w : 1.0 }), Number.NaN);
		assert.strictEqual(vec4.normSquared({ x : 1.0, y : 1.0, z : Number.NaN, w : 1.0 }), Number.NaN);
		assert.strictEqual(vec4.normSquared({ x : 1.0, y : 1.0, z : 1.0, w : Number.NaN }), Number.NaN);
	})
});

describe('dot', () => {
	it('should return the dot (inner) product of two Vector4', () => {
		assert.strictEqual(vec4.dot(vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create(1.0, 0.0, 0.0, 0.0)),  1.0);
		assert.strictEqual(vec4.dot(vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 1.0, 0.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 1.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 1.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create(1.0, 0.0, 0.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create(0.0, 1.0, 0.0, 0.0)),  1.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 1.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 1.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create(1.0, 0.0, 0.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create(0.0, 1.0, 0.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create(0.0, 0.0, 1.0, 0.0)),  1.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 1.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 0.0, 0.0, 1.0), vec4.Create(1.0, 0.0, 0.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 0.0, 0.0, 1.0), vec4.Create(0.0, 1.0, 0.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 0.0, 0.0, 1.0), vec4.Create(0.0, 0.0, 1.0, 0.0)),  0.0);
		assert.strictEqual(vec4.dot(vec4.Create(0.0, 0.0, 0.0, 1.0), vec4.Create(0.0, 0.0, 0.0, 1.0)),  1.0);

		assert.strictEqual(vec4.dot(
			vec4.Normalize(vec4.Create(1.0, 1.0, 0.0, 0.0)),
			vec4.Normalize(vec4.Create(-1.0, 1.0, 0.0, 0.0))
		), 0.0);

		assertEqualsScalar(vec4.dot(
			vec4.Normalize(vec4.Create( 1.0, 1.0, 1.0, 1.0)),
			vec4.Normalize(vec4.Create(-1.0, 1.0, 1.0, 1.0))
		), 0.5, epsilon);
		assert.strictEqual(vec4.dot(vec4.Create(2.0, 0.0, 0.0, 0.0), vec4.Create(2.0, 0.0, 0.0, 0.0)),  4.0);
		assert.strictEqual(vec4.dot(vec4.Create(2.0), vec4.Create(2.0)),  5.0);
	});
});

describe('Create', () => {
	it('should return a Vector4', () => {
		assert.deepStrictEqual(vec4.Create(), { x: 0.0, y: 0.0, z : 0.0, w : 1.0 });
		assert.deepStrictEqual(vec4.Create(1.0), { x: 1.0, y: 0.0, z : 0.0, w : 1.0 });
		assert.deepStrictEqual(vec4.Create(0.0, 1.0), { x: 0.0, y: 1.0, z : 0.0, w : 1.0 });
		assert.deepStrictEqual(vec4.Create(0.0, 1.0, 2.0), { x: 0.0, y: 1.0, z : 2.0, w : 1.0 });
		assert.deepStrictEqual(vec4.Create(0.0, 1.0, 2.0, 3.0), { x: 0.0, y: 1.0, z : 2.0, w : 3.0 });
	});
});

describe('assign', () => {
	it ('should assign a Vector4', () => {
		const v = vec4.Create();
		const r = vec4.assign(v, 1.0, 2.0, 3.0, 4.0);
		assert.deepStrictEqual(v, { x : 1.0, y : 2.0, z : 3.0, w : 4.0 });
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vec4.assign(v), { x: 0.0, y: 0.0, z : 0.0, w : 1.0 });
		assert.deepStrictEqual(vec4.assign(v, 2.0), { x: 2.0, y: 0.0, z : 0.0, w : 1.0 });
		assert.deepStrictEqual(vec4.assign(v, 3.0, 2.0), { x: 3.0, y: 2.0, z : 0.0, w : 1.0 });
		assert.deepStrictEqual(vec4.assign(v, 4.0, 3.0, 2.0), { x: 4.0, y: 3.0, z : 2.0, w : 1.0 });
		assert.deepStrictEqual(vec4.assign(v, 5.0, 4.0, 3.0, 2.0), { x: 5.0, y: 4.0, z : 3.0, w : 2.0 });
	});
});

describe('Vector3', () => {
	it('should return a Vector4 representing a Vector3', () => {
		assert.deepStrictEqual(vec4.Vector3(vec3.Create(2.0, 3.0, 4.0)), { x : 2.0, y : 3.0, z : 4.0, w : 1.0 });
	});
});

describe('vector3', () => {
	it('should assign a Vector4 representing a Vector3', () => {
		const v = vec4.Create();
		const r = vec4.vector3(v, vec3.Create(2.0, 3.0, 4.0));

		assert.deepStrictEqual(r, { x : 2.0, y : 3.0, z : 4.0, w : 1.0 });
		assert.strictEqual(v, r);
	});
});

describe('RotationAxis', () => {
	it('should return a unit-quaternion representing a rotation', () => {
		const sqTwo = 1 / Math.sqrt(2.0);
		const sqThree = 1 / Math.sqrt(3.0);

		assertEquals(vec4.RotationAxis(vec3.AxisX(), 0.0), vec4.Create(), epsilon);

		assertEquals(vec4.RotationAxis(vec3.AxisX(), turn), vec4.Create(0.0, 0.0, 0.0, -1.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisX(), 2.0 * turn), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisX(), -turn), vec4.Create(0.0, 0.0, 0.0, -1.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisX(), -2.0 * turn), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisY(), turn), vec4.Create(0.0, 0.0, 0.0, -1.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisY(), 2.0 * turn), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisZ(), turn), vec4.Create(0.0, 0.0, 0.0, -1.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisZ(), 2.0 * turn), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);

		assertEquals(vec4.RotationAxis(vec3.AxisX(),  0.5 * turn), vec4.Create( 1.0,  0.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisX(),  1.5 * turn), vec4.Create(-1.0,  0.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisX(), -0.5 * turn), vec4.Create(-1.0,  0.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisY(),  0.5 * turn), vec4.Create( 0.0,  1.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisY(), -0.5 * turn), vec4.Create( 0.0, -1.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisZ(),  0.5 * turn), vec4.Create( 0.0,  0.0,  1.0, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.AxisZ(), -0.5 * turn), vec4.Create( 0.0,  0.0, -1.0, 0.0), epsilon);

		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)),  0.5 * turn), vec4.Create(sqTwo, sqTwo, 0.0, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), -0.5 * turn), vec4.Create(-sqTwo, -sqTwo, 0.0, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 0.0, 1.0)),  0.5 * turn), vec4.Create(sqTwo, 0.0, sqTwo, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 0.0, 1.0)), -0.5 * turn), vec4.Create(-sqTwo, 0.0, -sqTwo, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(0.0, 1.0, 1.0)),  0.5 * turn), vec4.Create(0.0, sqTwo, sqTwo, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(0.0, 1.0, 1.0)), -0.5 * turn), vec4.Create(0.0, -sqTwo, -sqTwo, 0.0), epsilon);

		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)), -0.5 * turn), vec4.Create(-sqThree, -sqThree, -sqThree, 0.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)),  0.0), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);
		assertEquals(vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)),  0.5 * turn), vec4.Create(sqThree, sqThree, sqThree, 0.0), epsilon);
	});
});

describe('rotationAxis', () => {
	it('should assign a unit-quaternion representing a rotation', () => {
		const sqTwo = 1 / Math.sqrt(2.0);
		const sqThree = 1 / Math.sqrt(3.0);
		const q = vec4.Create();

		assertEquals(vec4.rotationAxis(q, vec3.AxisX(), 0.0), vec4.Create(), epsilon);

		const r = vec4.rotationAxis(q, vec3.AxisX(), turn);
		assertEquals(r, vec4.Create(0.0, 0.0, 0.0, -1.0), epsilon);
		assert.strictEqual(q, r);

		assertEquals(vec4.rotationAxis(q, vec3.AxisX(), 2.0 * turn), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisX(), -turn), vec4.Create(0.0, 0.0, 0.0, -1.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisX(), -2.0 * turn), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisY(), turn), vec4.Create(0.0, 0.0, 0.0, -1.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisY(), 2.0 * turn), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisZ(), turn), vec4.Create(0.0, 0.0, 0.0, -1.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisZ(), 2.0 * turn), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);

		assertEquals(vec4.rotationAxis(q, vec3.AxisX(),  0.5 * turn), vec4.Create( 1.0,  0.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisX(),  1.5 * turn), vec4.Create(-1.0,  0.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisX(), -0.5 * turn), vec4.Create(-1.0,  0.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisY(),  0.5 * turn), vec4.Create( 0.0,  1.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisY(), -0.5 * turn), vec4.Create( 0.0, -1.0,  0.0, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisZ(),  0.5 * turn), vec4.Create( 0.0,  0.0,  1.0, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.AxisZ(), -0.5 * turn), vec4.Create( 0.0,  0.0, -1.0, 0.0), epsilon);

		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)),  0.5 * turn), vec4.Create(sqTwo, sqTwo, 0.0, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), -0.5 * turn), vec4.Create(-sqTwo, -sqTwo, 0.0, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(1.0, 0.0, 1.0)),  0.5 * turn), vec4.Create(sqTwo, 0.0, sqTwo, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(1.0, 0.0, 1.0)), -0.5 * turn), vec4.Create(-sqTwo, 0.0, -sqTwo, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(0.0, 1.0, 1.0)),  0.5 * turn), vec4.Create(0.0, sqTwo, sqTwo, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(0.0, 1.0, 1.0)), -0.5 * turn), vec4.Create(0.0, -sqTwo, -sqTwo, 0.0), epsilon);

		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)), -0.5 * turn), vec4.Create(-sqThree, -sqThree, -sqThree, 0.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)),  0.0), vec4.Create(0.0, 0.0, 0.0, 1.0), epsilon);
		assertEquals(vec4.rotationAxis(q, vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)),  0.5 * turn), vec4.Create(sqThree, sqThree, sqThree, 0.0), epsilon);
	});
});

describe('RotationSlerp', () => {
	it('should return a unit-quaternion representing the Spherical Linear intERPolation of two unit-quaternions', () => {
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			-0.5
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), -0.25 * turn), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			0
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			0.5
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.25 * turn), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			1
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			1.5
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.75 * turn), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.5 * turn),
			0
		), vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.5 * turn),
			0.5
		), vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.25 * turn), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.5 * turn),
			1
		), vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.5 * turn), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.5 * turn),
			0
		), vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.5 * turn),
			0.5
		), vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.25 * turn), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.5 * turn),
			1
		), vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.5 * turn), epsilon);

		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.0),
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn),
			0
		), vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.0), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.0),
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn),
			0.5
		), vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.125 * turn), epsilon);
		assertEquals(vec4.RotationSlerp(
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.0),
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn),
			1
		), vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn), epsilon);
	});
});

describe('rotationSlerp', () => {
	it('should assign a unit-quaternion representing the Spherical Linear intERPolation of two unit-quaternions', () => {
		const q = vec4.Create();

		const r = vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			-0.5
		);
		assertEquals(r, vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), -0.25 * turn), epsilon);
		assert.strictEqual(q, r);

		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			0
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			0.5
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.25 * turn), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			1
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.5 * turn),
			1.5
		), vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.75 * turn), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.5 * turn),
			0
		), vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.5 * turn),
			0.5
		), vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.25 * turn), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.5 * turn),
			1
		), vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.5 * turn), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.5 * turn),
			0
		), vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.5 * turn),
			0.5
		), vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.25 * turn), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.5 * turn),
			1
		), vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.5 * turn), epsilon);

		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.0),
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn),
			0
		), vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.0), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.0),
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn),
			0.5
		), vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.125 * turn), epsilon);
		assertEquals(vec4.rotationSlerp(
			q,
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.0),
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn),
			1
		), vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn), epsilon);
	});
});

describe('RotationMatrix3', () => {
	it('should return a unit-quaternion representing a rotation', () => {
		const sq = 1.0 / Math.sqrt(2.0);

		assertEquals(vec4.RotationMatrix3(mat3.Identity()), vec4.Create(), epsilon);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(1.0, 0.0, 0.0), -0.25 * turn)),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), -0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0)),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.25 * turn)),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(0.0, 1.0, 0.0), -0.25 * turn)),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), -0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0)),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.25 * turn)),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(0.0, 0.0, 1.0), -0.25 * turn)),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), -0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0)),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.25 * turn)),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.RotationMatrix3(mat3.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn)),
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn),
			epsilon
		);
		assertEquals(vec4.RotationMatrix3(mat3.RotationX(0.75 * turn)), vec4.Create(-sq, 0.0, 0.0, sq), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationX(0.5 * turn)), vec4.Create(1.0, 0.0, 0.0, 0.0), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationX(-0.5 * turn)), vec4.Create(1.0, 0.0, 0.0, 0.0), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationX(-0.75 * turn)), vec4.Create(sq, 0.0, 0.0, sq), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationY(0.75 * turn)), vec4.Create(0.0, -sq, 0.0, sq), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationY(0.5 * turn)), vec4.Create(0.0, 1.0, 0.0, 0.0), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationY(-0.5 * turn)), vec4.Create(0.0, 1.0, 0.0, 0.0), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationY(-0.75 * turn)), vec4.Create(0.0, sq, 0.0, sq), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationZ(0.75 * turn)), vec4.Create(0.0, 0.0, -sq, sq), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationZ(0.5 * turn)), vec4.Create(0.0, 0.0, 1.0, 0.0), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationZ(-0.5 * turn)), vec4.Create(0.0, 0.0, 1.0, 0.0), epsilon);
		assertEquals(vec4.RotationMatrix3(mat3.RotationZ(-0.75 * turn)), vec4.Create(0.0, 0.0, sq, sq), epsilon);
	});
});

describe('rotationMatrix3', () => {
	it('should assign a unit-quaternion representing a rotation', () => {
		const sq = 1.0 / Math.sqrt(2.0);
		const q = vec4.Create();

		assertEquals(vec4.rotationMatrix3(q, mat3.Identity()), vec4.Create(), epsilon);

		const r = vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(1.0, 0.0, 0.0), -0.25 * turn));
		assertEquals(
			r,
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), -0.25 * turn),
			epsilon
		);
		assert.strictEqual(q, r);

		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0)),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.0),
			epsilon
		);
		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.25 * turn)),
			vec4.RotationAxis(vec3.Create(1.0, 0.0, 0.0), 0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(0.0, 1.0, 0.0), -0.25 * turn)),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), -0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0)),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.0),
			epsilon
		);
		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.25 * turn)),
			vec4.RotationAxis(vec3.Create(0.0, 1.0, 0.0), 0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(0.0, 0.0, 1.0), -0.25 * turn)),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), -0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0)),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.0),
			epsilon
		);
		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.25 * turn)),
			vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.25 * turn),
			epsilon
		);
		assertEquals(
			vec4.rotationMatrix3(q, mat3.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn)),
			vec4.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 0.0)), 0.25 * turn),
			epsilon
		);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationX(0.75 * turn)), vec4.Create(-sq, 0.0, 0.0, sq), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationX(0.5 * turn)), vec4.Create(1.0, 0.0, 0.0, 0.0), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationX(-0.5 * turn)), vec4.Create(1.0, 0.0, 0.0, 0.0), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationX(-0.75 * turn)), vec4.Create(sq, 0.0, 0.0, sq), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationY(0.75 * turn)), vec4.Create(0.0, -sq, 0.0, sq), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationY(0.5 * turn)), vec4.Create(0.0, 1.0, 0.0, 0.0), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationY(-0.5 * turn)), vec4.Create(0.0, 1.0, 0.0, 0.0), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationY(-0.75 * turn)), vec4.Create(0.0, sq, 0.0, sq), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationZ(0.75 * turn)), vec4.Create(0.0, 0.0, -sq, sq), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationZ(0.5 * turn)), vec4.Create(0.0, 0.0, 1.0, 0.0), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationZ(-0.5 * turn)), vec4.Create(0.0, 0.0, 1.0, 0.0), epsilon);
		assertEquals(vec4.rotationMatrix3(q, mat3.RotationZ(-0.75 * turn)), vec4.Create(0.0, 0.0, sq, sq), epsilon);
	});
});

describe('Add', () => {
	it('should return an addition', () => {
		assertEquals(vec4.Add(vec4.Create(0.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);
		assertEquals(vec4.Add(vec4.Create( 2.0,  4.0,  7.0,  11.0), vec4.Create( 1.0,  3.0,  5.0,  7.0)), { x :  3.0, y :  7.0, z :  12.0, w :  18.0 }, epsilon);
		assertEquals(vec4.Add(vec4.Create( 2.0, -4.0,  7.0, -11.0), vec4.Create(-1.0,  3.0, -5.0,  7.0)), { x :  1.0, y : -1.0, z :   2.0, w :  -4.0 }, epsilon);
		assertEquals(vec4.Add(vec4.Create(-2.0,  4.0, -7.0,  11.0), vec4.Create( 1.0, -3.0,  5.0, -7.0)), { x : -1.0, y :  1.0, z :  -2.0, w :   4.0 }, epsilon);
		assertEquals(vec4.Add(vec4.Create(-2.0, -4.0, -7.0, -11.0), vec4.Create(-1.0, -3.0, -5.0, -7.0)), { x : -3.0, y : -7.0, z : -12.0, w : -18.0 }, epsilon);
	});
});

describe('add', () => {
	it('should assign an addition', () => {
		const v = vec4.Create();

		assertEquals(vec4.add(v, vec4.Create(0.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);

		const r = vec4.add(v, vec4.Create( 2.0,  4.0,  7.0,  11.0), vec4.Create( 1.0,  3.0,  5.0,  7.0));
		assertEquals(r, { x :  3.0, y :  7.0, z :  12.0, w :  18.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vec4.add(v, vec4.Create( 2.0, -4.0,  7.0, -11.0), vec4.Create(-1.0,  3.0, -5.0,  7.0)), { x :  1.0, y : -1.0, z :   2.0, w :  -4.0 }, epsilon);
		assertEquals(vec4.add(v, vec4.Create(-2.0,  4.0, -7.0,  11.0), vec4.Create( 1.0, -3.0,  5.0, -7.0)), { x : -1.0, y :  1.0, z :  -2.0, w :   4.0 }, epsilon);
		assertEquals(vec4.add(v, vec4.Create(-2.0, -4.0, -7.0, -11.0), vec4.Create(-1.0, -3.0, -5.0, -7.0)), { x : -3.0, y : -7.0, z : -12.0, w : -18.0 }, epsilon);
	});
});

describe('addAssign', () => {
	it('should assign an addition', () => {
		assertEquals(vec4.addAssign(vec4.Create(0.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);

		const v = vec4.Create( 2.0,  4.0,  7.0,  11.0);
		const r = vec4.addAssign(v, vec4.Create( 1.0,  3.0,  5.0,  7.0));
		assertEquals(r, { x :  3.0, y :  7.0, z :  12.0, w :  18.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vec4.addAssign(vec4.Create( 2.0, -4.0,  7.0, -11.0), vec4.Create(-1.0,  3.0, -5.0,  7.0)), { x :  1.0, y : -1.0, z :   2.0, w :  -4.0 }, epsilon);
		assertEquals(vec4.addAssign(vec4.Create(-2.0,  4.0, -7.0,  11.0), vec4.Create( 1.0, -3.0,  5.0, -7.0)), { x : -1.0, y :  1.0, z :  -2.0, w :   4.0 }, epsilon);
		assertEquals(vec4.addAssign(vec4.Create(-2.0, -4.0, -7.0, -11.0), vec4.Create(-1.0, -3.0, -5.0, -7.0)), { x : -3.0, y : -7.0, z : -12.0, w : -18.0 }, epsilon);
	});
});

describe('Subtract', () => {
	it('should return a subtraction', () => {
		assertEquals(vec4.Subtract(vec4.Create(0.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);
		assertEquals(vec4.Subtract(vec4.Create( 2.0,  4.0,  7.0,  11.0), vec4.Create(  1.0,  3.0,  5.0,  7.0)), { x :  1.0, y :  1.0, z :   2.0, w :   4.0 }, epsilon);
		assertEquals(vec4.Subtract(vec4.Create( 2.0, -4.0,  7.0, -11.0), vec4.Create( -1.0,  3.0, -5.0,  7.0)), { x :  3.0, y : -7.0, z :  12.0, w : -18.0 }, epsilon);
		assertEquals(vec4.Subtract(vec4.Create(-2.0,  4.0, -7.0,  11.0), vec4.Create(  1.0, -3.0,  5.0, -7.0)), { x : -3.0, y :  7.0, z : -12.0, w :  18.0 }, epsilon);
		assertEquals(vec4.Subtract(vec4.Create(-2.0, -4.0, -7.0, -11.0), vec4.Create( -1.0, -3.0, -5.0, -7.0)), { x : -1.0, y : -1.0, z :  -2.0, w :  -4.0 }, epsilon);
	});
});

describe('subtract', () => {
	it('should assign a subtraction', () => {
		const v = vec4.Create();

		assertEquals(vec4.subtract(v, vec4.Create(0.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);

		const r = vec4.subtract(v, vec4.Create( 2.0,  4.0,  7.0,  11.0), vec4.Create(  1.0,  3.0,  5.0,  7.0));
		assertEquals(r, { x :  1.0, y :  1.0, z :   2.0, w :   4.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vec4.subtract(v, vec4.Create( 2.0, -4.0,  7.0, -11.0), vec4.Create( -1.0,  3.0, -5.0,  7.0)), { x :  3.0, y : -7.0, z :  12.0, w : -18.0 }, epsilon);
		assertEquals(vec4.subtract(v, vec4.Create(-2.0,  4.0, -7.0,  11.0), vec4.Create(  1.0, -3.0,  5.0, -7.0)), { x : -3.0, y :  7.0, z : -12.0, w :  18.0 }, epsilon);
		assertEquals(vec4.subtract(v, vec4.Create(-2.0, -4.0, -7.0, -11.0), vec4.Create( -1.0, -3.0, -5.0, -7.0)), { x : -1.0, y : -1.0, z :  -2.0, w :  -4.0 }, epsilon);
	});
});

describe('subtractAssign', () => {
	it('should assign a subtraction', () => {
		assertEquals(vec4.subtractAssign(vec4.Create(0.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);

		const v = vec4.Create( 2.0,  4.0,  7.0,  11.0);
		const r = vec4.subtractAssign(v, vec4.Create(  1.0,  3.0,  5.0,  7.0));
		assertEquals(r, { x :  1.0, y :  1.0, z :   2.0, w :   4.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vec4.subtractAssign(vec4.Create( 2.0, -4.0,  7.0, -11.0), vec4.Create( -1.0,  3.0, -5.0,  7.0)), { x :  3.0, y : -7.0, z :  12.0, w : -18.0 }, epsilon);
		assertEquals(vec4.subtractAssign(vec4.Create(-2.0,  4.0, -7.0,  11.0), vec4.Create(  1.0, -3.0,  5.0, -7.0)), { x : -3.0, y :  7.0, z : -12.0, w :  18.0 }, epsilon);
		assertEquals(vec4.subtractAssign(vec4.Create(-2.0, -4.0, -7.0, -11.0), vec4.Create( -1.0, -3.0, -5.0, -7.0)), { x : -1.0, y : -1.0, z :  -2.0, w :  -4.0 }, epsilon);
	});
});

describe('MultiplyScalar', () => {
	it('should return scalar multiplication', () => {
		assertEquals(vec4.MultiplyScalar(vec4.Create(0.0, 0.0, 0.0, 0.0), 2), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);
		assertEquals(vec4.MultiplyScalar(vec4.Create( 2.0,  4.0,  6.0,  8.0),  2), { x :  4.0, y :  8.0, z :  12.0, w :  16.0 }, epsilon);
		assertEquals(vec4.MultiplyScalar(vec4.Create( 2.0, -4.0,  6.0, -8.0), -2), { x : -4.0, y :  8.0, z : -12.0, w :  16.0 }, epsilon);
		assertEquals(vec4.MultiplyScalar(vec4.Create(-2.0,  4.0, -6.0,  8.0), -2), { x :  4.0, y : -8.0, z :  12.0, w : -16.0 }, epsilon);
		assertEquals(vec4.MultiplyScalar(vec4.Create(-2.0, -4.0, -6.0, -8.0),  2), { x : -4.0, y : -8.0, z : -12.0, w : -16.0 }, epsilon);
	});
});

describe('multiplyScalar', () => {
	it('should assign a scalar multiplication', () => {
		const v = vec4.Create();

		assertEquals(vec4.multiplyScalar(v, vec4.Create(0.0, 0.0, 0.0, 0.0), 2), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);

		const r = vec4.multiplyScalar(v, vec4.Create( 2.0,  4.0,  6.0,  8.0),  2);
		assertEquals(r, { x :  4.0, y :  8.0, z :  12.0, w :  16.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vec4.multiplyScalar(v, vec4.Create( 2.0, -4.0,  6.0, -8.0), -2), { x : -4.0, y :  8.0, z : -12.0, w :  16.0 }, epsilon);
		assertEquals(vec4.multiplyScalar(v, vec4.Create(-2.0,  4.0, -6.0,  8.0), -2), { x :  4.0, y : -8.0, z :  12.0, w : -16.0 }, epsilon);
		assertEquals(vec4.multiplyScalar(v, vec4.Create(-2.0, -4.0, -6.0, -8.0),  2), { x : -4.0, y : -8.0, z : -12.0, w : -16.0 }, epsilon);
	});
});

describe('multiplyAssignScalar', () => {
	it('should assign a scalar multiplication', () => {
		assertEquals(vec4.multiplyAssignScalar(vec4.Create(0.0, 0.0, 0.0, 0.0), 2), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);

		const v = vec4.Create( 2.0,  4.0,  6.0,  8.0);
		const r = vec4.multiplyAssignScalar(v,  2);
		assertEquals(r, { x :  4.0, y :  8.0, z :  12.0, w :  16.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vec4.multiplyAssignScalar(vec4.Create( 2.0, -4.0,  6.0, -8.0), -2), { x : -4.0, y :  8.0, z : -12.0, w :  16.0 }, epsilon);
		assertEquals(vec4.multiplyAssignScalar(vec4.Create(-2.0,  4.0, -6.0,  8.0), -2), { x :  4.0, y : -8.0, z :  12.0, w : -16.0 }, epsilon);
		assertEquals(vec4.multiplyAssignScalar(vec4.Create(-2.0, -4.0, -6.0, -8.0),  2), { x : -4.0, y : -8.0, z : -12.0, w : -16.0 }, epsilon);
	});
});

describe('Outer', () => {
	it('should return the outer product between two quaternions', () => {
		const sq = 1.0 / Math.sqrt(2.0);

		assertEquals(vec4.Outer(vec4.Create(0.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 0.0, 0.0, 1.0), vec4.Create(0.0, 0.0, 0.0, 1.0)), { x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, epsilon);

		assertEquals(vec4.Outer(vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create(-1.0,  0.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w :  1.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create( 1.0,  0.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w : -1.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create( 0.0, -1.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w :  1.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create( 0.0,  1.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w : -1.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create( 0.0,  0.0, -1.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w :  1.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create( 0.0,  0.0,  1.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w : -1.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create( 0.0,  1.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  1.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create( 1.0,  0.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z : -1.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create( 1.0,  0.0,  0.0, 0.0)), { x :  0.0, y :  1.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create( 0.0,  0.0,  1.0, 0.0)), { x :  0.0, y : -1.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create( 0.0,  0.0,  1.0, 0.0)), { x :  1.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create( 0.0,  1.0,  0.0, 0.0)), { x : -1.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);

		assertEquals(vec4.Outer(vec4.Create(sq, 0.0, 0.0, sq), vec4.Create(0.0, sq, 0.0, sq)), { x :  0.5, y :  0.5, z :  0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, sq, 0.0, sq), vec4.Create(sq, 0.0, 0.0, sq)), { x :  0.5, y :  0.5, z : -0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, sq, 0.0, sq), vec4.Create(0.0, 0.0, sq, sq)), { x :  0.5, y :  0.5, z :  0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 0.0, sq, sq), vec4.Create(0.0, sq, 0.0, sq)), { x : -0.5, y :  0.5, z :  0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(0.0, 0.0, sq, sq), vec4.Create(sq, 0.0, 0.0, sq)), { x :  0.5, y :  0.5, z :  0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.Outer(vec4.Create(sq, 0.0, 0.0, sq), vec4.Create(0.0, 0.0, sq, sq)), { x :  0.5, y : -0.5, z :  0.5, w :  0.5 }, epsilon);
	});
});

describe('outer', () => {
	it('should assign the outer product between two quaternions', () => {
		const q = vec4.Create();
		const sq = 1.0 / Math.sqrt(2.0);

		assertEquals(vec4.outer(q, vec4.Create(0.0, 0.0, 0.0, 0.0), vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 0.0, 0.0, 1.0), vec4.Create(0.0, 0.0, 0.0, 1.0)), { x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, epsilon);

		const r = vec4.outer(q, vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create(-1.0,  0.0,  0.0, 0.0));
		assertEquals(r, { x :  0.0, y :  0.0, z :  0.0, w :  1.0 }, epsilon);
		assert.strictEqual(q, r);

		assertEquals(vec4.outer(q, vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create( 1.0,  0.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w : -1.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create( 0.0, -1.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w :  1.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create( 0.0,  1.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w : -1.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create( 0.0,  0.0, -1.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w :  1.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create( 0.0,  0.0,  1.0, 0.0)), { x :  0.0, y :  0.0, z :  0.0, w : -1.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create( 0.0,  1.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z :  1.0, w :  0.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create( 1.0,  0.0,  0.0, 0.0)), { x :  0.0, y :  0.0, z : -1.0, w :  0.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create( 1.0,  0.0,  0.0, 0.0)), { x :  0.0, y :  1.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(1.0, 0.0, 0.0, 0.0), vec4.Create( 0.0,  0.0,  1.0, 0.0)), { x :  0.0, y : -1.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 1.0, 0.0, 0.0), vec4.Create( 0.0,  0.0,  1.0, 0.0)), { x :  1.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 0.0, 1.0, 0.0), vec4.Create( 0.0,  1.0,  0.0, 0.0)), { x : -1.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);

		assertEquals(vec4.outer(q, vec4.Create(sq, 0.0, 0.0, sq), vec4.Create(0.0, sq, 0.0, sq)), { x :  0.5, y :  0.5, z :  0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, sq, 0.0, sq), vec4.Create(sq, 0.0, 0.0, sq)), { x :  0.5, y :  0.5, z : -0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, sq, 0.0, sq), vec4.Create(0.0, 0.0, sq, sq)), { x :  0.5, y :  0.5, z :  0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 0.0, sq, sq), vec4.Create(0.0, sq, 0.0, sq)), { x : -0.5, y :  0.5, z :  0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(0.0, 0.0, sq, sq), vec4.Create(sq, 0.0, 0.0, sq)), { x :  0.5, y :  0.5, z :  0.5, w :  0.5 }, epsilon);
		assertEquals(vec4.outer(q, vec4.Create(sq, 0.0, 0.0, sq), vec4.Create(0.0, 0.0, sq, sq)), { x :  0.5, y : -0.5, z :  0.5, w :  0.5 }, epsilon);
	});
});

describe('Normalize', () => {
	it('should return the normalization of a Vector4', () => {
		const sqrt2 = 1.0 / Math.sqrt(2.0);
		const sqrt3 = 1.0 / Math.sqrt(5.0);

		assertEquals(vec4.Normalize(vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create()), { x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(-2.0)), { x : -2.0 * sqrt3, y : 0.0, z : 0.0, w : sqrt3 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(1.0)), { x : sqrt2, y : 0.0, z : 0.0, w : sqrt2 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(2.0)), { x : 2.0 * sqrt3, y : 0.0, z : 0.0, w : sqrt3 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(0.0, -2.0)), { x : 0.0, y : -2.0 * sqrt3, z : 0.0, w : sqrt3 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(0.0, 1.0)), { x : 0.0, y : sqrt2, z : 0.0, w : sqrt2 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(0.0, 2.0)), { x : 0.0, y : 2.0 * sqrt3, z : 0.0, w : sqrt3 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(0.0, 0.0, -2.0)), { x : 0.0, y : 0.0, z : -2.0 * sqrt3, w : sqrt3 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(0.0, 0.0, 1.0)), { x : 0.0, y : 0.0, z : sqrt2, w : sqrt2 }, epsilon);
		assertEquals(vec4.Normalize(vec4.Create(0.0, 0.0, 2.0)), { x : 0.0, y : 0.0, z : 2.0 * sqrt3, w : sqrt3 }, epsilon);
	});
});

describe('normalize', () => {
	it('should assign the normalization of a Vector4', () => {
		const sqrt2 = 1.0 / Math.sqrt(2.0);
		const sqrt3 = 1.0 / Math.sqrt(5.0);
		const v = vec4.Create();

		assertEquals(vec4.normalize(v, vec4.Create(0.0, 0.0, 0.0, 0.0)), { x : 0.0, y : 0.0, z : 0.0, w : 0.0 }, epsilon);
		assertEquals(vec4.normalize(v, vec4.Create()), { x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, epsilon);

		const r = vec4.normalize(v, vec4.Create(-2.0));
		assertEquals(r, { x : -2.0 * sqrt3, y : 0.0, z : 0.0, w : sqrt3 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vec4.normalize(v, vec4.Create(1.0)), { x : sqrt2, y : 0.0, z : 0.0, w : sqrt2 }, epsilon);
		assertEquals(vec4.normalize(v, vec4.Create(2.0)), { x : 2.0 * sqrt3, y : 0.0, z : 0.0, w : sqrt3 }, epsilon);
		assertEquals(vec4.normalize(v, vec4.Create(0.0, -2.0)), { x : 0.0, y : -2.0 * sqrt3, z : 0.0, w : sqrt3 }, epsilon);
		assertEquals(vec4.normalize(v, vec4.Create(0.0, 1.0)), { x : 0.0, y : sqrt2, z : 0.0, w : sqrt2 }, epsilon);
		assertEquals(vec4.normalize(v, vec4.Create(0.0, 2.0)), { x : 0.0, y : 2.0 * sqrt3, z : 0.0, w : sqrt3 }, epsilon);
		assertEquals(vec4.normalize(v, vec4.Create(0.0, 0.0, -2.0)), { x : 0.0, y : 0.0, z : -2.0 * sqrt3, w : sqrt3 }, epsilon);
		assertEquals(vec4.normalize(v, vec4.Create(0.0, 0.0, 1.0)), { x : 0.0, y : 0.0, z : sqrt2, w : sqrt2 }, epsilon);
		assertEquals(vec4.normalize(v, vec4.Create(0.0, 0.0, 2.0)), { x : 0.0, y : 0.0, z : 2.0 * sqrt3, w : sqrt3 }, epsilon);
	});
});

describe('Conjugate', () => {
	it('should return the conjugate of a quaternion', () => {
		assertEquals(vec4.Conjugate(vec4.Create( 0.0,  0.0,  0.0,  0.0)), { x :  0.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create( 1.0,  0.0,  0.0,  0.0)), { x : -1.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create(-1.0,  0.0,  0.0,  0.0)), { x :  1.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create( 0.0,  1.0,  0.0,  0.0)), { x :  0.0, y : -1.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create( 0.0, -1.0,  0.0,  0.0)), { x :  0.0, y :  1.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create( 0.0,  0.0,  1.0,  0.0)), { x :  0.0, y :  0.0, z : -1.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create( 0.0,  0.0, -1.0,  0.0)), { x :  0.0, y :  0.0, z :  1.0, w :  0.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create( 0.0,  0.0,  0.0,  1.0)), { x :  0.0, y :  0.0, z :  0.0, w :  1.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create( 0.0,  0.0,  0.0, -1.0)), { x :  0.0, y :  0.0, z :  0.0, w : -1.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create( 1.0,  1.0,  1.0,  1.0)), { x : -1.0, y : -1.0, z : -1.0, w :  1.0 }, epsilon);
		assertEquals(vec4.Conjugate(vec4.Create(-1.0, -1.0, -1.0, -1.0)), { x :  1.0, y :  1.0, z :  1.0, w : -1.0 }, epsilon);
	});
});

describe('conjugate', () => {
	it('should assign the conjugate of a quaternion', () => {
		const q = vec4.Create();

		assertEquals(vec4.conjugate(q, vec4.Create( 0.0,  0.0,  0.0,  0.0)), { x :  0.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.conjugate(q, vec4.Create( 1.0,  0.0,  0.0,  0.0)), { x : -1.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.conjugate(q, vec4.Create(-1.0,  0.0,  0.0,  0.0)), { x :  1.0, y :  0.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.conjugate(q, vec4.Create( 0.0,  1.0,  0.0,  0.0)), { x :  0.0, y : -1.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.conjugate(q, vec4.Create( 0.0, -1.0,  0.0,  0.0)), { x :  0.0, y :  1.0, z :  0.0, w :  0.0 }, epsilon);
		assertEquals(vec4.conjugate(q, vec4.Create( 0.0,  0.0,  1.0,  0.0)), { x :  0.0, y :  0.0, z : -1.0, w :  0.0 }, epsilon);
		assertEquals(vec4.conjugate(q, vec4.Create( 0.0,  0.0, -1.0,  0.0)), { x :  0.0, y :  0.0, z :  1.0, w :  0.0 }, epsilon);
		assertEquals(vec4.conjugate(q, vec4.Create( 0.0,  0.0,  0.0,  1.0)), { x :  0.0, y :  0.0, z :  0.0, w :  1.0 }, epsilon);
		assertEquals(vec4.conjugate(q, vec4.Create( 0.0,  0.0,  0.0, -1.0)), { x :  0.0, y :  0.0, z :  0.0, w : -1.0 }, epsilon);

		const r = vec4.conjugate(q, vec4.Create( 1.0,  1.0,  1.0,  1.0));
		assertEquals(r, { x : -1.0, y : -1.0, z : -1.0, w :  1.0 }, epsilon);
		assert.strictEqual(q, r);

		assertEquals(vec4.conjugate(q, vec4.Create(-1.0, -1.0, -1.0, -1.0)), { x :  1.0, y :  1.0, z :  1.0, w : -1.0 }, epsilon);
	});
});

describe('Inverse', () => {
	it('should return the multiplicative inverse of a quaternion', () => {
		assertEquals(vec4.Inverse(vec4.Create()) as vec4.Vector4, vec4.Create(), epsilon);
		assert.strictEqual(vec4.Inverse(vec4.Create(0.0, 0.0, 0.0, 0.0)), undefined);
		assert.strictEqual(vec4.Inverse(vec4.Create(Number.NaN, 0.0, 0.0, 0.0)), undefined);
		assert.strictEqual(vec4.Inverse(vec4.Create(0.0, Number.NaN, 0.0, 0.0)), undefined);
		assert.strictEqual(vec4.Inverse(vec4.Create(0.0, 0.0, Number.NaN, 0.0)), undefined);
		assert.strictEqual(vec4.Inverse(vec4.Create(0.0, 0.0, 0.0, Number.NaN)), undefined);
		assertEquals(
			vec4.Inverse(vec4.Inverse(vec4.Create(2.0, 3.0, 4.0, 5.0)) as vec4.Vector4) as vec4.Vector4,
			vec4.Create(2.0, 3.0, 4.0, 5.0),
			epsilon
		);
	});
});

describe('inverse', () => {
	it('should assign the multiplicative inverse of a quaternion', () => {
		const q = vec4.Create();

		assertEquals(vec4.inverse(q, vec4.Create()) as vec4.Vector4, vec4.Create(), epsilon);
		assert.strictEqual(vec4.inverse(q, vec4.Create(0.0, 0.0, 0.0, 0.0)), undefined);
		assert.strictEqual(vec4.inverse(q, vec4.Create(Number.NaN, 0.0, 0.0, 0.0)), undefined);
		assert.strictEqual(vec4.inverse(q, vec4.Create(0.0, Number.NaN, 0.0, 0.0)), undefined);
		assert.strictEqual(vec4.inverse(q, vec4.Create(0.0, 0.0, Number.NaN, 0.0)), undefined);
		assert.strictEqual(vec4.inverse(q, vec4.Create(0.0, 0.0, 0.0, Number.NaN)), undefined);

		const r = vec4.inverse(q, vec4.inverse(q, vec4.Create(2.0, 3.0, 4.0, 5.0)) as vec4.Vector4) as vec4.Vector4;
		assertEquals(
			r,
			vec4.Create(2.0, 3.0, 4.0, 5.0),
			epsilon
		);
		assert.strictEqual(q, r);
	});
});

describe('Copy', () => {
	it('should return the copy of a Vector4', () => {
		const v = vec4.Create(1.0, 2.0, 3.0, 4.0);
		const w = vec4.Copy(v);

		assert.notStrictEqual(v, w);
		assert.deepStrictEqual(v, w);
	});
});

describe('copy', () => {
	it('should assign the copy of a Vector4', () => {
		const v = vec4.Create(1.0, 2.0, 3.0, 4.0);
		const w = vec4.Create();
		const r = vec4.copy(w, v);

		assert.notStrictEqual(v, w);
		assert.deepStrictEqual(v, w);
		assert.strictEqual(w, r);
	});
});

describe('toF32', () => {
	it('should return a Float32Array representing a Vector4', () => {
		assert.deepStrictEqual(
			vec4.toF32(vec4.Create(1.0, 2.0, 3.0, 4.0)),
			new Float32Array([ 1.0, 2.0, 3.0, 4.0 ])
		);
	});
});

describe('assignF32', () => {
	it('should assign a Float32Array representing a Vector4', () => {
		const v = vec4.Create(1.0, 2.0, 3.0, 4.0);
		const f = new Float32Array(4);
		const r = vec4.assignF32(f, v);

		assert.deepStrictEqual(r, new Float32Array([ 1.0, 2.0, 3.0, 4.0 ]));
		assert.strictEqual(f, r);
	});

	it('should assign an offset inside a Float32Array representing a Vector4', () => {
		const v = vec4.Create(2.0, 3.0, 4.0, 5.0);
		const f = new Float32Array([ 1.0, 0.0, 0.0, 0.0, 0.0, 6.0 ]);

		assert.deepStrictEqual(vec4.assignF32(f, v, 1), new Float32Array([ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ]));
	});
});

describe('toF64', () => {
	it('should return a Float64Array representing a Vector4', () => {
		assert.deepStrictEqual(
			vec4.toF64(vec4.Create(1.0, 2.0, 3.0, 4.0)),
			new Float64Array([ 1.0, 2.0, 3.0, 4.0])
		);
	});
});

describe('assignF64', () => {
	it('should assign a Float64Array representing a Vector4', () => {
		const v = vec4.Create(1.0, 2.0, 3.0, 4.0);
		const f = new Float64Array(4);
		const r = vec4.assignF64(f, v);

		assert.deepStrictEqual(r, new Float64Array([ 1.0, 2.0, 3.0, 4.0 ]));
		assert.strictEqual(f, r);
	});

	it('should assign an offset inside a Float64Array representing a Vector4', () => {
		const v = vec4.Create(2.0, 3.0, 4.0, 5.0);
		const f = new Float64Array([ 1.0, 0.0, 0.0, 0.0, 0.0, 6.0 ]);

		assert.deepStrictEqual(vec4.assignF64(f, v, 1), new Float64Array([ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ]));
	});
});

describe('F32', () => {
	it('should return a Vector4 representing a Float32Array', () => {
		assert.deepStrictEqual(
			vec4.F32(new Float32Array([ 1.0, 2.0, 3.0, 4.0 ])),
			{ x : 1.0, y : 2.0, z : 3.0, w : 4.0 }
		);
	});

	it('should return a Vector4 representing an offset into a Float32Array', () => {
		assert.deepStrictEqual(
			vec4.F32(new Float32Array([ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ]), 1),
			{ x : 2.0, y : 3.0, z : 4.0, w : 5.0 }
		);
	});
});

describe('f32', () => {
	it('should assign a Vector4 representing a Float32Array', () => {
		const f = new Float32Array([ 1.0, 2.0, 3.0, 4.0 ]);
		const v = vec4.Create();
		const r = vec4.f32(v, f);

		assert.deepStrictEqual(r, { x : 1.0, y : 2.0, z : 3.0, w : 4.0 });
		assert.strictEqual(v, r);
	});

	it('should assign a Vector4 representing an offset into a Float32Array', () => {
		const v = vec4.Create();

		assert.deepStrictEqual(
			vec4.f32(v, new Float32Array([ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ]), 1),
			{ x : 2.0, y : 3.0, z : 4.0, w : 5.0 }
		);
	});
});

describe('F64', () => {
	it('should return a Vector4 representing a Float64Array', () => {
		assert.deepStrictEqual(
			vec4.F64(new Float64Array([ 1.0, 2.0, 3.0, 4.0 ])),
			{ x : 1.0, y : 2.0, z : 3.0, w : 4.0 }
		);
	});

	it('should return a Vector4 representing an offset into a Float64Array', () => {
		assert.deepStrictEqual(
			vec4.F64(new Float64Array([ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ]), 1),
			{ x : 2.0, y : 3.0, z : 4.0, w : 5.0 }
		);
	});
});

describe('f64', () => {
	it('should assign a Vector4 representing a Float64Array', () => {
		const f = new Float64Array([ 1.0, 2.0, 3.0, 4.0]);
		const v = vec4.Create();
		const r = vec4.f64(v, f);

		assert.deepStrictEqual(r, { x : 1.0, y : 2.0, z : 3.0, w : 4.0 });
		assert.strictEqual(v, r);
	});

	it('should assign a Vector4 representing an offset into a Float64Array', () => {
		const v = vec4.Create();

		assert.deepStrictEqual(
			vec4.f64(v, new Float64Array([ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ]), 1),
			{ x : 2.0, y : 3.0, z : 4.0, w: 5.0 }
		);
	});
});
