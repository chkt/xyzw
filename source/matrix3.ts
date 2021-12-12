import { Vector2 } from './vector2';
import { cross, Vector3 } from './vector3';
import { Vector4 } from './vector4';
import { Matrix2 } from './matrix2';
import { Matrix4 } from './matrix4';


export interface Matrix3 extends Matrix2 {
	r20 : number;
	r21 : number;
	r02 : number;
	r12 : number;
	r22 : number;
}


const epsilon = 1e-10;
const isNaN = Number.isNaN;
const abs = Math.abs;
const sinOf = Math.sin;
const cosOf = Math.cos;
const sqrt = Math.sqrt;

const vec3:Vector3 = { x : 0.0, y : 0.0, z : 0.0 };


export function equals(a:Matrix3, b:Matrix3, e:number = epsilon) : boolean {
	return abs(b.r00 - a.r00) < e && abs(b.r10 - a.r10) < e && abs(b.r20 - a.r20) < e &&
		abs(b.r01 - a.r01) < e && abs(b.r11 - a.r11) < e && abs(b.r21 - a.r21) < e &&
		abs(b.r02 - a.r02) < e && abs(b.r12 - a.r12) < e && abs(b.r22 - a.r22) < e;
}

/**
 * |M|
 */
export function determinant(m:Matrix3) : number {
	const { r10, r11, r12, r20, r21, r22 } = m;

	return m.r00 * (r11 * r22 - r12 * r21) + m.r01 * (r12 * r20 - r10 * r22) + m.r02 * (r10 * r21 - r11 * r20);
}


/**
 * Î
 */
export function Identity() : Matrix3 {
	return {
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	};
}

/**
 * Mᵣ = Î
 */
export function identity(r:Matrix3) : Matrix3 {
	r.r00 = 1.0; r.r10 = 0.0; r.r20 = 0.0;
	r.r01 = 0.0; r.r11 = 1.0; r.r02 = 0.0;
	r.r02 = 0.0; r.r12 = 0.0; r.r22 = 1.0;

	return r;
}

/**
 * R(v⃗, θ)
 */
export function RotationAxis(v:Vector3, rad:number) : Matrix3 {
	return rotationAxis({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, v, rad);
}

/**
 * Mᵣ = R(v⃗, θ)
 */
export function rotationAxis(r:Matrix3, v:Vector3, rad:number) : Matrix3 {
	const {x, y, z} = v;
	const sin = sinOf(rad), cos = cosOf(rad), vers = 1.0 - cos;
	const xSin = x * sin, ySin = y * sin, zSin = z * sin;
	const xyVers = x * y * vers, xzVers = x * z * vers, yzVers = y * z * vers;

	r.r00 = cos + vers * x ** 2; r.r10 = xyVers + zSin; r.r20 = xzVers - ySin;
	r.r01 = xyVers - zSin; r.r11 = cos + vers * y ** 2; r.r21 = yzVers + xSin;
	r.r02 = xzVers + ySin; r.r12 = yzVers - xSin; r.r22 = cos + vers * z ** 2;

	return r;
}

/**
 * R(x̂, θ)
 */
export function RotationX(rad:number) : Matrix3 {
	return rotationX({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, rad);
}

/**
 * Mᵣ = R(x̂, θ)
 */
export function rotationX(r:Matrix3, rad:number) : Matrix3 {
	const sin = sinOf(rad);
	const cos = cosOf(rad);

	r.r00 = 1.0; r.r10 =  0.0; r.r20 = 0.0;
	r.r01 = 0.0; r.r11 =  cos; r.r21 = sin;
	r.r02 = 0.0; r.r12 = -sin; r.r22 = cos;

	return r;
}

/**
 * R(ŷ, θ)
 */
export function RotationY(rad:number) : Matrix3 {
	return rotationY({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, rad);
}

/**
 * Mᵣ = R(ŷ, θ)
 */
export function rotationY(r:Matrix3, rad:number) : Matrix3 {
	const sin = sinOf(rad);
	const cos = cosOf(rad);

	r.r00 = cos; r.r10 = 0.0; r.r20 = -sin;
	r.r01 = 0.0; r.r11 = 1.0; r.r21 =  0.0;
	r.r02 = sin; r.r12 = 0.0; r.r22 =  cos;

	return r;
}

/**
 * R(ẑ, θ)
 */
export function RotationZ(rad:number) : Matrix3 {
	return rotationZ({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, rad);
}

/**
 * Mᵣ = R(ẑ, θ)
 */
export function rotationZ(r:Matrix3, rad:number) : Matrix3 {
	const sin = sinOf(rad);
	const cos = cosOf(rad);

	r.r00 =  cos; r.r10 = sin; r.r20 = 0.0;
	r.r01 = -sin; r.r11 = cos; r.r21 = 0.0;
	r.r02 =  0.0; r.r12 = 0.0; r.r22 = 1.0;

	return r;
}

/**
 * [ x⃗  x⃗⊥  ẑ ]
 */
export function RotationZVector2(x:Vector2) : Matrix3 {
	return {
		r00 :  x.x, r10 : x.y, r20 : 0.0,
		r01 : -x.y, r11 : x.x, r21 : 0.0,
		r02 :  0.0, r12 : 0.0, r22 : 1.0
	};
}

/**
 * Mᵣ = [ x⃗  x⃗⊥  ẑ ]
 */
export function rotationZVector2(r:Matrix3, x:Vector2) : Matrix3 {
	r.r00 =  x.x; r.r10 = x.y; r.r20 = 0.0;
	r.r01 = -x.y; r.r11 = x.x; r.r21 = 0.0;
	r.r02 =  0.0; r.r12 = 0.0; r.r22 = 1.0;

	return r;
}

/**
 * [ m⁰ m¹ ẑ ]
 */
export function RotationZMatrix2(m:Matrix2) : Matrix3 {
	return {
		r00 : m.r00, r10 : m.r10, r20 : 0.0,
		r01 : m.r01, r11 : m.r11, r21 : 0.0,
		r02 :   0.0, r12 :   0.0, r22 : 1.0
	};
}

/**
 * Mᵣ = [ m⁰ m¹ ẑ ]
 */
export function rotationZMatrix2(r:Matrix3, m:Matrix2) : Matrix3 {
	r.r00 = m.r00; r.r10 = m.r10; r.r20 = 0.0;
	r.r01 = m.r01; r.r11 = m.r11; r.r21 = 0.0;
	r.r02 =   0.0; r.r12 =   0.0; r.r22 = 1.0;

	return r;
}

/**
 * [ x⃗  y⃗  x⃗×y⃗ ]
 */
export function RotationVector3(x:Vector3, y:Vector3) : Matrix3 {
	return rotationVector3({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, x, y);
}

/**
 * Mᵣ = [ x⃗  y⃗  x⃗×y⃗ ]
 */
export function rotationVector3(r:Matrix3, x:Vector3, y:Vector3) : Matrix3 {
	const z = cross(vec3, x, y);

	r.r00 = x.x; r.r10 = x.y; r.r20 = x.z;
	r.r01 = y.x; r.r11 = y.y; r.r21 = y.z;
	r.r02 = z.x; r.r12 = z.y; r.r22 = z.z;

	return r;
}

/**
 * R(x̂, v⃗₀)R(ŷ, v⃗₁)R(ẑ, v⃗₂)
 */
export function EulerXYZ(v:Vector3) : Matrix3 {
	return eulerXYZ({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, v);
}

/**
 * Mᵣ = R(x̂, v⃗₀)R(ŷ, v⃗₁)R(ẑ, v⃗₂)
 */
export function eulerXYZ(r:Matrix3, v:Vector3) : Matrix3 {
	const {x, y, z} = v;
	const sx = sinOf(x), cx = cosOf(x);
	const sy = sinOf(y), cy = cosOf(y);
	const sz = sinOf(z), cz = cosOf(z);

	r.r00 =  cy * cz;
	r.r10 =  cx * sz + sx * sy * cz;
	r.r20 =  sx * sz - cx * sy * cz;
	r.r01 = -cy * sz;
	r.r11 =  cx * cz - sx * sy * sz;
	r.r21 =  sx * cz + cx * sy * sz;
	r.r02 =  sy;
	r.r12 = -sx * cy;
	r.r22 =  cx * cy;

	return r;
}

/**
 * R(ŷ, v⃗₁)R(x̂, v⃗₀)R(ẑ, v⃗₂)
 */
export function EulerYXZ(v:Vector3) : Matrix3 {
	return eulerYXZ({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, v);
}

/**
 * Mᵣ = R(ŷ, v⃗₁)R(x̂, v⃗₀)R(ẑ, v⃗₂)
 */
export function eulerYXZ(r:Matrix3, v:Vector3) : Matrix3 {
	const {x, y, z} = v;
	const sx = sinOf(x), cx = cosOf(x);
	const sy = sinOf(y), cy = cosOf(y);
	const sz = sinOf(z), cz = cosOf(z);

	r.r00 =  cy * cz + sy * sx * sz;
	r.r10 =  cx * sz;
	r.r20 = -sy * cz + cy * sx * sz;
	r.r01 = -cy * sz + sy * sx * cz;
	r.r11 =  cx * cz;
	r.r21 =  sy * sz + cy * sx * cz;
	r.r02 =  sy * cx;
	r.r12 = -sx;
	r.r22 =  cy * cx;

	return r;
}

/**
 * R(ẑ, v⃗₂)R(x̂, v⃗₀)R(ŷ, v⃗₁)
 */
export function EulerZXY(v:Vector3) : Matrix3 {
	return eulerZXY({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, v);
}


/**
 * Mᵣ = R(ẑ, v⃗₂)R(x̂, v⃗₀)R(ŷ, v⃗₁)
 */
export function eulerZXY(r:Matrix3, v:Vector3) : Matrix3 {
	const {x, y, z} = v;
	const sx = sinOf(x), cx = cosOf(x);
	const sy = sinOf(y), cy = cosOf(y);
	const sz = sinOf(z), cz = cosOf(z);

	r.r00 =  cz * cy - sz * sx * sy;
	r.r10 =  sz * cy + cz * sx * sy;
	r.r20 = -cx * sy;
	r.r01 = -sz * cx;
	r.r11 =  cz * cx;
	r.r21 =  sx;
	r.r02 =  cz * sy + sz * sx * cy;
	r.r12 =  sz * sy - cz * sx * cy;
	r.r22 =  cx * cy;

	return r;
}

/**
 * R(q̂)
 */
export function Quaternion(q:Vector4) : Matrix3 {
	return quaternion({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, q);
}

/**
 * Mᵣ = R(q̂)
 */
export function quaternion(r:Matrix3, q:Vector4) : Matrix3 {
	const {x, y, z, w} = q;
	const xx = x ** 2, yy = y ** 2, zz = z ** 2;
	const xy = x * y,  yz = y * z,  xz = x * z;
	const xw = x * w,  yw = y * w,  zw = z * w;

	const s = 2.0 / sqrt(xx + yy + zz + w ** 2);

	r.r00 = 1.0 - s * (yy + zz);
	r.r10 =       s * (xy + zw);
	r.r20 =       s * (xz - yw);
	r.r01 =       s * (xy - zw);
	r.r11 = 1.0 - s * (xx + zz);
	r.r21 =       s * (yz + xw);
	r.r02 =       s * (xz + yw);
	r.r12 =       s * (yz - xw);
	r.r22 = 1.0 - s * (xx + yy);

	return r;
}

/**
 * [ x̂v⃗₀  ŷv⃗₁  ẑ ]
 */
export function ScaleVector2(v:Vector2) : Matrix3 {
	return {
		r00 : v.x, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : v.y, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	};
}

/**
 * Mᵣ = [ x̂v⃗₀  ŷv⃗₁  ẑ ]
 */
export function scaleVector2(r:Matrix3, v:Vector2) : Matrix3 {
	r.r00 = v.x; r.r10 = 0.0; r.r20 = 0.0;
	r.r01 = 0.0; r.r11 = v.y; r.r21 = 0.0;
	r.r02 = 0.0; r.r21 = 0.0; r.r22 = 1.0;

	return r;
}

/**
 * [ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂ ]
 */
export function Scale(v:Vector3) : Matrix3 {
	return {
		r00 : v.x, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : v.y, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : v.z
	};
}

/**
 * Mᵣ = [ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂ ]
 */
export function scale(r:Matrix3, v:Vector3) : Matrix3 {
	r.r00 = v.x; r.r10 = 0.0; r.r20 = 0.0;
	r.r01 = 0.0; r.r11 = v.y; r.r21 = 0.0;
	r.r02 = 0.0; r.r12 = 0.0; r.r22 = v.z;

	return r;
}

/**
 * [ x̂  ŷ  ẑ+v⃗ ]
 */
export function Translation(v:Vector2) : Matrix3 {
	return {
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : v.x, r12 : v.y, r22 : 1.0
	};
}

/**
 * Mᵣ = [ x̂  ŷ  ẑ+v⃗ ]
 */
export function translation(r:Matrix3, v:Vector2) : Matrix3 {
	r.r00 = 1.0; r.r10 = 0.0; r.r20 = 0.0;
	r.r01 = 0.0; r.r11 = 1.0; r.r21 = 0.0;
	r.r02 = v.x; r.r12 = v.y; r.r22 = 1.0;

	return r;
}

/**
 * [ x⃗  y⃗  ẑ ]
 */
export function ShearVector2(x:Vector2, y:Vector2) : Matrix3 {
	return {
		r00 : x.x, r10 : x.y, r20 : 0.0,
		r01 : y.x, r11 : y.y, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	};
}

/**
 * Mᵣ = [ x⃗  y⃗  ẑ ]
 */
export function shearVector2(r:Matrix3, x:Vector2, y:Vector2) : Matrix3 {
	r.r00 = x.x; r.r10 = x.y; r.r20 = 0.0;
	r.r01 = y.x; r.r11 = y.y; r.r21 = 0.0;
	r.r02 = 0.0; r.r12 = 0.0; r.r22 = 1.0;

	return r;
}

/**
 * [ x⃗  y⃗  z⃗ ]
 */
export function Shear(x:Vector3, y:Vector3, z:Vector3) : Matrix3 {
	return {
		r00 : x.x, r10 : x.y, r20 : x.z,
		r01 : y.x, r11 : y.y, r21 : y.z,
		r02 : z.x, r12 : z.y, r22 : z.z
	};
}

/**
 * Mᵣ = [ x⃗  y⃗  z⃗ ]
 */
export function shear(r:Matrix3, x:Vector3, y:Vector3, z:Vector3) : Matrix3 {
	r.r00 = x.x; r.r10 = x.y; r.r20 = x.z;
	r.r01 = y.x; r.r11 = y.y; r.r21 = y.z;
	r.r02 = z.x; r.r12 = z.y; r.r22 = z.z;

	return r;
}

/**
 * [ x⃗  y⃗  ẑ+t⃗ ]
 */
export function ShearTranslation(x:Vector2, y:Vector2, t:Vector2) : Matrix3 {
	return {
		r00 : x.x, r10 : x.y, r20 : 0.0,
		r01 : y.x, r11 : y.y, r21 : 0.0,
		r02 : t.x, r12 : t.y, r22 : 1.0
	};
}

/**
 * Mᵣ = [ x⃗  y⃗  ẑ+t⃗ ]
 */
export function shearTranslation(r:Matrix3, x:Vector2, y:Vector2, t:Vector2) : Matrix3 {
	r.r00 = x.x; r.r10 = x.y; r.r20 = 0.0;
	r.r01 = y.x; r.r11 = y.y; r.r21 = 0.0;
	r.r02 = t.x; r.r12 = t.y; r.r22 = 1.0;

	return r;
}

/**
 * [ m⁰ m¹ m² ]
 */
export function ShearMatrix4(m:Matrix4) : Matrix3 {
	return  {
		r00 : m.r00, r10 : m.r10, r20 : m.r20,
		r01 : m.r01, r11 : m.r11, r21 : m.r21,
		r02 : m.r02, r12 : m.r12, r22 : m.r22
	};
}

/**
 * Mᵣ = [ m⁰ m¹ m² ]
 */
export function shearMatrix4(r:Matrix3, m:Matrix4) : Matrix3 {
	r.r00 = m.r00; r.r10 = m.r10; r.r20 = m.r20;
	r.r01 = m.r01; r.r11 = m.r11; r.r21 = m.r21;
	r.r02 = m.r02; r.r12 = m.r12; r.r22 = m.r22;

	return r;
}

/**
 * A+B
 */
export function Add(a:Matrix3, b:Matrix3) : Matrix3 {
	return {
		r00 : a.r00 + b.r00, r10 : a.r10 + b.r10, r20 : a.r20 + b.r20,
		r01 : a.r01 + b.r01, r11 : a.r11 + b.r11, r21 : a.r21 + b.r21,
		r02 : a.r02 + b.r02, r12 : a.r12 + b.r12, r22 : a.r22 + b.r22
	};
}

/**
 * Mᵣ = A+B
 */
export function add(r:Matrix3, a:Matrix3, b:Matrix3) : Matrix3 {
	r.r00 = a.r00 + b.r00; r.r10 = a.r10 + b.r10; r.r20 = a.r20 + b.r20;
	r.r01 = a.r01 + b.r01; r.r11 = a.r11 + b.r11; r.r21 = a.r21 + b.r21;
	r.r02 = a.r02 + b.r02; r.r12 = a.r12 + b.r12; r.r22 = a.r22 + b.r22;

	return r;
}

/**
 * A = A+B
 */
export function addAssign(a:Matrix3, b:Matrix3) : Matrix3 {
	a.r00 += b.r00; a.r10 += b.r10; a.r20 += b.r20;
	a.r01 += b.r01; a.r11 += b.r11; a.r21 += b.r21;
	a.r02 += b.r02; a.r12 += b.r12; a.r22 += b.r22;

	return a;
}

/**
 * A-B
 */
export function Subtract(a:Matrix3, b:Matrix3) : Matrix3 {
	return {
		r00 : a.r00 - b.r00, r10 : a.r10 - b.r10, r20 : a.r20 - b.r20,
		r01 : a.r01 - b.r01, r11 : a.r11 - b.r11, r21 : a.r21 - b.r21,
		r02 : a.r02 - b.r02, r12 : a.r12 - b.r12, r22 : a.r22 - b.r22
	};
}

/**
 * Mᵣ = A-B
 */
export function subtract(r:Matrix3, a:Matrix3, b:Matrix3) : Matrix3 {
	r.r00 = a.r00 - b.r00; r.r10 = a.r10 - b.r10; r.r20 = a.r20 - b.r20;
	r.r01 = a.r01 - b.r01; r.r11 = a.r11 - b.r11; r.r21 = a.r21 - b.r21;
	r.r02 = a.r02 - b.r02; r.r12 = a.r12 - b.r12; r.r22 = a.r22 - b.r22;

	return r;
}

/**
 * A = A-B
 */
export function subtractAssign(a:Matrix3, b:Matrix3) : Matrix3 {
	a.r00 -= b.r00; a.r10 -= b.r10; a.r20 -= b.r20;
	a.r01 -= b.r01; a.r11 -= b.r11; a.r21 -= b.r21;
	a.r02 -= b.r02; a.r12 -= b.r12; a.r22 -= b.r22;

	return a;
}

/**
 * M[ x̂v⃗₀  ŷv⃗₁  ẑ ]
 */
export function ConcatScaleVector2(m:Matrix3, v:Vector2) : Matrix3 {
	return concatScaleVector2({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, m, v);
}

/**
 * Mᵣ = M[ x̂v⃗₀  ŷv⃗₁  ẑ ]
 */
export function concatScaleVector2(r:Matrix3, m:Matrix3, v:Vector2) : Matrix3 {
	const {x, y} = v;

	r.r00 = m.r00 * x; r.r10 = m.r10 * x; r.r20 = m.r20 * x;
	r.r01 = m.r01 * y; r.r11 = m.r11 * y; r.r21 = m.r21 * y;
	r.r02 = m.r02    ; r.r12 = m.r12    ; r.r22 = m.r22    ;

	return r;
}

/**
 * M[ x̂  ŷ  v⃗ ]
 */
export function ConcatTranslation(m:Matrix3, v:Vector2) : Matrix3 {
	return concatTranslation({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, m, v);
}

/**
 * Mᵣ = M[ x̂  ŷ  v⃗ ]
 */
export function concatTranslation(r:Matrix3, m:Matrix3, v:Vector2) : Matrix3 {
	const {r00, r10, r20, r01, r11, r21} = m;
	const {x, y} = v;

	r.r00 = r00; r.r01 = r01; r.r02 = r00 * x + r01 * y + m.r02;
	r.r10 = r10; r.r11 = r11; r.r12 = r10 * x + r11 * y + m.r12;
	r.r20 = r20; r.r21 = r21; r.r22 = r20 * x + r21 * y + m.r22;

	return r;
}

/**
 * AB₂ₓ₂
 */
export function ConcatMatrix2(a:Matrix3, b:Matrix2) : Matrix3 {
	return concatMatrix2({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, a, b);
}

/**
 * Mᵣ = AB₂ₓ₂
 */
export function concatMatrix2(r:Matrix3, a:Matrix3, b:Matrix2) : Matrix3 {
	const {r00 : a00, r10 : a10, r01 : a01, r11 : a11, r02 : a02, r12 : a12} = a;
	const {r00 : b00, r10 : b10, r01 : b01, r11 : b11} = b;

	r.r00 = a00 * b00 + a01 * b10; r.r10 = a10 * b00 + a11 * b10; r.r20 = 0.0;
	r.r01 = a00 * b01 + a01 * b11; r.r11 = a10 * b01 + a11 * b11; r.r21 = 0.0;
	r.r02 = a02;                   r.r12 = a12;                   r.r22 = 1.0;

	return r;
}

/**
 * AB₂ₓ₃
 */
export function Concat2x3(a:Matrix3, b:Matrix3) : Matrix3 {
	return concat2x3({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, a, b);
}

/**
 * Mᵣ = AB₂ₓ₃
 */
export function concat2x3(r:Matrix3, a:Matrix3, b:Matrix3) : Matrix3 {
	const {r00 : a00, r10 : a10, r01 : a01, r11 : a11, r02 : a02, r12 : a12} = a;
	const {r00 : b00, r10 : b10, r01 : b01, r11 : b11, r02 : b02, r12 : b12} = b;

	r.r00 = a00 * b00 + a01 * b10;       r.r10 = a10 * b00 + a11 * b10;       r.r20 = 0.0;
	r.r01 = a00 * b01 + a01 * b11;       r.r11 = a10 * b01 + a11 * b11;       r.r21 = 0.0;
	r.r02 = a00 * b02 + a01 * b12 + a02; r.r12 = a10 * b02 + a11 * b12 + a12; r.r22 = 1.0;

	return r;
}

/**
 * AB
 */
export function Concat(a:Matrix3, b:Matrix3) : Matrix3 {
	return concat({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, a, b);
}

/**
 * Mᵣ = AB
 */
export function concat(r:Matrix3, a:Matrix3, b:Matrix3) : Matrix3 {
	const {r00 : a00, r10 : a10, r20 : a20, r01 : a01, r11 : a11, r21 : a21, r02 : a02, r12 : a12, r22 : a22} = a;
	const {r00 : b00, r10 : b10, r20 : b20, r01 : b01, r11 : b11, r21 : b21, r02 : b02, r12 : b12, r22 : b22} = b;

	r.r00 = a00 * b00 + a01 * b10 + a02 * b20; r.r10 = a10 * b00 + a11 * b10 + a12 * b20; r.r20 = a20 * b00 + a21 * b10 + a22 * b20;
	r.r01 = a00 * b01 + a01 * b11 + a02 * b21; r.r11 = a10 * b01 + a11 * b11 + a12 * b21; r.r21 = a20 * b01 + a21 * b11 + a22 * b21;
	r.r02 = a00 * b02 + a01 * b12 + a02 * b22; r.r12 = a10 * b02 + a11 * b12 + a12 * b22; r.r22 = a20 * b02 + a21 * b12 + a22 * b22;

	return r;
}

/**
 * M⁻¹
 */
export function Inverse(m:Matrix3) : Matrix3|void {
	return inverse({
		r00 : 1.0, r10 : 0.0, r20 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0
	}, m);
}

/**
 * Mᵣ = M⁻¹
 */
export function inverse(r:Matrix3, m:Matrix3) : Matrix3|void {
	let d = determinant(m);

	if (isNaN(d) || abs(d) < 1e-10) return undefined;

	d = 1.0 / d;

	const {r00, r10, r20, r01, r11, r21, r02, r12, r22} = m;

	r.r00 =  d * (r11 * r22 - r12 * r21); r.r10 = -d * (r10 * r22 - r12 * r20); r.r20 =  d * (r10 * r21 - r11 * r20);
	r.r01 = -d * (r01 * r22 - r02 * r21); r.r11 =  d * (r00 * r22 - r02 * r20); r.r21 = -d * (r00 * r21 - r01 * r20);
	r.r02 =  d * (r01 * r12 - r02 * r11); r.r12 = -d * (r00 * r12 - r02 * r10); r.r22 =  d * (r00 * r11 - r01 * r10);

	return r;
}

/**
 * Mᵀ
 */
export function Transpose(m:Matrix3) : Matrix3 {
	return {
		r00 : m.r00, r10 : m.r01, r20 : m.r02,
		r01 : m.r10, r11 : m.r11, r21 : m.r12,
		r02 : m.r20, r12 : m.r21, r22 : m.r22
	};
}

/**
 * Mᵣ = Mᵀ
 */
export function transpose(r:Matrix3, m:Matrix3) : Matrix3 {
	const {r10, r20, r21} = m;

	r.r00 = m.r00; r.r10 = m.r01; r.r20 = m.r02;
	r.r01 = r10;   r.r11 = m.r11; r.r21 = m.r12;
	r.r02 = r20;   r.r12 = r21;   r.r22 = m.r22;

	return r;
}

export function Copy(m:Matrix3) : Matrix3 {
	return {
		r00 : m.r00, r10 : m.r10, r20 : m.r20,
		r01 : m.r01, r11 : m.r11, r21 : m.r21,
		r02 : m.r02, r12 : m.r12, r22 : m.r22
	};
}

export function copy(r:Matrix3, m:Matrix3) : Matrix3 {
	r.r00 = m.r00; r.r10 = m.r10; r.r20 = m.r20;
	r.r01 = m.r01; r.r11 = m.r11; r.r21 = m.r21;
	r.r02 = m.r02; r.r12 = m.r12; r.r22 = m.r22;

	return r;
}
