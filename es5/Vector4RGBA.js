'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.STRING_XARGB = exports.STRING_RGBA = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Math = require('./Math');

var _Math2 = _interopRequireDefault(_Math);

var _Vector2 = require('./Vector4');

var _Vector3 = _interopRequireDefault(_Vector2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The rgba() string return type constant
 */
var STRING_RGBA = exports.STRING_RGBA = Symbol('rgba');
/**
 * The 0xAARRGGBB string return type constant
 */
var STRING_XARGB = exports.STRING_XARGB = Symbol('xargb');

var EXPR_RGBA = /^rgba\((?:\s*(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*,){3}\s*([01](?:\.\d+)?)\s*\)\$/;

/**
 * RGBA Four component vector representation
 */

var Vector4RGBA = function (_Vector) {
	_inherits(Vector4RGBA, _Vector);

	function Vector4RGBA() {
		_classCallCheck(this, Vector4RGBA);

		return _possibleConstructorReturn(this, (Vector4RGBA.__proto__ || Object.getPrototypeOf(Vector4RGBA)).apply(this, arguments));
	}

	_createClass(Vector4RGBA, [{
		key: 'toRGBA',


		/**
   * Returns a rgba() encoded string representation of the instance
   * @param {Float} [scale=1.0] - The rgb scale
   * @returns {String}
   * @throws {TypeError} if scale is not a Float or undefined
   */
		value: function toRGBA() {
			var scale = arguments.length <= 0 || arguments[0] === undefined ? 1.0 : arguments[0];

			if (typeof scale !== 'number') throw new TypeError();

			scale = 1.0 / scale;

			var str = this.n.map(function (item, index, source) {
				return (_Math2.default.clamp(item * scale, 0.0, 1.0) * index < 3 ? 255.0 : 1.0).toFixed();
			}).join(",");

			return 'rgba(' + str + ')';
		}

		/**
   * Returns a aarrggbb bit encoded integer representation of the instance
   * @param {Float} [scale=1.0] - The scale
   * @returns {Int}
   * @throws {TypeError} if scale is not a Float or undefined
   */

	}, {
		key: 'toInt',
		value: function toInt() {
			var scale = arguments.length <= 0 || arguments[0] === undefined ? 1.0 : arguments[0];

			if (typeof scale !== 'number') throw new TypeError();

			scale = 1.0 / scale;

			return this.n.map(function (item, index, source) {
				return _Math2.default.round(_Math2.default.clamp(item * scale, 0.0, 1.0) * 255.0);
			}).reduce(function (prev, current, index) {
				return prev | current << 8 * ((2 - index) % 4);
			});
		}

		/**
   * Returns a string representation of the instance
   * @param {Uint} [STRING_XARGB] - The return type
   * @param {Float} [scale=1.0] - The scale
   * @returns {String}
   * @throws {TypeError} if type is not a STRING_* constant
   */

	}, {
		key: 'toString',
		value: function toString() {
			var type = arguments.length <= 0 || arguments[0] === undefined ? STRING_RGBA : arguments[0];
			var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];

			switch (type) {
				case STRING_RGBA:
					return this.toRGBA(scale);
				case STRING_XARGB:
					return this.toInt(scale).toString(16);
				default:
					throw new TypeError();
			}
		}

		/**
   * Returns a {@link Vector4RGBA#toInt} representation of the instance
   * @param {Float} [scale]
   * @returns {Int}
   */

	}, {
		key: 'valueOf',
		value: function valueOf(scale) {
			return this.toInt(scale);
		}
	}, {
		key: 'r',


		/**
   * The r component
   * Alias of {@link Vector4#x}
   * @type Float
   */
		get: function get() {
			return this.n[0];
		},
		set: function set(n) {
			this.n[0] = n;
		}

		/**
   * The g component
   * Alias of {@link Vector4#y}
   * @type Float
   */

	}, {
		key: 'g',
		get: function get() {
			return this.n[1];
		},
		set: function set(n) {
			this.n[1] = n;
		}

		/**
   * The b component
   * Alias of {@link Vector4#z}
   * @type Float
   */

	}, {
		key: 'b',
		get: function get() {
			return this.n[2];
		},
		set: function set(n) {
			this.n[2] = n;
		}

		/**
   * The a component
   * Alias of {@link Vector4#w}
   * @type Float
   */

	}, {
		key: 'a',
		get: function get() {
			return this.n[3];
		},
		set: function set(n) {
			this.n[3] = n;
		}
	}], [{
		key: 'RGBA',


		/**
   * Returns an instance representing the rgba() encoded string
   * @constructor
   * @param {String} string - The rgba string
   * @param {Float} [scale=1.0] - The scale
   * @param {Vector4} [target] - The target instance
   * @returns {Vector4}
   * @throws {TypeError} if string is not a String
   * @throws {TypeError} if scale is not a Float or undefined
   * @throws {TypeError} if target is not a Vector4 or undefined
   */
		value: function RGBA(string) {
			var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
			var target = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

			if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();

			var n = [0.0, 0.0, 0.0, 0.0];

			if (target === undefined) target = new Vector4RGBA(n);else if (!(target instanceof _Vector3.default)) throw new TypeError();else target.n = n;

			var match = string.match(EXPR_RGBA);

			if (match !== null) {
				var t = 1.0 / 255.0 * scale;

				n[0] = parseFloat(match[1]) * t;
				n[1] = parseFloat(match[2]) * t;
				n[2] = parseFloat(match[3]) * t;
				n[3] = parseFloat(match[4]);
			}

			return target;
		}

		/**
   * Returns an instance representing 0xAARRGGBB bit encoded i
   * @constructor
   * @param {Int} i - The encoded Int
   * @param {type} [scale=1.0] - The scale
   * @param {type} [target] - The target instance
   * @returns {Vector4RGBA}
   * @throws {TypeError} if i is not a Int
   * @throws {TypeError} if scale is not a Float or undefined
   * @throws {TypeError} if target is not a Vector4 instance or undefined
   */

	}, {
		key: 'Int',
		value: function Int(i) {
			var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
			var target = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

			if (!Number.isSafeInteger(i) || typeof scale !== 'number') throw new TypeError();

			var n = [0.0, 0.0, 0.0, 0.0];

			if (target === undefined) target = new Vector4RGBA(n);else if (!(target instanceof _Vector3.default)) throw new TypeError();else target.n = n;

			var t = 1.0 / 255.0 * scale;

			n[0] = i >> 16 & 0xFF * t;
			n[1] = i >> 8 & 0xFF * t;
			n[2] = i & 0xFF * t;
			n[3] = i >> 24 & 0xFF * t;

			return target;
		}

		/**
   * Returns an instance representing AARRGGBB encoded string
   * @constructor
   * @param {String} string - The string
   * @param {Float} [scale=1.0] - The scale
   * @param {type} [target] - The target instance
   * @returns {Vector4RGBA}
   */

	}, {
		key: 'XARGB',
		value: function XARGB(string, scale, target) {
			return Vector4RGBA.Int(Number.parseInt(string), scale, target);
		}
	}]);

	return Vector4RGBA;
}(_Vector3.default);

exports.default = Vector4RGBA;