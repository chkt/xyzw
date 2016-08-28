"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Matrix = require("./Matrix2");

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2x3 and 3x3 transformations
 */
var Matrix3 = function () {
	_createClass(Matrix3, null, [{
		key: "Rotation",


		/**
   * Returns a instance of axis and rotation
   * @constructor
   * @param {Vector3} axis - The rotation axis
   * @param {Float} rad - The rotation in radians
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */
		value: function Rotation(axis, rad, target) {
			var n = [];

			var x = axis.n[0],
			    y = axis.n[1],
			    z = axis.n[2];
			var sin = Math.sin(rad),
			    cos = Math.cos(rad),
			    vers = 1.0 - cos;

			var xSin = x * sin,
			    ySin = y * sin,
			    zSin = z * sin;
			var xyVers = x * y * vers,
			    xzVers = x * z * vers,
			    yzVers = y * z * vers;

			n[0] = cos + vers * x * x;n[3] = xyVers - zSin;n[6] = xzVers + ySin;
			n[1] = xyVers + zSin;n[4] = cos + vers * y * y;n[7] = yzVers - xSin;
			n[2] = xzVers - ySin;n[5] = yzVers + xSin;n[8] = cos + vers * z * z;

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of x-axis rotation
   * @constructor
   * @param {Float} rad - The rotation in radians
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "RotationX",
		value: function RotationX(rad, target) {
			var sin = Math.sin(rad);
			var cos = Math.cos(rad);

			var n = [1.0, 0.0, 0.0, 0.0, cos, sin, 0.0, -sin, cos];

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of y-axis rotation
   * @constructor
   * @param {Float} rad - The rotation in radians
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "RotationY",
		value: function RotationY(rad, target) {
			var sin = Math.sin(rad);
			var cos = Math.cos(rad);

			var n = [cos, 0.0, sin, 0.0, 1.0, 0.0, -sin, 0.0, cos];

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of z-axis rotation
   * @constructor
   * @param {Float} rad - The rotation in radians
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "RotationZ",
		value: function RotationZ(rad, target) {
			var sin = Math.sin(rad);
			var cos = Math.cos(rad);

			var n = [cos, sin, 0.0, -sin, cos, 0.0, 0.0, 0.0, 1.0];

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of (x,y,z) ordered euler angles
   * @constructor
   * @param {Float} x - The first (x-axis) rotation in radians
   * @param {Float} y - The second (y-axis) rotation in radians
   * @param {Float} z - The third (z-axis) rotation in radians
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "EulerXYZ",
		value: function EulerXYZ(x, y, z, target) {
			var sx = Math.sin(x),
			    cx = Math.cos(x);
			var sy = Math.sin(y),
			    cy = Math.cos(y);
			var sz = Math.sin(z),
			    cz = Math.cos(z);

			var n = [];

			n[0] = cy * cz;
			n[3] = -cy * sz;
			n[6] = sy;

			n[1] = cx * sz + sx * sy * cz;
			n[4] = cx * cz - sx * sy * sz;
			n[7] = -sx * cy;

			n[2] = sx * sz - cx * sy * cz;
			n[5] = sx * cz + cx * sy * sz;
			n[8] = cx * cy;

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of (y,x,z) ordered euler angles
   * @constructor
   * @param {Float} x - The second (x-axis) rotation in radians
   * @param {Float} y - The first (y-axis) rotation in radians
   * @param {Float} z - The third (z-axis) rotation in radians
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   *
   */

	}, {
		key: "EulerYXZ",
		value: function EulerYXZ(x, y, z, target) {
			var sx = Math.sin(x),
			    cx = Math.cos(x);
			var sy = Math.sin(y),
			    cy = Math.cos(y);
			var sz = Math.sin(z),
			    cz = Math.cos(z);

			var n = [];

			n[0] = cy * cz + sy * sx * sz;
			n[3] = -cy * sz + sy * sx * cz;
			n[6] = sy * cx;

			n[1] = cx * sz;
			n[4] = cx * cz;
			n[7] = -sx;

			n[2] = -sy * cz + cy * sx * sz;
			n[5] = sy * sz + cy * sx * cz;
			n[8] = cy * cx;

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of (z,x,y) ordered euler angles
   * @constructor
   * @param {Float} x - The second (x-axis) rotation in radians
   * @param {Float} y - The third (y-axis) rotation in radians
   * @param {Float} z - The first (z-axis) rotation in radians
   * @param {Matrix3} [target] - The target instance
   * @return {Matrix3}
   */

	}, {
		key: "EulerZXY",
		value: function EulerZXY(x, y, z, target) {
			var sx = Math.sin(x),
			    cx = Math.cos(x);
			var sy = Math.sin(y),
			    cy = Math.cos(y);
			var sz = Math.sin(z),
			    cz = Math.cos(z);

			var n = [];

			n[0] = cz * cy - sz * sx * sy;
			n[3] = -sz * cx;
			n[6] = cz * sy + sz * sx * cy;

			n[1] = sz * cy + cz * sx * sy;
			n[4] = cz * cx;
			n[7] = sz * sy - cz * sx * cy;

			n[2] = -cx * sy;
			n[5] = sx;
			n[8] = cx * cy;

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of scale vector
   * @constructor
   * @param {Vector3} v - The source
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Scale",
		value: function Scale(v, target) {
			var vn = v.n;

			var n = [vn[0], 0.0, 0.0, 0.0, vn[1], 0.0, 0.0, 0.0, vn[2]];

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of translation vector
   * @constructor
   * @param {Vector2} v - The source
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Translation",
		value: function Translation(v, target) {
			var vn = v.n;

			var n = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, vn[0], vn[1], 1.0];

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of axes (x, y, z)
   * @constructor
   * @param {Vector3} x - The x-axis vector
   * @param {Vector3} y - The y-axis vector
   * @param {Vector3} z - The z-axis vector
   * @param {Matrix3} [target] - The target instance
   * @return {Matrix3}
   */

	}, {
		key: "Vector3",
		value: function Vector3(x, y, z, target) {
			var n = [].concat(x.n, y.n, z.n);

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of unit-quaternion q
   * @constructor
   * @param {Vector4} q - The source
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Vector4",
		value: function Vector4(q, target) {
			var qn = q.n,
			    n = [];

			var x = qn[0],
			    y = qn[1],
			    z = qn[2],
			    w = qn[3];

			var xx = x * x,
			    yy = y * y,
			    zz = z * z;
			var xy = x * y,
			    yz = y * z,
			    xz = x * z;
			var xw = x * w,
			    yw = y * w,
			    zw = z * w;

			var s = 2.0 / Math.sqrt(xx + yy + zz + w * w);

			n[0] = 1.0 - s * (yy + zz);n[1] = s * (xy + zw);n[2] = s * (xz - yw);
			n[3] = s * (xy - zw);n[4] = 1.0 - s * (xx + zz);n[5] = s * (yz + xw);
			n[6] = s * (xz + yw);n[7] = s * (yz - xw);n[8] = 1.0 - s * (xx + yy);

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of m
   * The instance will be padded to 3x3
   * @constructor
   * @param {Matrix2} m - The source
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Matrix2",
		value: function Matrix2(m, target) {
			var n = m.n.concat([0.0, 0.0, 0.0, 1.0]);

			n.splice(2, 0, 0.0);

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of m
   * The instance will be cropped to 3x3 by removing the fourth row & column of m
   * @constructor
   * @param {Matrix4} m - The source
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Matrix4",
		value: function Matrix4(m, target) {
			var n = m.n.slice(0, 11);

			n.splice(7, 1);
			n.splice(3, 1);

			if (target === undefined) target = new Matrix3(n);else target.n = n;

			return target;
		}

		/**
   * Returns the sum of a and b (a+b)
   * @constructor
   * @param {Matrix3} a - The first summand
   * @param {Matrix3} b - The second summand
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Add",
		value: function Add(a, b, target) {
			return (target === undefined ? new Matrix3() : target).add(a, b);
		}

		/**
   * Returns the difference of a and b (a-b)
   * @constructor
   * @param {Matrix3} a - The minuend
   * @param {Matrix3} b - The subtrahend
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Subtract",
		value: function Subtract(a, b, target) {
			return (target === undefined ? new Matrix3() : target).subtract(a, b);
		}

		/**
   * Returns the 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Matrix2(Matrix2.Scale(v)))
   * Components 2x are assumed to be (0.0,0.0,1.0)
   * @constructor
   * @param {Matrix3} m - The matrix
   * @param {Vector2} v - The vector
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Multiply2x3Vector2Scale",
		value: function Multiply2x3Vector2Scale(m, v, target) {
			return (target === undefined ? new Matrix3() : target).multiply2x3Vector2Scale(m, v);
		}

		/**
   * Returns the 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Translation(v))
   * @constructor
   * @param {Matrix3} m - The matrix
   * @param {Vector2} v - The vector
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Multiply2x3Vector2Translation",
		value: function Multiply2x3Vector2Translation(m, v, target) {
			return (target === undefined ? new Matrix3() : target).multiply2x3Vector2Translation(m, v);
		}

		/**
   * Returns the 2x3 concatenation of a and b (a*b)
   * Components 2x are assumed to be (0.0,0.0,1.0)
   * @constructor
   * @param {Matrix3} a - The first transform
   * @param {Matrix2} b - The second transform
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Multiply2x3Matrix2",
		value: function Multiply2x3Matrix2(a, b, target) {
			return (target === undefined ? new Matrix3() : target).multiply2x3Matrix2(a, b);
		}

		/**
   * Returns the 2x3 concatenation of a and b (a*b)
   * Components 2x are assumed to be (0.0,0.0,1.0)
   * @constructor
   * @param {Matrix3} a - The first transform
   * @param {Matrix3} b - The second transform
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Multiply2x3",
		value: function Multiply2x3(a, b, target) {
			return (target === undefined ? new Matrix3() : target).multiply2x3(a, b);
		}

		/**
   * Returns the concatenation of a and b (a*b)
   * @constructor
   * @param {Matrix3} a - The first transform
   * @param {Matrix3} b - The second transform
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Multiply",
		value: function Multiply(a, b, target) {
			return (target === undefined ? new Matrix3() : target).multiply(a, b);
		}

		/**
   * Returns the inverse of m
   * Returns null if m is assumed to be singular, the inverse of m otherwise
   * @constructor
   * @param {Matrix3} m - The source
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3|null}
   */

	}, {
		key: "Inverse",
		value: function Inverse(m, target) {
			if (target === undefined) target = new Matrix3();

			return target.inverseOf(m) ? target : null;
		}

		/**
   * Returns the transpose of m
   * @constructor
   * @param {Matrix3} m - The source
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Transpose",
		value: function Transpose(m, target) {
			return (target === undefined ? new Matrix3() : target).transposeOf(m);
		}

		/**
   * Returns a copy of m
   * @constructor
   * @param {Matrix3} m - The source
   * @param {Matrix3} [target] - The target instance
   * @returns {Matrix3}
   */

	}, {
		key: "Copy",
		value: function Copy(m, target) {
			return (target === undefined ? new Matrix3() : target).copyOf(m);
		}

		/**
   * Returns true if a and b are equal, false otherwise
   * @param {Matrix3} a - The protagonist
   * @param {Matrix3} b - The antagonist
   * @returns {Boolean}
   */

	}, {
		key: "isEQ",
		value: function isEQ(a, b) {
			if (a === b) return true;

			var an = a.n,
			    bn = b.n;

			for (var i = 0; i < 9; i++) {
				if (an[i] !== bn[i]) return false;
			}

			return true;
		}

		/**
   * Creates a new instance
   * @param {Float[]} [n] - Array represeting 3x3 column-major ordered components
   * Arrays of length <em>!== 9</em> will return the identity matrix
   */

	}]);

	function Matrix3(n) {
		_classCallCheck(this, Matrix3);

		/**
   * The array representation
   * Contains the 9 column-major ordered components of the instance
   * n[0]:n00 n[3]:n01 n[6]:n02
   * n[1]:n10 n[4]:n11 n[7]:n12
   * n[2]:n20 n[5]:n21 n[8]:n22
   * @type Float[]
   */
		this.n = n && n.constructor === Array && n.length === 9 ? n : [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
	}

	/**
  * Redefines the instance
  * @param {Float[]} [n] - Array representing 3x3 column-major ordered components
  * Arrays of length <em>!== 9</em> will return the identity matrix.
  * @returns {Matrix3}
  */


	_createClass(Matrix3, [{
		key: "define",
		value: function define(n) {
			this.constructor.call(this, n);

			return this;
		}

		/**
   * row 0, col 0, {@link Matrix3#n}[0]
   * @type Float
   */

	}, {
		key: "add",


		/**
   * The sum of a and b (a+b)
   * @param {Matrix3} a - The first summand
   * @param {Matrix3} b - The second summand
   * @returns {Matrix3}
   */
		value: function add(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			for (var i = 0; i < 9; i++) {
				n[i] = an[i] + bn[i];
			}return this;
		}

		/**
   * The difference of a and b (a-b)
   * @param {Matrix3} a - The minuend
   * @param {Matrix3} b - The subtrahend
   * @returns {Matrix3}
   */

	}, {
		key: "subtract",
		value: function subtract(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			for (var i = 0; i < 9; i++) {
				n[i] = an[i] - bn[i];
			}return this;
		}

		/**
   * The 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Matrix2(Matrix2.Scale(v)))
   * Components 2x are assumed to be (0.0,0.0,1.0)
   * @param {Matrix3} m - The matrix
   * @param {Vector2} v - The vector
   * @returns {Matrix3}
   */

	}, {
		key: "multiply2x3Vector2Scale",
		value: function multiply2x3Vector2Scale(m, v) {
			var n = this.n = m.n.slice(0),
			    vn = v.n;

			var v00 = vn[0],
			    v11 = vn[1];

			n[0] *= v00, n[3] *= v11;
			n[1] *= v00, n[4] *= v11;
			n[2] *= v00, n[5] *= v11;

			return this;
		}

		/**
   * The 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Translation(v))
   * Components 2x are assumed to be (0.0,0.0,1.0)
   * @param {Matrix3} m - The matrix
   * @param {Vector2} v - The vector
   * @returns {Matrix3}
   */

	}, {
		key: "multiply2x3Vector2Translation",
		value: function multiply2x3Vector2Translation(m, v) {
			var n = this.n,
			    mn = m.n,
			    vn = v.n;

			var m00 = mn[0],
			    m01 = mn[3],
			    m02 = mn[6];
			var m10 = mn[1],
			    m11 = mn[4],
			    m12 = mn[7];
			var m20 = mn[2],
			    m21 = mn[5],
			    m22 = mn[8];

			var v02 = vn[0],
			    v12 = vn[1];

			n[0] = m00, n[3] = m01, n[6] = m00 * v02 + m01 * v12 + m02;
			n[1] = m10, n[4] = m11, n[7] = m10 * v02 + m11 * v12 + m12;
			n[2] = m20, n[5] = m21, n[8] = m20 * v02 + m21 * v12 + m22;

			return this;
		}

		/**
   * The 2x3 concatenation of a and b (a*b)
   * Components 2x are assumed to be (0.0,0.0,1.0)
   * @param {Matrix3} a - The first transform
   * @param {Matrix2} b - The second transform
   * @returns {Matrix3}
   */

	}, {
		key: "multiply2x3Matrix2",
		value: function multiply2x3Matrix2(a, b) {
			var n = this.n;

			var _a$n = _slicedToArray(a.n, 9);

			var a00 = _a$n[0];
			var a10 = _a$n[1];
			var a20 = _a$n[2];
			var a01 = _a$n[3];
			var a11 = _a$n[4];
			var a21 = _a$n[5];
			var a02 = _a$n[6];
			var a12 = _a$n[7];
			var a22 = _a$n[8];

			var _b$n = _slicedToArray(b.n, 4);

			var b00 = _b$n[0];
			var b10 = _b$n[1];
			var b01 = _b$n[2];
			var b11 = _b$n[3];


			n[0] = a00 * b00 + a01 * b10;
			n[3] = a00 * b01 + a01 * b11;
			n[6] = a02;

			n[1] = a10 * b00 + a11 * b10;
			n[4] = a10 * b01 + a11 * b11;
			n[7] = a12;

			n[2] = n[5] = 0.0;
			n[8] = 1.0;

			return this;
		}

		/**
   * The 2x3 concatenation of a and b (a*b)
   * Components 2x are assumed to be (0.0,0.0,1.0)
   * @param {Matrix3} a - The first transform
   * @param {Matrix3} b - The second transform
   * @returns {Matrix3}
   */

	}, {
		key: "multiply2x3",
		value: function multiply2x3(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			var a00 = an[0],
			    a01 = an[3],
			    a02 = an[6];
			var a10 = an[1],
			    a11 = an[4],
			    a12 = an[7];

			var b00 = bn[0],
			    b01 = bn[3],
			    b02 = bn[6];
			var b10 = bn[1],
			    b11 = bn[4],
			    b12 = bn[7];

			n[0] = a00 * b00 + a01 * b10;
			n[3] = a00 * b01 + a01 * b11;
			n[6] = a00 * b02 + a01 * b12 + a02;

			n[1] = a10 * b00 + a11 * b10;
			n[4] = a10 * b01 + a11 * b11;
			n[7] = a10 * b02 + a11 * b12 + a12;

			n[2] = n[5] = 0.0;
			n[8] = 1.0;

			return this;
		}

		/**
   * The concatenation of a and b (a*b)
   * @param {Matrix3} a - The first transform
   * @param {Matrix3} b - The second transform
   * @returns {Matrix3}
   */

	}, {
		key: "multiply",
		value: function multiply(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			var a00 = an[0],
			    a01 = an[3],
			    a02 = an[6];
			var a10 = an[1],
			    a11 = an[4],
			    a12 = an[7];
			var a20 = an[2],
			    a21 = an[5],
			    a22 = an[8];

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
			n[3] = a00 * b01 + a01 * b11 + a02 * b21;
			n[6] = a00 * b02 + a01 * b12 + a02 * b22;

			n[1] = a10 * b00 + a11 * b10 + a12 * b20;
			n[4] = a10 * b01 + a11 * b11 + a12 * b21;
			n[7] = a10 * b02 + a11 * b12 + a12 * b22;

			n[2] = a20 * b00 + a21 * b10 + a22 * b20;
			n[5] = a20 * b01 + a21 * b11 + a22 * b21;
			n[8] = a20 * b02 + a21 * b12 + a22 * b22;

			return this;
		}

		/**
   * The inverse of m
   * Beware: method is NOT chainable
   * @param {Matrix3} m - The source
   * @returns {Boolean}
   * Returns false if m is assumed to be singular, true otherwise
   */

	}, {
		key: "inverseOf",
		value: function inverseOf(m) {
			var n = this.n,
			    mn = m.n,
			    d = m.determinant;

			if (Math.abs(d) < 1.0e-10) return false;

			d = 1.0 / d;

			var m00 = mn[0],
			    m01 = mn[3],
			    m02 = mn[6];
			var m10 = mn[1],
			    m11 = mn[4],
			    m12 = mn[7];
			var m20 = mn[2],
			    m21 = mn[5],
			    m22 = mn[8];

			n[0] = d * (m11 * m22 - m12 * m21);
			n[3] = -d * (m01 * m22 - m02 * m21);
			n[6] = d * (m01 * m12 - m02 * m11);

			n[1] = -d * (m10 * m22 - m12 * m20);
			n[4] = d * (m00 * m22 - m02 * m20);
			n[7] = -d * (m00 * m12 - m02 * m10);

			n[2] = d * (m10 * m21 - m11 * m20);
			n[5] = -d * (m00 * m21 - m01 * m20);
			n[8] = d * (m00 * m11 - m01 * m10);

			return true;
		}

		/**
   * The transpose of m
   * @param {Matrix3} m - The source
   * @returns {Matrix3}
   */

	}, {
		key: "transposeOf",
		value: function transposeOf(m) {
			var n = this.n,
			    mn = m.n.slice(0, 9);

			n[3] = mn[1], n[6] = mn[2];
			n[1] = mn[3], n[7] = mn[5];
			n[2] = mn[6], n[5] = mn[7];

			return this;
		}

		/**
   * The copy of m
   * @param {Matrix3} m - The source
   * @returns {Matrix3}
   */

	}, {
		key: "copyOf",
		value: function copyOf(m) {
			this.n = m.n.slice(0, 9);

			return this;
		}

		/**
   * The inverse of the instance
   * Beware: method is NOT chainable
   * @returns {Boolean}
   * Returns false if the instance is assumed to be singular, true otherwise
   */

	}, {
		key: "invert",
		value: function invert() {
			return this.inverseOf(this);
		}

		/**
   * The transpose of the instance
   * @returns {Matrix3}
   */

	}, {
		key: "transpose",
		value: function transpose() {
			return this.transposeOf(this);
		}

		/**
   * Returns a (x,y,z) ordered (y,x,z) euler angle representation of the instance
   * @returns {Float[]}
   */

	}, {
		key: "toEulerYXZ",
		value: function toEulerYXZ() {
			var n = this.n,
			    x = Math.asin(-n[7]);
			var y = void 0,
			    z = void 0;

			if (Math.abs(n[7]) !== 1.0) {
				y = Math.atan2(n[6], n[8]);
				z = Math.atan2(n[1], n[4]);
			} else {
				y = Math.atan2(n[3], n[0]);
				z = 0.0;
			}

			return [x, y, z];
		}

		/**
   * Returns a (x,y,z) ordered (z,x,y) euler angle representation of the instance
   * @returns {Float[]}
   */

	}, {
		key: "toEulerZXY",
		value: function toEulerZXY() {
			var n = this.n,
			    x = Math.asin(-n[5]);
			var y = void 0,
			    z = void 0;

			if (Math.abs(n[5]) !== 1.0) {
				y = Math.atan2(-n[2], n[8]);
				z = Math.atan2(-n[3], n[4]);
			} else {
				y = 0.0;
				z = Math.atan2(n[1], n[0]);
			}

			return [x, y, z];
		}

		/**
   * Returns a css-formated 2x3 string representation of the instance
   * Components 2x are assumed to be (0.0,0.0,1.0)
   * @param {Uint} [digits=3] - The decimal digits
   * @returns {String}
   */

	}, {
		key: "toCSS2x3",
		value: function toCSS2x3() {
			var digits = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

			var str = this.n.filter(function (item, index, source) {
				return index % 3 !== 2;
			}).map(function (item, index, source) {
				return item.toFixed(digits);
			}).join(",");

			return "matrix(" + str + ")";
		}

		/**
   * Returns a css-formated 3x3 string representation of the instance
   * @param {Uint} [digits=3] - The decimal digits
   * @returns {String}
   */

	}, {
		key: "toCSS",
		value: function toCSS() {
			var digits = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

			var str = this.n.map(function (item, index, source) {
				return item.toFixed(digits);
			}).join(",");

			return "matrix3d(" + str + ")";
		}

		/**
   * Returns a string representation of the instance
   * @param {Uint} [digits=3] - The decimal digits
   * @returns {String}
   */

	}, {
		key: "toString",
		value: function toString() {
			var digits = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

			var str = this.n.map(function (item, index, source) {
				return (index % 3 === 0.0 ? "\n" : "\t") + item.toFixed(digits);
			}).join("");

			return "[Matrix3]" + str;
		}

		/**
   * Returns the {@link Matrix3#determinant} of the instance
   * @returns {Float}
   */

	}, {
		key: "valueOf",
		value: function valueOf() {
			return this.determinant;
		}
	}, {
		key: "n00",
		get: function get() {
			return this.n[0];
		},
		set: function set(n) {
			this.n[0] = n;
		}

		/**
   * row 0, col 1, {@link Matrix3#n}[3]
   * @type Float
   */

	}, {
		key: "n01",
		get: function get() {
			return this.n[3];
		},
		set: function set(n) {
			this.n[3] = n;
		}

		/**
   * row 0, col 2, {@link Matrix3#n}[6]
   * @type Float
   */

	}, {
		key: "n02",
		get: function get() {
			return this.n[6];
		},
		set: function set(n) {
			this.n[6] = n;
		}

		/**
   * row 1, col 0, {@link Matrix3#n}[1]
   * @type Float
   */

	}, {
		key: "n10",
		get: function get() {
			return this.n[1];
		},
		set: function set(n) {
			this.n[1] = n;
		}

		/**
   * row 1, col 1, {@link Matrix3#n}[4]
   * @type Float
   */

	}, {
		key: "n11",
		get: function get() {
			return this.n[4];
		},
		set: function set(n) {
			this.n[4] = n;
		}

		/**
   * row 1, col 2, {@link Matrix3#n}[7]
   * @type Float
   */

	}, {
		key: "n12",
		get: function get() {
			return this.n[7];
		},
		set: function set(n) {
			this.n[7] = n;
		}

		/**
   * row 2, col 0, {@link Matrix3#n}[2]
   * @type Float
   */

	}, {
		key: "n20",
		get: function get() {
			return this.n[2];
		},
		set: function set(n) {
			this.n[2] = n;
		}

		/**
   * row 2, col 1, {@link Matrix3#n}[5]
   * @type Float
   */

	}, {
		key: "n21",
		get: function get() {
			return this.n[5];
		},
		set: function set(n) {
			this.n[5] = n;
		}

		/**
   * row 2, col 2, {@link Matrix3#n}[8]
   * @type Float
   */

	}, {
		key: "n22",
		get: function get() {
			return this.n[8];
		},
		set: function set(n) {
			this.n[8] = n;
		}

		/**
   * The determinant
   * @type Float
   */

	}, {
		key: "determinant",
		get: function get() {
			var n = this.n;

			var n10 = n[1],
			    n11 = n[4],
			    n12 = n[7];
			var n20 = n[2],
			    n21 = n[5],
			    n22 = n[8];

			return n[0] * (n11 * n22 - n12 * n21) + n[3] * (n12 * n20 - n10 * n22) + n[6] * (n10 * n21 - n11 * n20);
		}
	}]);

	return Matrix3;
}();

exports.default = Matrix3;