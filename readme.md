#xyzw

A generic, fast, comprehensive and dependencyless vector algebra library

##Install

```sh
$ npm install xyzw
```

##Use

All included classes are available at `xyzw/source`. Es5 versions are available at `xyzw/es5`

```js
import Vector2 from 'xyzw/source/Vector2';
import Vector3 from 'xyzw/source/Vector3';
import Vector4 from 'xyzw/source/Vector4';

import Matrix2 from 'xyzw/source/Matrix2';
import Matrix3 from 'xyzw/source/Matrix3';
import Matrix4 from 'xyzw/source/Matrix4';
```

###Creating instances

Instances of all classes are created the same way:

```sh
const a = new Vector3();                   //a (0, 0, 0) vector
const b = new Vector3([1.0, 0.0, 0.0]);    //a unit vector along the x axis
const c = Vector3.Y()                      //a unit vector along the y axis
```

###Accessing and manipulating components

Invoking the contructor without arguments or without an array of the right size will always return a zero instance.
The components are accessible either through getters or through the `.n` property

```js
const x = a.x;      //same as a.n[0]
const y = a.n[1];   //same as a.y

a.x = 2.1;          //same as a.n[0] = 2.1
a.n[1] = 10.5;      //same as a.y = 10.5;
```

###Working with vectors and matrices

All basic math operations are available in three basic forms and most additional have an assignment variant of the operation.

```js
const d = Vector3.Add(b, c);
```
Creates a new Vector3 by using an operator factory `d = b op c`

```js
const e = Vector3.Add(b, c, a);
```
Uses an operator factory,
but invokes it with the target instance as its last argument
`a = b op c`, `e === a`
 
```js
a.add(b, c);
```
Calls the operation method of a and assigns the result of the operation to a `a = b op c`

```js
a.addEQ(b);
```
Calls the operation-assignment method of a `a op= b`

###Chaining

All member operations mutate the instance and almost all support the parameter idiom.

```js
const v = Vector3.Subtract(a, b)
	.multiplyScalarEQ(0.5)
	.addEQ(b);
```

###Transforms
The matrix types are equipped with factory constructors
allowing to create useful transforms from a variety of sources.
  
```js
const r0 = Matrix2.XY(
	new Vector2([1.0, 0.0]),
	new Vector2([0.0, 1.0])
);
```
A 2d rotation matrix built from two axes

```js
const r1 = Matrix2.Rotation(Math.PI);
```
A 2d rotation transform built from an angle

```js
const r2 = Matrix3.RotationZ(Math.PI);
```
A 3d rotation transform build the same angle in the same plane
 
```js
const r3 = Matrix3.Matrix2(r0);
```
A 2d transform built from a rotation matrix

```js
const t0 = Matrix3.Translation(new Vector2([1.0, 5.0]));    
```
A 2d transform built from a translation vector

```js
const t1 = Matrix4.Matrix3(r2);
```
A 3d transform built from a rotation matrix

```js
const t2 = Matrix4.Translation(new Vector3([1.0, 0.0, 0.0]));
```
A 3d transform built from a translation vector

###Concatenation

Since the last line of the matrices stays unused most of the time
and in very predicable ways,
the matrices come with an array of specialized concatenations
in addition to their base concatenations. 

```js
const m0 = Matrix3.multiply2x3Matrix2(r2, r0);
```
The concatenation `r2 x r0`. Since r0 is only 2x2,
only components `n00, n01, n10, n11` will be processed while
`n02, n12` will be copied from r2.

```js
const m1 = Matrix3.Multiply2x3(t0, r3);
```
The concatenation `t0 x r3`.
Multiply2x3 will not process the last line of any of the source matrices,
but assume both to be empty.

```js
const m2 = Matrix4.Multiply3x4Matrix3(t2, r2);
const m3 = Matrix4.Multiply3x4(t2, t1);
```
The equivalent concatenations for 3x4 matrices

###Projecting vectors

Likewise the vectors will come with specialized projection operators
in addition to their basic projection operators.

```js
const p0 = Vector2.MultiplyMatrix2(r0, new Vector2([5.5, 3.3]));
```
Will project vector `(5.0, 3.0)` by rotation `r0`.
Since only `n00, n01, n10, n11` will contain arbitrary data, the projection much faster.
 
 ```js
 const p1 = Vector2.Multiply2x3Matrix3(t0, new Vector2([12.7, 7.12]));
 ```
 Will project the vector by transform `r2`.
 This operator implies that `n20, n21, n22` will be `0.0, 0.0, 1.0` respecively and
 skips them from caculations accordingly.

```js
const p2 = Vector3.MultiplyMatrix3(r2, Vector3.Z());
const p3 = Vector3.Multiply3x4Matrix4(t2, new Vector3([1.1, 5.5, 2.2]));
```
The equivalent concatenations for 3x4 matrices.

##API Overview

###Vector2

####Functions
```js
Vector2.cross(v, w);
Vector2.dot(v, w);
Vector2.rad(v, w);
Vector2.isEQ(v, w);
```

####Factories
```js
Vector2.Rotation(rad, target);
Vector2.BarycentricUV(v0, v1, v2, u, v, target);
```

####Accessors
```js
vector2.x
vector2.y
vector2.s
vector2.t

vector2.n

vector2.norm
vector2.normSquared
````

####Operators
```js
Vector2.Add(v, w, target);
vector2.add(v, w);
vector2.addEQ(w);

Vector2.Subtract(v, w, target);
vector2.subtract(v, w);
vector2.subtractEQ(w);

Vector2.MultiplyScalar(v, n, target);
vector2.multiplyScalar(v, n);
vector2.multiplyScalarEQ(n);

Vector2.MultiplyMatrix2(m, v, target);
vector2.multiplyMatrix2(m, v);

Vector2.Multiply2x3Matrix3(m, v, target);
vector2.multiply2x3Matrix3(m, v);

Vector2.MultiplyMatrix3(m, v, target);
vector2.multiplyMatrix3(m, v);

Vector2.Project(v, w, target);
vector2.project(v, w);
vector2.projectEQ(w);

Vector2.Normalize(v, target);
vector2.normalzationOf(v);
vector2.normalize();

Vector2.Perpendicular(v, target);
vector2.perpendicularOf(v);
vector2.perpendicular();

Vector2.Copy(v, target);
Vector2.copyOf(v);
```

Vector2 will convert to a `[Vector2](1.234 1.234)` string and use its norm in calculations.

###Vector3

####Functions
```js
Vector3.dot(v, w);
Vector3.isEQ(v, w);
Vector3.isNormLT(v, n);
Vector3.isNormGT(v, n);
Vector3.isNormEQ(v, n);
```

####Factories
```js
Vector3.X();
Vector3.Y();
Vector3.Z();
Vector3.BarycentricUV(v0, v1, v2, u, v, target);
```

####Accessors
```js
vector3.x;
vector3.y;
vector3.z;
vector3.n;

vector3.norm;
vector3.normSquared;
```

####Operators
```js
Vector3.Add(v, w, target);
vector3.add(v, w);
vector3.addEQ(w);

Vector3.Subtract(v, w, target);
vector3.subtract(v, w);
vector3.subtractEQ(w);

Vector3.MultiplyScalar(v, n, target);
vector3.multiplyScalar(v, n);
vector3.multiplyScalarEQ(n);

Vector3.Cross(v, w, target);
vector3.cross(v, w);

Vector3.MultiplyMatrix3(m, v, target);
vector3.multiplyMatrix3(m, v);

Vector3.Multiply3x4Matrix4(m, v, target);
vector3.multiply3x4Matrix4(m, v);

Vector3.MultiplyMatrix4(m, v, target);
vector3.multiplyMatrix4(m, v);

Vector3.Project(v, w, target);
vector3.project(v, w);
vector3.projectEQ(w);

Vector3.OrthoNormalize(v, w, target);
vector3.orthoNormalize(v, w);
vector3.orthoNormalizeEQ(v);

Vector3.Normalize(v, target);
vector3.normalizationOf(v);
vector3.normalize();

Vector3.Copy(v, target);
vector3.copyOf(v);
```

Vector3 will convert to a `[Vector3](1.234 1.234 1.234)` string and use its norm in calculations.


###Vector4

####Functions
```js
Vector4.dot(q, r);
Vector4.isEQ(q, r);
```

####Factories
```js
Vector4.Rotation(axis, rad, target);
Vector4.SLERP(q, r, t, target);
Vector4.Matrix3(m, target);
Vector4.Vector3(v, target);
````
####Accessors
```js
vector4.x;
vector4.y;
vector4.z;
vector4.w;
vector4.n;

vector4.norm;
```

####Operators
```js
Vector4.Add(q, r, target);
vector4.add(q, r);
vector4.addEQ(q);

Vector4.Subtract(q, r, target);
vector4.subtract(q, r);
vector4.subtract(q);

Vector4.MultiplyScalar(q, n, target);
vector4.multiplyScalar(q, n);
vector4.multiplyScalarEQ(n);

Vector4.Multiply(q, r, target);
vector4.multiply(q, r);

Vector4.Normalize(q, target);
vector4.normalizationOf(q);
vector4.normalize();

Vector4.Conjugate(q, target);
vector4.conjugateOf(q);
vector4.conjugate();

Vector4.Inverse(q, target);
vector4.inverseOf(q);
vector4.invert();

Vector4.Copy(q, target);
vector4.copyOf(q);
```

Vector4 will convert to a `[Vector4](1.234 1.234 1.234 1.000)` string and use its norm in calculations.


###Matrix3

####Functions
```js
Matrix2.isEQ(a, b);
```

####Factories
```js
Matrix2.Rotation(rad, target);
Matrix2.Scale(v, target);
Matrix2.Vector2(x, y, target);
Matrix2.Matrix3(m, target);
```

####Accessors
```js
matrix2.n00;
matrix2.n01;
matrix2.n10;
matrix2.n11;

matrix2.n;

matrix2.determinant;
```

####Operators
```js
Matrix2.Add(a, b, target);
matrix2.add(a, b);

Matrix2.Subtract(a, b, target);
matrix2.subtract(a, b);

Matrix2.Multiply(a, b, target);
matrix2.multiply(a, b);

Matrix2.Inverse(m, target);
matrix2.inverseOf(m);
matrix2.invert();

Matrix2.Transpose(m, target);
matrix2.transposeOf(m);
matrix2.transpose();

Matrix2.Copy(m, target);
matrix2.copyOf(m);
```

Matrix2 will convert to a `[Matrix2]\n1.234\t1.234\n1.234\t1.000` string and use its determinant in calculations.

###Matrix3

####Functions
```js
Matrix3.isEQ(a, b);
```

####Factories
```js
Matrix3.Rotation(axis, rad, target);
Matrix3.RotationX(rad, target);
Matrix3.RotationY(rad, target);
Matrix3.RotationZ(rad, target);
Matrix3.EulerXYZ(x, y, z, target);
Matrix3.EulerYXZ(x, y, z, target);
Matrix3.EulerZXY(x, y, z, target);
Matrix3.Scale(v, target);
Matrix3.Translation(v, target);
Matrix3.Vector3(x, y, z, target);
Matrix3.Vector4(q, target);
Matrix3.Matrix2(m, target);
Matrix3.Matrix4(m, target);
```

####Accessors
```js
matrix3.n00;
matrix3.n01;
matrix3.n02;
matrix3.n10;
matrix3.n11;
matrix3.n12;
matrix3.n20;
matrix3.n21;
matrix3.n22;

matrix3.n;

matrix3.determinant;

matrix3.toEulerZXY();
matrix3.toCSS2x3(digits);
matrix3.toCSS(digits);
```

####Operators
```js
Matrix3.Add(a, b, target);
matrix3.add(a, b);

Matrix3.Subtract(a, b, target);
matrix3.subtract(a, b);

Matrix3.Multiply2x3Vector2Scale(m, v, target);
matrix3.multiply2x3Vector2Scale(m, v);

Matrix3.Multiply2x3Vector2Translation(m, v, target);
matrix3.multiply2x3Vector2Translation(m, v);

Matrix3.Multiply2x3Matrix2(a, b, target);
matrix3.multiply2x3Matrix2(a, b);

Matrix3.Multiply2x3(a, b, target);
matrix3.multiply2x3(a, b);

Matrix3.Multiply(a, b, target);
matrix3.multiply(a, b);

Matrix3.Inverse(m, target);
matrix3.inverseOf(m);
matrix3.invert();

Matrix3.Transpose(m, target);
matrix3.transposeOf(m);
matrix3.transpose();

Matrix3.Copy(m, target);
matrix3.copyOf(m);
```

Matrix3 will convert to a `[Matrix2]\n1.234\t1.234\t1.234[...]\n1.234\t1.234\t1.234` string and use its determinant in calculations.
