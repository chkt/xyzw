[![Tests](https://github.com/chkt/xyzw/workflows/tests/badge.svg)](https://github.com/chkt/onceupon/actions)
[![Version](https://img.shields.io/npm/v/xyzw)](https://www.npmjs.com/package/@chkt/onceupon)
![Node](https://img.shields.io/node/v/xyzw)
![Dependencies](https://img.shields.io/librariesio/release/npm/xyzw)
![Licence](https://img.shields.io/npm/l/xyzw)
![Language](https://img.shields.io/github/languages/top/xyzw)
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
