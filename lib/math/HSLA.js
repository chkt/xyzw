/**
 * Creates a new instance
 * @class HSLA color model transform
 * @requires Vector3
 * @requires Vector4
 * @param {Float} h The hue in radians
 * @param {Float} s The saturation
 * @param {Float} l The lightness
 * @param {Float} a The alpha
 * @returns {HSLA}
 */
function HSLA(h, s, l, a) {
	/**
	 * The hue in radians
	 * @type Float
	 */
	this.h = h;
	/**
	 * The saturation
	 * @type Float
	 */
	this.s = s;
	/**
	 * The lightness
	 * @type Float
	 */
	this.l = l;
	/**
	 * The alpha
	 * @type Float
	 */
	this.a = a;
}


/**
 * (Re)defines the instance
 * @param {Float} h The hue in radians
 * @param {Float} s The saturation
 * @param {Float} l The lightness
 * @param {Float} a The alpha
 * @returns {HSLA}
 */
HSLA.prototype.define = function(h, s, l, a) {
	HSLA.call(this, h, s, l, a);
	
	return this;
};


/**
 * The chroma
 * @readonly
 * @name chroma
 * @memberOf HSLA#
 * @type Float
 */
Object.defineProperty(HSLA.prototype, 'chroma', {
	get: function() {
		return (1.0 - Math.abs(2.0 * this.l - 1.0)) * this.s;
	},
	configurable: true,
	enumerable: true
});


/**
 * The copy of <code>source</code>
 * @param {HSLA} source The source instance
 * @returns {HSLA}
 */
HSLA.prototype.copyOf = function(source) {
	this.h = source.h;
	this.s = source.s;
	this.l = source.l;
	this.a = source.a;
	
	return this;
};


/**
 * Returns a Vector3 rgb representation of the instance
 * @param {Vector3} [matte]  The alpha matte rgb vector
 * @param {Vector3} [target] The target vector
 * @returns {Vector3}
 */
HSLA.prototype.toRGB = function(matte, target) {
	if (matte === undefined) matte = new Vector3();
	
	var rgba = this.toRGBA(), a = rgba.n[3];
	
	var n = [
		Math.mix(matte.n[0], rgba.n[0], a),
		Math.mix(matte.n[1], rgba.n[1], a),
		Math.mix(matte.n[2], rgba.n[2], a)
	];
	
	if (target === undefined) return new Vector3(n);
	else return target.define(n);
};

/**
 * Returns a Vector4 rgba representation of the instance
 * @param {Vector4} [target] the target vector
 * @returns {Vector4}
 */
HSLA.prototype.toRGBA = function(target) {
	var c = this.chroma;
	var h = this.h / ((1.0 / 3.0) * Math.PI);
	var x = c * (1.0 - Math.abs(h % 2.0 - 1.0));
	
	if      (h >= 0.0 && h < 1.0) var r = c, g = x, b = 0.0;
	else if (h >= 1.0 && h < 2.0)     r = x, g = c, b = 0.0;
	else if (h >= 2.0 && h < 3.0)     r = 0.0, g = c, b = x;
	else if (h >= 3.0 && h < 4.0)     r = 0.0, g = x, b = c;
	else if (h >= 4.0 && h < 5.0)     r = x, g = 0.0, b = c;
	else                              r = c, g = 0.0, b = x;
	
	var min = this.l - 0.5 * c;
	var n = [r + min, g + min, b + min, this.a];
	
	if (target === undefined) return new Vector4(n);
	else return target.define(n);
};

/**
 * Returns a css-formated <em>hsl</em> or <em>hsla</em> representation of the instance
 * @returns {String}
 */
HSLA.prototype.toCSS = function() {
	var hsl = Math.round(this.h * (180.0 / Math.PI)) + "," +
		Math.round(this.s * 100.0) + "%," +
		Math.round(this.l * 100.0) + "%";
	
	if (this.a === 1.0) return "hsl(" + hsl + ")";
	else return "hsla(" + hsl + "," + this.a.toString() + ")";
};

/**
 * Returns a string representation of the instance
 * @param {Uint} [digits] The decimal digits
 * @returns {String}
 */
HSLA.prototype.toString = function(digits) {
	if (digits === undefined) digits = 3;
	
	return this.constructor.toString() +
		"\t" + this.h.toFixed(digits) +
		" " + this.s.toFixed(digits) +
		" " + this.l.toFixed(digits) +
		" " + this.a.toFixed(digits);
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf HSLA
 * @type String
 */
Object.defineProperty(HSLA, 'VERSION', {value: "0.0.2"});


/**
 * Returns an instance representing v
 * @param {Vector3}  v       The source rgb vector
 * @param {HSLA}    [target] The target instance
 * @returns {HSLA}
 */
HSLA.RGB = function(v, target) {
	return HSLA.RGBA(Vector4.Vector3(v), target);
};

/**
 * Returns an instance representing v
 * @param {Vector4}  v       The source rgba vector
 * @param {HSLA}    [target] The target instance
 * @returns {HSLA}
 */
HSLA.RGBA = function(v, target) {
	var r = v.n[0], g = v.n[1], b = v.n[2];
	
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	
	var h, s, l, c = max - min;
	
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
};


/**
 * Returns the copy of <code>source</code>
 * @param {HSLA}  source  The source instance
 * @param {HSLA} [target] The target instance
 * @returns {HSLA}
 */
HSLA.Copy = function(source, target) {
	if (target === undefined) return new HSLA(source.h, source.s, source.l, source.a);
	else return target.define(source.h, source.s, source.l, source.a);
};


/**
 * Returns <code>true</code> if <code>a == b</code>, <code>false</code> otherwise
 * @param {HSLA} a
 * @param {HSLA} b
 * @returns {Boolean}
 */
HSLA.isEQ = function(a, b) {
	if (a === b) return true;
	
	return a.h === b.h && a.s === b.s && a.l === b.l && a.a === b.a;
};


/**
 * Returns a type-version string
 * @returns {String}
 */
HSLA.toString = function() {
	return "[HSLA-" + this.VERSION + "]";
};