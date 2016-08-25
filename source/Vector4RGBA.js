import Math from './Math';
import Vector4 from './Vector4';



/**
 * The rgba() string return type constant
 */
export const STRING_RGBA = Symbol('rgba');
/**
 * The 0xAARRGGBB string return type constant
 */
export const STRING_XARGB = Symbol('xargb');

const EXPR_RGBA = /^rgba\((?:\s*(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*,){3}\s*([01](?:\.\d+)?)\s*\)\$/;



/**
 * RGBA Four component vector representation
 */
export default class Vector4RGBA extends Vector4 {

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
	static RGBA(string, scale = 1.0, target = undefined) {
		if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();

		const n = [0.0, 0.0, 0.0, 0.0];

		if (target === undefined) target = new Vector4RGBA(n);
		else if (!(target instanceof Vector4)) throw new TypeError();
		else target.n = n;

		const match = string.match(EXPR_RGBA);

		if (match !== null) {
			const t = 1.0 / 255.0 * scale;

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
	static Int(i, scale = 1.0, target = undefined) {
		if (!Number.isSafeInteger(i) || typeof scale !== 'number') throw new TypeError();

		const n = [0.0, 0.0, 0.0, 0.0];

		if (target === undefined) target = new Vector4RGBA(n);
		else if (!(target instanceof Vector4)) throw new TypeError();
		else target.n = n;

		const t = 1.0 / 255.0 * scale;

		n[0] = i >> 16 & 0xFF * t;
		n[1] = i >>  8 & 0xFF * t;
		n[2] = i       & 0xFF * t;
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
	static XARGB(string, scale, target) {
		return Vector4RGBA.Int(Number.parseInt(string), scale, target);
	}



	/**
	 * The r component
	 * Alias of {@link Vector4#x}
	 * @type Float
	 */
	get r() {
		return this.n[0];
	}

	set r(n) {
		this.n[0] = n;
	}


	/**
	 * The g component
	 * Alias of {@link Vector4#y}
	 * @type Float
	 */
	get g() {
		return this.n[1];
	}

	set g(n) {
		this.n[1] = n;
	}


	/**
	 * The b component
	 * Alias of {@link Vector4#z}
	 * @type Float
	 */
	get b() {
		return this.n[2];
	}

	set b(n) {
		this.n[2] = n;
	}


	/**
	 * The a component
	 * Alias of {@link Vector4#w}
	 * @type Float
	 */
	get a() {
		return this.n[3];
	}

	set a(n) {
		this.n[3] = n;
	}


	/**
	 * Returns a rgba() encoded string representation of the instance
	 * @param {Float} [scale=1.0] - The rgb scale
	 * @returns {String}
	 * @throws {TypeError} if scale is not a Float or undefined
	 */
	toRGBA(scale = 1.0) {
		if (typeof scale !== 'number') throw new TypeError();

		scale = 1.0 / scale;

		const str = this.n
			.map((item, index, source) => (Math.clamp(item * scale, 0.0, 1.0) * 255.0).toFixed())
			.join(",");

		return `rgba(${ str })`;
	}

	/**
	 * Returns a aarrggbb bit encoded integer representation of the instance
	 * @param {Float} [scale=1.0] - The scale
	 * @returns {Int}
	 * @throws {TypeError} if scale is not a Float or undefined
	 */
	toInt(scale = 1.0) {
		if (typeof scale !== 'number') throw new TypeError();

		scale = 1.0 / scale;

		return this.n
			.map((item, index, source) => Math.round(Math.clamp(item * scale, 0.0, 1.0) * 255.0))
			.reduce((prev, current, index) => prev | current << 8 * ((2 - index) % 4));
	}

	/**
	 * Returns a string representation of the instance
	 * @param {Uint} [STRING_XARGB] - The return type
	 * @param {Float} [scale=1.0] - The scale
	 * @returns {String}
	 * @throws {TypeError} if type is not a STRING_* constant
	 */
	toString(type = STRING_RGBA, scale = 1.0) {
		switch (type) {
			case STRING_RGBA : return this.toRGBA(scale);
			case STRING_XARGB : return this.toInt(scale).toString(16);
			default : throw new TypeError();
		}
	}

	/**
	 * Returns a {@link Vector4RGBA#toInt} representation of the instance
	 * @param {Float} [scale]
	 * @returns {Int}
	 */
	valueOf(scale) {
		return this.toInt(scale);
	}
}
