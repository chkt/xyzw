"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Four component vector
 */
var Vector4 = function () {
	_createClass(Vector4, null, [{
		key: "Rotation",


		/**
   * Returns a unit-quaternion instance of axis and rotation
   * @constructor
   * @param {Vector3} axis - The rotation axis
   * @param {Float} rad - The rotation in radians
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */
		value: function Rotation(axis, rad, target) {
			var sin = Math.sin(rad * 0.5);

			var n = [axis.n[0] * sin, axis.n[1] * sin, axis.n[2] * sin, Math.cos(rad * 0.5)];

			if (target === undefined) target = new this(n);else target.n = n;

			return target.normalize();
		}

		/**
   * Returns a unit-quaternion instance of Spherical Linear intERPolation
   * @constructor
   * @param {Vector4} q - The starting <em>unit quaternion</em>
   * @param {Vector4} r - The ending <em>unit quaternion</em>
   * @param {Float} t - The interpolation factor
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "SLERP",
		value: function SLERP(q, r, t, target) {
			var qx = q.n[0],
			    qy = q.n[1],
			    qz = q.n[2],
			    qw = q.n[3];
			var rx = r.n[0],
			    ry = r.n[1],
			    rz = r.n[2],
			    rw = r.n[3];

			var a = Math.acos(qx * rx + qy * ry + qz * rz + qw * rw);

			var sin = 1.0 / Math.sin(a);
			var sinQ = Math.sin(a * (1.0 - t));
			var sinR = Math.sin(a * t);

			var n = [sinQ * sin * q.n[0] + sinR * sin * r.n[0], sinQ * sin * q.n[1] + sinR * sin * r.n[1], sinQ * sin * q.n[2] + sinR * sin * r.n[2], sinQ * sin * q.n[3] + sinR * sin * r.n[3]];

			if (target === undefined) target = new this(n);else target.n = n;

			return target;
		}

		/**
   * Returns a unit-quaternion instance of a rotation matrix
   * @constructor
   * @param {Matrix3} m - The source 3x3 transform
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Matrix3",
		value: function Matrix3(m, target) {
			var mn = m.n,
			    n = [0.0, 0.0, 0.0, 1.0];
			var s = mn[0] + mn[4] + mn[8] + 1.0;

			if (s > 0.0) {
				s = Math.sqrt(s), n[3] = 0.5 * s; // 1/2 sqrt(trace)
				s = 0.5 / s; // 1 / (4 * 1/2 sqrt(trace))

				n[0] = (mn[5] - mn[7]) * s;
				n[1] = (mn[6] - mn[2]) * s;
				n[2] = (mn[1] - mn[3]) * s;
			} else if (mn[0] > mn[4] && mn[0] > mn[8]) {
				s = 0.5 / Math.sqrt(1.0 + mn[0] - mn[4] - mn[8]);

				n[0] = 0.5 * s;
				n[1] = (mn[1] + mn[3]) * s;
				n[2] = (mn[2] + mn[6]) * s;
				n[3] = (mn[5] + mn[7]) * s;
			} else if (mn[4] > mn[8]) {
				s = 0.5 / Math.sqrt(1.0 + mn[4] - mn[0] - mn[8]);

				n[0] = (mn[1] + mn[3]) * s;
				n[1] = 0.5 * s;
				n[2] = (mn[5] + mn[7]) * s;
				n[3] = (mn[2] + mn[6]) * s;
			} else {
				s = 0.5 / Math.sqrt(1.0 + mn[8] - mn[0] - mn[4]);

				n[0] = (mn[2] + mn[6]) * s;
				n[1] = (mn[5] + mn[7]) * s;
				n[2] = 0.5 * s;
				n[3] = (mn[1] + mn[3]) * s;
			}

			if (target === undefined) target = new this(n);else target.n = n;

			return target;
		}

		/**
   * Returns a instance of Vector3
   * @constructor
   * @param {Vector3} v - The source
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Vector3",
		value: function Vector3(v, target) {
			var n = v.n.concat(1.0);

			if (target === undefined) target = new this(n);else target.n = n;

			return target;
		}

		/**
   * Returns the sum of q and r (q+r)
   * @constructor
   * @param {Vector4} q - The first summand
   * @param {Vector4} r - The second summand
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Add",
		value: function Add(q, r, target) {
			return (target === undefined ? new this() : target).add(q, r);
		}

		/**
   * Returns the difference of q and r (q-r)
   * @constructor
   * @param {Vector4} q - The minuend
   * @param {Vector4} r - The subtrahend
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Subtract",
		value: function Subtract(q, r, target) {
			return (target === undefined ? new this() : target).subtract(q, r);
		}

		/**
   * Returns the scalar product of q and n (q*n)
   * @constructor
   * @param {Vector4} q - The vector
   * @param {Float} n - The scalar
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "MultiplyScalar",
		value: function MultiplyScalar(q, n, target) {
			return (target === undefined ? new this() : target).multiplyScalar(q, n);
		}

		/**
   * Returns the exterior product of q and r (q*r)
   * @constructor
   * @param {Vector4} q - The first vector
   * @param {Vector4} r - The second vector
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Multiply",
		value: function Multiply(q, r, target) {
			return (target === undefined ? new this() : target).multiply(q, r);
		}

		/**
   * Returns the normal form of q
   * @constructor
   * @param {Vector4} q - The source
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Normalize",
		value: function Normalize(q, target) {
			return (target === undefined ? new this() : target).normalizationOf(q);
		}

		/**
   * Returns the conjugate of q
   * @constructor
   * @param {Vector4} q - The source
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Conjugate",
		value: function Conjugate(q, target) {
			return (target === undefined ? new this() : target).conjugateOf(q);
		}

		/**
   * Returns the inverse of q
   * @constructor
   * @param {Vector4} q - The source
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Inverse",
		value: function Inverse(q, target) {
			return (target === undefined ? new this() : target).inverseOf(q);
		}

		/**
   * Returns a copy of q
   * @constructor
   * @param {Vector4} q - The source
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   */

	}, {
		key: "Copy",
		value: function Copy(q, target) {
			return (target === undefined ? new this() : target).copyOf(q);
		}

		/**
   * Returns the inner product of q and r
   * @param {Vector4} q - The first vector
   * @param {Vector4} r - The second vector
   * @returns {Float}
   */

	}, {
		key: "dot",
		value: function dot(q, r) {
			return q.n[0] * r.n[0] + q.n[1] * r.n[1] + q.n[2] * r.n[2] + q.n[3] * r.n[3];
		}

		/**
   * Returns true if q and r are equal, false otherwise (q==r)
   * @param {Vector4} q - The protagonist
   * @param {Vector4} r - The antagonist
   * @returns {Boolean}
   */

	}, {
		key: "isEQ",
		value: function isEQ(q, r) {
			var qn = q.n,
			    rn = r.n;

			return q === r || qn[0] === rn[0] && qn[1] === rn[1] && qn[2] === rn[2] && qn[3] === rn[3];
		}

		/**
   * Creates a new instance
   * @param {Float[]} [n] - Array representing the four components
   * Arrays of length !== 4 will return the identity (0.0,0.0,0.0,1.0) vector
   */

	}]);

	function Vector4(n) {
		_classCallCheck(this, Vector4);

		this.n = n && n.constructor === Array && n.length === 4 ? n : [0.0, 0.0, 0.0, 1.0];
	}

	/**
  * Redefines the instance
  * @param {Float[]} [n] - Array representing the four components
  * Arrays of length <em>!== 4</em> will return the identity (0.0,0.0,0.0,1.0) vector
  * @returns {Vector4}
  */


	_createClass(Vector4, [{
		key: "define",
		value: function define(n) {
			this.constructor.call(this, n);

			return this;
		}

		/**
   * The x component, {@link Vector4#n}[0]
   * @type Float
   */

	}, {
		key: "add",


		/**
   * The sum of q and r (q+r)
   * @param {Vector4} q - The first summand
   * @param {Vector4} r - The second summand
   * @returns {Vector4}
   */
		value: function add(q, r) {
			this.n[0] = q.n[0] + r.n[0];
			this.n[1] = q.n[1] + r.n[1];
			this.n[2] = q.n[2] + r.n[2];
			this.n[3] = q.n[3] + r.n[3];

			return this;
		}

		/**
   * The difference of q and r (q-r)
   * @param {Vector4} q - The minuend
   * @param {Vector4} r - The subtrahend
   * @returns {Vector4}
   */

	}, {
		key: "subtract",
		value: function subtract(q, r) {
			this.n[0] = q.n[0] - r.n[0];
			this.n[1] = q.n[1] - r.n[1];
			this.n[2] = q.n[2] - r.n[2];
			this.n[3] = q.n[3] - r.n[3];

			return this;
		}

		/**
   * The scalar product of q and n (q*n)
   * @param {Vector4} q - The vector
   * @param {Float} n - The scalar
   * @returns {Vector4}
   */

	}, {
		key: "multiplyScalar",
		value: function multiplyScalar(q, n) {
			this.n[0] = q.n[0] * n;
			this.n[1] = q.n[1] * n;
			this.n[2] = q.n[2] * n;
			this.n[3] = q.n[3] * n;

			return this;
		}

		/**
   * The exterior product of q and r (q cross r)
   * @param {Vector4} q - The first vector
   * @param {Vector4} r - The second vector
   * @returns {Vector4}
   */

	}, {
		key: "multiply",
		value: function multiply(q, r) {
			var qx = q.n[0],
			    qy = q.n[1],
			    qz = q.n[2],
			    qw = q.n[3];
			var rx = r.n[0],
			    ry = r.n[1],
			    rz = r.n[2],
			    rw = r.n[3];

			this.n[0] = qz * ry - qy * rz + qx * rw + qw * rx;
			this.n[1] = qx * rz - qz * rx + qy * rw + qw * ry;
			this.n[2] = qy * rx - qx * ry + qz * rw + qw * rz;
			this.n[3] = qw * rw - qx * rx - qy * ry - qz * rz;

			return this;
		}

		/**
   * The sum of the instance and q
   * @param {Vector4} q - The second summand
   * @returns {Vector4}
   */

	}, {
		key: "addEQ",
		value: function addEQ(q) {
			this.n[0] += q.n[0];
			this.n[1] += q.n[1];
			this.n[2] += q.n[2];
			this.n[3] += q.n[3];

			return this;
		}

		/**
   * The difference of the instance and q
   * @param {Vector4} q - The subtrahend
   * @returns {Vector4}
   */

	}, {
		key: "subtractEQ",
		value: function subtractEQ(q) {
			this.n[0] -= q.n[0];
			this.n[1] -= q.n[1];
			this.n[2] -= q.n[2];
			this.n[3] -= q.n[3];

			return this;
		}

		/**
   * The scalar product of the instance and n
   * @param {Float} n - the scalar
   * @returns {Vector4}
   */

	}, {
		key: "multiplyScalarEQ",
		value: function multiplyScalarEQ(n) {
			this.n[0] *= n;
			this.n[1] *= n;
			this.n[2] *= n;
			this.n[3] *= n;

			return this;
		}

		/**
   * The normalization of q
   * @param {Vector4} q - The source vector
   * @returns {Vector4}
   */

	}, {
		key: "normalizationOf",
		value: function normalizationOf(q) {
			var qn = q.n,
			    qx = qn[0],
			    qy = qn[1],
			    qz = qn[2],
			    qw = qn[3];
			var n = this.n,
			    norm = qx * qx + qy * qy + qz * qz + qw * qw;

			if (norm !== 0.0 && norm !== 1.0) norm = 1.0 / Math.sqrt(norm);

			n[0] = qx * norm, n[1] = qy * norm, n[2] = qz * norm, n[3] = qw * norm;

			return this;
		}

		/**
   * The conjugate of q
   * @param {Vector4} q - The source
   * @returns {Vector4}
   */

	}, {
		key: "conjugateOf",
		value: function conjugateOf(q) {
			this.n[0] = -q.n[0] * -1.0;
			this.n[1] = -q.n[1] * -1.0;
			this.n[2] = -q.n[2] * -1.0;
			this.n[3] = q.n[3];

			return this;
		}

		/**
   * The inverse of q
   * @param {Vector4} q - The source
   * @returns {Vector4}
   */

	}, {
		key: "inverseOf",
		value: function inverseOf(q) {
			var x = q.n[0],
			    y = q.n[1],
			    z = q.n[2],
			    w = q.n[3];
			var norm = 1.0 / (x * x + y * y + z * z + w * w);

			this.n[0] = x * -norm;
			this.n[1] = y * -norm;
			this.n[2] = z * -norm;
			this.n[3] = w * norm;

			return this;
		}

		/**
   * The copy of q
   * @param {Vector4} q - The source
   * @returns {Vector4}
   */

	}, {
		key: "copyOf",
		value: function copyOf(q) {
			this.n = q.n.slice(0, 4);

			return this;
		}

		/**
   * The normal form of the instance
   * @returns {Vector4}
   */

	}, {
		key: "normalize",
		value: function normalize() {
			var n = this.n,
			    x = n[0],
			    y = n[1],
			    z = [2],
			    w = n[3];
			var norm = x * x + y * y + z * z + w * w;

			if (norm === 0.0 || norm === 1.0) return this;

			norm = 1.0 / Math.sqrt(norm);
			n[0] *= norm, n[1] *= norm, n[2] *= norm, n[3] *= norm;

			return this;
		}

		/**
   * The conjugate of the instance
   * @returns {Vector4}
   */

	}, {
		key: "conjugate",
		value: function conjugate() {
			return this.conjugateOf(this);
		}

		/**
   * The inverse of the instance
   * @returns {Vector4}
   */

	}, {
		key: "invert",
		value: function invert() {
			return this.inverseOf(this);
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
				return item.toFixed(digits);
			}).join(" ");

			return "[Vector4](" + str + ")";
		}

		/**
   * Returns the {@link Vector4#norm} of the instance
   * @returns {Float}
   */

	}, {
		key: "valueOf",
		value: function valueOf() {
			return this.norm;
		}
	}, {
		key: "x",
		get: function get() {
			return this.n[0];
		},
		set: function set(n) {
			this.n[0] = n;
		}

		/**
   * The y component, {@link Vector4#n}[1]
   * @type Float
   */

	}, {
		key: "y",
		get: function get() {
			return this.n[1];
		},
		set: function set(n) {
			this.n[1] = n;
		}

		/**
   * The z component, {@link Vector4#n}[2]
   * @type Float
   */

	}, {
		key: "z",
		get: function get() {
			return this.n[2];
		},
		set: function set(n) {
			this.n[2] = n;
		}

		/**
   * The w component, {@link Vector4#n}[3]
   * @type Float
   */

	}, {
		key: "w",
		get: function get() {
			return this.n[3];
		},
		set: function set(n) {
			this.n[3] = n;
		}

		/**
   * The norm of the instance
   * @type Float
   */

	}, {
		key: "norm",
		get: function get() {
			var x = this.n[0],
			    y = this.n[1],
			    z = this.n[2],
			    w = this.n[3];

			return Math.sqrt(x * x + y * y + z * z + w * w);
		}
	}]);

	return Vector4;
}();

exports.default = Vector4;