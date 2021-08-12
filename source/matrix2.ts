import { Vector2 } from './vector2';
import { Matrix3 } from './matrix3';


export interface Matrix2 {
	r00 : number;
	r10 : number;
	r01 : number;
	r11 : number;
}


const isNaN = Number.isNaN;
const abs = Math.abs;
const sinOf = Math.sin;
const cosOf = Math.cos;


/**
 * |M|
 */
export function determinant(m:Matrix2) : number {
	return m.r00 * m.r11 - m.r01 * m.r10;
}

/**
 * Î
 */
export function Identity() : Matrix2 {
	return { r00 : 1.0, r10 : 0.0, r01 : 0.0, r11 : 1.0 };
}

/**
 * Mᵣ = Î
 */
export function identity(r:Matrix2) : Matrix2 {
	r.r00 = 1.0; r.r10 = 0.0;
	r.r01 = 0.0; r.r11 = 1.0;

	return r;
}

/**
 * R(θ)
 */
export function Rotation(rad:number) : Matrix2 {
	return rotation({ r00 : 0.0, r10 : 0.0, r01 : 0.0, r11 : 0.0 }, rad);
}

/**
 * Mᵣ = R(θ)
 */
export function rotation(r:Matrix2, rad:number) : Matrix2 {
	const sin = sinOf(rad);
	const cos = cosOf(rad);

	r.r00 = cos;
	r.r10 = sin;
	r.r01 = -sin;
	r.r11 = cos;

	return r;
}

/**
 * [ v⃗  v⃗⊥ ]
 */
export function RotationVector2(v:Vector2) : Matrix2 {
	return rotationVector2({ r00 : 1.0, r10 : 0.0, r01 : 0.0, r11 : 1.0 }, v);
}

/**
 * Mᵣ = [ v⃗  v⃗⊥ ]
 */
export function rotationVector2(r:Matrix2, v:Vector2) : Matrix2 {
	const {x, y} = v;

	r.r00 = x;
	r.r10 = y;
	r.r01 = -y;
	r.r11 = x;

	return r;
}

/**
 * [ x̂v⃗₀  ŷv⃗₁ ]
 */
export function Scale(v:Vector2) : Matrix2 {
	return { r00 : v.x, r10 : 0.0, r01 : 0.0, r11 : v.y };
}

/**
 * Mᵣ = [ x̂v⃗₀  ŷv⃗₁ ]
 */
export function scale(r:Matrix2, v:Vector2) : Matrix2 {
	r.r00 = v.x;
	r.r10 = 0.0;
	r.r01 = 0.0;
	r.r11 = v.y;

	return r;
}

/**
 * [ x⃗  y⃗ ]
 */
export function Shear(x:Vector2, y:Vector2) : Matrix2 {
	return { r00 : x.x, r10 : x.y, r01 : y.x, r11 : y.y };
}

/**
 * Mᵣ = [ x⃗  y⃗ ]
 */
export function shear(r:Matrix2, x:Vector2, y:Vector2) : Matrix2 {
	r.r00 = x.x;
	r.r10 = x.y;
	r.r01 = y.x;
	r.r11 = y.y;

	return r;
}

/**
 * [ m⁰ m¹ ]
 */
export function ShearMatrix3(m:Matrix3) : Matrix2 {
	return { r00 : m.r00, r10 : m.r10, r01 : m.r01, r11 : m.r11 };
}

/**
 * Mᵣ = [ m⁰ m¹ ]
 */
export function shearMatrix3(r:Matrix2, m:Matrix3) : Matrix2 {
	r.r00 = m.r00;
	r.r10 = m.r10;
	r.r01 = m.r01;
	r.r11 = m.r11;

	return r;
}

/**
 * A+B
 */
export function Add(a:Matrix2, b:Matrix2) : Matrix2 {
	return {
		r00 : a.r00 + b.r00,
		r10 : a.r10 + b.r10,
		r01 : a.r01 + b.r01,
		r11 : a.r11 + b.r11
	};
}

/**
 * Mᵣ = A+B
 */
export function add(r:Matrix2, a:Matrix2, b:Matrix2) : Matrix2 {
	r.r00 = a.r00 + b.r00;
	r.r10 = a.r10 + b.r10;
	r.r01 = a.r01 + b.r01;
	r.r11 = a.r11 + b.r11;

	return r;
}

/**
 * A = A+B
 */
export function addAssign(a:Matrix2, b:Matrix2) : Matrix2 {
	a.r00 += b.r00;
	a.r10 += b.r10;
	a.r01 += b.r01;
	a.r11 += b.r11;

	return a;
}

/**
 * A-B
 */
export function Subtract(a:Matrix2, b:Matrix2) : Matrix2 {
	return {
		r00 : a.r00 - b.r00,
		r10 : a.r10 - b.r10,
		r01 : a.r01 - b.r01,
		r11 : a.r11 - b.r11
	};
}

/**
 * Mᵣ = A-B
 */
export function subtract(r:Matrix2, a:Matrix2, b:Matrix2) : Matrix2 {
	r.r00 = a.r00 - b.r00;
	r.r10 = a.r10 - b.r10;
	r.r01 = a.r01 - b.r01;
	r.r11 = a.r11 - b.r11;

	return r;
}

/**
 * A = A-B
 */
export function subtractAssign(a:Matrix2, b:Matrix2) : Matrix2 {
	a.r00 -= b.r00;
	a.r10 -= b.r10;
	a.r01 -= b.r01;
	a.r11 -= b.r11;

	return a;
}

/**
 * AB
 */
export function Concat(a:Matrix2, b:Matrix2) : Matrix2 {
	return concat({ r00 : 1.0, r10 : 0.0, r01 : 0.0, r11 : 1.0 }, a, b);
}

/**
 * Mᵣ = AB
 */
export function concat(r:Matrix2, a:Matrix2, b:Matrix2) : Matrix2 {
	const {r00 : a00, r10 : a10, r01 : a01, r11 : a11} = a;
	const {r00 : b00, r10 : b10, r01 : b01, r11 : b11} = b;

	r.r00 = a00 * b00 + a01 * b10;
	r.r10 = a10 * b00 + a11 * b10;
	r.r01 = a00 * b01 + a01 * b11;
	r.r11 = a10 * b01 + a11 * b11;

	return r;
}

/**
 * M⁻¹
 */
export function Inverse(m:Matrix2) : Matrix2|void {
	return inverse({ r00 : 1.0, r10 : 0.0, r01 : 0.0, r11 : 1.0 }, m);
}

/**
 * Mᵣ = M⁻¹
 */
export function inverse(r:Matrix2, m:Matrix2) : Matrix2|void {
	const {r00, r10, r01, r11} = m;
	let d = r00 * r11 - r01 * r10;

	if (isNaN(d) || abs(d) < 1e-10) return undefined;

	d = 1.0 / d;

	r.r00 =  d * r11;
	r.r10 = -d * r10;
	r.r01 = -d * r01;
	r.r11 =  d * r00;

	return r;
}

/**
 * Mᵀ
 */
export function Transpose(m:Matrix2) : Matrix2 {
	return { r00 : m.r00, r10 : m.r01, r01 : m.r10, r11 : m.r11 };
}

/**
 * Mᵣ = Mᵀ
 */
export function transpose(r:Matrix2, m:Matrix2) : Matrix2 {
	const n10 = m.r10;

	r.r00 = m.r00;
	r.r10 = m.r01;
	r.r01 = n10;
	r.r11 = m.r11;

	return r;
}

export function Copy(m:Matrix2) : Matrix2 {
	return { r00 : m.r00, r10 : m.r10, r01 : m.r01, r11 : m.r11 };
}

export function copy(r:Matrix2, m:Matrix2) : Matrix2 {
	r.r00 = m.r00;
	r.r10 = m.r10;
	r.r01 = m.r01;
	r.r11 = m.r11;

	return r;
}
