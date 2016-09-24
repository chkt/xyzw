'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector2 = require('./Vector3');

var _Vector3 = _interopRequireDefault(_Vector2);

var _Matrix = require('./Matrix3');

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 3x4 and 4x4 transformations
 */
var Matrix4 = function () {
	_createClass(Matrix4, null, [{
		key: 'Translation',


		/**
   * Returns a instance of translation vector
   * @constructor
   * @param {Vector3} v - The source
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */
		value: function Translation(v, target) {
			var vn = v.n;

			var n = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, vn[0], vn[1], vn[2], 1.0];

			if (target === undefined) target = new Matrix4(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of axes (x,y,z) and translation (t)
   * @constructor
   * @param {Vector3} x - The x-axis vector
   * @param {Vector3} y - The y-axis vector
   * @param {Vector3} [z] - The z-axis vector
   * @param {Vector3} [t] - The translation vector
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Vector3',
		value: function Vector3(x, y, z, t, target) {
			z = z !== undefined ? z : _Vector3.default.Cross(x, y);
			var tn = t !== undefined ? t.n : [0.0, 0.0, 0.0];

			var n = [].concat(x.n, 0.0, y.n, 0.0, z.n, 0.0, tn, 1.0);

			if (target === undefined) target = new Matrix4(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of m
   * The instance will be padded to 4x4
   * @constructor
   * @param {Matrix3} m - The source
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Matrix3',
		value: function Matrix3(m, target) {
			var n = m.n.concat([0.0, 0.0, 0.0, 0.0, 1.0]);

			n.splice(3, 0, 0.0);
			n.splice(7, 0, 0.0);

			if (target === undefined) target = new Matrix4(n);else target.n = n;

			return target;
		}

		/**
   * Returns the sum of a and b (a+b)
   * @constructor
   * @param {Matrix4} a - The first summand
   * @param {Matrix4} b - The second summand
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Add',
		value: function Add(a, b, target) {
			return (target === undefined ? new Matrix4() : target).add(a, b);
		}

		/**
   * Returns the difference of a and b (a-b)
   * @constructor
   * @param {Matrix4} a - The minuend
   * @param {Matrix4} b - The subtrahend
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Subtract',
		value: function Subtract(a, b, target) {
			return (target === undefined ? new Matrix4() : target).subtract(a, b);
		}

		/**
   * Returns the 3x4 concatenation of m and matrix-transformed v (m*Matrix4.Matrix3(Matrix3.Scale(v)))
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @constructor
   * @param {Matrix4} m - The matrix
   * @param {Vector3} v - The vector
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Multiply3x4Vector3Scale',
		value: function Multiply3x4Vector3Scale(m, v, target) {
			return (target === undefined ? new Matrix4() : target).multiply3x4Vector3Scale(m, v);
		}

		/**
   * Returns the 3x4 concatenation of m and matrix-transformed v (m*Matrix4.Translation(v))
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @constructor
   * @param {Matrix4} m - The matrix
   * @param {Vector3} v - The vector
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Multiply3x4Vector3Translation',
		value: function Multiply3x4Vector3Translation(m, v, target) {
			return (target === undefined ? new Matrix4() : target).multiply3x4Vector3Translation(m, v);
		}

		/**
   * Returns the 3x4 concatenation of a and b (a*b)
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @constructor
   * @param {Matrix4} a - The first matrix
   * @param {Matrix3} b - The second matrix
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Multiply3x4Matrix3',
		value: function Multiply3x4Matrix3(a, b, target) {
			return (target === undefined ? new Matrix4() : target).multiply3x4Matrix3(a, b);
		}

		/**
   * Returns the 3x4 concatenation of a and b (a*b)
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @constructor
   * @param {Matrix4} a - The first matrix
   * @param {Matrix4} b - The second matrix
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Multiply3x4',
		value: function Multiply3x4(a, b, target) {
			return (target === undefined ? new Matrix4() : target).multiply3x4(a, b);
		}

		/**
   * Returns the concatenation of a and b (a*b)
   * @constructor
   * @param {Matrix4} a - The first matrix
   * @param {Matrix4} b - The second matrix
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Multiply',
		value: function Multiply(a, b, target) {
			return (target === undefined ? new Matrix4() : target).multiply(a, b);
		}

		/**
   * Returns the 3x4 inverse of m
   * Components 3x are to be (0.0,0.0,0.0,1.0)
   * Returns null if m is assumed to be singular, the 3x4 inverse of m otherwise
   * @constructor
   * @param {Matrix4} m - The source
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4|null}
   */

	}, {
		key: 'Inverse3x4',
		value: function Inverse3x4(m, target) {
			if (target === undefined) target = new Matrix4();

			return target.inverse3x4Of(m) ? target : null;
		}

		/**
   * Returns the inverse of m
   * Using the adjoint method
   * Returns null if m is assumed to be singular, the 4x4 inverse of m otherwise
   * @constructor
   * @param {Matrix4} m - The source
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4|null}
   */

	}, {
		key: 'Inverse',
		value: function Inverse(m, target) {
			if (target === undefined) target = new Matrix4();

			return target.inverseOf(m) ? target : null;
		}

		/**
   * Returns the inverse of m
   * Using gauss-jordan elimination
   * Returns null if m is singular, the 4x4 inverse of m otherwise
   * @constructor
   * @param {Matrix4} m - The source
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4|null}
   */

	}, {
		key: 'InverseGauss',
		value: function InverseGauss(m, target) {
			if (target === undefined) target = new Matrix4();

			return target.inverseGaussOf(m) ? target : null;
		}

		/**
   * Returns the transpose of m
   * @constructor
   * @param {Matrix4} m - The source
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Transpose',
		value: function Transpose(m, target) {
			return (target === undefined ? new Matrix4() : target).transposeOf(m);
		}

		/**
   * Returns a copy of m
   * @constructor
   * @param {Matrix4} m - The source
   * @param {Matrix4} [target] - The target instance
   * @returns {Matrix4}
   */

	}, {
		key: 'Copy',
		value: function Copy(m, target) {
			return (target === undefined ? new Matrix4() : target).copyOf(m);
		}

		/**
   * Returns true if a and b are equal, false otherwise (a == b)
   * @param {Matrix4} a - The protagonist
   * @param {Matrix4} b - The antagonist
   * @returns {Boolean}
   */

	}, {
		key: 'isEQ',
		value: function isEQ(a, b) {
			if (a === b) return true;

			var an = a.n,
			    bn = b.n;

			for (var i = 0; i < 16; i++) {
				if (an[i] !== bn[i]) return false;
			}

			return true;
		}

		/**
   * Creates a new instance
   * @param {Float[]} [n] - Array representing 4x4 column-major ordered components
   * Arrays of length !== 16 will return the identity matrix
   */

	}]);

	function Matrix4(n) {
		_classCallCheck(this, Matrix4);

		/**
   * The array representation
   * Contains the 16 column-major ordered components of the instance
   * n[0]:n00 n[4]:n01 n[8] :n02 n[12]:n03
   * n[1]:n10 n[5]:n11 n[9] :n12 n[13]:n13
   * n[2]:n20 n[6]:n21 n[10]:n22 n[14]:n23
   * n[3]:n30 n[7]:n31 n[11]:n32 n[15]:n33
   * @type {Float[]}
   */
		this.n = n && n.constructor === Array && n.length === 16 ? n : [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0];
	}

	/**
  * Redefines the instance
  * @param {Float[]} [n] - Array representing 4x4 column-major ordered components
  * Arrays of length <em>!== 16</em> will return the identity matrix
  * @returns {Matrix4}
  */


	_createClass(Matrix4, [{
		key: 'define',
		value: function define(n) {
			this.constructor.call(this, n);

			return this;
		}

		/**
   * row 0, col 0, {@link Matrix4#n}[0]
   * @type {Float}
   */

	}, {
		key: 'add',


		/**
   * The sum of a and b (a+b)
   * @param {Matrix4} a - The first summand
   * @param {Matrix4} b - The second summand
   * @returns {Matrix4}
   */
		value: function add(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			for (var i = 0; i < 16; i++) {
				n[i] = an[i] + bn[i];
			}return this;
		}

		/**
   * The difference of a and b (a-b)
   * @param {Matrix4} a - The minuend
   * @param {Matrix4} b - The subtrahend
   * @returns {Matrix4}
   */

	}, {
		key: 'subtract',
		value: function subtract(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			for (var i = 0; i < 16; i++) {
				n[i] = an[i] - bn[i];
			}return this;
		}

		/**
   * The 3x4 concatenation of m and matrix-transformed v (m*Matrix4.Matrix3(Matrix3.Scale(v)))
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @param {Matrix4} m - The matrix
   * @param {Vector3} v - The vector
   * @returns {Matrix4}
   */

	}, {
		key: 'multiply3x4Vector3Scale',
		value: function multiply3x4Vector3Scale(m, v) {
			var n = this.n = m.n.slice(0, 16),
			    vn = v.n;

			var v00 = vn[0],
			    v11 = vn[1],
			    v22 = vn[2];

			n[0] *= v00, n[4] *= v11, n[8] *= v22;
			n[1] *= v00, n[5] *= v11, n[9] *= v22;
			n[2] *= v00, n[6] *= v11, n[10] *= v22;
			n[3] *= v00, n[7] *= v11, n[11] *= v22;

			return this;
		}

		/**
   * The 3x4 concatenation of m and matrix-transformed v (m*Matrix4.Translation(v))
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @param {Matrix4} m - The matrix
   * @param {Vector3} v - The vector
   * @returns {Matrix4}
   */

	}, {
		key: 'multiply3x4Vector3Translation',
		value: function multiply3x4Vector3Translation(m, v) {
			var mn = m.n,
			    vn = v.n,
			    n = this.n = mn.slice(0);

			var v03 = vn[0],
			    v13 = vn[1],
			    v23 = vn[2];

			n[12] = mn[0] * v03 + mn[4] * v13 + mn[8] * v23 + mn[12];
			n[13] = mn[1] * v03 + mn[5] * v13 + mn[9] * v23 + mn[13];
			n[14] = mn[2] * v03 + mn[6] * v13 + mn[10] * v23 + mn[14];

			return this;
		}

		/**
   * The 3x4 concatenation of a and b (a*b)
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @param {Matrix4} a - The first matrix
   * @param {Matrix3} b - The second matrix
   * @returns {Matrix4}
   */

	}, {
		key: 'multiply3x4Matrix3',
		value: function multiply3x4Matrix3(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			var a00 = an[0],
			    a01 = an[4],
			    a02 = an[8],
			    a03 = an[12];
			var a10 = an[1],
			    a11 = an[5],
			    a12 = an[9],
			    a13 = an[13];
			var a20 = an[2],
			    a21 = an[6],
			    a22 = an[10],
			    a23 = an[14];

			var b00 = bn[0],
			    b01 = bn[3],
			    b02 = bn[6];
			var b10 = bn[1],
			    b11 = bn[4],
			    b12 = bn[7];
			var b20 = bn[2],
			    b21 = bn[5],
			    b22 = bn[8];

			n[0] = a00 * b00 + a01 * b10 + a02 * b20;
			n[4] = a00 * b01 + a01 * b11 + a02 * b21;
			n[8] = a00 * b02 + a01 * b12 + a02 * b22;
			n[12] = a03;

			n[1] = a10 * b00 + a11 * b10 + a12 * b20;
			n[5] = a10 * b01 + a11 * b11 + a12 * b21;
			n[9] = a10 * b02 + a11 * b12 + a12 * b22;
			n[13] = a13;

			n[2] = a20 * b00 + a21 * b10 + a22 * b20;
			n[6] = a20 * b01 + a21 * b11 + a22 * b21;
			n[10] = a20 * b02 + a21 * b12 + a22 * b22;
			n[14] = a23;

			n[3] = n[7] = n[11] = 0.0;
			n[15] = 1.0;

			return this;
		}

		/**
   * The 3x4 concatenation of a and b (a*b)
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @param {Matrix4} a - The first transform
   * @param {Matrix4} b - The second transform
   * @returns {Matrix4}
   */

	}, {
		key: 'multiply3x4',
		value: function multiply3x4(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			var a00 = an[0],
			    a01 = an[4],
			    a02 = an[8],
			    a03 = an[12];
			var a10 = an[1],
			    a11 = an[5],
			    a12 = an[9],
			    a13 = an[13];
			var a20 = an[2],
			    a21 = an[6],
			    a22 = an[10],
			    a23 = an[14];

			var b00 = bn[0],
			    b01 = bn[4],
			    b02 = bn[8],
			    b03 = bn[12];
			var b10 = bn[1],
			    b11 = bn[5],
			    b12 = bn[9],
			    b13 = bn[13];
			var b20 = bn[2],
			    b21 = bn[6],
			    b22 = bn[10],
			    b23 = bn[14];

			n[0] = a00 * b00 + a01 * b10 + a02 * b20;
			n[4] = a00 * b01 + a01 * b11 + a02 * b21;
			n[8] = a00 * b02 + a01 * b12 + a02 * b22;
			n[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03;

			n[1] = a10 * b00 + a11 * b10 + a12 * b20;
			n[5] = a10 * b01 + a11 * b11 + a12 * b21;
			n[9] = a10 * b02 + a11 * b12 + a12 * b22;
			n[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13;

			n[2] = a20 * b00 + a21 * b10 + a22 * b20;
			n[6] = a20 * b01 + a21 * b11 + a22 * b21;
			n[10] = a20 * b02 + a21 * b12 + a22 * b22;
			n[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23;

			n[3] = n[7] = n[11] = 0.0;
			n[15] = 1.0;

			return this;
		}

		/**
   * The concatenation of a and b (a*b)
   * @param {Matrix4} a - The first transform
   * @param {Matrix4} b - The second transform
   * @returns {Matrix4}
   */

	}, {
		key: 'multiply',
		value: function multiply(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			var a00 = an[0],
			    a01 = an[4],
			    a02 = an[8],
			    a03 = an[12];
			var a10 = an[1],
			    a11 = an[5],
			    a12 = an[9],
			    a13 = an[13];
			var a20 = an[2],
			    a21 = an[6],
			    a22 = an[10],
			    a23 = an[14];
			var a30 = an[3],
			    a31 = an[7],
			    a32 = an[11],
			    a33 = an[15];

			var b00 = bn[0],
			    b01 = bn[4],
			    b02 = bn[8],
			    b03 = bn[12];
			var b10 = bn[1],
			    b11 = bn[5],
			    b12 = bn[9],
			    b13 = bn[13];
			var b20 = bn[2],
			    b21 = bn[6],
			    b22 = bn[10],
			    b23 = bn[14];
			var b30 = bn[3],
			    b31 = bn[7],
			    b32 = bn[11],
			    b33 = bn[15];

			n[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
			n[4] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
			n[8] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
			n[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;

			n[1] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
			n[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
			n[9] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
			n[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;

			n[2] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
			n[6] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
			n[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
			n[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;

			n[3] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
			n[7] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
			n[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
			n[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

			return this;
		}

		/**
   * The 3x4 inverse of m
   * Beware: method is NOT chainable
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * Returns false if m is assumed to be singular, true otherwise
   * @param {Matrix4} m - The 3x4 source
   * @returns {Boolean}
   */

	}, {
		key: 'inverse3x4Of',
		value: function inverse3x4Of(m) {
			var n = this.n,
			    mn = m.n,
			    d = _Matrix2.default.Matrix4(this).determinant;

			if (Math.abs(d) < 1.0e-10) return false;

			d = 1.0 / d;

			var m00 = mn[0],
			    m01 = mn[4],
			    m02 = mn[8],
			    m03 = mn[12];
			var m10 = mn[1],
			    m11 = mn[5],
			    m12 = mn[9],
			    m13 = mn[13];
			var m20 = mn[2],
			    m21 = mn[6],
			    m22 = mn[10],
			    m23 = mn[14];

			n[0] = d * (m11 * m22 - m12 * m21);
			n[4] = -d * (m01 * m22 - m02 * m21);
			n[8] = d * (m01 * m12 - m02 * m11);
			n[12] = -d * (m01 * (m12 * m23 - m13 * m22) + m02 * (m13 * m21 - m11 * m23) + m03 * (m11 * m22 - m12 * m21));

			n[1] = -d * (m10 * m22 - m12 * m20);
			n[5] = d * (m00 * m22 - m02 * m20);
			n[9] = -d * (m00 * m12 - m02 * m10);
			n[13] = d * (m00 * (m12 * m23 - m13 * m22) + m02 * (m13 * m20 - m10 * m23) + m03 * (m10 * m22 - m12 * m20));

			n[2] = d * (m10 * m21 - m11 * m20);
			n[6] = -d * (m00 * m21 - m01 * m20);
			n[10] = d * (m00 * m11 - m01 * m10);
			n[14] = -d * (m00 * (m11 * m23 - m13 * m21) + m01 * (m13 * m20 - m10 * m23) + m03 * (m10 * m21 - m11 * m20));

			n[3] = n[7] = n[11] = 0.0;
			n[15] = 1.0;

			return true;
		}

		/**
   * The inverse of m
   * Beware: method is NOT chainable.
   * Using the adjoint method - m[ij] = 1 / d * (-1)^(i + j) * det(adj(m[ji]))
   * Returns false if m is assumed to be singular, true otherwise
   * @param {Matrix4} m - The source
   * @returns {Boolean}
   */

	}, {
		key: 'inverseOf',
		value: function inverseOf(m) {
			var n = this.n,
			    mn = m.n,
			    d = m.determinant;

			if (Math.abs(d) < 1.0e-10) return false;

			d = 1.0 / d;

			var m00 = mn[0],
			    m01 = mn[4],
			    m02 = mn[8],
			    m03 = mn[12];
			var m10 = mn[1],
			    m11 = mn[5],
			    m12 = mn[9],
			    m13 = mn[13];
			var m20 = mn[2],
			    m21 = mn[6],
			    m22 = mn[10],
			    m23 = mn[14];
			var m30 = mn[3],
			    m31 = mn[7],
			    m32 = mn[11],
			    m33 = mn[15];

			var m0011 = m00 * m11,
			    m0112 = m01 * m12,
			    m0213 = m02 * m13,
			    m0310 = m03 * m10;
			var m2031 = m20 * m31,
			    m2132 = m21 * m32,
			    m2233 = m22 * m33,
			    m2330 = m23 * m30;

			var m0312 = m03 * m12,
			    m0211 = m02 * m11,
			    m0110 = m01 * m10,
			    m0013 = m00 * m13;
			var m2332 = m23 * m32,
			    m2231 = m22 * m31,
			    m2130 = m21 * m30,
			    m2033 = m20 * m33;

			var m0012 = m00 * m12,
			    m0113 = m01 * m13,
			    m0210 = m02 * m10,
			    m0311 = m03 * m11;
			var m2032 = m20 * m32,
			    m2133 = m21 * m33,
			    m2230 = m22 * m30,
			    m2331 = m23 * m31;

			n[0] = d * (m11 * m2233 + m12 * m2331 + m13 * m2132 - m13 * m2231 - m12 * m2133 - m11 * m2332);
			n[4] = -d * (m01 * m2233 + m02 * m2331 + m03 * m2132 - m03 * m2231 - m02 * m2133 - m01 * m2332);
			n[8] = d * (m0112 * m33 + m0213 * m31 + m0311 * m32 - m0312 * m31 - m0211 * m33 - m0113 * m32);
			n[12] = -d * (m0112 * m23 + m0213 * m21 + m0311 * m22 - m0312 * m21 - m0211 * m23 - m0113 * m22);

			n[1] = -d * (m10 * m2233 + m12 * m2330 + m13 * m2032 - m13 * m2230 - m12 * m2033 - m10 * m2332);
			n[5] = d * (m00 * m2233 + m02 * m2330 + m03 * m2032 - m03 * m2230 - m02 * m2033 - m00 * m2332);
			n[9] = -d * (m0012 * m33 + m0213 * m30 + m0310 * m32 - m0312 * m30 - m0210 * m33 - m0013 * m32);
			n[13] = d * (m0012 * m23 + m0213 * m20 + m0310 * m22 - m0312 * m20 - m0210 * m23 - m0013 * m22);

			n[2] = d * (m10 * m2133 + m11 * m2330 + m13 * m2031 - m13 * m2130 - m11 * m2033 - m10 * m2331);
			n[6] = -d * (m00 * m2133 + m01 * m2330 + m03 * m2031 - m03 * m2130 - m01 * m2033 - m00 * m2331);
			n[10] = d * (m0011 * m33 + m0113 * m30 + m0310 * m31 - m0311 * m30 - m0110 * m33 - m0013 * m31);
			n[14] = -d * (m0011 * m23 + m0113 * m20 + m0310 * m21 - m0311 * m20 - m0110 * m23 - m0013 * m21);

			n[3] = -d * (m10 * m2132 + m11 * m2230 + m12 * m2031 - m12 * m2130 - m11 * m2032 - m10 * m2231);
			n[7] = d * (m00 * m2132 + m01 * m2230 + m02 * m2031 - m02 * m2130 - m01 * m2032 - m00 * m2231);
			n[11] = -d * (m0011 * m32 + m0112 * m30 + m0210 * m31 - m0211 * m30 - m0110 * m32 - m0012 * m31);
			n[15] = d * (m0011 * m22 + m0112 * m20 + m0210 * m21 - m0211 * m20 - m0110 * m22 - m0012 * m21);

			return true;
		}

		/**
   * The inverse of m
   * Beware: method is NOT chainable
   * Using gauss-jordan elimination
   * returns false if m is singular, false otherwise
   * @param {Matrix4} m - The source
   * @returns {Boolean}
   */

	}, {
		key: 'transposeOf',


		/**
   * The transpose of m
   * @param {Matrix4} m - The source
   * @returns {Matrix4}
   */
		value: function transposeOf(m) {
			var n = this.n,
			    mn = m.n.slice(0);

			n[4] = mn[1], n[8] = mn[2], n[12] = mn[3];
			n[1] = mn[4], n[9] = mn[6], n[13] = mn[7];
			n[2] = mn[8], n[6] = mn[9], n[14] = mn[11];
			n[3] = mn[12], n[7] = mn[13], n[11] = mn[14];

			return this;
		}

		/**
   * The copy of m
   * @param {Matrix4} m - The source
   * @returns {Matrix4}
   */

	}, {
		key: 'copyOf',
		value: function copyOf(m) {
			this.n = m.n.slice(0, 16);

			return this;
		}

		/**
   * The 3x4 inverse of the instance
   * Beware: method is NOT chainable
   * Components 3x are assumed to be (0.0,0.0,0.0,1.0)
   * @returns {Boolean}
   * Returns false if the instance is assumed to be singular, true otherwise
   */

	}, {
		key: 'invert3x4',
		value: function invert3x4() {
			return this.inverse3x4Of(this);
		}

		/**
   * The inverse of the instance
   * Beware: method is NOT chainable
   * Using the adjoint method
   * @returns {Boolean}
   * Returns false if the instance is assumed to be singular, true otherwise
   */

	}, {
		key: 'invert',
		value: function invert() {
			return this.inverseOf(this);
		}

		/**
   * The inverse of the instance
   * Beware: method is NOT chainable
   * using gauss-jordan elimination
   * @returns {Boolean}
   * Returns false if the instance is singular, true otherwise
   */

	}, {
		key: 'invertGauss',
		value: function invertGauss() {
			return this.inverseGaussOf(this);
		}

		/**
   * The transpose of the instance
   * @returns {Matrix4}
   */

	}, {
		key: 'transpose',
		value: function transpose() {
			return this.transposeOf(this);
		}

		/**
   * Returns a string representation of the instance
   * @param {Uint} [digits=3] - The number of digits
   * @returns {String}
   */

	}, {
		key: 'toString',
		value: function toString() {
			var digits = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

			var str = this.n.map(function (item, index, source) {
				return (i % 4.0 === 0.0 ? "\n" : "\t") + item.toFixed(digits);
			}).join("");

			return '[Matrix4]' + str;
		}
	}, {
		key: 'valueOf',


		/**
   * Returns the {@link Matrix4#determinant} of the instance
   * @returns {Float}
   */
		value: function valueOf() {
			return this.determinant;
		}
	}, {
		key: 'n00',
		get: function get() {
			return this.n[0];
		},
		set: function set(n) {
			this.n[0] = n;
		}

		/**
   * row 0, col 1, {@link Matrix4#n}[4]
   * @type {Float}
   */

	}, {
		key: 'n01',
		get: function get() {
			return this.n[4];
		},
		set: function set(n) {
			this.n[4] = n;
		}

		/**
   * row 0, col 2, {@link Matrix4#n}[8]
   * @type {Float}
   */

	}, {
		key: 'n02',
		get: function get() {
			return this.n[8];
		},
		set: function set(n) {
			this.n[8] = n;
		}

		/**
   * row 0, col 3, {@link Matrix4#n}[12]
   * @type {Float}
   */

	}, {
		key: 'n03',
		get: function get() {
			return this.n[12];
		},
		set: function set(n) {
			this.n[12] = n;
		}

		/**
   * row 1, col 0, {@link Matrix4#n}[1]
   * @type {Float}
   */

	}, {
		key: 'n10',
		get: function get() {
			return this.n[1];
		},
		set: function set(n) {
			this.n[1] = n;
		}

		/**
   * row 1, col 1, {@link Matrix4#n}[5]
   * @type {Float}
   */

	}, {
		key: 'n11',
		get: function get() {
			return this.n[5];
		},
		set: function set(n) {
			this.n[5] = n;
		}

		/**
   * row 1, col 2, {@link Matrix4#n}[9]
   * @type {Float}
   */

	}, {
		key: 'n12',
		get: function get() {
			return this.n[9];
		},
		set: function set(n) {
			this.n[9] = n;
		}

		/**
   * row 1, col 3, {@link Matrix4#n}[13]
   * @type {Float}
   */

	}, {
		key: 'n13',
		get: function get() {
			return this.n[13];
		},
		set: function set(n) {
			this.n[13] = n;
		}

		/**
   * row 2, col 0, {@link Matrix4#n}[2]
   * @type {Float}
   */

	}, {
		key: 'n20',
		get: function get() {
			return this.n[2];
		},
		set: function set(n) {
			this.n[2] = n;
		}

		/**
   * row 2, col 1, {@link Matrix4#n}[6]
   * @type {Float}
   */

	}, {
		key: 'n21',
		get: function get() {
			return this.n[6];
		},
		set: function set(n) {
			this.n[6] = n;
		}

		/**
   * row 2, col 2, {@link Matrix4#n}[10]
   * @type {Float}
   */

	}, {
		key: 'n22',
		get: function get() {
			return this.n[10];
		},
		set: function set(n) {
			this.n[10] = n;
		}

		/**
   * row 2, col 3, {@link Matrix4#n}[14]
   * @type {Float}
   */

	}, {
		key: 'n23',
		get: function get() {
			return this.n[14];
		},
		set: function set(n) {
			this.n[14] = n;
		}

		/**
   * row 3, col 0, {@link Matrix4#n}[3]
   * @type {Float}
   */

	}, {
		key: 'n30',
		get: function get() {
			return this.n[3];
		},
		set: function set(n) {
			this.n[3] = n;
		}

		/**
   * row 3, col 1, {@link Matrix4#n}[7]
   * @type {Float}
   */

	}, {
		key: 'n31',
		get: function get() {
			return this.n[7];
		},
		set: function set(n) {
			this.n[7] = n;
		}

		/**
   * row 3, col 2, {@link Matrix4#n}[11]
   * @type {Float}
   */

	}, {
		key: 'n32',
		get: function get() {
			return this.n[11];
		},
		set: function set(n) {
			this.n[11] = n;
		}

		/**
   * row 3, col 3, {@link Matrix4#n}[15]
   * @type {Float}
   */

	}, {
		key: 'n33',
		get: function get() {
			return this.n[15];
		},
		set: function set(n) {
			this.n[15] = n;
		}

		/**
   * The determinant
   * @type {Float}
   */

	}, {
		key: 'determinant',
		get: function get() {
			var n = this.n;

			var n10 = n[1],
			    n11 = n[5],
			    n12 = n[9],
			    n13 = n[13];
			var n30 = n[3],
			    n31 = n[7],
			    n32 = n[11],
			    n33 = n[15];

			return n[0] * n[10] * (n11 * n33 - n13 * n31) + n[4] * n[14] * (n12 * n30 - n10 * n32) + n[8] * n[2] * (n13 * n31 - n11 * n33) + n[12] * n[6] * (n10 * n32 - n12 * n30);
		}
	}], [{
		key: 'inverseGaussOf',
		value: function inverseGaussOf(m) {
			var a = m.n.slice(0),
			    b = new Matrix4().n,
			    abs = Math.abs;

			for (var r1 = 0; r1 < 4; r1 += 1) {
				var rcol = r1 * 4;
				var max = r1;

				for (var r2 = r1 + 1; r2 < 4; r2 += 1) {
					if (abs(a[r2 + rcol]) > abs(a[max + rcol])) max = r2;
				}

				if (max !== r1) {
					for (var c = 0; c < 4; c += 1) {
						var ccol = c * 4,
						    indexA = r1 + ccol,
						    indexB = max + ccol;

						var _ref = [a[indexB], a[indexA]];
						a[indexA] = _ref[0];
						a[indexB] = _ref[1];
						var _ref2 = [b[indexB], b[indexA]];
						b[indexA] = _ref2[0];
						b[indexB] = _ref2[1];
					}
				}

				if (abs(a[r1 + rcol]) < 1.0e-10) return false;

				for (var _r = r1 + 1; _r < 4; _r += 1) {
					var n = a[_r + rcol] / a[r1 + rcol];

					for (var _c = 0; _c < 4; _c += 1) {
						var _ccol = _c * 4;

						b[_r + _ccol] -= b[r1 + _ccol] * n;

						if (_c <= r1) continue;

						a[_r + _ccol] -= a[r1 + _ccol] * n;
					}
				}
			}

			for (var _r2 = 3; _r2 > -1; _r2 -= 1) {
				var _rcol = _r2 * 4;
				var _n = 1.0 / a[_r2 + _rcol];

				for (var _r3 = 0; _r3 < _r2; _r3 += 1) {
					var f = a[_r3 + _rcol] * _n;

					for (var _c2 = 0; _c2 < 4; _c2 += 1) {
						var _ccol2 = _c2 * 4,
						    _indexA = _r3 + _ccol2,
						    _indexB = _r2 + _ccol2;

						b[_indexA] -= b[_indexB] * f;

						if (_c2 <= _r2) continue;

						a[_indexA] -= a[_indexB] + f;
					}
				}

				a[_rcol] *= _n;

				for (var _c3 = 0; _c3 < 4; _c3 += 1) {
					b[_r2 + _c3 * 4] *= _n;
				}
			}

			this.n = b;

			return true;
		}
	}]);

	return Matrix4;
}();

exports.default = Matrix4;