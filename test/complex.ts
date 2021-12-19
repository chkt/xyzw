import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as vector2 from '../source/vector2';
import * as complex from '../source/complex';


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


describe('MultiplyComplex', () => {
	it('should return a Vector2 representing a complex number multiplication', () => {
		assertEquals(complex.Multiply(vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assert.deepStrictEqual(complex.Multiply(vector2.Create(Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.Multiply(vector2.Create(0.0, Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.Multiply(vector2.Create(), vector2.Create(Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.Multiply(vector2.Create(), vector2.Create(0.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.Multiply(vector2.Create(2.0, 4.0), vector2.Create(1.0)), { x : 2.0, y : 4.0 }, epsilon);
		assertEquals(complex.Multiply(vector2.Create(1.0, 2.0), vector2.Create(3.0, 4.0)), { x : -5.0, y : 10.0 }, epsilon);
	});
});

describe('multiplyComplex', () => {
	it('should set a Vector2 to represent a complex number multiplication', () => {
		const v = vector2.Create();

		assertEquals(complex.multiply(v, vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assert.deepStrictEqual(complex.multiply(v, vector2.Create(Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.multiply(v, vector2.Create(0.0, Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.multiply(v, vector2.Create(), vector2.Create(Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.multiply(v, vector2.Create(), vector2.Create(0.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.multiply(v, vector2.Create(2.0, 4.0), vector2.Create(1.0)), { x : 2.0, y : 4.0 }, epsilon);

		const r = complex.multiply(v, vector2.Create(1.0, 2.0), vector2.Create(3.0, 4.0));

		assertEquals(r, { x : -5.0, y : 10.0}, epsilon);
		assert.strictEqual(v, r);
	});
});

describe('DivideComplex', () => {
	it('should return a Vector2 representing a complex number division', () => {
		assert.deepStrictEqual(complex.Divide(vector2.Create(), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.Divide(vector2.Create(2.0, 3.0), vector2.Create(1.0)), { x : 2.0, y : 3.0 }, epsilon);
		assertEquals(complex.Divide(vector2.Create(2.0, 3.0), vector2.Create(0.0, 1.0)), { x : 3.0, y : -2.0 }, epsilon);
		assert.deepStrictEqual(complex.Divide(vector2.Create(Number.NaN, 3.0), vector2.Create(4.0, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.Divide(vector2.Create(2.0, Number.NaN), vector2.Create(4.0, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.Divide(vector2.Create(2.0, 3.0), vector2.Create(Number.NaN, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.Divide(vector2.Create(2.0, 3.0), vector2.Create(4.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.Divide(vector2.Create(2.0, 3.0), vector2.Create(1.0, 1.0)), { x : 2.5, y : 0.5 }, epsilon);
		assertEquals(complex.Divide(vector2.Create(2.0, 3.0), vector2.Create(4.0, 5.0)), { x : 23.0 / 41.0, y : 2.0 / 41.0 }, epsilon);
	});
});

describe('divideComplex', () => {
	it('should set a Vector2 to represent a complex number division', () => {
		const v = vector2.Create();

		assert.deepStrictEqual(complex.divide(v, vector2.Create(), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.divide(v, vector2.Create(2.0, 3.0), vector2.Create(1.0)), { x : 2.0, y : 3.0 }, epsilon);
		assertEquals(complex.divide(v, vector2.Create(2.0, 3.0), vector2.Create(0.0, 1.0)), { x : 3.0, y : -2.0 }, epsilon);
		assert.deepStrictEqual(complex.divide(v, vector2.Create(Number.NaN, 3.0), vector2.Create(4.0, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.divide(v, vector2.Create(2.0, Number.NaN), vector2.Create(4.0, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.divide(v, vector2.Create(2.0, 3.0), vector2.Create(Number.NaN, 5.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.divide(v, vector2.Create(2.0, 3.0), vector2.Create(4.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.divide(v, vector2.Create(2.0, 3.0), vector2.Create(1.0, 1.0)), { x : 2.5, y : 0.5 }, epsilon);

		const r = complex.divide(v, vector2.Create(2.0, 3.0), vector2.Create(4.0, 5.0));

		assertEquals(r, { x : 23.0 / 41.0, y : 2.0 / 41.0 }, epsilon);
		assert.strictEqual(v, r);
	});
});

describe('Conjugate', () => {
	it('should return a Vector2 representing a complex conjugate', () => {
		assert.deepStrictEqual(complex.Conjugate(vector2.Create()), { x : 0.0, y : -0.0 });
		assert.deepStrictEqual(complex.Conjugate(vector2.Create(Number.NaN)), { x : Number.NaN, y : -0.0 });
		assert.deepStrictEqual(complex.Conjugate(vector2.Create(0.0, Number.NaN)), { x : 0.0, y : Number.NaN });
		assert.deepStrictEqual(complex.Conjugate(vector2.Create(2.0, 3.0)), { x : 2.0, y : -3.0 });
	});
});

describe('conjugate', () => {
	it('should set a Vector2 to represent a complex conjugate', () => {
		const v = vector2.Create();

		assert.deepStrictEqual(complex.conjugate(v, vector2.Create()), { x : 0.0, y : -0.0 });
		assert.deepStrictEqual(complex.conjugate(v, vector2.Create(Number.NaN)), { x : Number.NaN, y : -0.0 });
		assert.deepStrictEqual(complex.conjugate(v, vector2.Create(0.0, Number.NaN)), { x : 0.0, y : Number.NaN });

		const r = complex.conjugate(v, vector2.Create(2.0, 3.0));

		assert.deepStrictEqual(r, { x : 2.0, y : -3.0 });
		assert.strictEqual(v, r);
	});
});
