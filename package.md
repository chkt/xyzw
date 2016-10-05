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
