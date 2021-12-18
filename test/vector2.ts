import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as vector2 from '../source/vector2';
import * as matrix2 from '../source/matrix2';
import * as matrix3 from '../source/matrix3';


const epsilon = 1e-10;

function assertEquals(v:vector2.Vector2, w:vector2.Vector2, e:number, message?:string) : void {
	const x = w.x - v.x;
	const y = w.y - v.y;

	if (
		Number.isNaN(x) || x < -e || x > e ||
		Number.isNaN(y) || y < -e || y > e
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
	it('should return true if v equals w', () => {
		const v = vector2.AxisX();
		const w = v;
		const s = { ...v, x : Number.NaN };

		assert.strictEqual(vector2.equals(v, w), true);
		assert.strictEqual(vector2.equals(s, s), false);
		assert.strictEqual(vector2.equals(vector2.AxisX(2.0), vector2.AxisX(2.0)), true);
		assert.strictEqual(vector2.equals(vector2.Create(1.0, 1.0), vector2.Create(1.0, 0.0)), false);
		assert.strictEqual(vector2.equals(vector2.Create(1.0, 1.0), vector2.Create(0.0, 1.0)), false);
		assert.strictEqual(vector2.equals(vector2.Create(Number.NaN, 1.0), vector2.Create(Number.NaN, 1.0)), false);
		assert.strictEqual(vector2.equals(vector2.Create(1.0, Number.NaN), vector2.Create(1.0, Number.NaN)), false);
		assert.strictEqual(vector2.equals(vector2.Create(1.0, 1.0), vector2.Create(1.01, 1.0), 1e-3), false);
		assert.strictEqual(vector2.equals(vector2.Create(1.0, 1.0), vector2.Create(1.01, 1.0), 1e-1), true);
	});
});

describe('norm', () => {
	it('should return the norm (length) of v', () => {
		assert.strictEqual(vector2.norm({ x : 0.0, y : 0.0 }), 0.0);
		assert.strictEqual(vector2.norm({ x : 2.0, y : 0.0 }), 2.0);
		assert.strictEqual(vector2.norm({ x : 0.0, y : 2.0 }), 2.0);
		assert.strictEqual(vector2.norm({ x : 1.0, y : 1.0 }), Math.sqrt(2.0));
		assert.strictEqual(vector2.norm({ x : 2.0, y : 2.0 }), Math.sqrt(8.0));
		assert.strictEqual(vector2.norm({ x : Number.NaN, y : 1.0 }), Number.NaN);
		assert.strictEqual(vector2.norm({ x : 1.0, y : Number.NaN }), Number.NaN);
	});
});

describe('normSquared', () => {
	it('should return the squared norm (length) of v', () => {
		assert.strictEqual(vector2.normSquared({ x : 0.0, y : 0.0 }), 0.0);
		assert.strictEqual(vector2.normSquared({ x : 2.0, y : 0.0 }), 4.0);
		assert.strictEqual(vector2.normSquared({ x : 0.0, y : 2.0 }), 4.0);
		assert.strictEqual(vector2.normSquared({ x : 1.0, y : 1.0 }), 2.0);
		assert.strictEqual(vector2.normSquared({ x : 2.0, y : 2.0 }), 8.0);
		assert.strictEqual(vector2.normSquared({ x : Number.NaN, y : 1.0 }), Number.NaN);
		assert.strictEqual(vector2.normSquared({ x : 1.0, y : Number.NaN }), Number.NaN);
	})
});

describe('cross', () => {
	it('should return the cross (outer) product of v and w', () => {
		assert.strictEqual(vector2.cross(vector2.AxisX(), vector2.AxisX()), 0.0);
		assert.strictEqual(vector2.cross(vector2.AxisX(), vector2.AxisY()), 1.0);
		assert.strictEqual(vector2.cross(vector2.AxisY(), vector2.AxisX()), -1.0);
		assert.strictEqual(vector2.cross(vector2.AxisY(), vector2.AxisY()), 0.0);
		assert.strictEqual(vector2.cross(vector2.Rotation(0.25 * Math.PI), vector2.Rotation(0.75 * Math.PI)), 1.0);
		assert.strictEqual(vector2.cross(vector2.Rotation(0.25 * Math.PI), vector2.Rotation(0.25 * Math.PI)), 0.0);
		assert.strictEqual(vector2.cross(vector2.AxisX(2.0), vector2.AxisY(2.0)), 4.0);
	});
});

describe('dot', () => {
	it('should return the dot (inner) product of v and w', () => {
		assert.strictEqual(vector2.dot(vector2.AxisX(), vector2.AxisX()), 1.0);
		assert.strictEqual(vector2.dot(vector2.AxisX(), vector2.AxisY()), 0.0);
		assert.strictEqual(vector2.dot(vector2.AxisY(), vector2.AxisX()), 0.0);
		assert.strictEqual(vector2.dot(vector2.AxisY(), vector2.AxisY()), 1.0);
		assert.strictEqual(vector2.dot(vector2.AxisX(), vector2.AxisX(-1.0)), -1.0);
		assert.strictEqual(vector2.dot(vector2.AxisY(), vector2.AxisY(-1.0)), -1.0);
		assert.strictEqual(vector2.dot(vector2.Rotation(0.25 * Math.PI), vector2.Rotation(0.75 * Math.PI)),  0.0);
		assert.strictEqual(vector2.dot(vector2.Rotation(0.25 * Math.PI), vector2.Rotation(0.25 * Math.PI)),  1.0);
		assert.strictEqual(vector2.dot(vector2.Rotation(0.25 * Math.PI), vector2.Rotation(1.25 * Math.PI)), -1.0);
		assert.strictEqual(vector2.dot(vector2.AxisX(2.0), vector2.AxisX(2.0)), 4.0);
	});
});

describe('radians', () => {
	it('should return the magnitude of the angle between v and w in radians', () => {
		assert.strictEqual(vector2.radians(vector2.AxisX(), vector2.AxisX()), 0.0);
		assert.strictEqual(vector2.radians(vector2.AxisX(), vector2.AxisY()), 0.5 * Math.PI);
		assert.strictEqual(vector2.radians(vector2.AxisX(), vector2.AxisX(-1.0)), Math.PI);
		assert.strictEqual(vector2.radians(vector2.AxisX(), vector2.AxisY(-1.0)), 0.5 * Math.PI);
		assert.strictEqual(vector2.radians(vector2.Rotation(0.25 * Math.PI), vector2.Rotation(0.75 * Math.PI)),  0.5 * Math.PI);
		assert.strictEqual(vector2.radians(vector2.Rotation(0.25 * Math.PI), vector2.Rotation(0.25 * Math.PI)),  0.0);
	});
});


describe('Create', () => {
	it('should return a Vector2', () => {
		assert.deepStrictEqual(vector2.Create(), { x: 0.0, y: 0.0 });
		assert.deepStrictEqual(vector2.Create(1.0), { x: 1.0, y: 0.0 });
		assert.deepStrictEqual(vector2.Create(0.0, 1.0), { x: 0.0, y: 1.0 });
	});
});

describe('assign', () => {
	it ('should assign a Vector2', () => {
		const v = vector2.Create();
		const r = vector2.assign(v, 1.0, 2.0);
		assert.deepStrictEqual(v, { x : 1.0, y : 2.0 });
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector2.assign(v), { x : 0.0, y : 0.0 });
		assert.deepStrictEqual(vector2.assign(v, 1.0), { x : 1.0, y : 0.0 });
	});
});

describe('AxisX', () => {
	it('should return a "unit x" Vector2', () => {
		assert.deepStrictEqual(vector2.AxisX(), { x : 1.0, y : 0.0 });
	});

	it('should return a x axis Vector2 of arbitrary length', () => {
		assert.deepStrictEqual(vector2.AxisX(-2.0), { x : -2.0, y : 0.0 });
	});
});

describe('axisX', () => {
	it('should assign a "unit x" Vector2', () => {
		const v = vector2.Create(2.0, 1.0);
		const r = vector2.axisX(v);

		assert.deepStrictEqual(v, { x : 1.0, y : 0.0 });
		assert.strictEqual(v, r);
	});

	it('should set Vector2 to represent a x axis of arbitrary length', () => {
		const v = vector2.Create(2.0, 1.0);
		const r = vector2.axisX(v, -2.0);

		assert.deepStrictEqual(v, { x : -2.0, y : 0.0 });
		assert.deepStrictEqual(v, r);
	});
});

describe('AxisY', () => {
	it('should return a "unit y" Vector2', () => {
		assert.deepStrictEqual(vector2.AxisY(), { x : 0.0, y : 1.0 });
	});

	it('should return a y axis Vector2 of arbitrary length', () => {
		assert.deepStrictEqual(vector2.AxisY(-2.0), { x : 0.0, y : -2.0 });
	});
});

describe('unitY', () => {
	it('should "unit y" a Vector2', () => {
		const v = vector2.Create(1.0, 2.0);
		const r = vector2.axisY(v);

		assert.deepStrictEqual(v, { x : 0.0, y : 1.0 });
		assert.strictEqual(v, r);
	});

	it('should set Vector2 to represent a y axis of arbitrary length', () => {
		const v = vector2.Create(1.0, 2.0);
		const r = vector2.axisY(v, -2.0);

		assert.deepStrictEqual(v, { x : 0.0, y : -2.0 });
		assert.deepStrictEqual(v, r);
	});
});

describe('Rotation', () => {
	it('should return a unit Vector2 representing rad', () => {
		assertEquals(vector2.Rotation(0.0), { x : 1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Rotation(0.5 * Math.PI), { x : 0.0, y : 1.0 }, epsilon);
		assertEquals(vector2.Rotation(Math.PI), { x : -1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Rotation(1.5 * Math.PI), { x : 0.0, y : -1.0 }, epsilon);
		assertEquals(vector2.Rotation(2 * Math.PI), { x : 1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Rotation(-1 * Math.PI), { x : -1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Rotation(3 * Math.PI), { x : -1.0, y : 0.0 }, epsilon);
	});
});

describe('rotation', () => {
	it('should set a Vector2 to represent rad', () => {
		const v = vector2.Create();
		const r = vector2.rotation(v, 0.0);
		assertEquals(r, { x : 1.0, y : 0.0 }, epsilon);
		assert.deepStrictEqual(v, r);

		assertEquals(vector2.rotation(v, 0.5 * Math.PI), { x : 0.0, y : 1.0 }, epsilon);
		assertEquals(vector2.rotation(v, Math.PI), { x : -1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.rotation(v, 1.5 * Math.PI), { x : 0.0, y : -1.0 }, epsilon);
		assertEquals(vector2.rotation(v, 2 * Math.PI), { x : 1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.rotation(v, -1 * Math.PI), { x : -1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.rotation(v, 3 * Math.PI), { x : -1.0, y : 0.0 }, epsilon);
	});
});

describe('BarycentricUV', () => {
	it('should return a Vector2 representing barycentric UV coordinates', () => {
		const vx0 = vector2.Create(-1.0, -1.0);
		const vx1 = vector2.Create( 1.0, -1.0);
		const vx2 = vector2.Create(-1.0,  1.0);

		assertEquals(vector2.BarycentricUV(vx0, vx1, vx2, 0.0, 0.0), { x : -1.0, y : -1.0 }, epsilon);
		assertEquals(vector2.BarycentricUV(vx0, vx1, vx2, 1.0, 0.0), { x :  1.0, y : -1.0 }, epsilon);
		assertEquals(vector2.BarycentricUV(vx0, vx1, vx2, 0.0, 1.0), { x : -1.0, y :  1.0 }, epsilon);
		assertEquals(vector2.BarycentricUV(vx0, vx1, vx2, 0.5, 0.5), { x :  0.0, y :  0.0 }, epsilon);
	});
});

describe('barycentricUV', () => {
	it('should set a Vector2 to represent barycentric UV coordinates', () => {
		const vx0 = vector2.Create(-1.0, -1.0);
		const vx1 = vector2.Create( 1.0, -1.0);
		const vx2 = vector2.Create(-1.0,  1.0);

		const v = vector2.Create();
		const r = vector2.barycentricUV(v, vx0, vx1, vx2, 0.0, 0.0);
		assertEquals(r, { x : -1.0, y : -1.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.barycentricUV(r, vx0, vx1, vx2, 1.0, 0.0), { x :  1.0, y : -1.0 }, epsilon);
		assertEquals(vector2.barycentricUV(r, vx0, vx1, vx2, 0.0, 1.0), { x : -1.0, y :  1.0 }, epsilon);
		assertEquals(vector2.barycentricUV(r, vx0, vx1, vx2, 0.5, 0.5), { x :  0.0, y :  0.0 }, epsilon);

		assertEquals(vector2.barycentricUV(vx0, vx0, vx1, vx2, 0.5, 0.5), { x :  0.0, y :  0.0 }, epsilon);
		vector2.assign(vx0, -1.0, -1.0);
		assertEquals(vector2.barycentricUV(vx1, vx0, vx1, vx2, 0.5, 0.5), { x :  0.0, y :  0.0 }, epsilon);
		vector2.assign(vx1, 1.0, -1.0);
		assertEquals(vector2.barycentricUV(vx2, vx0, vx1, vx2, 0.5, 0.5), { x :  0.0, y :  0.0 }, epsilon);
	});
});

describe('Add', () => {
	it('should return a Vector2 representing an addition', () => {
		assertEquals(vector2.Add(vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Add(vector2.Create( 2.0,  4.0), vector2.Create( 1.0,  3.0)), { x :  3.0, y :  7.0 }, epsilon);
		assertEquals(vector2.Add(vector2.Create( 2.0, -4.0), vector2.Create(-1.0,  3.0)), { x :  1.0, y : -1.0 }, epsilon);
		assertEquals(vector2.Add(vector2.Create(-2.0,  4.0), vector2.Create( 1.0, -3.0)), { x : -1.0, y :  1.0 }, epsilon);
		assertEquals(vector2.Add(vector2.Create(-2.0, -4.0), vector2.Create(-1.0, -3.0)), { x : -3.0, y : -7.0 }, epsilon);
	});
});

describe('add', () => {
	it('should set a Vector2 to represent an addition', () => {
		const v = vector2.Create();
		const r = vector2.add(v, vector2.Create( 2.0, 4.0), vector2.Create( 1.0,  3.0));
		assertEquals(r, { x : 3.0, y : 7.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.add(v, vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.add(v, vector2.Create( 2.0, -4.0), vector2.Create(-1.0,  3.0)), { x :  1.0, y : -1.0 }, epsilon);
		assertEquals(vector2.add(v, vector2.Create(-2.0,  4.0), vector2.Create( 1.0, -3.0)), { x : -1.0, y :  1.0 }, epsilon);
		assertEquals(vector2.add(v, vector2.Create(-2.0, -4.0), vector2.Create(-1.0, -3.0)), { x : -3.0, y : -7.0 }, epsilon);
	});
});

describe('addAssign', () => {
	it('should set a Vector2 to represent an addition', () => {
		const v = vector2.Create(2.0, 4.0);
		const r = vector2.addAssign(v, vector2.Create( 1.0,  3.0));
		assertEquals(r, { x : 3.0, y : 7.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.addAssign(vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.addAssign(vector2.Create( 2.0, -4.0), vector2.Create(-1.0,  3.0)), { x :  1.0, y : -1.0 }, epsilon);
		assertEquals(vector2.addAssign(vector2.Create(-2.0,  4.0), vector2.Create( 1.0, -3.0)), { x : -1.0, y :  1.0 }, epsilon);
		assertEquals(vector2.addAssign(vector2.Create(-2.0, -4.0), vector2.Create(-1.0, -3.0)), { x : -3.0, y : -7.0 }, epsilon);
	});
});

describe('Subtract', () => {
	it('should return a Vector2 representing a subtraction', () => {
		assertEquals(vector2.Subtract(vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Subtract(vector2.Create( 2.0,  4.0), vector2.Create( 1.0,  3.0)), { x :  1.0, y :  1.0 }, epsilon);
		assertEquals(vector2.Subtract(vector2.Create( 2.0, -4.0), vector2.Create(-1.0,  3.0)), { x :  3.0, y : -7.0 }, epsilon);
		assertEquals(vector2.Subtract(vector2.Create(-2.0,  4.0), vector2.Create( 1.0, -3.0)), { x : -3.0, y :  7.0 }, epsilon);
		assertEquals(vector2.Subtract(vector2.Create(-2.0, -4.0), vector2.Create(-1.0, -3.0)), { x : -1.0, y : -1.0 }, epsilon);
	});
});

describe('subtract', () => {
	it('should set a Vector2 to represent a subtraction', () => {
		const v = vector2.Create();
		const r = vector2.subtract(v, vector2.Create(2.0, 4.0), vector2.Create( 1.0,  3.0));
		assertEquals(r, { x : 1.0, y : 1.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.subtract(v, vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.subtract(v, vector2.Create( 2.0, -4.0), vector2.Create(-1.0,  3.0)), { x :  3.0, y : -7.0 }, epsilon);
		assertEquals(vector2.subtract(v, vector2.Create(-2.0,  4.0), vector2.Create( 1.0, -3.0)), { x : -3.0, y :  7.0 }, epsilon);
		assertEquals(vector2.subtract(v, vector2.Create(-2.0, -4.0), vector2.Create(-1.0, -3.0)), { x : -1.0, y : -1.0 }, epsilon);
	});
});

describe('subtractAssign', () => {
	it('should set a Vector2 to represent a subtraction', () => {
		const v = vector2.Create(2.0, 4.0);
		const r = vector2.subtractAssign(v, vector2.Create( 1.0,  3.0));
		assertEquals(r, { x : 1.0, y : 1.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.subtractAssign(vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.subtractAssign(vector2.Create( 2.0, -4.0), vector2.Create(-1.0,  3.0)), { x :  3.0, y : -7.0 }, epsilon);
		assertEquals(vector2.subtractAssign(vector2.Create(-2.0,  4.0), vector2.Create( 1.0, -3.0)), { x : -3.0, y :  7.0 }, epsilon);
		assertEquals(vector2.subtractAssign(vector2.Create(-2.0, -4.0), vector2.Create(-1.0, -3.0)), { x : -1.0, y : -1.0 }, epsilon);
	});
});

describe('MultiplyScalar', () => {
	it('should return a Vector2 representing a scalar multiplication', () => {
		assertEquals(vector2.MultiplyScalar(vector2.Create(), 2), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.MultiplyScalar(vector2.Create( 2.0,  4.0),  2), { x :  4.0, y :  8.0 }, epsilon);
		assertEquals(vector2.MultiplyScalar(vector2.Create( 2.0, -4.0), -2), { x : -4.0, y :  8.0 }, epsilon);
		assertEquals(vector2.MultiplyScalar(vector2.Create(-2.0,  4.0), -2), { x :  4.0, y : -8.0 }, epsilon);
		assertEquals(vector2.MultiplyScalar(vector2.Create(-2.0, -4.0),  2), { x : -4.0, y : -8.0 }, epsilon);
	});
});

describe('multiplyScalar', () => {
	it('should set a Vector2 to represent a scalar multiplication', () => {
		const v = vector2.Create();
		const r = vector2.multiplyScalar(v, vector2.Create( 2.0, 4.0), 2);
		assertEquals(r, { x : 4.0, y : 8.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.multiplyScalar(v, vector2.Create(), 2), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.multiplyScalar(v, vector2.Create( 2.0, -4.0), -2), { x : -4.0, y :  8.0 }, epsilon);
		assertEquals(vector2.multiplyScalar(v, vector2.Create(-2.0,  4.0), -2), { x :  4.0, y : -8.0 }, epsilon);
		assertEquals(vector2.multiplyScalar(v, vector2.Create(-2.0, -4.0),  2), { x : -4.0, y : -8.0 }, epsilon);
	});
});

describe('multiplyAssignScalar', () => {
	it('should set a Vector2 to represent a scalar multiplication', () => {
		const v = vector2.Create(2.0, 4.0);
		const r = vector2.multiplyAssignScalar(v, 2.0);
		assertEquals(r, { x : 4.0, y : 8.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.multiplyAssignScalar(vector2.Create(), 2.0), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.multiplyAssignScalar(vector2.Create( 2.0, -4.0), -2.0), { x : -4.0, y :  8.0 }, epsilon);
		assertEquals(vector2.multiplyAssignScalar(vector2.Create(-2.0,  4.0), -2.0), { x :  4.0, y : -8.0 }, epsilon);
		assertEquals(vector2.multiplyAssignScalar(vector2.Create(-2.0, -4.0),  2.0), { x : -4.0, y : -8.0 }, epsilon);
	});
});

describe('MultiplyComplex', () => {
	it('should return a Vector2 representing a complex number multiplication', () => {
		assertEquals(vector2.MultiplyComplex(vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assert.deepStrictEqual(vector2.MultiplyComplex(vector2.Create(Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.MultiplyComplex(vector2.Create(0.0, Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.MultiplyComplex(vector2.Create(), vector2.Create(Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.MultiplyComplex(vector2.Create(), vector2.Create(0.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(vector2.MultiplyComplex(vector2.Create(2.0, 4.0), vector2.Create(1.0)), { x : 2.0, y : 4.0 }, epsilon);
		assertEquals(vector2.MultiplyComplex(vector2.Create(1.0, 2.0), vector2.Create(3.0, 4.0)), { x : -5.0, y : 10.0 }, epsilon);
	});
});

describe('multiplyComplex', () => {
	it('should set a Vector2 to represent a complex number multiplication', () => {
		const v = vector2.Create();

		assertEquals(vector2.multiplyComplex(v, vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assert.deepStrictEqual(vector2.multiplyComplex(v, vector2.Create(Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.multiplyComplex(v, vector2.Create(0.0, Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.multiplyComplex(v, vector2.Create(), vector2.Create(Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.multiplyComplex(v, vector2.Create(), vector2.Create(0.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(vector2.multiplyComplex(v, vector2.Create(2.0, 4.0), vector2.Create(1.0)), { x : 2.0, y : 4.0 }, epsilon);

		const r = vector2.multiplyComplex(v, vector2.Create(1.0, 2.0), vector2.Create(3.0, 4.0));

		assertEquals(r, { x : -5.0, y : 10.0}, epsilon);
		assert.strictEqual(v, r);
	});
});

describe('DivideComplex', () => {
	it('should return a Vector2 representing a complex number division', () => {
		assert.deepStrictEqual(vector2.DivideComplex(vector2.Create(), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assertEquals(vector2.DivideComplex(vector2.Create(2.0, 3.0), vector2.Create(1.0)), { x : 2.0, y : 3.0 }, epsilon);
		assertEquals(vector2.DivideComplex(vector2.Create(2.0, 3.0), vector2.Create(0.0, 1.0)), { x : 3.0, y : -2.0 }, epsilon);
		assert.deepStrictEqual(vector2.DivideComplex(vector2.Create(Number.NaN, 3.0), vector2.Create(4.0, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.DivideComplex(vector2.Create(2.0, Number.NaN), vector2.Create(4.0, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.DivideComplex(vector2.Create(2.0, 3.0), vector2.Create(Number.NaN, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.DivideComplex(vector2.Create(2.0, 3.0), vector2.Create(4.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(vector2.DivideComplex(vector2.Create(2.0, 3.0), vector2.Create(1.0, 1.0)), { x : 2.5, y : 0.5 }, epsilon);
		assertEquals(vector2.DivideComplex(vector2.Create(2.0, 3.0), vector2.Create(4.0, 5.0)), { x : 23.0 / 41.0, y : 2.0 / 41.0 }, epsilon);
	});
});

describe('divideComplex', () => {
	it('should set a Vector2 to represent a complex number division', () => {
		const v = vector2.Create();

		assert.deepStrictEqual(vector2.divideComplex(v, vector2.Create(), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assertEquals(vector2.divideComplex(v, vector2.Create(2.0, 3.0), vector2.Create(1.0)), { x : 2.0, y : 3.0 }, epsilon);
		assertEquals(vector2.divideComplex(v, vector2.Create(2.0, 3.0), vector2.Create(0.0, 1.0)), { x : 3.0, y : -2.0 }, epsilon);
		assert.deepStrictEqual(vector2.divideComplex(v, vector2.Create(Number.NaN, 3.0), vector2.Create(4.0, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.divideComplex(v, vector2.Create(2.0, Number.NaN), vector2.Create(4.0, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.divideComplex(v, vector2.Create(2.0, 3.0), vector2.Create(Number.NaN, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(vector2.divideComplex(v, vector2.Create(2.0, 3.0), vector2.Create(4.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(vector2.divideComplex(v, vector2.Create(2.0, 3.0), vector2.Create(1.0, 1.0)), { x : 2.5, y : 0.5 }, epsilon);

		const r = vector2.divideComplex(v, vector2.Create(2.0, 3.0), vector2.Create(4.0, 5.0));

		assertEquals(r, { x : 23.0 / 41.0, y : 2.0 / 41.0 }, epsilon);
		assert.strictEqual(v, r);
	});
});

describe('MultiplyMatrix2', () => {
	it('should return a Vector2 representing a Matrix2 multiplication', () => {
		const v = vector2.Create(2.0, 1.0);

		assertEquals(vector2.MultiplyMatrix2(matrix2.Identity(), v), { x : 2.0, y : 1.0 }, epsilon);
		assertEquals(vector2.MultiplyMatrix2(matrix2.Rotation(0.5 * Math.PI), v), { x : -1.0, y : 2.0 }, epsilon);
		assertEquals(vector2.MultiplyMatrix2(matrix2.Scale(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 4.0 }, epsilon);
		assertEquals(vector2.MultiplyMatrix2(matrix2.Shear(
			vector2.Create(1.0, 0.0),
			vector2.Create(-1.0, 1.0)
		), v), { x : 1.0, y : 1.0 }, epsilon);
	});
});

describe('multiplyMatrix2', () => {
	it('should set a Vector2 to represent a Matrix2 multiplication', () => {
		const v = vector2.Create(2.0, 1.0);
		const w = vector2.Create();
		const r = vector2.multiplyMatrix2(w, matrix2.Identity(), v);
		assertEquals(r, { x : 2.0, y : 1.0 }, epsilon);
		assert.strictEqual(w, r);

		assertEquals(vector2.multiplyMatrix2(w, matrix2.Rotation(0.5 * Math.PI), v), { x : -1.0, y : 2.0 }, epsilon);
		assertEquals(vector2.multiplyMatrix2(w, matrix2.Scale(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 4.0 }, epsilon);
		assertEquals(vector2.multiplyMatrix2(w, matrix2.Shear(
			vector2.Create(1.0, 0.0),
			vector2.Create(-1.0, 1.0)
		), v), { x : 1.0, y : 1.0 }, epsilon);
	});
});

describe('Multiply2x3Matrix3', () => {
	it('should return a Vector2 representing a 2x3 Matrix3 multiplication', () => {
		const v = vector2.Create(2.0, 1.0);

		assertEquals(vector2.Multiply2x3Matrix3(matrix3.Identity(), v), { x : 2.0, y : 1.0 }, epsilon);
		assertEquals(vector2.Multiply2x3Matrix3(matrix3.RotationZ(0.5 * Math.PI), v), { x : -1.0, y : 2.0 }, epsilon);
		assertEquals(vector2.Multiply2x3Matrix3(matrix3.ScaleVector2(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 4.0 }, epsilon);
		assertEquals(vector2.Multiply2x3Matrix3(matrix3.Translation(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 5.0 }, epsilon);
		assertEquals(vector2.Multiply2x3Matrix3(matrix3.ShearVector2(
			vector2.Create(1.0, 0.0),
			vector2.Create(-1.0, 1.0)
		), v), { x : 1.0, y : 1.0 }, epsilon);
	});
});

describe('multiply2x3Matrix3', () => {
	it('should set a Vector2 to represent a 2x3 Matrix3 multiplication', () => {
		const v = vector2.Create(2.0, 1.0);
		const w = vector2.Create();
		const r = vector2.multiply2x3Matrix3(w, matrix3.Identity(), v);
		assertEquals(r, { x : 2.0, y : 1.0 }, epsilon);
		assert.strictEqual(w, r);

		assertEquals(vector2.multiply2x3Matrix3(w, matrix3.RotationZ(0.5 * Math.PI), v), { x : -1.0, y : 2.0 }, epsilon);
		assertEquals(vector2.multiply2x3Matrix3(w, matrix3.ScaleVector2(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 4.0 }, epsilon);
		assertEquals(vector2.multiply2x3Matrix3(w, matrix3.Translation(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 5.0 }, epsilon);
		assertEquals(vector2.multiply2x3Matrix3(w, matrix3.ShearVector2(
			vector2.Create(1.0, 0.0),
			vector2.Create(-1.0, 1.0)
		), v), { x : 1.0, y : 1.0 }, epsilon);
	});
});

describe('MultiplyMatrix3', () => {
	it('should return a Vector2 representing a Matrix3 multiplication', () => {
		const v = vector2.Create(2.0, 1.0);

		assertEquals(vector2.MultiplyMatrix3(matrix3.Identity(), v), { x : 2.0, y : 1.0 }, epsilon);
		assertEquals(vector2.MultiplyMatrix3(matrix3.RotationZ(0.5 * Math.PI), v), { x : -1.0, y : 2.0 }, epsilon);
		assertEquals(vector2.MultiplyMatrix3(matrix3.ScaleVector2(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 4.0 }, epsilon);
		assertEquals(vector2.MultiplyMatrix3(matrix3.Translation(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 5.0 }, epsilon);
		assertEquals(vector2.MultiplyMatrix3(matrix3.ShearVector2(
			vector2.Create(1.0, 0.0),
			vector2.Create(-1.0, 1.0)
		), v), { x : 1.0, y : 1.0 }, epsilon);
	});
});

describe('multiplyMatrix3', () => {
	it('should set a Vector2 to represent a Matrix3 multiplication', () => {
		const v = vector2.Create(2.0, 1.0);
		const w = vector2.Create();
		const r = vector2.multiplyMatrix3(w, matrix3.Identity(), v);
		assertEquals(r, { x : 2.0, y : 1.0 }, epsilon);
		assert.strictEqual(w, r);

		assertEquals(vector2.multiplyMatrix3(w, matrix3.RotationZ(0.5 * Math.PI), v), { x : -1.0, y : 2.0 }, epsilon);
		assertEquals(vector2.multiplyMatrix3(w, matrix3.ScaleVector2(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 4.0 }, epsilon);
		assertEquals(vector2.multiplyMatrix3(w, matrix3.Translation(vector2.Create(2.0, 4.0)), v), { x : 4.0, y : 5.0 }, epsilon);
		assertEquals(vector2.multiplyMatrix3(w, matrix3.ShearVector2(
			vector2.Create(1.0, 0.0),
			vector2.Create(-1.0, 1.0)
		), v), { x : 1.0, y : 1.0 }, epsilon);
	});
});

describe('Lerp', () => {
	it('should return a Vector2 representing a Linear intERPolation', () => {
		assert.deepStrictEqual(vector2.Lerp(vector2.Create(Number.NaN), vector2.Create(), 1.0), { x : Number.NaN, y : 0.0 });
		assert.deepStrictEqual(vector2.Lerp(vector2.Create(0.0, Number.NaN), vector2.Create(), 1.0), { x : 0.0, y : Number.NaN });
		assert.deepStrictEqual(vector2.Lerp(vector2.Create(), vector2.Create(Number.NaN), 0.0), { x : Number.NaN, y : 0.0 });
		assert.deepStrictEqual(vector2.Lerp(vector2.Create(), vector2.Create(0.0, Number.NaN), 0.0), { x : 0.0, y : Number.NaN });
		assertEquals(vector2.Lerp(vector2.Create(), vector2.Create(), 0.0), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Lerp(vector2.Create(), vector2.Create(), 0.5), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Lerp(vector2.Create(), vector2.Create(), 1.0), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Lerp(vector2.Create(), vector2.Create(1.0, 2.0), 0.0), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Lerp(vector2.Create(), vector2.Create(1.0, 2.0), 0.5), { x : 0.5, y : 1.0 }, epsilon);
		assertEquals(vector2.Lerp(vector2.Create(), vector2.Create(1.0, 2.0), 1.0), { x : 1.0, y : 2.0 }, epsilon);
	});
});

describe('lerp', () => {
	it('should set a vector2 to represent a Linear intERPolation', () => {
		const v = vector2.Create();

		assert.deepStrictEqual(vector2.lerp(v, vector2.Create(Number.NaN), vector2.Create(), 1.0), { x : Number.NaN, y : 0.0 });
		assert.deepStrictEqual(vector2.lerp(v, vector2.Create(0.0, Number.NaN), vector2.Create(), 1.0), { x : 0.0, y : Number.NaN });
		assert.deepStrictEqual(vector2.lerp(v, vector2.Create(), vector2.Create(Number.NaN), 0.0), { x : Number.NaN, y : 0.0 });
		assert.deepStrictEqual(vector2.lerp(v, vector2.Create(), vector2.Create(0.0, Number.NaN), 0.0), { x : 0.0, y : Number.NaN });

		const r = vector2.lerp(v, vector2.Create(), vector2.Create(), 0.0)
		assertEquals(r, { x : 0.0, y : 0.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.lerp(v, vector2.Create(), vector2.Create(), 0.5), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.lerp(v, vector2.Create(), vector2.Create(), 1.0), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.lerp(v, vector2.Create(), vector2.Create(1.0, 2.0), 0.0), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.lerp(v, vector2.Create(), vector2.Create(1.0, 2.0), 0.5), { x : 0.5, y : 1.0 }, epsilon);
		assertEquals(vector2.lerp(v, vector2.Create(), vector2.Create(1.0, 2.0), 1.0), { x : 1.0, y : 2.0 }, epsilon);
	});
});

describe('lerpAssign', () => {
	it('should set a vector2 to represent a Linear intERPolation', () => {
		assert.deepStrictEqual(vector2.lerpAssign(vector2.Create(Number.NaN), vector2.Create(), 1.0), { x : Number.NaN, y : 0.0 });
		assert.deepStrictEqual(vector2.lerpAssign(vector2.Create(0.0, Number.NaN), vector2.Create(), 1.0), { x : 0.0, y : Number.NaN });
		assert.deepStrictEqual(vector2.lerpAssign(vector2.Create(), vector2.Create(Number.NaN), 0.0), { x : Number.NaN, y : 0.0 });
		assert.deepStrictEqual(vector2.lerpAssign(vector2.Create(), vector2.Create(0.0, Number.NaN), 0.0), { x : 0.0, y : Number.NaN });
		assertEquals(vector2.lerpAssign(vector2.Create(), vector2.Create(), 0.0), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.lerpAssign(vector2.Create(), vector2.Create(), 0.5), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.lerpAssign(vector2.Create(), vector2.Create(), 1.0), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.lerpAssign(vector2.Create(), vector2.Create(1.0, 2.0), 0.0), { x : 0.0, y : 0.0 }, epsilon);

		const v = vector2.Create();
		const r = vector2.lerpAssign(v, vector2.Create(1.0, 2.0), 0.5);
		assertEquals(r, { x : 0.5, y : 1.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.lerpAssign(vector2.Create(), vector2.Create(1.0, 2.0), 1.0), { x : 1.0, y : 2.0 }, epsilon);
	});
});

describe('Project', () => {
	it('should return a Vector2 representing a projection', () => {
		assert.deepStrictEqual(vector2.Project(vector2.Create(), vector2.Create(0.5, 0.5)), { x: Number.NaN, y : Number.NaN });
		assertEquals(vector2.Project(vector2.AxisY(), vector2.Create(0.5, 0.5)), { x: 0.0, y : 0.5 }, epsilon);
		assertEquals(vector2.Project(vector2.AxisX(), vector2.Create(0.5, 0.5)), { x: 0.5, y : 0.0 }, epsilon);
		assertEquals(vector2.Project(vector2.AxisY(-1.0), vector2.Create(0.5, 0.5)), { x: 0.0, y : 0.5 }, epsilon);
		assertEquals(vector2.Project(vector2.AxisX(-1.0), vector2.Create(0.5, 0.5)), { x: 0.5, y : 0.0 }, epsilon);
		assertEquals(vector2.Project(vector2.Create(1.0, 1.0), vector2.AxisY(0.5)), { x : 0.25, y : 0.25 }, epsilon);
	});
});

describe('project', () => {
	it('should set a Vector2 to represent a projection', () => {
		const v = vector2.Create();
		const r = vector2.project(v, vector2.AxisY(), vector2.Create(0.5, 0.5));
		assertEquals(r, { x: 0.0, y : 0.5 }, epsilon);
		assert.strictEqual(v, r);

		assert.deepStrictEqual(vector2.project(v, vector2.Create(), vector2.Create(0.5, 0.5)), { x: Number.NaN, y : Number.NaN });
		assertEquals(vector2.project(v, vector2.AxisX(), vector2.Create(0.5, 0.5)), { x: 0.5, y : 0.0 }, epsilon);
		assertEquals(vector2.project(v, vector2.AxisY(-1.0), vector2.Create(0.5, 0.5)), { x: 0.0, y : 0.5 }, epsilon);
		assertEquals(vector2.project(v, vector2.AxisX(-1.0), vector2.Create(0.5, 0.5)), { x: 0.5, y : 0.0 }, epsilon);
		assertEquals(vector2.project(v, vector2.Create(1.0, 1.0), vector2.AxisY(0.5)), { x : 0.25, y : 0.25 }, epsilon);
	});
});

describe('Reflect', () => {
	it('should return a Vector2 representing a reflection', () => {
		assertEquals(vector2.Reflect(vector2.AxisY(), vector2.AxisX()), vector2.AxisX(-1.0), epsilon);
		assertEquals(vector2.Reflect(vector2.AxisX(), vector2.AxisY()), vector2.AxisY(-1.0), epsilon);
		assertEquals(vector2.Reflect(vector2.AxisX(), vector2.AxisX()), vector2.AxisX(), epsilon);
		assertEquals(vector2.Reflect(vector2.AxisY(), vector2.AxisY()), vector2.AxisY(), epsilon);
		assertEquals(vector2.Reflect(vector2.Normalize(vector2.Create(1.0, 1.0)), vector2.AxisX()), vector2.AxisY(), epsilon);
		assertEquals(vector2.Reflect(vector2.Normalize(vector2.Create(1.0, 1.0)), vector2.AxisY()), vector2.AxisX(), epsilon);
	});
});

describe('reflect', () => {
	it('should assign a Vector2 representing a reflection', () => {
		const v = vector2.Create();

		assertEquals(vector2.reflect(v, vector2.AxisY(), vector2.AxisX()), vector2.AxisX(-1.0), epsilon);
		assertEquals(vector2.reflect(v, vector2.AxisX(), vector2.AxisY()), vector2.AxisY(-1.0), epsilon);
		assertEquals(vector2.reflect(v, vector2.AxisX(), vector2.AxisX()), vector2.AxisX(), epsilon);
		assertEquals(vector2.reflect(v, vector2.AxisY(), vector2.AxisY()), vector2.AxisY(), epsilon);

		const r = vector2.reflect(v, vector2.Normalize(vector2.Create(1.0, 1.0)), vector2.AxisX());
		assertEquals(r, vector2.AxisY(), epsilon);
		assert.strictEqual(v, r);

		assertEquals(vector2.reflect(v, vector2.Normalize(vector2.Create(1.0, 1.0)), vector2.AxisY()), vector2.AxisX(), epsilon);
	});
});

describe('Normalize', () => {
	it('should return a Vector2 representing a normalization', () => {
		assertEquals(vector2.Normalize(vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Normalize(vector2.AxisX()), { x : 1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Normalize(vector2.AxisX(2.0)), { x : 1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Normalize(vector2.AxisX(-2.0)), { x : -1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Normalize(vector2.AxisY()), { x : 0.0, y : 1.0 }, epsilon);
		assertEquals(vector2.Normalize(vector2.AxisY(2.0)), { x : 0.0, y : 1.0 }, epsilon);
		assertEquals(vector2.Normalize(vector2.AxisY(-2.0)), { x : 0.0, y : -1.0 }, epsilon);
		assertEquals(vector2.Normalize(vector2.Create( 1.0,  1.0)), vector2.Rotation(0.25 * Math.PI), epsilon);
		assertEquals(vector2.Normalize(vector2.Create(-1.0,  1.0)), vector2.Rotation(0.75 * Math.PI), epsilon);
		assertEquals(vector2.Normalize(vector2.Create(-1.0, -1.0)), vector2.Rotation(1.25 * Math.PI), epsilon);
		assertEquals(vector2.Normalize(vector2.Create( 1.0, -1.0)), vector2.Rotation(1.75 * Math.PI), epsilon);
	});
});

describe('normalize', () => {
	it('should set a Vector2 to represent a normalization', () => {
		const v = vector2.AxisX(2.0);
		const w = vector2.Create();
		const r = vector2.normalize(w, v);
		assertEquals(w, { x: 1.0, y : 0.0 }, epsilon);
		assert.strictEqual(w, r);

		assertEquals(vector2.normalize(w, vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.normalize(w, vector2.AxisX()), { x : 1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.normalize(w, vector2.AxisX(-2.0)), { x : -1.0, y : 0.0 }, epsilon);
		assertEquals(vector2.normalize(w, vector2.AxisY()), { x : 0.0, y : 1.0 }, epsilon);
		assertEquals(vector2.normalize(w, vector2.AxisY(2.0)), { x : 0.0, y : 1.0 }, epsilon);
		assertEquals(vector2.normalize(w, vector2.AxisY(-2.0)), { x : 0.0, y : -1.0 }, epsilon);
		assertEquals(vector2.normalize(w, vector2.Create( 1.0,  1.0)), vector2.Rotation(0.25 * Math.PI), epsilon);
		assertEquals(vector2.normalize(w, vector2.Create(-1.0,  1.0)), vector2.Rotation(0.75 * Math.PI), epsilon);
		assertEquals(vector2.normalize(w, vector2.Create(-1.0, -1.0)), vector2.Rotation(1.25 * Math.PI), epsilon);
		assertEquals(vector2.normalize(w, vector2.Create( 1.0, -1.0)), vector2.Rotation(1.75 * Math.PI), epsilon);
	});
});

describe('Conjugate', () => {
	it('should return a Vector2 representing a complex conjugate', () => {
		assert.deepStrictEqual(vector2.Conjugate(vector2.Create()), { x : 0.0, y : -0.0 });
		assert.deepStrictEqual(vector2.Conjugate(vector2.Create(Number.NaN)), { x : Number.NaN, y : -0.0 });
		assert.deepStrictEqual(vector2.Conjugate(vector2.Create(0.0, Number.NaN)), { x : 0.0, y : Number.NaN });
		assert.deepStrictEqual(vector2.Conjugate(vector2.Create(2.0, 3.0)), { x : 2.0, y : -3.0 });
	});
});

describe('conjugate', () => {
	it('should set a Vector2 to represent a complex conjugate', () => {
		const v = vector2.Create();

		assert.deepStrictEqual(vector2.conjugate(v, vector2.Create()), { x : 0.0, y : -0.0 });
		assert.deepStrictEqual(vector2.conjugate(v, vector2.Create(Number.NaN)), { x : Number.NaN, y : -0.0 });
		assert.deepStrictEqual(vector2.conjugate(v, vector2.Create(0.0, Number.NaN)), { x : 0.0, y : Number.NaN });

		const r = vector2.conjugate(v, vector2.Create(2.0, 3.0));

		assert.deepStrictEqual(r, { x : 2.0, y : -3.0 });
		assert.strictEqual(v, r);
	});
});

describe('Perpendicular', () => {
	it('should return a Vector2 representing a perpendicularization', () => {
		assertEquals(vector2.Perpendicular(vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.Perpendicular(vector2.AxisX()), { x : 0.0, y : 1.0}, epsilon);
		assertEquals(vector2.Perpendicular(vector2.AxisY()), { x : -1.0, y : 0.0}, epsilon);
		assertEquals(vector2.Perpendicular(vector2.AxisX(-2.0)), { x : 0.0, y : -2.0}, epsilon);
		assertEquals(vector2.Perpendicular(vector2.AxisY(-2.0)), { x : 2.0, y : 0.0}, epsilon);
		assertEquals(vector2.Perpendicular(vector2.Create(0.5, 1.0)), { x : -1.0, y : 0.5 }, epsilon);
	});
});

describe('perpendicular', () => {
	it('should set a Vector2 to represent a perpendicularization', () => {
		const v = vector2.AxisX();
		const w = vector2.Create();
		const r = vector2.perpendicular(w, v);
		assertEquals(w, { x : 0.0, y : 1.0 }, epsilon);
		assert.strictEqual(w, r);

		assertEquals(vector2.perpendicular(w, vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assertEquals(vector2.perpendicular(w, vector2.AxisY()), { x : -1.0, y : 0.0}, epsilon);
		assertEquals(vector2.perpendicular(w, vector2.AxisX(-2.0)), { x : 0.0, y : -2.0}, epsilon);
		assertEquals(vector2.perpendicular(w, vector2.AxisY(-2.0)), { x : 2.0, y : 0.0}, epsilon);
		assertEquals(vector2.perpendicular(w, vector2.Create(0.5, 1.0)), { x : -1.0, y : 0.5 }, epsilon);
	});
});

describe('Copy', () => {
	it('should return a Vector2 representing a copy', () => {
		const v = vector2.Create(1.0, 2.0);
		const w = vector2.Copy(v);

		assert.notStrictEqual(v, w);
		assert.deepStrictEqual(v, w);
	});
});

describe('copy', () => {
	it('should set a Vector2 to represent a copy', () => {
		const v = vector2.Create(1.0, 2.0);
		const w = vector2.Create();
		const r = vector2.copy(w, v);

		assert.notStrictEqual(v, w);
		assert.deepStrictEqual(v, w);
		assert.strictEqual(w, r);
	});
});
