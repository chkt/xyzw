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
}

describe('read/write', () => {
	const n = 100_000_000;

	it('should measure array assignments', () => {
		test('assignArray', num => {
			let arr = [ 0.1, 1.2, 2.3, 3.4 ];

			for (let i = 0; i < num; i += 1) {
				arr = [ arr[Y], arr[Z], arr[W], arr[X] ];
			}
		}, n);
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
		}, n);
	});

	it('should measure array mutations with destructured reads', () => {
		const arr = [ 0.1, 1.2, 2.3, 3.4 ];

		for (let i = 0; i < n; i += 1) {
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

			for (let i = 0; i < n; i += 1) {
				obj = {
					x : obj.y,
					y : obj.z,
					z : obj.w,
					w : obj.x
				};
			}
		}, n);
	});

	it('should measure object mutations', () => {
		test('mutateObject', () => {
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
		}, n);
	});

	it('should measure object mutations with destructured reads', () => {
		test('mutateObjectDestructuredRead', () => {
			const obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

			for (let i = 0; i < n; i += 1) {
				const {x, y, z, w} = obj;

				obj.x = y;
				obj.y = z;
				obj.z = w;
				obj.w = x;
			}
		}, n);
	});

	it('should measure object mutations with reassigned destructured reads', () => {
		test('mutateObjectDestructuredRead', () => {
			const obj = { x : 0.1, y : 1.2, z : 2.3, w : 3.4 };

			for (let i = 0; i < n; i += 1) {
				const {x : xx, y : yy, z : zz, w : ww} = obj;

				obj.x = yy;
				obj.y = zz;
				obj.z = ww;
				obj.w = xx;
			}
		}, n);
	});

	it('should measure new Float32Array() assignments', () => {
		test('assignFloat32New', () => {
			let f32 = new Float32Array([0.1, 1.2, 2.3, 3.4]);

			for (let i = 0; i < n; i += 1) {
				f32 = new Float32Array([f32[Y], f32[Z], f32[W], f32[X]]);
			}
		}, n);
	});

	it('should measure Float32Array.of() assignments', () => {
		test('assignFloat32Of', () => {
			let f32 = new Float32Array([0.1, 1.2, 2.3, 3.4]);

			for (let i = 0; i < n; i += 1) {
				f32 = Float32Array.of(f32[Y], f32[Z], f32[W], f32[X]);
			}
		}, n);
	});

	it('should measure Float32Array[] mutations', () => {
		test('mutateFloat32', () => {
			const f32 = new Float32Array([0.1, 1.2, 2.3, 3.4]);

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
		}, n);
	});

	it('should measure Float64Array[] mutations', () => {
		test('mutateFloat64', () => {
			const f32 = new Float64Array([0.1, 1.2, 2.3, 3.4]);

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
		}, n);
	});

	it('should measure Float32Array.set() mutations', () => {
		test('mutateFloat32Set', () => {
			const f32 = new Float32Array([0.1, 1.2, 2.3, 3.4]);

			for (let i = 0; i < n; i += 1) {
				const x = f32[X];
				const y = f32[Y];
				const z = f32[Z];
				const w = f32[W];

				f32.set([y, z, w, x]);
			}
		}, n);
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

		for (let i = 0; i < num; i += 1) {
			const x = obj.x, y = obj.y;

			obj.x = x + x;
			obj.y = y + y;
		}
	});

	it('should measure double destructured property access', () => {
		const obj = { x: 0.1, y: 1.0 };

		for (let i = 0; i < num; i += 1) {
			const {x, y} = obj;

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

describe('branching', () => {
	const minfn = Math.min;
	const num = 100_000_000;
	let a = 1.0;

	function umin(n:number, min:number) {
		return n < min ? n : min;
	}

	function bindableUmin(min:number, n:number) {
		return n < min ? n : min;
	}

	const amin = (n:number, min:number) => n < min ? n : min;
	const bmin = bindableUmin.bind(null, 1.0);
	const pmin = (n:number, min:number) => (n * Number(n < min) + Number(n >= min));


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
			a = -(a * ((a < 1.0) as any) + ((a >= 1.0) as any)) * 1.1;
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
})