/* eslint key-spacing : [ error, { beforeColon : true, afterColon : true, mode : "minimum" }] */
/* eslint no-multi-spaces : [ off ] */
import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as mat2 from '../source/matrix2';
import * as mat3 from '../source/matrix3';
import * as mat4 from '../source/matrix4';
import * as vec2 from '../source/vector2';
import * as vec3 from '../source/vector3';
import * as vec4 from '../source/vector4';
import { assertEqualsMat3 as assertEquals } from './assert/assert';


const epsilon = 1e-10;
const turn = 2 * Math.PI;


describe('equals', () => {
	it('should return true if a equals b', () => {
		const a = mat3.RotationZ(0.25 * Math.PI);
		const c = { ...a, r00 : Number.NaN };

		assert.strictEqual(mat3.equals(a, a), true);
		assert.strictEqual(mat3.equals(c, c), false);
		assert.strictEqual(mat3.equals(mat3.Identity(), mat3.Identity()), true);
		assert.strictEqual(mat3.equals(mat3.RotationZ(0.25 * Math.PI), mat3.RotationZ(2.25 * Math.PI)), true);
		assert.strictEqual(mat3.equals({ ...a, r00 : Number.NaN }, { ...a, r00 : Number.NaN }), false);
		assert.strictEqual(mat3.equals({ ...a, r10 : Number.NaN }, { ...a, r10 : Number.NaN }), false);
		assert.strictEqual(mat3.equals({ ...a, r20 : Number.NaN }, { ...a, r20 : Number.NaN }), false);
		assert.strictEqual(mat3.equals({ ...a, r01 : Number.NaN }, { ...a, r01 : Number.NaN }), false);
		assert.strictEqual(mat3.equals({ ...a, r11 : Number.NaN }, { ...a, r11 : Number.NaN }), false);
		assert.strictEqual(mat3.equals({ ...a, r21 : Number.NaN }, { ...a, r21 : Number.NaN }), false);
		assert.strictEqual(mat3.equals({ ...a, r02 : Number.NaN }, { ...a, r02 : Number.NaN }), false);
		assert.strictEqual(mat3.equals({ ...a, r12 : Number.NaN }, { ...a, r12 : Number.NaN }), false);
		assert.strictEqual(mat3.equals({ ...a, r22 : Number.NaN }, { ...a, r22 : Number.NaN }), false);
		assert.strictEqual(mat3.equals(mat3.Identity(), { ...mat3.Identity(), r00 : 1.01 }, 1e-3), false);
		assert.strictEqual(mat3.equals(mat3.Identity(), { ...mat3.Identity(), r00 : 1.01 }, 1e-1), true);
	});
});

describe('determinant', () => {
	it('should return the determinant of a Matrix3', () => {
		assert.strictEqual(mat3.determinant(mat3.Identity()), 1.0);
		assert.strictEqual(mat3.determinant(mat3.RotationZ(0.25 * Math.PI)), 1.0);
		assert.strictEqual(mat3.determinant(mat3.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)), 0.25 * Math.PI)), 1.0);
		assert.strictEqual(mat3.determinant(mat3.ShearVector2(vec2.AxisX(), vec2.AxisY(2.0))), 2.0);
		assert.strictEqual(mat3.determinant(mat3.ShearVector2(vec2.AxisX(2.0), vec2.AxisY())), 2.0);
		assert.strictEqual(mat3.determinant(mat3.ShearTranslation(vec2.AxisX(2.0), vec2.AxisY(), vec2.Create(1.0, 1.0))), 2.0);
		assert.strictEqual(mat3.determinant(mat3.Shear(vec3.AxisX(1.0), vec3.AxisY(2.0), vec3.AxisZ(2.0))), 4.0);
		assert.strictEqual(mat3.determinant(mat3.Shear(vec3.AxisX(2.0), vec3.AxisY(2.0), vec3.AxisZ(1.0))), 4.0);
		assert.strictEqual(mat3.determinant(mat3.Shear(vec3.AxisX(2.0), vec3.AxisY(1.0), vec3.AxisZ(2.0))), 4.0);
	});
});

describe('Identity', () => {
	it('should return a Matrix3 representing the identity matrix', () => {
		assertEquals(mat3.Identity(), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('identity', () => {
	it('should set a Matrix3 to represent the identity matrix', () => {
		const m = {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		};
		const r = mat3.identity(m);

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('RotationAxis', () => {
	it('should return a Matrix3 representing a rotation', () => {
		assertEquals(mat3.RotationAxis(vec3.AxisX(), 0.0), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationAxis(vec3.AxisX(), 2.0 * Math.PI), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationAxis(vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)), 0.0), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationAxis(vec3.AxisX(), 0.25 * Math.PI), mat3.RotationX(0.25 * Math.PI), epsilon);
		assertEquals(mat3.RotationAxis(vec3.AxisY(), 0.25 * Math.PI), mat3.RotationY(0.25 * Math.PI), epsilon);
		assertEquals(mat3.RotationAxis(vec3.AxisZ(), 0.25 * Math.PI), mat3.RotationZ(0.25 * Math.PI), epsilon);
	});
});

describe('rotationAxis', () => {
	it('should set a Matrix3 to represent a rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.rotationAxis(m, vec3.AxisX(), 0.0), mat3.Identity(), epsilon);
		assertEquals(mat3.rotationAxis(m, vec3.AxisX(), 2.0 * Math.PI), mat3.Identity(), epsilon);
		assertEquals(mat3.rotationAxis(m, vec3.Normalize(vec3.Create(1.0, 1.0, 1.0)), 0.0), mat3.Identity(), epsilon);

		const r = mat3.rotationAxis(m, vec3.AxisX(), 0.25 * Math.PI);

		assertEquals(r, mat3.RotationX(0.25 * Math.PI), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat3.rotationAxis(m, vec3.AxisY(), 0.25 * Math.PI), mat3.RotationY(0.25 * Math.PI), epsilon);
		assertEquals(mat3.rotationAxis(m, vec3.AxisZ(), 0.25 * Math.PI), mat3.RotationZ(0.25 * Math.PI), epsilon);
	});
});

describe('RotationX', () => {
	it('should return a Matrix3 representing a x-axis rotation', () => {
		assertEquals(mat3.RotationX(0.0), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationX(0.5 * Math.PI), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 1.0,
			r02 : 0.0, r12 : -1.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('rotationX', () => {
	it('should set a Matrix3 to represent a x-axis rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.rotationX(m, 0.0), mat3.Identity(), epsilon);

		const r = mat3.rotationX(m, 0.5 * Math.PI);

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 1.0,
			r02 : 0.0, r12 : -1.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('RotationY', () => {
	it('should return a Matrix3 representing a y-axis rotation', () => {
		assertEquals(mat3.RotationY(0.0), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationY(0.5 * Math.PI), {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : -1.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0,
			r02 : 1.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('rotationY', () => {
	it('should set a Matrix3 to represent a y-axis rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.rotationY(m, 0.0), mat3.Identity(), epsilon);

		const r = mat3.rotationY(m, 0.5 * Math.PI);

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : -1.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0,
			r02 : 1.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('RotationZ', () => {
	it('should return a Matrix3 representing a z-axis rotation', () => {
		assertEquals(mat3.RotationZ(0.0), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationZ(0.5 * Math.PI), {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('rotationZ', () => {
	it('should set a Matrix3 to represent a z-axis rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.rotationZ(m, 0.0), mat3.Identity(), epsilon);

		const r = mat3.rotationZ(m, 0.5 * Math.PI);

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('RotationZVector2', () => {
	it('should return a Matrix3 representing a z-axis rotation', () => {
		assertEquals(mat3.RotationZVector2(vec2.AxisX()), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationZVector2(vec2.AxisY()), {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('rotationZVector2', () => {
	it('should set a Matrix3 to represent a z-axis rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.rotationZVector2(m, vec2.AxisX()), mat3.Identity(), epsilon);

		const r = mat3.rotationZVector2(m, vec2.AxisY());

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('RotationZMatrix2', () => {
	it('should return a Matrix3 representing a z-axis rotation', () => {
		assertEquals(mat3.RotationZMatrix2(mat2.Rotation(0.0)), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationZMatrix2(mat2.Rotation(0.5 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('rotationZMatrix2', () => {
	it('should set a Matrix3 to represent a z-axis rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.rotationZMatrix2(m, mat2.Rotation(0.0)), mat3.Identity(), epsilon);

		const r = mat3.rotationZMatrix2(m, mat2.Rotation(0.5 * Math.PI));

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('RotationVector3', () => {
	it('should return a Matrix3 representing a rotation', () => {
		assertEquals(mat3.RotationVector3(vec3.AxisX(), vec3.AxisY()), mat3.Identity(), epsilon);
		assertEquals(mat3.RotationVector3(vec3.AxisY(), vec3.AxisX(-1.0)), {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.RotationVector3(vec3.AxisY(), vec3.AxisZ()), {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 1.0,
			r02 : 1.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('rotationVector3', () => {
	it('should set a Matrix3 to represent a rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.rotationVector3(m, vec3.AxisX(), vec3.AxisY()), mat3.Identity(), epsilon);

		const r = mat3.rotationVector3(m, vec3.AxisY(), vec3.AxisX(-1.0));

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat3.rotationVector3(m, vec3.AxisY(), vec3.AxisZ()), {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 1.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 1.0,
			r02 : 1.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('EulerXYZ', () => {
	it('should return a Matrix3 representing a rotation', () => {
		assertEquals(mat3.EulerXYZ(vec3.Create()), mat3.Identity(), epsilon);
		assertEquals(mat3.EulerXYZ(vec3.Create(0.25 * turn)), mat3.RotationX(0.25 * turn), epsilon);
		assertEquals(mat3.EulerXYZ(vec3.Create(0.0, 0.25 * turn)), mat3.RotationY(0.25 * turn), epsilon);
		assertEquals(mat3.EulerXYZ(vec3.Create(0.0, 0.0, 0.25 * turn)), mat3.RotationZ(0.25 * turn), epsilon);
		assertEquals(
			mat3.EulerXYZ(vec3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn)),
			mat3.Concat(mat3.RotationX(0.1 * turn), mat3.Concat(mat3.RotationY(0.2 * turn), mat3.RotationZ(0.3 * turn))),
			epsilon
		);
	});
});

describe('eulerXYZ', () => {
	it('should set a Matrix3 to represent a rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.eulerXYZ(m, vec3.Create()), mat3.Identity(), epsilon);

		const r = mat3.eulerXYZ(m, vec3.Create(0.25 * turn));

		assertEquals(r, mat3.RotationX(0.25 * turn), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat3.eulerXYZ(m, vec3.Create(0.0, 0.25 * turn)), mat3.RotationY(0.25 * turn), epsilon);
		assertEquals(mat3.eulerXYZ(m, vec3.Create(0.0, 0.0, 0.25 * turn)), mat3.RotationZ(0.25 * turn), epsilon);
		assertEquals(
			mat3.eulerXYZ(m, vec3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn)),
			mat3.Concat(mat3.RotationX(0.1 * turn), mat3.Concat(mat3.RotationY(0.2 * turn), mat3.RotationZ(0.3 * turn))),
			epsilon
		);
	});
});

describe('EulerYXZ', () => {
	it('should return a Matrix3 representing a rotation', () => {
		assertEquals(mat3.EulerYXZ(vec3.Create()), mat3.Identity(), epsilon);
		assertEquals(mat3.EulerYXZ(vec3.Create(0.25 * turn)), mat3.RotationX(0.25 * turn), epsilon);
		assertEquals(mat3.EulerYXZ(vec3.Create(0.0, 0.25 * turn)), mat3.RotationY(0.25 * turn), epsilon);
		assertEquals(mat3.EulerYXZ(vec3.Create(0.0, 0.0, 0.25 * turn)), mat3.RotationZ(0.25 * turn), epsilon);
		assertEquals(
			mat3.EulerYXZ(vec3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn)),
			mat3.Concat(mat3.RotationY(0.2 * turn), mat3.Concat(mat3.RotationX(0.1 * turn), mat3.RotationZ(0.3 * turn))),
			epsilon
		);
	});
});

describe('eulerYXZ', () => {
	it('should set a Matrix3 to represent a rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.eulerYXZ(m, vec3.Create()), mat3.Identity(), epsilon);

		const r = mat3.eulerYXZ(m, vec3.Create(0.25 * turn));

		assertEquals(r, mat3.RotationX(0.25 * turn), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat3.eulerYXZ(m, vec3.Create(0.0, 0.25 * turn)), mat3.RotationY(0.25 * turn), epsilon);
		assertEquals(mat3.eulerYXZ(m, vec3.Create(0.0, 0.0, 0.25 * turn)), mat3.RotationZ(0.25 * turn), epsilon);
		assertEquals(
			mat3.eulerYXZ(m, vec3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn)),
			mat3.Concat(mat3.RotationY(0.2 * turn), mat3.Concat(mat3.RotationX(0.1 * turn), mat3.RotationZ(0.3 * turn))),
			epsilon
		);
	});
});

describe('EulerZXY', () => {
	it('should return a Matrix3 representing a rotation', () => {
		assertEquals(mat3.EulerZXY(vec3.Create()), mat3.Identity(), epsilon);
		assertEquals(mat3.EulerZXY(vec3.Create(0.25 * turn)), mat3.RotationX(0.25 * turn), epsilon);
		assertEquals(mat3.EulerZXY(vec3.Create(0.0, 0.25 * turn)), mat3.RotationY(0.25 * turn), epsilon);
		assertEquals(mat3.EulerZXY(vec3.Create(0.0, 0.0, 0.25 * turn)), mat3.RotationZ(0.25 * turn), epsilon);
		assertEquals(
			mat3.EulerZXY(vec3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn)),
			mat3.Concat(mat3.RotationZ(0.3 * turn), mat3.Concat(mat3.RotationX(0.1 * turn), mat3.RotationY(0.2 * turn))),
			epsilon
		);
	});
});

describe('eulerZXY', () => {
	it('should set a Matrix3 to represent a rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.eulerZXY(m, vec3.Create()), mat3.Identity(), epsilon);

		const r = mat3.eulerZXY(m, vec3.Create(0.25 * turn));

		assertEquals(r, mat3.RotationX(0.25 * turn), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat3.eulerZXY(m, vec3.Create(0.0, 0.25 * turn)), mat3.RotationY(0.25 * turn), epsilon);
		assertEquals(mat3.eulerZXY(m, vec3.Create(0.0, 0.0, 0.25 * turn)), mat3.RotationZ(0.25 * turn), epsilon);
		assertEquals(
			mat3.eulerZXY(m, vec3.Create(0.1 * turn, 0.2 * turn, 0.3 * turn)),
			mat3.Concat(mat3.RotationZ(0.3 * turn), mat3.Concat(mat3.RotationX(0.1 * turn), mat3.RotationY(0.2 * turn))),
			epsilon
		);
	});
});

describe('Quaternion', () => {
	it('should return a Matrix3 representing a rotation', () => {
		assertEquals(mat3.Quaternion(vec4.Create()), mat3.Identity(), epsilon);
		assertEquals(mat3.Quaternion(vec4.RotationAxis(vec3.Create(1.0), 0.25 * turn)), mat3.RotationX(0.25 * turn), epsilon);
		assertEquals(mat3.Quaternion(vec4.RotationAxis(vec3.Create(0.0, 1.0), 0.25 * turn)), mat3.RotationY(0.25 * turn), epsilon);
		assertEquals(mat3.Quaternion(vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.25 * turn)), mat3.RotationZ(0.25 * turn), epsilon);
	});
});

describe('quaternion', () => {
	it('should set a Matrix3 to represent a rotation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.quaternion(m, vec4.Create()), mat3.Identity(), epsilon);

		const r = mat3.quaternion(m, vec4.RotationAxis(vec3.Create(1.0), 0.25 * turn));

		assertEquals(m, mat3.RotationX(0.25 * turn), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat3.quaternion(m, vec4.RotationAxis(vec3.Create(0.0, 1.0), 0.25 * turn)), mat3.RotationY(0.25 * turn), epsilon);
		assertEquals(mat3.quaternion(m, vec4.RotationAxis(vec3.Create(0.0, 0.0, 1.0), 0.25 * turn)), mat3.RotationZ(0.25 * turn), epsilon);
	});
});

describe('ScaleVector2', () => {
	it('should return a Matrix3 representing a scaling', () => {
		assertEquals(mat3.ScaleVector2(vec2.Create(2.0, 3.0)), {
			/* eslint-disable object-property-newline */
			r00 : 2.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 3.0, r12 : 0.0,
			r02 : 0.0, r21 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('scaleVector2', () => {
	it('should set a Matrix3 to represent a scaling', () => {
		const m = mat3.Identity();
		const r = mat3.scaleVector2(m, vec2.Create(2.0, 3.0));

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 2.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 3.0, r12 : 0.0,
			r02 : 0.0, r21 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Scale', () => {
	it('should return a Matrix3 representing a scaling', () => {
		assertEquals(mat3.Scale(vec3.Create(2.0, 3.0, 4.0)), {
			/* eslint-disable object-property-newline */
			r00 : 2.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 3.0, r12 : 0.0,
			r02 : 0.0, r21 : 0.0, r22 : 4.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('scale', () => {
	it('should set a Matrix3 to represent a scaling', () => {
		const m = mat3.Identity();
		const r = mat3.scale(m, vec3.Create(2.0, 3.0, 4.0));

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 2.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 3.0, r12 : 0.0,
			r02 : 0.0, r21 : 0.0, r22 : 4.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Translation', () => {
	it('should return a Matrix3 representing a translation', () => {
		assertEquals(mat3.Translation(vec2.Create(2.0, 3.0)), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0,
			r02 : 2.0, r12 : 3.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('translation', () => {
	it('should set a Matrix3 to represent a translation', () => {
		const m = mat3.Identity();
		const r = mat3.translation(m, vec2.Create(2.0, 3.0));

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 1.0, r21 : 0.0,
			r02 : 2.0, r12 : 3.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('ShearVector2', () => {
	it('should return a Matrix3 representing a shear', () => {
		assertEquals(mat3.ShearVector2(vec2.Create(1.0, 2.0), vec2.Create(3.0, 4.0)), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 0.0,
			r01 : 3.0, r11 : 4.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('shearVector2', () => {
	it('should set a Matrix3 to represent a shear', () => {
		const m = mat3.Identity();
		const r = mat3.shearVector2(m, vec2.Create(1.0, 2.0), vec2.Create(3.0, 4.0));

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 0.0,
			r01 : 3.0, r11 : 4.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Shear', () => {
	it('should return a Matrix3 representing a shear', () => {
		assertEquals(mat3.Shear(
			vec3.Create(1.0, 2.0, 3.0),
			vec3.Create(4.0, 5.0, 6.0),
			vec3.Create(7.0, 8.0, 9.0)
		), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 3.0,
			r01 : 4.0, r11 : 5.0, r21 : 6.0,
			r02 : 7.0, r12 : 8.0, r22 : 9.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('shear', () => {
	it('should set a Matrix3 to represent a shear', () => {
		const m = mat3.Identity();
		const r = mat3.shear(
			m,
			vec3.Create(1.0, 2.0, 3.0),
			vec3.Create(4.0, 5.0, 6.0),
			vec3.Create(7.0, 8.0, 9.0)
		);

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 3.0,
			r01 : 4.0, r11 : 5.0, r21 : 6.0,
			r02 : 7.0, r12 : 8.0, r22 : 9.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('ShearTranslation', () => {
	it('should return a Matrix3 representing a shear and translation', () => {
		assertEquals(mat3.ShearTranslation(
			vec2.Create(1.0, 2.0),
			vec2.Create(3.0, 4.0),
			vec2.Create(5.0, 6.0)
		), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 0.0,
			r01 : 3.0, r11 : 4.0, r21 : 0.0,
			r02 : 5.0, r12 : 6.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('shearTranslation', () => {
	it('should set a Matrix3 to represent a shear and translation', () => {
		const m = mat3.Identity();
		const r = mat3.shearTranslation(m, vec2.Create(1.0, 2.0), vec2.Create(3.0, 4.0), vec2.Create(5.0, 6.0));

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 0.0,
			r01 : 3.0, r11 : 4.0, r21 : 0.0,
			r02 : 5.0, r12 : 6.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('ShearMatrix4', () => {
	it('should return a Matrix3 representing a shear', () => {
		assertEquals(mat3.ShearMatrix4({
			/* eslint-disable object-property-newline */
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
			/* eslint-enable object-property-newline */
		} as mat4.Matrix4), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 :  2.0, r20 :  3.0,
			r01 : 5.0, r11 :  6.0, r21 :  7.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('shearMatrix4', () => {
	it('should set a Matrix3 to represent a shear', () => {
		const m = mat4.Identity();
		const r = mat3.shearMatrix4(m, {
			/* eslint-disable object-property-newline */
			r00 :  1.0, r10 :  2.0, r20 :  3.0, r30 :  4.0,
			r01 :  5.0, r11 :  6.0, r21 :  7.0, r31 :  8.0,
			r02 :  9.0, r12 : 10.0, r22 : 11.0, r32 : 12.0,
			r03 : 13.0, r13 : 14.0, r23 : 15.0, r33 : 16.0
			/* eslint-enable object-property-newline */
		} as mat4.Matrix4);

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 :  2.0, r20 :  3.0,
			r01 : 5.0, r11 :  6.0, r21 :  7.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Add', () => {
	it('should return a Matrix3 representing an addition', () => {
		assertEquals(mat3.Add({
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 :  2.0, r20 :  3.0,
			r01 : 5.0, r11 :  6.0, r21 :  7.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0
			/* eslint-enable object-property-newline */
		}, {
			/* eslint-disable object-property-newline */
			r00 : 0.01, r10 : 0.02, r20 : 0.03,
			r01 : 0.05, r11 : 0.06, r21 : 0.07,
			r02 : 0.09, r12 : 0.10, r22 : 0.11
			/* eslint-enable object-property-newline */
		}), {
			/* eslint-disable object-property-newline */
			r00 : 1.01, r10 :  2.02, r20 :  3.03,
			r01 : 5.05, r11 :  6.06, r21 :  7.07,
			r02 : 9.09, r12 : 10.10, r22 : 11.11
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('add', () => {
	it('should set a Matrix3 to represent an addition', () => {
		const m = mat3.Identity();
		const r = mat3.add(m, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 :  2.0, r20 :  3.0,
			r01 : 5.0, r11 :  6.0, r21 :  7.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0
			/* eslint-enable object-property-newline */
		}, {
			/* eslint-disable object-property-newline */
			r00 : 0.01, r10 : 0.02, r20 : 0.03,
			r01 : 0.05, r11 : 0.06, r21 : 0.07,
			r02 : 0.09, r12 : 0.10, r22 : 0.11
			/* eslint-enable object-property-newline */
		});

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.01, r10 :  2.02, r20 :  3.03,
			r01 : 5.05, r11 :  6.06, r21 :  7.07,
			r02 : 9.09, r12 : 10.10, r22 : 11.11
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('addAssign', () => {
	it('should set a Matrix3 to represent an addition', () => {
		const m = {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 :  2.0, r20 :  3.0,
			r01 : 5.0, r11 :  6.0, r21 :  7.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0
			/* eslint-enable object-property-newline */
		};
		const r = mat3.addAssign(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.01, r10 : 0.02, r20 : 0.03,
			r01 : 0.05, r11 : 0.06, r21 : 0.07,
			r02 : 0.09, r12 : 0.10, r22 : 0.11
			/* eslint-enable object-property-newline */
		});

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.01, r10 :  2.02, r20 :  3.03,
			r01 : 5.05, r11 :  6.06, r21 :  7.07,
			r02 : 9.09, r12 : 10.10, r22 : 11.11
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Subtract', () => {
	it('should return a Matrix3 representing a subtraction', () => {
		assertEquals(mat3.Subtract({
			/* eslint-disable object-property-newline */
			r00 : 1.01, r10 :  2.02, r20 :  3.03,
			r01 : 5.05, r11 :  6.06, r21 :  7.07,
			r02 : 9.09, r12 : 10.10, r22 : 11.11
			/* eslint-enable object-property-newline */
		}, {
			/* eslint-disable object-property-newline */
			r00 : 0.01, r10 : 0.02, r20 : 0.03,
			r01 : 0.05, r11 : 0.06, r21 : 0.07,
			r02 : 0.09, r12 : 0.10, r22 : 0.11
			/* eslint-enable object-property-newline */
		}), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 :  2.0, r20 :  3.0,
			r01 : 5.0, r11 :  6.0, r21 :  7.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0
			/* eslint-enable object-property-newline */
		}, epsilon);
	});
});

describe('subtract', () => {
	it('should set a Matrix3 to represent a subtraction', () => {
		const m = mat3.Identity();
		const r = mat3.subtract(m, {
			/* eslint-disable object-property-newline */
			r00 : 1.01, r10 :  2.02, r20 :  3.03,
			r01 : 5.05, r11 :  6.06, r21 :  7.07,
			r02 : 9.09, r12 : 10.10, r22 : 11.11
			/* eslint-enable object-property-newline */
		}, {
			/* eslint-disable object-property-newline */
			r00 : 0.01, r10 : 0.02, r20 : 0.03,
			r01 : 0.05, r11 : 0.06, r21 : 0.07,
			r02 : 0.09, r12 : 0.10, r22 : 0.11
			/* eslint-enable object-property-newline */
		});

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 :  2.0, r20 :  3.0,
			r01 : 5.0, r11 :  6.0, r21 :  7.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('subtractAssign', () => {
	it('should set a Matrix3 to represent a subtract', () => {
		const m = {
			/* eslint-disable object-property-newline */
			r00 : 1.01, r10 :  2.02, r20 :  3.03,
			r01 : 5.05, r11 :  6.06, r21 :  7.07,
			r02 : 9.09, r12 : 10.10, r22 : 11.11
			/* eslint-enable object-property-newline */
		};
		const r = mat3.subtractAssign(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.01, r10 : 0.02, r20 : 0.03,
			r01 : 0.05, r11 : 0.06, r21 : 0.07,
			r02 : 0.09, r12 : 0.10, r22 : 0.11
			/* eslint-enable object-property-newline */
		});

		assertEquals(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 :  2.0, r20 :  3.0,
			r01 : 5.0, r11 :  6.0, r21 :  7.0,
			r02 : 9.0, r12 : 10.0, r22 : 11.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('ConcatScaleVector2', () => {
	it('should return a Matrix3 representing a concatenation', () => {
		assertEquals(mat3.ConcatScaleVector2(mat3.Identity(), vec2.Create(1.0, 1.0)), mat3.Identity(), epsilon);
		assertEquals(
			mat3.ConcatScaleVector2(mat3.Translation(vec2.Create(2.0, 3.0)), vec2.Create(4.0, 5.0)),
			mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.ScaleVector2(vec2.Create(4.0, 5.0))),
			epsilon
		);
		assertEquals(
			mat3.ConcatScaleVector2(mat3.RotationZ(0.25 * Math.PI), vec2.Create(2.0, 3.0)),
			mat3.Concat(mat3.RotationZ(0.25 * Math.PI), mat3.ScaleVector2(vec2.Create(2.0, 3.0))),
			epsilon
		);
	});
});

describe('concatScaleVector2', () => {
	it('should set a Matrix3 to represent a concatenation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.concatScaleVector2(m, mat3.Identity(), vec2.Create(1.0, 1.0)), mat3.Identity(), epsilon);

		const r = mat3.concatScaleVector2(m, mat3.Translation(vec2.Create(2.0, 3.0)), vec2.Create(4.0, 5.0));

		assertEquals(
			r,
			mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.ScaleVector2(vec2.Create(4.0, 5.0))),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat3.concatScaleVector2(m, mat3.RotationZ(0.25 * Math.PI), vec2.Create(2.0, 3.0)),
			mat3.Concat(mat3.RotationZ(0.25 * Math.PI), mat3.ScaleVector2(vec2.Create(2.0, 3.0))),
			epsilon
		);
	});
});

describe('ConcatTranslation', () => {
	it('should return a Matrix3 representing a concatenation', () => {
		assertEquals(mat3.ConcatTranslation(mat3.Identity(), vec2.Create()), mat3.Identity(), epsilon);
		assertEquals(
			mat3.ConcatTranslation(mat3.Translation(vec2.Create(2.0, 3.0)), vec2.Create(4.0, 5.0)),
			mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.Translation(vec2.Create(4.0, 5.0))),
			epsilon
		);
		assertEquals(
			mat3.ConcatTranslation(mat3.RotationZ(0.25 * Math.PI), vec2.Create(4.0, 5.0)),
			mat3.Concat(mat3.RotationZ(0.25 * Math.PI), mat3.Translation(vec2.Create(4.0, 5.0))),
			epsilon
		);
	});
});

describe('concatTranslation', () => {
	it('should set a Matrix3 to represent a concatenation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.concatTranslation(m, mat3.Identity(), vec2.Create()), mat3.Identity(), epsilon);

		const r = mat3.concatTranslation(m, mat3.Translation(vec2.Create(2.0, 3.0)), vec2.Create(4.0, 5.0));

		assertEquals(
			r,
			mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.Translation(vec2.Create(4.0, 5.0))),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat3.concatTranslation(m, mat3.RotationZ(0.25 * Math.PI), vec2.Create(4.0, 5.0)),
			mat3.Concat(mat3.RotationZ(0.25 * Math.PI), mat3.Translation(vec2.Create(4.0, 5.0))),
			epsilon
		);
	});
});

describe('ConcatMatrix2', () => {
	it('should return a Matrix3 representing a concatenation', () => {
		assertEquals(mat3.ConcatMatrix2(mat3.Identity(), mat2.Identity()), mat3.Identity(), epsilon);
		assertEquals(
			mat3.ConcatMatrix2(mat3.Translation(vec2.Create(2.0, 3.0)), mat2.Rotation(0.25 * Math.PI)),
			mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.25 * Math.PI)),
			epsilon
		);
		assertEquals(
			mat3.ConcatMatrix2(mat3.RotationZ(0.25 * Math.PI), mat2.Shear(vec2.AxisX(), vec2.Create(-0.5, 1.0))),
			mat3.Concat(mat3.RotationZ(0.25 * Math.PI), mat3.ShearVector2(vec2.AxisX(), vec2.Create(-0.5, 1.0))),
			epsilon
		);
	});
});

describe('concatMatrix2', () => {
	it('should set a Matrix3 to represent a concatenation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.concatMatrix2(m, mat3.Identity(), mat2.Identity()), mat3.Identity(), epsilon);

		const r = mat3.concatMatrix2(m, mat3.Translation(vec2.Create(2.0, 3.0)), mat2.Rotation(0.25 * Math.PI));

		assertEquals(
			r,
			mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.25 * Math.PI)),
			epsilon
		);
		assert.strictEqual(m, r);

		assertEquals(
			mat3.concatMatrix2(m, mat3.RotationZ(0.25 * Math.PI), mat2.Shear(vec2.AxisX(), vec2.Create(-0.5, 1.0))),
			mat3.Concat(mat3.RotationZ(0.25 * Math.PI), mat3.ShearVector2(vec2.AxisX(), vec2.Create(-0.5, 1.0))),
			epsilon
		);
	});
});

describe('Concat2x3', () => {
	it('should return a Matrix3 representing a concatenation', () => {
		assertEquals(mat3.Concat2x3(mat3.Identity(), mat3.Identity()), mat3.Identity(), epsilon);
		assertEquals(mat3.Concat2x3(mat3.RotationZ(0.25 * Math.PI), mat3.RotationZ(0.25 * Math.PI)), mat3.RotationZ(0.5 * Math.PI), epsilon);
		assertEquals(
			mat3.Concat2x3(mat3.ScaleVector2(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)),
			mat3.Concat(mat3.ScaleVector2(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)),
			epsilon
		);
		assertEquals(
			mat3.Concat2x3(mat3.RotationZ(0.5 * Math.PI), mat3.ScaleVector2(vec2.Create(2.0, 3.0))),
			mat3.Concat(mat3.RotationZ(0.5 * Math.PI), mat3.ScaleVector2(vec2.Create(2.0, 3.0))),
			epsilon
		);
		assertEquals(
			mat3.Concat2x3(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)),
			mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)),
			epsilon
		);
		assertEquals(
			mat3.Concat2x3(mat3.RotationZ(0.5 * Math.PI), mat3.Translation(vec2.Create(2.0, 3.0))),
			mat3.Concat(mat3.RotationZ(0.5 * Math.PI), mat3.Translation(vec2.Create(2.0, 3.0))),
			epsilon
		);
	});
});

describe('concat2x3', () => {
	it('should set a Matrix3 to represent a concatenation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.concat2x3(m, mat3.Identity(), mat3.Identity()), mat3.Identity(), epsilon);

		const r = mat3.concat2x3(m, mat3.RotationZ(0.25 * Math.PI), mat3.RotationZ(0.25 * Math.PI));

		assertEquals(r, mat3.RotationZ(0.5 * Math.PI), epsilon);
		assert.strictEqual(m, r);

		assertEquals(
			mat3.concat2x3(m, mat3.ScaleVector2(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)),
			mat3.Concat(mat3.ScaleVector2(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)),
			epsilon
		);
		assertEquals(
			mat3.concat2x3(m, mat3.RotationZ(0.5 * Math.PI), mat3.ScaleVector2(vec2.Create(2.0, 3.0))),
			mat3.Concat(mat3.RotationZ(0.5 * Math.PI), mat3.ScaleVector2(vec2.Create(2.0, 3.0))),
			epsilon
		);
		assertEquals(
			mat3.concat2x3(m, mat3.Translation(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)),
			mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)),
			epsilon
		);
		assertEquals(
			mat3.concat2x3(m, mat3.RotationZ(0.5 * Math.PI), mat3.Translation(vec2.Create(2.0, 3.0))),
			mat3.Concat(mat3.RotationZ(0.5 * Math.PI), mat3.Translation(vec2.Create(2.0, 3.0))),
			epsilon
		);
	});
});

describe('Concat', () => {
	it('should return a Matrix3 representing a concatenation', () => {
		assertEquals(mat3.Concat(mat3.Identity(), mat3.Identity()), mat3.Identity(), epsilon);
		assertEquals(mat3.Concat(mat3.RotationZ(0.25 * Math.PI), mat3.RotationZ(0.25 * Math.PI)), mat3.RotationZ(0.5 * Math.PI), epsilon);
		assertEquals(mat3.Concat(mat3.Scale(vec3.Create(2.0, 3.0, 4.0)), mat3.RotationZ(0.5 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 :  0.0, r10 : 3.0, r20 : 0.0,
			r01 : -2.0, r11 : 0.0, r21 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 4.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.Concat(mat3.RotationZ(0.5 * Math.PI), mat3.Scale(vec3.Create(2.0, 3.0, 4.0))), {
			/* eslint-disable object-property-newline */
			r00 :  0.0, r10 : 2.0, r20 : 0.0,
			r01 : -3.0, r11 : 0.0, r21 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 4.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.Concat(mat3.Translation(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 :  0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 :  2.0, r12 : 3.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.Concat(mat3.RotationZ(0.5 * Math.PI), mat3.Translation(vec2.Create(2.0, 3.0))), {
			/* eslint-disable object-property-newline */
			r00 :  0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : -3.0, r12 : 2.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.Concat(mat3.RotationZ(0.25 * Math.PI), mat3.RotationX(0.25 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 :  0.7071, r10 :  0.7071, r20 : 0.0,
			r01 : -0.5,    r11 :  0.5,    r21 : 0.7071,
			r02 :  0.5,    r12 : -0.5,    r22 : 0.7071
			/* eslint-enable object-property-newline */
		}, 1e-4);
		assertEquals(mat3.Concat(mat3.RotationX(0.25 * Math.PI), mat3.RotationZ(0.25 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 :  0.7071, r10 :  0.5,    r20 : 0.5,
			r01 : -0.7071, r11 :  0.5,    r21 : 0.5,
			r02 :  0.0,    r12 : -0.7071, r22 : 0.7071
			/* eslint-enable object-property-newline */
		}, 1e-4);
	});
});

describe('concat', () => {
	it('should set a Matrix3 to represent a concatenation', () => {
		const m = mat3.Identity();

		assertEquals(mat3.concat(m, mat3.Identity(), mat3.Identity()), mat3.Identity(), epsilon);

		const r = mat3.concat(m, mat3.RotationZ(0.25 * Math.PI), mat3.RotationZ(0.25 * Math.PI));

		assertEquals(r, mat3.RotationZ(0.5 * Math.PI), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat3.concat(m, mat3.Scale(vec3.Create(2.0, 3.0, 4.0)), mat3.RotationZ(0.5 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 :  0.0, r10 : 3.0, r20 : 0.0,
			r01 : -2.0, r11 : 0.0, r21 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 4.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.concat(m, mat3.RotationZ(0.5 * Math.PI), mat3.Scale(vec3.Create(2.0, 3.0, 4.0))), {
			/* eslint-disable object-property-newline */
			r00 :  0.0, r10 : 2.0, r20 : 0.0,
			r01 : -3.0, r11 : 0.0, r21 : 0.0,
			r02 :  0.0, r12 : 0.0, r22 : 4.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.concat(m, mat3.Translation(vec2.Create(2.0, 3.0)), mat3.RotationZ(0.5 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 :  0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 :  2.0, r12 : 3.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.concat(m, mat3.RotationZ(0.5 * Math.PI), mat3.Translation(vec2.Create(2.0, 3.0))), {
			/* eslint-disable object-property-newline */
			r00 :  0.0, r10 : 1.0, r20 : 0.0,
			r01 : -1.0, r11 : 0.0, r21 : 0.0,
			r02 : -3.0, r12 : 2.0, r22 : 1.0
			/* eslint-enable object-property-newline */
		}, epsilon);
		assertEquals(mat3.concat(m, mat3.RotationZ(0.25 * Math.PI), mat3.RotationX(0.25 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 :  0.7071, r10 :  0.7071, r20 : 0.0,
			r01 : -0.5,    r11 :  0.5,    r21 : 0.7071,
			r02 :  0.5,    r12 : -0.5,    r22 : 0.7071
			/* eslint-enable object-property-newline */
		}, 1e-4);
		assertEquals(mat3.concat(m, mat3.RotationX(0.25 * Math.PI), mat3.RotationZ(0.25 * Math.PI)), {
			/* eslint-disable object-property-newline */
			r00 :  0.7071, r10 :  0.5,    r20 : 0.5,
			r01 : -0.7071, r11 :  0.5,    r21 : 0.5,
			r02 :  0.0,    r12 : -0.7071, r22 : 0.7071
			/* eslint-enable object-property-newline */
		}, 1e-4);
	});
});

describe('Inverse', () => {
	it('should set a Matrix3 to represent an inversion', () => {
		assertEquals(mat3.Inverse(mat3.Identity()) as mat3.Matrix3, mat3.Identity(), epsilon);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : Number.NaN, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : Number.NaN, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : Number.NaN,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : Number.NaN, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : Number.NaN, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : Number.NaN,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : Number.NaN, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : Number.NaN, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.Inverse({
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : Number.NaN
			/* eslint-enable object-property-newline */
		}), undefined);
		assertEquals(
			mat3.Inverse(mat3.Inverse(mat3.Translation(vec2.Create(1.0, 2.0))) as mat3.Matrix3) as mat3.Matrix3,
			mat3.Translation(vec2.Create(1.0, 2.0)),
			epsilon
		);
		assertEquals(
			mat3.Inverse(mat3.Inverse(mat3.RotationX(0.25 * Math.PI)) as mat3.Matrix3) as mat3.Matrix3,
			mat3.RotationX(0.25 * Math.PI),
			epsilon
		);
		assertEquals(
			mat3.Inverse(mat3.Inverse(mat3.RotationY(0.25 * Math.PI)) as mat3.Matrix3) as mat3.Matrix3,
			mat3.RotationY(0.25 * Math.PI),
			epsilon
		);
		assertEquals(
			mat3.Inverse(mat3.Inverse(mat3.RotationZ(0.25 * Math.PI)) as mat3.Matrix3) as mat3.Matrix3,
			mat3.RotationZ(0.25 * Math.PI),
			epsilon
		);
	});
});

describe('inverse', () => {
	it('should set a Matrix3 to represent an inversion', () => {
		const m = mat3.Identity();

		assertEquals(mat3.inverse(m, mat3.Identity()) as mat3.Matrix3, mat3.Identity(), epsilon);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : Number.NaN, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : Number.NaN, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : Number.NaN,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : Number.NaN, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : Number.NaN, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : Number.NaN,
			r02 : 0.0, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : Number.NaN, r12 : 0.0, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : Number.NaN, r22 : 0.0
			/* eslint-enable object-property-newline */
		}), undefined);
		assert.strictEqual(mat3.inverse(m, {
			/* eslint-disable object-property-newline */
			r00 : 0.0, r10 : 0.0, r20 : 0.0,
			r01 : 0.0, r11 : 0.0, r21 : 0.0,
			r02 : 0.0, r12 : 0.0, r22 : Number.NaN
			/* eslint-enable object-property-newline */
		}), undefined);

		const r = mat3.inverse(m, mat3.inverse(m, mat3.Translation(vec2.Create(1.0, 2.0))) as mat3.Matrix3) as mat3.Matrix3;

		assertEquals(r, mat3.Translation(vec2.Create(1.0, 2.0)), epsilon);
		assert.strictEqual(m, r);

		assertEquals(
			mat3.inverse(m, mat3.inverse(m, mat3.RotationX(0.25 * Math.PI)) as mat3.Matrix3) as mat3.Matrix3,
			mat3.RotationX(0.25 * Math.PI),
			epsilon
		);
		assertEquals(
			mat3.inverse(m, mat3.inverse(m, mat3.RotationY(0.25 * Math.PI)) as mat3.Matrix3) as mat3.Matrix3,
			mat3.RotationY(0.25 * Math.PI),
			epsilon
		);
		assertEquals(
			mat3.inverse(m, mat3.inverse(m, mat3.RotationZ(0.25 * Math.PI)) as mat3.Matrix3) as mat3.Matrix3,
			mat3.RotationZ(0.25 * Math.PI),
			epsilon
		);
	});
});

describe('Transpose', () => {
	it('should return a Matrix3 representing a transpose', () => {
		assert.deepStrictEqual(mat3.Transpose({
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 3.0,
			r01 : 4.0, r11 : 5.0, r21 : 6.0,
			r02 : 7.0, r12 : 8.0, r22 : 9.0
			/* eslint-enable object-property-newline */
		}), {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 4.0, r20 : 7.0,
			r01 : 2.0, r11 : 5.0, r21 : 8.0,
			r02 : 3.0, r12 : 6.0, r22 : 9.0
			/* eslint-enable object-property-newline */
		});
	});
});

describe('transpose', () => {
	it('should set a Matrix3 to represent a transpose', () => {
		const m = mat3.Identity();
		const r = mat3.transpose(m, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 3.0,
			r01 : 4.0, r11 : 5.0, r21 : 6.0,
			r02 : 7.0, r12 : 8.0, r22 : 9.0
			/* eslint-enable object-property-newline */
		});

		assert.deepStrictEqual(r, {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 4.0, r20 : 7.0,
			r01 : 2.0, r11 : 5.0, r21 : 8.0,
			r02 : 3.0, r12 : 6.0, r22 : 9.0
			/* eslint-enable object-property-newline */
		});
		assert.strictEqual(m, r);
	});
});

describe('Copy', () => {
	it('should return a Matrix3 representing a copy', () => {
		const m = {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 3.0,
			r01 : 4.0, r11 : 5.0, r21 : 6.0,
			r02 : 7.0, r12 : 8.0, r22 : 9.0
			/* eslint-enable object-property-newline */
		};
		const r = mat3.Copy(m);

		assert.deepStrictEqual(m, r);
		assert.notStrictEqual(m, r);
	});

	it('should return a Matrix3 representing the 3x3 components of a derived matrix', () => {
		const a = mat3.RotationAxis(vec3.Normalize(vec3.Create(1.0, 2.0, 3.0)), Math.PI * 0.5);
		const b = mat4.ShearTranslationMatrix3(a, vec3.Create(4.0, 5.0, 6.0));
		const r = mat3.Copy(b);

		assert.notStrictEqual(b, r);
		assert.notDeepStrictEqual(b, r);
		assert.deepStrictEqual(a, r);
		assert.notStrictEqual(a, r);
	});
});

describe('copy', () => {
	it('should set a Matrix3 to represent a copy', () => {
		const a = {
			/* eslint-disable object-property-newline */
			r00 : 1.0, r10 : 2.0, r20 : 3.0,
			r01 : 4.0, r11 : 5.0, r21 : 6.0,
			r02 : 7.0, r12 : 8.0, r22 : 9.0
			/* eslint-enable object-property-newline */
		};
		const b = mat3.Identity();
		const r = mat3.copy(b, a);

		assert.deepStrictEqual(a, r);
		assert.notStrictEqual(a, r);
		assert.strictEqual(b, r);
	});

	it('should set a Matrix3 to represent the 3x3 components of a derived matrix', () => {
		const a = mat3.RotationAxis(vec3.Normalize(vec3.Create(1.0, 2.0, 3.0)), Math.PI * 0.5);
		const b = mat4.ShearTranslationMatrix3(a, vec3.Create(4.0, 5.0, 6.0));
		const c = mat3.Identity();
		const r = mat3.copy(c, b);

		assert.notStrictEqual(b, r);
		assert.notDeepStrictEqual(b, r);
		assert.deepStrictEqual(a, r);
		assert.notStrictEqual(a, r);
		assert.strictEqual(c, r);
	});
});
