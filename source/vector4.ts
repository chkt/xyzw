/* eslint max-statements-per-line : [ error, { max : 4 }] */
import { PRECISION_SAFE, StringifyOptions, stringify, stringifyDefaultsCommon } from './strings';
import { Vector3 } from './vector3';
import { Matrix3 } from './matrix3';


export interface Vector4 extends Vector3 {
	w : number;
}


const epsilon = 1e-10;

const isNaNVal = Number.isNaN;
const absOf = Math.abs;
const sinOf = Math.sin;
const cosOf = Math.cos;
const acosOf = Math.acos;
const sqrtOf = Math.sqrt;

const stringifyDefaults:StringifyOptions<Vector4> = {
	...stringifyDefaultsCommon,
	clampMin : { x : -PRECISION_SAFE, y : -PRECISION_SAFE, z : -PRECISION_SAFE, w : -PRECISION_SAFE },
	clampMax : { x : PRECISION_SAFE, y : PRECISION_SAFE, z : PRECISION_SAFE, w : PRECISION_SAFE }
};


export function equals(v:Vector4, w:Vector4, e:number = epsilon) : boolean {
	return absOf(w.x - v.x) < e && absOf(w.y - v.y) < e && absOf(w.z - v.z) < e && absOf(w.w - v.w) < e;
}

/**
 * ‖ v⃗ ‖
 */
export function norm(v:Vector4) : number {
	return sqrtOf(v.x ** 2 + v.y ** 2 + v.z ** 2 + v.w ** 2);
}

/**
 * ‖ v⃗ ‖²
 */
export function normSquared(v:Vector4) : number {
	return v.x ** 2 + v.y ** 2 + v.z ** 2 + v.w ** 2;
}

/**
 * v⃗⋅w⃗
 */
export function dot(v:Vector4, w:Vector4) : number {
	return v.x * w.x + v.y * w.y + v.z * w.z + v.w * w.w;
}

export function Create(x:number = 0.0, y:number = 0.0, z:number = 0.0, w:number = 1.0) : Vector4 {
	return { x, y, z, w };
}

export function assign<R extends Vector4>(r:R, x:number = 0.0, y:number = 0.0, z:number = 0.0, w:number = 1.0) : R {
	r.x = x; r.y = y; r.z = z; r.w = w;

	return r;
}

/**
 * ŵ+v⃗
 */
export function Vector3(v:Vector3, w:number = 1.0) : Vector4 {
	return { ...v, w };
}

/**
 * r⃗ = ŵ+v⃗
 */
export function vector3<R extends Vector4>(r:R, v:Vector3, w:number = 1.0) : R {
	r.x = v.x; r.y = v.y; r.z = v.z; r.w = w;

	return r;
}

/**
 * q̂(v⃗, θ)
 */
export function RotationAxis(v:Vector3, rad:number) : Vector4 {
	return rotationAxis({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, v, rad);
}

/**
 * r⃗ = q̂(v⃗, θ)
 */
export function rotationAxis<R extends Vector4>(r:R, v:Vector3, rad:number) : R {
	// q = cos(θ/2) + sin(θ/2)(xi + yj + zk)
	const radDivTwo = rad * 0.5;
	const sin = sinOf(radDivTwo);

	r.x = v.x * sin; r.y = v.y * sin; r.z = v.z * sin;
	r.w = cosOf(radDivTwo);

	return normalize(r, r);
}

/**
 * v̂(ŵ⁻¹v̂)ᵗ
 */
export function RotationSlerp(v:Vector4, w:Vector4, t:number) : Vector4 {
	return rotationSlerp({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, v, w, t);
}

/**
 * r⃗ = v̂(ŵ⁻¹v̂)ᵗ
 */
export function rotationSlerp<R extends Vector4>(r:R, v:Vector4, w:Vector4, t:number) : R {
	// θ = acos(q0⋅q1)
	// qi = (q0 * sin(1 - u)θ + q1 * sin(uθ))/sin(θ) = q0 * (sin(1 - u)θ)/sin(θ) + q1 * sin(uθ)/sin(θ)
	const { x : vx, y : vy, z : vz, w : vw } = v;
	const { x : wx, y : wy, z : wz, w : ww } = w;

	const a = acosOf(vx * wx + vy * wy + vz * wz + vw * ww);
	const sin = 1.0 / sinOf(a);
	const sinQ = sinOf(a * (1.0 - t)) * sin;
	const sinR = sinOf(a * t) * sin;

	r.x = sinQ * vx + sinR * wx;
	r.y = sinQ * vy + sinR * wy;
	r.z = sinQ * vz + sinR * wz;
	r.w = sinQ * vw + sinR * ww;

	return r;
}

/**
 * q̂(M)
 */
export function RotationMatrix3(m:Matrix3) : Vector4 {
	return rotationMatrix3({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, m);
}

/**
 * r⃗ = q̂(M)
 */
export function rotationMatrix3<R extends Vector4>(r:R, m:Matrix3) : R {
	const { r00, r11, r22 } = m;
	let s = r00 + r11 + r22;

	if (s > 0.0) {
		// q = √(s+1)/2 + ((r21-r12)i + (r02-r20)j + (r10-r01)k)/(2√(s+1))
		s = sqrtOf(s + 1.0);

		r.w = 0.5 * s;

		s = 0.5 / s;

		r.x = (m.r21 - m.r12) * s;
		r.y = (m.r02 - m.r20) * s;
		r.z = (m.r10 - m.r01) * s;
	}
	else if (r00 > r11 && r00 > r22) {
		// q = (√(s+1)/2)i + ((r21-r12) + (r10+r01)j + (r20+r02)k)/(2√(s+1))
		s = sqrtOf(r00 - r11 - r22 + 1.0);

		r.x = 0.5 * s;

		s = 0.5 / s;

		r.y = (m.r10 + m.r01) * s;
		r.z = (m.r20 + m.r02) * s;
		r.w = (m.r21 - m.r12) * s;
	}
	else if (r11 > r22) {
		// q = (√(s+1)/2)j + ((r02-r20) + (r10+r01)i + (r21+r12)k)/(2√(s+1))
		s = sqrtOf(r11 - r00 - r22 + 1.0);

		r.y = 0.5 * s;

		s = 0.5 / s;

		r.x = (m.r10 + m.r01) * s;
		r.z = (m.r21 + m.r12) * s;
		r.w = (m.r02 - m.r20) * s;
	}
	else {
		// q = (√(s+1)/2)k + ((r10-r01) + (r20+r02)i + (r21+r12)j)(2√(s+1))
		s = sqrtOf(r22 - r00 - r11 + 1.0);

		r.z = 0.5 * s;

		s = 0.5 / s;

		r.x = (m.r20 + m.r02) * s;
		r.y = (m.r21 + m.r12) * s;
		r.w = (m.r10 - m.r01) * s;
	}

	return r;
}

/**
 * v⃗+w⃗
 */
export function Add(v:Vector4, w:Vector4) : Vector4 {
	return { x : v.x + w.x, y : v.y + w.y, z : v.z + w.z, w : v.w + w.w };
}

/**
 * r⃗ = v⃗+w⃗
 */
export function add<R extends Vector4>(r:R, v:Vector4, w:Vector4) : R {
	r.x = v.x + w.x; r.y = v.y + w.y; r.z = v.z + w.z; r.w = v.w + w.w;

	return r;
}

/**
 * v⃗ = v⃗+w⃗
 */
export function addAssign<R extends Vector4>(v:R, w:Vector4) : R {
	v.x += w.x; v.y += w.y; v.z += w.z; v.w += w.w;

	return v;
}

/**
 * v⃗-w⃗
 */
export function Subtract(v:Vector4, w:Vector4) : Vector4 {
	return { x : v.x - w.x, y : v.y - w.y, z : v.z - w.z, w : v.w - w.w };
}

/**
 * r⃗ = v⃗-w⃗
 */
export function subtract<R extends Vector4>(r:R, v:Vector4, w:Vector4) : R {
	r.x = v.x - w.x; r.y = v.y - w.y; r.z = v.z - w.z; r.w = v.w - w.w;

	return r;
}

/**
 * v⃗ = v⃗-w⃗
 */
export function subtractAssign<R extends Vector4>(v:R, w:Vector4) : R {
	v.x -= w.x; v.y -= w.y; v.z -= w.z; v.w -= w.w;

	return v;
}

/**
 * nv⃗
 */
export function Scale(v:Vector4, n:number) : Vector4 {
	return { x : v.x * n, y : v.y * n, z : v.z * n, w : v.w * n };
}

/**
 * @deprecated use Scale()
 */
export const MultiplyScalar = Scale;

/**
 * r⃗ = nv⃗
 */
export function scale<R extends Vector4>(r:R, v:Vector4, n:number) : R {
	r.x = v.x * n; r.y = v.y * n; r.z = v.z * n; r.w = v.w * n;

	return r;
}

/**
 * @deprecated use scale()
 */
export const multiplyScalar = scale;

/**
 * v⃗ = nv⃗
 */
export function scaleAssign<R extends Vector4>(v:R, n:number) : R {
	v.x *= n; v.y *= n; v.z *= n; v.w *= n;

	return v;
}

/**
 * @deprecated use scaleAssign()
 */
export const multiplyAssignScalar = scaleAssign;

/**
 * v⃗w⃗
 */
export function Outer(v:Vector4, w:Vector4) : Vector4 {
	return outer({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, v, w);
}

/**
 * r⃗ = v⃗w⃗
 */
export function outer<R extends Vector4>(r:R, v:Vector4, w:Vector4) : R {
	// ij = -ji = k
	// jk = -kj = i
	// ki = -ik = j
	// i*i = j*j = k*k = -1
	// q*r = (qw + qx*i + qy*j + qz*k)(rw + rx*i + ry*j + rz*k)
	const { x : vx, y : vy, z : vz, w : vw } = v;
	const { x : wx, y : wy, z : wz, w : ww } = w;

	r.x = vw * wx + vx * ww + vy * wz - vz * wy;
	r.y = vw * wy - vx * wz + vy * ww + vz * wx;
	r.z = vw * wz + vx * wy - vy * wx + vz * ww;
	r.w = vw * ww - vx * wx - vy * wy - vz * wz;

	return r;
}

/**
 * v⃗⊙w⃗
 */
export function Hadamard(v:Vector4, w:Vector4) : Vector4 {
	return {
		x : v.x * w.x,
		y : v.y * w.y,
		z : v.z * w.z,
		w : v.w * w.w
	};
}

/**
 * r⃗ = v⃗⊙w⃗
 */
export function hadamard<R extends Vector4>(r:R, v:Vector4, w:Vector4) : R {
	r.x = v.x * w.x;
	r.y = v.y * w.y;
	r.z = v.z * w.z;
	r.w = v.w * w.w;

	return r;
}

/**
 * v⃗ = v⃗⊙w⃗
 */
export function hadamardAssign<R extends Vector4>(v:R, w:Vector4) : R {
	v.x *= w.x;
	v.y *= w.y;
	v.z *= w.z;
	v.w *= w.w;

	return v;
}

/**
 * v̂
 */
export function Normalize(v:Vector4) : Vector4 {
	return normalize({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, v);
}

/**
 * r⃗ = v̂
 */
export function normalize<R extends Vector4>(r:R, v:Vector4) : R {
	const { x, y, z, w } = v;
	let n = x ** 2 + y ** 2 + z ** 2 + w ** 2;

	if (n !== 0.0 && n !== 1.0) n = 1.0 / sqrtOf(n);

	r.x = x * n; r.y = y * n; r.z = z * n; r.w = w * n;

	return r;
}

/**
 * q⃗′
 */
export function Conjugate(v:Vector4) : Vector4 {
	return conjugate({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, v);
}

/**
 * r⃗ = q⃗′
 */
export function conjugate<R extends Vector4>(r:R, v:Vector4) : R {
	// q* = a - bi - cj - dk;
	r.x = -v.x; r.y = -v.y; r.z = -v.z; r.w = v.w;

	return r;
}

/**
 * q⃗⁻¹
 */
export function Inverse(v:Vector4) : Vector4 | undefined {
	return inverse({ x : 0.0, y : 0.0, z : 0.0, w : 1.0 }, v);
}

/**
 * r⃗ = q⃗⁻¹
 */
export function inverse<R extends Vector4>(r:R, v:Vector4) : R | undefined {
	// qq* = (a + bi + cj + dk)(a - bi - cj - dk) = a*a + b*b + c*c + d*d
	// 1/q = q* / qq* = (a - bi - cj - dk)/(a*a + b*b + c*c + d*d)
	const { x, y, z, w } = v;
	let n = x ** 2 + y ** 2 + z ** 2 + w ** 2;

	if (isNaNVal(n) || absOf(n) < epsilon) return undefined;

	n = 1.0 / n;

	r.x = x * -n;
	r.y = y * -n;
	r.z = z * -n;
	r.w = w * n;

	return r;
}

export function Copy(v:Vector4) : Vector4 {
	return { x : v.x, y : v.y, z : v.z, w : v.w };
}

export function copy<R extends Vector4>(r:R, v:Vector4) : R {
	r.x = v.x; r.y = v.y; r.z = v.z; r.w = v.w;

	return r;
}

export function createStringifier(opts?:Partial<StringifyOptions<Vector4>>) : stringify<Vector4> {
	return stringify.bind<
		null,
		[ StringifyOptions<Vector4> ],
		[ Vector4 ],
		string
	>(null, { ...stringifyDefaults, ...opts });
}


export function toF32(v:Vector4) : Float32Array {
	return new Float32Array([ v.x, v.y, v.z, v.w ]);
}

export function assignF32(r:Float32Array, v:Vector4, offset:number = 0) : Float32Array {
	r[offset] = v.x;
	r[offset + 1] = v.y;
	r[offset + 2] = v.z;
	r[offset + 3] = v.w;

	return r;
}

export function toF64(v:Vector4) : Float64Array {
	return new Float64Array([ v.x, v.y, v.z, v.w ]);
}

export function assignF64(r:Float64Array, v:Vector4, offset:number = 0) : Float64Array {
	r[offset] = v.x;
	r[offset + 1] = v.y;
	r[offset + 2] = v.z;
	r[offset + 3] = v.w;

	return r;
}

export function F32(n:Float32Array, offset:number = 0) : Vector4 {
	return { x : n[offset], y : n[offset + 1], z : n[offset + 2], w : n[offset + 3] };
}

export function f32<R extends Vector4>(r:R, n:Float32Array, offset:number = 0) : R {
	r.x = n[offset];
	r.y = n[offset + 1];
	r.z = n[offset + 2];
	r.w = n[offset + 3];

	return r;
}

export function F64(n:Float64Array, offset:number = 0) : Vector4 {
	return { x : n[offset], y : n[offset + 1], z : n[offset + 2], w : n[offset + 3] };
}

export function f64<R extends Vector4>(r:R, n:Float64Array, offset:number = 0) : R {
	r.x = n[offset];
	r.y = n[offset + 1];
	r.z = n[offset + 2];
	r.w = n[offset + 3];

	return r;
}
