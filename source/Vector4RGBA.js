/**
 * Creates a new instance
 * @class RGBA Four component vector representation
 * @author Christoph Kettelhoit <ck@christoph-kettelhoit.de>
 * @param {Float[]} [n] Array representing the four components
 *	<p>Arrays of length <em>!== 4</em> will return the identity (0.0,0.0,0.0,1.0) vector.</p>
 * @returns {Vector4RGBA}
 * @license Licensed under the MIT License
 */
function Vector4RGBA(n) {
	Vector4.call(this, n);
}


Vector4RGBA.prototype = Object.create(Vector4.prototype);

/**
 * The constructor
 * @type Function
 */
Vector4RGBA.prototype.constructor = Vector4RGBA;


/**
 * The r component
 * <p>Alias of <code>{@link Vector4#x}</code>.</p>
 * @name r
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4RGBA.prototype, 'r', {
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
 * <p>Alias of <code>{@link Vector4#y}</code>.</p>
 * @name g
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4RGBA.prototype, 'g', {
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
 * <p>Alias of <code>{@link Vector4#z}</code>.</p>
 * @name b
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4RGBA.prototype, 'b', {
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
 * The a component
 * <p>Alias of <code>{@link Vector4#w}</code>.</p>
 * @name a
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4RGBA.prototype, 'a', {
	get: function() {
		return this.n[3];
	},
	set: function(n) {
		this.n[3] = n;
	},
	configurable: true,
	enumerable: true
});


/**
 * Returns a <em>rgba()</em> encoded string representation of the instance
 * @param {Float} [scale=1.0] The rgb scale
 * @returns {String}
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 */
Vector4RGBA.prototype.toRGBA = function(scale) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof scale !== 'number') throw new TypeError();
	
	scale = 1.0 / scale;
	
	return "rgba(" +
		(Math.clamp(this.n[0] * scale, 0.0, 1.0) * 255.0).toFixed() + "," +
		(Math.clamp(this.n[1] * scale, 0.0, 1.0) * 255.0).toFixed() + "," +
		(Math.clamp(this.n[2] * scale, 0.0, 1.0) * 255.0).toFixed() + "," +
		(Math.clamp(this.n[3] * scale, 0.0, 1.0)).toFixed() + ")";
};

/**
 * Returns a <em>aarrggbb</em> bit encoded integer representation of the instance
 * @param {Float} [scale=1.0] The scale
 * @returns {Int}
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 */
Vector4RGBA.prototype.toInt = function(scale) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof scale !== 'number') throw new TypeError();
	
	scale = 1.0 / scale;
	
	return Math.round(Math.clamp(this.n[0] * scale, 0.0, 1.0) * 255.0) << 16 |
		   Math.round(Math.clamp(this.n[1] * scale, 0.0, 1.0) * 255.0) <<  8 |
		   Math.round(Math.clamp(this.n[2] * scale, 0.0, 1.0) * 255.0)       |
		   Math.round(Math.clamp(this.n[3] * scale, 0.0, 1.0) * 255.0) << 24;
};


/**
 * Returns a string representation of the instance
 * @param {Uint}  [type=Vector4RGBA.STRING_XARGB] The return type
 * @param {Float} [scale=1.0]                     The scale
 * @returns {String}
 * @throws {TypeError} if <code>type</code> is not a <em>STRING_* constant</em>
 */
Vector4RGBA.prototype.toString = function(type, scale) {
	if (type === undefined) type = Vector4RGBA.STRING_RGBA;
	
	switch(type) {
		case Vector4RGBA.STRING_RGBA  : return this.toRGBA(scale);
		case Vector4RGBA.STRING_XARGB : return this.toInt(scale).toString(16);
		default : throw new TypeError();
	}
};

/**
 * Returns a <code>{@link Vector4RGBA#toInt}</code> representation of the instance
 * @param {Float} [scale=1.0]
 * @returns {Int}
 */
Vector4RGBA.prototype.valueOf = function(scale) {
	return this.toInt(scale);
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Vector4RGBA
 * @type String
 */
Object.defineProperty(Vector4RGBA, 'VERSION', {value: "0.5.4"});


/**
 * The rgba() expression
 * @constant
 * @name EXPR_RGBA
 * @memberOf Vector4RGBA
 * @type RegExp
 */
Object.defineProperty(Vector4RGBA, 'EXPR_RGBA', {
	value: /^rgba\((?:\s*(\d|1\d{1,2}|2[0-4]\d|25[0-5])\s*,){3}\s*([01](?:\.\d+)?)\s*\)\$/,
	enumerable: true
});

/**
 * The rgba() string return type
 * @constant
 * @name STRING_RGBA
 * @memberOf Vector4RGBA
 * @type Uint
 */
Object.defineProperty(Vector4RGBA, 'STRING_RGBA', {
	value: 1,
	enumerable: true
});

/**
 * The 0xAARRGGBB string return type
 * @constant
 * @name STRING_XARGB
 * @memberOf Vector4RGBA
 * @type Uint
 */
Object.defineProperty(Vector4RGBA, 'STRING_XARGB', {
	value: 2,
	enumerable: true
});


/**
 * Returns an instance representing the <em>rgba()</em> encoded <code>string</code>
 * @param {String}   string     The rgba string
 * @param {Float}   [scale=1.0] The scale
 * @param {Vector4} [target]    The target instance
 * @returns {Vector4}
 * @throws {TypeError} if <code>string</code> is not a <code>String</code>
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 * @throws {TypeError} if <code>target</code> is not a <code>Vector4</code> or <code>undefined</code>
 */
Vector4RGBA.RGBA = function(string, scale, target) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof string !== 'string' || typeof scale !== 'number') throw new TypeError();
	
	var n = [0.0, 0.0, 0.0, 0.0];
	
	if (target === undefined) target = new Vector4RGBA(n);
	else if (!(target instanceof Vector4)) throw new TypeError();
	else target.n = n;
	
	var match = string.match(Vector4RGBA.EXPR_RGBA);
	
	if (match !== null) {
		var t = 1.0 / 255.0 * scale;
		
		n[0] = parseFloat(match[1]) * t;
		n[1] = parseFloat(match[2]) * t;
		n[2] = parseFloat(match[3]) * t;
		n[3] = parseFloat(match[4]);
	}
	
	return target;
};

/**
 * Returns an instance representing <em>AARRGGBB</em> encoded <code>string</code>
 * @param {String}  string     The string
 * @param {Float}  [scale=1.0] The scale
 * @param {type}   [target]    The target instance
 * @returns {Vector4RGBA}
 */
Vector4RGBA.XARGB = function(string, scale, target) {
	return Vector4RGBA.Int(parseInt(string), scale, target);
};

/**
 * Returns an instance representing <em>0xAARRGGBB</em> bit encoded <code>i</code>
 * @param {Int}   i          The encoded Int
 * @param {type} [scale=1.0] The scale
 * @param {type} [target]    The target instance
 * @returns {Vector4RGBA}
 * @throws {TypeError} if <code>i</code> is not a <code>Int</code>
 * @throws {TypeError} if <code>scale</code> is not a <code>Float</code> or <code>undefined</code>
 * @throws {TypeError} if <code>target</code> is not a <code>Vector4</code> instance or <code>undefined</code>
 */
Vector4RGBA.Int = function(i, scale, target) {
	if (scale === undefined) scale = 1.0;
	
	if (typeof i !== 'number' || i << 0 !== i || typeof scale !== 'number') throw new TypeError();
	
	var n = [0.0, 0.0, 0.0, 0.0];
	
	if (target === undefined) target = new Vector4RGBA(n);
	else if (!(target instanceof Vector4)) throw new TypeError();
	else target.n = n;
	
	var t = 1.0 / 255.0 * scale;
	
	n[0] = i >> 16 & 0xFF * t;
	n[1] = i >>  8 & 0xFF * t;
	n[2] = i       & 0xFF * t;
	n[3] = i >> 24 & 0xFF * t;
	
	return target;
};


/**
 * Returns a type-version string
 * @returns {String}
 */
Vector4RGBA.toString = function() {
	return "[Vector4RGBA-" + Vector4RGBA.VERSION + "]";
};