import * as assert from 'assert';
import { describe, it } from 'mocha';


type test = (num:number) => void;


const X = 0;
const Y = 1;
const Z = 2;
const W = 3;


function test(name:string, fn:test, num:number) : void {
	const now = Date.now();

	fn(num);

	console.log(`${ num }x ${ name }: ${ Date.now() - now }ms`);
};

describe('read/write', () => {
	const num = 100_000_000;

	it('should measure array assignments', () => {
		test('assignArray', num => {
			let arr = [ 0.1, 1.2, 2.3, 3.4 ];

			for (let i = 0; i < num; i += 1) {
				arr = [ arr[Y], arr[Z], arr[W], arr[X] ];
			}
		}, num);
	});

	it('should measure array mutations', () => {
		test('mutateArray', num => {
			const arr = [ 0.1, 1.2, 2.3, 3.4 ];

			for (let i = 0; i < num; i += 1) {
				const x = arr[X];
				const y = arr[Y];
				const z = arr[Z];
				const w = arr[W];

				arr[X] = y;
				arr[Y] = z;
				arr[Z] = w;
				arr[W] = x;
			}
		}, num);
	});

	it('should measure array mutations with destructured reads', () => {
		const arr = [ 0.1, 1.2, 2.3, 3.4 ];

		for (let i = 0; i < num; i += 1) {
			const [x, y, z, w] = arr;

			arr[X] = y;
			arr[Y] = z;
			arr[Z] = w;
			arr[W] = x;
		}
	});

	it('should measure object assignments', () => {
		test('assignObject', () => {
			let obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

			for (let i = 0; i < num; i += 1) {
				obj = {
					x : obj.y,
					y : obj.z,
					z : obj.w,
					w : obj.x
				};
			}
		}, num);
	});

	it('should measure object mutations', () => {
		test('mutateObject', () => {
			const obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

			for (let i = 0; i < num; i += 1) {
				const x = obj.x;
				const y = obj.y;
				const z = obj.z;
				const w = obj.w;

				obj.x = y;
				obj.y = z;
				obj.z = w;
				obj.w = x;
			}
		}, num);
	});

	it('should measure object mutations with destructured reads', () => {
		test('mutateObjectDestructuredRead', () => {
			const obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

			for (let i = 0; i < num; i += 1) {
				const {x, y, z, w} = obj;

				obj.x = y;
				obj.y = z;
				obj.z = w;
				obj.w = x;
			}
		}, num);
	});

	it('should measure new Float32Array() assignments', () => {
		test('assignFloat32New', () => {
			let f32 = new Float32Array([0.1, 1.2, 2.3, 3.4]);

			for (let i = 0; i < num; i += 1) {
				f32 = new Float32Array([f32[Y], f32[Z], f32[W], f32[X]]);
			}
		}, num);
	});

	it('should measure Float32Array.of() assignments', () => {
		test('assignFloat32Of', () => {
			let f32 = new Float32Array([0.1, 1.2, 2.3, 3.4]);

			for (let i = 0; i < num; i += 1) {
				f32 = Float32Array.of(f32[Y], f32[Z], f32[W], f32[X]);
			}
		}, num);
	});

	it('should measure Float32Array[] mutations', () => {
		test('mutateFloat32', () => {
			const f32 = new Float32Array([0.1, 1.2, 2.3, 3.4]);

			for (let i = 0; i < num; i += 1) {
				const x = f32[X];
				const y = f32[Y];
				const z = f32[Z];
				const w = f32[W];

				f32[X] = y;
				f32[Y] = z;
				f32[Z] = w;
				f32[W] = x;
			}
		}, num);
	});

	it('should measure Float64Array[] mutations', () => {
		test('mutateFloat64', () => {
			const f32 = new Float64Array([0.1, 1.2, 2.3, 3.4]);

			for (let i = 0; i < num; i += 1) {
				const x = f32[X];
				const y = f32[Y];
				const z = f32[Z];
				const w = f32[W];

				f32[X] = y;
				f32[Y] = z;
				f32[Z] = w;
				f32[W] = x;
			}
		}, num);
	});

	it('should measure Float32Array.set() mutations', () => {
		test('mutateFloat32Set', () => {
			const f32 = new Float32Array([0.1, 1.2, 2.3, 3.4]);

			for (let i = 0; i < num; i += 1) {
				const x = f32[X];
				const y = f32[Y];
				const z = f32[Z];
				const w = f32[W];

				f32.set([y, z, w, x]);
			}
		}, num);
	});
});

describe('property access', () => {
	const num = 100_000_000;

	it('should measure double direct property access', () => {
		const obj = { x: 0.1, y: 1.0 };

		for (let i = 0; i < num; i += 1) {
			obj.x = obj.x + obj.x;
			obj.y = obj.y + obj.y;
		}
	});

	it('should measure double copied property access', () => {
		const obj = { x: 0.1, y: 1.0 };
		const x = obj.x, y = obj.y;

		for (let i = 0; i < num; i += 1) {
			obj.x = x + x;
			obj.y = y + y;
		}
	});

	it('should measure double destructured property access', () => {
		const obj = { x: 0.1, y: 1.0 };
		const {x, y} = obj;

		for (let i = 0; i < num; i += 1) {
			obj.x = x + x;
			obj.y = y + y;
		}
	});

	it('should measure multiplication of copied property access', () => {
		const obj = { x : 0.1, y: 1.0 };

		for (let i = 0; i < num; i += 1) {
			const {x, y} = obj;

			obj.x = x * x;
			obj.y = y * y;
		}
	});

	it('should measure square of copied property access', () => {
		const obj = { x : 0.1, y: 1.0 };

		for (let i = 0; i < num; i += 1) {
			const {x, y} = obj;

			obj.x = x ** 2;
			obj.y = y ** 2;
		}
	});

	it('should measure square of direct property access', () => {
		const obj = { x : 0.1, y: 1.0 };

		for (let i = 0; i < num; i += 1) {
			obj.x = obj.x ** 2;
			obj.y = obj.y ** 2;
		}
	});
});

describe('epsilon', () => {
	const num = 100_000_000;
	const e = 1e-10;

	it('should measure n > -e && n < e comparisons', () => {
		const obj = { x : 0.1, y : 1.0 };
		let b:boolean;

		for (let i = 0; i < num; i += 1) {
			b = obj.x > -e && obj.x < e && obj.y > -e && obj.y < e;
		}
	});

	it('should measure Math.abs(n) < e comparisons', () => {
		const obj = { x : 0.1, y : 1.0 };
		let b:boolean;

		for (let i = 0; i < num; i += 1) {
			b = Math.abs(obj.x) < e && Math.abs(obj.y) < e;
		}
	});

	it('should measure abs(n) < e comparisons', () => {
		const abs = Math.abs;
		const obj = { x : 0.1, y : 1.0 };
		let b:boolean;

		for (let i = 0; i < num; i += 1) {
			b = abs(obj.x) < e && abs(obj.y) < e;
		}
	});
});