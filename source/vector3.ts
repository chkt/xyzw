import { Vector2 } from './vector2';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';


export interface Vector3 extends Vector2 {
	z : number;
}


const epsilon = 1e-10;
const abs = Math.abs;
const asin = Math.asin;
const atan = Math.atan2;
const sqrt = Math.sqrt;


export function equals(v:Vector3, w:Vector3, e:number = epsilon) : boolean {

	return abs(w.x - v.x) < e && abs(w.y - v.y) < e && abs(w.z - v.z) < e;
}

/**
 * ‖ v⃗ ‖ < n
 */
export function isNormLt(v:Vector3, n:number) : boolean {
	return v.x ** 2 + v.y ** 2 + v.z ** 2 < n ** 2;
}

/**
 * ‖ v⃗ ‖ > n
 */
export function isNormGt(v:Vector3, n:number) : boolean {
	return v.x ** 2 + v.y ** 2 + v.z ** 2 > n ** 2;
}

/**
 * ‖ v⃗ ‖ - n < ϵ
 */
export function isNormEqual(v:Vector3, n:number, e:number = epsilon) : boolean {
	return abs(v.x ** 2 + v.y ** 2 + v.z ** 2 - n ** 2) < e;
}

/**
 * ‖ v⃗ ‖
 */
export function norm(v:Vector3) : number {
	return sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
}

/**
 * ‖ v⃗ ‖²
 */
export function normSquared(v:Vector3) : number {
	return v.x ** 2 + v.y ** 2 + v.z ** 2;
}

/**
 * v⃗⋅w⃗
 */
export function dot(v:Vector3, w:Vector3) : number {
	return v.x * w.x + v.y * w.y + v.z * w.z;
}


export function Create(x:number = 0.0, y:number = 0.0, z:number = 0.0) : Vector3 {
	return { x, y, z };
}

export function assign(r:Vector3, x:number = 0.0, y:number = 0.0, z:number = 0.0) : Vector3 {
	r.x = x;
	r.y = y;
	r.z = z;

	return r;
}

/**
 * sx̂
 */
export function AxisX(s:number = 1.0) : Vector3 {
	return { x : s, y : 0.0, z : 0.0 };
}

/**
 * r⃗ = sx̂
 */
export function axisX(r:Vector3, s:number = 1.0) : Vector3 {
	r.x = s;
	r.y = 0.0;
	r.z = 0.0;

	return r;
}

/**
 * sŷ
 */
export function AxisY(s:number = 1.0) : Vector3 {
	return { x : 0.0, y : s, z : 0.0 };
}

/**
 * r⃗ = sŷ
 */
export function axisY(r:Vector3, s:number = 1.0) : Vector3 {
	r.x = 0.0;
	r.y = s;
	r.z = 0.0;

	return r;
}

/**
 * sẑ
 */
export function AxisZ(s:number = 1.0) : Vector3 {
	return { x: 0.0, y : 0.0, z : s };
}

/**
 * r⃗ = sẑ
 */
export function axisZ(r:Vector3, s:number = 1.0) : Vector3 {
	r.x = 0.0;
	r.y = 0.0;
	r.z = s;

	return r;
}

export function EulerXYZ(m:Matrix3) : Vector3 {
	return eulerXYZ({ x : 0.0, y : 0.0, z : 0.0 }, m);
}

export function eulerXYZ(r:Vector3, m:Matrix3) : Vector3 {
	const n02 = m.r02;

	r.y = asin(n02);

	if (abs(n02) !== 1.0) {
		r.x = atan(-m.r12, m.r22);
		r.z = atan(-m.r01, m.r00);
	}
	else {
		r.x = atan(m.r10, m.r11);
		r.z = 0.0;
	}

	return r;
}

export function EulerYXZ(m:Matrix3) : Vector3 {
	return eulerYXZ({ x : 0.0, y : 0.0, z : 0.0}, m);
}

export function eulerYXZ(r:Vector3, m:Matrix3) : Vector3 {
	const n12 = m.r12;

	r.x = asin(-n12);

	if (abs(n12) !== 1.0) {
		r.y = atan(m.r02, m.r22);
		r.z = atan(m.r10, m.r11);
	}
	else {
		r.y = atan(m.r01, m.r00);
		r.z = 0.0;
	}

	return r;
}

export function EulerZXY(m:Matrix3) : Vector3 {
	return eulerZXY({ x : 0.0, y : 0.0, z : 0.0 }, m);
}

export function eulerZXY(r:Vector3, m:Matrix3) : Vector3 {
	const n21 = m.r21;

	r.x = asin(n21);

	if (abs(n21) !== 1.0) {
		r.y = atan(-m.r20, m.r22);
		r.z = atan(-m.r01, m.r11);
	}
	else {
		r.y = 0.0;
		r.z = atan(m.r10, m.r00)
	}

	return r;
}

/**
 * Return the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2)
 */
export function BarycentricUV(vx0:Vector3, vx1:Vector3, vx2:Vector3, u:number, v:number) : Vector3 {
	return barycentricUV({ x: 0.0, y : 0.0, z : 0.0 }, vx0, vx1, vx2, u, v);
}

/**
 * Assign the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2) to r⃗
 */
export function barycentricUV(r:Vector3, vx0:Vector3, vx1:Vector3, vx2:Vector3, u:number, v:number) : Vector3 {
	const {x, y, z} = vx0;

	r.x = x + (vx1.x - x) * u + (vx2.x - x) * v;
	r.y = y + (vx1.y - y) * u + (vx2.y - y) * v;
	r.z = z + (vx1.z - z) * u + (vx2.z - z) * v;

	return r;
}

/**
 * v⃗+w⃗
 */
export function Add(v:Vector3, w:Vector3) : Vector3 {
	return { x : v.x + w.x, y : v.y + w.y, z : v.z + w.z };
}

/**
 * r⃗ = v⃗+w⃗
 */
export function add(r:Vector3, v:Vector3, w:Vector3) : Vector3 {
	r.x = v.x + w.x;
	r.y = v.y + w.y;
	r.z = v.z + w.z;

	return r;
}

/**
 * v⃗ = v⃗+w⃗
 */
export function addAssign(v:Vector3, w:Vector3) : Vector3 {
	v.x += w.x;
	v.y += w.y;
	v.z += w.z;

	return v;
}

/**
 * v⃗-w⃗
 */
export function Subtract(v:Vector3, w:Vector3) : Vector3 {
	return { x : v.x - w.x, y : v.y - w.y, z : v.z - w.z };
}

/**
 * r⃗ = v⃗-w⃗
 */
export function subtract(r:Vector3, v:Vector3, w:Vector3) : Vector3 {
	r.x = v.x - w.x;
	r.y = v.y - w.y;
	r.z = v.z - w.z;

	return r;
}

/**
 * v⃗ = v⃗-w⃗
 */
export function subtractAssign(v:Vector3, w:Vector3) : Vector3 {
	v.x -= w.x;
	v.y -= w.y;
	v.z -= w.z;

	return v;
}

/**
 * nv⃗
 */
export function MultiplyScalar(v:Vector3, n:number) : Vector3 {
	return { x : v.x * n, y : v.y * n, z : v.z * n };
}

/**
 * r⃗ = nv⃗
 */
export function multiplyScalar(r:Vector3, v:Vector3, n:number) : Vector3 {
	r.x = v.x * n;
	r.y = v.y * n;
	r.z = v.z * n;

	return r;
}

/**
 * v⃗ = nv⃗
 */
export function multiplyAssignScalar(v:Vector3, n:number) : Vector3 {
	v.x *= n;
	v.y *= n;
	v.z *= n;

	return v;
}

/**
 * v⃗×w⃗
 */
export function Cross(v:Vector3, w:Vector3) : Vector3 {
	return {
		x : v.y * w.z - v.z * w.y,
		y : v.z * w.x - v.x * w.z,
		z : v.x * w.y - v.y * w.x
	};
}

/**
 * r⃗ = v⃗×w⃗
 */
export function cross(r:Vector3, v:Vector3, w:Vector3) : Vector3 {
	const {x : vx, y : vy, z : vz} = v;
	const {x : wx, y : wy, z : wz} = w;

	r.x = vy * wz - vz * wy;
	r.y = vz * wx - vx * wz;
	r.z = vx * wy - vy * wx;

	return r;
}

/**
 * M₃ₓ₃v⃗
 */
export function MultiplyMatrix3(m:Matrix3, v:Vector3) : Vector3 {
	return multiplyMatrix3({ x : 0.0, y : 0.0, z : 0.0 }, m, v);
}

/**
 * r⃗ = M₃ₓ₃v⃗
 */
export function multiplyMatrix3(r:Vector3, m:Matrix3, v:Vector3) : Vector3 {
	const {x, y, z} = v;

	r.x = x * m.r00 + y * m.r01 + z * m.r02;
	r.y = x * m.r10 + y * m.r11 + z * m.r12;
	r.z = x * m.r20 + y * m.r21 + z * m.r22;

	return r;
}

/**
 * M₃ₓ₄v⃗
 */
export function Multiply3x4Matrix4(m:Matrix4, v:Vector3) : Vector3 {
	return multiply3x4Matrix4({ x : 0.0, y : 0.0, z : 0.0 }, m, v);
}

/**
 * r⃗ = M₃ₓ₄v⃗
 */
export function multiply3x4Matrix4(r:Vector3, m:Matrix4, v:Vector3) : Vector3 {
	const {x, y, z} = v;

	r.x = x * m.r00 + y * m.r01 + z * m.r02 + m.r03;
	r.y = x * m.r10 + y * m.r11 + z * m.r12 + m.r13;
	r.z = x * m.r20 + y * m.r21 + z * m.r22 + m.r23;

	return r;
}

/**
 * M₄ₓ₄v⃗
 */
export function MultiplyMatrix4(m:Matrix4, v:Vector3) : Vector3 {
	return multiplyMatrix4({ x : 0.0, y : 0.0, z : 0.0 }, m, v);
}

/**
 * r⃗ = M₄ₓ₄v⃗
 */
export function multiplyMatrix4(r:Vector3, m:Matrix4, v:Vector3) : Vector3 {
	const {x, y, z} = v;
	const w = 1.0 / (x * m.r30 + y * m.r31 + z * m.r32 + m.r33);

	r.x = (x * m.r00 + y * m.r01 + z * m.r02 + m.r03) * w;
	r.y = (x * m.r10 + y * m.r11 + z * m.r12 + m.r13) * w;
	r.z = (x * m.r20 + y * m.r21 + z * m.r22 + m.r23) * w;

	return r;
}

/**
 * Return the projection of w⃗ onto v⃗, (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
 */
export function Project(v:Vector3, w:Vector3) : Vector3 {
	return project({ x : 0.0, y : 0.0, z : 0.0 }, v, w);
}

/**
 * Assign the projection of w⃗ onto v⃗ to r⃗, r⃗ = (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
 */
export function project(r:Vector3, v:Vector3, w:Vector3) : Vector3 {
	const {x, y, z} = v;
	const f = (x * w.x + y * w.y + z * w.z) / (x ** 2 + y ** 2 + z ** 2);

	r.x = x * f;
	r.y = y * f;
	r.z = z * f;

	return r;
}

/**
 * Return the reflection of w⃗ against v⃗, 2(v⃗⋅w⃗ )w⃗-v⃗
 */
export function Reflect(v:Vector3, w:Vector3) : Vector3 {
	return reflect({ x : 0.0, y : 0.0, z : 0.0 }, v, w);
}

/**
 * Assign the reflection of w⃗ against v⃗, r⃗ = 2(v⃗⋅w⃗ )w⃗-v⃗
 */
export function reflect(r:Vector3, v:Vector3, w:Vector3) : Vector3 {
	const {x : vx, y : vy, z : vz} = v;
	const {x : wx, y : wy, z : wz} = w;
	const d = 2.0 * (vx * wx + vy * wy + vz * wz);

	r.x = vx * d - wx;
	r.y = vy * d - wy;
	r.z = vz * d - wz;

	return r;
}

/**
 * w⃗ - (v⃗⋅w⃗ )v⃗
 */
export function OrthoNormalize(v:Vector3, w:Vector3) : Vector3 {
	return orthoNormalize({ x : 0.0, y : 0.0, z : 0.0 }, v, w);
}

/**
 * r⃗ = w⃗ - (v⃗⋅w⃗ )v⃗
 */
export function orthoNormalize(r:Vector3, v:Vector3, w:Vector3) : Vector3 {
	const {x : vx, y : vy, z : vz} = v;
	const {x : wx, y : wy, z : wz} = w;

	const d = wx * vx + wy * vy + wz * vz;

	r.x = wx - vx * d;
	r.y = wy - vy * d;
	r.z = wz - vz * d;

	return r;
}

/**
 * v̂
 */
export function Normalize(v:Vector3) : Vector3 {
	return normalize({ x : 0.0, y : 0.0, z : 0.0 }, v);
}

/**
 * r⃗ = v̂
 */
export function normalize(r:Vector3, v:Vector3) : Vector3 {
	const {x, y, z} = v;
	let n = x ** 2 + y ** 2 + z ** 2;

	if (n !== 0.0 && n !== 1.0) n = 1.0 / sqrt(n);

	r.x = x * n;
	r.y = y * n;
	r.z = z * n;

	return r;
}

export function Copy(v:Vector3) : Vector3 {
	return { x : v.x, y : v.y, z : v.z };
}

export function copy(r:Vector3, v:Vector3) : Vector3 {
	r.x = v.x;
	r.y = v.y;
	r.z = v.z;

	return r;
}

export function toF32(v:Vector3) : Float32Array {
	return new Float32Array([ v.x, v.y, v.z ]);
}

export function assignF32(r:Float32Array, v:Vector3) : Float32Array {
	r[0] = v.x;
	r[1] = v.y;
	r[2] = v.z;

	return r;
}

export function toF64(v:Vector3) : Float64Array {
	return new Float64Array([ v.x, v.y, v.z ]);
}

export function assignF64(r:Float64Array, v:Vector3) : Float64Array {
	r[0] = v.x;
	r[1] = v.y;
	r[2] = v.z;

	return r;
}

export function F32(n:Float32Array) : Vector3 {
	return { x : n[0], y : n[1], z : n[2] };
}

export function f32(r:Vector3, n:Float32Array) : Vector3 {
	r.x = n[0];
	r.y = n[1];
	r.z = n[2];

	return r;
}

export function F64(n:Float64Array) : Vector3 {
	return { x : n[0], y : n[1], z : n[2] };
}

export function f64(r:Vector3, n:Float64Array) : Vector3 {
	r.x = n[0];
	r.y = n[1];
	r.z = n[2];

	return r;
}
