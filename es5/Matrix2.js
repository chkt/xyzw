"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2x2 transformations
 */
var Matrix2 = function () {
	_createClass(Matrix2, null, [{
		key: "Rotation",


		/**
   * Returns a instance of z-axis rotation
   * @constructor
   * @param {Float} rad - The rotation in radians
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */
		value: function Rotation(rad, target) {
			var sin = Math.sin(rad);
			var cos = Math.cos(rad);

			var n = [cos, sin, -sin, cos];

			if (target === undefined) target = new Matrix2(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of scale vector
   * @constructor
   * @param {Vector2} v - The source
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */

	}, {
		key: "Scale",
		value: function Scale(v, target) {
			var n = [v.n[0], 0.0, 0.0, v.n[1]];

			if (target === undefined) target = new Matrix2(n);else target.n = n;

			return target;
		}

		/**
   * Returns a new instance of axes (x, y)
   * @constructor
   * @param {Vector2} x - The x-axis vector
   * @param {Vector2} y - The y-axis vector
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */

	}, {
		key: "Vector2",
		value: function Vector2(x, y, target) {
			var n = [].concat(x.n, y.n);

			if (target === undefined) target = new Matrix2(n);else target.n = n;

			return target;
		}

		/**
   * Returns a new instance of converted m
   * The instance will be cropped to 2x2 by removing the third row & column of m
   * @param {Matrix3} m - The source
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */

	}, {
		key: "Matrix3",
		value: function Matrix3(m, target) {
			var n = m.n.slice(0, 5);

			n.splice(2, 1);

			if (target === undefined) target = new Matrix2(n);else target.n = n;

			return target;
		}

		/**
   * Returns the sum of a and b (a+b)
   * @constructor
   * @param {Matrix2} a - The first summand
   * @param {Matrix2} b - The second summand
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */

	}, {
		key: "Add",
		value: function Add(a, b, target) {
			return (target === undefined ? new Matrix2() : target).add(a, b);
		}

		/**
   * Returns the difference of a and b (a-b)
   * @constructor
   * @param {Matrix2} a - The minuend
   * @param {Matrix2} b - The subtrahend
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */

	}, {
		key: "Subtract",
		value: function Subtract(a, b, target) {
			return (target === undefined ? new Matrix2() : target).subtract(a, b);
		}

		/**
   * Returns the concatenation of a and b (a*b)
   * @constructor
   * @param {Matrix2} a - The first matrix
   * @param {Matrix2} b - The second matrix
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */

	}, {
		key: "Multiply",
		value: function Multiply(a, b, target) {
			return (target === undefined ? new Matrix2() : target).multiply(a, b);
		}

		/**
   * Returns the inverse of m
   * Returns null if m is assumed to be singular, the new instance otherwise
   * @constructor
   * @param {Matrix2} m - The source
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2|null}
   */

	}, {
		key: "Inverse",
		value: function Inverse(m, target) {
			if (target === undefined) target = new Matrix2();

			return target.inverseOf(m) ? target : null;
		}

		/**
   * Returns the transpose of m
   * @constructor
   * @param {Matrix2} m - The source
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */

	}, {
		key: "Transpose",
		value: function Transpose(m, target) {
			return (target === undefined ? new Matrix2() : target).transposeOf(m);
		}

		/**
   * Returns a copy of m
   * @constructor
   * @param {Matrix2} m - The source
   * @param {Matrix2} [target] - The target instance
   * @returns {Matrix2}
   */

	}, {
		key: "Copy",
		value: function Copy(m, target) {
			return (target === undefined ? new Matrix2() : target).copyOf(m);
		}

		/**
   * Returns true if a and b are equal, false otherwise (a==b)
   * @param {Matrix2} a - The first matrix
   * @param {Matrix2} b - The second matrix
   * @returns {Boolean}
   */

	}, {
		key: "isEQ",
		value: function isEQ(a, b) {
			if (a === b) return true;

			var an = a.n,
			    bn = b.n;

			for (var i = 0; i < 4; i++) {
				if (an[i] !== bn[i]) return false;
			}

			return true;
		}

		/**
   * Creates a new instance
   * @param {Float[]} [n] - Array representing 2x2 column-major ordered components
   * Arrays of length !== 4 will return the identity matrix
   */

	}]);

	function Matrix2(n) {
		_classCallCheck(this, Matrix2);

		/**
   * The array representation
   * The 4 column-major ordered components
   * n[0]:n00 n[2]:n01
   * n[1]:n10 n[3]:n11
   * @type Float[]
   */
		this.n = n && n.constructor === Array && n.length === 4 ? n : [1.0, 0.0, 0.0, 1.0];
	}

	/**
  * Redefines the instance
  * @param {Float[]} [n] - Array representing the 2x2 column-major ordered compoents
  * Array of length !== 4 will return the identity matrix
  * @returns {Matrix2}
  */


	_createClass(Matrix2, [{
		key: "define",
		value: function define(n) {
			this.constructor.call(this, n);

			return this;
		}

		/**
   * row 0, col0, {@link Matrix2#n}[0]
   * @type Float
   */

	}, {
		key: "add",


		/**
   * The sum of a and b (a+b)
   * @param {Matrix2} a - The first summand
   * @param {Matrix2} b - The second summand
   * @returns {Matrix2}
   */
		value: function add(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			for (var i = 0; i < 4; i++) {
				n[i] = an[i] + bn[i];
			}return this;
		}

		/**
   * The difference of a and b (a-b)
   * @param {Matrix2} a - The minuend
   * @param {Matrix2} b - The subtrahend
   * @returns {Matrix2}
   */

	}, {
		key: "subtract",
		value: function subtract(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			for (var i = 0; i < 4; i++) {
				n[i] = an[i] + bn[i];
			}return this;
		}

		/**
   * The concatenation of a and b (a*b)
   * @param {Matrix2} a - The first transform
   * @param {Matrix2} b - The second transform
   * @returns {Matrix2}
   */

	}, {
		key: "multiply",
		value: function multiply(a, b) {
			var n = this.n,
			    an = a.n,
			    bn = b.n;

			var a00 = an[0],
			    a01 = an[2];
			var a10 = an[1],
			    a11 = an[3];

			var b00 = bn[0],
			    b01 = bn[2];
			var b10 = bn[1],
			    b11 = bn[3];

			n[0] = a00 * b00 + a01 * b10;
			n[2] = a00 * b01 + a01 * b11;

			n[1] = a10 * b00 + a11 * b10;
			n[3] = a10 * b01 + a11 * b11;

			return this;
		}

		/**
   * The inverse of m
   * Beware: method is NOT chainable
   * Returns false if m is assumed to be singular, true otherwise
   * @param {Matrix2} m - The source
   * @returns {Boolean}
   */

	}, {
		key: "inverseOf",
		value: function inverseOf(m) {
			var n = this.n,
			    mn = m.n;

			var m00 = mn[0],
			    m01 = mn[2];
			var m10 = mn[1],
			    m11 = mn[3];

			var d = m00 * m11 - m01 * m10;

			if (Math.abs(d) < 1.0e-10) return false;

			d = 1.0 / d;

			n[0] = d * m11, n[2] = -d * m01;
			n[1] = -d * m10, n[3] = d * m00;

			return true;
		}

		/**
   * The transpose of m
   * @param {Matrix2} m - The source
   * @returns {Matrix2}
   */

	}, {
		key: "transposeOf",
		value: function transposeOf(m) {
			var mn2 = m.n[2];

			this.n[2] = m.n[1];
			this.n[1] = mn2;

			return this;
		}

		/**
   * The copy of m
   * @param {Matrix2} m - The source
   * @returns {Matrix2}
   */

	}, {
		key: "copyOf",
		value: function copyOf(m) {
			this.n = m.n.slice(0, 4);

			return this;
		}

		/**
   * The inverse of the instance
   * Returns false if the instance is assumed to singular, true otherwise
   * @returns {Boolean}
   */

	}, {
		key: "invert",
		value: function invert() {
			return this.inverseOf(this);
		}

		/**
   * The transpose of the instance
   * @returns {Matrix2}
   */

	}, {
		key: "transpose",
		value: function transpose() {
			return this.transposeOf(this);
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
				return (index % 2.0 === 0.0 ? "\n" : "\t") + item.toFixed(digits);
			}).join("");

			return "[Matrix2]" + str;
		}

		/**
   * Returns the {@link Matrix2#determinant} of the instance
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
   * row 0, col1, {@link Matrix2#n}[2]
   * @type Float
   */

	}, {
		key: "n01",
		get: function get() {
			return this.n[2];
		},
		set: function set(n) {
			this.n[2] = n;
		}

		/**
   * row 1, col0, {@link Matrix2#n}[1]
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
   * row 1, col1, {@link Matrix2#n}[3]
   * @type Float
   */

	}, {
		key: "n11",
		get: function get() {
			return this.n[3];
		},
		set: function set(n) {
			this.n[3] = n;
		}

		/**
   * The determinant
   * @type Float
   */

	}, {
		key: "determinant",
		get: function get() {
			return this.n[0] * this.n[3] - this.n[2] * this.n[1];
		}
	}]);

	return Matrix2;
}();

exports.default = Matrix2;