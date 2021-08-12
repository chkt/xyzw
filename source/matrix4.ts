import { Vector3 } from './vector3';
import { Matrix3 } from './matrix3';


export interface Matrix4 extends Matrix3 {
	r30 : number;
	r31 : number;
	r32 : number;
	r03 : number;
	r13 : number;
	r23 : number;
	r33 : number;
}


const epsilon = 1e-10;
const isNaN = Number.isNaN;
const abs = Math.abs;

const mat4 = Identity();
const f64a = new Float64Array(16);
const f64b = new Float64Array(16);


export function equals(a:Matrix4, b:Matrix4, e:number = epsilon) : boolean {
	return abs(b.r00 - a.r00) < e && abs(b.r10 - a.r10) < e && abs(b.r20 - a.r20) < e && abs(b.r30 - a.r30) < e &&
		abs(b.r01 - a.r01) < e && abs(b.r11 - a.r11) < e && abs(b.r21 - a.r21) < e && abs(b.r31 - a.r31) < e &&
		abs(b.r02 - a.r02) < e && abs(b.r12 - a.r12) < e && abs(b.r22 - a.r22) < e && abs(b.r32 - a.r32) < e &&
		abs(b.r03 - a.r03) < e && abs(b.r13 - a.r13) < e && abs(b.r23 - a.r23) < e && abs(b.r33 - a.r33) < e;
}

/**
 * |M|
 */
export function determinant(m:Matrix4) : number {
	const n1133s1331 = m.r11 * m.r33 - m.r13 * m.r31;
	const n1230s1032 = m.r12 * m.r30 - m.r10 * m.r32;

	return m.r00 * m.r22 * n1133s1331 +
		m.r01 * m.r23 * n1230s1032 +
		m.r02 * m.r20 * -n1133s1331 +
		m.r03 * m.r21 * -n1230s1032;
}

/**
 * Î
 */
export function Identity() : Matrix4 {
	return {
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}
}

/**
 * Mᵣ = Î
 */
export function identity(r:Matrix4) : Matrix4 {
	r.r00 = 1.0; r.r10 = 0.0; r.r20 = 0.0; r.r30 = 0.0;
	r.r01 = 0.0; r.r11 = 1.0; r.r21 = 0.0; r.r31 = 0.0;
	r.r02 = 0.0; r.r12 = 0.0; r.r22 = 1.0; r.r32 = 0.0;
	r.r03 = 0.0; r.r13 = 0.0; r.r23 = 0.0; r.r33 = 1.0;

	return r;
}

/**
 * [ x̂  ŷ  ẑ  ŵ+v⃗ ]
 */
export function Translation(v:Vector3) : Matrix4 {
	return {
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : v.x, r13 : v.y, r23 : v.z, r33 : 1.0
	};
}

/**
 * Mᵣ = [ x̂  ŷ  ẑ  ŵ+v⃗ ]
 */
export function translation(r:Matrix4, v:Vector3) : Matrix4 {
	r.r00 = 1.0; r.r10 = 0.0; r.r20 = 0.0; r.r30 = 0.0;
	r.r01 = 0.0; r.r11 = 1.0; r.r21 = 0.0; r.r31 = 0.0;
	r.r02 = 0.0; r.r12 = 0.0; r.r22 = 1.0; r.r32 = 0.0;
	r.r03 = v.x; r.r13 = v.y; r.r23 = v.z; r.r33 = 1.0;

	return r;
}

/**
 * [ m⁰ m¹ m² ŵ ]
 */
export function ShearMatrix3(m:Matrix3) : Matrix4 {
	return {
		r00 : m.r00, r10 : m.r10, r20 : m.r20, r30 : 0.0,
		r01 : m.r01, r11 : m.r11, r21 : m.r21, r31 : 0.0,
		r02 : m.r02, r12 : m.r12, r22 : m.r22, r32 : 0.0,
		r03 : 0.0,   r13 : 0.0,   r23 : 0.0,   r33 : 1.0
	};
}

/**
 * Mᵣ = [ m⁰ m¹ m² ŵ ]
 */
export function shearMatrix3(r:Matrix4, m:Matrix3) : Matrix4 {
	r.r00 = m.r00; r.r10 = m.r10; r.r20 = m.r20; r.r30 = 0.0;
	r.r01 = m.r01; r.r11 = m.r11; r.r21 = m.r21; r.r31 = 0.0;
	r.r02 = m.r02; r.r12 = m.r12; r.r22 = m.r22; r.r32 = 0.0;
	r.r03 = 0.0;   r.r13 = 0.0;   r.r23 = 0.0;   r.r33 = 1.0;

	return r;
}

/**
 * [ x⃗  y⃗  z⃗  ŵ+t⃗ ]
 */
export function ShearTranslation(x:Vector3, y:Vector3, z:Vector3, t:Vector3) : Matrix4 {
	return {
		r00 : x.x, r10 : x.y, r20 : x.z, r30 : 0.0,
		r01 : y.x, r11 : y.y, r21 : y.z, r31 : 0.0,
		r02 : z.x, r12 : z.y, r22 : z.z, r32 : 0.0,
		r03 : t.x, r13 : t.y, r23 : t.z, r33 : 1.0
	};
}

/**
 * Mᵣ = [ x⃗  y⃗  z⃗  ŵ+t⃗ ]
 */
export function shearTranslation(r:Matrix4, x:Vector3, y:Vector3, z:Vector3, t:Vector3) : Matrix4 {
	r.r00 = x.x; r.r10 = x.y; r.r20 = x.z; r.r30 = 0.0;
	r.r01 = y.x; r.r11 = y.y; r.r21 = y.z; r.r31 = 0.0;
	r.r02 = z.x; r.r12 = z.y; r.r22 = z.z; r.r32 = 0.0;
	r.r03 = t.x; r.r13 = t.y; r.r23 = t.z; r.r33 = 1.0;

	return r;
}

/**
 * A+B
 */
export function Add(a:Matrix4, b:Matrix4) : Matrix4 {
	return {
		r00 : a.r00 + b.r00, r10 : a.r10 + b.r10, r20 : a.r20 + b.r20, r30 : a.r30 + b.r30,
		r01 : a.r01 + b.r01, r11 : a.r11 + b.r11, r21 : a.r21 + b.r21, r31 : a.r31 + b.r31,
		r02 : a.r02 + b.r02, r12 : a.r12 + b.r12, r22 : a.r22 + b.r22, r32 : a.r32 + b.r32,
		r03 : a.r03 + b.r03, r13 : a.r13 + b.r13, r23 : a.r23 + b.r23, r33 : a.r33 + b.r33
	};
}

/**
 * Mᵣ = A+B
 */
export function add(r:Matrix4, a:Matrix4, b:Matrix4) : Matrix4 {
	r.r00 = a.r00 + b.r00; r.r10 = a.r10 + b.r10; r.r20 = a.r20 + b.r20; r.r30 = a.r30 + b.r30;
	r.r01 = a.r01 + b.r01; r.r11 = a.r11 + b.r11; r.r21 = a.r21 + b.r21; r.r31 = a.r31 + b.r31;
	r.r02 = a.r02 + b.r02; r.r12 = a.r12 + b.r12; r.r22 = a.r22 + b.r22; r.r32 = a.r32 + b.r32;
	r.r03 = a.r03 + b.r03; r.r13 = a.r13 + b.r13; r.r23 = a.r23 + b.r23; r.r33 = a.r33 + b.r33;

	return r;
}

/**
 * A = A+B
 */
export function addAssign(a:Matrix4, b:Matrix4) : Matrix4 {
	a.r00 += b.r00; a.r10 += b.r10; a.r20 += b.r20; a.r30 += b.r30;
	a.r01 += b.r01; a.r11 += b.r11; a.r21 += b.r21; a.r31 += b.r31;
	a.r02 += b.r02; a.r12 += b.r12; a.r22 += b.r22; a.r32 += b.r32;
	a.r03 += b.r03; a.r13 += b.r13; a.r23 += b.r23; a.r33 += b.r33;

	return a;
}

/**
 * A-B
 */
export function Subtract(a:Matrix4, b:Matrix4) : Matrix4 {
	return {
		r00 : a.r00 - b.r00, r10 : a.r10 - b.r10, r20 : a.r20 - b.r20, r30 : a.r30 - b.r30,
		r01 : a.r01 - b.r01, r11 : a.r11 - b.r11, r21 : a.r21 - b.r21, r31 : a.r31 - b.r31,
		r02 : a.r02 - b.r02, r12 : a.r12 - b.r12, r22 : a.r22 - b.r22, r32 : a.r32 - b.r32,
		r03 : a.r03 - b.r03, r13 : a.r13 - b.r13, r23 : a.r23 - b.r23, r33 : a.r33 - b.r33
	};
}

/**
 * Mᵣ = A-B
 */
export function subtract(r:Matrix4, a:Matrix4, b:Matrix4) : Matrix4 {
	r.r00 = a.r00 - b.r00; r.r10 = a.r10 - b.r10; r.r20 = a.r20 - b.r20; r.r30 = a.r30 - b.r30;
	r.r01 = a.r01 - b.r01; r.r11 = a.r11 - b.r11; r.r21 = a.r21 - b.r21; r.r31 = a.r31 - b.r31;
	r.r02 = a.r02 - b.r02; r.r12 = a.r12 - b.r12; r.r22 = a.r22 - b.r22; r.r32 = a.r32 - b.r32;
	r.r03 = a.r03 - b.r03; r.r13 = a.r13 - b.r13; r.r23 = a.r23 - b.r23; r.r33 = a.r33 - b.r33;

	return r;
}

/**
 * A = A-B
 */
export function subtractAssign(a:Matrix4, b:Matrix4) : Matrix4 {
	a.r00 -= b.r00; a.r10 -= b.r10; a.r20 -= b.r20; a.r30 -= b.r30;
	a.r01 -= b.r01; a.r11 -= b.r11; a.r21 -= b.r21; a.r31 -= b.r31;
	a.r02 -= b.r02; a.r12 -= b.r12; a.r22 -= b.r22; a.r32 -= b.r32;
	a.r03 -= b.r03; a.r13 -= b.r13; a.r23 -= b.r23; a.r33 -= b.r33;

	return a;
}

/**
 * M[ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂  ŵ ]
 */
export function ConcatScale(m:Matrix4, v:Vector3) : Matrix4 {
	return concatScale({
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}, m, v);
}

/**
 * Mᵣ = M[ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂  ŵ ]
 */
export function concatScale(r:Matrix4, m:Matrix4, v:Vector3) : Matrix4 {
	const {x : b00, y : b11, z : b22} = v;

	r.r00 = m.r00 * b00;
	r.r10 = m.r10 * b00;
	r.r20 = m.r20 * b00;
	r.r30 = 0.0;
	r.r01 = m.r01 * b11;
	r.r11 = m.r11 * b11;
	r.r21 = m.r21 * b11;
	r.r31 = 0.0;
	r.r02 = m.r02 * b22;
	r.r12 = m.r12 * b22;
	r.r22 = m.r22 * b22;
	r.r32 = 0.0;
	r.r03 = m.r03;
	r.r13 = m.r13;
	r.r23 = m.r23;
	r.r33 = 1.0;

	return r;
}

/**
 * M[ x̂  ŷ  ẑ  ŵ+v⃗ ]
 */
export function ConcatTranslation(m:Matrix4, v:Vector3) : Matrix4 {
	return concatTranslation({
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}, m, v);
}

/**
 * Mᵣ = M[ x̂  ŷ  ẑ  ŵ+v⃗ ]
 */
export function concatTranslation(r:Matrix4, m:Matrix4, v:Vector3) : Matrix4 {
	const {
		r00 : a00, r10 : a10, r20 : a20,
		r01 : a01, r11 : a11, r21 : a21,
		r02 : a02, r12 : a12, r22 : a22
	} = m;
	const { x : b03, y : b13, z : b23 } = v;

	r.r00 = a00;
	r.r10 = a10;
	r.r20 = a20;
	r.r30 = 0.0;
	r.r01 = a01;
	r.r11 = a11;
	r.r21 = a21;
	r.r31 = 0.0;
	r.r02 = a02;
	r.r12 = a12;
	r.r22 = a22;
	r.r32 = 0.0;
	r.r03 = a00 * b03 + a01 * b13 + a02 * b23 + m.r03;
	r.r13 = a10 * b03 + a11 * b13 + a12 * b23 + m.r13;
	r.r23 = a20 * b03 + a21 * b13 + a22 * b23 + m.r23;
	r.r33 = 1.0;

	return r;
}

/**
 * AB₃ₓ₃
 */
export function ConcatMatrix3(a:Matrix4, b:Matrix3) : Matrix4 {
	return concatMatrix3({
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}, a, b);
}

/**
 * Mᵣ = AB₃ₓ₃
 */
export function concatMatrix3(r:Matrix4, a:Matrix4, b:Matrix3) : Matrix4 {
	const {
		r00 : a00, r10 : a10, r20 : a20,
		r01 : a01, r11 : a11, r21 : a21,
		r02 : a02, r12 : a12, r22 : a22
	} = a;
	const {
		r00 : b00, r10 : b10, r20 : b20,
		r01 : b01, r11 : b11, r21 : b21,
		r02 : b02, r12 : b12, r22 : b22
	} = b;

	r.r00 = a00 * b00 + a01 * b10 + a02 * b20;
	r.r10 = a10 * b00 + a11 * b10 + a12 * b20;
	r.r20 = a20 * b00 + a21 * b10 + a22 * b20;
	r.r30 = 0.0;
	r.r01 = a00 * b01 + a01 * b11 + a02 * b21;
	r.r11 = a10 * b01 + a11 * b11 + a12 * b21;
	r.r21 = a20 * b01 + a21 * b11 + a22 * b21;
	r.r31 = 0.0;
	r.r02 = a00 * b02 + a01 * b12 + a02 * b22;
	r.r12 = a10 * b02 + a11 * b12 + a12 * b22;
	r.r22 = a20 * b02 + a21 * b12 + a22 * b22;
	r.r32 = 0.0;
	r.r03 = a.r03;
	r.r13 = a.r13;
	r.r23 = a.r23;
	r.r33 = 1.0;

	return r;
}

/**
 * AB₃ₓ₄
 */
export function Concat3x4(a:Matrix4, b:Matrix4) : Matrix4 {
	return concat3x4({
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}, a, b);
}

/**
 * Mᵣ = AB₃ₓ₄
 */
export function concat3x4(r:Matrix4, a:Matrix4, b:Matrix4) : Matrix4 {
	const {
		r00 : a00, r10 : a10, r20 : a20,
		r01 : a01, r11 : a11, r21 : a21,
		r02 : a02, r12 : a12, r22 : a22
	} = a;
	const {
		r00 : b00, r10 : b10, r20 : b20,
		r01 : b01, r11 : b11, r21 : b21,
		r02 : b02, r12 : b12, r22 : b22,
		r03 : b03, r13 : b13, r23 : b23
	} = b;

	r.r00 = a00 * b00 + a01 * b10 + a02 * b20;
	r.r10 = a10 * b00 + a11 * b10 + a12 * b20;
	r.r20 = a20 * b00 + a21 * b10 + a22 * b20;
	r.r30 = 0.0;
	r.r01 = a00 * b01 + a01 * b11 + a02 * b21;
	r.r11 = a10 * b01 + a11 * b11 + a12 * b21;
	r.r21 = a20 * b01 + a21 * b11 + a22 * b21;
	r.r31 = 0.0;
	r.r02 = a00 * b02 + a01 * b12 + a02 * b22;
	r.r12 = a10 * b02 + a11 * b12 + a12 * b22;
	r.r22 = a20 * b02 + a21 * b12 + a22 * b22;
	r.r32 = 0.0;
	r.r03 = a00 * b03 + a01 * b13 + a02 * b23 + a.r03;
	r.r13 = a10 * b03 + a11 * b13 + a12 * b23 + a.r13;
	r.r23 = a20 * b03 + a21 * b13 + a22 * b23 + a.r23;
	r.r33 = 1.0;

	return r;
}

/**
 * AB
 */
export function Concat(a:Matrix4, b:Matrix4) : Matrix4 {
	return concat({
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}, a, b);
}

/**
 * Mᵣ = AB
 */
export function concat(r:Matrix4, a:Matrix4, b:Matrix4) : Matrix4 {
	const {
		r00 : a00, r10 : a10, r20 : a20, r30 : a30,
		r01 : a01, r11 : a11, r21 : a21, r31 : a31,
		r02 : a02, r12 : a12, r22 : a22, r32 : a32,
		r03 : a03, r13 : a13, r23 : a23, r33 : a33
	} = a;
	const {
		r00 : b00, r10 : b10, r20 : b20, r30 : b30,
		r01 : b01, r11 : b11, r21 : b21, r31 : b31,
		r02 : b02, r12 : b12, r22 : b22, r32 : b32,
		r03 : b03, r13 : b13, r23 : b23, r33 : b33
	} = b;

	r.r00 = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
	r.r10 = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
	r.r20 = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
	r.r30 = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
	r.r01 = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
	r.r11 = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
	r.r21 = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
	r.r31 = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
	r.r02 = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
	r.r12 = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
	r.r22 = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
	r.r32 = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
	r.r03 = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
	r.r13 = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
	r.r23 = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
	r.r33 = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

	return r;
}

/**
 * [ m⁰ m¹ m² ŵ+m³ ]⁻¹
 */
export function Inverse3x4(m:Matrix4) : Matrix4|void {
	return inverse3x4({
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}, m);
}

/**
 * Mᵣ = [ m⁰ m¹ m² ŵ+m³ ]⁻¹
 */
export function inverse3x4(r:Matrix4, m:Matrix4) : Matrix4|void {
	const {
		r00 : m00, r10 : m10, r20 : m20,
		r01 : m01, r11 : m11, r21 : m21,
		r02 : m02, r12 : m12, r22 : m22,
		r03 : m03, r13 : m13, r23 : m23
	} = m;

	let d = m00 * m22 * m11 + m01 * m23 + m02 * m20 * -m11 + m03 * m21;

	if (isNaN(d + m10 + m12 + m13) || abs(d) < epsilon) return undefined;

	d = 1.0 / d;

	const m0011 = m00 * m11, m0112 = m01 * m12, m0213 = m02 * m13, m0310 = m03 * m10;
	const m0312 = m03 * m12, m0211 = m02 * m11, m0110 = m01 * m10, m0013 = m00 * m13;
	const m0012 = m00 * m12, m0113 = m01 * m13, m0210 = m02 * m10, m0311 = m03 * m11;

	r.r00 =  d * (m11 * m22   - m12 * m21);
	r.r10 = -d * (m10 * m22   - m12 * m20);
	r.r20 =  d * (m10 * m21   - m11 * m20);
	r.r30 =  0.0;
	r.r01 = -d * (m01 * m22   - m02 * m21);
	r.r11 =  d * (m00 * m22   - m02 * m20);
	r.r21 = -d * (m00 * m21   - m01 * m20);
	r.r31 =  0.0;
	r.r02 =  d * (m0112 - m0211);
	r.r12 = -d * (m0012 - m0210);
	r.r22 =  d * (m0011 - m0110);
	r.r32 =  0.0;
	r.r03 = -d * (m0112 * m23 + m0213 * m21 + m0311 * m22 - m0312 * m21 - m0211 * m23 - m0113 * m22);
	r.r13 =  d * (m0012 * m23 + m0213 * m20 + m0310 * m22 - m0312 * m20 - m0210 * m23 - m0013 * m22);
	r.r23 = -d * (m0011 * m23 + m0113 * m20 + m0310 * m21 - m0311 * m20 - m0110 * m23 - m0013 * m21);
	r.r33 =  d * (m0011 * m22 + m0112 * m20 + m0210 * m21 - m0211 * m20 - m0110 * m22 - m0012 * m21);

	return r;
}

/**
 * M⁻¹ (using the determinant)
 */
export function Inverse(m:Matrix4) : Matrix4|void {
	return inverse({
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}, m);
}

/**
 * Mᵣ = M⁻¹ (using the determinant)
 */
export function inverse(r:Matrix4, m:Matrix4) : Matrix4|void {
	let d = determinant(m);

	if (isNaN(d) || abs(d) < epsilon) return undefined;

	d = 1.0 / d;

	const {
		r00 : m00, r10 : m10, r20 : m20, r30 : m30,
		r01 : m01, r11 : m11, r21 : m21, r31 : m31,
		r02 : m02, r12 : m12, r22 : m22, r32 : m32,
		r03 : m03, r13 : m13, r23 : m23, r33 : m33
	} = m;

	const m0011 = m00 * m11, m0112 = m01 * m12, m0213 = m02 * m13, m0310 = m03 * m10;
	const m2031 = m20 * m31, m2132 = m21 * m32, m2233 = m22 * m33, m2330 = m23 * m30;
	const m0312 = m03 * m12, m0211 = m02 * m11, m0110 = m01 * m10, m0013 = m00 * m13;
	const m2332 = m23 * m32, m2231 = m22 * m31, m2130 = m21 * m30, m2033 = m20 * m33;
	const m0012 = m00 * m12, m0113 = m01 * m13, m0210 = m02 * m10, m0311 = m03 * m11;
	const m2032 = m20 * m32, m2133 = m21 * m33, m2230 = m22 * m30, m2331 = m23 * m31;

	r.r00 =  d * (m11 * m2233 + m12 * m2331 + m13 * m2132 - m13 * m2231 - m12 * m2133 - m11 * m2332);
	r.r10 = -d * (m10 * m2233 + m12 * m2330 + m13 * m2032 - m13 * m2230 - m12 * m2033 - m10 * m2332);
	r.r20 =  d * (m10 * m2133 + m11 * m2330 + m13 * m2031 - m13 * m2130 - m11 * m2033 - m10 * m2331);
	r.r30 = -d * (m10 * m2132 + m11 * m2230 + m12 * m2031 - m12 * m2130 - m11 * m2032 - m10 * m2231);
	r.r01 = -d * (m01 * m2233 + m02 * m2331 + m03 * m2132 - m03 * m2231 - m02 * m2133 - m01 * m2332);
	r.r11 =  d * (m00 * m2233 + m02 * m2330 + m03 * m2032 - m03 * m2230 - m02 * m2033 - m00 * m2332);
	r.r21 = -d * (m00 * m2133 + m01 * m2330 + m03 * m2031 - m03 * m2130 - m01 * m2033 - m00 * m2331);
	r.r31 =  d * (m00 * m2132 + m01 * m2230 + m02 * m2031 - m02 * m2130 - m01 * m2032 - m00 * m2231);
	r.r02 =  d * (m0112 * m33 + m0213 * m31 + m0311 * m32 - m0312 * m31 - m0211 * m33 - m0113 * m32);
	r.r12 = -d * (m0012 * m33 + m0213 * m30 + m0310 * m32 - m0312 * m30 - m0210 * m33 - m0013 * m32);
	r.r22 =  d * (m0011 * m33 + m0113 * m30 + m0310 * m31 - m0311 * m30 - m0110 * m33 - m0013 * m31);
	r.r32 = -d * (m0011 * m32 + m0112 * m30 + m0210 * m31 - m0211 * m30 - m0110 * m32 - m0012 * m31);
	r.r03 = -d * (m0112 * m23 + m0213 * m21 + m0311 * m22 - m0312 * m21 - m0211 * m23 - m0113 * m22);
	r.r13 =  d * (m0012 * m23 + m0213 * m20 + m0310 * m22 - m0312 * m20 - m0210 * m23 - m0013 * m22);
	r.r23 = -d * (m0011 * m23 + m0113 * m20 + m0310 * m21 - m0311 * m20 - m0110 * m23 - m0013 * m21);
	r.r33 =  d * (m0011 * m22 + m0112 * m20 + m0210 * m21 - m0211 * m20 - m0110 * m22 - m0012 * m21);

	return r;
}

/**
 * M⁻¹ (using Gauss-Jordon elimination)
 */
export function InverseGauss(m:Matrix4) : Matrix4|void {
	return inverseGauss({
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
	}, m);
}

/**
 * Mᵣ = M⁻¹ (using Gauss-Jordan elimination)
 */
export function inverseGauss(r:Matrix4, m:Matrix4) : Matrix4|void {
	const a = assignColumnF64(f64a, m), b = assignColumnF64(f64b, identity(mat4));

	for (let r1 = 0; r1 < 4; r1 += 1) {
		const rcol = r1 * 4;
		let max = r1;

		for (let r2 = r1 + 1; r2 < 4; r2 += 1) {
			if (abs(a[r2 + rcol]) > abs(a[max + rcol])) max = r2;
		}

		if (max !== r1) {
			for (let c = 0; c < 4; c += 1) {
				const ccol = c * 4, indexA = r1 + ccol, indexB = max + ccol;

				[a[indexA], a[indexB]] = [a[indexB], a[indexA]];
				[b[indexA], b[indexB]] = [b[indexB], b[indexA]];
			}
		}

		if (isNaN(a[r1 + rcol]) || abs(a[r1 + rcol]) < epsilon) return undefined;

		for (let r2 = r1 + 1; r2 < 4; r2 += 1) {
			const n = a[r2 + rcol] / a[r1 + rcol];

			for (let c = 0; c < 4; c += 1) {
				const ccol = c * 4;

				b[r2 + ccol] -= b[r1 + ccol] * n;

				if (c <= r1) continue;

				a[r2 + ccol] -= a[r1 + ccol] * n;
			}
		}
	}

	for (let r1 = 3; r1 > -1; r1 -= 1) {
		const rcol = r1 * 4;
		const n = 1.0 / a[r1 + rcol];

		for (let r2 = 0; r2 < r1; r2 += 1) {
			const f = a[r2 + rcol] * n;

			for (let c = 0; c < 4; c += 1) {
				const ccol = c * 4, indexA = r2 + ccol, indexB = r1 + ccol;

				b[indexA] -= b[indexB] * f;

				if (c <= r1) continue;

				a[indexA] -= a[indexB] + f;
			}
		}

		a[rcol] *= n;

		for (let c = 0; c < 4; c += 1) b[r1 + c * 4] *= n;
	}

	return columnF64(r, b);
}

/**
 * Mᵀ
 */
export function Transpose(m:Matrix4) : Matrix4 {
	return {
		r00 : m.r00, r10 : m.r01, r20 : m.r02, r30 : m.r03,
		r01 : m.r10, r11 : m.r11, r21 : m.r12, r31 : m.r13,
		r02 : m.r20, r12 : m.r21, r22 : m.r22, r32 : m.r23,
		r03 : m.r30, r13 : m.r31, r23 : m.r32, r33 : m.r33
	};
}

/**
 * Mᵣ = Mᵀ
 */
export function transpose(r:Matrix4, m:Matrix4) : Matrix4 {
	const {r10, r20, r30, r21, r31, r32} = m;

	r.r00 = m.r00; r.r10 = m.r01; r.r20 = m.r02; r.r30 = m.r03;
	r.r01 = r10;   r.r11 = m.r11; r.r21 = m.r12; r.r31 = m.r13;
	r.r02 = r20;   r.r12 = r21;   r.r22 = m.r22; r.r32 = m.r23;
	r.r03 = r30;   r.r13 = r31;   r.r23 = r32;   r.r33 = m.r33;

	return r;
}

export function Copy(m:Matrix4) : Matrix4 {
	return {
		r00 : m.r00, r10 : m.r10, r20 : m.r20, r30 : m.r30,
		r01 : m.r01, r11 : m.r11, r21 : m.r21, r31 : m.r31,
		r02 : m.r02, r12 : m.r12, r22 : m.r22, r32 : m.r32,
		r03 : m.r03, r13 : m.r13, r23 : m.r23, r33 : m.r33
	};
}

export function copy(r:Matrix4, m:Matrix4) : Matrix4 {
	r.r00 = m.r00; r.r10 = m.r10; r.r20 = m.r20; r.r30 = m.r30;
	r.r01 = m.r01; r.r11 = m.r11; r.r21 = m.r21; r.r31 = m.r31;
	r.r02 = m.r02; r.r12 = m.r12; r.r22 = m.r22; r.r32 = m.r32;
	r.r03 = m.r03; r.r13 = m.r13; r.r23 = m.r23; r.r33 = m.r33;

	return r;
}

export function toColumnF32(m:Matrix4) : Float32Array {
	return new Float32Array([
		m.r00, m.r10, m.r20, m.r30,
		m.r01, m.r11, m.r21, m.r31,
		m.r02, m.r12, m.r22, m.r32,
		m.r03, m.r13, m.r23, m.r33
	]);
}

export function assignColumnF32(r:Float32Array, m:Matrix4) : Float32Array {
	r[0]  = m.r00; r[1]  = m.r10; r[2]  = m.r20; r[3]  = m.r30;
	r[4]  = m.r01; r[5]  = m.r11; r[6]  = m.r21; r[7]  = m.r31;
	r[8]  = m.r02; r[9]  = m.r12; r[10] = m.r22; r[11] = m.r32;
	r[12] = m.r03; r[13] = m.r13; r[14] = m.r23; r[15] = m.r33;

	return r;
}

export function toColumnF64(m:Matrix4) : Float64Array {
	return new Float64Array([
		m.r00, m.r10, m.r20, m.r30,
		m.r01, m.r11, m.r21, m.r31,
		m.r02, m.r12, m.r22, m.r32,
		m.r03, m.r13, m.r23, m.r33
	]);
}

export function assignColumnF64(r:Float64Array, m:Matrix4) : Float64Array {
	r[0]  = m.r00; r[1]  = m.r10; r[2]  = m.r20; r[3]  = m.r30;
	r[4]  = m.r01; r[5]  = m.r11; r[6]  = m.r21; r[7]  = m.r31;
	r[8]  = m.r02; r[9]  = m.r12; r[10] = m.r22; r[11] = m.r32;
	r[12] = m.r03; r[13] = m.r13; r[14] = m.r23; r[15] = m.r33;

	return r;
}

export function ColumnF32(n:Float32Array) : Matrix4 {
	return {
		r00 : n[0],  r10 : n[1],  r20 : n[2],  r30 : n[3],
		r01 : n[4],  r11 : n[5],  r21 : n[6],  r31 : n[7],
		r02 : n[8],  r12 : n[9],  r22 : n[10], r32 : n[11],
		r03 : n[12], r13 : n[13], r23 : n[14], r33 : n[15]
	};
}


export function columnF32(r:Matrix4, n:Float32Array) : Matrix4 {
	r.r00 = n[0];  r.r10 = n[1];  r.r20 = n[2];  r.r30 = n[3];
	r.r01 = n[4];  r.r11 = n[5];  r.r21 = n[6];  r.r31 = n[7];
	r.r02 = n[8];  r.r12 = n[9];  r.r22 = n[10]; r.r32 = n[11];
	r.r03 = n[12]; r.r13 = n[13]; r.r23 = n[14]; r.r33 = n[15];

	return r;
}


export function ColumnF64(n:Float64Array) : Matrix4 {
	return {
		r00 : n[0],  r10 : n[1],  r20 : n[2],  r30 : n[3],
		r01 : n[4],  r11 : n[5],  r21 : n[6],  r31 : n[7],
		r02 : n[8],  r12 : n[9],  r22 : n[10], r32 : n[11],
		r03 : n[12], r13 : n[13], r23 : n[14], r33 : n[15]
	};
}


export function columnF64(r:Matrix4, n:Float64Array) : Matrix4 {
	r.r00 = n[0];  r.r10 = n[1];  r.r20 = n[2];  r.r30 = n[3];
	r.r01 = n[4];  r.r11 = n[5];  r.r21 = n[6];  r.r31 = n[7];
	r.r02 = n[8];  r.r12 = n[9];  r.r22 = n[10]; r.r32 = n[11];
	r.r03 = n[12]; r.r13 = n[13]; r.r23 = n[14]; r.r33 = n[15];

	return r;
}
