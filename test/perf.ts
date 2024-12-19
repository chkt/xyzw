/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it } from 'mocha';


type test = (num:number) => void;


const X = 0;
const Y = 1;
const Z = 2;
const W = 3;


describe('read/write', () => {
	const n = 100_000_000;

	it('should measure array assignments', () => {
			let arr = [ 0.1, 1.2, 2.3, 3.4 ];

			for (let i = 0; i < n; i += 1) arr = [ arr[Y], arr[Z], arr[W], arr[X] ];
	});

	it('should measure array mutations', () => {
		const arr = [ 0.1, 1.2, 2.3, 3.4 ];

		for (let i = 0; i < n; i += 1) {
			const x = arr[X];
			const y = arr[Y];
			const z = arr[Z];
			const w = arr[W];

			arr[X] = y;
			arr[Y] = z;
			arr[Z] = w;
			arr[W] = x;
		}
	});

	it('should measure array mutations with destructured reads', () => {
		const arr = [ 0.1, 1.2, 2.3, 3.4 ];

		for (let i = 0; i < n; i += 1) {
			const [ x, y, z, w ] = arr;

			arr[X] = y;
			arr[Y] = z;
			arr[Z] = w;
			arr[W] = x;
		}
	});

	it('should measure array mutations with destructured assignments', () => {
		const arr = [ 0.1, 1.2, 2.3, 3.4 ];

		for (let i = 0; i < n; i += 1) {
			[ arr[X], arr[Y], arr[Z], arr[W] ] = [ arr[Y], arr[Z], arr[W], arr[X] ];
		}
	});

	it('should measure object assignments', () => {
		let obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

		for (let i = 0; i < n; i += 1) {
			obj = {
				x : obj.y,
				y : obj.z,
				z : obj.w,
				w : obj.x
			};
		}
	});

	it('should measure object mutations', () => {
		const obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

		for (let i = 0; i < n; i += 1) {
			const x = obj.x;
			const y = obj.y;
			const z = obj.z;
			const w = obj.w;

			obj.x = y;
			obj.y = z;
			obj.z = w;
			obj.w = x;
		}
	});

	it('should measure object mutations with destructured reads', () => {
		const obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

		for (let i = 0; i < n; i += 1) {
			const { x, y, z, w } = obj;

			obj.x = y;
			obj.y = z;
			obj.z = w;
			obj.w = x;
		}
	});

	it('should measure object mutations with reassigned destructured reads', () => {
		const obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

		for (let i = 0; i < n; i += 1) {
			const { x : xx, y : yy, z : zz, w : ww } = obj;

			obj.x = yy;
			obj.y = zz;
			obj.z = ww;
			obj.w = xx;
		}
	});

	it('should measure object mutations with destructured writes', () => {
		const obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

		for (let i = 0; i < n; i += 1) {
			[ obj.x, obj.y, obj.z, obj.w ] = [ obj.y, obj.z, obj.w, obj.x ];
		}
	});

	it('should measure new Float32Array() assignments', () => {
		let f32 = new Float32Array([ 0.1, 1.2, 2.3, 3.4 ]);

		for (let i = 0; i < n; i += 1) {
			f32 = new Float32Array([ f32[Y], f32[Z], f32[W], f32[X] ]);
		}
	});

	it('should measure Float32Array.of() assignments', () => {
		let f32 = new Float32Array([ 0.1, 1.2, 2.3, 3.4 ]);

		for (let i = 0; i < n; i += 1) {
			f32 = Float32Array.of(f32[Y], f32[Z], f32[W], f32[X]);
		}
	});

	it('should measure Float32Array[] mutations', () => {
		const f32 = new Float32Array([ 0.1, 1.2, 2.3, 3.4 ]);

		for (let i = 0; i < n; i += 1) {
			const x = f32[X];
			const y = f32[Y];
			const z = f32[Z];
			const w = f32[W];

			f32[X] = y;
			f32[Y] = z;
			f32[Z] = w;
			f32[W] = x;
		}
	});

	it('should measure Float64Array[] mutations', () => {
		const f32 = new Float64Array([ 0.1, 1.2, 2.3, 3.4 ]);

		for (let i = 0; i < n; i += 1) {
			const x = f32[X];
			const y = f32[Y];
			const z = f32[Z];
			const w = f32[W];

			f32[X] = y;
			f32[Y] = z;
			f32[Z] = w;
			f32[W] = x;
		}
	});

	it('should measure Float32Array.set() mutations', () => {
		const f32 = new Float32Array([ 0.1, 1.2, 2.3, 3.4 ]);

		for (let i = 0; i < n; i += 1) {
			const x = f32[X];
			const y = f32[Y];
			const z = f32[Z];
			const w = f32[W];

			f32.set([ y, z, w, x ]);
		}
	});
});

describe('property access', () => {
	const num = 100_000_000;

	it('should measure double direct property access', () => {
		const obj = { x : 0.1, y : 1.0 };

		for (let i = 0; i < num; i += 1) {
			obj.x = obj.x + obj.x;
			obj.y = obj.y + obj.y;
		}
	});

	it('should measure double copied property access', () => {
		const obj = { x : 0.1, y : 1.0 };

		for (let i = 0; i < num; i += 1) {
			const x = obj.x, y = obj.y;

			obj.x = x + x;
			obj.y = y + y;
		}
	});

	it('should measure double destructured property access', () => {
		const obj = { x : 0.1, y : 1.0 };

		for (let i = 0; i < num; i += 1) {
			const { x, y } = obj;

			obj.x = x + x;
			obj.y = y + y;
		}
	});

	it('should measure multiplication of copied property access', () => {
		const obj = { x : 0.1, y : 1.0 };

		for (let i = 0; i < num; i += 1) {
			const { x, y } = obj;

			obj.x = x * x;
			obj.y = y * y;
		}
	});

	it('should measure square of copied property access', () => {
		const obj = { x : 0.1, y : 1.0 };

		for (let i = 0; i < num; i += 1) {
			const { x, y } = obj;

			obj.x = x ** 2;
			obj.y = y ** 2;
		}
	});

	it('should measure square of direct property access', () => {
		const obj = { x : 0.1, y : 1.0 };

		for (let i = 0; i < num; i += 1) {
			obj.x = obj.x ** 2;
			obj.y = obj.y ** 2;
		}
	});
});

describe('math', () => {
	const num = 100_000_000;
	const sqrt = Math.sqrt;
	const pow = Math.pow;

	it('should measure the performance of Math.sqrt(x)', () => {
		let s = 1000.0;

		for (let i = 0; i < num; i += 1) s = sqrt(s) + 1000.0;
	});

	it('should measure the performance of Math.pow(x, 0.5)', () => {
		let s = 1000.0;

		for (let i = 0; i < num; i += 1) s = pow(s, 0.5) + 1000.0;
	});

	it('should measure the performance of x ** 0.5', () => {
		let s = 1000.0;

		for (let i = 0; i < num; i += 1) s = s ** 0.5 + 1000.0;
	});
});

describe('epsilon', () => {
	const num = 10_000_000;
	const e = 1e-10;

	function* elements() : Generator<{ x:number; y:number }> {
		for (let i = 0; i < num; i += 1) yield { x : Math.random(), y : Math.random() };
	}


	it('should measure n > -e && n < e comparisons', () => {
		let b = false;

		for (const obj of elements()) {
			b = b !== obj.x > -e && obj.x < e && obj.y > -e && obj.y < e;
		}
	});

	it('should measure Math.abs(n) < e comparisons', () => {
		let b = false;

		for (const obj of elements()) {
			b = b !== Math.abs(obj.x) < e && Math.abs(obj.y) < e;
		}
	});

	it('should measure abs(n) < e comparisons', () => {
		const abs = Math.abs;
		let b = false;

		for (const obj of elements()) {
			b = b !== abs(obj.x) < e && abs(obj.y) < e;
		}
	});

	it('should measure n ** 2 < e ** 2 comparisons', () => {
		let b = false;

		for (const obj of elements()) {
			const ee = e ** 2;

			b = obj.x ** 2 < ee && obj.y ** 2 < ee;
		}
	});

	it('should measure n * n < e * e comparisons', () => {
		let b = false;

		for (const { x, y } of elements()) {
			const ee = e * e;

			b = b !== x * x < ee && y * y < ee;
		}
	});
});

describe('branching', () => {
	const minfn = Math.min;
	const num = 100_000_000;
	let a = 1.0;

	function umin(n:number, min:number) : number {
		return n < min ? n : min;
	}

	function bindableUmin(min:number, n:number) : number {
		return n < min ? n : min;
	}

	const amin = (n:number, min:number) : number => n < min ? n : min;
	const bmin = bindableUmin.bind(null, 1.0);
	const pmin = (n:number, min:number) : number => n * Number(n < min) + Number(n >= min);


	it('should measure ternary conditions', () => {
		for (let i = 0; i < num; i += 1) {
			a = -(a < 1.0 ? a : 1.0) * 1.1;
		}
	});

	it('should measure conditional products with type coercion', () => {
		for (let i = 0; i < num; i += 1) {
			a = -(a * Number(a < 1.0) + Number(a >= 1.0)) * 1.1;
		}
	});

	it('should measure conditional products w/o type coercion', () => {
		for (let i = 0; i < num; i += 1) {
			a = -(a * ((a < 1.0) as unknown as number) + ((a >= 1.0) as unknown as number)) * 1.1;
		}
	});

	it('should measure jsapi function', () => {
		for (let i = 0; i < num; i += 1) {
			a = -minfn(a, 1.0) * 1.1;
		}
	});

	it('should measure ternary conditions in js function', () => {
		for (let i = 0; i < num; i += 1) {
			a = -umin(a, 1.0) * 1.1;
		}
	});

	it('should measure ternary conditions in arrow function', () => {
		for (let i = 0; i < num; i += 1) {
			a = -amin(a, 1.0) * 1.1;
		}
	});

	it('should measure ternary conditions in bound function', () => {
		for (let i = 0; i < num; i += 1) {
			a = -bmin(a) * 1.1;
		}
	});

	it('should measure conditional product in arrow function', () => {
		for (let i = 0; i < num; i += 1) {
			a = -pmin(a, 1.0) * 1.1;
		}
	});
});

describe('looping', () => {
	const len = 100;
	const num = 1_000_000;

	function* gen(end:number) : Generator<number> {
		for (let i = 0; i < end; i += 1) yield i;
	}

	function iterable(end:number) : Iterable<number> {
		let i = 0;

		return {
			[Symbol.iterator] : () => ({
				// eslint-disable-next-line no-plusplus
				next : () => ({ value : i, done : ++i < end })
			})
		};
	}

	function factory(n:number) : number {
		return n;
	}

	it('should measure for-i loops', () => {
		for (let i = 0; i < num; i += 1) {
			const arr:number[] = [];
			let a = 0.0;

			for (let j = 0; j < len; j += 1) arr.push(j);

			for (let j = 0; j < len; j += 1) a += arr[j];
		}
	});

	it('should measure for-of loops with arrays', () => {
		for (let i = 0; i < num; i += 1) {
			const arr:number[] = [];
			let a = 0.0;

			for (let j = 0; j < len; j += 1) arr.push(j);

			for (const n of arr) a += n;
		}
	});

	it('should measure for-of loops with factories', () => {
		for (let i = 0; i < num; i += 1) {
			const arr:number[] = [];
			let a = 0.0;

			for (let j = 0; j < len; j += 1) arr.push(factory(i));

			for (const n of arr) a += n;
		}
	});

	it('should measure for-of loops with iterables', () => {
		let a = 0.0;

		for (let i = 0; i < num; i += 1) {
			for (const n of iterable(len)) a += n;
		}
	});

	it('should measure for-of loops with generators', () => {
		let a = 0.0;

		for (let i = 0; i < num; i += 1) {
			for (const n of gen(len)) a += n;
		}
	});
});

describe('transforms', () => {
	const num = 100_000_000;
	const index = 32;
	const obj = { x : 1.0, y : 2.0, z : 3.0, w : 4.0 };
	const f3:Float32Array = new Float32Array(4);
	const f100 = new Float32Array(100);

	it('should measure simple Float*Array reads/writes', () => {
		for (let i = 0; i < num; i += 1) {
			f3[0] = obj.y;
			f3[1] = obj.z;
			f3[2] = obj.x;

			obj.x = f3[0];
			obj.y = f3[1];
			obj.z = f3[2];
		}
	});

	it('should measure indexed Float*Array reads/writes', () => {
		for (let i = 0; i < num; i += 1) {
			f100[index] = obj.y;
			f100[index + 1] = obj.z;
			f100[index + 2] = obj.x;

			obj.x = f100[index];
			obj.y = f100[index + 1];
			obj.z = f100[index + 2];
		}
	});
});
