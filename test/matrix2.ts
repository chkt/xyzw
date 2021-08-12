import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as vec2 from '../source/vector2';
import * as mat2 from '../source/matrix2';
import * as mat3 from '../source/matrix3';


const epsilon = 1e-10;


function assertEquals(actual:mat2.Matrix2, expected:mat2.Matrix2, e:number, message?:string) : void {
	if (
		Math.abs(expected.r00 - actual.r00) > e ||
		Math.abs(expected.r10 - actual.r10) > e ||
		Math.abs(expected.r01 - actual.r01) > e ||
		Math.abs(expected.r11 - actual.r11) > e
	) {
		throw new assert.AssertionError({
			actual,
			expected,
			message,
			operator : `!==[${ e }]`
		});
	}
}


describe('determinant', () => {
	it('should return the determinant of a Matrix2', () => {
		assert.strictEqual(mat2.determinant(mat2.Identity()), 1.0);
		assert.strictEqual(mat2.determinant(mat2.Rotation(0.0)), 1.0);
		assert.strictEqual(mat2.determinant(mat2.Rotation(0.5 * Math.PI)), 1.0);
		assert.strictEqual(mat2.determinant(mat2.Rotation(Math.PI)), 1.0);
		assert.strictEqual(mat2.determinant(mat2.Rotation(1.5 * Math.PI)), 1.0);
		assert.strictEqual(mat2.determinant(mat2.Shear(vec2.AxisX(), vec2.AxisY(2.0))), 2.0);
		assert.strictEqual(mat2.determinant(mat2.Shear(vec2.AxisX(2.0), vec2.AxisY())), 2.0);
	});
});

describe('Identity', () => {
	it('should return a Matrix2 representing the identity matrix', () => {
		assertEquals(mat2.Identity(), { r00: 1.0, r10 : 0.0, r01 : 0.0, r11 : 1.0 }, epsilon);
	});
});

describe('identity', () => {
	it('should set a Matrix2 to represent the identity matrix', () => {
		const m = { r00 : 0.0, r10 : 0.0, r01 : 0.0, r11 : 0.0 };
		const r = mat2.identity(m);
		assertEquals(r, { r00: 1.0, r10 : 0.0, r01 : 0.0, r11 : 1.0 }, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Rotation', () => {
	it('should return a Matrix2 representing a rotation', () => {
		assertEquals(mat2.Rotation(0.0), mat2.Identity(), epsilon);
		assertEquals(mat2.Rotation(0.5 * Math.PI), mat2.Shear(vec2.AxisY(), vec2.AxisX(-1.0)), epsilon);
		assertEquals(mat2.Rotation(Math.PI), mat2.Shear(vec2.AxisX(-1.0), vec2.AxisY(-1.0)), epsilon);
		assertEquals(mat2.Rotation(1.5 * Math.PI), mat2.Shear(vec2.AxisY(-1.0), vec2.AxisX()), epsilon);
		assertEquals(mat2.Rotation(2.0 * Math.PI), mat2.Shear(vec2.AxisX(), vec2.AxisY()), epsilon);
		assertEquals(mat2.Rotation(0.25 * Math.PI), mat2.Shear(
			vec2.Rotation(0.25 * Math.PI),
			vec2.Rotation(0.75 * Math.PI)
		), epsilon);
	});
});

describe('rotation', () => {
	it('should set a Matrix2 to represent a rotation', () => {
		const m = mat2.Identity();
		const r = mat2.rotation(m, 0.5 * Math.PI);
		assertEquals(r, mat2.Shear(vec2.AxisY(), vec2.AxisX(-1.0)), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat2.rotation(m, 0.0), mat2.Identity(), epsilon);
		assertEquals(mat2.rotation(m, Math.PI), mat2.Shear(vec2.AxisX(-1.0), vec2.AxisY(-1.0)), epsilon);
		assertEquals(mat2.rotation(m, 1.5 * Math.PI), mat2.Shear(vec2.AxisY(-1.0), vec2.AxisX()), epsilon);
		assertEquals(mat2.rotation(m, 2.0 * Math.PI), mat2.Shear(vec2.AxisX(), vec2.AxisY()), epsilon);
		assertEquals(mat2.rotation(m, 0.25 * Math.PI), mat2.Shear(
			vec2.Rotation(0.25 * Math.PI),
			vec2.Rotation(0.75 * Math.PI)
		), epsilon);
	});
});

describe('RotationVector2', () => {
	it('should return a Matrix2 representing a rotation', () => {
		assertEquals(mat2.RotationVector2(vec2.AxisX()), mat2.Identity(), epsilon);
		assertEquals(mat2.RotationVector2(vec2.AxisY()), mat2.Shear(vec2.AxisY(), vec2.AxisX(-1.0)), epsilon);
		assertEquals(mat2.RotationVector2(vec2.AxisX(-1.0)), mat2.Shear(vec2.AxisX(-1.0), vec2.AxisY(-1.0)), epsilon);
		assertEquals(mat2.RotationVector2(vec2.AxisY(-1.0)), mat2.Shear(vec2.AxisY(-1.0), vec2.AxisX()), epsilon);
		assertEquals(mat2.RotationVector2(vec2.Rotation(0.25 * Math.PI)), mat2.Shear(
			vec2.Rotation(0.25 * Math.PI),
			vec2.Rotation(0.75 * Math.PI)
		) , epsilon);
	});
});

describe('rotationVector2', () => {
	it('should set a Matrix2 to represent a rotation', () => {
		const m = mat2.Identity();
		const r = mat2.rotationVector2(m, vec2.AxisY());
		assertEquals(r, mat2.Shear(vec2.AxisY(), vec2.AxisX(-1.0)), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat2.rotationVector2(m, vec2.AxisX()), mat2.Identity(), epsilon);
		assertEquals(mat2.rotationVector2(m, vec2.AxisX(-1.0)), mat2.Shear(vec2.AxisX(-1.0), vec2.AxisY(-1.0)), epsilon);
		assertEquals(mat2.rotationVector2(m, vec2.AxisY(-1.0)), mat2.Shear(vec2.AxisY(-1.0), vec2.AxisX()), epsilon);
		assertEquals(mat2.rotationVector2(m, vec2.Rotation(0.25 * Math.PI)), mat2.Shear(
			vec2.Rotation(0.25 * Math.PI),
			vec2.Rotation(0.75 * Math.PI)
		) , epsilon);
	});
});

describe('Scale', () => {
	it('should return a Matrix2 representing a scaling', () => {
		assertEquals(mat2.Scale(vec2.Create(0.0, 0.0)), { r00 : 0.0, r10 : 0.0, r01 : 0.0, r11 : 0.0 }, epsilon);
		assertEquals(mat2.Scale(vec2.Create(1.0, 1.0)), mat2.Identity(), epsilon);
		assertEquals(mat2.Scale(vec2.Create(0.5, 2.0)), { r00 : 0.5, r10 : 0.0, r01 : 0.0, r11 : 2.0 }, epsilon);
	});
});

describe('scale', () => {
	it('should set a Matrix2 to represent a scaling', () => {
		const m = mat2.Identity();
		const r = mat2.scale(m, vec2.Create(0.5, 2.0));
		assertEquals(r, { r00 : 0.5, r10 : 0.0, r01 : 0.0, r11 : 2.0 }, epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat2.scale(m, vec2.Create(0.0, 0.0)), { r00 : 0.0, r10 : 0.0, r01 : 0.0, r11 : 0.0 }, epsilon);
		assertEquals(mat2.scale(m, vec2.Create(1.0, 1.0)), mat2.Identity(), epsilon);
	});
});

describe('Shear', () => {
	it('should return a Matrix2 representing a shear', () => {
		assertEquals(mat2.Shear(vec2.AxisX(), vec2.AxisY()), mat2.Identity(), epsilon);
		assertEquals(mat2.Shear(vec2.AxisY(), vec2.AxisX(-1.0)), { r00 : 0.0, r10 : 1.0, r01 : -1.0, r11 : 0.0 }, epsilon);
		assertEquals(mat2.Shear(vec2.AxisX(-1.0), vec2.AxisY(-1.0)), { r00 : -1.0, r10 : 0.0, r01 : 0.0, r11 : -1.0 }, epsilon);
		assertEquals(mat2.Shear(vec2.AxisY(-1.0), vec2.AxisX()), { r00 : 0.0, r10 : -1.0, r01 : 1.0, r11 : 0.0 }, epsilon);
	});
});

describe('shear', () => {
	it('should set a Matrix2 to represent a shear', () => {
		const m = mat2.Identity();
		const r = mat2.shear(m, vec2.AxisY(), vec2.AxisX(-1.0));
		assertEquals(r, { r00 : 0.0, r10 : 1.0, r01 : -1.0, r11 : 0.0 }, epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat2.shear(m, vec2.AxisX(), vec2.AxisY()), mat2.Identity(), epsilon);
		assertEquals(mat2.shear(m, vec2.AxisX(-1.0), vec2.AxisY(-1.0)), { r00 : -1.0, r10 : 0.0, r01 : 0.0, r11 : -1.0 }, epsilon);
		assertEquals(mat2.shear(m, vec2.AxisY(-1.0), vec2.AxisX()), { r00 : 0.0, r10 : -1.0, r01 : 1.0, r11 : 0.0 }, epsilon);
	});
});

describe('ShearMatrix3', () => {
	it('should return a Matrix2 representing a rotation', () => {
		assertEquals(mat2.ShearMatrix3(mat3.Identity()), mat2.Identity(), epsilon);
		assertEquals(mat2.ShearMatrix3(mat3.RotationZ(0.5 * Math.PI)), mat2.Rotation(0.5 * Math.PI), epsilon);
		assertEquals(mat2.ShearMatrix3(mat3.RotationZ(Math.PI)), mat2.Rotation(Math.PI), epsilon);
		assertEquals(mat2.ShearMatrix3(mat3.RotationZ(1.5 * Math.PI)), mat2.Rotation(1.5 * Math.PI), epsilon);
		assertEquals(mat2.ShearMatrix3(mat3.RotationZ(2.0 * Math.PI)), mat2.Rotation(2.0 * Math.PI), epsilon);
		assertEquals(mat2.ShearMatrix3(mat3.RotationZ(0.25 * Math.PI)), mat2.Rotation(0.25 * Math.PI), epsilon);
	});
});

describe('shearMatrix3', () => {
	it('should set a Matrix2 to represent a rotation', () => {
		const m = mat2.Identity();
		const r = mat2.shearMatrix3(m, mat3.RotationZ(0.5 * Math.PI));
		assertEquals(r, mat2.Rotation(0.5 * Math.PI), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat2.shearMatrix3(m, mat3.Identity()), mat2.Identity(), epsilon);
		assertEquals(mat2.shearMatrix3(m, mat3.RotationZ(Math.PI)), mat2.Rotation(Math.PI), epsilon);
		assertEquals(mat2.shearMatrix3(m, mat3.RotationZ(1.5 * Math.PI)), mat2.Rotation(1.5 * Math.PI), epsilon);
		assertEquals(mat2.shearMatrix3(m, mat3.RotationZ(2.0 * Math.PI)), mat2.Rotation(2.0 * Math.PI), epsilon);
		assertEquals(mat2.shearMatrix3(m, mat3.RotationZ(0.25 * Math.PI)), mat2.Rotation(0.25 * Math.PI), epsilon);
	});
});

describe('Add', () => {
	it('should return a Matrix2 representing an addition', () => {
		assertEquals(mat2.Add(
			{ r00 : 1.0, r10 : 2.0, r01 : 3.0, r11 : 4.0 },
			{ r00 : 5.0, r10 : 6.0, r01 : 7.0, r11 : 8.0 }
		), { r00 : 6.0, r10 : 8.0, r01 : 10.0, r11 : 12.0 }, epsilon);
	});
});

describe('add', () => {
	it('should set a Matrix2 to represent an addition', () => {
		const m = mat2.Identity();
		const r = mat2.add(
			m,
			{ r00 : 1.0, r10 : 2.0, r01 : 3.0, r11 : 4.0 },
			{ r00 : 5.0, r10 : 6.0, r01 : 7.0, r11 : 8.0 }
		);

		assertEquals(r, { r00 : 6.0, r10 : 8.0, r01 : 10.0, r11 : 12.0 }, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('addAssign', () => {
	it('should set a Matrix2 to represent an addition', () => {
		const m = { r00 : 1.0, r10 : 2.0, r01 : 3.0, r11 : 4.0 };
		const r = mat2.addAssign(m, { r00 : 5.0, r10 : 6.0, r01 : 7.0, r11 : 8.0 });

		assertEquals(r, { r00 : 6.0, r10 : 8.0, r01 : 10.0, r11 : 12.0 }, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Subtract', () => {
	it('should return a Matrix2 representing a subtraction', () => {
		assertEquals(mat2.Subtract(
			{ r00 : 1.0, r10 : 2.0, r01 : 3.0, r11 : 4.0 },
			{ r00 : 8.0, r10 : 7.0, r01 : 6.0, r11 : 5.0 }
		), { r00 : -7.0, r10 : -5.0, r01 : -3.0, r11 : -1.0 }, epsilon);
	});
});

describe('subtract', () => {
	it('should set a Matrix2 to represent a subtraction', () => {
		const m = mat2.Identity();
		const r = mat2.subtract(
			m,
			{ r00 : 1.0, r10 : 2.0, r01 : 3.0, r11 : 4.0 },
			{ r00 : 8.0, r10 : 7.0, r01 : 6.0, r11 : 5.0 }
		);

		assertEquals(r, { r00 : -7.0, r10 : -5.0, r01 : -3.0, r11 : -1.0 }, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('subtractAssign', () => {
	it('should set a Matrix2 to represent a subtraction', () => {
		const m = { r00 : 1.0, r10 : 2.0, r01 : 3.0, r11 : 4.0 };
		const r = mat2.subtractAssign(m, { r00 : 8.0, r10 : 7.0, r01 : 6.0, r11 : 5.0 });

		assertEquals(r, { r00 : -7.0, r10 : -5.0, r01 : -3.0, r11 : -1.0 }, epsilon);
		assert.strictEqual(m, r);
	});
});

describe('Concat', () => {
	it('should return a Matrix2 representing a concatenation', () => {
		assertEquals(mat2.Concat(mat2.Identity(), mat2.Identity()), mat2.Identity(), epsilon);
		assertEquals(mat2.Concat(mat2.Identity(), mat2.Rotation(0.5 * Math.PI)), mat2.Rotation(0.5 * Math.PI), epsilon);
		assertEquals(mat2.Concat(mat2.Rotation(0.5 * Math.PI), mat2.Identity()), mat2.Rotation(0.5 * Math.PI), epsilon);
		assertEquals(mat2.Concat(mat2.Scale(vec2.Create(1.0, 2.0)), mat2.Rotation(0.5 * Math.PI)), { r00 : 0.0, r10 : 2.0, r01 : -1.0, r11 : 0.0 }, epsilon);
		assertEquals(mat2.Concat(mat2.Rotation(0.5 * Math.PI), mat2.Scale(vec2.Create(1.0, 2.0))), { r00 : 0.0, r10 : 1.0, r01 : -2.0, r11 : 0.0 }, epsilon);
		assertEquals(mat2.Concat(mat2.Rotation(0.5 * Math.PI), mat2.Rotation(Math.PI)), mat2.Rotation(1.5 * Math.PI), epsilon);
	});
});

describe('concat', () => {
	it('should set a Matrix2 to represent a concatenation', () => {
		const m = mat2.Identity();
		const r = mat2.concat(m, mat2.Identity(), mat2.Rotation(0.5 * Math.PI));
		assertEquals(r, mat2.Rotation(0.5 * Math.PI), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat2.concat(m, mat2.Identity(), mat2.Identity()), mat2.Identity(), epsilon);
		assertEquals(mat2.concat(m, mat2.Rotation(0.5 * Math.PI), mat2.Identity()), mat2.Rotation(0.5 * Math.PI), epsilon);
		assertEquals(mat2.concat(m, mat2.Scale(vec2.Create(1.0, 2.0)), mat2.Rotation(0.5 * Math.PI)), { r00 : 0.0, r10 : 2.0, r01 : -1.0, r11 : 0.0 }, epsilon);
		assertEquals(mat2.concat(m, mat2.Rotation(0.5 * Math.PI), mat2.Scale(vec2.Create(1.0, 2.0))), { r00 : 0.0, r10 : 1.0, r01 : -2.0, r11 : 0.0 }, epsilon);
		assertEquals(mat2.concat(m, mat2.Rotation(0.5 * Math.PI), mat2.Rotation(Math.PI)), mat2.Rotation(1.5 * Math.PI), epsilon);
	});
});

describe('Inverse', () => {
	it('should return a Matrix2 representing an inverse', () => {
		assertEquals(mat2.Inverse(mat2.Identity()) as mat2.Matrix2, mat2.Identity(), epsilon);
		assert.strictEqual(mat2.Inverse({ r00 : 0.0, r10 : 0.0, r01 : 0.0, r11 : 0.0 }), undefined);
		assert.strictEqual(mat2.Inverse({ r00 : Number.NaN, r10 : 0.0, r01 : 0.0, r11 : 1.0 }), undefined);
		assert.strictEqual(mat2.Inverse({ r00 : 1.0, r10 : Number.NaN, r01 : 0.0, r11 : 1.0 }), undefined);
		assert.strictEqual(mat2.Inverse({ r00 : 1.0, r10 : 0.0, r01 : Number.NaN, r11 : 1.0 }), undefined);
		assert.strictEqual(mat2.Inverse({ r00 : 1.0, r10 : 0.0, r01 : 0.0, r11 : Number.NaN }), undefined);
		assertEquals(
			mat2.Inverse(mat2.Inverse(mat2.Rotation(0.25 * Math.PI)) as mat2.Matrix2) as mat2.Matrix2,
			mat2.Rotation(0.25 * Math.PI),
			epsilon
		);
	});
});

describe('inverse', () => {
	it('should set a Matrix2 to represent an inverse', () => {
		const m = mat2.Identity();
		const r = mat2.inverse(m, mat2.inverse(m, mat2.Rotation(0.25 * Math.PI)) as mat2.Matrix2) as mat2.Matrix2
		assertEquals(r, mat2.Rotation(0.25 * Math.PI), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat2.inverse(m, mat2.Identity()) as mat2.Matrix2, mat2.Identity(), epsilon);
		assert.strictEqual(mat2.inverse(m, { r00 : 0.0, r10 : 0.0, r01 : 0.0, r11 : 0.0 }), undefined);
		assert.strictEqual(mat2.inverse(m, { r00 : Number.NaN, r10 : 0.0, r01 : 0.0, r11 : 1.0 }), undefined);
		assert.strictEqual(mat2.inverse(m, { r00 : 1.0, r10 : Number.NaN, r01 : 0.0, r11 : 1.0 }), undefined);
		assert.strictEqual(mat2.inverse(m, { r00 : 1.0, r10 : 0.0, r01 : Number.NaN, r11 : 1.0 }), undefined);
		assert.strictEqual(mat2.inverse(m, { r00 : 1.0, r10 : 0.0, r01 : 0.0, r11 : Number.NaN }), undefined);
	});
});

describe('Transpose', () => {
	it('should return a Matrix2 representing a transpose', () => {
		assertEquals(mat2.Transpose(mat2.Identity()), mat2.Identity(), epsilon);
		assertEquals(mat2.Transpose(mat2.Scale(vec2.Create(2.0, 1.0))), mat2.Scale(vec2.Create(2.0, 1.0)), epsilon);
		assertEquals(mat2.Transpose(mat2.Shear(vec2.AxisY(), vec2.AxisX(-1.0))), mat2.Shear(vec2.AxisY(-1.0), vec2.AxisX()), epsilon);
	});
});

describe('transpose', () => {
	it('should set a Matrix2 to represent a transpose', () => {
		const m = mat2.Identity();
		const r = mat2.transpose(m, mat2.Shear(vec2.AxisY(), vec2.AxisX(-1.0)));
		assertEquals(r, mat2.Shear(vec2.AxisY(-1.0), vec2.AxisX()), epsilon);
		assert.strictEqual(m, r);

		assertEquals(mat2.Transpose(mat2.Identity()), mat2.Identity(), epsilon);
		assertEquals(mat2.Transpose(mat2.Scale(vec2.Create(2.0, 1.0))), mat2.Scale(vec2.Create(2.0, 1.0)), epsilon);
	});
});

describe('Copy', () => {
	it('should return a Matrix2 representing a copy', () => {
		const m = mat2.Rotation(0.5 * Math.PI);
		const r = mat2.Copy(m);

		assert.deepStrictEqual(m, r);
		assert.notStrictEqual(m, r);
	});
});

describe('copy', () => {
	it('should set a Matrix2 to represent a copy', () => {
		const a = mat2.Rotation(0.5 * Math.PI);
		const b = mat2.Identity();
		const r = mat2.copy(b, a);

		assert.notStrictEqual(a, b);
		assert.deepStrictEqual(a, b);
		assert.strictEqual(b, r);
	});
});
