'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ZPLANE_MAX = exports.ZPLANE_MIN = exports.ASPECT_DEFAULT = exports.ASPECT_MAX = exports.ASPECT_MIN = exports.EXTEND_DEFAULT = exports.EXTEND_MAX = exports.EXTEND_MIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Math = require('./Math');

var _Math2 = _interopRequireDefault(_Math);

var _Matrix2 = require('./Matrix4');

var _Matrix3 = _interopRequireDefault(_Matrix2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The minimal vertical extend of the viewcube
 * @type Float
 */
var EXTEND_MIN = exports.EXTEND_MIN = 1.0e-10;
/**
 * The maximal vertical extend of the viewcube
 * @type Float
 */
var EXTEND_MAX = exports.EXTEND_MAX = 1.0e10;
/**
 * The default vertical extend of the viewcube
 * @type Float
 */
var EXTEND_DEFAULT = exports.EXTEND_DEFAULT = 100.0;
/**
 * The minimal projection aspect ratio (w/h)
 * @type Float
 */
var ASPECT_MIN = exports.ASPECT_MIN = 1.0e-10;
/**
 * The maximal projection aspect ratio (w/h)
 * @type Float
 */
var ASPECT_MAX = exports.ASPECT_MAX = 1.0e10;
/**
 * The default projection aspect ratio (w/h)
 * @type Float
 */
var ASPECT_DEFAULT = exports.ASPECT_DEFAULT = 16.0 / 9.0;
/**
 * The minimal z-plane distance
 * @type Float
 */
var ZPLANE_MIN = exports.ZPLANE_MIN = 1.0e-10;
/**
 * The maximal z-plane distance
 * @type Float
 */
var ZPLANE_MAX = exports.ZPLANE_MAX = Number.MAX_VALUE;

var _extend = new WeakMap();
var _aspect = new WeakMap();
var _near = new WeakMap();
var _far = new WeakMap();

/**
 * Orthographic projection Matrix
 */

var Matrix4Ortho = function (_Matrix) {
	_inherits(Matrix4Ortho, _Matrix);

	_createClass(Matrix4Ortho, null, [{
		key: 'Copy',


		/**
   * Returns a copy of m
   * @constructor
   * @param {Matrix4Ortho} m - The source
   * @param {Matrix4Ortho} [target] - The target instance
   * @returns {Matrix4Ortho}
   */
		value: function Copy(m, target) {
			if (target !== undefined) return target.copyOf(m);else return new Matrix4Ortho(m.extend, m.aspect, m.near, m.far);
		}

		/**
   * Creates a new instance
   * @param {Float} [extend=EXTEND_DEFAULT] - The vertical extend of the viewcube
   * @param {Float} [aspect=ASPECT_DEFAULT] - The aspect ratio (w/h)
   * @param {Float} [near=ZPLANE_MIN] - The near plane distance
   * @param {Float} [far=ZPLANE_MAX] - The far plane distance
   */

	}]);

	function Matrix4Ortho() {
		var extend = arguments.length <= 0 || arguments[0] === undefined ? EXTEND_DEFAULT : arguments[0];
		var aspect = arguments.length <= 1 || arguments[1] === undefined ? ASPECT_DEFAULT : arguments[1];
		var near = arguments.length <= 2 || arguments[2] === undefined ? ZPLANE_MIN : arguments[2];
		var far = arguments.length <= 3 || arguments[3] === undefined ? ZPLANE_MAX : arguments[3];

		_classCallCheck(this, Matrix4Ortho);

		var _this = _possibleConstructorReturn(this, (Matrix4Ortho.__proto__ || Object.getPrototypeOf(Matrix4Ortho)).call(this));

		_this.define(extend, aspect, near, far);
		return _this;
	}

	/**
  * (Re)defines the instance
  * @param {Float} [extend=EXTEND_DEFAULT] - The vertical extend of the viewcube
  * @param {Float} [aspect=ASPECT_DEFAULT] - The aspect ratio (w/h)
  * @param {Float} [near=ZPLANE_MIN] - The near plane distance
  * @param {Float} [far=ZPLANE_MAX] - The far plane distance
  * @returns {Matrix4Ortho}
  */


	_createClass(Matrix4Ortho, [{
		key: 'define',
		value: function define(extend, aspect, near, far) {
			var clamp = _Math2.default.clamp;

			extend = clamp(extend, EXTEND_MIN, EXTEND_MAX);
			aspect = clamp(aspect, ASPECT_MIN, ASPECT_MAX);
			near = -clamp(near, ZPLANE_MIN, ZPLANE_MAX);
			far = -clamp(far, -near, ZPLANE_MAX);

			_extend.set(this, extend);
			_aspect.set(this, aspect);
			_near.set(this, near);
			_far.set(this, far);

			var zdiff = far - near;

			var ymax = extend * 0.5;
			var ymin = -ymax;

			var xmin = ymin * aspect;
			var xmax = ymax * aspect;
			var xdiff = extend * aspect;

			this.n = [2.0 / xdiff, 0.0, 0.0, 0.0, 0.0, 2.0 / extend, 0.0, 0.0, 0.0, 0.0, 2.0 / zdiff, 0.0, -(xmax + xmin) / xdiff, -(ymax + ymin) / extend, -(far + near) / zdiff, 1.0];

			return this;
		}

		/**
   * The vertical extend of the viewcube
   * @type Float
   */

	}, {
		key: 'copyOf',


		/**
   * The copy of m
   * @param {Matrix4Ortho} m - The source
   * @returns {Matrix4Ortho}
   */
		value: function copyOf(m) {
			_extend.set(this, _extend.get(m));
			_aspect.set(this, _aspect.get(m));
			_near.set(this, _near.get(m));
			_far.set(this, _far.get(m));

			this.n = m.n.slice(0, 16);

			return this;
		}
	}, {
		key: 'extend',
		get: function get() {
			return _extend.get(this);
		}

		/**
   * The aspect ratio (w/h)
   * @type Float
   */

	}, {
		key: 'aspect',
		get: function get() {
			return _aspect.get(this);
		}

		/**
   * The near plane distance
   * @type Float
   */

	}, {
		key: 'near',
		get: function get() {
			return _near.get(this);
		}

		/**
   * The far plane distance
   * @type Float
   */

	}, {
		key: 'far',
		get: function get() {
			return _far.get(this);
		}
	}]);

	return Matrix4Ortho;
}(_Matrix3.default);

exports.default = Matrix4Ortho;