"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Two component vector
 */
var Vector2 = function () {
	_createClass(Vector2, null, [{
		key: "Rotation",


		/**
   * Returns a unit instance from rad
   * @constructor
   * @param {Float} rad - The rotation in radians
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */
		value: function Rotation(rad, target) {
			var n = [Math.cos(rad), Math.sin(rad)];

			if (target === undefined) target = new Vector2(n);else target.n = n;

			return target;
		}

		/**
   * Returns the resulting instance of cw triangle (v0,v1,v2) and barycentric coordinates (u,v)
   * @constructor
   * @param {Vector2} v0 - The first corner
   * @param {Vector2} v1 - The second corner
   * @param {Vector2} v2 - The third corner
   * @param {Float} u - The u-coordinate
   * @param {Float} v - The v-coordinate
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "BarycentricUV",
		value: function BarycentricUV(v0, v1, v2, u, v, target) {
			var v0x = v0.n[0],
			    v0y = v0.n[1];
			var v1n = v1.n,
			    v2n = v2.n;

			var n = [v0x + (v1n[0] - v0x) * u + (v2n[0] - v0x) * v, v0y + (v1n[1] - v0y) * u + (v2n[1] - v0y) * v];

			if (target === undefined) target = new Vector2(n);else target.n = n;

			return target;
		}

		/**
   * Returns the sum of v and w (v+w)
   * @constructor
   * @param {Vector2} v - The first summand
   * @param {Vector2} w - The second summand
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "Add",
		value: function Add(v, w, target) {
			return (target === undefined ? new Vector2() : target).add(v, w);
		}

		/**
   * Returns the difference of v and w (v-w)
   * @constructor
   * @param {Vector2} v - The minuend
   * @param {Vector2} w - The subtrahend
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "Subtract",
		value: function Subtract(v, w, target) {
			return (target === undefined ? new Vector2() : target).subtract(v, w);
		}

		/**
   * Returns the scalar product of v and n (v*n)
   * @constructor
   * @param {Vector2} v - The vector
   * @param {Float} n - The scalar
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "MultiplyScalar",
		value: function MultiplyScalar(v, n, target) {
			return (target === undefined ? new Vector2() : target).multiplyScalar(v, n);
		}

		/**
   * Returns the transformation of v (m*v)
   * @constructor
   * @param {Matrix2} m - The transform
   * @param {Vector2} v - The vector
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "MultiplyMatrix2",
		value: function MultiplyMatrix2(m, v, target) {
			return (target === undefined ? new Vector2() : target).multiplyMatrix2(m, v);
		}

		/**
   * Returns the 2x3 transformation of v (m*v)
   * @constructor
   * @param {Matrix3} m - The transform
   * @param {Vector2} v - The vector
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "Multiply2x3Matrix3",
		value: function Multiply2x3Matrix3(m, v, target) {
			return (target === undefined ? new Vector2() : target).multiply2x3Matrix3(m, v);
		}

		/**
   * Returns the transformation of v (m*v)
   * @constructor
   * @param {Matrix3} m - The transform
   * @param {Vector2} v - The vector
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "MultiplyMatrix3",
		value: function MultiplyMatrix3(m, v, target) {
			return (target === undefined ? new Vector2() : target).multiplyMatrix3(m, v);
		}

		/**
   * Returns the orthogonal projection of w on v
   * @constructor
   * @param {Vector2} v - The projection vector
   * @param {Vector2} w - The projected vector
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "Project",
		value: function Project(v, w, target) {
			return (target === undefined ? new Vector2() : target).project(v, w);
		}

		/**
   * Returns a normal form of v
   * @constructor
   * @param {Vector2} v - The source
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "Normalize",
		value: function Normalize(v, target) {
			return (target === undefined ? new Vector2() : target).normalizationOf(v);
		}

		/**
   * Returns a perpendicular dot product of v
   * @constructor
   * @param {Vector2} v - The source
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "Perpendicular",
		value: function Perpendicular(v, target) {
			return (target === undefined ? new Vector2() : target).perpendicularOf(v);
		}

		/**
   * Returns a copy of v
   * @constructor
   * @param {Vector2} v - The source
   * @param {Vector2} [target] - The target instance
   * @returns {Vector2}
   */

	}, {
		key: "Copy",
		value: function Copy(v, target) {
			return (target === undefined ? new Vector2() : target).copyOf(v);
		}

		/**
   * Returns the outer product of v and w (v cross w)
   * @param {Vector2} v - The first vector
   * @param {Vector2} w - The second vector
   * @returns {Float}
   */

	}, {
		key: "cross",
		value: function cross(v, w) {
			return v.n[0] * w.n[1] - v.n[1] * w.n[0];
		}

		/**
   * Returns the inner product of v and w (v dot w)
   * @param {Vector2} v - The first vector
   * @param {Vector2} w - The second vector
   * @returns {Float}
   */

	}, {
		key: "dot",
		value: function dot(v, w) {
			return v.n[0] * w.n[0] + v.n[1] * w.n[1];
		}

		/**
   * Returns the angle in radians between v and w (acos(v dot w))
   * @param {Vector2} v - The first vector
   * @param {Vector2} w - The second vector
   * @returns {Float}
   */

	}, {
		key: "rad",
		value: function rad(v, w) {
			return Math.acos(v.n[0] * w.n[0] + v.n[1] * w.n[1]);
		}

		/**
   * Returns true if v and w are equal, false otherwise
   * @param {Vector2} v - The protagonist
   * @param {Vector2} w - The antagonist
   * @returns {Boolean}
   */

	}, {
		key: "isEQ",
		value: function isEQ(v, w) {
			var vn = v.n,
			    wn = w.n;

			return v === w || vn[0] === wn[0] && vn[1] === wn[1];
		}

		/**
   * Creates a new instance
   * @param {Float[]} [n] - Array representing the two components
   * Arrays of length !== 2 will return the zero (0,0) vector
   */

	}]);

	function Vector2(n) {
		_classCallCheck(this, Vector2);

		this.n = n && n.constructor === Array && n.length === 2 ? n : [0.0, 0.0];
	}

	/**
  * Redefines the instance
  * @param {Float[]} n - Array representing the two components
  * @returns {Vector2}
  */


	_createClass(Vector2, [{
		key: "define",
		value: function define(n) {
			this.constructor.call(this, n);

			return this;
		}

		/**
   * The x component {@link Vector2#n}[0]
   * @type Float
   */

	}, {
		key: "add",


		/**
   * The sum of v and w (v+w)
   * @param {Vector2} v - The first summand
   * @param {Vector2} w - The second summand
   * @returns {Vector2}
   */
		value: function add(v, w) {
			this.n[0] = v.n[0] + w.n[0];
			this.n[1] = v.n[1] + w.n[1];

			return this;
		}

		/**
   * The difference of v and w (v-w)
   * @param {Vector2} v - The minuend
   * @param {Vector2} w - The subtrahend
   * @returns {Vector2}
   */

	}, {
		key: "subtract",
		value: function subtract(v, w) {
			this.n[0] = v.n[0] - w.n[0];
			this.n[1] = v.n[1] - w.n[1];

			return this;
		}

		/**
   * The scalar product of v and n (v*n)
   * @param {Vector2} v - The vector
   * @param {Float}   n - The scalar
   * @returns {Vector2}
   */

	}, {
		key: "multiplyScalar",
		value: function multiplyScalar(v, n) {
			this.n[0] = v.n[0] * n;
			this.n[1] = v.n[1] * n;

			return this;
		}

		/**
   * The transformation of v (m*v)
   * @param {Matrix2} m - The transform
   * @param {Vector2} v - The vector
   * @returns {Vector2}
   */

	}, {
		key: "multiplyMatrix2",
		value: function multiplyMatrix2(m, v) {
			var mn = m.n,
			    x = v.n[0],
			    y = v.n[1];

			this.n[0] = x * mn[0] + y * mn[2];
			this.n[1] = x * mn[1] + y * mn[3];

			return this;
		}

		/**
   * The 2x3 transformation of v (m*v)
   * @param {Matrix3} m - The transform
   * @param {Vector2} v - The vector
   * @returns {Vector2}
   */

	}, {
		key: "multiply2x3Matrix3",
		value: function multiply2x3Matrix3(m, v) {
			var mn = m.n,
			    x = v.n[0],
			    y = v.n[1];

			this.n[0] = x * mn[0] + y * mn[3] + mn[6];
			this.n[1] = x * mn[1] + y * mn[4] + mn[7];

			return this;
		}

		/**
   * The transformation of v (m*v)
   * @param {Matrix3} m - The transform
   * @param {Vector2} v - The vector
   * @returns {Vector2}
   */

	}, {
		key: "multiplyMatrix3",
		value: function multiplyMatrix3(m, v) {
			var mn = m.n,
			    x = v.n[0],
			    y = v.n[1];
			var w = 1.0 / (x * mn[2] + y * mn[5] + mn[8]);

			this.n[0] = (x * mn[0] + y * mn[3] + mn[6]) * w;
			this.n[1] = (x * mn[1] + y * mn[4] + mn[7]) * w;

			return this;
		}

		/**
   * The orthogonal projection of w on v
   * @param {Vector2} v - The projection vector
   * @param {Vector2} w - The projected vector
   * @returns {Vector2}
   */

	}, {
		key: "project",
		value: function project(v, w) {
			var vx = v.n[0],
			    vy = v.n[1];

			var n = (vx * w.n[0] + vy * w.n[1]) / (vx * vx + vy * vy);

			this.n[0] = vx * n, this.n[1] = vy * n;

			return this;
		}

		/**
   * The componentwise minimum of v and w (min(v,w))
   * @param {Vector2} v - The first vector
   * @param {Vector2} w - The second vector
   * @returns {Vector2}
   */

	}, {
		key: "minXY",
		value: function minXY(v, w) {
			var vn = v.n,
			    wn = w.n;

			this.n[0] = vn[0] < wn[0] ? vn[0] : wn[0];
			this.n[1] = vn[1] < wn[1] ? vn[1] : wn[1];

			return this;
		}

		/**
   * The componentwise maximum of v and w (max(v,w))
   * @param {Vector2} v - The first vector
   * @param {Vector2} w - The second vector
   * @returns {Vector2}
   */

	}, {
		key: "maxXY",
		value: function maxXY(v, w) {
			var vn = v.n,
			    wn = w.n;

			this.n[0] = vn[0] > wn[0] ? vn[0] : wn[0];
			this.n[1] = vn[1] > wn[1] ? vn[1] : wn[1];

			return this;
		}

		/**
   * The sum of the instance and w (v+w)
   * @param {Vector2} w - The second summand
   * @returns {Vector2}
   */

	}, {
		key: "addEQ",
		value: function addEQ(w) {
			this.n[0] += w.n[0];
			this.n[1] += w.n[1];

			return this;
		}

		/**
   * The difference of the instance and w (v-w)
   * @param {Vector2} w - The subtrahend
   * @returns {Vector2}
   */

	}, {
		key: "subtractEQ",
		value: function subtractEQ(w) {
			this.n[0] -= w.n[0];
			this.n[1] -= w.n[1];

			return this;
		}

		/**
   * The scalar product of the instance and n (v*n)
   * @param {Float} n - The scalar
   * @returns {Vector2}
   */

	}, {
		key: "multiplyScalarEQ",
		value: function multiplyScalarEQ(n) {
			this.n[0] *= n;
			this.n[1] *= n;

			return this;
		}

		/**
   * The orthogonal projection of w on the instance
   * @param {Vector2} w - The projected vector
   * @returns {Vector2}
   */

	}, {
		key: "projectEQ",
		value: function projectEQ(w) {
			var n = this.n,
			    x = n[0],
			    y = n[1];

			var f = (x * w.n[0] + y * w.n[1]) / (x * x + y * y);

			n[0] *= f, n[1] *= f;

			return this;
		}

		/**
   * The normal form of v
   * @param {Vector2} v - The source
   * @returns {Vector2}
   */

	}, {
		key: "normalizationOf",
		value: function normalizationOf(v) {
			var n = this.n,
			    vn = v.n,
			    vx = vn[0],
			    vy = vn[1];
			var norm = vx * vx + vy * vy;

			if (norm !== 0.0 && norm !== 1.0) norm = 1.0 / Math.sqrt(norm);

			n[0] = vx * norm, n[1] = vy * norm;

			return this;
		}

		/**
   * The perpendicular dot product of v
   * @param {Vector2} v - The source
   * @returns {Vector2}
   */

	}, {
		key: "perpendicularOf",
		value: function perpendicularOf(v) {
			var n = this.n,
			    vn = v.n;

			var _ref = [-vn[1], vn[0]];
			n[0] = _ref[0];
			n[1] = _ref[1];


			return this;
		}

		/**
   * The copy of v
   * @param {Vector2} v - The source
   * @returns {Vector2}
   */

	}, {
		key: "copyOf",
		value: function copyOf(v) {
			this.n = v.n.slice(0, 2);

			return this;
		}

		/**
   * The normal form of the instance
   * @returns {Vector2}
   */

	}, {
		key: "normalize",
		value: function normalize() {
			var n = this.n,
			    x = n[0],
			    y = n[1];
			var norm = x * x + y * y;

			if (norm === 0.0 || norm === 1.0) return this;

			norm = 1.0 / Math.sqrt(norm);
			n[0] *= norm, n[1] *= norm;

			return this;
		}

		/**
   * The perpendicular dot product of the instance
   * @returns {Vector2}
   */

	}, {
		key: "perpendicular",
		value: function perpendicular() {
			var n = this.n;

			var _ref2 = [-n[1], n[0]];
			n[0] = _ref2[0];
			n[1] = _ref2[1];


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

			return "[Vector2](" + str + ")";
		}

		/**
   * Returns the {@link Vector2#norm} of the instance
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
   * The y component {@link Vector2#n}[1]
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
   * The s component
   * Alias of {@link Vector2#x}
   * @type Float
   */

	}, {
		key: "s",
		get: function get() {
			return this.n[0];
		},
		set: function set(n) {
			this.n[0] = n;
		}

		/**
   * The t component
   * Alias of {@link Vector2#y}
   * @type Float
   */

	}, {
		key: "t",
		get: function get() {
			return this.n[1];
		},
		set: function set(n) {
			this.n[1] = n;
		}

		/**
   * The norm
   * @type Float
   */

	}, {
		key: "norm",
		get: function get() {
			var x = this.n[0],
			    y = this.n[1];

			return Math.sqrt(x * x + y * y);
		}

		/**
   * The square of the norm (norm*norm)
   * @type Float
   */

	}, {
		key: "normSquared",
		get: function get() {
			var x = this.n[0],
			    y = this.n[1];

			return x * x + y * y;
		}
	}]);

	return Vector2;
}();

exports.default = Vector2;