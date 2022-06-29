import { PRECISION_SAFE, StringifyOptions, stringify, stringifyDefaultsCommon } from './strings';
import { Vector2 } from './vector2';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';


export interface Vector3 extends Vector2 {
	z : number;
}


const absOf = Math.abs;
const minOf = Math.min;
const maxOf = Math.max;
const asinOf = Math.asin;
const atanOf = Math.atan2;
const sqrtOf = Math.sqrt;

const epsilon = 1e-10;
const vec3a:Vector3 = { x : 0.0, y : 0.0, z : 0.0 };
const vec3b:Vector3 = { x : 0.0, y : 0.0, z : 0.0 };

const stringifyDefaults:StringifyOptions<Vector3> = {
	...stringifyDefaultsCommon,
	clampMin : { x : -PRECISION_SAFE, y : -PRECISION_SAFE, z : -PRECISION_SAFE },
	clampMax : { x : PRECISION_SAFE, y : PRECISION_SAFE, z : PRECISION_SAFE }
};


export function equals(v:Vector3, w:Vector3, e:number = epsilon) : boolean {
	return absOf(w.x - v.x) < e && absOf(w.y - v.y) < e && absOf(w.z - v.z) < e;
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
	return absOf(v.x ** 2 + v.y ** 2 + v.z ** 2 - n ** 2) < e;
}

/**
 * ‖ v⃗ ‖
 */
export function norm(v:Vector3) : number {
	return sqrtOf(v.x ** 2 + v.y ** 2 + v.z ** 2);
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

/**
 * Return the cosine of azimuth angle ϕ between v̂ and ŵ against polar axis ẑ, ( (v̂ - (v̂⋅ẑ)ẑ) / ‖ v̂ - (v̂⋅ẑ)ẑ ‖ )⋅( (ŵ - (ŵ⋅ẑ)ẑ) / ‖ ŵ - (ŵ⋅ẑ)ẑ ‖ )
 */
export function azimuth(v:Vector3, w:Vector3, z:Vector3) : number {
	const cosThetaV = dot(v, z);
	const cosThetaW = dot(w, z);

	if (absOf(cosThetaV) === 1.0 || absOf(cosThetaW) === 1.0) return 1.0;

	const normalVZ = normalize(vec3a, subtract(vec3a, v, multiplyScalar(vec3a, z, cosThetaV)));
	const normalWZ = normalize(vec3b, subtract(vec3b, w, multiplyScalar(vec3b, z, cosThetaW)));

	return dot(normalVZ, normalWZ);
}

export function Create(x:number = 0.0, y:number = 0.0, z:number = 0.0) : Vector3 {
	return { x, y, z };
}

export function assign<R extends Vector3>(r:R, x:number = 0.0, y:number = 0.0, z:number = 0.0) : R {
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
export function axisX<R extends Vector3>(r:R, s:number = 1.0) : R {
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
export function axisY<R extends Vector3>(r:R, s:number = 1.0) : R {
	r.x = 0.0;
	r.y = s;
	r.z = 0.0;

	return r;
}

/**
 * sẑ
 */
export function AxisZ(s:number = 1.0) : Vector3 {
	return { x : 0.0, y : 0.0, z : s };
}

/**
 * r⃗ = sẑ
 */
export function axisZ<R extends Vector3>(r:R, s:number = 1.0) : R {
	r.x = 0.0;
	r.y = 0.0;
	r.z = s;

	return r;
}

export function EulerXYZ(m:Matrix3) : Vector3 {
	return eulerXYZ({ x : 0.0, y : 0.0, z : 0.0 }, m);
}

export function eulerXYZ<R extends Vector3>(r:R, m:Matrix3) : R {
	const n02 = m.r02;

	r.y = asinOf(n02);

	if (absOf(n02) !== 1.0) {
		r.x = atanOf(-m.r12, m.r22);
		r.z = atanOf(-m.r01, m.r00);
	}
	else {
		r.x = atanOf(m.r10, m.r11);
		r.z = 0.0;
	}

	return r;
}

export function EulerYXZ(m:Matrix3) : Vector3 {
	return eulerYXZ({ x : 0.0, y : 0.0, z : 0.0 }, m);
}

export function eulerYXZ<R extends Vector3>(r:R, m:Matrix3) : R {
	const n12 = m.r12;

	r.x = asinOf(-n12);

	if (absOf(n12) !== 1.0) {
		r.y = atanOf(m.r02, m.r22);
		r.z = atanOf(m.r10, m.r11);
	}
	else {
		r.y = atanOf(m.r01, m.r00);
		r.z = 0.0;
	}

	return r;
}

export function EulerZXY(m:Matrix3) : Vector3 {
	return eulerZXY({ x : 0.0, y : 0.0, z : 0.0 }, m);
}

export function eulerZXY<R extends Vector3>(r:R, m:Matrix3) : R {
	const n21 = m.r21;

	r.x = asinOf(n21);

	if (absOf(n21) !== 1.0) {
		r.y = atanOf(-m.r20, m.r22);
		r.z = atanOf(-m.r01, m.r11);
	}
	else {
		r.y = 0.0;
		r.z = atanOf(m.r10, m.r00);
	}

	return r;
}

/**
 * Return the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2)
 */
export function BarycentricUV(vx0:Vector3, vx1:Vector3, vx2:Vector3, u:number, v:number) : Vector3 {
	return barycentricUV({ x : 0.0, y : 0.0, z : 0.0 }, vx0, vx1, vx2, u, v);
}

/**
 * Assign the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2) to r⃗
 */
export function barycentricUV<R extends Vector3>(r:R, vx0:Vector3, vx1:Vector3, vx2:Vector3, u:number, v:number) : R {
	const { x, y, z } = vx0;

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
export function add<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R {
	r.x = v.x + w.x;
	r.y = v.y + w.y;
	r.z = v.z + w.z;

	return r;
}

/**
 * v⃗ = v⃗+w⃗
 */
export function addAssign<R extends Vector3>(v:R, w:Vector3) : R {
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
export function subtract<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R {
	r.x = v.x - w.x;
	r.y = v.y - w.y;
	r.z = v.z - w.z;

	return r;
}

/**
 * v⃗ = v⃗-w⃗
 */
export function subtractAssign<R extends Vector3>(v:R, w:Vector3) : R {
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
export function multiplyScalar<R extends Vector3>(r:R, v:Vector3, n:number) : R {
	r.x = v.x * n;
	r.y = v.y * n;
	r.z = v.z * n;

	return r;
}

/**
 * v⃗ = nv⃗
 */
export function multiplyAssignScalar<R extends Vector3>(v:R, n:number) : R {
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
export function cross<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R {
	const { x : vx, y : vy, z : vz } = v;
	const { x : wx, y : wy, z : wz } = w;

	r.x = vy * wz - vz * wy;
	r.y = vz * wx - vx * wz;
	r.z = vx * wy - vy * wx;

	return r;
}

/**
 * v⃗⊙w⃗
 */
export function Hadamard(v:Vector3, w:Vector3) : Vector3 {
	return { x : v.x * w.x, y : v.y * w.y, z : v.z * w.z };
}

/**
 * r⃗ = v⃗⊙w⃗
 */
export function hadamard<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R {
	r.x = v.x * w.x;
	r.y = v.y * w.y;
	r.z = v.z * w.z;

	return r;
}

/**
 * v⃗ = v⃗⊙w⃗
 */
export function hadamardAssign<R extends Vector3>(v:R, w:Vector3) : R {
	v.x *= w.x;
	v.y *= w.y;
	v.z *= w.z;

	return v;
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
export function multiplyMatrix3<R extends Vector3>(r:R, m:Matrix3, v:Vector3) : R {
	const { x, y, z } = v;

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
export function multiply3x4Matrix4<R extends Vector3>(r:R, m:Matrix4, v:Vector3) : R {
	const { x, y, z } = v;

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
export function multiplyMatrix4<R extends Vector3>(r:R, m:Matrix4, v:Vector3) : R {
	const { x, y, z } = v;
	const w = 1.0 / (x * m.r30 + y * m.r31 + z * m.r32 + m.r33);

	r.x = (x * m.r00 + y * m.r01 + z * m.r02 + m.r03) * w;
	r.y = (x * m.r10 + y * m.r11 + z * m.r12 + m.r13) * w;
	r.z = (x * m.r20 + y * m.r21 + z * m.r22 + m.r23) * w;

	return r;
}

/**
 * v⃗ + ( w⃗ - v⃗ ) * t
 */
export function Lerp(v:Vector3, w:Vector3, t:number) : Vector3 {
	return lerp({ x : 0.0, y : 0.0, z : 0.0 }, v, w, t);
}

/**
 * r⃗ = v⃗ + (w⃗ - v⃗ ) * t
 */
export function lerp<R extends Vector3>(r:R, v:Vector3, w:Vector3, t:number) : R {
	const { x : vx, y : vy, z : vz } = v;

	r.x = vx + (w.x - vx) * t;
	r.y = vy + (w.y - vy) * t;
	r.z = vz + (w.z - vz) * t;

	return r;
}

/**
 * v⃗ = v⃗ + (w⃗ - v⃗ ) * t
 */
export function lerpAssign<R extends Vector3>(v:R, w:Vector3, t:number) : R {
	v.x += (w.x - v.x) * t;
	v.y += (w.y - v.y) * t;
	v.z += (w.z - v.z) * t;

	return v;
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
export function project<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R {
	const { x, y, z } = v;
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
export function reflect<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R {
	const { x : vx, y : vy, z : vz } = v;
	const { x : wx, y : wy, z : wz } = w;
	const d = 2.0 * (vx * wx + vy * wy + vz * wz);

	r.x = vx * d - wx;
	r.y = vy * d - wy;
	r.z = vz * d - wz;

	return r;
}

/**
 * w⃗ - (w⃗⋅v⃗ )v⃗
 */
export function OrthoNormalize(v:Vector3, w:Vector3) : Vector3 {
	return orthoNormalize({ x : 0.0, y : 0.0, z : 0.0 }, v, w);
}

/**
 * r⃗ = w⃗ - (w⃗⋅v⃗ )v⃗
 */
export function orthoNormalize<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R {
	const { x : vx, y : vy, z : vz } = v;
	const { x : wx, y : wy, z : wz } = w;

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
export function normalize<R extends Vector3>(r:R, v:Vector3) : R {
	const { x, y, z } = v;
	let n = x ** 2 + y ** 2 + z ** 2;

	if (n !== 0.0 && n !== 1.0) n = 1.0 / sqrtOf(n);

	r.x = x * n;
	r.y = y * n;
	r.z = z * n;

	return r;
}

/**
 * 1⁄v⃗
 */
export function HadamardInvert(v:Vector3) : Vector3 {
	return { x : 1.0 / v.x, y : 1.0 / v.y, z : 1.0 / v.z };
}

/**
 * r⃗ = 1⁄v⃗
 */
export function hadamardInvert<R extends Vector3>(r:R, v:Vector3) : R {
	r.x = 1.0 / v.x;
	r.y = 1.0 / v.y;
	r.z = 1.0 / v.z;

	return r;
}

/**
 * -v⃗
 */
export function Negate(v:Vector3) : Vector3 {
	return { x : -v.x, y : -v.y, z : -v.z };
}

/**
 * r⃗ = -v⃗
 */
export function negate<R extends Vector3>(r:R, v:Vector3) : R {
	r.x = -v.x;
	r.y = -v.y;
	r.z = -v.z;

	return r;
}

/**
 * v⃗ = -v⃗
 */
export function negateAssign<R extends Vector3>(v:R) : R {
	v.x *= -1.0;
	v.y *= -1.0;
	v.z *= -1.0;

	return v;
}

/**
 * min(v⃗, n)
 * @deprecated use same function in xyzw-rgba instead
 */
export function MinScalar(v:Vector3, n:number) : Vector3 {
	return { x : minOf(v.x, n), y : minOf(v.y, n), z : minOf(v.z, n) };
}

/**
 * r⃗ = min(v⃗, n)
 * @deprecated use same function in xyzw-rgba instead
 */
export function minScalar<R extends Vector3>(r:R, v:Vector3, n:number) : R {
	r.x = minOf(v.x, n);
	r.y = minOf(v.y, n);
	r.z = minOf(v.z, n);

	return r;
}

/**
 * max(v⃗, n)
 * @deprecated use same function in xyzw-rgba instead
 */
export function MaxScalar(v:Vector3, n:number) : Vector3 {
	return { x : maxOf(v.x, n), y : maxOf(v.y, n), z : maxOf(v.z, n) };
}

/**
 * r⃗ = max(v⃗, n)
 * @deprecated use same function in xyzw-rgba instead
 */
export function maxScalar<R extends Vector3>(r:R, v:Vector3, n:number) : R {
	r.x = maxOf(v.x, n);
	r.y = maxOf(v.y, n);
	r.z = maxOf(v.z, n);

	return r;
}

/**
 * min(max(v⃗, min(a, b)), max(a, b))
 * @deprecated use same function in xyzw-rgba instead
 */
export function ClampScalar(v:Vector3, a:number, b:number) : Vector3 {
	return clampScalar({ x : 0.0, y : 0.0, z : 0.0 }, v, a, b);
}

/**
 * r⃗ = min(max(v⃗, min(a, b)), max(a, b))
 * @deprecated use same function in xyzw-rgba instead
 */
export function clampScalar<R extends Vector3>(r:R, v:Vector3, a:number, b:number) : R {
	const min = minOf(a, b), max = maxOf(a, b);

	r.x = minOf(maxOf(v.x, min), max);
	r.y = minOf(maxOf(v.y, min), max);
	r.z = minOf(maxOf(v.z, min), max);

	return r;
}

export function Copy(v:Vector3) : Vector3 {
	return { x : v.x, y : v.y, z : v.z };
}

export function copy<R extends Vector3>(r:R, v:Vector3) : R {
	r.x = v.x;
	r.y = v.y;
	r.z = v.z;

	return r;
}

export function createStringifier(opts?:Partial<StringifyOptions<Vector3>>) : stringify<Vector3> {
	return stringify.bind<null, StringifyOptions<Vector3>, [ Vector3 ], string>(null, { ...stringifyDefaults, ...opts });
}

export function toF32(v:Vector3) : Float32Array {
	return new Float32Array([ v.x, v.y, v.z ]);
}

export function assignF32(r:Float32Array, v:Vector3, offset:number = 0) : Float32Array {
	r[offset] = v.x;
	r[offset + 1] = v.y;
	r[offset + 2] = v.z;

	return r;
}

export function toF64(v:Vector3) : Float64Array {
	return new Float64Array([ v.x, v.y, v.z ]);
}

export function assignF64(r:Float64Array, v:Vector3, offset:number = 0) : Float64Array {
	r[offset] = v.x;
	r[offset + 1] = v.y;
	r[offset + 2] = v.z;

	return r;
}

export function F32(n:Float32Array, offset:number = 0) : Vector3 {
	return { x : n[offset], y : n[offset + 1], z : n[offset + 2] };
}

export function f32<R extends Vector3>(r:R, n:Float32Array, offset:number = 0) : R {
	r.x = n[offset];
	r.y = n[offset + 1];
	r.z = n[offset + 2];

	return r;
}

export function F64(n:Float64Array, offset:number = 0) : Vector3 {
	return { x : n[offset], y : n[offset + 1], z : n[offset + 2] };
}

export function f64<R extends Vector3>(r:R, n:Float64Array, offset:number = 0) : R {
	r.x = n[offset];
	r.y = n[offset + 1];
	r.z = n[offset + 2];

	return r;
}
