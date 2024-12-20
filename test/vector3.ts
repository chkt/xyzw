/* eslint key-spacing : [ error, { beforeColon : true, afterColon : true, mode : "minimum" }] */
/* eslint no-multi-spaces : [ off ] */
/* eslint space-in-parens : [ warn, never ] */
import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as matrix3 from '../source/matrix3';
import * as matrix4 from '../source/matrix4';
import * as vector3 from '../source/vector3';
import * as vector4 from '../source/vector4';
import { assertEqualsVec3 as assertEquals, assertEqualsScalar } from './assert/assert';


const epsilon = 1e-10;
const turn = 2.0 * Math.PI;


describe('equals', () => {
	it('should return true if v equals w', () => {
		const v = vector3.AxisX();
		const w = v;
		const s = { ...v, x : Number.NaN };

		assert.strictEqual(vector3.equals(v, w), true);
		assert.strictEqual(vector3.equals(s, s), false);
		assert.strictEqual(vector3.equals(vector3.AxisX(2.0), vector3.AxisX(2.0)), true);
		assert.strictEqual(vector3.equals(vector3.Create(1.0, 1.0, 1.0), vector3.Create(1.0, 1.0, 0.0)), false);
		assert.strictEqual(vector3.equals(vector3.Create(1.0, 1.0, 1.0), vector3.Create(1.0, 0.0, 1.0)), false);
		assert.strictEqual(vector3.equals(vector3.Create(1.0, 1.0, 1.0), vector3.Create(0.0, 1.0, 1.0)), false);
		assert.strictEqual(vector3.equals(vector3.Create(Number.NaN, 1.0, 1.0), vector3.Create(Number.NaN, 1.0, 1.0)), false);
		assert.strictEqual(vector3.equals(vector3.Create(1.0, Number.NaN, 1.0), vector3.Create(1.0, Number.NaN, 1.0)), false);
		assert.strictEqual(vector3.equals(vector3.Create(1.0, 1.0, Number.NaN), vector3.Create(1.0, 1.0, Number.NaN)), false);
		assert.strictEqual(vector3.equals(vector3.Create(1.0, 1.0, 1.0), vector3.Create(1.01, 1.0, 1.0), 1e-3), false);
		assert.strictEqual(vector3.equals(vector3.Create(1.0, 1.0, 1.0), vector3.Create(1.01, 1.0, 1.0), 1e-1), true);
	});
});

describe('isNormLt', () => {
	it('should return true if the norm of v is less than n', () => {
		assert.strictEqual(vector3.isNormLt(vector3.Create(), 0.1), true);
		assert.strictEqual(vector3.isNormLt(vector3.AxisX(), 0.9), false);
		assert.strictEqual(vector3.isNormLt(vector3.AxisX(), 1.1), true);
		assert.strictEqual(vector3.isNormLt(vector3.AxisY(), 0.9), false);
		assert.strictEqual(vector3.isNormLt(vector3.AxisY(), 1.1), true);
		assert.strictEqual(vector3.isNormLt(vector3.AxisZ(), 0.9), false);
		assert.strictEqual(vector3.isNormLt(vector3.AxisZ(), 1.1), true);
		assert.strictEqual(vector3.isNormLt(vector3.Create(1.0, 1.0, 1.0), Math.sqrt(2.9)), false);
		assert.strictEqual(vector3.isNormLt(vector3.Create(1.0, 1.0, 1.0), Math.sqrt(3.1)), true);
	});
});

describe('isNormGt', () => {
	it('should return true if the norm of v is less than n', () => {
		assert.strictEqual(vector3.isNormGt(vector3.Create(), 0.1), false);
		assert.strictEqual(vector3.isNormGt(vector3.AxisX(), 0.9), true);
		assert.strictEqual(vector3.isNormGt(vector3.AxisX(), 1.1), false);
		assert.strictEqual(vector3.isNormGt(vector3.AxisY(), 0.9), true);
		assert.strictEqual(vector3.isNormGt(vector3.AxisY(), 1.1), false);
		assert.strictEqual(vector3.isNormGt(vector3.AxisZ(), 0.9), true);
		assert.strictEqual(vector3.isNormGt(vector3.AxisZ(), 1.1), false);
		assert.strictEqual(vector3.isNormGt(vector3.Create(1.0, 1.0, 1.0), Math.sqrt(2.9)), true);
		assert.strictEqual(vector3.isNormGt(vector3.Create(1.0, 1.0, 1.0), Math.sqrt(3.1)), false);
	});
});

describe('isNormEqual', () => {
	it('should return true if the norm of v is equal to n', () => {
		assert.strictEqual(vector3.isNormEqual(vector3.Create(), 0.0), true);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisX(), 0.9), false);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisX(), 1.0), true);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisX(), 1.1), false);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisY(), 0.9), false);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisY(), 1.0), true);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisY(), 1.1), false);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisZ(), 0.9), false);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisZ(), 1.0), true);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisZ(), 1.1), false);
		assert.strictEqual(vector3.isNormEqual(vector3.Create(1.0, 1.0, 1.0), Math.sqrt(2.9)), false);
		assert.strictEqual(vector3.isNormEqual(vector3.Create(1.0, 1.0, 1.0), Math.sqrt(3.0)), true);
		assert.strictEqual(vector3.isNormEqual(vector3.Create(1.0, 1.0, 1.0), Math.sqrt(3.1)), false);
		assert.strictEqual(vector3.isNormEqual(vector3.AxisX(1.01), 1.0, 1e-1), true);
	});
});

describe('norm', () => {
	it('should return the norm (length) of v', () => {
		assert.strictEqual(vector3.norm({ x : 0.0, y : 0.0, z : 0.0 }), 0.0);
		assert.strictEqual(vector3.norm({ x : 2.0, y : 0.0, z : 0.0 }), 2.0);
		assert.strictEqual(vector3.norm({ x : 0.0, y : 2.0, z : 0.0 }), 2.0);
		assert.strictEqual(vector3.norm({ x : 0.0, y : 0.0, z : 2.0 }), 2.0);
		assert.strictEqual(vector3.norm({ x : 1.0, y : 1.0, z : 1.0 }), Math.sqrt(3.0));
		assert.strictEqual(vector3.norm({ x : 2.0, y : 2.0, z : 2.0 }), Math.sqrt(12.0));
		assert.strictEqual(vector3.norm({ x : Number.NaN, y : 1.0, z : 1.0 }), Number.NaN);
		assert.strictEqual(vector3.norm({ x : 1.0, y : Number.NaN, z : 1.0 }), Number.NaN);
		assert.strictEqual(vector3.norm({ x : 1.0, y : 1.0, z : Number.NaN }), Number.NaN);
	});
});

describe('normSquared', () => {
	it('should return the squared norm (length) of v', () => {
		assert.strictEqual(vector3.normSquared({ x : 0.0, y : 0.0, z : 0.0 }), 0.0);
		assert.strictEqual(vector3.normSquared({ x : 2.0, y : 0.0, z : 0.0 }), 4.0);
		assert.strictEqual(vector3.normSquared({ x : 0.0, y : 2.0, z : 0.0 }), 4.0);
		assert.strictEqual(vector3.normSquared({ x : 0.0, y : 0.0, z : 2.0 }), 4.0);
		assert.strictEqual(vector3.normSquared({ x : 1.0, y : 1.0, z : 1.0 }), 3.0);
		assert.strictEqual(vector3.normSquared({ x : 2.0, y : 2.0, z : 2.0 }), 12.0);
		assert.strictEqual(vector3.normSquared({ x : Number.NaN, y : 1.0, z : 1.0 }), Number.NaN);
		assert.strictEqual(vector3.normSquared({ x : 1.0, y : Number.NaN, z : 1.0 }), Number.NaN);
		assert.strictEqual(vector3.normSquared({ x : 1.0, y : 1.0, z : Number.NaN }), Number.NaN);
	});
});

describe('dot', () => {
	it('should return the dot (inner) product of v and w', () => {
		assert.strictEqual(vector3.dot(vector3.AxisX(), vector3.AxisX()), 1.0);
		assert.strictEqual(vector3.dot(vector3.AxisX(), vector3.AxisY()), 0.0);
		assert.strictEqual(vector3.dot(vector3.AxisX(), vector3.AxisZ()), 0.0);
		assert.strictEqual(vector3.dot(vector3.AxisY(), vector3.AxisX()), 0.0);
		assert.strictEqual(vector3.dot(vector3.AxisY(), vector3.AxisY()), 1.0);
		assert.strictEqual(vector3.dot(vector3.AxisY(), vector3.AxisZ()), 0.0);
		assert.strictEqual(vector3.dot(vector3.AxisZ(), vector3.AxisX()), 0.0);
		assert.strictEqual(vector3.dot(vector3.AxisZ(), vector3.AxisY()), 0.0);
		assert.strictEqual(vector3.dot(vector3.AxisZ(), vector3.AxisZ()), 1.0);
		assert.strictEqual(vector3.dot(vector3.AxisX(), vector3.AxisX(-1.0)), -1.0);
		assert.strictEqual(vector3.dot(vector3.AxisY(), vector3.AxisY(-1.0)), -1.0);
		assert.strictEqual(vector3.dot(vector3.AxisZ(), vector3.AxisZ(-1.0)), -1.0);

		assert.strictEqual(vector3.dot(
			vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)),
			vector3.Normalize(vector3.Create(-1.0, 1.0, 0.0))
		), 0.0);
		assertEqualsScalar(vector3.dot(
			vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)),
			vector3.Normalize(vector3.Create(-1.0, -1.0, 0.0))
		), -1.0, epsilon);

		assertEqualsScalar(vector3.dot(
			vector3.Normalize(vector3.Create(1.0, 1.0, 1.0)),
			vector3.Normalize(vector3.Create(-1.0, 1.0, 1.0))
		), 1 / 3, epsilon);
		assert.strictEqual(vector3.dot(vector3.AxisX(2.0), vector3.AxisX(2.0)),  4.0);
	});
});

describe('azimuth', () => {
	it('should return the cosine of the spherical coordinate azimuth between two vectors', () => {
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisX(), vector3.AxisX()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisY(), vector3.AxisY()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisZ(), vector3.AxisZ()), 1.0, epsilon);

		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisY(), vector3.AxisX()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisX(), vector3.AxisY()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisZ(), vector3.AxisX()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisX(), vector3.AxisZ()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisY(), vector3.AxisZ()), 0.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisZ(), vector3.AxisY()), 0.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisY(), vector3.AxisY()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisZ(), vector3.AxisZ()), 1.0, epsilon);

		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisX(), vector3.AxisY()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisY(), vector3.AxisX()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisZ(), vector3.AxisY()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisY(), vector3.AxisZ()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisX(), vector3.AxisZ()), 0.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisZ(), vector3.AxisX()), 0.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisX(), vector3.AxisX()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisZ(), vector3.AxisZ()), 1.0, epsilon);

		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisX(), vector3.AxisZ()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisZ(), vector3.AxisX()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisY(), vector3.AxisZ()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisZ(), vector3.AxisY()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisX(), vector3.AxisY()), 0.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisY(), vector3.AxisX()), 0.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisX(), vector3.AxisX()), 1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisY(), vector3.AxisY()), 1.0, epsilon);

		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisX(-1.0), vector3.AxisZ()), -1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisX(), vector3.AxisX(-1.0), vector3.AxisY()), -1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisY(-1.0), vector3.AxisX()), -1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisY(), vector3.AxisY(-1.0), vector3.AxisZ()), -1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisZ(-1.0), vector3.AxisX()), -1.0, epsilon);
		assertEqualsScalar(vector3.azimuth(vector3.AxisZ(), vector3.AxisZ(-1.0), vector3.AxisY()), -1.0, epsilon);

		assertEqualsScalar(vector3.azimuth(
			vector3.Normalize(vector3.Create(1.0, 0.0, 1.0)),
			vector3.Normalize(vector3.Create(0.0, 1.0, 1.0)),
			vector3.AxisZ()
		), 0.0, epsilon);
		assertEqualsScalar(vector3.azimuth(
			vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)),
			vector3.Normalize(vector3.Create(0.0, 1.0, 1.0)),
			vector3.AxisY()
		), 0.0, epsilon);
		assertEqualsScalar(vector3.azimuth(
			vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)),
			vector3.Normalize(vector3.Create(1.0, 0.0, 1.0)),
			vector3.AxisX()
		), 0.0, epsilon);

		assertEqualsScalar(vector3.azimuth(
			vector3.Normalize(vector3.Create(1.0, 1.0, 1.0)),
			vector3.Normalize(vector3.Cross(
				vector3.Create(0.0, -1.0, 1.0),
				vector3.Create(1.0, 1.0, 1.0)
			)),
			vector3.Normalize(vector3.Create(0.0, -1.0, 1.0))
		), 0.0, epsilon);
	});
});

describe('Create', () => {
	it('should return a Vector3', () => {
		assert.deepStrictEqual(vector3.Create(), { x : 0.0, y : 0.0, z : 0.0 });
		assert.deepStrictEqual(vector3.Create(1.0), { x : 1.0, y : 0.0, z : 0.0 });
		assert.deepStrictEqual(vector3.Create(0.0, 1.0), { x : 0.0, y : 1.0, z : 0.0 });
		assert.deepStrictEqual(vector3.Create(0.0, 1.0, 2.0), { x : 0.0, y : 1.0, z : 2.0 });
	});
});

describe('assign', () => {
	it('should assign a Vector3', () => {
		const v = vector3.Create();
		const r = vector3.assign(v, 1.0, 2.0, 3.0);

		assert.deepStrictEqual(v, { x : 1.0, y : 2.0, z : 3.0 });
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector3.assign(v), { x : 0.0, y : 0.0, z : 0.0 });
		assert.deepStrictEqual(vector3.assign(v, 1.0), { x : 1.0, y : 0.0, z : 0.0 });
		assert.deepStrictEqual(vector3.assign(v, 2.0, 1.0), { x : 2.0, y : 1.0, z : 0.0 });
		assert.deepStrictEqual(vector3.assign(v, 3.0, 2.0, 1.0), { x : 3.0, y : 2.0, z : 1.0 });
	});
});

describe('AxisX', () => {
	it('should return a "unit x" Vector3', () => {
		assert.deepStrictEqual(vector3.AxisX(), { x : 1.0, y : 0.0, z : 0.0 });
	});

	it('should return a x axis Vector3 of arbitrary length', () => {
		assert.deepStrictEqual(vector3.AxisX(-2.0), { x : -2.0, y : 0.0, z : 0.0 });
	});
});

describe('axisX', () => {
	it('should "unit x" a Vector3', () => {
		const v = vector3.Create(3.0, 2.0, 1.0);
		const r = vector3.axisX(v);

		assert.deepStrictEqual(v, { x : 1.0, y : 0.0, z : 0.0 });
		assert.strictEqual(v, r);
	});

	it('should set Vector3 to represent a x axis of arbitrary length', () => {
		const v = vector3.Create(1.0, 2.0, 3.0);
		const r = vector3.axisX(v, -2.0);

		assert.deepStrictEqual(v, { x : -2.0, y : 0.0, z : 0.0 });
		assert.deepStrictEqual(v, r);
	});
});

describe('AxisY', () => {
	it('should return a "unit y" Vector3', () => {
		assert.deepStrictEqual(vector3.AxisY(), { x : 0.0, y : 1.0, z : 0.0 });
	});

	it('should return a y axis Vector3 of arbitrary length', () => {
		assert.deepStrictEqual(vector3.AxisY(-2.0), { x : 0.0, y : -2.0, z : 0.0 });
	});
});

describe('axisY', () => {
	it('should "unit y" a Vector3', () => {
		const v = vector3.Create(3.0, 2.0, 1.0);
		const r = vector3.axisY(v);

		assert.deepStrictEqual(v, { x : 0.0, y : 1.0, z : 0.0 });
		assert.strictEqual(v, r);
	});

	it('should set Vector3 to represent a y axis of arbitrary length', () => {
		const v = vector3.Create(1.0, 2.0, 3.0);
		const r = vector3.axisY(v, -2.0);

		assert.deepStrictEqual(v, { x : 0.0, y : -2.0, z : 0.0 });
		assert.deepStrictEqual(v, r);
	});
});

describe('AxisZ', () => {
	it('should return a "unit z" Vector3', () => {
		assert.deepStrictEqual(vector3.AxisZ(), { x : 0.0, y : 0.0, z : 1.0 });
	});

	it('should return a x axis Vector3 of arbitrary length', () => {
		assert.deepStrictEqual(vector3.AxisZ(-2.0), { x : 0.0, y : 0.0, z : -2.0 });
	});
});

describe('axisZ', () => {
	it('should "unit z" a Vector3', () => {
		const v = vector3.Create(1.0, 2.0, 3.0);
		const r = vector3.axisZ(v);

		assert.deepStrictEqual(v, { x : 0.0, y : 0.0, z : 1.0 });
		assert.strictEqual(v, r);
	});

	it('should set Vector3 to represent a y axis of arbitrary length', () => {
		const v = vector3.Create(1.0, 2.0, 3.0);
		const r = vector3.axisZ(v, -2.0);

		assert.deepStrictEqual(v, { x : 0.0, y : 0.0, z : -2.0 });
		assert.deepStrictEqual(v, r);
	});
});

describe('EulerXYZ', () => {
	it('should return a Vector3 representing a set of euler angles', () => {
		assertEquals(vector3.EulerXYZ(matrix3.Identity()), vector3.Create(), epsilon);
		assertEquals(vector3.EulerXYZ(matrix3.RotationX(0.25 * turn)), vector3.Create(0.25 * turn), epsilon);
		assertEquals(vector3.EulerXYZ(matrix3.RotationY(0.25 * turn)), vector3.Create(0.0, 0.25 * turn), epsilon);
		assertEquals(vector3.EulerXYZ(matrix3.RotationZ(0.25 * turn)), vector3.Create(0.0, 0.0, 0.25 * turn), epsilon);
		assertEquals(
			vector3.EulerXYZ(matrix3.Concat(matrix3.RotationX(0.1 * turn), matrix3.Concat(matrix3.RotationY(0.2 * turn), matrix3.RotationZ(0.3 * turn)))),
			vector3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn),
			epsilon
		);
		assertEquals(
			vector3.EulerXYZ(matrix3.Concat(matrix3.RotationX(0.1 * turn), matrix3.Concat(matrix3.RotationY(0.25 * turn), matrix3.RotationZ(0.3 * turn)))),
			vector3.Create(0.4 * turn, 0.25 * turn, 0.0),
			epsilon
		);
	});
});

describe('eulerXYZ', () => {
	it('should set a Vector3 to represent a set of euler angles', () => {
		const v = vector3.Create();

		assertEquals(vector3.eulerXYZ(v, matrix3.Identity()), vector3.Create(), epsilon);
		assertEquals(vector3.eulerXYZ(v, matrix3.RotationX(0.25 * turn)), vector3.Create(0.25 * turn), epsilon);
		assertEquals(vector3.eulerXYZ(v, matrix3.RotationY(0.25 * turn)), vector3.Create(0.0, 0.25 * turn), epsilon);
		assertEquals(vector3.eulerXYZ(v, matrix3.RotationZ(0.25 * turn)), vector3.Create(0.0, 0.0, 0.25 * turn), epsilon);
		assertEquals(
			vector3.eulerXYZ(v, matrix3.Concat(matrix3.RotationX(0.1 * turn), matrix3.Concat(matrix3.RotationY(0.2 * turn), matrix3.RotationZ(0.3 * turn)))),
			vector3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn),
			epsilon
		);
		assertEquals(
			vector3.eulerXYZ(v, matrix3.Concat(matrix3.RotationX(0.1 * turn), matrix3.Concat(matrix3.RotationY(0.25 * turn), matrix3.RotationZ(0.3 * turn)))),
			vector3.Create(0.4 * turn, 0.25 * turn, 0.0),
			epsilon
		);
	});
});

describe('EulerYXZ', () => {
	it('should return a Vector3 representing a set of euler angles', () => {
		assertEquals(vector3.EulerYXZ(matrix3.Identity()), vector3.Create(), epsilon);
		assertEquals(vector3.EulerYXZ(matrix3.RotationX(0.25 * turn)), vector3.Create(0.25 * turn), epsilon);
		assertEquals(vector3.EulerYXZ(matrix3.RotationY(0.25 * turn)), vector3.Create(0.0, 0.25 * turn), epsilon);
		assertEquals(vector3.EulerYXZ(matrix3.RotationZ(0.25 * turn)), vector3.Create(0.0, 0.0, 0.25 * turn), epsilon);
		assertEquals(
			vector3.EulerYXZ(matrix3.Concat(matrix3.RotationY(0.2 * turn), matrix3.Concat(matrix3.RotationX(0.1 * turn), matrix3.RotationZ(0.3 * turn)))),
			vector3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn),
			epsilon
		);
		assertEquals(
			vector3.EulerYXZ(matrix3.Concat(matrix3.RotationY(0.1 * turn), matrix3.Concat(matrix3.RotationX(0.25 * turn), matrix3.RotationZ(0.3 * turn)))),
			vector3.Create(0.25 * turn, -0.2 * turn, 0.0),
			epsilon
		);
	});
});

describe('eulerYXZ', () => {
	it('should set a Vector3 to represent a set of euler angles', () => {
		const v = vector3.Create();

		assertEquals(vector3.eulerYXZ(v, matrix3.Identity()), vector3.Create(), epsilon);

		const r = vector3.eulerYXZ(v, matrix3.RotationX(0.25 * turn));

		assertEquals(r, vector3.Create(0.25 * turn), epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.eulerYXZ(v, matrix3.RotationY(0.25 * turn)), vector3.Create(0.0, 0.25 * turn), epsilon);
		assertEquals(vector3.eulerYXZ(v, matrix3.RotationZ(0.25 * turn)), vector3.Create(0.0, 0.0, 0.25 * turn), epsilon);
		assertEquals(
			vector3.eulerYXZ(v, matrix3.Concat(matrix3.RotationY(0.2 * turn), matrix3.Concat(matrix3.RotationX(0.1 * turn), matrix3.RotationZ(0.3 * turn)))),
			vector3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn),
			epsilon
		);
		assertEquals(
			vector3.eulerYXZ(v, matrix3.Concat(matrix3.RotationY(0.1 * turn), matrix3.Concat(matrix3.RotationX(0.25 * turn), matrix3.RotationZ(0.3 * turn)))),
			vector3.Create(0.25 * turn, -0.2 * turn, 0.0),
			epsilon
		);
	});
});

describe('EulerZXY', () => {
	it('should return a Vector3 representing a set of euler angles', () => {
		assertEquals(vector3.EulerZXY(matrix3.Identity()), vector3.Create(), epsilon);
		assertEquals(vector3.EulerZXY(matrix3.RotationX(0.25 * turn)), vector3.Create(0.25 * turn), epsilon);
		assertEquals(vector3.EulerZXY(matrix3.RotationY(0.25 * turn)), vector3.Create(0.0, 0.25 * turn), epsilon);
		assertEquals(vector3.EulerZXY(matrix3.RotationZ(0.25 * turn)), vector3.Create(0.0, 0.0, 0.25 * turn), epsilon);
		assertEquals(
			vector3.EulerZXY(matrix3.Concat(matrix3.RotationZ(0.3 * turn), matrix3.Concat(matrix3.RotationX(0.1 * turn), matrix3.RotationY(0.2 * turn)))),
			vector3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn),
			epsilon
		);
		assertEquals(
			vector3.EulerZXY(matrix3.Concat(matrix3.RotationZ(0.3 * turn), matrix3.Concat(matrix3.RotationX(0.25 * turn), matrix3.RotationY(0.2 * turn)))),
			vector3.Create(0.25 * turn, 0.0, 0.5 * turn),
			epsilon
		);
	});
});

describe('eulerZXY', () => {
	it('should set a Vector3 to represent a set of euler angles', () => {
		const v = vector3.Create();

		assertEquals(vector3.eulerZXY(v, matrix3.Identity()), vector3.Create(), epsilon);

		const r = vector3.eulerZXY(v, matrix3.RotationX(0.25 * turn));

		assertEquals(r, vector3.Create(0.25 * turn), epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.eulerZXY(v, matrix3.RotationY(0.25 * turn)), vector3.Create(0.0, 0.25 * turn), epsilon);
		assertEquals(vector3.eulerZXY(v, matrix3.RotationZ(0.25 * turn)), vector3.Create(0.0, 0.0, 0.25 * turn), epsilon);
		assertEquals(
			vector3.eulerZXY(v, matrix3.Concat(matrix3.RotationZ(0.3 * turn), matrix3.Concat(matrix3.RotationX(0.1 * turn), matrix3.RotationY(0.2 * turn)))),
			vector3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn),
			epsilon
		);
		assertEquals(
			vector3.eulerZXY(v, matrix3.Concat(matrix3.RotationZ(0.3 * turn), matrix3.Concat(matrix3.RotationX(0.25 * turn), matrix3.RotationY(0.2 * turn)))),
			vector3.Create(0.25 * turn, 0.0, 0.5 * turn),
			epsilon
		);
	});
});

describe('BarycentricUV', () => {
	it('should return a Vector3 representing barycentric UV coordinates', () => {
		const vx0 = vector3.Create(-1.0, -1.0, -1.0);
		const vx1 = vector3.Create( 1.0, -1.0,  1.0);
		const vx2 = vector3.Create(-1.0,  1.0,  1.0);

		assertEquals(vector3.BarycentricUV(vx0, vx1, vx2, 0.0, 0.0), { x : -1.0, y : -1.0, z : -1.0 }, epsilon);
		assertEquals(vector3.BarycentricUV(vx0, vx1, vx2, 1.0, 0.0), { x :  1.0, y : -1.0, z :  1.0 }, epsilon);
		assertEquals(vector3.BarycentricUV(vx0, vx1, vx2, 0.0, 1.0), { x : -1.0, y :  1.0, z :  1.0 }, epsilon);
		assertEquals(vector3.BarycentricUV(vx0, vx1, vx2, 0.5, 0.0), { x :  0.0, y : -1.0, z :  0.0 }, epsilon);
		assertEquals(vector3.BarycentricUV(vx0, vx1, vx2, 0.0, 0.5), { x : -1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.BarycentricUV(vx0, vx1, vx2, 0.5, 0.5), { x :  0.0, y :  0.0, z :  1.0 }, epsilon);
	});
});

describe('barycentricUV', () => {
	it('should set a Vector2 to represent barycentric UV coordinates', () => {
		const vx0 = vector3.Create(-1.0, -1.0, -1.0);
		const vx1 = vector3.Create( 1.0, -1.0,  1.0);
		const vx2 = vector3.Create(-1.0,  1.0,  1.0);

		const v = vector3.Create();
		const r = vector3.barycentricUV(v, vx0, vx1, vx2, 0.0, 0.0);

		assertEquals(r, { x : -1.0, y : -1.0, z : -1.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.barycentricUV(r, vx0, vx1, vx2, 1.0, 0.0), { x :  1.0, y : -1.0, z : 1.0 }, epsilon);
		assertEquals(vector3.barycentricUV(r, vx0, vx1, vx2, 0.0, 1.0), { x : -1.0, y :  1.0, z : 1.0 }, epsilon);
		assertEquals(vector3.barycentricUV(r, vx0, vx1, vx2, 0.5, 0.0), { x :  0.0, y : -1.0, z : 0.0 }, epsilon);
		assertEquals(vector3.barycentricUV(r, vx0, vx1, vx2, 0.0, 0.5), { x : -1.0, y :  0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.barycentricUV(r, vx0, vx1, vx2, 0.5, 0.5), { x :  0.0, y :  0.0, z : 1.0 }, epsilon);

		assertEquals(vector3.barycentricUV(vx0, vx0, vx1, vx2, 0.5, 0.5), { x : 0.0, y : 0.0, z : 1.0 }, epsilon);
		vector3.assign(vx0, -1.0, -1.0, -1.0);
		assertEquals(vector3.barycentricUV(vx1, vx0, vx1, vx2, 0.5, 0.5), { x : 0.0, y : 0.0, z : 1.0 }, epsilon);
		vector3.assign(vx1, 1.0, -1.0, 1.0);
		assertEquals(vector3.barycentricUV(vx2, vx0, vx1, vx2, 0.5, 0.5), { x : 0.0, y : 0.0, z : 1.0 }, epsilon);
	});
});

describe('Add', () => {
	it('should return a Vector3 representing an addition', () => {
		assertEquals(vector3.Add(vector3.Create(), vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Add(vector3.Create( 2.0,  4.0,  7.0), vector3.Create( 1.0,  3.0,  5.0)), { x :  3.0, y :  7.0, z :  12.0 }, epsilon);
		assertEquals(vector3.Add(vector3.Create( 2.0, -4.0,  7.0), vector3.Create(-1.0,  3.0, -5.0)), { x :  1.0, y : -1.0, z :   2.0 }, epsilon);
		assertEquals(vector3.Add(vector3.Create(-2.0,  4.0, -7.0), vector3.Create( 1.0, -3.0,  5.0)), { x : -1.0, y :  1.0, z :  -2.0 }, epsilon);
		assertEquals(vector3.Add(vector3.Create(-2.0, -4.0, -7.0), vector3.Create(-1.0, -3.0, -5.0)), { x : -3.0, y : -7.0, z : -12.0 }, epsilon);
	});
});

describe('add', () => {
	it('should set a Vector3 to represent an addition', () => {
		const v = vector3.Create();
		const r = vector3.add(v, vector3.Create(2.0,  4.0,  7.0), vector3.Create(1.0,  3.0,  5.0));

		assertEquals(r, { x : 3.0, y : 7.0, z : 12.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.add(v, vector3.Create(), vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.add(v, vector3.Create( 2.0, -4.0,  7.0), vector3.Create(-1.0,  3.0, -5.0)), { x :  1.0, y : -1.0, z :   2.0 }, epsilon);
		assertEquals(vector3.add(v, vector3.Create(-2.0,  4.0, -7.0), vector3.Create( 1.0, -3.0,  5.0)), { x : -1.0, y :  1.0, z :  -2.0 }, epsilon);
		assertEquals(vector3.add(v, vector3.Create(-2.0, -4.0, -7.0), vector3.Create(-1.0, -3.0, -5.0)), { x : -3.0, y : -7.0, z : -12.0 }, epsilon);
	});
});

describe('addAssign', () => {
	it('should set a Vector2 to represent an addition', () => {
		const v = vector3.Create(2.0, 4.0, 7.0);
		const r = vector3.addAssign(v, vector3.Create(1.0,  3.0, 5.0));

		assertEquals(r, { x : 3.0, y : 7.0, z : 12 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.addAssign(vector3.Create(), vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.addAssign(vector3.Create( 2.0, -4.0,  7.0), vector3.Create(-1.0,  3.0, -5.0)), { x :  1.0, y : -1.0, z :   2.0 }, epsilon);
		assertEquals(vector3.addAssign(vector3.Create(-2.0,  4.0, -7.0), vector3.Create( 1.0, -3.0,  5.0)), { x : -1.0, y :  1.0, z :  -2.0 }, epsilon);
		assertEquals(vector3.addAssign(vector3.Create(-2.0, -4.0, -7.0), vector3.Create(-1.0, -3.0, -5.0)), { x : -3.0, y : -7.0, z : -12.0 }, epsilon);
	});
});

describe('Subtract', () => {
	it('should return a Vector3 representing a subtraction', () => {
		assertEquals(vector3.Subtract(vector3.Create(), vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Subtract(vector3.Create( 2.0,  4.0,  7.0), vector3.Create( 1.0,  3.0,  5.0)), { x :  1.0, y :  1.0, z :   2.0 }, epsilon);
		assertEquals(vector3.Subtract(vector3.Create( 2.0, -4.0,  7.0), vector3.Create(-1.0,  3.0, -5.0)), { x :  3.0, y : -7.0, z :  12.0 }, epsilon);
		assertEquals(vector3.Subtract(vector3.Create(-2.0,  4.0, -7.0), vector3.Create( 1.0, -3.0,  5.0)), { x : -3.0, y :  7.0, z : -12.0 }, epsilon);
		assertEquals(vector3.Subtract(vector3.Create(-2.0, -4.0, -7.0), vector3.Create(-1.0, -3.0, -5.0)), { x : -1.0, y : -1.0, z :  -2.0 }, epsilon);
	});
});

describe('subtract', () => {
	it('should set a Vector3 to represent a subtraction', () => {
		const v = vector3.Create();
		const r = vector3.subtract(v, vector3.Create(2.0,  4.0, 7.0), vector3.Create(1.0,  3.0,  5.0));

		assertEquals(r, { x : 1.0, y : 1.0, z : 2.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.subtract(v, vector3.Create(), vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.subtract(v, vector3.Create( 2.0, -4.0,  7.0), vector3.Create(-1.0,  3.0, -5.0)), { x :  3.0, y : -7.0, z :  12.0 }, epsilon);
		assertEquals(vector3.subtract(v, vector3.Create(-2.0,  4.0, -7.0), vector3.Create( 1.0, -3.0,  5.0)), { x : -3.0, y :  7.0, z : -12.0 }, epsilon);
		assertEquals(vector3.subtract(v, vector3.Create(-2.0, -4.0, -7.0), vector3.Create(-1.0, -3.0, -5.0)), { x : -1.0, y : -1.0, z :  -2.0 }, epsilon);
	});
});

describe('subtractAssign', () => {
	it('should set a Vector3 to represent a subtraction', () => {
		const v = vector3.Create(2.0, 4.0, 7.0);
		const r = vector3.subtractAssign(v, vector3.Create(1.0, 3.0, 5.0));

		assertEquals(r, { x : 1.0, y : 1.0, z : 2.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.subtractAssign(vector3.Create(), vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.subtractAssign(vector3.Create( 2.0, -4.0,  7.0), vector3.Create(-1.0,  3.0, -5.0)), { x :  3.0, y : -7.0, z :  12.0 }, epsilon);
		assertEquals(vector3.subtractAssign(vector3.Create(-2.0,  4.0, -7.0), vector3.Create( 1.0, -3.0,  5.0)), { x : -3.0, y :  7.0, z : -12.0 }, epsilon);
		assertEquals(vector3.subtractAssign(vector3.Create(-2.0, -4.0, -7.0), vector3.Create(-1.0, -3.0, -5.0)), { x : -1.0, y : -1.0, z :  -2.0 }, epsilon);
	});
});

describe('Scale', () => {
	it('should return a Vector3 representing a scalar multiplication', () => {
		assertEquals(vector3.Scale(vector3.Create(), 2), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Scale(vector3.Create( 2.0,  4.0,  6.0),  2), { x :  4.0, y :  8.0, z :  12.0 }, epsilon);
		assertEquals(vector3.Scale(vector3.Create( 2.0, -4.0,  6.0), -2), { x : -4.0, y :  8.0, z : -12.0 }, epsilon);
		assertEquals(vector3.Scale(vector3.Create(-2.0,  4.0, -6.0), -2), { x :  4.0, y : -8.0, z :  12.0 }, epsilon);
		assertEquals(vector3.Scale(vector3.Create(-2.0, -4.0, -6.0),  2), { x : -4.0, y : -8.0, z : -12.0 }, epsilon);
	});
});

describe('MultiplyScalar', () => {
	it('should alias Scale()', () => {
		assert.strictEqual(vector3.Scale, vector3.MultiplyScalar);
	});
});

describe('scale', () => {
	it('should set a Vector3 to represent a scalar multiplication', () => {
		const v = vector3.Create();
		const r = vector3.scale(v, vector3.Create(2.0, 4.0, 6.0), 2);

		assertEquals(r, { x : 4.0, y : 8.0, z : 12 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.scale(v, vector3.Create(), 2), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.scale(v, vector3.Create( 2.0, -4.0,  6.0), -2), { x : -4.0, y :  8.0, z : -12.0 }, epsilon);
		assertEquals(vector3.scale(v, vector3.Create(-2.0,  4.0, -6.0), -2), { x :  4.0, y : -8.0, z :  12.0 }, epsilon);
		assertEquals(vector3.scale(v, vector3.Create(-2.0, -4.0, -6.0),  2), { x : -4.0, y : -8.0, z : -12.0 }, epsilon);
	});
});

describe('multiplyScalar', () => {
	it('should alias scale()', () => {
		assert.strictEqual(vector3.scale, vector3.multiplyScalar);
	});
});

describe('scaleAssign', () => {
	it('should set a Vector3 to represent a scalar multiplication', () => {
		const v = vector3.Create(2.0, 4.0, 6.0);
		const r = vector3.scaleAssign(v, 2.0);

		assertEquals(r, { x : 4.0, y : 8.0, z : 12.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.scaleAssign(vector3.Create(), 2), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.scaleAssign(vector3.Create( 2.0, -4.0,  6.0), -2), { x : -4.0, y :  8.0, z : -12.0 }, epsilon);
		assertEquals(vector3.scaleAssign(vector3.Create(-2.0,  4.0, -6.0), -2), { x :  4.0, y : -8.0, z :  12.0 }, epsilon);
		assertEquals(vector3.scaleAssign(vector3.Create(-2.0, -4.0, -6.0),  2), { x : -4.0, y : -8.0, z : -12.0 }, epsilon);
	});
});

describe('multiplyAssignScalar', () => {
	it('should alias scaleAssign()', () => {
		assert.strictEqual(vector3.scaleAssign, vector3.multiplyAssignScalar);
	});
});

describe('Cross', () => {
	it('should return the cross (outer) product of v and w', () => {
		assertEquals(vector3.Cross(vector3.Create(), vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisX(), vector3.AxisX()), { x :  0.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisX(), vector3.AxisY()), { x :  0.0, y :  0.0, z :  1.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisX(), vector3.AxisZ()), { x :  0.0, y : -1.0, z :  0.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisY(), vector3.AxisX()), { x :  0.0, y :  0.0, z : -1.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisY(), vector3.AxisY()), { x :  0.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisY(), vector3.AxisZ()), { x :  1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisZ(), vector3.AxisX()), { x :  0.0, y :  1.0, z :  0.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisZ(), vector3.AxisY()), { x : -1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisZ(), vector3.AxisZ()), { x :  0.0, y :  0.0, z :  0.0 }, epsilon);

		assertEquals(vector3.Cross(vector3.AxisX(2.0), vector3.AxisY(2.0)), { x : 0.0, y : 0.0, z : 4.0 }, epsilon);
		assertEquals(vector3.Cross(vector3.AxisX(0.5), vector3.AxisY(0.5)), { x : 0.0, y : 0.0, z : 0.25 }, epsilon);

		const x = vector3.Normalize(vector3.Create(1.0, 1.0, 1.0));
		const yp = vector3.Normalize(vector3.Cross(x, vector3.AxisY()));
		const z = vector3.Cross(x, yp);
		const y = vector3.Cross(z, x);

		assertEquals(vector3.Cross(x, y), z, epsilon);
		assertEquals(vector3.Cross(y, z), x, epsilon);
		assertEquals(vector3.Cross(z, x), y, epsilon);
	});
});

describe('cross', () => {
	it('should set a Vector3 to represent the cross (outer) product of v and w', () => {
		const v = vector3.Create(1.0, 2.0, 3.0);
		const r = vector3.cross(v, vector3.AxisX(), vector3.AxisY());

		assertEquals(r, { x : 0.0, y : 0.0, z : 1.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.cross(v, vector3.Create(), vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisX(), vector3.AxisX()), { x :  0.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisX(), vector3.AxisZ()), { x :  0.0, y : -1.0, z :  0.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisY(), vector3.AxisX()), { x :  0.0, y :  0.0, z : -1.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisY(), vector3.AxisY()), { x :  0.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisY(), vector3.AxisZ()), { x :  1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisZ(), vector3.AxisX()), { x :  0.0, y :  1.0, z :  0.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisZ(), vector3.AxisY()), { x : -1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisZ(), vector3.AxisZ()), { x :  0.0, y :  0.0, z :  0.0 }, epsilon);

		assertEquals(vector3.cross(v, vector3.AxisX(2.0), vector3.AxisY(2.0)), { x : 0.0, y : 0.0, z : 4.0 }, epsilon);
		assertEquals(vector3.cross(v, vector3.AxisX(0.5), vector3.AxisY(0.5)), { x : 0.0, y : 0.0, z : 0.25 }, epsilon);

		const x = vector3.Create(1.0, 1.0, 1.0), y = vector3.Create(), z = vector3.Create();

		vector3.normalize(x, x);
		vector3.normalize(z, vector3.cross(z, x, vector3.axisY(y)));
		vector3.cross(y, z, x);

		assertEquals(vector3.cross(r, x, y), z, epsilon);
		assertEquals(vector3.cross(r, y, z), x, epsilon);
		assertEquals(vector3.cross(r, z, x), y, epsilon);

		assertEquals(vector3.cross(x, x, y), z, epsilon);
		vector3.normalize(x, vector3.assign(x, 1.0, 1.0, 1.0));
		assertEquals(vector3.cross(y, x, y), z, epsilon);
		assertEquals(vector3.cross(x, x, x), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
	});
});

describe('Hadamard', () => {
	it('should return a Vector3 representing a component-wise multiplication', () => {
		assert.deepStrictEqual(vector3.Hadamard(vector3.Create(0.0, 0.0, 0.0), vector3.Create(0.0, 0.0, 0.0)), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.Hadamard(vector3.Create(1.0, 2.0, 3.0), vector3.Create(0.0, 0.0, 0.0)), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.Hadamard(vector3.Create(0.0, 0.0, 0.0), vector3.Create(5.0, 6.0, 7.0)), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.Hadamard(vector3.Create(2.0, 3.0, 4.0), vector3.Create(5.0, 6.0, 7.0)), vector3.Create(10.0, 18.0, 28.0));
		assert.deepStrictEqual(vector3.Hadamard(vector3.Create(-2.0, 3.0, -4.0), vector3.Create(5.0, -6.0, 7.0)), vector3.Create(-10.0, -18.0, -28.0));
		assert.deepStrictEqual(vector3.Hadamard(vector3.Create(-2.0, -3.0, -4.0), vector3.Create(-5.0, -6.0, -7.0)), vector3.Create(10.0, 18.0, 28.0));
	});
});

describe('hadamard', () => {
	it('should assign a Vector3 representing a component-wise multiplication', () => {
		const v = vector3.Create();

		assert.deepStrictEqual(vector3.hadamard(v, vector3.Create(0.0, 0.0, 0.0), vector3.Create(0.0, 0.0, 0.0)), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.hadamard(v, vector3.Create(1.0, 2.0, 3.0), vector3.Create(0.0, 0.0, 0.0)), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.hadamard(v, vector3.Create(0.0, 0.0, 0.0), vector3.Create(5.0, 6.0, 7.0)), vector3.Create(0.0, 0.0, 0.0));

		const r = vector3.hadamard(v, vector3.Create(2.0, 3.0, 4.0), vector3.Create(5.0, 6.0, 7.0));

		assert.deepStrictEqual(r, vector3.Create(10.0, 18.0, 28.0));
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector3.hadamard(v, vector3.Create(-2.0, 3.0, -4.0), vector3.Create(5.0, -6.0, 7.0)), vector3.Create(-10.0, -18.0, -28.0));
		assert.deepStrictEqual(vector3.hadamard(v, vector3.Create(-2.0, -3.0, -4.0), vector3.Create(-5.0, -6.0, -7.0)), vector3.Create(10.0, 18.0, 28.0));
	});
});

describe('hadamardAssign', () => {
	it('should assign a Vector3 representing a component-wise multiplication', () => {
		assert.deepStrictEqual(vector3.hadamardAssign(vector3.Create(0.0, 0.0, 0.0), vector3.Create(0.0, 0.0, 0.0)), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.hadamardAssign(vector3.Create(1.0, 2.0, 3.0), vector3.Create(0.0, 0.0, 0.0)), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.hadamardAssign(vector3.Create(0.0, 0.0, 0.0), vector3.Create(5.0, 6.0, 7.0)), vector3.Create(0.0, 0.0, 0.0));

		const v = vector3.Create(2.0, 3.0, 4.0);
		const r = vector3.hadamardAssign(v, vector3.Create(5.0, 6.0, 7.0));

		assert.deepStrictEqual(r, vector3.Create(10.0, 18.0, 28.0));
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector3.hadamardAssign(vector3.Create(-2.0, 3.0, -4.0), vector3.Create(5.0, -6.0, 7.0)), vector3.Create(-10.0, -18.0, -28.0));
		assert.deepStrictEqual(vector3.hadamardAssign(vector3.Create(-2.0, -3.0, -4.0), vector3.Create(-5.0, -6.0, -7.0)), vector3.Create(10.0, 18.0, 28.0));
	});
});

describe('MultiplyMatrix3', () => {
	it('should return a Vector3 representing a Matrix3 multiplication', () => {
		const v = vector3.Create(4.0, 2.0, 1.0);

		assertEquals(vector3.MultiplyMatrix3(matrix3.Identity(), v), { x : 4.0, y : 2.0, z : 1.0 }, epsilon);
		assertEquals(vector3.MultiplyMatrix3(matrix3.RotationZ(0.5 * Math.PI), v), { x : -2.0, y : 4.0, z : 1.0 }, epsilon);
		assertEquals(vector3.MultiplyMatrix3(matrix3.Scale(vector3.Create(2.0, 3.0, 4.0)), v), { x : 8.0, y : 6.0, z : 4.0 }, epsilon);
		assertEquals(vector3.MultiplyMatrix3(matrix3.Shear(
			vector3.AxisX(),
			vector3.Create(-1.0, 1.0, 0.0),
			vector3.AxisZ()
		), v), { x : 2.0, y : 2.0, z : 1.0 }, epsilon);
	});
});

describe('multiplyMatrix3', () => {
	it('should set a Vector3 to represent a Matrix3 multiplication', () => {
		const v = vector3.Create(4.0, 2.0, 1.0);
		const w = vector3.Create();
		const r = vector3.multiplyMatrix3(w, matrix3.Identity(), v);

		assertEquals(r, { x : 4.0, y : 2.0, z : 1.0 }, epsilon);
		assert.strictEqual(w, r);

		assertEquals(vector3.multiplyMatrix3(w, matrix3.RotationZ(0.5 * Math.PI), v), { x : -2.0, y : 4.0, z : 1.0 }, epsilon);
		assertEquals(vector3.multiplyMatrix3(w, matrix3.Scale(vector3.Create(2.0, 3.0, 4.0)), v), { x : 8.0, y : 6.0, z : 4.0 }, epsilon);
		assertEquals(vector3.multiplyMatrix3(w, matrix3.Shear(
			vector3.AxisX(),
			vector3.Create(-1.0, 1.0),
			vector3.AxisZ()
		), v), { x : 2.0, y : 2.0, z : 1.0 }, epsilon);
	});
});

describe('Multiply3x4Matrix4', () => {
	it('should return a Vector3 representing a 3x4 Matrix4 multiplication', () => {
		const v = vector3.Create(4.0, 2.0, 1.0);

		assertEquals(vector3.Multiply3x4Matrix4(matrix4.Identity(), v), { x : 4.0, y : 2.0, z : 1.0 }, epsilon);
		assertEquals(vector3.Multiply3x4Matrix4(matrix4.ShearMatrix3(matrix3.RotationZ(0.5 * Math.PI)), v), { x : -2.0, y : 4.0, z : 1.0 }, epsilon);
		assertEquals(vector3.Multiply3x4Matrix4(matrix4.ShearMatrix3(matrix3.Scale(vector3.Create(2.0, 3.0, 4.0))), v), { x : 8.0, y : 6.0, z : 4.0 }, epsilon);
		assertEquals(vector3.Multiply3x4Matrix4(matrix4.Translation(vector3.Create(1.0, 2.0, 4.0)), v), { x : 5.0, y : 4.0, z : 5.0 }, epsilon);
		assertEquals(vector3.Multiply3x4Matrix4(matrix4.ShearTranslation(
			vector3.AxisX(),
			vector3.Create(-1.0, 1.0),
			vector3.AxisZ(),
			vector3.Create(1.0, 2.0, 4.0)
		), v), { x : 3.0, y : 4.0, z : 5.0 }, epsilon);
	});
});

describe('multiply3x4Matrix4', () => {
	it('should set a Vector3 to represent a 3x4 Matrix4 multiplication', () => {
		const v = vector3.Create(4.0, 2.0, 1.0);
		const w = vector3.Create();
		const r = vector3.multiply3x4Matrix4(w, matrix4.Identity(), v);

		assertEquals(r, { x : 4.0, y : 2.0, z : 1.0 }, epsilon);
		assert.strictEqual(w, r);

		assertEquals(vector3.multiply3x4Matrix4(w, matrix4.ShearMatrix3(matrix3.RotationZ(0.5 * Math.PI)), v), { x : -2.0, y : 4.0, z : 1.0 }, epsilon);
		assertEquals(vector3.multiply3x4Matrix4(w, matrix4.ShearMatrix3(matrix3.Scale(vector3.Create(2.0, 3.0, 4.0))), v), { x : 8.0, y : 6.0, z : 4.0 }, epsilon);
		assertEquals(vector3.multiply3x4Matrix4(w, matrix4.Translation(vector3.Create(1.0, 2.0, 4.0)), v), { x : 5.0, y : 4.0, z : 5.0 }, epsilon);
		assertEquals(vector3.multiply3x4Matrix4(w, matrix4.ShearTranslation(
			vector3.AxisX(),
			vector3.Create(-1.0, 1.0),
			vector3.AxisZ(),
			vector3.Create(1.0, 2.0, 4.0)
		), v), { x : 3.0, y : 4.0, z : 5.0 }, epsilon);
	});
});

describe('MultiplyMatrix4', () => {
	it('should return a Vector3 representing a Matrix4 multiplication', () => {
		const v = vector3.Create(4.0, 2.0, 1.0);

		assertEquals(vector3.MultiplyMatrix4(matrix4.Identity(), v), { x : 4.0, y : 2.0, z : 1.0 }, epsilon);
		assertEquals(vector3.MultiplyMatrix4(matrix4.ShearMatrix3(matrix3.RotationZ(0.5 * Math.PI)), v), { x : -2.0, y : 4.0, z : 1.0 }, epsilon);
		assertEquals(vector3.MultiplyMatrix4(matrix4.ShearMatrix3(matrix3.Scale(vector3.Create(2.0, 3.0, 4.0))), v), { x : 8.0, y : 6.0, z : 4.0 }, epsilon);
		assertEquals(vector3.MultiplyMatrix4(matrix4.Translation(vector3.Create(1.0, 2.0, 4.0)), v), { x : 5.0, y : 4.0, z : 5.0 }, epsilon);
		assertEquals(vector3.MultiplyMatrix4(matrix4.ShearTranslation(
			vector3.AxisX(),
			vector3.Create(-1.0, 1.0),
			vector3.AxisZ(),
			vector3.Create(1.0, 2.0, 4.0)
		), v), { x : 3.0, y : 4.0, z : 5.0 }, epsilon);
	});
});

describe('multiplyMatrix4', () => {
	it('should set a Vector3 to represent a Matrix4 multiplication', () => {
		const v = vector3.Create(4.0, 2.0, 1.0);
		const w = vector3.Create();
		const r = vector3.multiplyMatrix4(w, matrix4.Identity(), v);

		assertEquals(r, { x : 4.0, y : 2.0, z : 1.0 }, epsilon);
		assert.strictEqual(w, r);

		assertEquals(vector3.multiplyMatrix4(w, matrix4.ShearMatrix3(matrix3.RotationZ(0.5 * Math.PI)), v), { x : -2.0, y : 4.0, z : 1.0 }, epsilon);
		assertEquals(vector3.multiplyMatrix4(w, matrix4.ShearMatrix3(matrix3.Scale(vector3.Create(2.0, 3.0, 4.0))), v), { x : 8.0, y : 6.0, z : 4.0 }, epsilon);
		assertEquals(vector3.multiplyMatrix4(w, matrix4.Translation(vector3.Create(1.0, 2.0, 4.0)), v), { x : 5.0, y : 4.0, z : 5.0 }, epsilon);
		assertEquals(vector3.multiplyMatrix4(w, matrix4.ShearTranslation(
			vector3.AxisX(),
			vector3.Create(-1.0, 1.0),
			vector3.AxisZ(),
			vector3.Create(1.0, 2.0, 4.0)
		), v), { x : 3.0, y : 4.0, z : 5.0 }, epsilon);
	});
});

describe('Lerp', () => {
	it('should return a Vector2 representing a Linear intERPolation', () => {
		assertEquals(vector3.Lerp(vector3.Create(Number.NaN), vector3.Create(), 1.0), { x : Number.NaN, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(0.0, Number.NaN), vector3.Create(), 1.0), { x : 0.0, y : Number.NaN, z : 0.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(0.0, 0.0, Number.NaN), vector3.Create(), 1.0), { x : 0.0, y : 0.0, z : Number.NaN }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(Number.NaN), 0.0), { x : Number.NaN, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(0.0, Number.NaN), 0.0), { x : 0.0, y : Number.NaN, z : 0.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(0.0, 0.0, Number.NaN), 0.0), { x : 0.0, y : 0.0, z : Number.NaN }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(), 0.0), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(), 0.5), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(), 1.0), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(1.0, 2.0, 4.0), 0.0), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(1.0, 2.0, 4.0), 0.5), { x : 0.5, y : 1.0, z : 2.0 }, epsilon);
		assertEquals(vector3.Lerp(vector3.Create(), vector3.Create(1.0, 2.0, 4.0), 1.0), { x : 1.0, y : 2.0, z : 4.0 }, epsilon);
	});
});

describe('lerp', () => {
	it('should set a vector2 to represent a Linear intERPolation', () => {
		const v = vector3.Create();

		assertEquals(vector3.lerp(v, vector3.Create(Number.NaN), vector3.Create(), 1.0), { x : Number.NaN, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(0.0, Number.NaN), vector3.Create(), 1.0), { x : 0.0, y : Number.NaN, z : 0.0 }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(0.0, 0.0, Number.NaN), vector3.Create(), 1.0), { x : 0.0, y : 0.0, z : Number.NaN }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(), vector3.Create(Number.NaN), 0.0), { x : Number.NaN, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(), vector3.Create(0.0, Number.NaN), 0.0), { x : 0.0, y : Number.NaN, z : 0.0 }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(), vector3.Create(0.0, 0.0, Number.NaN), 0.0), { x : 0.0, y : 0.0, z : Number.NaN }, epsilon);

		const r = vector3.lerp(v, vector3.Create(), vector3.Create(), 0.0);

		assertEquals(r, { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.lerp(v, vector3.Create(), vector3.Create(), 0.5), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(), vector3.Create(), 1.0), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(), vector3.Create(1.0, 2.0, 4.0), 0.0), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(), vector3.Create(1.0, 2.0, 4.0), 0.5), { x : 0.5, y : 1.0, z : 2.0 }, epsilon);
		assertEquals(vector3.lerp(v, vector3.Create(), vector3.Create(1.0, 2.0, 4.0), 1.0), { x : 1.0, y : 2.0, z : 4.0 }, epsilon);
	});
});

describe('lerpAssign', () => {
	it('should set a vector2 to represent a Linear intERPolation', () => {
		assertEquals(vector3.lerpAssign(vector3.Create(Number.NaN), vector3.Create(), 1.0), { x : Number.NaN, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(0.0, Number.NaN), vector3.Create(), 1.0), { x : 0.0, y : Number.NaN, z : 0.0 }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(0.0, 0.0, Number.NaN), vector3.Create(), 1.0), { x : 0.0, y : 0.0, z : Number.NaN }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(), vector3.Create(Number.NaN), 0.0), { x : Number.NaN, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(), vector3.Create(0.0, Number.NaN), 0.0), { x : 0.0, y : Number.NaN, z : 0.0 }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(), vector3.Create(0.0, 0.0, Number.NaN), 0.0), { x : 0.0, y : 0.0, z : Number.NaN }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(), vector3.Create(), 0.0), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(), vector3.Create(), 0.5), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(), vector3.Create(), 1.0), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.lerpAssign(vector3.Create(), vector3.Create(1.0, 2.0, 4.0), 0.0), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);

		const v = vector3.Create();
		const r = vector3.lerpAssign(v, vector3.Create(1.0, 2.0, 4.0), 0.5);

		assertEquals(r, { x : 0.5, y : 1.0, z : 2.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.lerpAssign(vector3.Create(), vector3.Create(1.0, 2.0, 4.0), 1.0), { x : 1.0, y : 2.0, z : 4.0 }, epsilon);
	});
});

describe('Project', () => {
	it('should return a Vector3 representing a projection', () => {
		assertEquals(vector3.Project(vector3.Create(), vector3.Create(0.5, 0.5, 0.5)), { x : Number.NaN, y : Number.NaN, z : Number.NaN }, epsilon);
		assertEquals(vector3.Project(vector3.AxisX(), vector3.Create(0.5, 0.5, 0.5)), { x : 0.5, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Project(vector3.AxisY(), vector3.Create(0.5, 0.5, 0.5)), { x : 0.0, y : 0.5, z : 0.0 }, epsilon);
		assertEquals(vector3.Project(vector3.AxisZ(), vector3.Create(0.5, 0.5, 0.5)), { x : 0.0, y : 0.0, z : 0.5 }, epsilon);
		assertEquals(vector3.Project(vector3.AxisX(-1.0), vector3.Create(0.5, 0.5, 0.5)), { x : 0.5, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Project(vector3.AxisY(-1.0), vector3.Create(0.5, 0.5, 0.5)), { x : 0.0, y : 0.5, z : 0.0 }, epsilon);
		assertEquals(vector3.Project(vector3.AxisZ(-1.0), vector3.Create(0.5, 0.5, 0.5)), { x : 0.0, y : 0.0, z : 0.5 }, epsilon);
		assertEquals(vector3.Project(vector3.Create(1.0, 1.0, 1.0), vector3.AxisY(0.5)), { x : 1 / 6, y : 1 / 6, z : 1 / 6 }, epsilon);
	});
});

describe('project', () => {
	it('should set a Vector3 to represent a projection', () => {
		const v = vector3.Create();
		const r = vector3.project(v, vector3.AxisX(), vector3.Create(0.5, 0.5, 0.5));

		assertEquals(r, { x : 0.5, y : 0.0, z : 0.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.project(v, vector3.Create(), vector3.Create(0.5, 0.5, 0.5)), { x : Number.NaN, y : Number.NaN, z : Number.NaN }, epsilon);
		assertEquals(vector3.project(v, vector3.AxisY(), vector3.Create(0.5, 0.5, 0.5)), { x : 0.0, y : 0.5, z : 0.0 }, epsilon);
		assertEquals(vector3.project(v, vector3.AxisZ(), vector3.Create(0.5, 0.5, 0.5)), { x : 0.0, y : 0.0, z : 0.5 }, epsilon);
		assertEquals(vector3.project(v, vector3.AxisX(-1.0), vector3.Create(0.5, 0.5, 0.5)), { x : 0.5, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.project(v, vector3.AxisY(-1.0), vector3.Create(0.5, 0.5, 0.5)), { x : 0.0, y : 0.5, z : 0.0 }, epsilon);
		assertEquals(vector3.project(v, vector3.AxisZ(-1.0), vector3.Create(0.5, 0.5, 0.5)), { x : 0.0, y : 0.0, z : 0.5 }, epsilon);
		assertEquals(vector3.project(v, vector3.Create(1.0, 1.0, 1.0), vector3.AxisY(0.5)), { x : 1 / 6, y : 1 / 6, z : 1 / 6 }, epsilon);
	});
});

describe('OrthoNormalize', () => {
	it('should return a Vector3 representing the orthogonal normalization of w against v using Gram-Schmidt-Normalization', () => {
		assertEquals(vector3.OrthoNormalize(vector3.AxisX(), vector3.Create(1.0, 1.0, 0.0)), { x :  0.0, y :  1.0, z :  0.0 }, epsilon);
		assertEquals(vector3.OrthoNormalize(vector3.AxisX(), vector3.Create(1.0, 0.0, 1.0)), { x :  0.0, y :  0.0, z :  1.0 }, epsilon);
		assertEquals(vector3.OrthoNormalize(vector3.AxisY(), vector3.Create(1.0, 1.0, 0.0)), { x :  1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.OrthoNormalize(vector3.AxisY(), vector3.Create(0.0, 1.0, 1.0)), { x :  0.0, y :  0.0, z :  1.0 }, epsilon);
		assertEquals(vector3.OrthoNormalize(vector3.AxisZ(), vector3.Create(1.0, 0.0, 1.0)), { x :  1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.OrthoNormalize(vector3.AxisZ(), vector3.Create(0.0, 1.0, 1.0)), { x :  0.0, y :  1.0, z :  0.0 }, epsilon);
		assertEquals(vector3.OrthoNormalize(vector3.Create(1.0, 1.0, 1.0), vector3.AxisX()), { x :  0.0, y : -1.0, z : -1.0 }, epsilon);
		assertEquals(vector3.OrthoNormalize(vector3.Create(1.0, 1.0, 1.0), vector3.AxisY()), { x : -1.0, y :  0.0, z : -1.0 }, epsilon);
		assertEquals(vector3.OrthoNormalize(vector3.Create(1.0, 1.0, 1.0), vector3.AxisZ()), { x : -1.0, y : -1.0, z :  0.0 }, epsilon);
	});
});

describe('orthoNormalize', () => {
	it('should set a Vector3 to represent the orthogonal normalization of w against v using Gram-Schmidt-Normalization', () => {
		const v = vector3.Create();
		const r = vector3.orthoNormalize(v, vector3.AxisX(), vector3.Create(1.0, 1.0, 0.0));

		assertEquals(r, { x : 0.0, y : 1.0, z : 0.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.orthoNormalize(v, vector3.AxisX(), vector3.Create(1.0, 0.0, 1.0)), { x :  0.0, y :  0.0, z :  1.0 }, epsilon);
		assertEquals(vector3.orthoNormalize(v, vector3.AxisY(), vector3.Create(1.0, 1.0, 0.0)), { x :  1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.orthoNormalize(v, vector3.AxisY(), vector3.Create(0.0, 1.0, 1.0)), { x :  0.0, y :  0.0, z :  1.0 }, epsilon);
		assertEquals(vector3.orthoNormalize(v, vector3.AxisZ(), vector3.Create(1.0, 0.0, 1.0)), { x :  1.0, y :  0.0, z :  0.0 }, epsilon);
		assertEquals(vector3.orthoNormalize(v, vector3.AxisZ(), vector3.Create(0.0, 1.0, 1.0)), { x :  0.0, y :  1.0, z :  0.0 }, epsilon);
		assertEquals(vector3.orthoNormalize(v, vector3.Create(1.0, 1.0, 1.0), vector3.AxisX()), { x :  0.0, y : -1.0, z : -1.0 }, epsilon);
		assertEquals(vector3.orthoNormalize(v, vector3.Create(1.0, 1.0, 1.0), vector3.AxisY()), { x : -1.0, y :  0.0, z : -1.0 }, epsilon);
		assertEquals(vector3.orthoNormalize(v, vector3.Create(1.0, 1.0, 1.0), vector3.AxisZ()), { x : -1.0, y : -1.0, z :  0.0 }, epsilon);
	});
});

describe('Reflect', () => {
	it('should return a Vector3 representing a reflection', () => {
		assertEquals(vector3.Reflect(vector3.AxisY(), vector3.AxisX()), vector3.AxisX(-1.0), epsilon);
		assertEquals(vector3.Reflect(vector3.AxisZ(), vector3.AxisX()), vector3.AxisX(-1.0), epsilon);
		assertEquals(vector3.Reflect(vector3.AxisX(), vector3.AxisY()), vector3.AxisY(-1.0), epsilon);
		assertEquals(vector3.Reflect(vector3.AxisZ(), vector3.AxisY()), vector3.AxisY(-1.0), epsilon);
		assertEquals(vector3.Reflect(vector3.AxisX(), vector3.AxisZ()), vector3.AxisZ(-1.0), epsilon);
		assertEquals(vector3.Reflect(vector3.AxisY(), vector3.AxisZ()), vector3.AxisZ(-1.0), epsilon);

		assertEquals(vector3.Reflect(vector3.AxisX(), vector3.AxisX()), vector3.AxisX(), epsilon);
		assertEquals(vector3.Reflect(vector3.AxisY(), vector3.AxisY()), vector3.AxisY(), epsilon);
		assertEquals(vector3.Reflect(vector3.AxisZ(), vector3.AxisZ()), vector3.AxisZ(), epsilon);

		assertEquals(vector3.Reflect(vector3.Normalize(vector3.Create(1.0, 1.0)), vector3.AxisX()), vector3.AxisY(), epsilon);
		assertEquals(vector3.Reflect(vector3.Normalize(vector3.Create(1.0, 1.0)), vector3.AxisY()), vector3.AxisX(), epsilon);

		assertEquals(
			vector3.Reflect(vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)), vector3.Create(1.0, 1.0, 1.0)),
			vector3.Create(1.0, 1.0, -1.0),
			epsilon
		);
	});
});

describe('reflect', () => {
	it('should assign a Vector3 representing a reflection', () => {
		const v = vector3.Create();

		assertEquals(vector3.reflect(v, vector3.AxisY(), vector3.AxisX()), vector3.AxisX(-1.0), epsilon);
		assertEquals(vector3.reflect(v, vector3.AxisZ(), vector3.AxisX()), vector3.AxisX(-1.0), epsilon);
		assertEquals(vector3.reflect(v, vector3.AxisX(), vector3.AxisY()), vector3.AxisY(-1.0), epsilon);
		assertEquals(vector3.reflect(v, vector3.AxisZ(), vector3.AxisY()), vector3.AxisY(-1.0), epsilon);
		assertEquals(vector3.reflect(v, vector3.AxisX(), vector3.AxisZ()), vector3.AxisZ(-1.0), epsilon);
		assertEquals(vector3.reflect(v, vector3.AxisY(), vector3.AxisZ()), vector3.AxisZ(-1.0), epsilon);

		assertEquals(vector3.reflect(v, vector3.AxisX(), vector3.AxisX()), vector3.AxisX(), epsilon);
		assertEquals(vector3.reflect(v, vector3.AxisY(), vector3.AxisY()), vector3.AxisY(), epsilon);
		assertEquals(vector3.reflect(v, vector3.AxisZ(), vector3.AxisZ()), vector3.AxisZ(), epsilon);

		const r = vector3.reflect(v, vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)), vector3.AxisX());

		assertEquals(r, vector3.AxisY(), epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector3.reflect(v, vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)), vector3.AxisY()), vector3.AxisX(), epsilon);

		assertEquals(
			vector3.reflect(v, vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)), vector3.Create(1.0, 1.0, 1.0)),
			vector3.Create(1.0, 1.0, -1.0),
			epsilon
		);
	});
});

describe('Normalize', () => {
	it('should return a Vector3 representing a normalization', () => {
		const rot2 = Math.sqrt(1 / 2);
		const rot3 = Math.sqrt(1 / 3);

		assertEquals(vector3.Normalize(vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisX()), { x : 1.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisX(2.0)), { x : 1.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisX(-2.0)), { x : -1.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisY()), { x : 0.0, y : 1.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisY(2.0)), { x : 0.0, y : 1.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisY(-2.0)), { x : 0.0, y : -1.0, z : 0.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisZ()), { x : 0.0, y : 0.0, z : 1.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisZ(2.0)), { x : 0.0, y : 0.0, z : 1.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.AxisZ(-2.0)), { x : 0.0, y : 0.0, z : -1.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.Create(1.0, 1.0, 0.0)), { x : rot2, y : rot2, z :  0.0 }, epsilon);
		assertEquals(vector3.Normalize(vector3.Create(0.0, 1.0, 1.0)), { x :  0.0, y : rot2, z : rot2 }, epsilon);
		assertEquals(vector3.Normalize(vector3.Create(1.0, 0.0, 1.0)), { x : rot2, y :  0.0, z : rot2 }, epsilon);
		assertEquals(vector3.Normalize(vector3.Create(1.0, 1.0, 1.0)), { x : rot3, y : rot3, z : rot3 }, epsilon);
	});
});

describe('normalize', () => {
	it('should set a Vector3 to represent a normalization', () => {
		const v = vector3.Create();
		const r = vector3.normalize(v, vector3.AxisX());

		assertEquals(r, { x : 1.0, y : 0.0, z : 0.0 }, epsilon);
		assert.strictEqual(v, r);

		const rot2 = Math.sqrt(1 / 2);
		const rot3 = Math.sqrt(1 / 3);

		assertEquals(vector3.normalize(v, vector3.Create()), { x : 0.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.AxisX(2.0)), { x : 1.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.AxisX(-2.0)), { x : -1.0, y : 0.0, z : 0.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.AxisY()), { x : 0.0, y : 1.0, z : 0.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.AxisY(2.0)), { x : 0.0, y : 1.0, z : 0.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.AxisY(-2.0)), { x : 0.0, y : -1.0, z : 0.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.AxisZ()), { x : 0.0, y : 0.0, z : 1.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.AxisZ(2.0)), { x : 0.0, y : 0.0, z : 1.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.AxisZ(-2.0)), { x : 0.0, y : 0.0, z : -1.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.Create(1.0, 1.0, 0.0)), { x : rot2, y : rot2, z :  0.0 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.Create(0.0, 1.0, 1.0)), { x :  0.0, y : rot2, z : rot2 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.Create(1.0, 0.0, 1.0)), { x : rot2, y :  0.0, z : rot2 }, epsilon);
		assertEquals(vector3.normalize(v, vector3.Create(1.0, 1.0, 1.0)), { x : rot3, y : rot3, z : rot3 }, epsilon);
	});
});

describe('HadamardInvert', () => {
	const nan = Number.NaN;

	it('should return the hadamard-multiplicative inverse of a vector', () => {
		assert.deepStrictEqual(vector3.HadamardInvert(vector3.Create(0.0, -0.0, 0.0)), vector3.Create(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
		assert.deepStrictEqual(vector3.HadamardInvert(vector3.Create(1.0, -1.0, 1.0)), vector3.Create(1.0, -1.0, 1.0));
		assert.deepStrictEqual(vector3.HadamardInvert(vector3.Create(nan, -1.0, 1.0)), vector3.Create(nan, -1.0, 1.0));
		assert.deepStrictEqual(vector3.HadamardInvert(vector3.Create(1.0, nan, 1.0)), vector3.Create(1.0, nan, 1.0));
		assert.deepStrictEqual(vector3.HadamardInvert(vector3.Create(1.0, -1.0, nan)), vector3.Create(1.0, -1.0, nan));
		assert.deepStrictEqual(vector3.HadamardInvert(vector3.Create(10.0, 0.1, -5.0)), vector3.Create(0.1, 10.0, -0.2));
	});
});

describe('hadamardInvert', () => {
	const nan = Number.NaN;

	it('should assign the hadamart-multiplicative inverse of a vector', () => {
		const v = vector3.Create();

		assert.deepStrictEqual(vector3.hadamardInvert(v, vector3.Create(0.0, -0.0, 0.0)), vector3.Create(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
		assert.deepStrictEqual(vector3.hadamardInvert(v, vector3.Create(1.0, -1.0, 1.0)), vector3.Create(1.0, -1.0, 1.0));
		assert.deepStrictEqual(vector3.hadamardInvert(v, vector3.Create(nan, -1.0, 1.0)), vector3.Create(nan, -1.0, 1.0));
		assert.deepStrictEqual(vector3.hadamardInvert(v, vector3.Create(1.0, nan, 1.0)), vector3.Create(1.0, nan, 1.0));
		assert.deepStrictEqual(vector3.hadamardInvert(v, vector3.Create(1.0, -1.0, nan)), vector3.Create(1.0, -1.0, nan));

		const r = vector3.hadamardInvert(v, vector3.Create(10.0, 0.1, -5.0));

		assert.deepStrictEqual(r, vector3.Create(0.1, 10.0, -0.2));
		assert.strictEqual(v, r);
	});
});

describe('Negate', () => {
	it('should return the additive inverse of a vector', () => {
		assert.deepStrictEqual(vector3.Negate(vector3.Create(0.0, 0.0, 0.0)), vector3.Create(-0.0, -0.0, -0.0));
		assert.deepStrictEqual(vector3.Negate(vector3.Create(1.0, -2.0, 3.0)), vector3.Create(-1.0, 2.0, -3.0));
		assert.deepStrictEqual(vector3.Negate(vector3.Create(-1.0, 2.0, -3.0)), vector3.Create(1.0, -2.0, 3.0));
	});
});

describe('negate', () => {
	it('should assign the additive inverse of a vector', () => {
		const v = vector3.Create(0.0, 0.0, 0.0);

		assert.deepStrictEqual(vector3.negate(v, vector3.Create(0.0, 0.0, 0.0)), vector3.Create(-0.0, -0.0, -0.0));

		const r = vector3.negate(v, vector3.Create(1.0, -2.0, 3.0));

		assert.deepStrictEqual(r, vector3.Create(-1.0, 2.0, -3.0));
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector3.negate(v, vector3.Create(-1.0, 2.0, -3.0)), vector3.Create(1.0, -2.0, 3.0));
	});
});

describe('negateAssign', () => {
	it('should return the additive inverse of a vector', () => {
		assert.deepStrictEqual(vector3.negateAssign(vector3.Create(0.0, 0.0, 0.0)), vector3.Create(-0.0, -0.0, -0.0));

		const v = vector3.Create(1.0, -2.0, 3.0);
		const r = vector3.negateAssign(v);

		assert.deepStrictEqual(r, vector3.Create(-1.0, 2.0, -3.0));
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector3.negateAssign(vector3.Create(-1.0, 2.0, -3.0)), vector3.Create(1.0, -2.0, 3.0));
	});
});

describe('MinScalar', () => {
	const inf = Number.POSITIVE_INFINITY;
	const nnf = Number.NEGATIVE_INFINITY;
	const nan = Number.NaN;

	it('should return the minimum between each vector entry and a scalar', () => {
		assert.deepStrictEqual(vector3.MinScalar(vector3.Create(1.0, 2.0, 3.0), 4.0), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.MinScalar(vector3.Create(1.0, 2.0, 3.0), 2.0), vector3.Create(1.0, 2.0, 2.0));
		assert.deepStrictEqual(vector3.MinScalar(vector3.Create(1.0, 2.0, 3.0), 0.0), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.MinScalar(vector3.Create(inf, nnf, nan), 0.0), vector3.Create(0.0, nnf, nan));
		assert.deepStrictEqual(vector3.MinScalar(vector3.Create(1.0, 2.0, 3.0), inf), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.MinScalar(vector3.Create(1.0, 2.0, 3.0), nnf), vector3.Create(nnf, nnf, nnf));
		assert.deepStrictEqual(vector3.MinScalar(vector3.Create(1.0, 2.0, 3.0), nan), vector3.Create(nan, nan, nan));
	});
});

describe('minScalar', () => {
	const inf = Number.POSITIVE_INFINITY;
	const nnf = Number.NEGATIVE_INFINITY;
	const nan = Number.NaN;

	it('should assign the minimum between each vector entry and a scalar', () => {
		const v = vector3.Create();
		const r = vector3.minScalar(v, vector3.Create(1.0, 2.0, 3.0), 4.0);

		assert.deepStrictEqual(r, vector3.Create(1.0, 2.0, 3.0));
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector3.minScalar(v, vector3.Create(1.0, 2.0, 3.0), 2.0), vector3.Create(1.0, 2.0, 2.0));
		assert.deepStrictEqual(vector3.minScalar(v, vector3.Create(1.0, 2.0, 3.0), 0.0), vector3.Create(0.0, 0.0, 0.0));
		assert.deepStrictEqual(vector3.minScalar(v, vector3.Create(inf, nnf, nan), 0.0), vector3.Create(0.0, nnf, nan));
		assert.deepStrictEqual(vector3.minScalar(v, vector3.Create(1.0, 2.0, 3.0), inf), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.minScalar(v, vector3.Create(1.0, 2.0, 3.0), nnf), vector3.Create(nnf, nnf, nnf));
		assert.deepStrictEqual(vector3.minScalar(v, vector3.Create(1.0, 2.0, 3.0), nan), vector3.Create(nan, nan, nan));
	});
});

describe('MaxScalar', () => {
	const inf = Number.POSITIVE_INFINITY;
	const nnf = Number.NEGATIVE_INFINITY;
	const nan = Number.NaN;

	it('should return the minimum between each vector entry and a scalar', () => {
		assert.deepStrictEqual(vector3.MaxScalar(vector3.Create(1.0, 2.0, 3.0), 4.0), vector3.Create(4.0, 4.0, 4.0));
		assert.deepStrictEqual(vector3.MaxScalar(vector3.Create(1.0, 2.0, 3.0), 2.0), vector3.Create(2.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.MaxScalar(vector3.Create(1.0, 2.0, 3.0), 0.0), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.MaxScalar(vector3.Create(inf, nnf, nan), 0.0), vector3.Create(inf, 0.0, nan));
		assert.deepStrictEqual(vector3.MaxScalar(vector3.Create(1.0, 2.0, 3.0), inf), vector3.Create(inf, inf, inf));
		assert.deepStrictEqual(vector3.MaxScalar(vector3.Create(1.0, 2.0, 3.0), nnf), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.MaxScalar(vector3.Create(1.0, 2.0, 3.0), nan), vector3.Create(nan, nan, nan));
	});
});

describe('maxScalar', () => {
	const inf = Number.POSITIVE_INFINITY;
	const nnf = Number.NEGATIVE_INFINITY;
	const nan = Number.NaN;

	it('should assign the minimum between each vector3 entry and a scalar', () => {
		const v = vector3.Create();
		const r = vector3.maxScalar(v, vector3.Create(1.0, 2.0, 3.0), 4.0);

		assert.deepStrictEqual(r, vector3.Create(4.0, 4.0, 4.0));
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector3.maxScalar(v, vector3.Create(1.0, 2.0, 3.0), 2.0), vector3.Create(2.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.maxScalar(v, vector3.Create(1.0, 2.0, 3.0), 0.0), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.maxScalar(v, vector3.Create(inf, nnf, nan), 0.0), vector3.Create(inf, 0.0, nan));
		assert.deepStrictEqual(vector3.maxScalar(v, vector3.Create(1.0, 2.0, 3.0), inf), vector3.Create(inf, inf, inf));
		assert.deepStrictEqual(vector3.maxScalar(v, vector3.Create(1.0, 2.0, 3.0), nnf), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.maxScalar(v, vector3.Create(1.0, 2.0, 3.0), nan), vector3.Create(nan, nan, nan));
	});
});

describe('ClampScalar', () => {
	const inf = Number.POSITIVE_INFINITY;
	const nnf = Number.NEGATIVE_INFINITY;
	const nan = Number.NaN;

	it('should return vector3 entries clamped between two values', () => {
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), 0.0, 4.0), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), 2.0, 4.0), vector3.Create(2.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), 0.0, 2.0), vector3.Create(1.0, 2.0, 2.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), 4.0, 0.0), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(-1.0, -2.0, -3.0), -4.0,  0.0), vector3.Create(-1.0, -2.0, -3.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(-1.0, -2.0, -3.0), -4.0, -2.0), vector3.Create(-2.0, -2.0, -3.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(-1.0, -2.0, -3.0), -2.0,  0.0), vector3.Create(-1.0, -2.0, -2.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(-1.0, -2.0, -3.0),  0.0, -4.0), vector3.Create(-1.0, -2.0, -3.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(inf, nnf, nan), -4.0, 4.0), vector3.Create(4.0, -4.0, nan));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), nnf, inf), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), inf, nnf), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), nan, 4.0), vector3.Create(nan, nan, nan));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), 0.0, nan), vector3.Create(nan, nan, nan));
		assert.deepStrictEqual(vector3.ClampScalar(vector3.Create(1.0, 2.0, 3.0), nan, nan), vector3.Create(nan, nan, nan));
	});
});

describe('clampScalar', () => {
	const inf = Number.POSITIVE_INFINITY;
	const nnf = Number.NEGATIVE_INFINITY;
	const nan = Number.NaN;

	it('should assign vector3 entries clamped between two values', () => {
		const v = vector3.Create();
		const r = vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), 0.0, 4.0);

		assert.deepStrictEqual(r, vector3.Create(1.0, 2.0, 3.0));
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), 2.0, 4.0), vector3.Create(2.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), 0.0, 2.0), vector3.Create(1.0, 2.0, 2.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), 4.0, 0.0), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(-1.0, -2.0, -3.0), -4.0,  0.0), vector3.Create(-1.0, -2.0, -3.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(-1.0, -2.0, -3.0), -4.0, -2.0), vector3.Create(-2.0, -2.0, -3.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(-1.0, -2.0, -3.0), -2.0,  0.0), vector3.Create(-1.0, -2.0, -2.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(-1.0, -2.0, -3.0),  0.0, -4.0), vector3.Create(-1.0, -2.0, -3.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(inf, nnf, nan), -4.0, 4.0), vector3.Create(4.0, -4.0, nan));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), nnf, inf), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), inf, nnf), vector3.Create(1.0, 2.0, 3.0));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), nan, 4.0), vector3.Create(nan, nan, nan));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), 0.0, nan), vector3.Create(nan, nan, nan));
		assert.deepStrictEqual(vector3.clampScalar(v, vector3.Create(1.0, 2.0, 3.0), nan, nan), vector3.Create(nan, nan, nan));
	});
});

describe('Copy', () => {
	it('should return a Vector3 representing a copy', () => {
		const v = vector3.Create(1.0, 2.0, 4.0);
		const w = vector3.Copy(v);

		assert.notStrictEqual(v, w);
		assert.deepStrictEqual(v, w);
	});

	it('should return a Vector3 representing the (x y z) components of a derived vector', () => {
		const v = vector4.Create(1.0, 2.0, 3.0, 4.0);
		const w = vector3.Copy(v);

		assert.notStrictEqual(v, w);
		assert.notDeepStrictEqual(v, w);
		assert.deepStrictEqual(w, vector3.Create(1.0, 2.0, 3.0));
	});
});

describe('copy', () => {
	it('should set a Vector3 to represent a copy', () => {
		const v = vector3.Create(1.0, 2.0, 4.0);
		const w = vector3.Create();
		const r = vector3.copy(w, v);

		assert.notStrictEqual(v, w);
		assert.deepStrictEqual(v, w);
		assert.strictEqual(w, r);
	});

	it('should set a Vector3 to represent the (x y z) components of a derived vector', () => {
		const v = vector4.Create(1.0, 2.0, 3.0, 4.0);
		const w = vector3.Create();
		const r = vector3.copy(w, v);

		assert.notStrictEqual(v, w);
		assert.notDeepStrictEqual(v, w);
		assert.deepStrictEqual(w, vector3.Create(1.0, 2.0, 3.0));
		assert.strictEqual(w, r);
	});
});

describe('createStringifier', () => {
	it('should return a function converting a Vector3 to a string', () => {
		assert.strictEqual(vector3.createStringifier()(vector3.Create()), '0.000,0.000,0.000');
		assert.strictEqual(vector3.createStringifier()(vector3.Create(Number.NaN)), 'NaN,0.000,0.000');
		assert.strictEqual(vector3.createStringifier()(vector3.Create(0.0, Number.NaN)), '0.000,NaN,0.000');
		assert.strictEqual(vector3.createStringifier()(vector3.Create(0.0, 0.0, Number.NaN)), '0.000,0.000,NaN');
		assert.strictEqual(vector3.createStringifier({ nanString : '-' })(vector3.Create(0.0, Number.NaN)), '0.000,-,0.000');
		assert.strictEqual(
			vector3.createStringifier()(vector3.Create(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)),
			'999999999999999868928.000,-999999999999999868928.000,999999999999999868928.000'
		);
		assert.strictEqual(
			vector3.createStringifier({
				clampMin : vector3.Create(-1000.0, -2000.0, -3000.0),
				clampMax : vector3.Create(1000.0, 2000.0, 3000.0)
			})(vector3.Create(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)),
			'1000.000,-2000.000,3000.000'
		);
		assert.strictEqual(
			vector3.createStringifier({
				clampMin : vector3.Create(-1e21, -1e21, -1e21),
				clampMax : vector3.Create(1e21, 1e21, 1e21)
			})(vector3.Create(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)),
			'1e+21,-1e+21,1e+21'
		);
		assert.strictEqual(
			vector3.createStringifier({
				clampMin : vector3.Create(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
				clampMax : vector3.Create(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
			})(vector3.Create(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)),
			'+Infinity,-Infinity,+Infinity'
		);
		assert.strictEqual(
			vector3.createStringifier({
				clampMin : vector3.Create(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
				clampMax : vector3.Create(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
				posInfString : '+∞',
				negInfString : '-∞'
			})(vector3.Create(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)),
			'+∞,-∞,+∞'
		);
		assert.strictEqual(
			// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
			vector3.createStringifier()(vector3.Create(0.00049, 0.0005, 0.00049999999999999999)),
			'0.000,0.001,0.001'
		);
		assert.strictEqual(
			// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
			vector3.createStringifier({ precision : 2 })(vector3.Create(0.0049, 0.005, 0.0049999999999999999)),
			'0.00,0.01,0.01'
		);
		assert.strictEqual(
			vector3.createStringifier({ delimiter : ', ' })(vector3.Create(1.0, 2.0, 3.0)),
			'1.000, 2.000, 3.000'
		);
	});
});

describe('toF32', () => {
	it('should return a Float32Array representing a Vector3', () => {
		assert.deepStrictEqual(
			vector3.toF32(vector3.Create(1.0, 2.0, 3.0)),
			new Float32Array([ 1.0, 2.0, 3.0 ])
		);
	});
});

describe('assignF32', () => {
	it('should assign a Float32Array representing a Vector3', () => {
		const v = vector3.Create(1.0, 2.0, 3.0);
		const f = new Float32Array(3);
		const r = vector3.assignF32(f, v);

		assert.deepStrictEqual(r, new Float32Array([ 1.0, 2.0, 3.0 ]));
		assert.strictEqual(f, r);
	});

	it('should assign an offset inside a Float32Array representing a Vector3', () => {
		const v = vector3.Create(2.0, 3.0, 4.0);
		const f = new Float32Array([ 1.0, 0.0, 0.0, 0.0, 5.0 ]);

		assert.deepStrictEqual(vector3.assignF32(f, v, 1), new Float32Array([ 1.0, 2.0, 3.0, 4.0, 5.0 ]));
	});
});

describe('toF64', () => {
	it('should return a Float64Array representing a Vector3', () => {
		assert.deepStrictEqual(
			vector3.toF64(vector3.Create(1.0, 2.0, 3.0)),
			new Float64Array([ 1.0, 2.0, 3.0 ])
		);
	});
});

describe('assignF64', () => {
	it('should assign a Float64Array representing a Vector3', () => {
		const v = vector3.Create(1.0, 2.0, 3.0);
		const f = new Float64Array(3);
		const r = vector3.assignF64(f, v);

		assert.deepStrictEqual(r, new Float64Array([ 1.0, 2.0, 3.0 ]));
		assert.strictEqual(f, r);
	});

	it('should assign an offset inside a Float64Array representing a Vector3', () => {
		const v = vector3.Create(2.0, 3.0, 4.0);
		const f = new Float64Array([ 1.0, 0.0, 0.0, 0.0, 5.0 ]);

		assert.deepStrictEqual(vector3.assignF64(f, v, 1), new Float64Array([ 1.0, 2.0, 3.0, 4.0, 5.0 ]));
	});
});

describe('F32', () => {
	it('should return a Vector3 representing a Float32Array', () => {
		assert.deepStrictEqual(
			vector3.F32(new Float32Array([ 1.0, 2.0, 3.0 ])),
			{ x : 1.0, y : 2.0, z : 3.0 }
		);
	});

	it('should return a Vector3 representing an offset into a Float32Array', () => {
		assert.deepStrictEqual(
			vector3.F32(new Float32Array([ 1.0, 2.0, 3.0, 4.0, 5.0 ]), 1),
			{ x : 2.0, y : 3.0, z : 4.0 }
		);
	});
});

describe('f32', () => {
	it('should assign a Vector3 representing a Float32Array', () => {
		const f = new Float32Array([ 1.0, 2.0, 3.0 ]);
		const v = vector3.Create();
		const r = vector3.f32(v, f);

		assert.deepStrictEqual(r, { x : 1.0, y : 2.0, z : 3.0 });
		assert.strictEqual(v, r);
	});

	it('should assign a Vector3 representing an offset into a Float32Array', () => {
		const v = vector3.Create();

		assert.deepStrictEqual(
			vector3.f32(v, new Float32Array([ 1.0, 2.0, 3.0, 4.0, 5.0 ]), 1),
			{ x : 2.0, y : 3.0, z : 4.0 }
		);
	});
});

describe('F64', () => {
	it('should return a Vector3 representing a Float64Array', () => {
		assert.deepStrictEqual(
			vector3.F64(new Float64Array([ 1.0, 2.0, 3.0 ])),
			{ x : 1.0, y : 2.0, z : 3.0 }
		);
	});

	it('should return a Vector3 representing an offset into a Float64Array', () => {
		assert.deepStrictEqual(
			vector3.F64(new Float64Array([ 1.0, 2.0, 3.0, 4.0, 5.0 ]), 1),
			{ x : 2.0, y : 3.0, z : 4.0 }
		);
	});
});

describe('f64', () => {
	it('should assign a Vector3 representing a Float64Array', () => {
		const f = new Float64Array([ 1.0, 2.0, 3.0 ]);
		const v = vector3.Create();
		const r = vector3.f64(v, f);

		assert.deepStrictEqual(r, { x : 1.0, y : 2.0, z : 3.0 });
		assert.strictEqual(v, r);
	});

	it('should assign a Vector3 representing an offset into a Float64Array', () => {
		const v = vector3.Create();

		assert.deepStrictEqual(
			vector3.f64(v, new Float64Array([ 1.0, 2.0, 3.0, 4.0, 5.0 ]), 1),
			{ x : 2.0, y : 3.0, z : 4.0 }
		);
	});
});
