'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ZPLANE_MAX = exports.ZPLANE_MIN = exports.ASPECT_DEFAULT = exports.ASPECT_MAX = exports.ASPECT_MIN = exports.FOV_DEFAULT = exports.FOV_MAX = exports.FOV_MIN = undefined;

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
 * The minimal vertical field of view
 * @type Float
 */
var FOV_MIN = exports.FOV_MIN = 1.0e-10;
/**
 * The maximal vertical field of view
 * @type Float
 */
var FOV_MAX = exports.FOV_MAX = _Math2.default.PI * 2.0;
/**
 * The default vertical field of view
 * @type Float
 */
var FOV_DEFAULT = exports.FOV_DEFAULT = _Math2.default.PI;
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

var _fov = new WeakMap();
var _aspect = new WeakMap();
var _near = new WeakMap();
var _far = new WeakMap();

/**
 * Perspectivic projection matrix
 */

var Matrix4Frustrum = function (_Matrix) {
	_inherits(Matrix4Frustrum, _Matrix);

	_createClass(Matrix4Frustrum, null, [{
		key: 'Copy',


		/**
   * Returns a copy of m
   * @constructor
   * @param {Matrix4Frustrum}  m - The source
   * @param {Matrix4Frustrum} [target] - The target instance
   * @returns {Matrix4Frustrum}
   */
		value: function Copy(m, target) {
			if (target !== undefined) return target.copyOf(m);else return new Matrix4Frustrum(m.fov, m.aspect, m.near, m.far);
		}

		/**
   * Creates a new instance
   * @param {Float} [fov=FOV_DEFAULT] - The vertical field of view, in radians
   * @param {Float} [aspect=ASPECT_DEFAULT] - The aspect ratio (w/h)
   * @param {Float} [near=ZPLANE_MIN] - The distance of the near plane
   * @param {Float} [far=ZPLANE_MAX] - The distance of the far plane
   */

	}]);

	function Matrix4Frustrum() {
		var fov = arguments.length <= 0 || arguments[0] === undefined ? FOV_DEFAULT : arguments[0];
		var aspect = arguments.length <= 1 || arguments[1] === undefined ? ASPECT_DEFAULT : arguments[1];
		var near = arguments.length <= 2 || arguments[2] === undefined ? ZPLANE_MIN : arguments[2];
		var far = arguments.length <= 3 || arguments[3] === undefined ? ZPLANE_MAX : arguments[3];

		_classCallCheck(this, Matrix4Frustrum);

		var _this = _possibleConstructorReturn(this, (Matrix4Frustrum.__proto__ || Object.getPrototypeOf(Matrix4Frustrum)).call(this));

		_this.define(fov, aspect, near, far);
		return _this;
	}

	/**
  * (Re)defines the instance
  * @param {Float} [fov=FOV_DEFAULT] - The vertical field of view, in radians
  * @param {Float} [aspect=ASPECT_DEFAULT] - The aspect ratio (w/h)
  * @param {Float} [near=ZPLANE_MIN] - The near plane distance
  * @param {Float} [far=ZPLANE_MAX] - The far plane distance
  * @returns {Matrix4Frustrum}
  */


	_createClass(Matrix4Frustrum, [{
		key: 'define',
		value: function define(fov, aspect, near, far) {
			var clamp = _Math2.default.clamp;

			fov = clamp(fov, FOV_MIN, FOV_MAX);
			aspect = clamp(aspect, ASPECT_MIN, ASPECT_MAX);
			near = clamp(near, ZPLANE_MIN, ZPLANE_MAX);
			far = clamp(far, near, ZPLANE_MAX);

			_fov.set(this, fov);
			_aspect.set(this, aspect);
			_near.set(this, near);
			_far.set(this, far);

			var near2 = near * 2.0;
			var zdiff = far - near;

			var ymax = near * _Math2.default.tan(fov * 0.5);
			var ymin = -ymax;
			var ydiff = ymax - ymin;

			var xmin = ymin * aspect;
			var xmax = ymax * aspect;
			var xdiff = xmax - xmin;

			this.n = [near2 / xdiff, 0.0, 0.0, 0.0, 0.0, near2 / ydiff, 0.0, 0.0, (xmax + xmin) / xdiff, (ymax + ymin) / ydiff, -(far + near) / zdiff, -1.0, 0.0, 0.0, -near2 * far / zdiff, 0.0];

			return this;
		}

		/**
   * The vertical field of view, in radians
   * @type Float
   */

	}, {
		key: 'copyOf',


		/**
   * The copy of m
   * @param {Matrix4Frustrum} m - The source
   * @returns {Matrix4Frustrum}
   */
		value: function copyOf(m) {
			_fov.set(this, _fov.get(m));
			_aspect.set(this, _aspect.get(m));
			_near.set(this, _near.get(m));
			_far.set(this, _far.get(m));

			this.n = m.n.slice(0, 16);

			return this;
		}
	}, {
		key: 'fov',
		get: function get() {
			return _fov.get(this);
		}

		/**
   * The projection aspect ratio (w/h)
   * @type Float
   */

	}, {
		key: 'aspect',
		get: function get() {
			return _aspect.get(this);
		}

		/**
   * The distance of the near plane
   * @type Float
   */

	}, {
		key: 'near',
		get: function get() {
			return _near.get(this);
		}

		/**
   * The distance of the far plane
   * @type Float
   */

	}, {
		key: 'far',
		get: function get() {
			return _far.get(this);
		}
	}]);

	return Matrix4Frustrum;
}(_Matrix3.default);

exports.default = Matrix4Frustrum;