import * as assert from 'assert';
import { describe, it } from 'mocha';
import * as vector2 from '../source/vector2';
import * as complex from '../source/complex';
import { assertEqualsVec2 as assertEquals } from './assert/assert';


const epsilon = 1e-10;


function assertMultiple(v:readonly vector2.Vector2[], w:readonly vector2.Vector2[], e:number, message?:string) : void {
	if (v.length !== w.length) {
		throw new assert.AssertionError({
			message,
			actual : v,
			expected : w,
			operator : '!=='
		});
	}

	for (let i = 0, l = v.length; i < l; i += 1) {
		const vi = v[i], wi = w[i];
		const x = wi.x - vi.x;
		const y = wi.y - vi.y;

		if (
			isNaN(vi.x) !== isNaN(wi.x) || x < -e || x > e ||
			isNaN(vi.y) !== isNaN(wi.y) || y < -e || y > e
		) {
			throw new assert.AssertionError({
				message,
				actual : v,
				expected : w,
				operator : `!==[${ i }:${ e }]`
			});
		}
	}
}


describe('argument', () => {
	const TURN = Math.PI * 2.0;

	it('should return the value of arg(z)', () => {
		assert.strictEqual(complex.argument(vector2.Create()), 0.0);
		assert.strictEqual(complex.argument(vector2.Create(Number.NaN)), Number.NaN);
		assert.strictEqual(complex.argument(vector2.Create(0.0, Number.NaN)), Number.NaN);
		assert.strictEqual(complex.argument(vector2.Create(1.0, 0.0)), 0.0);
		assert.strictEqual(complex.argument(vector2.Create(0.0, 1.0)), TURN * 0.25);
		assert.strictEqual(complex.argument(vector2.Create(-1.0, 0.0)), TURN * 0.5);
		assert.strictEqual(complex.argument(vector2.Create(-1.0, -0.0)), TURN * -0.5);
		assert.strictEqual(complex.argument(vector2.Create(0.0, -1.0)), TURN * -0.25);
	});
});

describe('Multiply', () => {
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

describe('multiply', () => {
	it('should set a Vector2 to represent a complex number multiplication', () => {
		const v = vector2.Create();

		assertEquals(complex.multiply(v, vector2.Create(), vector2.Create()), { x : 0.0, y : 0.0 }, epsilon);
		assert.deepStrictEqual(complex.multiply(v, vector2.Create(Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.multiply(v, vector2.Create(0.0, Number.NaN), vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.multiply(v, vector2.Create(), vector2.Create(Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.multiply(v, vector2.Create(), vector2.Create(0.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.multiply(v, vector2.Create(2.0, 4.0), vector2.Create(1.0)), { x : 2.0, y : 4.0 }, epsilon);

		const r = complex.multiply(v, vector2.Create(1.0, 2.0), vector2.Create(3.0, 4.0));

		assertEquals(r, { x : -5.0, y : 10.0 }, epsilon);
		assert.strictEqual(v, r);
	});
});

describe('Divide', () => {
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

describe('divide', () => {
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

describe('Power', () => {
	it('should return Vector2s representing the multivalued result of exponentiation with a real number', () => {
		assertMultiple(complex.Power(vector2.Create(), 1.0), [{ x : 0.0, y : 0.0 }], epsilon, 'n¹ ≠ n');
		assertMultiple(complex.Power(vector2.Create(Number.NaN), 1.0), [{ x : Number.NaN, y : Number.NaN }], epsilon);
		assertMultiple(complex.Power(vector2.Create(0.0, Number.NaN), 1.0), [{ x : Number.NaN, y : Number.NaN }], epsilon);
		assertMultiple(complex.Power(vector2.Create(2.0), 0.0), [{ x : 1.0, y : 0.0 }], epsilon, 'n⁰ ≠ 1');
		assertMultiple(complex.Power(vector2.Create(2.0), 1.0), [{ x : 2.0, y : 0.0 }], epsilon, 'n¹ ≠ n');
		assertMultiple(complex.Power(vector2.Create(2.0), 2.0), [{ x : 4.0, y : 0.0 }], epsilon, 'n² ≠ nn');
		assertMultiple(complex.Power(vector2.Create(4.0), 0.5), [{ x : 2.0, y : 0.0 }, { x : -2.0, y : 0.0 }], epsilon, '(±²√a)² ≠ a');
		assertMultiple(complex.Power(vector2.Create(2.0), -1.0), [{ x : 0.5, y : 0.0 }], epsilon, 'a⁻¹ ≠ 1/a');
		assertMultiple(complex.Power(vector2.Create(2.0), -2.0), [{ x : 0.25, y : 0.0 }], epsilon, 'a⁻² ≠ 1/a²');
		assertMultiple(complex.Power(vector2.Create(0.0, 2.0), 0.0), [{ x : 1.0, y : 0.0 }], epsilon, '(bi)⁰ ≠ 1');
		assertMultiple(complex.Power(vector2.Create(0.0, 2.0), 1.0), [{ x : 0.0, y : 2.0 }], epsilon, '(bi)¹ ≠ bi');
		assertMultiple(complex.Power(vector2.Create(0.0, 2.0), 2.0), [{ x : -4.0, y : 0.0 }], epsilon, '(bi)² ≠ -b²');
		assertMultiple(
			complex.Power(vector2.Create(0.0, 2.0), 0.5),
			[{ x : 1.0, y : 1.0 }, { x : -1.0, y : -1.0 }],
			epsilon,
			'²√(bi) ≠ ±²√b( cos(½π/2) + i sin(½π/2) )'
		);
		assertMultiple(
			complex.Power(vector2.Create(0.0, 2.0), -1.0),
			[ complex.Divide(vector2.Create(1.0), vector2.Create(0.0, 2.0)) ],
			epsilon,
			'(ni)⁻¹ ≠ 1/(ni)'
		);
		assertMultiple(
			complex.Power(vector2.Create(0.0, 2.0), -2.0),
			[{ x : -0.25, y : 0.0 }],
			epsilon,
			'(ni)⁻² ≠ 1/(ni)²'
		);
		assertMultiple(
			complex.Power(complex.Power(vector2.Create(2.0, 3.0), 2.0)[0], 0.5),
			[{ x : 2.0, y : 3.0 }, { x : -2.0, y : -3.0 }],
			epsilon,
			'(²√(a+bi))² ≠ a+bi'
		);
		assertMultiple(
			complex.Power(complex.Power(vector2.Create(2.0, 3.0), -1.0)[0], -1.0),
			[{ x : 2.0, y : 3.0 }],
			epsilon,
			'((a+bi)⁻¹)⁻¹ ≠ a+bi'
		);
		assertMultiple(
			complex.Power(vector2.Create(2.0, 3.0), -2.0),
			[ complex.Divide(vector2.Create(1.0), complex.Power(vector2.Create(2.0, 3.0), 2.0)[0]) ],
			epsilon,
			'(a+bi)⁻² = 1/(a+bi)² ≠ 1/(a² - b² + 2abi)'
		);
		assertMultiple(
			complex.Power(vector2.Create(2.0, 3.0), 2.0),
			[ complex.Multiply(vector2.Create(2.0, 3.0), vector2.Create(2.0, 3.0)) ],
			epsilon,
			'(a+bi)² ≠ (a+bi)(a+bi)'
		);
		assert.strictEqual(complex.Power(vector2.Create(2.0, 3.0), 1.01).length, 1);
		assert.strictEqual(complex.Power(vector2.Create(2.0, 3.0), 1.0).length, 1);
		assert.strictEqual(complex.Power(vector2.Create(2.0, 3.0), 0.99).length, 2);
	});
});

describe('power', () => {
	it('should set Vector2s to represent the multivalued result of exponentiation with a real number', () => {
		const v = [ vector2.Create() ];
		const vv = [ vector2.Create(), vector2.Create() ];

		assertMultiple(complex.power(v, vector2.Create(), 1.0), [{ x : 0.0, y : 0.0 }], epsilon, 'n¹ ≠ n');
		assertMultiple(complex.power(v, vector2.Create(Number.NaN), 1.0), [{ x : Number.NaN, y : Number.NaN }], epsilon);
		assertMultiple(complex.power(v, vector2.Create(0.0, Number.NaN), 1.0), [{ x : Number.NaN, y : Number.NaN }], epsilon);

		const r = complex.power(v, vector2.Create(2.0), 0.0);

		assertMultiple(r, [{ x : 1.0, y : 0.0 }], epsilon, 'n⁰ ≠ 1');
		assert.deepStrictEqual(v, r);

		assertMultiple(complex.power(v, vector2.Create(2.0), 1.0), [{ x : 2.0, y : 0.0 }], epsilon, 'n¹ ≠ n');
		assertMultiple(complex.power(v, vector2.Create(2.0), 2.0), [{ x : 4.0, y : 0.0 }], epsilon, 'n² ≠ nn');
		assertMultiple(complex.power(v, vector2.Create(4.0), 0.5), [{ x : 2.0, y : 0.0 }], epsilon, '(±²√a)² ≠ a');
		assertMultiple(complex.power(vv, vector2.Create(4.0), 0.5), [{ x : 2.0, y : 0.0 }, { x : -2.0, y : 0.0 }], epsilon, '(±²√a)² ≠ a');
		assertMultiple(complex.power(v, vector2.Create(2.0), -1.0), [{ x : 0.5, y : 0.0 }], epsilon, 'a⁻¹ ≠ 1/a');
		assertMultiple(complex.power(v, vector2.Create(2.0), -2.0), [{ x : 0.25, y : 0.0 }], epsilon, 'a⁻² ≠ 1/a²');
		assertMultiple(complex.power(v, vector2.Create(0.0, 2.0), 0.0), [{ x : 1.0, y : 0.0 }], epsilon, '(bi)⁰ ≠ 1');
		assertMultiple(complex.power(v, vector2.Create(0.0, 2.0), 1.0), [{ x : 0.0, y : 2.0 }], epsilon, '(bi)¹ ≠ bi');
		assertMultiple(complex.power(v, vector2.Create(0.0, 2.0), 2.0), [{ x : -4.0, y : 0.0 }], epsilon, '(bi)² ≠ -b²');
		assertMultiple(
			complex.power(vv, vector2.Create(0.0, 2.0), 0.5),
			[{ x : 1.0, y : 1.0 }, { x : -1.0, y : -1.0 }],
			epsilon,
			'²√(bi) ≠ ±²√b( cos(½π/2) + i sin(½π/2) )'
		);
		assertMultiple(
			complex.power(v, vector2.Create(0.0, 2.0), -1.0),
			[ complex.Divide(vector2.Create(1.0), vector2.Create(0.0, 2.0)) ],
			epsilon,
			'(ni)⁻¹ ≠ 1/(ni)'
		);
		assertMultiple(
			complex.power(v, vector2.Create(0.0, 2.0), -2.0),
			[{ x : -0.25, y : 0.0 }],
			epsilon,
			'(ni)⁻² ≠ 1/(ni)²'
		);
		assertMultiple(
			complex.power(vv, complex.power(vv, vector2.Create(2.0, 3.0), 2.0)[0], 0.5),
			[{ x : 2.0, y : 3.0 }, { x : -2.0, y : -3.0 }],
			epsilon,
			'(²√(a+bi))² ≠ a+bi'
		);
		assertMultiple(
			complex.power(v, complex.Power(vector2.Create(2.0, 3.0), -1.0)[0], -1.0),
			[{ x : 2.0, y : 3.0 }],
			epsilon,
			'((a+bi)⁻¹)⁻¹ ≠ a+bi'
		);
		assertMultiple(
			complex.power(v, vector2.Create(2.0, 3.0), -2.0),
			[ complex.Divide(vector2.Create(1.0), complex.Power(vector2.Create(2.0, 3.0), 2.0)[0]) ],
			epsilon,
			'(a+bi)⁻² = 1/(a+bi)² ≠ 1/(a² - b² + 2abi)'
		);
		assertMultiple(
			complex.power(v, vector2.Create(2.0, 3.0), 2.0),
			[ complex.Multiply(vector2.Create(2.0, 3.0), vector2.Create(2.0, 3.0)) ],
			epsilon,
			'(a+bi)² ≠ (a+bi)(a+bi)'
		);
		assert.strictEqual(complex
			.power([ vector2.Create(Number.NaN), vector2.Create(Number.NaN) ], vector2.Create(2.0, 3.0), 1.01)
			.reduce((n, value) => n + Number(!Number.isNaN(value.x)), 0), 1);
		assert.strictEqual(complex
			.power([ vector2.Create(Number.NaN), vector2.Create(Number.NaN) ], vector2.Create(2.0, 3.0), 1.0)
			.reduce((n, value) => n + Number(!Number.isNaN(value.x)), 0), 1);
		assert.strictEqual(complex
			.power([ vector2.Create(Number.NaN), vector2.Create(Number.NaN) ], vector2.Create(2.0, 3.0), 0.99)
			.reduce((n, value) => n + Number(!Number.isNaN(value.x)), 0), 2);
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

describe('Inverse', () => {
	it('should return a Vector2 representing a complex multiplicative inverse', () => {
		assert.deepStrictEqual(complex.Inverse(vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.Inverse(vector2.Create(Number.NaN, 1.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.Inverse(vector2.Create(1.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.Inverse(vector2.Create(1.0)), { x : 1.0, y : 0.0 }, epsilon);
		assertEquals(complex.Inverse(vector2.Create(0.0, 1.0)), { x : 0.0, y : -1.0 }, epsilon);
		assertEquals(complex.Inverse(vector2.Create(-1.0)), { x : -1.0, y : 0.0 }, epsilon);
		assertEquals(complex.Inverse(vector2.Create(0.0, -1.0)), { x : 0.0, y : 1.0 }, epsilon);
		assertEquals(complex.Inverse(vector2.Create(2.0)), { x : 0.5, y : 0.0 }, epsilon);
		assertEquals(complex.Inverse(vector2.Create(0.5)), { x : 2.0, y : 0.0 }, epsilon);
		assertEquals(complex.Inverse(complex.Inverse(vector2.Create(2.0, 3.0))), { x : 2.0, y : 3.0 }, epsilon);

		assertEquals(
			complex.Multiply(vector2.Create(1.0, 2.0), complex.Inverse(vector2.Create(3.0, 4.0))),
			complex.Divide(vector2.Create(1.0, 2.0), vector2.Create(3.0, 4.0)),
			epsilon
		);
	});
});

describe('inverse', () => {
	it('should set a Vector2 to represent a complex multiplicative inverse', () => {
		const v = vector2.Create();

		assert.deepStrictEqual(complex.inverse(v, vector2.Create()), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.inverse(v, vector2.Create(Number.NaN, 1.0)), { x : Number.NaN, y : Number.NaN });
		assert.deepStrictEqual(complex.inverse(v, vector2.Create(1.0, Number.NaN)), { x : Number.NaN, y : Number.NaN });
		assertEquals(complex.inverse(v, vector2.Create(1.0)), { x : 1.0, y : 0.0 }, epsilon);
		assertEquals(complex.inverse(v, vector2.Create(0.0, 1.0)), { x : 0.0, y : -1.0 }, epsilon);
		assertEquals(complex.inverse(v, vector2.Create(-1.0)), { x : -1.0, y : 0.0 }, epsilon);
		assertEquals(complex.inverse(v, vector2.Create(0.0, -1.0)), { x : 0.0, y : 1.0 }, epsilon);
		assertEquals(complex.inverse(v, vector2.Create(2.0)), { x : 0.5, y : 0.0 }, epsilon);
		assertEquals(complex.inverse(v, vector2.Create(0.5)), { x : 2.0, y : 0.0 }, epsilon);

		const r = complex.inverse(v, complex.Inverse(vector2.Create(2.0, 3.0)));

		assertEquals(r, { x : 2.0, y : 3.0 }, epsilon);
		assert.strictEqual(v, r);

		assertEquals(
			complex.Multiply(vector2.Create(1.0, 2.0), complex.Inverse(vector2.Create(3.0, 4.0))),
			complex.Divide(vector2.Create(1.0, 2.0), vector2.Create(3.0, 4.0)),
			epsilon
		);
	});
});
