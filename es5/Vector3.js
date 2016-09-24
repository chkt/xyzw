"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Three component vector
 */
var Vector3 = function () {
	_createClass(Vector3, null, [{
		key: "X",


		/**
   * Returns a representation of the x-axis vector (1.0,0.0,0.0)
   * @constructor
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */
		value: function X(target) {
			var n = [1.0, 0.0, 0.0];

			if (target === undefined) target = new Vector3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a representation of the y-axis vector (0.0,1.0,0.0)
   * @constructor
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Y",
		value: function Y(target) {
			var n = [0.0, 1.0, 0.0];

			if (target === undefined) target = new Vector3(n);else target.n = n;

			return target;
		}

		/**
   * Returns a representation of the z-axis vector (0.0,0.0,1.0)
   * @constructor
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Z",
		value: function Z(target) {
			var n = [0.0, 0.0, 1.0];

			if (target === undefined) target = new Vector3(n);else target.n = n;

			return target;
		}

		/**
   * Returns the resulting instance of <em>cw</em> triangle (v0,v1,v2) and barycentric coordinates (u,v)
   * @constructor
   * @param {Vector3} v0 - The first corner
   * @param {Vector3} v1 - The second corner
   * @param {Vector3} v2 - The third corner
   * @param {Float} u - The u-coordinate
   * @param {Float} v - The v-coordinate
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "BarycentricUV",
		value: function BarycentricUV(v0, v1, v2, u, v, target) {
			var n = [v0.n[0] + (v1.n[0] - v0.n[0]) * u + (v2.n[0] - v0.n[0]) * v, v0.n[1] + (v1.n[1] - v0.n[1]) * u + (v2.n[1] - v0.n[1]) * v, v0.n[2] + (v1.n[2] - v0.n[2]) * u + (v2.n[2] - v0.n[2]) * v];

			if (target === undefined) target = new Vector3(n);else target.n = n;

			return target;
		}

		/**
   * Returns the sum of v and w (v+w)
   * @constructor
   * @param {Vector3} v - The first summand
   * @param {Vector3} w - The second summand
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Add",
		value: function Add(v, w, target) {
			return (target === undefined ? new Vector3() : target).add(v, w);
		}

		/**
   * Returns the difference between v and w (v-w)
   * @constructor
   * @param {Vector3} v - The minuend
   * @param {Vector3} w - The subtrahend
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Subtract",
		value: function Subtract(v, w, target) {
			return (target === undefined ? new Vector3() : target).subtract(v, w);
		}

		/**
   * Returns the scalar product of v and n (v*n)
   * @constructor
   * @param {Vector3} v - The vector
   * @param {Float} n - The scalar
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "MultiplyScalar",
		value: function MultiplyScalar(v, n, target) {
			return (target === undefined ? new Vector3() : target).multiplyScalar(v, n);
		}

		/**
   * Returns the exterior product of v and w (v cross w)
   * @constructor
   * @param {Vector3} v - The first vector
   * @param {Vector3} w - The second vector
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Cross",
		value: function Cross(v, w, target) {
			return (target === undefined ? new Vector3() : target).cross(v, w);
		}

		/**
   * Returns the transformation of v (m*v)
   * @constructor
   * @param {Matrix3} m - The transform
   * @param {Vector3} v - The source
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "MultiplyMatrix3",
		value: function MultiplyMatrix3(m, v, target) {
			return (target === undefined ? new Vector3() : target).multiplyMatrix3(m, v);
		}

		/**
   * Returns the 3x4 transformation of v (m*v)
   * @constructor
   * @param {Matrix4} m - The transform
   * @param {Vector3} v - The vector
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Multiply3x4Matrix4",
		value: function Multiply3x4Matrix4(m, v, target) {
			return (target === undefined ? new Vector3() : target).multiply3x4Matrix4(m, v);
		}

		/**
   * Returns the transformation of v (m*v)
   * @constructor
   * @param {Matrix4} m - The transform
   * @param {Vector3} v - The vector
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "MultiplyMatrix4",
		value: function MultiplyMatrix4(m, v, target) {
			return (target === undefined ? new Vector3() : target).multiplyMatrix4(m, v);
		}

		/**
   * Returns the projection of w on v
   * @constructor
   * @param {Vector3} v - The projection vector
   * @param {Vector3} w - The projected vector
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Project",
		value: function Project(v, w, target) {
			return (target === undefined ? new Vector3() : target).project(v, w);
		}

		/**
   * Returns the orthonormalization of w against v
   * @constructor
   * @param {Vector3} v - The projection vector
   * @param {Vector3} w - The projected vector
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "OrthoNormalize",
		value: function OrthoNormalize(v, w, target) {
			return (target === undefined ? new Vector3() : target).orthoNormalize(v, w);
		}

		/**
   * Returns the normal form of v
   * @constructor
   * @param {Vector3} v - The source
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Normalize",
		value: function Normalize(v, target) {
			return (target === undefined ? new Vector3() : target).normalizationOf(v);
		}

		/**
   * Returns a copy of v
   * @constructor
   * @param {Vector3} v - The source
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   */

	}, {
		key: "Copy",
		value: function Copy(v, target) {
			return (target === undefined ? new Vector3() : target).copyOf(v);
		}

		/**
   * Returns the inner product of v and w (v dot w)
   * @param {Vector3} v - The first vector
   * @param {Vector3} w - The second vector
   * @returns {Float}
   */

	}, {
		key: "dot",
		value: function dot(v, w) {
			return v.n[0] * w.n[0] + v.n[1] * w.n[1] + v.n[2] * w.n[2];
		}

		/**
   * Returns true if v and w are equal, false otherwise (u==v)
   * @param {Vector3} v - The protagonist
   * @param {Vector3} w - The antagonist
   * @returns {Boolean}
   */

	}, {
		key: "isEQ",
		value: function isEQ(v, w) {
			var vn = v.n,
			    wn = w.n;

			return v === w || vn[0] === wn[0] && vn[1] === wn[1] && vn[2] === wn[2];
		}

		/**
   * Returns true if the norm of v is less than n, false otherwise (v.norm<n)
   * @param {Vector3} v - The protagonist
   * @param {Float} n - The antagonist
   * @returns {Boolean}
   */

	}, {
		key: "isNormLT",
		value: function isNormLT(v, n) {
			return v.normSquared < n * n;
		}

		/**
   * Returns true if the norm of v is greater than n, false otherwise (v.norm>n)
   * @param {Vector3} v - The protagonist
   * @param {Float} n - The antagonist
   * @returns {Boolean}
   */

	}, {
		key: "isNormGT",
		value: function isNormGT(v, n) {
			return v.normSquared > n * n;
		}

		/**
   * Returns true if the norm of v and n are equal, false otherwise (v.norm===n)
   * @param {Vector3} v - The protagonist
   * @param {Float} n - The antagonist
   * @returns {Boolean}
   */

	}, {
		key: "isNormEQ",
		value: function isNormEQ(v, n) {
			return v.normSquared === n * n;
		}

		/**
   * Creates a new instance
   * @param {Float[]} [n] - Array representing the three components
   * Arrays of length !== 3 will return the zero (0.0,0.0,0.0) vector
   */

	}]);

	function Vector3(n) {
		_classCallCheck(this, Vector3);

		/**
   * The component array
   * @type {Float[]}
   */
		this.n = n && n.constructor === Array && n.length === 3 ? n : [0.0, 0.0, 0.0];
	}

	/**
  * Redefines the instance
  * @param {Float[]} [n] - Array representing the three components
  * Arrays of length !== 3 will return the zero (0.0,0.0,0.0) vector
  * @returns {Vector3}
  */


	_createClass(Vector3, [{
		key: "define",
		value: function define(n) {
			this.constructor.call(this, n);

			return this;
		}

		/**
   * The x component, {@link Vector3#n}[0]
   * @type {Float}
   */

	}, {
		key: "add",


		/**
   * The sum of v and w (v+w)
   * @param {Vector3} v - The first summand
   * @param {Vector3} w - The second summand
   * @returns {Vector3}
   */
		value: function add(v, w) {
			this.n[0] = v.n[0] + w.n[0];
			this.n[1] = v.n[1] + w.n[1];
			this.n[2] = v.n[2] + w.n[2];

			return this;
		}

		/**
   * The difference of v and w (v-w)
   * @param {Vector3} v - The minuend
   * @param {Vector3} w - The subtrahend
   * @returns {Vector3}
   */

	}, {
		key: "subtract",
		value: function subtract(v, w) {
			this.n[0] = v.n[0] - w.n[0];
			this.n[1] = v.n[1] - w.n[1];
			this.n[2] = v.n[2] - w.n[2];

			return this;
		}

		/**
   * The scalar product of v and n (v*n)
   * @param {Vector3} v - The vector
   * @param {Float} n - The scalar
   * @returns {Vector3}
   */

	}, {
		key: "multiplyScalar",
		value: function multiplyScalar(v, n) {
			this.n[0] = v.n[0] * n;
			this.n[1] = v.n[1] * n;
			this.n[2] = v.n[2] * n;

			return this;
		}

		/**
   * The exterior product of v and w (v cross w)
   * @param {Vector3} v - The first vector
   * @param {Vector3} w - The second vector
   * @returns {Vector3}
   */

	}, {
		key: "cross",
		value: function cross(v, w) {
			this.n[0] = v.n[1] * w.n[2] - v.n[2] * w.n[1];
			this.n[1] = v.n[2] * w.n[0] - v.n[0] * w.n[2];
			this.n[2] = v.n[0] * w.n[1] - v.n[1] * w.n[0];

			return this;
		}

		/**
   * The transformation of v (m*v)
   * @param {Matrix3} m - The transform
   * @param {Vector3} v - The source
   * @returns {Vector3}
   */

	}, {
		key: "multiplyMatrix3",
		value: function multiplyMatrix3(m, v) {
			var n = this.n,
			    mn = m.n,
			    vn = v.n;
			var x = vn[0],
			    y = vn[1],
			    z = vn[2];

			n[0] = x * mn[0] + y * mn[3] + z * mn[6];
			n[1] = x * mn[1] + y * mn[4] + z * mn[7];
			n[2] = x * mn[2] + y * mn[5] + z * mn[8];

			return this;
		}

		/**
   * The 3x4 transformation of v (m*v)
   * @param {Matrix4} m - The transform
   * @param {Vector3} v - The vector
   * @returns {Vector3}
   */

	}, {
		key: "multiply3x4Matrix4",
		value: function multiply3x4Matrix4(m, v) {
			var x = v.n[0],
			    y = v.n[1],
			    z = v.n[2];

			this.n[0] = x * m.n[0] + y * m.n[4] + z * m.n[8] + m.n[12];
			this.n[1] = x * m.n[1] + y * m.n[5] + z * m.n[9] + m.n[13];
			this.n[2] = x * m.n[2] + y * m.n[6] + z * m.n[10] + m.n[14];

			return this;
		}

		/**
   * The transformation of v (m*v)
   * @param {Matrix4} m - The transform
   * @param {Vector3} v - The vector
   * @returns {Vector3}
   */

	}, {
		key: "multiplyMatrix4",
		value: function multiplyMatrix4(m, v) {
			var x = v.n[0],
			    y = v.n[1],
			    z = v.n[2];
			var w = 1.0 / (x * m.n[3] + y * m.n[7] + z * m.n[11] + m.n[15]);

			this.n[0] = (x * m.n[0] + y * m.n[4] + z * m.n[8] + m.n[12]) * w;
			this.n[1] = (x * m.n[1] + y * m.n[5] + z * m.n[9] + m.n[13]) * w;
			this.n[2] = (x * m.n[2] + y * m.n[6] + z * m.n[10] + m.n[14]) * w;

			return this;
		}

		/**
   * The projection of w on v
   * @param {Vector3} v - The projection vector
   * @param {Vector3} w - The projected vector
   * @returns {Vector3}
   */

	}, {
		key: "project",
		value: function project(v, w) {
			var vx = v.n[0],
			    vy = v.n[1],
			    vz = v.n[2];

			var f = (vx * w.n[0] + vy * w.n[1] + vz * w.n[2]) / (vx * vx + vy * vy + vz * vz);

			this.n[0] = vx * f, this.n[1] = vy * f, this.n[2] = vz * f;

			return this;
		}

		/**
   * The orthonormalization of w against v
   * Gram-Schmidt-Normalization: t -= n * (t dot n)
   * @param {Vector3} v - The projection vector
   * @param {Vector3} w - The projected vector
   * @returns {Vector3}
   */

	}, {
		key: "orthoNormalize",
		value: function orthoNormalize(v, w) {
			var vn = v.n,
			    vx = vn[0],
			    vy = vn[1],
			    vz = vn[2];
			var wn = w.n,
			    wx = wn[0],
			    wy = wn[1],
			    wz = wn[2];
			var n = this.n,
			    dot = wx * vx + wy * vy + wz * vz;

			n[0] = wx - vx * dot, n[1] = wy - vy * dot, n[2] = wz - vz * dot;

			return this;
		}

		/**
   * The sum of the instance and w
   * @param {Vector3} w - The second summand
   * @returns {Vector3}
   */

	}, {
		key: "addEQ",
		value: function addEQ(w) {
			this.n[0] += w.n[0];
			this.n[1] += w.n[1];
			this.n[2] += w.n[2];

			return this;
		}

		/**
   * The difference of the instance and w
   * @param {Vector3} w - The subtrahend
   * @returns {Vector3}
   */

	}, {
		key: "subtractEQ",
		value: function subtractEQ(w) {
			this.n[0] -= w.n[0];
			this.n[1] -= w.n[1];
			this.n[2] -= w.n[2];

			return this;
		}

		/**
   * The scalar product of the instance and n
   * @param {Float} n - the scalar
   * @returns {Vector3}
   */

	}, {
		key: "multiplyScalarEQ",
		value: function multiplyScalarEQ(n) {
			this.n[0] *= n;
			this.n[1] *= n;
			this.n[2] *= n;

			return this;
		}

		/**
   * The projection of w on the instance
   * @param {Vector3} w - The projected vector
   * @returns {Vector3}
   */

	}, {
		key: "projectEQ",
		value: function projectEQ(w) {
			var n = this.n,
			    x = n[0],
			    y = n[1],
			    z = n[2];

			var f = (x * w.n[0] + y * w.n[1] + z * w.n[2]) / (x * x + y * y + z * z);

			n[0] *= f, n[1] *= f, n[2] *= f;

			return this;
		}

		/**
   * The orthonormalization of the instance against v
   * Gram-Schmidt-Normalization: t -= n * (t dot n)
   * @param {Vector3} v - The projection vector
   * @returns {Vector3}
   */

	}, {
		key: "orthoNormalizeEQ",
		value: function orthoNormalizeEQ(v) {
			var vn = v.n,
			    vx = vn[0],
			    vy = vn[1],
			    vz = vn[2];
			var n = this.n,
			    dot = n[0] * vx + n[1] * vy + n[2] * vz;

			n[0] -= vx * dot, n[1] -= vy * dot, n[2] -= vz * dot;

			return this;
		}

		/**
   * The normal form of v
   * @param {Vector3} v - The source
   * @returns {Vector3}
   */

	}, {
		key: "normalizationOf",
		value: function normalizationOf(v) {
			var vn = v.n,
			    vx = vn[0],
			    vy = vn[1],
			    vz = vn[2];
			var n = this.n,
			    norm = vx * vx + vy * vy + vz * vz;

			if (norm !== 0.0 && norm !== 1.0) norm = 1.0 / Math.sqrt(norm);

			n[0] = vx * norm, n[1] = vy * norm, n[2] = vz * norm;

			return this;
		}

		/**
   * The copy of v
   * @param {Vector3} v - The source
   * @returns {Vector3}
   */

	}, {
		key: "copyOf",
		value: function copyOf(v) {
			this.n = v.n.slice(0, 3);

			return this;
		}

		/**
   * The normal form of the instance
   * @returns {Vector3}
   */

	}, {
		key: "normalize",
		value: function normalize() {
			var n = this.n,
			    x = n[0],
			    y = n[1],
			    z = n[2];
			var norm = x * x + y * y + z * z;

			if (norm === 0.0 || norm === 1.0) return this;

			norm = 1.0 / Math.sqrt(norm);
			n[0] *= norm, n[1] *= norm, n[2] *= norm;

			return this;
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

			return "[Vector3](" + str + ")";
		}

		/**
   * Returns the {@link Vector3#norm} of the instance
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
   * The y component, {@link Vector3#n}[1]
   * @type {Float}
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
   * The z component, {@link Vector3#n}[2]
   * @type {Float}
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
   * The norm
   * @type {Float}
   */

	}, {
		key: "norm",
		get: function get() {
			var x = this.n[0],
			    y = this.n[1],
			    z = this.n[2];

			return Math.sqrt(x * x + y * y + z * z);
		}

		/**
   * The square of the norm (norm*norm)
   * @type {Float}
   */

	}, {
		key: "normSquared",
		get: function get() {
			var x = this.n[0],
			    y = this.n[1],
			    z = this.n[2];

			return x * x + y * y + z * z;
		}
	}]);

	return Vector3;
}();

exports.default = Vector3;