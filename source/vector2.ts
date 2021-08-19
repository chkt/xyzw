import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';


export interface Vector2 {
	x : number;
	y : number;
}


const epsilon = 1e-10;
const abs = Math.abs;
const sin = Math.sin;
const cos = Math.cos;
const acos = Math.acos;
const sqrt = Math.sqrt;


export function equals(v:Vector2, w:Vector2, e:number = epsilon) : boolean {
	return abs(w.x - v.x) < e && abs(w.y - v.y) < e;
}


/**
 * ‖ v⃗ ‖
 */
export function norm(v:Vector2) : number {
	return sqrt(v.x ** 2 + v.y ** 2);
}

/**
 * ‖ v⃗ ‖²
 */
export function normSquared(v:Vector2) : number {
	return v.x ** 2 + v.y ** 2;
}

/**
 * v⃗×w⃗
 */
export function cross(v:Vector2, w:Vector2) : number {
	return v.x * w.y - v.y * w.x;
}

/**
 * v⃗⋅w⃗
 */
export function dot(v:Vector2, w:Vector2) : number {
	return v.x * w.x + v.y * w.y;
}

/**
 * acos(v⃗⋅w⃗ )
 */
export function radians(v:Vector2, w:Vector2) : number {
	return acos(v.x * w.x + v.y * w.y);
}


export function Create(x:number = 0.0, y:number = 0.0) : Vector2 {
	return { x, y };
}

export function assign(r:Vector2, x:number = 0.0, y:number = 0.0) : Vector2 {
	r.x = x;
	r.y = y;

	return r;
}

/**
 * sx̂
 */
export function AxisX(s:number = 1.0) : Vector2 {
	return { x : s, y : 0.0 };
}

/**
 * r⃗ = sx̂
 */
export function axisX(r:Vector2, s:number = 1.0) : Vector2 {
	r.x = s;
	r.y = 0.0;

	return r;
}

/**
 * sŷ
 */
export function AxisY(s:number = 1.0) : Vector2 {
	return { x : 0.0, y : s };
}

/**
 * r⃗ = sŷ
 */
export function axisY(r:Vector2, s:number = 1.0) : Vector2 {
	r.x = 0.0;
	r.y = s;

	return r;
}

export function Rotation(rad:number) : Vector2 {
	return { x : cos(rad), y : sin(rad) };
}

export function rotation(r:Vector2, rad:number) : Vector2 {
	r.x = cos(rad);
	r.y = sin(rad);

	return r;
}

/**
 * Return the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2)
 */
export function BarycentricUV(vx0:Vector2, vx1:Vector2, vx2:Vector2, u:number, v:number) : Vector2 {
	return barycentricUV({ x : 0.0, y : 0.0 }, vx0, vx1, vx2, u, v);
}

/**
 * Assign the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2) to r⃗
 */
export function barycentricUV(r:Vector2, vx0:Vector2, vx1:Vector2, vx2:Vector2, u:number, v:number) : Vector2 {
	const {x, y} = vx0;

	r.x = x + (vx1.x - x) * u + (vx2.x - x) * v;
	r.y = y + (vx1.y - y) * u + (vx2.y - y) * v;

	return r;
}

/**
 * v⃗+w⃗
 */
export function Add(v:Vector2, w:Vector2) : Vector2 {
	return { x : v.x + w.x, y : v.y + w.y };
}

/**
 * r⃗ = v⃗+w⃗
 */
export function add(r:Vector2, v:Vector2, w:Vector2) : Vector2 {
	r.x = v.x + w.x;
	r.y = v.y + w.y;

	return r;
}

/**
 * v⃗ = v⃗+w⃗
 */
export function addAssign(v:Vector2, w:Vector2) : Vector2 {
	v.x += w.x;
	v.y += w.y;

	return v;
}

/**
 * v⃗-w⃗
 */
export function Subtract(v:Vector2, w:Vector2) : Vector2 {
	return { x: v.x - w.x, y : v.y - w.y };
}

/**
 * r⃗ = v⃗-w⃗
 */
export function subtract(r:Vector2, v:Vector2, w:Vector2) : Vector2 {
	r.x = v.x - w.x;
	r.y = v.y - w.y;

	return r;
}

/**
 * v⃗ = v⃗-w⃗
 */
export function subtractAssign(v:Vector2, w:Vector2) : Vector2 {
	v.x -= w.x;
	v.y -= w.y;

	return v;
}

/**
 * nv⃗
 */
export function MultiplyScalar(v:Vector2, n:number) : Vector2 {
	return { x : v.x * n, y : v.y * n };
}

/**
 * r⃗ = nv⃗
 */
export function multiplyScalar(r:Vector2, v:Vector2, n:number) : Vector2 {
	r.x = v.x * n;
	r.y = v.y * n;

	return r;
}

/**
 * v⃗ = nv⃗
 */
export function multiplyAssignScalar(v:Vector2, n:number) : Vector2 {
	v.x *= n;
	v.y *= n;

	return v;
}

/**
 * M₂ₓ₂v⃗
 */
export function MultiplyMatrix2(m:Matrix2, v:Vector2) : Vector2 {
	return multiplyMatrix2({ x : 0.0, y : 0.0 }, m, v);
}

/**
 * r⃗ = M₂ₓ₂v⃗
 */
export function multiplyMatrix2(r:Vector2, m:Matrix2, v:Vector2) : Vector2 {
	const {x, y} = v;

	r.x = x * m.r00 + y * m.r01;
	r.y = x * m.r10 + y * m.r11;

	return r;
}

/**
 * M₂ₓ₃v⃗
 */
export function Multiply2x3Matrix3(m:Matrix3, v:Vector2) : Vector2 {
	return multiply2x3Matrix3({ x : 0.0, y : 0.0 }, m, v);
}

/**
 * r⃗ = M₂ₓ₃v⃗
 */
export function multiply2x3Matrix3(r:Vector2, m:Matrix3, v:Vector2) : Vector2 {
	const {x, y} = v;

	r.x = x * m.r00 + y * m.r01 + m.r02;
	r.y = x * m.r10 + y * m.r11 + m.r12;

	return r;
}

/**
 * M₃ₓ₃v⃗
 */
export function MultiplyMatrix3(m:Matrix3, v:Vector2) : Vector2 {
	return multiplyMatrix3({ x: 0.0, y : 0.0 }, m, v);
}

/**
 * r⃗ = M₃ₓ₃v⃗
 */
export function multiplyMatrix3(r:Vector2, m:Matrix3, v:Vector2) : Vector2 {
	const {x, y} = v;
	const w = 1.0 / (x * m.r20 + y * m.r21 + m.r22);

	r.x = (x * m.r00 + y * m.r01 + m.r02) * w;
	r.y = (x * m.r10 + y * m.r11 + m.r12) * w;

	return r;
}

/**
 * Return the projection of w⃗ onto v⃗, (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
 */
export function Project(v:Vector2, w:Vector2) : Vector2 {
	return project({ x : 0.0, y : 0.0 }, v, w);
}

/**
 * Assign the projection of w⃗ onto v⃗ to r⃗, r⃗ = (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
 */
export function project(r:Vector2, v:Vector2, w:Vector2) : Vector2 {
	const {x, y} = v;
	const n = (x * w.x + y * w.y) / (x ** 2 + y ** 2);

	r.x = x * n;
	r.y = y * n;

	return r;
}

/**
 * Return the reflection of w⃗ against v⃗, 2(v⃗⋅w⃗ )w⃗-v⃗
 */
export function Reflect(v:Vector2, w:Vector2) : Vector2 {
	return reflect({ x : 0.0, y : 0.0 }, v, w);
}

/**
 * Assign the reflection of w⃗ against v⃗, r⃗ = 2(v⃗⋅w⃗ )w⃗-v⃗
 */
export function reflect(r:Vector2, v:Vector2, w:Vector2) : Vector2 {
	const {x : vx, y : vy} = v;
	const {x : wx, y : wy} = w;
	const d = 2.0 * (vx * wx + vy * wy);

	r.x = vx * d - wx;
	r.y = vy * d - wy;

	return r;
}

/**
 * v̂
 */
export function Normalize(v:Vector2) : Vector2 {
	return normalize({ x : 0.0, y : 0.0 }, v);
}

/**
 * r⃗ = v̂
 */
export function normalize(r:Vector2, v:Vector2) : Vector2 {
	const {x, y} = v;
	let n = x ** 2 + y ** 2;

	if (n !== 0.0 && n !== 1.0) n = 1.0 / sqrt(n);

	r.x = x * n;
	r.y = y * n;

	return r;
}

/**
 * v⃗⊥
 */
export function Perpendicular(v:Vector2) : Vector2 {
	return { x : -v.y, y : v.x };
}

/**
 * r⃗ = v⃗⊥
 */
export function perpendicular(r:Vector2, v:Vector2) : Vector2 {
	const x = v.x;

	r.x = -v.y;
	r.y = x;

	return r;
}

export function Copy(v:Vector2) : Vector2 {
	return { x : v.x, y: v.y };
}

export function copy(r:Vector2, v:Vector2) : Vector2 {
	r.x = v.x;
	r.y = v.y;

	return r;
}
