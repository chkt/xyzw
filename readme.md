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
assert.nonStrictEqual(vec2, v);
```

The fastest operations additionally have an assignment form roughly equivalent to primitive type assignment operations (`a += b`).

```ts
const u = vector2.AddAssign(v, w);  // v += w

assert.strictEqual(u, v);
assert.nonStrictEqual(w, v);
```


# Modules

## index
`index.ts`

### References
```ts
  export matrix2 from './matrix2';
  export matrix3 from './matrix3';
  export matrix4 from './matrix4';
  export matrix4Frustrum from './matrix4Frustrum';
  export matrix4Ortho from './matrix4Ortho';
  export vector2 from './vector2';
  export vector3 from './vector3';
  export vector4 from './vector4';
```

## matrix2
`matrix2.ts`

### Interfaces
```ts
interface Matrix2 {
  r00 : number,
  r01 : number,
  r10 : number,
  r11 : number
}

```

### Functions
```ts
function Add(a:Matrix2, b:Matrix2) : Matrix2;  // A+B
function Concat(a:Matrix2, b:Matrix2) : Matrix2;  // AB
function Copy(m:Matrix2) : Matrix2;
function Identity() : Matrix2;  // Î
function Inverse(m:Matrix2) : Matrix2 | void;  // M⁻¹
function Rotation(rad:number) : Matrix2;  // R(θ)
function RotationVector2(v:Vector2) : Matrix2;  // [ v⃗  v⃗⊥ ]
function Scale(v:Vector2) : Matrix2;  // [ x̂v⃗₀  ŷv⃗₁ ]
function Shear(x:Vector2, y:Vector2) : Matrix2;  // [ x⃗  y⃗ ]
function ShearMatrix3(m:Matrix3) : Matrix2;  // [ m⁰ m¹ ]
function Subtract(a:Matrix2, b:Matrix2) : Matrix2;  // A-B
function Transpose(m:Matrix2) : Matrix2;  // Mᵀ
function add(r:Matrix2, a:Matrix2, b:Matrix2) : Matrix2;  // Mᵣ = A+B
function addAssign(a:Matrix2, b:Matrix2) : Matrix2;  // A = A+B
function concat(r:Matrix2, a:Matrix2, b:Matrix2) : Matrix2;  // Mᵣ = AB
function copy(r:Matrix2, m:Matrix2) : Matrix2;
function determinant(m:Matrix2) : number;  // |M|
function identity(r:Matrix2) : Matrix2;  // Mᵣ = Î
function inverse(r:Matrix2, m:Matrix2) : Matrix2 | void;  // Mᵣ = M⁻¹
function rotation(r:Matrix2, rad:number) : Matrix2;  // Mᵣ = R(θ)
function rotationVector2(r:Matrix2, v:Vector2) : Matrix2;  // Mᵣ = [ v⃗  v⃗⊥ ]
function scale(r:Matrix2, v:Vector2) : Matrix2;  // Mᵣ = [ x̂v⃗₀  ŷv⃗₁ ]
function shear(r:Matrix2, x:Vector2, y:Vector2) : Matrix2;  // Mᵣ = [ x⃗  y⃗ ]
function shearMatrix3(r:Matrix2, m:Matrix3) : Matrix2;  // Mᵣ = [ m⁰ m¹ ]
function subtract(r:Matrix2, a:Matrix2, b:Matrix2) : Matrix2;  // Mᵣ = A-B
function subtractAssign(a:Matrix2, b:Matrix2) : Matrix2;  // A = A-B
function transpose(r:Matrix2, m:Matrix2) : Matrix2;  // Mᵣ = Mᵀ
```

## matrix3
`matrix3.ts`

### Interfaces
```ts
interface Matrix3 extends Matrix2 {
  r02 : number,
  r12 : number,
  r20 : number,
  r21 : number,
  r22 : number
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
function Inverse(m:Matrix3) : Matrix3 | void;  // M⁻¹
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
function add(r:Matrix3, a:Matrix3, b:Matrix3) : Matrix3;  // Mᵣ = A+B
function addAssign(a:Matrix3, b:Matrix3) : Matrix3;  // A = A+B
function concat(r:Matrix3, a:Matrix3, b:Matrix3) : Matrix3;  // Mᵣ = AB
function concat2x3(r:Matrix3, a:Matrix3, b:Matrix3) : Matrix3;  // Mᵣ = AB₂ₓ₃
function concatMatrix2(r:Matrix3, a:Matrix3, b:Matrix2) : Matrix3;  // Mᵣ = AB₂ₓ₂
function concatScaleVector2(r:Matrix3, m:Matrix3, v:Vector2) : Matrix3;  // Mᵣ = M[ x̂v⃗₀  ŷv⃗₁  ẑ ]
function concatTranslation(r:Matrix3, m:Matrix3, v:Vector2) : Matrix3;  // Mᵣ = M[ x̂  ŷ  v⃗ ]
function copy(r:Matrix3, m:Matrix3) : Matrix3;
function determinant(m:Matrix3) : number;  // |M|
function equals(a:Matrix3, b:Matrix3, e?:number) : boolean;
function eulerXYZ(r:Matrix3, v:Vector3) : Matrix3;  // Mᵣ = R(x̂, v⃗₀)R(ŷ, v⃗₁)R(ẑ, v⃗₂)
function eulerYXZ(r:Matrix3, v:Vector3) : Matrix3;  // Mᵣ = R(ŷ, v⃗₁)R(x̂, v⃗₀)R(ẑ, v⃗₂)
function eulerZXY(r:Matrix3, v:Vector3) : Matrix3;  // Mᵣ = R(ẑ, v⃗₂)R(x̂, v⃗₀)R(ŷ, v⃗₁)
function identity(r:Matrix3) : Matrix3;  // Mᵣ = Î
function inverse(r:Matrix3, m:Matrix3) : Matrix3 | void;  // Mᵣ = M⁻¹
function quaternion(r:Matrix3, q:Vector4) : Matrix3;  // Mᵣ = R(q̂)
function rotationAxis(r:Matrix3, v:Vector3, rad:number) : Matrix3;  // Mᵣ = R(v⃗, θ)
function rotationVector3(r:Matrix3, x:Vector3, y:Vector3) : Matrix3;  // Mᵣ = [ x⃗  y⃗  x⃗×y⃗ ]
function rotationX(r:Matrix3, rad:number) : Matrix3;  // Mᵣ = R(x̂, θ)
function rotationY(r:Matrix3, rad:number) : Matrix3;  // Mᵣ = R(ŷ, θ)
function rotationZ(r:Matrix3, rad:number) : Matrix3;  // Mᵣ = R(ẑ, θ)
function rotationZMatrix2(r:Matrix3, m:Matrix2) : Matrix3;  // Mᵣ = [ m⁰ m¹ ẑ ]
function rotationZVector2(r:Matrix3, x:Vector2) : Matrix3;  // Mᵣ = [ x⃗  x⃗⊥  ẑ ]
function scale(r:Matrix3, v:Vector3) : Matrix3;  // Mᵣ = [ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂ ]
function scaleVector2(r:Matrix3, v:Vector2) : Matrix3;  // Mᵣ = [ x̂v⃗₀  ŷv⃗₁  ẑ ]
function shear(r:Matrix3, x:Vector3, y:Vector3, z:Vector3) : Matrix3;  // Mᵣ = [ x⃗  y⃗  z⃗ ]
function shearMatrix4(r:Matrix3, m:Matrix4) : Matrix3;  // Mᵣ = [ m⁰ m¹ m² ]
function shearTranslation(r:Matrix3, x:Vector2, y:Vector2, t:Vector2) : Matrix3;  // Mᵣ = [ x⃗  y⃗  ẑ+t⃗ ]
function shearVector2(r:Matrix3, x:Vector2, y:Vector2) : Matrix3;  // Mᵣ = [ x⃗  y⃗  ẑ ]
function subtract(r:Matrix3, a:Matrix3, b:Matrix3) : Matrix3;  // Mᵣ = A-B
function subtractAssign(a:Matrix3, b:Matrix3) : Matrix3;  // A = A-B
function translation(r:Matrix3, v:Vector2) : Matrix3;  // Mᵣ = [ x̂  ŷ  ẑ+v⃗ ]
function transpose(r:Matrix3, m:Matrix3) : Matrix3;  // Mᵣ = Mᵀ
```

## matrix4
`matrix4.ts`

### Interfaces
```ts
interface Matrix4 extends Matrix3 {
  r03 : number,
  r13 : number,
  r23 : number,
  r30 : number,
  r31 : number,
  r32 : number,
  r33 : number
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
function Inverse(m:Matrix4) : Matrix4 | void;  // M⁻¹ (using the determinant)
function Inverse3x4(m:Matrix4) : Matrix4 | void;  // [ m⁰ m¹ m² ŵ+m³ ]⁻¹
function InverseGauss(m:Matrix4) : Matrix4 | void;  // M⁻¹ (using Gauss-Jordon elimination)
function ShearMatrix3(m:Matrix3) : Matrix4;  // [ m⁰ m¹ m² ŵ ]
function ShearTranslation(x:Vector3, y:Vector3, z:Vector3, t:Vector3) : Matrix4;  // [ x⃗  y⃗  z⃗  ŵ+t⃗ ]
function Subtract(a:Matrix4, b:Matrix4) : Matrix4;  // A-B
function Translation(v:Vector3) : Matrix4;  // [ x̂  ŷ  ẑ  ŵ+v⃗ ]
function Transpose(m:Matrix4) : Matrix4;  // Mᵀ
function add(r:Matrix4, a:Matrix4, b:Matrix4) : Matrix4;  // Mᵣ = A+B
function addAssign(a:Matrix4, b:Matrix4) : Matrix4;  // A = A+B
function assignColumnF32(r:Float32Array, m:Matrix4) : Float32Array;
function assignColumnF64(r:Float64Array, m:Matrix4) : Float64Array;
function columnF32(r:Matrix4, n:Float32Array) : Matrix4;
function columnF64(r:Matrix4, n:Float64Array) : Matrix4;
function concat(r:Matrix4, a:Matrix4, b:Matrix4) : Matrix4;  // Mᵣ = AB
function concat3x4(r:Matrix4, a:Matrix4, b:Matrix4) : Matrix4;  // Mᵣ = AB₃ₓ₄
function concatMatrix3(r:Matrix4, a:Matrix4, b:Matrix3) : Matrix4;  // Mᵣ = AB₃ₓ₃
function concatScale(r:Matrix4, m:Matrix4, v:Vector3) : Matrix4;  // Mᵣ = M[ x̂v⃗₀  ŷv⃗₁  ẑv⃗₂  ŵ ]
function concatTranslation(r:Matrix4, m:Matrix4, v:Vector3) : Matrix4;  // Mᵣ = M[ x̂  ŷ  ẑ  ŵ+v⃗ ]
function copy(r:Matrix4, m:Matrix4) : Matrix4;
function determinant(m:Matrix4) : number;  // |M|
function equals(a:Matrix4, b:Matrix4, e?:number) : boolean;
function identity(r:Matrix4) : Matrix4;  // Mᵣ = Î
function inverse(r:Matrix4, m:Matrix4) : Matrix4 | void;  // Mᵣ = M⁻¹ (using the determinant)
function inverse3x4(r:Matrix4, m:Matrix4) : Matrix4 | void;  // Mᵣ = [ m⁰ m¹ m² ŵ+m³ ]⁻¹
function inverseGauss(r:Matrix4, m:Matrix4) : Matrix4 | void;  // Mᵣ = M⁻¹ (using Gauss-Jordan elimination)
function shearMatrix3(r:Matrix4, m:Matrix3) : Matrix4;  // Mᵣ = [ m⁰ m¹ m² ŵ ]
function shearTranslation(r:Matrix4, x:Vector3, y:Vector3, z:Vector3, t:Vector3) : Matrix4;  // Mᵣ = [ x⃗  y⃗  z⃗  ŵ+t⃗ ]
function subtract(r:Matrix4, a:Matrix4, b:Matrix4) : Matrix4;  // Mᵣ = A-B
function subtractAssign(a:Matrix4, b:Matrix4) : Matrix4;  // A = A-B
function toColumnF32(m:Matrix4) : Float32Array;
function toColumnF64(m:Matrix4) : Float64Array;
function translation(r:Matrix4, v:Vector3) : Matrix4;  // Mᵣ = [ x̂  ŷ  ẑ  ŵ+v⃗ ]
function transpose(r:Matrix4, m:Matrix4) : Matrix4;  // Mᵣ = Mᵀ
```

## matrix4Frustrum
`matrix4Frustrum.ts`

### Interfaces
```ts
interface PerspectiveLens {
  readonly aspect : number,
  readonly far : number,
  readonly fov : number,
  readonly near : number
}

```

### Functions
```ts
function Frustrum(lens:PerspectiveLens) : Matrix4;
function frustrum(r:Matrix4, lens:PerspectiveLens) : Matrix4;
```

## matrix4Ortho
`matrix4Ortho.ts`

### Interfaces
```ts
interface OrthographicLens {
  readonly aspect : number,
  readonly extend : number,
  readonly far : number,
  readonly near : number
}

```

### Functions
```ts
function Ortho(lens:OrthographicLens) : Matrix4;
function ortho(r:Matrix4, lens:OrthographicLens) : Matrix4;
```

## vector2
`vector2.ts`

### Interfaces
```ts
interface Vector2 {
  x : number,
  y : number
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
function Multiply2x3Matrix3(m:Matrix3, v:Vector2) : Vector2;  // M₂ₓ₃v⃗
function MultiplyMatrix2(m:Matrix2, v:Vector2) : Vector2;  // M₂ₓ₂v⃗
function MultiplyMatrix3(m:Matrix3, v:Vector2) : Vector2;  // M₃ₓ₃v⃗
function MultiplyScalar(v:Vector2, n:number) : Vector2;  // nv⃗
function Normalize(v:Vector2) : Vector2;  // v̂
function Perpendicular(v:Vector2) : Vector2;  // v⃗⊥
function Project(v:Vector2, w:Vector2) : Vector2;  // Return the projection of w⃗ onto v⃗, (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
function Rotation(rad:number) : Vector2;
function Subtract(v:Vector2, w:Vector2) : Vector2;  // v⃗-w⃗
function add(r:Vector2, v:Vector2, w:Vector2) : Vector2;  // r⃗ = v⃗+w⃗
function addAssign(v:Vector2, w:Vector2) : Vector2;  // v⃗ = v⃗+w⃗
function assign(r:Vector2, x:number = 0.0, y:number = 0.0) : Vector2;
function axisX(r:Vector2, s:number = 1.0) : Vector2;  // r⃗ = sx̂
function axisY(r:Vector2, s:number = 1.0) : Vector2;  // r⃗ = sŷ
function barycentricUV(r:Vector2, vx0:Vector2, vx1:Vector2, vx2:Vector2, u:number, v:number) : Vector2;  // Assign the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2) to r⃗
function copy(r:Vector2, v:Vector2) : Vector2;
function cross(v:Vector2, w:Vector2) : number;  // v⃗×w⃗
function dot(v:Vector2, w:Vector2) : number;  // v⃗⋅w⃗
function equals(v:Vector2, w:Vector2, e?:number) : boolean;
function multiply2x3Matrix3(r:Vector2, m:Matrix3, v:Vector2) : Vector2;  // r⃗ = M₂ₓ₃v⃗
function multiplyAssignScalar(v:Vector2, n:number) : Vector2;  // v⃗ = nv⃗
function multiplyMatrix2(r:Vector2, m:Matrix2, v:Vector2) : Vector2;  // r⃗ = M₂ₓ₂v⃗
function multiplyMatrix3(r:Vector2, m:Matrix3, v:Vector2) : Vector2;  // r⃗ = M₃ₓ₃v⃗
function multiplyScalar(r:Vector2, v:Vector2, n:number) : Vector2;  // r⃗ = nv⃗
function norm(v:Vector2) : number;  // ‖ v⃗ ‖
function normSquared(v:Vector2) : number;  // ‖ v⃗ ‖²
function normalize(r:Vector2, v:Vector2) : Vector2;  // r⃗ = v̂
function perpendicular(r:Vector2, v:Vector2) : Vector2;  // r⃗ = v⃗⊥
function project(r:Vector2, v:Vector2, w:Vector2) : Vector2;  // Assign the projection of w⃗ onto v⃗ to r⃗, r⃗ = (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
function radians(v:Vector2, w:Vector2) : number;  // acos(v⃗⋅w⃗ )
function rotation(r:Vector2, rad:number) : Vector2;
function subtract(r:Vector2, v:Vector2, w:Vector2) : Vector2;  // r⃗ = v⃗-w⃗
function subtractAssign(v:Vector2, w:Vector2) : Vector2;  // v⃗ = v⃗-w⃗
```

## vector3
`vector3.ts`

### Interfaces
```ts
interface Vector3 extends Vector2 {
  z : number
}

```

### Functions
```ts
function Add(v:Vector3, w:Vector3) : Vector3;  // v⃗+w⃗
function AxisX(s:number = 1.0) : Vector3;  // sx̂
function AxisY(s:number = 1.0) : Vector3;  // sŷ
function AxisZ(s:number = 1.0) : Vector3;  // sẑ
function BarycentricUV(vx0:Vector3, vx1:Vector3, vx2:Vector3, u:number, v:number) : Vector3;  // Return the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2)
function Copy(v:Vector3) : Vector3;
function Create(x:number = 0.0, y:number = 0.0, z:number = 0.0) : Vector3;
function Cross(v:Vector3, w:Vector3) : Vector3;  // v⃗×w⃗
function EulerXYZ(m:Matrix3) : Vector3;
function EulerYXZ(m:Matrix3) : Vector3;
function EulerZXY(m:Matrix3) : Vector3;
function Multiply3x4Matrix4(m:Matrix4, v:Vector3) : Vector3;  // M₃ₓ₄v⃗
function MultiplyMatrix3(m:Matrix3, v:Vector3) : Vector3;  // M₃ₓ₃v⃗
function MultiplyMatrix4(m:Matrix4, v:Vector3) : Vector3;  // M₄ₓ₄v⃗
function MultiplyScalar(v:Vector3, n:number) : Vector3;  // nv⃗
function Normalize(v:Vector3) : Vector3;  // v̂
function OrthoNormalize(v:Vector3, w:Vector3) : Vector3;  // w⃗ - (v⃗⋅w⃗ )v⃗
function Project(v:Vector3, w:Vector3) : Vector3;  // Return the projection of w⃗ onto v⃗, (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
function Subtract(v:Vector3, w:Vector3) : Vector3;  // v⃗-w⃗
function add(r:Vector3, v:Vector3, w:Vector3) : Vector3;  // r⃗ = v⃗+w⃗
function addAssign(v:Vector3, w:Vector3) : Vector3;  // v⃗ = v⃗+w⃗
function assign(r:Vector3, x:number = 0.0, y:number = 0.0, z:number = 0.0) : Vector3;
function axisX(r:Vector3, s:number = 1.0) : Vector3;  // r⃗ = sx̂
function axisY(r:Vector3, s:number = 1.0) : Vector3;  // r⃗ = sŷ
function axisZ(r:Vector3, s:number = 1.0) : Vector3;  // r⃗ = sẑ
function barycentricUV(r:Vector3, vx0:Vector3, vx1:Vector3, vx2:Vector3, u:number, v:number) : Vector3;  // Assign the point represented by barycentric coordinates (u, v) in ↻ triangle (vx0, vx1, vx2) to r⃗
function copy(r:Vector3, v:Vector3) : Vector3;
function cross(r:Vector3, v:Vector3, w:Vector3) : Vector3;  // r⃗ = v⃗×w⃗
function dot(v:Vector3, w:Vector3) : number;  // v⃗⋅w⃗
function equals(v:Vector3, w:Vector3, e?:number) : boolean;
function eulerXYZ(r:Vector3, m:Matrix3) : Vector3;
function eulerYXZ(r:Vector3, m:Matrix3) : Vector3;
function eulerZXY(r:Vector3, m:Matrix3) : Vector3;
function isNormEqual(v:Vector3, n:number, e?:number) : boolean;  // ‖ v⃗ ‖ - n < ϵ
function isNormGt(v:Vector3, n:number) : boolean;  // ‖ v⃗ ‖ > n
function isNormLt(v:Vector3, n:number) : boolean;  // ‖ v⃗ ‖ < n
function multiply3x4Matrix4(r:Vector3, m:Matrix4, v:Vector3) : Vector3;  // r⃗ = M₃ₓ₄v⃗
function multiplyAssignScalar(v:Vector3, n:number) : Vector3;  // v⃗ = nv⃗
function multiplyMatrix3(r:Vector3, m:Matrix3, v:Vector3) : Vector3;  // r⃗ = M₃ₓ₃v⃗
function multiplyMatrix4(r:Vector3, m:Matrix4, v:Vector3) : Vector3;  // r⃗ = M₄ₓ₄v⃗
function multiplyScalar(r:Vector3, v:Vector3, n:number) : Vector3;  // r⃗ = nv⃗
function norm(v:Vector3) : number;  // ‖ v⃗ ‖
function normSquared(v:Vector3) : number;  // ‖ v⃗ ‖²
function normalize(r:Vector3, v:Vector3) : Vector3;  // r⃗ = v̂
function orthoNormalize(r:Vector3, v:Vector3, w:Vector3) : Vector3;  // r⃗ = w⃗ - (v⃗⋅w⃗ )v⃗
function project(r:Vector3, v:Vector3, w:Vector3) : Vector3;  // Assign the projection of w⃗ onto v⃗ to r⃗, r⃗ = (v⃗w⃗ / ‖ v⃗ ‖²)v⃗
function subtract(r:Vector3, v:Vector3, w:Vector3) : Vector3;  // r⃗ = v⃗-w⃗
function subtractAssign(v:Vector3, w:Vector3) : Vector3;  // v⃗ = v⃗-w⃗
```

## vector4
`vector4.ts`

### Interfaces
```ts
interface Vector4 extends Vector3 {
  w : number
}

```

### Functions
```ts
function Add(v:Vector4, w:Vector4) : Vector4;  // v⃗+w⃗
function Conjugate(v:Vector4) : Vector4;  // q⃗′
function Copy(v:Vector4) : Vector4;
function Create(x:number = 0.0, y:number = 0.0, z:number = 0.0, w:number = 1.0) : Vector4;
function Inverse(v:Vector4) : Vector4 | void;  // q⃗⁻¹
function MultiplyScalar(v:Vector4, n:number) : Vector4;  // nv⃗
function Normalize(v:Vector4) : Vector4;  // v̂
function Outer(v:Vector4, w:Vector4) : Vector4;  // v⃗w⃗
function RotationAxis(v:Vector3, rad:number) : Vector4;  // q̂(v⃗, θ)
function RotationMatrix3(m:Matrix3) : Vector4;  // q̂(M)
function RotationSlerp(v:Vector4, w:Vector4, t:number) : Vector4;  // v̂(ŵ⁻¹v̂)ᵗ
function Subtract(v:Vector4, w:Vector4) : Vector4;  // v⃗-w⃗
function Vector3(v:Vector3) : Vector4;  // ŵ+v⃗
function add(r:Vector4, v:Vector4, w:Vector4) : Vector4;  // r⃗ = v⃗+w⃗
function addAssign(v:Vector4, w:Vector4) : Vector4;  // v⃗ = v⃗+w⃗
function assign(r:Vector4, x:number = 0.0, y:number = 0.0, z:number = 0.0, w:number = 1.0) : Vector4;
function conjugate(r:Vector4, v:Vector4) : Vector4;  // r⃗ = q⃗′
function copy(r:Vector4, v:Vector4) : Vector4;
function dot(v:Vector4, w:Vector4) : number;  // v⃗⋅w⃗
function equals(v:Vector4, w:Vector4, e?:number) : boolean;
function inverse(r:Vector4, v:Vector4) : Vector4 | void;  // r⃗ = q⃗⁻¹
function multiplyAssignScalar(v:Vector4, n:number) : Vector4;  // v⃗ = nv⃗
function multiplyScalar(r:Vector4, v:Vector4, n:number) : Vector4;  // r⃗ = nv⃗
function norm(v:Vector4) : number;  // ‖ v⃗ ‖
function normSquared(v:Vector4) : number;  // ‖ v⃗ ‖²
function normalize(r:Vector4, v:Vector4) : Vector4;  // r⃗ = v̂
function outer(r:Vector4, v:Vector4, w:Vector4) : Vector4;  // r⃗ = v⃗w⃗
function rotationAxis(r:Vector4, v:Vector3, rad:number) : Vector4;  // r⃗ = q̂(v⃗, θ)
function rotationMatrix3(r:Vector4, m:Matrix3) : Vector4;  // r⃗ = q̂(M)
function rotationSlerp(r:Vector4, v:Vector4, w:Vector4, t:number) : Vector4;  // r⃗ = v̂(ŵ⁻¹v̂)ᵗ
function subtract(r:Vector4, v:Vector4, w:Vector4) : Vector4;  // r⃗ = v⃗-w⃗
function subtractAssign(v:Vector4, w:Vector4) : Vector4;  // v⃗ = v⃗-w⃗
function vector3(r:Vector4, v:Vector3) : Vector4;  // r⃗ = ŵ+v⃗
```

