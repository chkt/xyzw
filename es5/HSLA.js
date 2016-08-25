'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Math = require('./Math');

var _Math2 = _interopRequireDefault(_Math);

var _Vector = require('./Vector3');

var _Vector2 = _interopRequireDefault(_Vector);

var _Vector3 = require('./Vector4');

var _Vector4 = _interopRequireDefault(_Vector3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HSLA color model transform
 */
var HSLA = function () {
	_createClass(HSLA, null, [{
		key: 'RGBA',


		/**
   * Returns an instance representing v
   * @constructor
   * @param {Vector4} v - The source rgba vector
   * @param {HSLA} [target] - The target instance
   * @returns {HSLA}
   */
		value: function RGBA(v, target) {
			var r = v.n[0],
			    g = v.n[1],
			    b = v.n[2];

			var max = _Math2.default.max(r, g, b);
			var min = _Math2.default.min(r, g, b);

			var h = void 0,
			    s = void 0,
			    l = void 0,
			    c = max - min;

			if (c === 0.0) h = 0.0;else if (min === r) h = (g - b) / c % 6.0;else if (min === g) h = (b - r) / c + 2.0;else h = (r - g) / c + 4.0;

			h *= 1.0 / 3.0 * _Math2.default.PI;
			l = 0.5 * (max + min);

			if (c === 0.0) s = 0.0;else s = c / (1.0 - _Math2.default.abs(2.0 * l - 1.0));

			if (target === undefined) return new HSLA(h, s, l, v.n[3]);else return target.define(h, s, l, v.n[3]);
		}

		/**
   * Returns an instance representing v
   * @constructor
   * @param {Vector3} v - The source rgb vector
   * @param {HSLA} [target] - The target instance
   * @returns {HSLA}
   */

	}, {
		key: 'RGB',
		value: function RGB(v, target) {
			return HSLA.RGBA(_Vector4.default.Vector3(v), target);
		}

		/**
   * Returns the copy of source
   * @param {HSLA} source - The source instance
   * @param {HSLA} [target] - The target instance
   * @returns {HSLA}
   */

	}, {
		key: 'Copy',
		value: function Copy(source, target) {
			if (target === undefined) return new HSLA(source.h, source.s, source.l, source.a);else return target.define(source.h, source.s, source.l, source.a);
		}

		/**
   * Returns true if a == b, false otherwise
   * @param {HSLA} a
   * @param {HSLA} b
   * @returns {Boolean}
   */

	}, {
		key: 'isEQ',
		value: function isEQ(a, b) {
			return a === b || a.h === b.h && a.s === b.s && a.l === b.l && a.a === b.a;
		}

		/**
   * Creates a new instance
   * @param {Float} h - The hue in radians
   * @param {Float} s - The saturation
   * @param {Float} l - The lightness
   * @param {Float} a - The alpha
   */

	}]);

	function HSLA(h, s, l, a) {
		_classCallCheck(this, HSLA);

		this.h = h;
		this.s = s;
		this.l = l;
		this.a = a;
	}

	/**
  * Redefines the instance
  * @param {Float} h - The hue in radians
  * @param {Float} s - The saturation
  * @param {Float} l - The lightness
  * @param {Float} a - The alpha
  * @returns {HSLA}
  */


	_createClass(HSLA, [{
		key: 'define',
		value: function define(h, s, l, a) {
			this.constructor.call(this, h, s, l, a);

			return this;
		}

		/**
   * The chroma
   * @type Float
   */

	}, {
		key: 'copyOf',


		/**
   * The copy of source
   * @param {HSLA} source - The source instance
   * @returns {HSLA}
   */
		value: function copyOf(source) {
			this.h = source.h;
			this.s = source.s;
			this.l = source.l;
			this.a = source.a;

			return this;
		}

		/**
   * Returns a Vector4 rgba representation of the instance
   * @param {Vector4} [target] - the target vector
   * @returns {Vector4}
   */

	}, {
		key: 'toRGBA',
		value: function toRGBA(target) {
			var c = this.chroma;
			var h = this.h / (1.0 / 3.0 * _Math2.default.PI);
			var x = c * (1.0 - _Math2.default.abs(h % 2.0 - 1.0));

			var r = void 0,
			    g = void 0,
			    b = void 0;

			if (h >= 0.0 && h < 1.0) r = c, g = x, b = 0.0;else if (h >= 1.0 && h < 2.0) r = x, g = c, b = 0.0;else if (h >= 2.0 && h < 3.0) r = 0.0, g = c, b = x;else if (h >= 3.0 && h < 4.0) r = 0.0, g = x, b = c;else if (h >= 4.0 && h < 5.0) r = x, g = 0.0, b = c;else r = c, g = 0.0, b = x;

			var min = this.l - 0.5 * c;
			var n = [r + min, g + min, b + min, this.a];

			if (target === undefined) return new _Vector4.default(n);else return target.define(n);
		}

		/**
   * Returns a Vector3 rgb representation of the instance
   * @param {Vector3} [matte] - The alpha matte rgb vector
   * @param {Vector3} [target] - The target vector
   * @returns {Vector3}
   */

	}, {
		key: 'toRGB',
		value: function toRGB() {
			var matte = arguments.length <= 0 || arguments[0] === undefined ? new _Vector2.default() : arguments[0];
			var target = arguments[1];

			var rgba = this.toRGBA(),
			    a = rgba.n[3];

			var n = [_Math2.default.mix(matte.n[0], rgba.n[0], a), _Math2.default.mix(matte.n[1], rgba.n[1], a), _Math2.default.mix(matte.n[2], rgba.n[2], a)];

			if (target === undefined) return new _Vector2.default(n);else return target.define(n);
		}

		/**
   * Returns a css-formated hsl or hsla representation of the instance
   * @returns {String}
   */

	}, {
		key: 'toCSS',
		value: function toCSS() {
			var hsl = _Math2.default.round(this.h * (180.0 / _Math2.default.PI)) + "," + _Math2.default.round(this.s * 100.0) + "%," + _Math2.default.round(this.l * 100.0) + "%";

			if (this.a === 1.0) return 'hsl(' + hsl + ')';else return 'hsla(' + hsl + ',' + this.a.toString() + ')';
		}

		/**
   * Returns a string representation of the instance
   * @param {Uint} [digits=3] - The decimal digits
   * @returns {String}
   */

	}, {
		key: 'toString',
		value: function toString() {
			var digits = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

			return "[HSLA]" + this.h.toFixed(digits) + " " + this.s.toFixed(digits) + " " + this.l.toFixed(digits) + " " + this.a.toFixed(digits);
		}
	}, {
		key: 'chroma',
		get: function get() {
			return (1.0 - _Math2.default.abs(2.0 * this.l - 1.0)) * this.s;
		}
	}]);

	return HSLA;
}();

exports.default = HSLA;