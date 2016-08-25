import Math from './Math';
import Vector3 from './Vector3';



/**
 * The rgb() string return type constant
 */
export const STRING_RGB = Symbol('rgb');

/**
 * The #rrggbb string return type constant
 */
export const STRING_HRGB = Symbol('hrgb');

/**
 * The 0xRRGGBB string return type constant
 */
export const STRING_XRGB = Symbol('xrgb');

const EXPR_RGB = /^rgb\((:?\s*(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*,){2}\s*(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*\)$/;
const EXPR_HRGB = /^#(?:([0-9A-Fa-f]){3}|([0-9A-Fa-f]{2}){3})$/;



/**
 * RGB three component vector representation
 */
export default class Vector3RGB extends Vector3 {

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
	static RGB(string, scale = 1.0, target) {
		if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();

		const n = [0.0, 0.0, 0.0];

		if (target === undefined) target = new Vector3RGB(n);
		else if (!(target instanceof Vector3)) throw new TypeError();
		else target.n = n;

		const match = string.match(EXPR_RGB);

		if (match !== null) {
			const t = 1.0 / 255.0 * scale;

			n[0] = Number.parseFloat(match[1]) * t;
			n[1] = Number.parseFloat(match[2]) * t;
			n[2] = Number.parseFloat(match[3]) * t;
		}

		return target;
	}

	/**
	 * Returns an instance representing #RGB encoded string
	 * @constructor
	 * @param {String} string The hash string
	 * @param {Float} [scale=1.0] The scale
	 * @param {Vector3} [target] The target instance
	 * @returns {Vector3RGB}
	 * @throws {TypeError} if string is not a String
	 * @throws {TypeError} if scale is not a Float or undefined
	 * @throws {TypeError} if target is not a Vector3 instance or undefined
	 */
	static HRGB(string, scale = 1.0, target) {
		if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();

		const n = [0.0, 0.0, 0.0];

		if (target === undefined) target = new Vector3RGB(n);
		else if (!(target instanceof Vector3)) throw new TypeError();
		else target.n = n;

		const match = string.match(EXPR_HRGB);

		if (match !== null) {
			const t = 1.0 / 255.0 * scale, dup = match[1].length === 1;

			n[0] = Number.parseFloat('0x' + match[1] + (dup ? match[1] : '')) * t;
			n[1] = Number.parseFloat('0x' + match[2] + (dup ? match[2] : '')) * t;
			n[2] = Number.parseFloat('0x' + match[3] + (dup ? match[3] : '')) * t;
		}

		return target;
	}

	/**
	 * Returns an instance representing <em>rrggbb</em> bit encoded <code>i</code>
	 * @constructor
	 * @param {Int} i The bit encoded Int
	 * @param {Float} [scale=1.0] The scale
	 * @param {Vector3RGB} [target] The target instance
	 * @returns {Vector3RGB}
	 * @throws {TypeError} if i is not an Int
	 * @throws {TypeError} if scale is not a Float or undefined
	 * @throws {TypeError} if target is not a Vector3 instance or undefined
	 */
	static Int(i, scale = 1.0, target) {
		if (Number.isSafeInteger(i) || typeof scale !== 'number') throw new TypeError();

		const n = [0.0, 0.0, 0.0];

		if (target === undefined) target = new Vector3RGB(n);
		else if (!(target instanceof Vector3)) throw new TypeError();
		else target.n = n;

		const t = 1.0 / 255.0 * scale;

		n[0] = i >> 16 & 0xFF * t;
		n[1] = i >>  8 & 0xFF * t;
		n[2] = i       & 0xFF * t;

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
	static XRGB(string, scale, target) {
		return Vector3RGB.Int(Number.parseInt(string), scale, target);
	}


	/**
	 * The r component
	 * Alias of {@link Vector3#x}
	 */
	get r() {
		return this.n[0];
	}

	set r(n) {
		this.n[0] = n;
	}


	/**
	 * The g component
	 * Alias of {@link Vector3#y}
	 */
	get g() {
		return this.n[1];
	}

	set g(n) {
		this.n[1] = n;
	}


	/**
	 * The b component
	 * Alias of {@link Vector3#z}
	 */
	get b() {
		return this.n[2];
	}

	set b(n) {
		this.n[2] = n;
	}


	/**
	 * Returns a rgb() encoded string representation of the instance
	 * @param {Float} [scale=1.0] - The scale
	 * @returns {String}
	 * @throws {TypeError} if scale is not a Float or undefined
	 */
	toRGB(scale = 1.0) {
		if (typeof scale !== 'number') throw new TypeError();

		scale = 1.0 / scale;

		const str = this.n
			.map((item, index, source) => (Math.clamp(item * scale, 0.0, 1.0) * 255.0).toFixed())
			.join(",");

		return `rgb(${ str })`;
	}

	/**
	 * Returns a #rrggbb encoded string representation of the instance
	 * @param {Float} [scale=1.0] - The scale
	 * @returns {String}
	 * @throws {TypeError} if scale is not a Float or undefined
	 */
	toHRGB(scale = 1.0) {
		if (typeof scale !== 'number') throw new TypeError();

		scale = 1.0 / scale;

		const str = this.n
			.map((item, index, source) => (Math.clamp(item * scale, 0.0, 1.0) * 255.0).toString(16))
			.join("");

		return `#${ str }`;
	}

	/**
	 * Returns a rrggbb bit encoded integer representation of the instance
	 * @param {Float} [scale=1.0] - The scale
	 * @returns {Int}
	 * @throws {TypeError} if scale is not a Float
	 */
	toInt(scale = 1.0) {
		if (typeof scale !== 'number') throw new TypeError();

		scale = 1.0 / scale;

		return this.n
			.map((item, index, source) => Math.round(Math.clamp(item * scale, 0.0, 1.0) * 255.0))
			.reduce((prev, current, index, source) => prev | current << 8 * (2 - index));
	}

	/**
	 * Returns a string representation of the instance
	 * @param {String} [type=STRING_XRGB] - The type
	 * @param {Float} [scale] - The scale
	 * @returns {String}
	 * @throws {TypeError} if type is not a STRING_* constant
	 */
	toString(type = STRING_XRGB, scale) {
		switch (type) {
			case STRING_RGB :
				return this.toRGB(scale);
			case STRING_RRGGBB :
				return this.toHRGB(scale);
			case STRING_XRGB :
				return this.toInt(scale).toString(16);
			default :
				throw new TypeError();
		}
	}

	/**
	 * Returns the {@link Vector3RGB#toInt} representation of the instance
	 * @param {Float} [scale] - The scale
	 * @returns {Int}
	 */
	valueOf(scale) {
		return this.toInt(scale);
	}
}
