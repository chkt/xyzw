[![Tests](https://github.com/chkt/xyzw/workflows/tests/badge.svg)](https://github.com/chkt/onceupon/actions)
[![Version](https://img.shields.io/npm/v/xyzw)](https://www.npmjs.com/package/@chkt/onceupon)
![Node](https://img.shields.io/node/v/xyzw)
![Dependencies](https://img.shields.io/librariesio/release/npm/xyzw)
![Licence](https://img.shields.io/npm/l/xyzw)
![Language](https://img.shields.io/github/languages/top/chkt/xyzw)
![Size](https://img.shields.io/bundlephobia/min/xyzw)

# xyzw

A functional, performance oriented, comprehensive and dependencyless typescript vector algebra library.

## Install

```sh
yarn install xyzw
```

## Use

All included vector algebra objects are implemented as plain object literals. 

All operations yielding a non-primitive value have a capitalized *non-mutating* variant returning a new instance containing the result. 

```ts
const vec2 = vector2.Rotation(0.5 * Math.PI);   // { x : 0.0, y : 1.0 }
const vec3 = vector3.AxisX();                   // { x : 1.0, y : 0.0, z : 0.0 }
const vec4 = vector4.Create();                  // { x : 0.0, y : 0.0, z : 0.0, w : 1.0 }
const mat2 = matrix2.Rotation(0.5 * Math.PI);   // { r00 : 0.0, r01 : 1.0, r10 : -1.0, r11 : 0.0 }
const mat3 = matrix3.RotationZ(0.5 * Math.PI);  // { r00 : 0.0, r01 : 1.0, r02 : 0.0, … }
const mat4 = matrix4.Identity();                // …

const v = vector2.Copy(vec2);

assert.notStrictEqual(vec2, v);
```

Likewise all operations yielding a non-primitive value have a same-name non-capitalized *mutating* variant taking an instance of the result type as their first argument.
The first argument is also the return value of the operation.

```ts
vector2.rotation(vec2, 1.0 * Math.PI);   // { x : -1.0, y : 0.0 }
vector3.axisX(vec3, 2.0);                // { x : 2.0, y : 0.0, z : 0.0 }
vector4.assign(vec4, 1.0);               // { x : 1.0, y : 0.0, z : 0.0, w : 1.0 }
matrix2.rotation(mat2, 1.0 * Math.PI);   // { r00 : -1.0, r01 : 0.0, r10 : 0.0, r11 : -1.0 }
matrix3.rotationZ(mat3, 1.0 * Math.PI);  // { r00 : -1.0, r01 : 1.0, r02 : 0.0, … }
matrix4.identity(mat4);                  // …

const w = vector2.copy(v, vec2);

assert.strictEqual(w, v);
assert.notStrictEqual(vec2, v);
```

The fastest operations additionally have an assignment form roughly equivalent to primitive type assignment operations (`a += b`).

```ts
const u = vector2.addAssign(v, w);  // v += w

assert.strictEqual(u, v);
assert.notStrictEqual(w, v);
```
# Modules
## complex
`complex.ts`
### Functions
```ts
function Conjugate(z:Vector2) : Vector2;  // z̅
function Divide(z:Vector2, w:Vector2) : Vector2;  // zw̅ / ww̅, z = a + bi, w = c = di
function Inverse(z:Vector2) : Vector2;  // z⁻¹
function Multiply(z:Vector2, w:Vector2) : Vector2;  // zw, z = a + bi, w = c + di
function Power(z:Vector2, n:number) : Vector2[];  // zⁿ₍ₖ₎
function argument(z:Vector2) : number;  // φ
function conjugate<R extends Vector2>(r:R, v:Vector2) : R;  // r⃗ = z̅
function divide<R extends Vector2>(r:R, z:Vector2, w:Vector2) : R;  // r⃗ = zw̅ / ww̅, z = a + bi, w = c = di
function inverse<R extends Vector2>(r:R, z:Vector2) : R;  // r⃗ = z⁻¹
function multiply<R extends Vector2>(r:R, z:Vector2, w:Vector2) : R;  // r⃗ = zw, z = a + bi, w = c + di
function power<R extends Iterable<undefined | Vector2, R>>(r:R, z:Vector2, n:number) : R;  // r⃗₍ₖ₎ = zⁿ₍ₖ₎
```
## index
`index.ts`
### References
```ts
export * as complex from "./complex";
export * as matrix2 from "./matrix2";
export * as matrix3 from "./matrix3";
export * as matrix4 from "./matrix4";
export * as matrix4Frustrum from "./matrix4Frustrum";
export * as matrix4Ortho from "./matrix4Ortho";
export * as vector2 from "./vector2";
export * as vector3 from "./vector3";
export * as vector4 from "./vector4";
```
## matrix2
`matrix2.ts`
### Interfaces
```ts
interface Matrix2 {
  r00 : number;
  r01 : number;
  r10 : number;
  r11 : number;
}
```
### Functions
```ts
function Add(a:Matrix2, b:Matrix2) : Matrix2;  // A+B
function Concat(a:Matrix2, b:Matrix2) : Matrix2;  // AB
function Copy(m:Matrix2) : Matrix2;
function Identity() : Matrix2;  // Î
function Inverse(m:Matrix2) : Matrix2 | undefined;  // M⁻¹
function Rotation(rad:number) : Matrix2;  // R(θ)
function RotationVector2(v:Vector2) : Matrix2;  // [ v⃗  v⃗⊥ ]
function Scale(v:Vector2) : Matrix2;  // [ x̂v⃗₀  ŷv⃗₁ ]
function Shear(x:Vector2, y:Vector2) : Matrix2;  // [ x⃗  y⃗ ]
function ShearMatrix3(m:Matrix3) : Matrix2;  // [ m⁰ m¹ ]
function Subtract(a:Matrix2, b:Matrix2) : Matrix2;  // A-B
function Transpose(m:Matrix2) : Matrix2;  // Mᵀ
function add<R extends Matrix2>(r:R, a:Matrix2, b:Matrix2) : R;  // Mᵣ = A+B
function addAssign<R extends Matrix2>(a:R, b:Matrix2) : R;  // A = A+B
function concat<R extends Matrix2>(r:R, a:Matrix2, b:Matrix2) : R;  // Mᵣ = AB
function copy<R extends Matrix2>(r:R, m:Matrix2) : R;
function determinant(m:Matrix2) : number;  // |M|
function identity<R extends Matrix2>(r:R) : R;  // Mᵣ = Î
function inverse<R extends Matrix2>(r:R, m:Matrix2) : R | undefined;  // Mᵣ = M⁻¹
function rotation<R extends Matrix2>(r:R, rad:number) : R;  // Mᵣ = R(θ)
function rotationVector2<R extends Matrix2>(r:R, v:Vector2) : R;  // Mᵣ = [ v⃗  v⃗⊥ ]
function scale<R extends Matrix2>(r:R, v:Vector2) : R;  // Mᵣ = [ x̂v⃗₀  ŷv⃗₁ ]
function shear<R extends Matrix2>(r:R, x:Vector2, y:Vector2) : R;  // Mᵣ = [ x⃗  y⃗ ]
function shearMatrix3<R extends Matrix2>(r:R, m:Matrix3) : R;  // Mᵣ = [ m⁰ m¹ ]
function subtract<R extends Matrix2>(r:R, a:Matrix2, b:Matrix2) : R;  // Mᵣ = A-B
function subtractAssign<R extends Matrix2>(a:R, b:Matrix2) : R;  // A = A-B
function transpose<R extends Matrix2>(r:R, m:Matrix2) : R;  // Mᵣ = Mᵀ
```
## matrix3
`matrix3.ts`
### Interfaces
```ts
interface Matrix3 extends Matrix2 {
  r02 : number;
  r12 : number;
  r20 : number;
  r21 : number;
  r22 : number;
}
```
### Functions
```ts
function Add(a:Matrix3, b:Matrix3) : Matrix3;  // A+B
function Concat(a:Matrix3, b:Matrix3) : Matrix3;  // AB
function Concat2x3(a:Matrix3, b:Matrix3) : Matrix3;  // AB₂ₓ₃
function ConcatMatrix2(a:Matrix3, b:Matrix2) : Matrix3;  // AB₂ₓ₂
function ConcatScaleVector2(m:Matrix3, v:Vector2) : Matrix3;  // M[ x̂v⃗₀  ŷv⃗₁  ẑ ]
function ConcatTranslation(m:Matrix3, v:Vector2) : Matrix3;  // M[ x̂  ŷ  v⃗ ]
function Copy(m:Matrix3) : Matrix3;
function EulerXYZ(v:Vector3) : Matrix3;  // R(x̂, v⃗₀)R(ŷ, v⃗₁)R(ẑ, v⃗₂)
function EulerYXZ(v:Vector3) : Matrix3;  // R(ŷ, v⃗₁)R(x̂, v⃗₀)R(ẑ, v⃗₂)
function EulerZXY(v:Vector3) : Matrix3;  // R(ẑ, v⃗₂)R(x̂, v⃗₀)R(ŷ, v⃗₁)
function Identity() : Matrix3;  // Î
function Inverse(m:Matrix3) : Matrix3 | undefined;  // M⁻¹
function Quaternion(q:Vector4) : Matrix3;  // R(q̂)
function RotationAxis(v:Vector3, rad:number) : Matrix3;  // R(v⃗, θ)
function RotationVector3(x:Vector3, y:Vector3) : Matrix3;  // [ x⃗  y⃗  x⃗×y⃗ ]
function RotationX(rad:number) : Matrix3;  // R(x̂, θ)
function RotationY(rad:number) : Matrix3;  // R(ŷ, θ)
function RotationZ(rad:number) : Matrix3;  // R(ẑ, θ)
function RotationZMatrix2(m:Matrix2) : Matrix3;  // [ m⁰ m¹ ẑ ]
function RotationZVector2(x:Vector2) : Matrix3;  // [ x⃗  x⃗⊥  ẑ ]
function Scale(v:Vector3) : Matrix3;  // [ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂ ]
function ScaleVector2(v:Vector2) : Matrix3;  // [ x̂v⃗₀  ŷv⃗₁  ẑ ]
function Shear(x:Vector3, y:Vector3, z:Vector3) : Matrix3;  // [ x⃗  y⃗  z⃗ ]
function ShearMatrix4(m:Matrix4) : Matrix3;  // [ m⁰ m¹ m² ]
function ShearTranslation(x:Vector2, y:Vector2, t:Vector2) : Matrix3;  // [ x⃗  y⃗  ẑ+t⃗ ]
function ShearVector2(x:Vector2, y:Vector2) : Matrix3;  // [ x⃗  y⃗  ẑ ]
function Subtract(a:Matrix3, b:Matrix3) : Matrix3;  // A-B
function Translation(v:Vector2) : Matrix3;  // [ x̂  ŷ  ẑ+v⃗ ]
function Transpose(m:Matrix3) : Matrix3;  // Mᵀ
function add<R extends Matrix3>(r:R, a:Matrix3, b:Matrix3) : R;  // Mᵣ = A+B
function addAssign<R extends Matrix3>(a:R, b:Matrix3) : R;  // A = A+B
function concat<R extends Matrix3>(r:R, a:Matrix3, b:Matrix3) : R;  // Mᵣ = AB
function concat2x3<R extends Matrix3>(r:R, a:Matrix3, b:Matrix3) : R;  // Mᵣ = AB₂ₓ₃
function concatMatrix2<R extends Matrix3>(r:R, a:Matrix3, b:Matrix2) : R;  // Mᵣ = AB₂ₓ₂
function concatScaleVector2<R extends Matrix3>(r:R, m:Matrix3, v:Vector2) : R;  // Mᵣ = M[ x̂v⃗₀  ŷv⃗₁  ẑ ]
function concatTranslation<R extends Matrix3>(r:R, m:Matrix3, v:Vector2) : R;  // Mᵣ = M[ x̂  ŷ  v⃗ ]
function copy<R extends Matrix3>(r:R, m:Matrix3) : R;
function determinant(m:Matrix3) : number;  // |M|
function equals(a:Matrix3, b:Matrix3, e:number = epsilon) : boolean;
function eulerXYZ<R extends Matrix3>(r:R, v:Vector3) : R;  // Mᵣ = R(x̂, v⃗₀)R(ŷ, v⃗₁)R(ẑ, v⃗₂)
function eulerYXZ<R extends Matrix3>(r:R, v:Vector3) : R;  // Mᵣ = R(ŷ, v⃗₁)R(x̂, v⃗₀)R(ẑ, v⃗₂)
function eulerZXY<R extends Matrix3>(r:R, v:Vector3) : R;  // Mᵣ = R(ẑ, v⃗₂)R(x̂, v⃗₀)R(ŷ, v⃗₁)
function identity<R extends Matrix3>(r:R) : R;  // Mᵣ = Î
function inverse<R extends Matrix3>(r:R, m:Matrix3) : R | undefined;  // Mᵣ = M⁻¹
function quaternion<R extends Matrix3>(r:R, q:Vector4) : R;  // Mᵣ = R(q̂)
function rotationAxis<R extends Matrix3>(r:R, v:Vector3, rad:number) : R;  // Mᵣ = R(v⃗, θ)
function rotationVector3<R extends Matrix3>(r:R, x:Vector3, y:Vector3) : R;  // Mᵣ = [ x⃗  y⃗  x⃗×y⃗ ]
function rotationX<R extends Matrix3>(r:R, rad:number) : R;  // Mᵣ = R(x̂, θ)
function rotationY<R extends Matrix3>(r:R, rad:number) : R;  // Mᵣ = R(ŷ, θ)
function rotationZ<R extends Matrix3>(r:R, rad:number) : R;  // Mᵣ = R(ẑ, θ)
function rotationZMatrix2<R extends Matrix3>(r:R, m:Matrix2) : R;  // Mᵣ = [ m⁰ m¹ ẑ ]
function rotationZVector2<R extends Matrix3>(r:R, x:Vector2) : R;  // Mᵣ = [ x⃗  x⃗⊥  ẑ ]
function scale<R extends Matrix3>(r:R, v:Vector3) : R;  // Mᵣ = [ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂ ]
function scaleVector2<R extends Matrix3>(r:R, v:Vector2) : R;  // Mᵣ = [ x̂v⃗₀  ŷv⃗₁  ẑ ]
function shear<R extends Matrix3>(r:R, x:Vector3, y:Vector3, z:Vector3) : R;  // Mᵣ = [ x⃗  y⃗  z⃗ ]
function shearMatrix4<R extends Matrix3>(r:R, m:Matrix4) : R;  // Mᵣ = [ m⁰ m¹ m² ]
function shearTranslation<R extends Matrix3>(r:R, x:Vector2, y:Vector2, t:Vector2) : R;  // Mᵣ = [ x⃗  y⃗  ẑ+t⃗ ]
function shearVector2<R extends Matrix3>(r:R, x:Vector2, y:Vector2) : R;  // Mᵣ = [ x⃗  y⃗  ẑ ]
function subtract<R extends Matrix3>(r:R, a:Matrix3, b:Matrix3) : R;  // Mᵣ = A-B
function subtractAssign<R extends Matrix3>(a:R, b:Matrix3) : R;  // A = A-B
function translation<R extends Matrix3>(r:R, v:Vector2) : R;  // Mᵣ = [ x̂  ŷ  ẑ+v⃗ ]
function transpose<R extends Matrix3>(r:R, m:Matrix3) : R;  // Mᵣ = Mᵀ
```
## matrix4
`matrix4.ts`
### Interfaces
```ts
interface Matrix4 extends Matrix3 {
  r03 : number;
  r13 : number;
  r23 : number;
  r30 : number;
  r31 : number;
  r32 : number;
  r33 : number;
}
```
### Functions
```ts
function Add(a:Matrix4, b:Matrix4) : Matrix4;  // A+B
function ColumnF32(n:Float32Array) : Matrix4;
function ColumnF64(n:Float64Array) : Matrix4;
function Concat(a:Matrix4, b:Matrix4) : Matrix4;  // AB
function Concat3x4(a:Matrix4, b:Matrix4) : Matrix4;  // AB₃ₓ₄
function ConcatMatrix3(a:Matrix4, b:Matrix3) : Matrix4;  // AB₃ₓ₃
function ConcatScale(m:Matrix4, v:Vector3) : Matrix4;  // M[ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂  ŵ ]
function ConcatTranslation(m:Matrix4, v:Vector3) : Matrix4;  // M[ x̂  ŷ  ẑ  ŵ+v⃗ ]
function Copy(m:Matrix4) : Matrix4;
function Identity() : Matrix4;  // Î
function Inverse(m:Matrix4) : Matrix4 | undefined;  // M⁻¹ (using the determinant)
function Inverse3x4(m:Matrix4) : Matrix4 | undefined;  // [ m⁰ m¹ m² ŵ+m³ ]⁻¹
function InverseGauss(m:Matrix4) : Matrix4 | undefined;  // M⁻¹ (using Gauss-Jordon elimination)
function ShearMatrix3(m:Matrix3) : Matrix4;  // [ m⁰ m¹ m² ŵ ]
function ShearTranslation(x:Vector3, y:Vector3, z:Vector3, t:Vector3) : Matrix4;  // [ x⃗  y⃗  z⃗  ŵ+t⃗ ]
function Subtract(a:Matrix4, b:Matrix4) : Matrix4;  // A-B
function Translation(v:Vector3) : Matrix4;  // [ x̂  ŷ  ẑ  ŵ+v⃗ ]
function Transpose(m:Matrix4) : Matrix4;  // Mᵀ
function add<R extends Matrix4>(r:R, a:Matrix4, b:Matrix4) : R;  // Mᵣ = A+B
function addAssign<R extends Matrix4>(a:R, b:Matrix4) : R;  // A = A+B
function assignColumnF32(r:Float32Array, m:Matrix4) : Float32Array;
function assignColumnF64(r:Float64Array, m:Matrix4) : Float64Array;
function columnF32<R extends Matrix4>(r:R, n:Float32Array) : R;
function columnF64<R extends Matrix4>(r:R, n:Float64Array) : R;
function concat<R extends Matrix4>(r:R, a:Matrix4, b:Matrix4) : R;  // Mᵣ = AB
function concat3x4<R extends Matrix4>(r:R, a:Matrix4, b:Matrix4) : R;  // Mᵣ = AB₃ₓ₄
function concatMatrix3<R extends Matrix4>(r:R, a:Matrix4, b:Matrix3) : R;  // Mᵣ = AB₃ₓ₃
function concatScale<R extends Matrix4>(r:R, m:Matrix4, v:Vector3) : R;  // Mᵣ = M[ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂  ŵ ]
function concatTranslation<R extends Matrix4>(r:R, m:Matrix4, v:Vector3) : R;  // Mᵣ = M[ x̂  ŷ  ẑ  ŵ+v⃗ ]
function copy<R extends Matrix4>(r:R, m:Matrix4) : R;
function determinant(m:Matrix4) : number;  // |M|
function equals(a:Matrix4, b:Matrix4, e:number = epsilon) : boolean;
function identity<R extends Matrix4>(r:R) : R;  // Mᵣ = Î
function inverse<R extends Matrix4>(r:R, m:Matrix4) : R | undefined;  // Mᵣ = M⁻¹ (using the determinant)
function inverse3x4<R extends Matrix4>(r:R, m:Matrix4) : R | undefined;  // Mᵣ = [ m⁰ m¹ m² ŵ+m³ ]⁻¹
function inverseGauss<R extends Matrix4>(r:R, m:Matrix4) : R | undefined;  // Mᵣ = M⁻¹ (using Gauss-Jordan elimination)
function shearMatrix3<R extends Matrix4>(r:R, m:Matrix3) : R;  // Mᵣ = [ m⁰ m¹ m² ŵ ]
function shearTranslation<R extends Matrix4>(r:R, x:Vector3, y:Vector3, z:Vector3, t:Vector3) : R;  // Mᵣ = [ x⃗  y⃗  z⃗  ŵ+t⃗ ]
function subtract<R extends Matrix4>(r:R, a:Matrix4, b:Matrix4) : R;  // Mᵣ = A-B
function subtractAssign<R extends Matrix4>(a:R, b:Matrix4) : R;  // A = A-B
function toColumnF32(m:Matrix4) : Float32Array;
function toColumnF64(m:Matrix4) : Float64Array;
function translation<R extends Matrix4>(r:R, v:Vector3) : R;  // Mᵣ = [ x̂  ŷ  ẑ  ŵ+v⃗ ]
function transpose<R extends Matrix4>(r:R, m:Matrix4) : R;  // Mᵣ = Mᵀ
```
## matrix4Frustrum
`matrix4Frustrum.ts`
### Interfaces
```ts
interface PerspectiveLens {
  readonly aspect : number;
  readonly far : number;
  readonly fov : number;
  readonly near : number;
}
```
### Functions
```ts
function Frustrum(lens:PerspectiveLens) : Matrix4;
function frustrum<R extends Matrix4>(r:R, lens:PerspectiveLens) : R;
```
## matrix4Ortho
`matrix4Ortho.ts`
### Interfaces
```ts
interface OrthographicLens {
  readonly aspect : number;
  readonly extend : number;
  readonly far : number;
  readonly near : number;
}
```
### Functions
```ts
function Ortho(lens:OrthographicLens) : Matrix4;
function ortho<R extends Matrix4>(r:R, lens:OrthographicLens) : R;
```
## strings
`strings.ts`
### Interfaces
```ts
interface StringifyOptions<T> extends StringifyOptionsCommon {
  readonly clampMax : VectorRecord<T>;
  readonly clampMin : VectorRecord<T>;
}
```
### Type Aliases
```ts
type stringify = (v:VectorRecord<T>) => string;
```
### Variables
```ts
const PRECISION_SAFE:number;
const stringifyDefaultsCommon:StringifyOptionsCommon;
```
### Functions
```ts
function stringify<T>(opts:StringifyOptions<T>, v:VectorRecord<T>) : string;
```
## vector2
`vector2.ts`
### Interfaces
```ts
interface Vector2 {
  x : number;
  y : number;
}
```
### Functions
```ts
function Add(v:Vector2, w:Vector2) : Vector2;  // v⃗+w⃗
function AxisX(s:number = 1.0) : Vector2;  // sx̂
function AxisY(s:number = 1.0) : Vector2;  // sŷ
function BarycentricUV(vx0:Vector2, vx1:Vector2, vx2:Vector2, u:number, v:number) : Vector2;  // Return the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2)
function Copy(v:Vector2) : Vector2;
function Create(x:number = 0.0, y:number = 0.0) : Vector2;
function Hadamard(v:Vector2, w:Vector2) : Vector2;  // v⃗⊙w⃗
function HadamardInvert<R extends Vector2>(r:R, v:Vector2) : R;  // r⃗ = 1⁄v⃗
function Lerp(v:Vector2, w:Vector2, t:number) : Vector2;  // v⃗ + ( w⃗ - v⃗ ) * t
function Multiply2x3Matrix3(m:Matrix3, v:Vector2) : Vector2;  // M₂ₓ₃v⃗
function MultiplyMatrix2(m:Matrix2, v:Vector2) : Vector2;  // M₂ₓ₂v⃗
function MultiplyMatrix3(m:Matrix3, v:Vector2) : Vector2;  // M₃ₓ₃v⃗
function MultiplyScalar(v:Vector2, n:number) : Vector2;  // nv⃗
function Negate(v:Vector2) : Vector2;  // -v⃗
function Normalize(v:Vector2) : Vector2;  // v̂
function Perpendicular(v:Vector2) : Vector2;  // v⃗⊥
function Project(v:Vector2, w:Vector2) : Vector2;  // Return the projection of w⃗ onto v⃗, (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
function Reflect(v:Vector2, w:Vector2) : Vector2;  // Return the reflection of w⃗ against v⃗, 2(v⃗⋅w⃗ )w⃗-v⃗
function Rotation(rad:number) : Vector2;
function Subtract(v:Vector2, w:Vector2) : Vector2;  // v⃗-w⃗
function add<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R;  // r⃗ = v⃗+w⃗
function addAssign<R extends Vector2>(v:R, w:Vector2) : R;  // v⃗ = v⃗+w⃗
function assign<R extends Vector2>(r:R, x:number = 0.0, y:number = 0.0) : R;
function axisX<R extends Vector2>(r:R, s:number = 1.0) : R;  // r⃗ = sx̂
function axisY<R extends Vector2>(r:R, s:number = 1.0) : R;  // r⃗ = sŷ
function barycentricUV<R extends Vector2>(r:R, vx0:Vector2, vx1:Vector2, vx2:Vector2, u:number, v:number) : R;  // Assign the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2) to r⃗
function copy<R extends Vector2>(r:R, v:Vector2) : R;
function createStringifier(opts?:Partial<StringifyOptions<Vector2>>) : stringify<Vector2>;
function cross(v:Vector2, w:Vector2) : number;  // v⃗×w⃗
function dot(v:Vector2, w:Vector2) : number;  // v⃗⋅w⃗
function equals(v:Vector2, w:Vector2, e:number = epsilon) : boolean;
function hadamard<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R;  // r⃗ = v⃗⊙w⃗
function hadamardAssign<R extends Vector2>(v:R, w:Vector2) : R;  // v⃗ = v⃗⊙w⃗
function hadamardInvert(v:Vector2) : Vector2;  // 1⁄v⃗
function lerp<R extends Vector2>(r:R, v:Vector2, w:Vector2, t:number) : R;  // r⃗ = v⃗ + (w⃗ - v⃗ ) * t
function lerpAssign<R extends Vector2>(v:R, w:Vector2, t:number) : R;  // v⃗ = v⃗ + (w⃗ - v⃗ ) * t
function multiply2x3Matrix3<R extends Vector2>(r:R, m:Matrix3, v:Vector2) : R;  // r⃗ = M₂ₓ₃v⃗
function multiplyAssignScalar<R extends Vector2>(v:R, n:number) : R;  // v⃗ = nv⃗
function multiplyMatrix2<R extends Vector2>(r:R, m:Matrix2, v:Vector2) : R;  // r⃗ = M₂ₓ₂v⃗
function multiplyMatrix3<R extends Vector2>(r:R, m:Matrix3, v:Vector2) : R;  // r⃗ = M₃ₓ₃v⃗
function multiplyScalar<R extends Vector2>(r:R, v:Vector2, n:number) : R;  // r⃗ = nv⃗
function negate<R extends Vector2>(r:R, v:Vector2) : R;  // r⃗ = -v⃗
function negateAssign<R extends Vector2>(v:R) : R;  // v⃗ = -v⃗
function norm(v:Vector2) : number;  // ‖ v⃗ ‖
function normSquared(v:Vector2) : number;  // ‖ v⃗ ‖²
function normalize<R extends Vector2>(r:R, v:Vector2) : R;  // r⃗ = v̂
function perpendicular<R extends Vector2>(r:R, v:Vector2) : R;  // r⃗ = v⃗⊥
function project<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R;  // Assign the projection of w⃗ onto v⃗ to r⃗, r⃗ = (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
function radians(v:Vector2, w:Vector2) : number;  // acos(v⃗⋅w⃗ )
function reflect<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R;  // Assign the reflection of w⃗ against v⃗, r⃗ = 2(v⃗⋅w⃗ )w⃗-v⃗
function rotation<R extends Vector2>(r:R, rad:number) : R;
function subtract<R extends Vector2>(r:R, v:Vector2, w:Vector2) : R;  // r⃗ = v⃗-w⃗
function subtractAssign<R extends Vector2>(v:R, w:Vector2) : R;  // v⃗ = v⃗-w⃗
```
## vector3
`vector3.ts`
### Interfaces
```ts
interface Vector3 extends Vector2 {
  z : number;
}
```
### Functions
```ts
function Add(v:Vector3, w:Vector3) : Vector3;  // v⃗+w⃗
function AxisX(s:number = 1.0) : Vector3;  // sx̂
function AxisY(s:number = 1.0) : Vector3;  // sŷ
function AxisZ(s:number = 1.0) : Vector3;  // sẑ
function BarycentricUV(vx0:Vector3, vx1:Vector3, vx2:Vector3, u:number, v:number) : Vector3;  // Return the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2)
// @deprecated use same function in xyzw-rgba instead
function ClampScalar(v:Vector3, a:number, b:number) : Vector3;  // min(max(v⃗, min(a, b)), max(a, b))
function Copy(v:Vector3) : Vector3;
function Create(x:number = 0.0, y:number = 0.0, z:number = 0.0) : Vector3;
function Cross(v:Vector3, w:Vector3) : Vector3;  // v⃗×w⃗
function EulerXYZ(m:Matrix3) : Vector3;
function EulerYXZ(m:Matrix3) : Vector3;
function EulerZXY(m:Matrix3) : Vector3;
function F32(n:Float32Array, offset:number = 0) : Vector3;
function F64(n:Float64Array, offset:number = 0) : Vector3;
function Hadamard(v:Vector3, w:Vector3) : Vector3;  // v⃗⊙w⃗
function Lerp(v:Vector3, w:Vector3, t:number) : Vector3;  // v⃗ + ( w⃗ - v⃗ ) * t
// @deprecated use same function in xyzw-rgba instead
function MaxScalar(v:Vector3, n:number) : Vector3;  // max(v⃗, n)
// @deprecated use same function in xyzw-rgba instead
function MinScalar(v:Vector3, n:number) : Vector3;  // min(v⃗, n)
function Multiply3x4Matrix4(m:Matrix4, v:Vector3) : Vector3;  // M₃ₓ₄v⃗
function MultiplyMatrix3(m:Matrix3, v:Vector3) : Vector3;  // M₃ₓ₃v⃗
function MultiplyMatrix4(m:Matrix4, v:Vector3) : Vector3;  // M₄ₓ₄v⃗
function MultiplyScalar(v:Vector3, n:number) : Vector3;  // nv⃗
function Negate(v:Vector3) : Vector3;  // -v⃗
function Normalize(v:Vector3) : Vector3;  // v̂
function OrthoNormalize(v:Vector3, w:Vector3) : Vector3;  // w⃗ - (w⃗⋅v⃗ )v⃗
function Project(v:Vector3, w:Vector3) : Vector3;  // Return the projection of w⃗ onto v⃗, (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
function Reflect(v:Vector3, w:Vector3) : Vector3;  // Return the reflection of w⃗ against v⃗, 2(v⃗⋅w⃗ )w⃗-v⃗
function Subtract(v:Vector3, w:Vector3) : Vector3;  // v⃗-w⃗
function add<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R;  // r⃗ = v⃗+w⃗
function addAssign<R extends Vector3>(v:R, w:Vector3) : R;  // v⃗ = v⃗+w⃗
function assign<R extends Vector3>(r:R, x:number = 0.0, y:number = 0.0, z:number = 0.0) : R;
function assignF32(r:Float32Array, v:Vector3, offset:number = 0) : Float32Array;
function assignF64(r:Float64Array, v:Vector3, offset:number = 0) : Float64Array;
function axisX<R extends Vector3>(r:R, s:number = 1.0) : R;  // r⃗ = sx̂
function axisY<R extends Vector3>(r:R, s:number = 1.0) : R;  // r⃗ = sŷ
function axisZ<R extends Vector3>(r:R, s:number = 1.0) : R;  // r⃗ = sẑ
function azimuth(v:Vector3, w:Vector3, z:Vector3) : number;  // Return the cosine of azimuth angle ϕ between v̂ and ŵ against polar axis ẑ, ( (v̂ - (v̂⋅ẑ)ẑ) / ‖ v̂ - (v̂⋅ẑ)ẑ ‖ )⋅( (ŵ - (ŵ⋅ẑ)ẑ) / ‖ ŵ - (ŵ⋅ẑ)ẑ ‖ )
function barycentricUV<R extends Vector3>(r:R, vx0:Vector3, vx1:Vector3, vx2:Vector3, u:number, v:number) : R;  // Assign the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2) to r⃗
// @deprecated use same function in xyzw-rgba instead
function clampScalar<R extends Vector3>(r:R, v:Vector3, a:number, b:number) : R;  // r⃗ = min(max(v⃗, min(a, b)), max(a, b))
function copy<R extends Vector3>(r:R, v:Vector3) : R;
function createStringifier(opts?:Partial<StringifyOptions<Vector3>>) : stringify<Vector3>;
function cross<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R;  // r⃗ = v⃗×w⃗
function dot(v:Vector3, w:Vector3) : number;  // v⃗⋅w⃗
function equals(v:Vector3, w:Vector3, e:number = epsilon) : boolean;
function eulerXYZ<R extends Vector3>(r:R, m:Matrix3) : R;
function eulerYXZ<R extends Vector3>(r:R, m:Matrix3) : R;
function eulerZXY<R extends Vector3>(r:R, m:Matrix3) : R;
function f32<R extends Vector3>(r:R, n:Float32Array, offset:number = 0) : R;
function f64<R extends Vector3>(r:R, n:Float64Array, offset:number = 0) : R;
function hadamard<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R;  // r⃗ = v⃗⊙w⃗
function hadamardAssign<R extends Vector3>(v:R, w:Vector3) : R;  // v⃗ = v⃗⊙w⃗
function isNormEqual(v:Vector3, n:number, e:number = epsilon) : boolean;  // ‖ v⃗ ‖ - n < ϵ
function isNormGt(v:Vector3, n:number) : boolean;  // ‖ v⃗ ‖ > n
function isNormLt(v:Vector3, n:number) : boolean;  // ‖ v⃗ ‖ < n
function lerp<R extends Vector3>(r:R, v:Vector3, w:Vector3, t:number) : R;  // r⃗ = v⃗ + (w⃗ - v⃗ ) * t
function lerpAssign<R extends Vector3>(v:R, w:Vector3, t:number) : R;  // v⃗ = v⃗ + (w⃗ - v⃗ ) * t
// @deprecated use same function in xyzw-rgba instead
function maxScalar<R extends Vector3>(r:R, v:Vector3, n:number) : R;  // r⃗ = max(v⃗, n)
// @deprecated use same function in xyzw-rgba instead
function minScalar<R extends Vector3>(r:R, v:Vector3, n:number) : R;  // r⃗ = min(v⃗, n)
function multiply3x4Matrix4<R extends Vector3>(r:R, m:Matrix4, v:Vector3) : R;  // r⃗ = M₃ₓ₄v⃗
function multiplyAssignScalar<R extends Vector3>(v:R, n:number) : R;  // v⃗ = nv⃗
function multiplyMatrix3<R extends Vector3>(r:R, m:Matrix3, v:Vector3) : R;  // r⃗ = M₃ₓ₃v⃗
function multiplyMatrix4<R extends Vector3>(r:R, m:Matrix4, v:Vector3) : R;  // r⃗ = M₄ₓ₄v⃗
function multiplyScalar<R extends Vector3>(r:R, v:Vector3, n:number) : R;  // r⃗ = nv⃗
function negate<R extends Vector3>(r:R, v:Vector3) : R;  // r⃗ = -v⃗
function negateAssign<R extends Vector3>(v:R) : R;  // v⃗ = -v⃗
function norm(v:Vector3) : number;  // ‖ v⃗ ‖
function normSquared(v:Vector3) : number;  // ‖ v⃗ ‖²
function normalize<R extends Vector3>(r:R, v:Vector3) : R;  // r⃗ = v̂
function orthoNormalize<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R;  // r⃗ = w⃗ - (w⃗⋅v⃗ )v⃗
function project<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R;  // Assign the projection of w⃗ onto v⃗ to r⃗, r⃗ = (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
function reflect<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R;  // Assign the reflection of w⃗ against v⃗, r⃗ = 2(v⃗⋅w⃗ )w⃗-v⃗
function subtract<R extends Vector3>(r:R, v:Vector3, w:Vector3) : R;  // r⃗ = v⃗-w⃗
function subtractAssign<R extends Vector3>(v:R, w:Vector3) : R;  // v⃗ = v⃗-w⃗
function toF32(v:Vector3) : Float32Array;
function toF64(v:Vector3) : Float64Array;
```
## vector4
`vector4.ts`
### Interfaces
```ts
interface Vector4 extends Vector3 {
  w : number;
}
```
### Functions
```ts
function Add(v:Vector4, w:Vector4) : Vector4;  // v⃗+w⃗
function Conjugate(v:Vector4) : Vector4;  // q⃗′
function Copy(v:Vector4) : Vector4;
function Create(x:number = 0.0, y:number = 0.0, z:number = 0.0, w:number = 1.0) : Vector4;
function F32(n:Float32Array, offset:number = 0) : Vector4;
function F64(n:Float64Array, offset:number = 0) : Vector4;
function Hadamard(v:Vector4, w:Vector4) : Vector4;  // v⃗⊙w⃗
function Inverse(v:Vector4) : Vector4 | undefined;  // q⃗⁻¹
function MultiplyScalar(v:Vector4, n:number) : Vector4;  // nv⃗
function Normalize(v:Vector4) : Vector4;  // v̂
function Outer(v:Vector4, w:Vector4) : Vector4;  // v⃗w⃗
function RotationAxis(v:Vector3, rad:number) : Vector4;  // q̂(v⃗, θ)
function RotationMatrix3(m:Matrix3) : Vector4;  // q̂(M)
function RotationSlerp(v:Vector4, w:Vector4, t:number) : Vector4;  // v̂(ŵ⁻¹v̂)ᵗ
function Subtract(v:Vector4, w:Vector4) : Vector4;  // v⃗-w⃗
function Vector3(v:Vector3, w:number = 1.0) : Vector4;  // ŵ+v⃗
function add<R extends Vector4>(r:R, v:Vector4, w:Vector4) : R;  // r⃗ = v⃗+w⃗
function addAssign<R extends Vector4>(v:R, w:Vector4) : R;  // v⃗ = v⃗+w⃗
function assign<R extends Vector4>(r:R, x:number = 0.0, y:number = 0.0, z:number = 0.0, w:number = 1.0) : R;
function assignF32(r:Float32Array, v:Vector4, offset:number = 0) : Float32Array;
function assignF64(r:Float64Array, v:Vector4, offset:number = 0) : Float64Array;
function conjugate<R extends Vector4>(r:R, v:Vector4) : R;  // r⃗ = q⃗′
function copy<R extends Vector4>(r:R, v:Vector4) : R;
function createStringifier(opts?:Partial<StringifyOptions<Vector4>>) : stringify<Vector4>;
function dot(v:Vector4, w:Vector4) : number;  // v⃗⋅w⃗
function equals(v:Vector4, w:Vector4, e:number = epsilon) : boolean;
function f32<R extends Vector4>(r:R, n:Float32Array, offset:number = 0) : R;
function f64<R extends Vector4>(r:R, n:Float64Array, offset:number = 0) : R;
function hadamard<R extends Vector4>(r:R, v:Vector4, w:Vector4) : R;  // r⃗ = v⃗⊙w⃗
function hadamardAssign<R extends Vector4>(v:R, w:Vector4) : R;  // v⃗ = v⃗⊙w⃗
function inverse<R extends Vector4>(r:R, v:Vector4) : R | undefined;  // r⃗ = q⃗⁻¹
function multiplyAssignScalar<R extends Vector4>(v:R, n:number) : R;  // v⃗ = nv⃗
function multiplyScalar<R extends Vector4>(r:R, v:Vector4, n:number) : R;  // r⃗ = nv⃗
function norm(v:Vector4) : number;  // ‖ v⃗ ‖
function normSquared(v:Vector4) : number;  // ‖ v⃗ ‖²
function normalize<R extends Vector4>(r:R, v:Vector4) : R;  // r⃗ = v̂
function outer<R extends Vector4>(r:R, v:Vector4, w:Vector4) : R;  // r⃗ = v⃗w⃗
function rotationAxis<R extends Vector4>(r:R, v:Vector3, rad:number) : R;  // r⃗ = q̂(v⃗, θ)
function rotationMatrix3<R extends Vector4>(r:R, m:Matrix3) : R;  // r⃗ = q̂(M)
function rotationSlerp<R extends Vector4>(r:R, v:Vector4, w:Vector4, t:number) : R;  // r⃗ = v̂(ŵ⁻¹v̂)ᵗ
function subtract<R extends Vector4>(r:R, v:Vector4, w:Vector4) : R;  // r⃗ = v⃗-w⃗
function subtractAssign<R extends Vector4>(v:R, w:Vector4) : R;  // v⃗ = v⃗-w⃗
function toF32(v:Vector4) : Float32Array;
function toF64(v:Vector4) : Float64Array;
function vector3<R extends Vector4>(r:R, v:Vector3, w:number = 1.0) : R;  // r⃗ = ŵ+v⃗
```
