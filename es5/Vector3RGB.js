'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.STRING_XRGB = exports.STRING_HRGB = exports.STRING_RGB = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Math = require('./Math');

var _Math2 = _interopRequireDefault(_Math);

var _Vector2 = require('./Vector3');

var _Vector3 = _interopRequireDefault(_Vector2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The rgb() string return type constant
 */
var STRING_RGB = exports.STRING_RGB = Symbol('rgb');

/**
 * The #rrggbb string return type constant
 */
var STRING_HRGB = exports.STRING_HRGB = Symbol('hrgb');

/**
 * The 0xRRGGBB string return type constant
 */
var STRING_XRGB = exports.STRING_XRGB = Symbol('xrgb');

var EXPR_RGB = /^rgb\((:?\s*(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*,){2}\s*(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*\)$/;
var EXPR_HRGB = /^#(?:([0-9A-Fa-f]){3}|([0-9A-Fa-f]{2}){3})$/;

/**
 * RGB three component vector representation
 */

var Vector3RGB = function (_Vector) {
	_inherits(Vector3RGB, _Vector);

	function Vector3RGB() {
		_classCallCheck(this, Vector3RGB);

		return _possibleConstructorReturn(this, (Vector3RGB.__proto__ || Object.getPrototypeOf(Vector3RGB)).apply(this, arguments));
	}

	_createClass(Vector3RGB, [{
		key: 'toRGB',


		/**
   * Returns a rgb() encoded string representation of the instance
   * @param {Float} [scale=1.0] - The scale
   * @returns {String}
   * @throws {TypeError} if scale is not a Float or undefined
   */
		value: function toRGB() {
			var scale = arguments.length <= 0 || arguments[0] === undefined ? 1.0 : arguments[0];

			if (typeof scale !== 'number') throw new TypeError();

			scale = 1.0 / scale;

			var str = this.n.map(function (item, index, source) {
				return (_Math2.default.clamp(item * scale, 0.0, 1.0) * 255.0).toFixed();
			}).join(",");

			return 'rgb(' + str + ')';
		}

		/**
   * Returns a #rrggbb encoded string representation of the instance
   * @param {Float} [scale=1.0] - The scale
   * @returns {String}
   * @throws {TypeError} if scale is not a Float or undefined
   */

	}, {
		key: 'toHRGB',
		value: function toHRGB() {
			var scale = arguments.length <= 0 || arguments[0] === undefined ? 1.0 : arguments[0];

			if (typeof scale !== 'number') throw new TypeError();

			scale = 1.0 / scale;

			var str = this.n.map(function (item, index, source) {
				return (_Math2.default.clamp(item * scale, 0.0, 1.0) * 255.0).toString(16);
			}).join("");

			return '#' + str;
		}

		/**
   * Returns a rrggbb bit encoded integer representation of the instance
   * @param {Float} [scale=1.0] - The scale
   * @returns {Int}
   * @throws {TypeError} if scale is not a Float
   */

	}, {
		key: 'toInt',
		value: function toInt() {
			var scale = arguments.length <= 0 || arguments[0] === undefined ? 1.0 : arguments[0];

			if (typeof scale !== 'number') throw new TypeError();

			scale = 1.0 / scale;

			return this.n.map(function (item, index, source) {
				return _Math2.default.round(_Math2.default.clamp(item * scale, 0.0, 1.0) * 255.0);
			}).reduce(function (prev, current, index, source) {
				return prev | current << 8 * (2 - index);
			});
		}

		/**
   * Returns a string representation of the instance
   * @param {String} [type=STRING_XRGB] - The type
   * @param {Float} [scale=1.0] - The scale
   * @returns {String}
   * @throws {TypeError} if type is not a STRING_* constant
   */

	}, {
		key: 'toString',
		value: function toString() {
			var type = arguments.length <= 0 || arguments[0] === undefined ? STRING_XRGB : arguments[0];
			var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];

			switch (type) {
				case STRING_RGB:
					return this.toRGB(scale);
				case STRING_HRGB:
					return this.toHRGB(scale);
				case STRING_XRGB:
					return this.toInt(scale).toString(16);
				default:
					throw new TypeError();
			}
		}

		/**
   * Returns the {@link Vector3RGB#toInt} representation of the instance
   * @param {Float} [scale] - The scale
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
   * Alias of {@link Vector3#x}
   */
		get: function get() {
			return this.n[0];
		},
		set: function set(n) {
			this.n[0] = n;
		}

		/**
   * The g component
   * Alias of {@link Vector3#y}
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
   * Alias of {@link Vector3#z}
   */

	}, {
		key: 'b',
		get: function get() {
			return this.n[2];
		},
		set: function set(n) {
			this.n[2] = n;
		}
	}], [{
		key: 'RGB',


		/**
   * Returns an instance representing rgb() encoded string
   * @constructor
   * @param {String} string - The rgb string
   * @param {Float} [scale=1.0] - The scale
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3}
   * @throws {TypeError} if string is not a String
   * @throws {TypeError} if scale is not a Float or undefined
   * @throws {TypeError} if target is not a Vector3 instance or undefined
   */
		value: function RGB(string) {
			var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
			var target = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

			if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();

			var n = [0.0, 0.0, 0.0];

			if (target === undefined) target = new Vector3RGB(n);else if (!(target instanceof _Vector3.default)) throw new TypeError();else target.n = n;

			var match = string.match(EXPR_RGB);

			if (match !== null) {
				var t = 1.0 / 255.0 * scale;

				n[0] = Number.parseFloat(match[1]) * t;
				n[1] = Number.parseFloat(match[2]) * t;
				n[2] = Number.parseFloat(match[3]) * t;
			}

			return target;
		}

		/**
   * Returns an instance representing #RGB encoded string
   * @constructor
   * @param {String} string - The hash string
   * @param {Float} [scale=1.0] - The scale
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3RGB}
   * @throws {TypeError} if string is not a String
   * @throws {TypeError} if scale is not a Float or undefined
   * @throws {TypeError} if target is not a Vector3 instance or undefined
   */

	}, {
		key: 'HRGB',
		value: function HRGB(string) {
			var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
			var target = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

			if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();

			var n = [0.0, 0.0, 0.0];

			if (target === undefined) target = new Vector3RGB(n);else if (!(target instanceof _Vector3.default)) throw new TypeError();else target.n = n;

			var match = string.match(EXPR_HRGB);

			if (match !== null) {
				var t = 1.0 / 255.0 * scale,
				    dup = match[1].length === 1;

				n[0] = Number.parseFloat('0x' + (match[1] + (dup ? match[1] : ''))) * t;
				n[1] = Number.parseFloat('0x' + (match[2] + (dup ? match[2] : ''))) * t;
				n[2] = Number.parseFloat('0x' + (match[3] + (dup ? match[3] : ''))) * t;
			}

			return target;
		}

		/**
   * Returns an instance representing <em>rrggbb</em> bit encoded <code>i</code>
   * @constructor
   * @param {Int} i - The bit encoded Int
   * @param {Float} [scale=1.0] - The scale
   * @param {Vector3RGB} [target] - The target instance
   * @returns {Vector3RGB}
   * @throws {TypeError} if i is not an Int
   * @throws {TypeError} if scale is not a Float or undefined
   * @throws {TypeError} if target is not a Vector3 instance or undefined
   */

	}, {
		key: 'Int',
		value: function Int(i) {
			var scale = arguments.length <= 1 || arguments[1] === undefined ? 1.0 : arguments[1];
			var target = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

			if (Number.isSafeInteger(i) || typeof scale !== 'number') throw new TypeError();

			var n = [0.0, 0.0, 0.0];

			if (target === undefined) target = new Vector3RGB(n);else if (!(target instanceof _Vector3.default)) throw new TypeError();else target.n = n;

			var t = 1.0 / 255.0 * scale;

			n[0] = i >> 16 & 0xFF * t;
			n[1] = i >> 8 & 0xFF * t;
			n[2] = i & 0xFF * t;

			return target;
		}

		/**
   * Returns an instance representing <em>aarrggbb</em> encoded <code>string</code>
   * @constructor
   * @param {String} string - The string
   * @param {Float} [scale=1.0] - The scale
   * @param {Vector3} [target] - The target instance
   * @returns {Vector3RGB}
   */

	}, {
		key: 'XRGB',
		value: function XRGB(string, scale, target) {
			return Vector3RGB.Int(Number.parseInt(string), scale, target);
		}
	}]);

	return Vector3RGB;
}(_Vector3.default);

exports.default = Vector3RGB;