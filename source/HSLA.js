import Math from './Math';
import Vector3 from './Vector3';
import Vector4 from './Vector4';



/**
 * HSLA color model transform
 */
export default class HSLA {

	/**
	 * Returns an instance representing v
	 * @constructor
	 * @param {Vector4} v - The source rgba vector
	 * @param {HSLA} [target] - The target instance
	 * @returns {HSLA}
	 */
	static RGBA(v, target) {
		const r = v.n[0], g = v.n[1], b = v.n[2];

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);

		let h, s, l, c = max - min;

		if      (c === 0.0) h = 0.0;
		else if (min === r) h = (g - b) / c % 6.0;
		else if (min === g) h = (b - r) / c + 2.0;
		else                h = (r - g) / c + 4.0;

		h *= (1.0 / 3.0) * Math.PI;
		l = 0.5 * (max + min);

		if (c === 0.0) s = 0.0;
		else s = c / (1.0 - Math.abs(2.0 * l - 1.0));

		if (target === undefined) return new HSLA(h, s, l, v.n[3]);
		else return target.define(h, s, l, v.n[3]);
	}

	/**
	 * Returns an instance representing v
	 * @constructor
	 * @param {Vector3} v - The source rgb vector
	 * @param {HSLA} [target] - The target instance
	 * @returns {HSLA}
	 */
	static RGB(v, target) {
		return HSLA.RGBA(Vector4.Vector3(v), target);
	}


	/**
	 * Returns the copy of source
	 * @param {HSLA} source - The source instance
	 * @param {HSLA} [target] - The target instance
	 * @returns {HSLA}
	 */
	static Copy(source, target) {
		if (target === undefined) return new HSLA(source.h, source.s, source.l, source.a);
		else return target.define(source.h, source.s, source.l, source.a);
	}


	/**
	 * Returns true if a == b, false otherwise
	 * @param {HSLA} a
	 * @param {HSLA} b
	 * @returns {Boolean}
	 */
	static isEQ(a, b) {
		return a === b || a.h === b.h && a.s === b.s && a.l === b.l && a.a === b.a;
	}



	/**
	 * Creates a new instance
	 * @param {Float} h - The hue in radians
	 * @param {Float} s - The saturation
	 * @param {Float} l - The lightness
	 * @param {Float} a - The alpha
	 */
	constructor(h, s, l, a) {
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
	define(h, s, l, a) {
		this.constructor.call(this, h, s, l, a);

		return this;
	}


	/**
	 * The chroma
	 * @type Float
	 */
	get chroma() {
		return (1.0 - Math.abs(2.0 * this.l - 1.0)) * this.s;
	}


	/**
	 * The copy of source
	 * @param {HSLA} source - The source instance
	 * @returns {HSLA}
	 */
	copyOf(source) {
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
	toRGBA(target) {
		const c = this.chroma;
		const h = this.h / ((1.0 / 3.0) * Math.PI);
		const x = c * (1.0 - Math.abs(h % 2.0 - 1.0));

		let r, g, b;

		if      (h >= 0.0 && h < 1.0) r = c, g = x, b = 0.0;
		else if (h >= 1.0 && h < 2.0) r = x, g = c, b = 0.0;
		else if (h >= 2.0 && h < 3.0) r = 0.0, g = c, b = x;
		else if (h >= 3.0 && h < 4.0) r = 0.0, g = x, b = c;
		else if (h >= 4.0 && h < 5.0) r = x, g = 0.0, b = c;
		else                          r = c, g = 0.0, b = x;

		const min = this.l - 0.5 * c;
		const n = [r + min, g + min, b + min, this.a];

		if (target === undefined) return new Vector4(n);
		else return target.define(n);
	}

	/**
	 * Returns a Vector3 rgb representation of the instance
	 * @param {Vector3} [matte] - The alpha matte rgb vector
	 * @param {Vector3} [target] - The target vector
	 * @returns {Vector3}
	 */
	toRGB(matte = new Vector3(), target) {
		const rgba = this.toRGBA(), a = rgba.n[3];

		const n = [
			Math.mix(matte.n[0], rgba.n[0], a),
			Math.mix(matte.n[1], rgba.n[1], a),
			Math.mix(matte.n[2], rgba.n[2], a)
		];

		if (target === undefined) return new Vector3(n);
		else return target.define(n);
	}

	/**
	 * Returns a css-formated hsl or hsla representation of the instance
	 * @returns {String}
	 */
	toCSS() {
		const hsl = Math.round(this.h * (180.0 / Math.PI)) + "," +
			Math.round(this.s * 100.0) + "%," +
			Math.round(this.l * 100.0) + "%";

		if (this.a === 1.0) return `hsl(${ hsl })`;
		else return `hsla(${ hsl },${ this.a.toString() })`;
	}

	/**
	 * Returns a string representation of the instance
	 * @param {Uint} [digits=3] - The decimal digits
	 * @returns {String}
	 */
	toString(digits = 3) {
		return "[HSLA]" +
			this.h.toFixed(digits) + " " +
			this.s.toFixed(digits) + " " +
			this.l.toFixed(digits) + " " +
			this.a.toFixed(digits);
	}
}
