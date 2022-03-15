/* eslint key-spacing : [ error , { beforeColon : true, afterColon : true, mode : "minimum" }] */
/* eslint no-multi-spaces : [ off ] */
import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as vec3 from '../source/vector3';
import * as mat3 from '../source/matrix3';
import * as mat4 from '../source/matrix4';
import { assertEqualsMat4 as assertEquals, assertEqualsScalar } from './assert/assert';


const epsilon = 1e-10;
const turn = 2.0 * Math.PI;


describe('equals', () => {
	it('should return true if a equals b', () => {
		const a:mat4.Matrix4 = {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		};
		const c = { ...a, r00 : Number.NaN };

		assert.strictEqual(mat4.equals(a, a), true);
		assert.strictEqual(mat4.equals(c, c), false);
		assert.strictEqual(mat4.equals(mat4.Identity(), mat4.Identity()), true);
		assert.strictEqual(mat4.equals({ ...a, r00 : Number.NaN }, { ...a, r00 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r10 : Number.NaN }, { ...a, r10 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r20 : Number.NaN }, { ...a, r20 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r30 : Number.NaN }, { ...a, r30 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r01 : Number.NaN }, { ...a, r01 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r11 : Number.NaN }, { ...a, r11 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r21 : Number.NaN }, { ...a, r21 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r31 : Number.NaN }, { ...a, r31 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r02 : Number.NaN }, { ...a, r02 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r12 : Number.NaN }, { ...a, r12 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r22 : Number.NaN }, { ...a, r22 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r32 : Number.NaN }, { ...a, r32 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r03 : Number.NaN }, { ...a, r03 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r13 : Number.NaN }, { ...a, r13 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r23 : Number.NaN }, { ...a, r23 : Number.NaN }), false);
		assert.strictEqual(mat4.equals({ ...a, r33 : Number.NaN }, { ...a, r33 : Number.NaN }), false);
		assert.strictEqual(mat4.equals(mat4.Identity(), { ...mat4.Identity(), r00 : 1.01 }, 1e-3), false);
		assert.strictEqual(mat4.equals(mat4.Identity(), { ...mat4.Identity(), r00 : 1.01 }, 1e-1), true);
	});
});

describe('determinant', () => {
	it('should return the determinant of a Matrix4', () => {
		assertEqualsScalar(mat4.determinant(mat4.Identity()), 1.0, epsilon);
		assertEqualsScalar(mat4.determinant(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn))), 0.5, epsilon);
		assertEqualsScalar(mat4.determinant(mat4.ShearTranslation(
			vec3.AxisX(2.0),
			vec3.AxisY(),
			vec3.AxisZ(),
			vec3.Create(1.0, 2.0, 3.0)
		)), 2.0, epsilon);
		assertEqualsScalar(mat4.determinant(mat4.ShearTranslation(
			vec3.AxisX(1.0),
			vec3.AxisY(2.0),
			vec3.AxisZ(2.0),
			vec3.Create()
		)), 4.0, epsilon);
		assertEqualsScalar(mat4.determinant(mat4.ShearTranslation(
			vec3.AxisX(2.0),
			vec3.AxisY(2.0),
			vec3.AxisZ(1.0),
			vec3.Create()
		)), 4.0, epsilon);
		assertEqualsScalar(mat4.determinant(mat4.ShearTranslation(
			vec3.AxisX(2.0),
			vec3.AxisY(1.0),
			vec3.AxisZ(2.0),
			vec3.Create()
		)), 4.0, epsilon);
	});
});

describe('Identity', () => {
	it('should return a Matrix4 representing the 4x4 identity matrix', () => {
		assert.deepStrictEqual(mat4.Identity(), {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		});
	});
});

describe('identity', () => {
	it('should set a Matrix4 to represent the 4x4 identity matrix', () => {
		const m:mat4.Matrix4 = {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		};
		const r = mat4.identity(m);

		assert.deepStrictEqual(r, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		});
		assert.strictEqual(m, r);
	});
});

describe('Translation', () => {
	it('should return a Matrix4 representing a translation', () => {
		assert.deepStrictEqual(mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 2.0, r13 : 3.0, r23 : 4.0, r33 : 1.0
		});
	});
});

describe('translation', () => {
	it('should set a Matrix4 to represent a translation', () => {
		const m = mat4.Identity();
		const r = mat4.translation(m, vec3.Create(2.0, 3.0, 4.0));

		assert.deepStrictEqual(r, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 2.0, r13 : 3.0, r23 : 4.0, r33 : 1.0
		});
		assert.strictEqual(m, r);
	});
});

describe('ShearMatrix3', () => {
	it('should return a Matrix4 representing a shear', () => {
		assert.deepStrictEqual(mat4.ShearMatrix3({
			r00 : 2.0, r10 : 3.0, r20 :  4.0,
			r01 : 5.0, r11 : 6.0, r21 :  7.0,
			r02 : 8.0, r12 : 9.0, r22 : 10.0
		}), {
			r00 : 2.0, r10 : 3.0, r20 :  4.0, r30 : 0.0,
			r01 : 5.0, r11 : 6.0, r21 :  7.0, r31 : 0.0,
			r02 : 8.0, r12 : 9.0, r22 : 10.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 :  0.0, r33 : 1.0
		});
	});
});

describe('shearMatrix3', () => {
	it('should set a Matrix4 to represent a shear', () => {
		const m = mat4.Identity();
		const r = mat4.shearMatrix3(m, {
			r00 : 2.0, r10 : 3.0, r20 :  4.0,
			r01 : 5.0, r11 : 6.0, r21 :  7.0,
			r02 : 8.0, r12 : 9.0, r22 : 10.0
		});

		assert.deepStrictEqual(r, {
			r00 : 2.0, r10 : 3.0, r20 :  4.0, r30 : 0.0,
			r01 : 5.0, r11 : 6.0, r21 :  7.0, r31 : 0.0,
			r02 : 8.0, r12 : 9.0, r22 : 10.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 :  0.0, r33 : 1.0
		});
		assert.deepStrictEqual(m, r);
	});
});

describe('ShearTranslation', () => {
	it('should return a Matrix4 representing a shear and translation', () => {
		assert.deepStrictEqual(mat4.ShearTranslation(
			vec3.Create(2.0, 3.0, 4.0),
			vec3.Create(5.0, 6.0, 7.0),
			vec3.Create(8.0, 9.0, 10.0),
			vec3.Create(11.0, 12.0, 13.0)
		), {
			r00 : 2.0, r10 : 3.0, r20 : 4.0, r30 : 0.0,
			r01 : 5.0, r11 : 6.0, r21 : 7.0, r31 : 0.0,
			r02 : 8.0, r12 : 9.0, r22 : 10.0, r32 : 0.0,
			r03 : 11.0, r13 : 12.0, r23 : 13.0, r33 : 1.0
		});
	});
});

describe('shearTranslation', () => {
	it('should set a Matrix4 to represent a shear and translation', () => {
		const m = mat4.Identity();
		const r = mat4.shearTranslation(
			m,
			vec3.Create(2.0, 3.0, 4.0),
			vec3.Create(5.0, 6.0, 7.0),
			vec3.Create(8.0, 9.0, 10.0),
			vec3.Create(11.0, 12.0, 13.0)
		);

		assert.deepStrictEqual(r, {
			r00 : 2.0, r10 : 3.0, r20 : 4.0, r30 : 0.0,
			r01 : 5.0, r11 : 6.0, r21 : 7.0, r31 : 0.0,
			r02 : 8.0, r12 : 9.0, r22 : 10.0, r32 : 0.0,
			r03 : 11.0, r13 : 12.0, r23 : 13.0, r33 : 1.0
		});
		assert.strictEqual(m, r);
	});
});

describe('Add', () => {
	it('should return a Matrix4 representing an addition', () => {
		assertEquals(mat4.Add({
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		}, {
			r00 : 0.01, r10 : 0.02, r20 : 0.03, r30 : 0.04,
			r01 : 0.05, r11 : 0.06, r21 : 0.07, r31 : 0.08,
			r02 : 0.09, r12 : 0.10, r22 : 0.11, r32 : 0.12,
			r03 : 0.13, r13 : 0.14, r23 : 0.15, r33 : 0.16
		}), {
			r00 :  1.01, r10 :  2.02, r20 :  3.03, r30 :  4.04,
			r01 :  5.05, r11 :  6.06, r21 :  7.07, r31 :  8.08,
			r02 :  9.09, r12 : 10.10, r22 : 11.11, r32 : 12.12,
			r03 : 13.13, r13 : 14.14, r23 : 15.15, r33 : 16.16
		}, epsilon);
	});
});

describe('add', () => {
	it('should set a Matrix4 to represent an addition', () => {
		const m = mat4.Identity();
		const r = mat4.add(m, {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		}, {
			r00 : 0.01, r10 : 0.02, r20 : 0.03, r30 : 0.04,
			r01 : 0.05, r11 : 0.06, r21 : 0.07, r31 : 0.08,
			r02 : 0.09, r12 : 0.10, r22 : 0.11, r32 : 0.12,
			r03 : 0.13, r13 : 0.14, r23 : 0.15, r33 : 0.16
		});

		assertEquals(r, {
			r00 :  1.01, r10 :  2.02, r20 :  3.03, r30 :  4.04,
			r01 :  5.05, r11 :  6.06, r21 :  7.07, r31 :  8.08,
			r02 :  9.09, r12 : 10.10, r22 : 11.11, r32 : 12.12,
			r03 : 13.13, r13 : 14.14, r23 : 15.15, r33 : 16.16
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('addAssign', () => {
	it('should set a Matrix4 to represent an addition', () => {
		const m:mat4.Matrix4 = {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		};
		const r = mat4.addAssign(m, {
			r00 : 0.01, r10 : 0.02, r20 : 0.03, r30 : 0.04,
			r01 : 0.05, r11 : 0.06, r21 : 0.07, r31 : 0.08,
			r02 : 0.09, r12 : 0.10, r22 : 0.11, r32 : 0.12,
			r03 : 0.13, r13 : 0.14, r23 : 0.15, r33 : 0.16
		});

		assertEquals(r, {
			r00 :  1.01, r10 :  2.02, r20 :  3.03, r30 :  4.04,
			r01 :  5.05, r11 :  6.06, r21 :  7.07, r31 :  8.08,
			r02 :  9.09, r12 : 10.10, r22 : 11.11, r32 : 12.12,
			r03 : 13.13, r13 : 14.14, r23 : 15.15, r33 : 16.16
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Subtract', () => {
	it('should return a Matrix4 representing a subtraction', () => {
		assertEquals(mat4.Subtract({
			r00 :  1.01, r10 :  2.02, r20 :  3.03, r30 :  4.04,
			r01 :  5.05, r11 :  6.06, r21 :  7.07, r31 :  8.08,
			r02 :  9.09, r12 : 10.10, r22 : 11.11, r32 : 12.12,
			r03 : 13.13, r13 : 14.14, r23 : 15.15, r33 : 16.16
		}, {
			r00 : 0.01, r10 : 0.02, r20 : 0.03, r30 : 0.04,
			r01 : 0.05, r11 : 0.06, r21 : 0.07, r31 : 0.08,
			r02 : 0.09, r12 : 0.10, r22 : 0.11, r32 : 0.12,
			r03 : 0.13, r13 : 0.14, r23 : 0.15, r33 : 0.16
		}), {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		}, epsilon);
	});
});

describe('subtract', () => {
	it('should set a Matrix4 to represent a subtraction', () => {
		const m = mat4.Identity();
		const r = mat4.subtract(m, {
			r00 :  1.01, r10 :  2.02, r20 :  3.03, r30 :  4.04,
			r01 :  5.05, r11 :  6.06, r21 :  7.07, r31 :  8.08,
			r02 :  9.09, r12 : 10.10, r22 : 11.11, r32 : 12.12,
			r03 : 13.13, r13 : 14.14, r23 : 15.15, r33 : 16.16
		}, {
			r00 : 0.01, r10 : 0.02, r20 : 0.03, r30 : 0.04,
			r01 : 0.05, r11 : 0.06, r21 : 0.07, r31 : 0.08,
			r02 : 0.09, r12 : 0.10, r22 : 0.11, r32 : 0.12,
			r03 : 0.13, r13 : 0.14, r23 : 0.15, r33 : 0.16
		});

		assertEquals(r, {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('subtractAssign', () => {
	it('should set a Matrix4 to represent a subtraction', () => {
		const m:mat4.Matrix4 = {
			r00 :  1.01, r10 :  2.02, r20 :  3.03, r30 :  4.04,
			r01 :  5.05, r11 :  6.06, r21 :  7.07, r31 :  8.08,
			r02 :  9.09, r12 : 10.10, r22 : 11.11, r32 : 12.12,
			r03 : 13.13, r13 : 14.14, r23 : 15.15, r33 : 16.16
		};
		const r = mat4.subtractAssign(m, {
			r00 : 0.01, r10 : 0.02, r20 : 0.03, r30 : 0.04,
			r01 : 0.05, r11 : 0.06, r21 : 0.07, r31 : 0.08,
			r02 : 0.09, r12 : 0.10, r22 : 0.11, r32 : 0.12,
			r03 : 0.13, r13 : 0.14, r23 : 0.15, r33 : 0.16
		});

		assertEquals(r, {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('ConcatScale', () => {
	it('should return a Matrix4 representing a concatenation', () => {
		assertEquals(mat4.ConcatScale(mat4.Identity(), vec3.Create(1.0, 1.0, 1.0)), mat4.Identity(), epsilon);
		assertEquals(
			mat4.ConcatScale(mat4.ShearMatrix3(mat3.Scale(vec3.Create(1.0, 2.0, 3.0))), vec3.Create(0.5, 1.5, 2.5)),
			mat4.Concat(mat4.ShearMatrix3(mat3.Scale(vec3.Create(1.0, 2.0, 3.0))), mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5)))),
			epsilon
		);
		assertEquals(
			mat4.ConcatScale(mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), vec3.Create(0.5, 1.5, 2.5)),
			mat4.Concat(mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5)))),
			epsilon
		);
		assertEquals(
			mat4.ConcatScale(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), vec3.Create(0.5, 1.5, 2.5)),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5)))),
			epsilon
		);
	});
});

describe('concatScale', () => {
	it('should set a Matrix4 to represent a concatenation', () => {
		const m = mat4.Identity();

		assertEquals(mat4.concatScale(m, mat4.Identity(), vec3.Create(1.0, 1.0, 1.0)), mat4.Identity(), epsilon);

		const r = mat4.concatScale(m, mat4.ShearMatrix3(mat3.Scale(vec3.Create(1.0, 2.0, 3.0))), vec3.Create(0.5, 1.5, 2.5));

		assertEquals(
			r,
			mat4.Concat(mat4.ShearMatrix3(mat3.Scale(vec3.Create(1.0, 2.0, 3.0))), mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5)))),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat4.concatScale(m, mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), vec3.Create(0.5, 1.5, 2.5)),
			mat4.Concat(mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5)))),
			epsilon
		);
		assertEquals(
			mat4.concatScale(m, mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), vec3.Create(0.5, 1.5, 2.5)),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5)))),
			epsilon
		);
	});
});

describe('ConcatTranslation', () => {
	it('should return a Matrix4 representing a concatenation', () => {
		assertEquals(mat4.ConcatTranslation(mat4.Identity(), vec3.Create()), mat4.Identity(), epsilon);
		assertEquals(
			mat4.ConcatTranslation(mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))), vec3.Create(1.0, 2.0, 3.0)),
			mat4.Concat(mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			epsilon
		);
		assertEquals(
			mat4.ConcatTranslation(mat4.Translation(vec3.Create(0.5, 1.5, 2.5)), vec3.Create(1.0, 2.0, 3.0)),
			mat4.Concat(mat4.Translation(vec3.Create(0.5, 1.5, 2.5)), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			epsilon
		);
		assertEquals(
			mat4.ConcatTranslation(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), vec3.Create(1.0, 2.0, 3.0)),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			epsilon
		);
	});
});

describe('concatTranslation', () => {
	it('should set a Matrix4 to represent a concatenation', () => {
		const m = mat4.Identity();

		assertEquals(mat4.concatTranslation(m, mat4.Identity(), vec3.Create()), mat4.Identity(), epsilon);

		const r = mat4.concatTranslation(m, mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))), vec3.Create(1.0, 2.0, 3.0));

		assertEquals(
			r,
			mat4.Concat(mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat4.concatTranslation(m, mat4.Translation(vec3.Create(0.5, 1.5, 2.5)), vec3.Create(1.0, 2.0, 3.0)),
			mat4.Concat(mat4.Translation(vec3.Create(0.5, 1.5, 2.5)), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			epsilon
		);
		assertEquals(
			mat4.concatTranslation(m, mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), vec3.Create(1.0, 2.0, 3.0)),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			epsilon
		);
	});
});

describe('ConcatMatrix3', () => {
	it('should return a Matrix4 representing a concatenation', () => {
		assertEquals(mat4.ConcatMatrix3(mat4.Identity(), mat3.Identity()), mat4.Identity(), epsilon);
		assertEquals(
			mat4.ConcatMatrix3(mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))), mat3.RotationX(0.125 * turn)),
			mat4.Concat(mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))), mat4.ShearMatrix3(mat3.RotationX(0.125 * turn))),
			epsilon
		);
		assertEquals(
			mat4.ConcatMatrix3(mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), mat3.RotationX(0.125 * turn)),
			mat4.Concat(mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), mat4.ShearMatrix3(mat3.RotationX(0.125 * turn))),
			epsilon
		);
		assertEquals(
			mat4.ConcatMatrix3(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), mat4.ShearMatrix3(mat3.RotationX(0.125 * turn))),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), mat4.ShearMatrix3(mat3.RotationX(0.125 * turn))),
			epsilon
		);
	});
});

describe('concatMatrix3', () => {
	it('should set a Matrix4 to represent a concatenation', () => {
		const m = mat4.Identity();

		assertEquals(mat4.concatMatrix3(m, mat4.Identity(), mat3.Identity()), mat4.Identity(), epsilon);

		const r = mat4.concatMatrix3(m, mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))), mat3.RotationX(0.125 * turn));

		assertEquals(
			r,
			mat4.Concat(mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))), mat4.ShearMatrix3(mat3.RotationX(0.125 * turn))),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat4.concatMatrix3(m, mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), mat3.RotationX(0.125 * turn)),
			mat4.Concat(mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), mat4.ShearMatrix3(mat3.RotationX(0.125 * turn))),
			epsilon
		);
		assertEquals(
			mat4.concatMatrix3(m, mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), mat4.ShearMatrix3(mat3.RotationX(0.125 * turn))),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.125 * turn)), mat4.ShearMatrix3(mat3.RotationX(0.125 * turn))),
			epsilon
		);
	});
});

describe('Concat3x4', () => {
	it('should return a Matrix4 representing a concatenation', () => {
		assertEquals(mat4.Concat3x4(mat4.Identity(), mat4.Identity()), mat4.Identity(), epsilon);
		assertEquals(
			mat4.Concat3x4(mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0))), mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))),
			mat4.Concat(mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0))), mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))),
			epsilon
		);
		assertEquals(
			mat4.Concat3x4(mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0)))),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0)))),
			epsilon
		);
		assertEquals(
			mat4.Concat3x4(mat4.Translation(vec3.Create(1.0, 2.0, 3.0)), mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))),
			mat4.Concat(mat4.Translation(vec3.Create(1.0, 2.0, 3.0)), mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))),
			epsilon
		);
		assertEquals(
			mat4.Concat3x4(mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			epsilon
		);
	});
});

describe('concat3x4', () => {
	it('should set a Matrix4 to represent a concatenation', () => {
		const m = mat4.Identity();

		assertEquals(mat4.concat3x4(m, mat4.Identity(), mat4.Identity()), mat4.Identity(), epsilon);

		const r = mat4.concat3x4(m, mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0))), mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)));

		assertEquals(
			r,
			mat4.Concat(mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0))), mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat4.concat3x4(m, mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0)))),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0)))),
			epsilon
		);
		assertEquals(
			mat4.concat3x4(m, mat4.Translation(vec3.Create(1.0, 2.0, 3.0)), mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))),
			mat4.Concat(mat4.Translation(vec3.Create(1.0, 2.0, 3.0)), mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))),
			epsilon
		);
		assertEquals(
			mat4.concat3x4(m, mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat4.Translation(vec3.Create(1.0, 2.0, 3.0))),
			epsilon
		);
	});
});

describe('Concat', () => {
	it('should return a Matrix4 representing a 4x4 concatenation', () => {
		assertEquals(mat4.Concat(mat4.Identity(), mat4.Identity()), mat4.Identity(), epsilon);
		assertEquals(mat4.Concat(
			mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0))),
			mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))
		), {
			r00 :  0.0, r10 : 3.0, r20 : 0.0, r30 : 0.0,
			r01 : -2.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 4.0, r32 : 0.0,
			r03 :  0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.Concat(
			mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)),
			mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0)))
		), {
			r00 :  0.0, r10 : 2.0, r20 : 0.0, r30 : 0.0,
			r01 : -3.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 4.0, r32 : 0.0,
			r03 :  0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.Concat(mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), mat4.ShearMatrix3(mat3.RotationZ(0.25 * turn))), {
			r00 :  0.0, r10 : 1.0, r20 : 0.0, r30 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 :  2.0, r13 : 3.0, r23 : 4.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.Concat(mat4.ShearMatrix3(mat3.RotationZ(0.25 * turn)), mat4.Translation(vec3.Create(2.0, 3.0, 4.0))), {
			r00 :  0.0, r10 : 1.0, r20 : 0.0, r30 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : -3.0, r13 : 2.0, r23 : 4.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.Concat(
			mat4.Translation(vec3.Create(2.0, 3.0, 4.0)),
			mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5)))
		), {
			r00 :  0.5, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 :  0.0, r11 : 1.5, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 2.5, r32 : 0.0,
			r03 :  2.0, r13 : 3.0, r23 : 4.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.Concat(
			mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))),
			mat4.Translation(vec3.Create(2.0, 3.0, 4.0))
		), {
			r00 :  0.5, r10 : 0.0, r20 :  0.0, r30 : 0.0,
			r01 :  0.0, r11 : 1.5, r21 :  0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 :  2.5, r32 : 0.0,
			r03 :  1.0, r13 : 4.5, r23 : 10.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.Concat(
			mat4.ShearMatrix3(mat3.RotationZ(0.25 * Math.PI)),
			mat4.ShearMatrix3(mat3.RotationX(0.25 * Math.PI))
		), {
			r00 :  0.7071, r10 :  0.7071, r20 : 0.0,    r30 : 0.0,
			r01 : -0.5,    r11 :  0.5,    r21 : 0.7071, r31 : 0.0,
			r02 :  0.5,    r12 : -0.5,    r22 : 0.7071, r32 : 0.0,
			r03 :  0.0,    r13 :  0.0,    r23 : 0.0,    r33 : 1.0
		}, 1e-4);
		assertEquals(mat4.Concat(
			mat4.ShearMatrix3(mat3.RotationX(0.25 * Math.PI)),
			mat4.ShearMatrix3(mat3.RotationZ(0.25 * Math.PI))
		), {
			r00 :  0.7071, r10 :  0.5,    r20 : 0.5,    r30 : 0.0,
			r01 : -0.7071, r11 :  0.5,    r21 : 0.5,    r31 : 0.0,
			r02 :  0.0,    r12 : -0.7071, r22 : 0.7071, r32 : 0.0,
			r03 :  0.0,    r13 :  0.0,    r23 : 0.0,    r33 : 1.0
		}, 1e-4);
	});
});

describe('concat', () => {
	it('should set a Matrix4 to represent a 4x4 concatenation', () => {
		const m = mat4.Identity();

		assertEquals(mat4.concat(m, mat4.Identity(), mat4.Identity()), mat4.Identity(), epsilon);

		const r = mat4.concat(
			m,
			mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0))),
			mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI))
		);

		assertEquals(r, {
			r00 :  0.0, r10 : 3.0, r20 : 0.0, r30 : 0.0,
			r01 : -2.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 4.0, r32 : 0.0,
			r03 :  0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}, epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat4.concat(
			m,
			mat4.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)),
			mat4.ShearMatrix3(mat3.Scale(vec3.Create(2.0, 3.0, 4.0)))
		), {
			r00 :  0.0, r10 : 2.0, r20 : 0.0, r30 : 0.0,
			r01 : -3.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 4.0, r32 : 0.0,
			r03 :  0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.concat(m, mat4.Translation(vec3.Create(2.0, 3.0, 4.0)), mat4.ShearMatrix3(mat3.RotationZ(0.25 * turn))), {
			r00 :  0.0, r10 : 1.0, r20 : 0.0, r30 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 :  2.0, r13 : 3.0, r23 : 4.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.concat(m, mat4.ShearMatrix3(mat3.RotationZ(0.25 * turn)), mat4.Translation(vec3.Create(2.0, 3.0, 4.0))), {
			r00 :  0.0, r10 : 1.0, r20 : 0.0, r30 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : -3.0, r13 : 2.0, r23 : 4.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.concat(
			m,
			mat4.Translation(vec3.Create(2.0, 3.0, 4.0)),
			mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5)))
		), {
			r00 : 0.5, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.5, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 2.5, r32 : 0.0,
			r03 : 2.0, r13 : 3.0, r23 : 4.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.concat(
			m,
			mat4.ShearMatrix3(mat3.Scale(vec3.Create(0.5, 1.5, 2.5))),
			mat4.Translation(vec3.Create(2.0, 3.0, 4.0))
		), {
			r00 : 0.5, r10 : 0.0, r20 :  0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.5, r21 :  0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 :  2.5, r32 : 0.0,
			r03 : 1.0, r13 : 4.5, r23 : 10.0, r33 : 1.0
		}, epsilon);
		assertEquals(mat4.concat(
			m,
			mat4.ShearMatrix3(mat3.RotationZ(0.25 * Math.PI)),
			mat4.ShearMatrix3(mat3.RotationX(0.25 * Math.PI))
		), {
			r00 :  0.7071, r10 :  0.7071, r20 : 0.0,    r30 : 0.0,
			r01 : -0.5,    r11 :  0.5,    r21 : 0.7071, r31 : 0.0,
			r02 :  0.5,    r12 : -0.5,    r22 : 0.7071, r32 : 0.0,
			r03 :  0.0,    r13 :  0.0,    r23 : 0.0,    r33 : 1.0
		}, 1e-4);
		assertEquals(mat4.concat(
			m,
			mat4.ShearMatrix3(mat3.RotationX(0.25 * Math.PI)),
			mat4.ShearMatrix3(mat3.RotationZ(0.25 * Math.PI))
		), {
			r00 :  0.7071, r10 :  0.5,    r20 : 0.5,    r30 : 0.0,
			r01 : -0.7071, r11 :  0.5,    r21 : 0.5,    r31 : 0.0,
			r02 :  0.0,    r12 : -0.7071, r22 : 0.7071, r32 : 0.0,
			r03 :  0.0,    r13 :  0.0,    r23 : 0.0,    r33 : 1.0
		}, 1e-4);
	});
});

describe('Inverse3x4', () => {
	it('should return a Matrix4 representing a 3x4 inversion', () => {
		assertEquals(mat4.Inverse3x4(mat4.Identity()) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : Number.NaN, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : Number.NaN, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : Number.NaN, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assertEquals(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : Number.NaN,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : Number.NaN, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : Number.NaN, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : Number.NaN, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assertEquals(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : Number.NaN,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : Number.NaN, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : Number.NaN, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : Number.NaN, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assertEquals(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : Number.NaN,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : Number.NaN, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : Number.NaN, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : Number.NaN, r33 : 1.0
		}), undefined);
		assertEquals(mat4.Inverse3x4({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : Number.NaN
		}) as mat4.Matrix4, mat4.Identity(), epsilon);
		assertEquals(
			mat4.Inverse(mat4.Inverse3x4(mat4.Translation(vec3.Create(1.0, 2.0, 3.0))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.Translation(vec3.Create(1.0, 2.0, 3.0)),
			epsilon
		);
		assertEquals(
			mat4.Inverse(mat4.Inverse3x4(mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn)))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn))),
			epsilon
		);
	});
});

describe('inverse3x4', () => {
	it('should set a Matrix4 to represent a 4x4 inversion', () => {
		const m = mat4.Identity();

		assertEquals(mat4.inverse3x4(m, mat4.Identity()) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : Number.NaN, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : Number.NaN, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : Number.NaN, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assertEquals(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : Number.NaN,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : Number.NaN, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : Number.NaN, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : Number.NaN, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assertEquals(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : Number.NaN,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : Number.NaN, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : Number.NaN, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : Number.NaN, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assertEquals(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : Number.NaN,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : Number.NaN, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : Number.NaN, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : Number.NaN, r33 : 1.0
		}), undefined);
		assertEquals(mat4.inverse3x4(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : Number.NaN
		}) as mat4.Matrix4, mat4.Identity(), epsilon);

		const r = mat4.inverse(m, mat4.inverse3x4(m, mat4.Translation(vec3.Create(1.0, 2.0, 3.0))) as mat4.Matrix4) as mat4.Matrix4;

		assertEquals(
			r,
			mat4.Translation(vec3.Create(1.0, 2.0, 3.0)),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat4.inverse(m, mat4.inverse3x4(m, mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn)))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn))),
			epsilon
		);
	});
});

describe('Inverse', () => {
	it('should return a Matrix4 representing a 4x4 inversion', () => {
		assertEquals(mat4.Inverse(mat4.Identity()) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : Number.NaN, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : Number.NaN, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : Number.NaN, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : Number.NaN,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : Number.NaN, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : Number.NaN, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : Number.NaN, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : Number.NaN,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : Number.NaN, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : Number.NaN, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : Number.NaN, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : Number.NaN,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : Number.NaN, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : Number.NaN, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : Number.NaN, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.Inverse({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : Number.NaN
		}), undefined);
		assertEquals(
			mat4.Inverse(mat4.Inverse(mat4.Translation(vec3.Create(1.0, 2.0, 3.0))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.Translation(vec3.Create(1.0, 2.0, 3.0)),
			epsilon
		);
		assertEquals(
			mat4.Inverse(mat4.Inverse(mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn)))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn))),
			epsilon
		);
	});
});

describe('inverse', () => {
	it('should set a Matrix4 to represent a 4x4 inversion', () => {
		const m = mat4.Identity();

		assertEquals(mat4.inverse(m, mat4.Identity()) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : Number.NaN, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : Number.NaN, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : Number.NaN, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : Number.NaN,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : Number.NaN, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : Number.NaN, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : Number.NaN, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : Number.NaN,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : Number.NaN, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : Number.NaN, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : Number.NaN, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : Number.NaN,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : Number.NaN, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : Number.NaN, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : Number.NaN, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverse(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : Number.NaN
		}), undefined);

		const r = mat4.inverse(m, mat4.inverse(m, mat4.Translation(vec3.Create(1.0, 2.0, 3.0))) as mat4.Matrix4) as mat4.Matrix4;

		assertEquals(
			r,
			mat4.Translation(vec3.Create(1.0, 2.0, 3.0)),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat4.inverse(m, mat4.inverse(m, mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn)))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn))),
			epsilon
		);
	});
});

describe('InverseGauss', () => {
	it('should return a Matrix4 representing a 4x4 inversion', () => {
		assertEquals(mat4.InverseGauss(mat4.Identity()) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : Number.NaN, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : Number.NaN, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : Number.NaN, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : Number.NaN,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : Number.NaN, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : Number.NaN, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : Number.NaN, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : Number.NaN,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : Number.NaN, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : Number.NaN, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : Number.NaN, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : Number.NaN,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : Number.NaN, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : Number.NaN, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : Number.NaN, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.InverseGauss({
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : Number.NaN
		}), undefined);
		assertEquals(
			mat4.InverseGauss(mat4.InverseGauss(mat4.Translation(vec3.Create(1.0, 2.0, 3.0))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.Translation(vec3.Create(1.0, 2.0, 3.0)),
			epsilon
		);
		assertEquals(
			mat4.InverseGauss(mat4.InverseGauss(mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn)))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn))),
			epsilon
		);
		assertEquals(
			mat4.InverseGauss(mat4.InverseGauss({
				r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
				r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
				r02 :  9.0, r12 : 10.0, r22 : 11.5, r32 : 12.0,
				r03 : 13.0, r13 : 14.5, r23 : 15.0, r33 : 16.0
			}) as mat4.Matrix4) as mat4.Matrix4,
			{
				r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
				r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
				r02 :  9.0, r12 : 10.0, r22 : 11.5, r32 : 12.0,
				r03 : 13.0, r13 : 14.5, r23 : 15.0, r33 : 16.0
			},
			epsilon
		);
	});
});

describe('inverseGauss', () => {
	it('should set a Matrix4 to represent a 4x4 inversion', () => {
		const m = mat4.Identity();

		assertEquals(mat4.inverseGauss(m, mat4.Identity()) as mat4.Matrix4, mat4.Identity(), epsilon);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 0.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 0.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : Number.NaN, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : Number.NaN, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : Number.NaN, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : Number.NaN,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : Number.NaN, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : Number.NaN, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : Number.NaN, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : Number.NaN,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : Number.NaN, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : Number.NaN, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : Number.NaN, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : Number.NaN,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : Number.NaN, r13 : 0.0, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : Number.NaN, r23 : 0.0, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : Number.NaN, r33 : 1.0
		}), undefined);
		assert.strictEqual(mat4.inverseGauss(m, {
			r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
			r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : Number.NaN
		}), undefined);

		const r = mat4.inverseGauss(m, mat4.inverseGauss(m, mat4.Translation(vec3.Create(1.0, 2.0, 3.0))) as mat4.Matrix4) as mat4.Matrix4;

		assertEquals(
			r,
			mat4.Translation(vec3.Create(1.0, 2.0, 3.0)),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat4.inverseGauss(m, mat4.inverseGauss(m, mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn)))) as mat4.Matrix4) as mat4.Matrix4,
			mat4.ShearMatrix3(mat3.EulerXYZ(vec3.Create(1 / 6 * turn, 1 / 3 * turn, 1 / 4 * turn))),
			epsilon
		);
		assertEquals(
			mat4.inverseGauss(m, mat4.inverseGauss(m, {
				r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
				r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
				r02 :  9.0, r12 : 10.0, r22 : 11.5, r32 : 12.0,
				r03 : 13.0, r13 : 14.5, r23 : 15.0, r33 : 16.0
			}) as mat4.Matrix4) as mat4.Matrix4,
			{
				r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
				r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
				r02 :  9.0, r12 : 10.0, r22 : 11.5, r32 : 12.0,
				r03 : 13.0, r13 : 14.5, r23 : 15.0, r33 : 16.0
			},
			epsilon
		);
	});
});

describe('Transpose', () => {
	it('should return a Matrix4 representing a transpose', () => {
		assert.deepStrictEqual(mat4.Transpose({
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		}), {
			r00 : 1.0, r10 : 5.0, r20 :  9.0, r30 : 13.0,
			r01 : 2.0, r11 : 6.0, r21 : 10.0, r31 : 14.0,
			r02 : 3.0, r12 : 7.0, r22 : 11.0, r32 : 15.0,
			r03 : 4.0, r13 : 8.0, r23 : 12.0, r33 : 16.0
		});
	});
});

describe('transpose', () => {
	it('should set a Matrix3 to represent a transpose', () => {
		const m = mat4.Identity();
		const r = mat4.transpose(m, {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		});

		assert.deepStrictEqual(r, {
			r00 : 1.0, r10 : 5.0, r20 :  9.0, r30 : 13.0,
			r01 : 2.0, r11 : 6.0, r21 : 10.0, r31 : 14.0,
			r02 : 3.0, r12 : 7.0, r22 : 11.0, r32 : 15.0,
			r03 : 4.0, r13 : 8.0, r23 : 12.0, r33 : 16.0
		});
		assert.strictEqual(m, r);
	});
});

describe('Copy', () => {
	it('should return a Matrix4 representing a copy', () => {
		const m:mat4.Matrix4 = {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		};
		const r = mat4.Copy(m);

		assert.deepStrictEqual(m, r);
		assert.notStrictEqual(m, r);
	});
});

describe('copy', () => {
	it('should set a Matrix4 to represent a copy', () => {
		const a:mat4.Matrix4 = {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		};
		const b = mat4.Identity();
		const r = mat4.copy(b, a);

		assert.deepStrictEqual(a, r);
		assert.notStrictEqual(a, r);
		assert.strictEqual(b, r);
	});
});

describe('toColumnF32', () => {
	it('should return a Float32Array representing a Matrix4 in column-major order', () => {
		/* eslint-disable array-element-newline, no-mixed-spaces-and-tabs */
		assert.deepStrictEqual(mat4.toColumnF32({
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		}), new Float32Array([
			 1.0,  2.0,  3.0,  4.0,
			 5.0,  6.0,  7.0,  8.0,
			 9.0, 10.0, 11.0, 12.0,
			13.0, 14.0, 15.0, 16.0
		]));
		/* eslint-enable array-element-newline, no-mixed-spaces-and-tabs */
	});
});

describe('assignColumnF32', () => {
	it('should assign a Float32Array representing a Matrix4 in column-major order', () => {
		const m = {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		};
		const f = new Float32Array(16);
		const r = mat4.assignColumnF32(f, m);

		/* eslint-disable array-element-newline, no-mixed-spaces-and-tabs */
		assert.deepStrictEqual(r, new Float32Array([
			 1.0,  2.0,  3.0,  4.0,
			 5.0,  6.0,  7.0,  8.0,
			 9.0, 10.0, 11.0, 12.0,
			13.0, 14.0, 15.0, 16.0
		]));
		/* eslint-enable array-element-newline, no-mixed-spaces-and-tabs */

		assert.strictEqual(f, r);
	});
});

describe('toColumnF64', () => {
	it('should return a Float64Array representing a Matrix4 in column-major order', () => {
		/* eslint-disable array-element-newline, no-mixed-spaces-and-tabs */
		assert.deepStrictEqual(mat4.toColumnF64({
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		}), new Float64Array([
			 1.0,  2.0,  3.0,  4.0,
			 5.0,  6.0,  7.0,  8.0,
			 9.0, 10.0, 11.0, 12.0,
			13.0, 14.0, 15.0, 16.0
		]));
		/* eslint-enable array-element-newline, no-mixed-spaces-and-tabs */
	});
});

describe('assignColumnF64', () => {
	it('should assign a Float64Array representing a Matrix4 in column-major order', () => {
		const m = {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		};
		const f = new Float64Array(16);
		const r = mat4.assignColumnF64(f, m);

		/* eslint-disable array-element-newline, no-mixed-spaces-and-tabs */
		assert.deepStrictEqual(r, new Float64Array([
			 1.0,  2.0,  3.0,  4.0,
			 5.0,  6.0,  7.0,  8.0,
			 9.0, 10.0, 11.0, 12.0,
			13.0, 14.0, 15.0, 16.0
		]));
		/* eslint-enable array-element-newline, no-mixed-spaces-and-tabs */

		assert.strictEqual(f, r);
	});
});

describe('ColumnF32', () => {
	it('should return a Matrix4 representing a column-major ordered Float32Array', () => {
		/* eslint-disable array-element-newline, no-mixed-spaces-and-tabs */
		assert.deepStrictEqual(mat4.ColumnF32(new Float32Array([
			 1.0,  2.0,  3.0,  4.0,
			 5.0,  6.0,  7.0,  8.0,
			 9.0, 10.0, 11.0, 12.0,
			13.0, 14.0, 15.0, 16.0
		])), {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		});
		/* eslint-enable array-element-newline, no-mixed-spaces-and-tabs */
	});
});

describe('columnF32', () => {
	it('should assign a Matrix4 representing a column-major ordered Float32Array', () => {
		/* eslint-disable array-element-newline, no-mixed-spaces-and-tabs */
		const f = new Float32Array([
			 1.0,  2.0,  3.0,  4.0,
			 5.0,  6.0,  7.0,  8.0,
			 9.0, 10.0, 11.0, 12.0,
			13.0, 14.0, 15.0, 16.0
		]);
		/* eslint-enable array-element-newline, no-mixed-spaces-and-tabs */
		const m = mat4.Identity();
		const r = mat4.columnF32(m, f);

		assert.deepStrictEqual(r, {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		});
		assert.strictEqual(m, r);
	});
});

describe('ColumnF64', () => {
	it('should return a Matrix4 representing a column-major ordered Float64Array', () => {
		/* eslint-disable array-element-newline, no-mixed-spaces-and-tabs */
		assert.deepStrictEqual(mat4.ColumnF64(new Float64Array([
			 1.0,  2.0,  3.0,  4.0,
			 5.0,  6.0,  7.0,  8.0,
			 9.0, 10.0, 11.0, 12.0,
			13.0, 14.0, 15.0, 16.0
		])), {
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		});
		/* eslint-enable array-element-newline, no-mixed-spaces-and-tabs */
	});
});

describe('columnF64', () => {
	it('should assign a Matrix4 representing a column-major ordered Float64Array', () => {
		/* eslint-disable array-element-newline, no-mixed-spaces-and-tabs */
		const f = new Float64Array([
			 1.0,  2.0,  3.0,  4.0,
			 5.0,  6.0,  7.0,  8.0,
			 9.0, 10.0, 11.0, 12.0,
			13.0, 14.0, 15.0, 16.0
		]);
		/* eslint-enable array-element-newline, no-mixed-spaces-and-tabs */
		const m = mat4.Identity();
		const r = mat4.columnF64(m, f);

		assert.deepStrictEqual(r, {
			r00 : 1.0, r10 : 2.0, r20 : 3.0, r30 : 4.0,
			r01 : 5.0, r11 : 6.0, r21 : 7.0, r31 : 8.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
		});
		assert.strictEqual(m, r);
	});
});
