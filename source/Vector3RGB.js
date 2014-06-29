/**
 * Creates a new instance
 * @class RGB three component vector representation
 * @author Christoph Kettelhoit <ck@christoph-kettelhoit.de>
 * @param {Float[]} [n] Array representing the three components
 *	<p>Arrays of length <em>!== 3</em> will return the zero (0.0,0.0,0.0) vector.</p>
 * @returns {Vector3RGB}
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
 */
function Vector3RGB(n) {
	Vector3.call(this, n);
}


Vector3RGB.prototype = Object.create(Vector3.prototype);

/**
 * The constructor
 * @type Function
 */
Vector3RGB.prototype.constructor = Vector3RGB;


/**
 * The r component
 * <p>Alias of <code>{@link Vector3#x}</code>.</p>
 * @name r
 * @memberOf Vector3RGB#
 * @type Float
 */
Object.defineProperty(Vector3RGB.prototype, 'r', {
	get: function() {
		return this.n[0];
	},
	set: function(n) {
		this.n[0] = n;
	},
	configurable: true,
	enumerable: true
});

/**
 * The g component
 * <p>Alias of <code>{@link Vector3#y}</code>.</p>
 * @name g
 * @memberOf Vector3RGB#
 * @type Float
 */
Object.defineProperty(Vector3RGB.prototype, 'g', {
	get: function() {
		return this.n[1];
	},
	set: function(n) {
		this.n[1] = n;
	},
	configurable: true,
	enumerable: true
});

/**
 * The b component
 * <p>Alias of <code>{@link Vector3#z}</code>.</p>
 * @name b
 * @memberOf Vector3RGB#
 * @type Float
 */
Object.defineProperty(Vector3RGB.prototype, 'b', {
	get: function() {
		return this.n[2];
	},
	set: function(n) {
		this.n[2] = n;
	},
	configurable: true,
	enumerable: true
});


/**
 * Returns a <em>rgb()</em> encoded string representation of the instance
 * @param {Float} [scale=1.0] The scale
 * @returns {String}
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 */
Vector3RGB.prototype.toRGB = function(scale) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof scale !== 'number') throw new TypeError();
	
	scale = 1.0 / scale;
	
	return "rgb(" + 
		(Math.clamp(this.n[0] * scale, 0.0, 1.0) * 255.0).toFixed() + "," +
		(Math.clamp(this.n[1] * scale, 0.0, 1.0) * 255.0).toFixed() + "," +
		(Math.clamp(this.n[2] * scale, 0.0, 1.0) * 255.0).toFixed() + ")"; 
};

/**
 * Returns a <em>#rrggbb</em> encoded string representation of the instance
 * @param {Float} [scale=1.0] The scale
 * @returns {String}
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 */
Vector3RGB.prototype.toHRGB = function(scale) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof scale !== 'number') throw new TypeError();
	
	scale = 1.0 / scale;
	
	return "#" +
		(Math.round(Math.clamp(this.n[0] * scale, 0.0, 1.0) * 255.0)).toString(16) +
		(Math.round(Math.clamp(this.n[1] * scale, 0.0, 1.0) * 255.0)).toString(16) +
		(Math.round(Math.clamp(this.n[2] * scale, 0.0, 1.0) * 255.0)).toString(16);
};

/**
 * Returns a <em>rrggbb</em> bit encoded integer representation of the instance
 * @param {Float} scale The scale
 * @returns {Int}
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code>
 */
Vector3RGB.prototype.toInt = function(scale) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof scale !== 'number') throw new TypeError();
	
	scale = 1.0 / scale;
	
	return Math.round(Math.clamp(this.n[0] * scale, 0.0, 1.0) * 255.0) << 16 |
		   Math.round(Math.clamp(this.n[1] * scale, 0.0, 1.0) * 255.0) <<  8 |
		   Math.round(Math.clamp(this.n[2] * scale, 0.0, 1.0) * 255.0);
};


/**
 * Returns a string representation of the instance
 * @param {String} [type=Vector3RGB.STRING_XRGB] The type
 * @param {Float}  [scale=1.0]                   The scale
 * @returns {String}
 * @throws {TypeError} if <code>type</code> is not a <em>STRING_* constant</em>
 */
Vector3RGB.prototype.toString = function(type, scale) {
	if (type === undefined) type = Vector3RGB.STRING_XRGB;
	
	switch (type) {
		case Vector3RGB.STRING_RGB    : return this.toRGB(scale);
		case Vector3RGB.STRING_RRGGBB : return this.toRRGGBB(scale);
		case Vector3RGB.STRING_XRGB   : return this.toInt(scale).toString(16);
		default       : throw new TypeError();
	}
};

/**
 * Returns the <code>{@link Vector3RGB#toInt}</code> representation of the instance
 * @param {Float} scale The scale
 * @returns {Int}
 */
Vector3RGB.prototype.valueOf = function(scale) {
	return this.toInt(scale);
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Vector3RGB
 * @type String
 */
Object.defineProperty(Vector3RGB, 'VERSION', {value: "0.9.17"});


/**
 * The rgb() expression
 * @constant
 * @name EXPR_RGB
 * @memberOf Vector3RGB
 * @type RegExp
 */
Object.defineProperty(Vector3RGB, 'EXPR_RGB', {
	value: /^rgb\(\s*(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*{2}(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*\)$/,
	enumerable: true
});

/**
 * The #RRGGBB expression
 * @constant
 * @name EXPR_HRGB
 * @memberOf Vector3RGB
 * @type RegExp
 */
Object.defineProperty(Vector3RGB, 'EXPR_HRGB', {
	value: /^#(?:([0-9A-Fa-f]){3}|([0-9A-Fa-f]{2}){3})$/,
	enumerable: true
});


/**
 * The rgb() string return type
 * @constant
 * @name STRING_RGB
 * @memberOf Vector3RGB
 * @type Uint
 */
Object.defineProperty(Vector3RGB, 'STRING_RGB', {
	value: 1,
	enumerable: true
});

/**
 * The #RRGGBB string return type
 * @constant
 * @name STRING_HRGB
 * @memberOf Vector3RGB
 * @type Uint
 */
Object.defineProperty(Vector3RGB, 'STRING_HRGB', {
	value: 2,
	enumerable: true
});

/**
 * The 0xRRGGBB string return type
 * @constant
 * @name STRING_XRGB
 * @memberOf Vector3RGB
 * @type Uint
 */
Object.defineProperty(Vector3RGB, 'STRING_XRGB', {
	value: 3,
	enumerable: true
});


/**
 * Returns an instance representing <em>rgb()</em> encoded <code>string</code>
 * @param {String}   string     The rgb string
 * @param {Float}   [scale=1.0] The scale
 * @param {Vector3} [target]    The target instance
 * @returns {Vector3}
 * @throws {TypeError} if <code>string</code> is not a <code>String</code>
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 * @throws {TypeError} if <code>target</code> is not a <code>Vector3</code> instance or <code>undefined</code>
 */
Vector3RGB.RGB = function(string, scale, target) {	
	if (scale === undefined) scale = 1.0;
	
	if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();
	
	var n = [0.0, 0.0, 0.0];
	
	if (target === undefined) target = new Vector3RGB(n);
	else if (!(target instanceof Vector3)) throw new TypeError();
	else target.n = n;
	
	var match = string.match(Vector3RGB.EXPR_RGB);
	
	if (match !== null) {
		var t = 1.0 / 255.0 * scale;
		
		n[0] = parseFloat(match[1]) * t;
		n[1] = parseFloat(match[2]) * t;
		n[2] = parseFloat(match[3]) * t;
	}
	
	return target;
};

/**
 * Returns an instance representing <em>#RGB</em> encoded <code>string</code>
 * @param {String}   string     The hash string
 * @param {Float}   [scale=1.0] The scale
 * @param {Vector3} [target]    The target instance
 * @returns {Vector3RGB}
 * @throws {TypeError} if <code>string</code> is not a <code>String</code>
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 * @throws {TypeError} if <code>target</code> is not a <code>Vector3</code> instance or <code>undefined</code>
 */
Vector3RGB.HRGB = function(string, scale, target) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();
	
	var n = [0.0, 0.0, 0.0];
	
	if (target === undefined) target = new Vector3RGB(n);
	else if (!(target instanceof Vector3)) throw new TypeError();
	else target.n = n;
	
	var match = string.match(Vector3RGB.EXPR_HRGB);
	
	if (match !== null) {
		var t = 1.0 / 255.0 * scale, dup = match[1].length === 1;
		
		n[0] = parseFloat('0x' + match[1] + (dup ? match[1] : '')) * t;
		n[1] = parseFloat('0x' + match[2] + (dup ? match[2] : '')) * t;
		n[2] = parseFloat('0x' + match[3] + (dup ? match[3] : '')) * t;
	}
	
	return target;
};

/**
 * Returns an instance representing <em>aarrggbb</em> encoded <code>string</code>
 * @param {String}   string     The string
 * @param {Float}   [scale=1.0] The scale
 * @param {Vector3} [target]    The target instance
 * @returns {Vector3RGB}
 */
Vector3RGB.XRGB = function(string, scale, target) {
	return Vector3RGB.Int(parseInt(string), scale, target);
};

/**
 * Returns an instance representing <em>rrggbb</em> bit encoded <code>i</code>
 * @param {Int}         i          The bit encoded Int
 * @param {Float}      [scale=1.0] The scale
 * @param {Vector3RGB} [target]    The target instance
 * @returns {Vector3RGB}
 * @throws {TypeError} if <code>i</code> is not an <code>Int</code>
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 * @throws {TypeError} if <code>target</code> is not a <code>Vector3</code> instance or <code>undefined</code>
 */
Vector3RGB.Int = function(i, scale, target) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof i !== 'number' || i << 0 !== i || typeof scale !== 'number') throw new TypeError();
	
	var n = [0.0, 0.0, 0.0];
	
	if (target === undefined) target = new Vector3RGB(n);
	else if (!(target instanceof Vector3)) throw new TypeError();
	else target.n = n;
	
	var t = 1.0 / 255.0 * scale;
	
	n[0] = i >> 16 & 0xFF * t;
	n[1] = i >>  8 & 0xFF * t;
	n[2] = i       & 0xFF * t;
	
	return target;
};


/**
 * Returns a type-version string
 * @return {String}
 */
Vector3RGB.toString = function() {
	return "[Vector3RGB-" + Vector3RGB.VERSION + "]";
};