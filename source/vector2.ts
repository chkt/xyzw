import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';


export interface Vector2 {
	x : number;
	y : number;
}


const absOf = Math.abs;
const sinOf = Math.sin;
const cosOf = Math.cos;
const acosOf = Math.acos;
const sqrtOf = Math.sqrt;

const epsilon = 1e-10;


export function equals(v:Vector2, w:Vector2, e:number = epsilon) : boolean {
	return absOf(w.x - v.x) < e && absOf(w.y - v.y) < e;
}


/**
 * ‖ v⃗ ‖
 */
export function norm(v:Vector2) : number {
	return sqrtOf(v.x ** 2 + v.y ** 2);
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
	return acosOf(v.x * w.x + v.y * w.y);
}


export function Create(x:number = 0.0, y:number = 0.0) : Vector2 {
	return { x, y };
}

export function assign<R extends Vector2>(r:R, x:number = 0.0, y:number = 0.0) : R {
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
export function axisX<R extends Vector2>(r:R, s:number = 1.0) : R {
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
export function axisY<R extends Vector2>(r:R, s:number = 1.0) : R {
	r.x = 0.0;
	r.y = s;

	return r;
}

export function Rotation(rad:number) : Vector2 {
	return { x : cosOf(rad), y : sinOf(rad) };
}

export function rotation<R extends Vector2>(r:R, rad:number) : R {
	r.x = cosOf(rad);
	r.y = sinOf(rad);

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
export function barycentricUV<R extends Vector2>(r:R, vx0:Vector2, vx1:Vector2, vx2:Vector2, u:number, v:number) : R {
	const { x, y } = vx0;

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
export function add<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R {
	r.x = v.x + w.x;
	r.y = v.y + w.y;

	return r;
}

/**
 * v⃗ = v⃗+w⃗
 */
export function addAssign<R extends Vector2>(v:R, w:Vector2) : R {
	v.x += w.x;
	v.y += w.y;

	return v;
}

/**
 * v⃗-w⃗
 */
export function Subtract(v:Vector2, w:Vector2) : Vector2 {
	return { x : v.x - w.x, y : v.y - w.y };
}

/**
 * r⃗ = v⃗-w⃗
 */
export function subtract<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R {
	r.x = v.x - w.x;
	r.y = v.y - w.y;

	return r;
}

/**
 * v⃗ = v⃗-w⃗
 */
export function subtractAssign<R extends Vector2>(v:R, w:Vector2) : R {
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
export function multiplyScalar<R extends Vector2>(r:R, v:Vector2, n:number) : R {
	r.x = v.x * n;
	r.y = v.y * n;

	return r;
}

/**
 * v⃗ = nv⃗
 */
export function multiplyAssignScalar<R extends Vector2>(v:R, n:number) : R {
	v.x *= n;
	v.y *= n;

	return v;
}

/**
 * v⃗⊙w⃗
 */
export function Hadamard(v:Vector2, w:Vector2) : Vector2 {
	return { x : v.x * w.x, y : v.y * w.y };
}

/**
 * r⃗ = v⃗⊙w⃗
 */
export function hadamard<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R {
	r.x = v.x * w.x;
	r.y = v.y * w.y;

	return r;
}

/**
 * v⃗ = v⃗⊙w⃗
 */
export function hadamardAssign<R extends Vector2>(v:R, w:Vector2) : R {
	v.x *= w.x;
	v.y *= w.y;

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
export function multiplyMatrix2<R extends Vector2>(r:R, m:Matrix2, v:Vector2) : R {
	const { x, y } = v;

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
export function multiply2x3Matrix3<R extends Vector2>(r:R, m:Matrix3, v:Vector2) : R {
	const { x, y } = v;

	r.x = x * m.r00 + y * m.r01 + m.r02;
	r.y = x * m.r10 + y * m.r11 + m.r12;

	return r;
}

/**
 * M₃ₓ₃v⃗
 */
export function MultiplyMatrix3(m:Matrix3, v:Vector2) : Vector2 {
	return multiplyMatrix3({ x : 0.0, y : 0.0 }, m, v);
}

/**
 * r⃗ = M₃ₓ₃v⃗
 */
export function multiplyMatrix3<R extends Vector2>(r:R, m:Matrix3, v:Vector2) : R {
	const { x, y } = v;
	const w = 1.0 / (x * m.r20 + y * m.r21 + m.r22);

	r.x = (x * m.r00 + y * m.r01 + m.r02) * w;
	r.y = (x * m.r10 + y * m.r11 + m.r12) * w;

	return r;
}

/**
 * v⃗ + ( w⃗ - v⃗ ) * t
 */
export function Lerp(v:Vector2, w:Vector2, t:number) : Vector2 {
	return lerp({ x : 0.0, y : 0.0 }, v, w, t);
}

/**
 * r⃗ = v⃗ + (w⃗ - v⃗ ) * t
 */
export function lerp<R extends Vector2>(r:R, v:Vector2, w:Vector2, t:number) : R {
	const { x : vx, y : vy } = v;

	r.x = vx + (w.x - vx) * t;
	r.y = vy + (w.y - vy) * t;

	return r;
}

/**
 * v⃗ = v⃗ + (w⃗ - v⃗ ) * t
 */
export function lerpAssign<R extends Vector2>(v:R, w:Vector2, t:number) : R {
	v.x += (w.x - v.x) * t;
	v.y += (w.y - v.y) * t;

	return v;
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
export function project<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R {
	const { x, y } = v;
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
export function reflect<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R {
	const { x : vx, y : vy } = v;
	const { x : wx, y : wy } = w;
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
export function normalize<R extends Vector2>(r:R, v:Vector2) : R {
	const { x, y } = v;
	let n = x ** 2 + y ** 2;

	if (n !== 0.0 && n !== 1.0) n = 1.0 / sqrtOf(n);

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
export function perpendicular<R extends Vector2>(r:R, v:Vector2) : R {
	const x = v.x;

	r.x = -v.y;
	r.y = x;

	return r;
}

/**
 * 1⁄v⃗
 */
export function hadamardInvert(v:Vector2) : Vector2 {
	return { x : 1.0 / v.x, y : 1.0 / v.y };
}

/**
 * r⃗ = 1⁄v⃗
 */
export function HadamardInvert<R extends Vector2>(r:R, v:Vector2) : R {
	r.x = 1.0 / v.x;
	r.y = 1.0 / v.y;

	return r;
}

/**
 * -v⃗
 */
export function Negate(v:Vector2) : Vector2 {
	return { x : v.x * -1.0, y : v.y * -1.0 };
}

/**
 * r⃗ = -v⃗
 */
export function negate<R extends Vector2>(r:R, v:Vector2) : R {
	r.x = v.x * -1.0;
	r.y = v.y * -1.0;

	return r;
}

/**
 * v⃗ = -v⃗
 */
export function negateAssign<R extends Vector2>(v:R) : R {
	v.x *= -1.0;
	v.y *= -1.0;

	return v;
}

export function Copy(v:Vector2) : Vector2 {
	return { x : v.x, y : v.y };
}

export function copy<R extends Vector2>(r:R, v:Vector2) : R {
	r.x = v.x;
	r.y = v.y;

	return r;
}
