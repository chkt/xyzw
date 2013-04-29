/**
 * Creates a new instance
 * @class Two component vector
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array representing the two components
 *	<p>Arrays of <em>length !== 2</em> will return the zero (0,0) vector.</p>
 * @returns {Vector2}
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
 */
function Vector2(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor === Array && n.length === 2 ? n : [0.0, 0.0]);
}


Vector2.prototype = {};
/**
 * The constructor
 * @type Function
 */
Vector2.prototype.constructor = Vector2;


/**
 * (Re)defines the instance
 * @param {Float[]} [n] Array representing the two components
 *	<p>Arrays of <em>length !== 2</em> will return the zero (0,0) vector.</p>
 * @returns {undefined}
 */
Vector2.prototype.define = function(n) {
	Vector2.call(this, n);
};


/**
 * The x component, <code>{@link Vector2#n}[0]</code>
 * @name x
 * @memberOf Vector2#
 * @type Float
 */
Object.defineProperty(Vector2.prototype, 'x', {
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
 * The y component, <code>{@link Vector2#n}[1]</code>
 * @name y
 * @memberOf Vector2#
 * @type Float
 */
Object.defineProperty(Vector2.prototype, 'y', {
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
 * The s component
 * <p>Alias of <code>{@link Vector2#x}</code>.</p>
 * @name s
 * @memberOf Vector2#
 * @type Float
 */
Object.defineProperty(Vector2.prototype, 's', {
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
 * The t component
 * <p>Alias of <code>{@link Vector2#y}</code>.</p>
 * @name t
 * @memberOf Vector2#
 * @type Float
 */
Object.defineProperty(Vector2.prototype, 't', {
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
 * The norm
 * <p>[readonly]</p>
 * @name norm
 * @memberOf Vector2#
 * @type {Float}
 */
Object.defineProperty(Vector2.prototype, 'norm', {
	get: function() {
		var x = this.n[0], y = this.n[1];
		return Math.sqrt(x * x + y * y);
	},
	configurable: true,
	enumerable: true
});


/**
 * The sum of v and w (v+w)
 * @param {Vector2} v The first summand
 * @param {Vector2} w The second summand
 * @returns {undefined}
 */
Vector2.prototype.add = function(v, w) {
	this.n[0] = v.n[0] + w.n[0];
	this.n[1] = v.n[1] + w.n[1];
};

/**
 * The difference of v and w (v-w)
 * @param {Vector2} v The minuend
 * @param {Vector2} w The subtrahend
 * @returns {undefined}
 */
Vector2.prototype.subtract = function(v, w) {
	this.n[0] = v.n[0] - w.n[0];
	this.n[1] = v.n[1] - w.n[1];
};

/**
 * The scalar product of v and n (v*n)
 * @param {Vector2} v The vector
 * @param {Float}   n The scalar
 * @returns {undefined}
 */
Vector2.prototype.multiplyScalar = function(v, n) {
	this.n[0] = v.n[0] * n;
	this.n[1] = v.n[1] * n;
};

/**
 * The transformation of v (m*v)
 * @param {Matrix2} m The transform
 * @param {Vector2} v The vector
 * @returns {undefined}
 */
Vector2.prototype.multiplyMatrix2 = function(m, v) {
	var mn = m.n, x = v.n[0], y = v.n[1];

	this.n[0] = x * mn[0] + y * mn[2];
	this.n[1] = x * mn[1] + y * mn[3];
};

/**
 * The 2x3 transformation of v (m*v)
 * @param {Matrix3} m The transform
 * @param {Vector2} v The vector
 * @returns {undefined}
 */
Vector2.prototype.multiply2x3Matrix3 = function(m, v) {
	var mn = m.n, x = v.n[0], y = v.n[1];

	this.n[0] = x * mn[0] + y * mn[3] + mn[6];
	this.n[1] = x * mn[1] + y * mn[4] + mn[7];
};

/**
 * The transformation of v (m*v)
 * @param {Matrix3} m The transform
 * @param {Vector2} v The vector
 * @returns {undefined}
 */
Vector2.prototype.multiplyMatrix3 = function(m, v) {
	var mn = m.n, x = v.n[0], y = v.n[1];
	var w = 1.0 / (x * mn[2] + y * mn[5] + mn[8]);

	this.n[0] = (x * mn[0] + y * mn[3] + mn[6]) * w;
	this.n[1] = (x * mn[1] + y * mn[4] + mn[7]) * w;
};


/**
 * The componentwise minimum of v and w (min(v,w))
 * @param {Vector2} v The first vector
 * @param {Vector2} w The second vector
 * @returns {undefined}
 */	
Vector2.prototype.minXY = function(v, w) {
	var vn = v.n, wn = w.n;

	this.n[0] = vn[0] < wn[0] ? vn[0] : wn[0];
	this.n[1] = vn[1] < wn[1] ? vn[1] : wn[1];
};

/**
 * The componentwise maximum of v and w (max(v,w))
 * @param {Vector2} v The first vector
 * @param {Vector2} w The second vector
 * @returns {undefined}
 */	
Vector2.prototype.maxXY = function(v, w) {
	var vn = v.n, wn = w.n;

	this.n[0] = vn[0] > wn[0] ? vn[0] : wn[0];
	this.n[1] = vn[1] > wn[1] ? vn[1] : wn[1];
};

	
/**
 * The sum of the instance and w (v+w)
 * @param {Vector2} w The second summand
 * @returns {undefined}
 */
Vector2.prototype.addEQ = function(w) {
	this.n[0] += w.n[0];
	this.n[1] += w.n[1];
};

/**
 * The difference of the instance and w (v-w)
 * @param {Vector2} w The subtrahend
 * @returns {undefined}
 */
Vector2.prototype.subtractEQ = function(w) {
	this.n[0] -= w.n[0];
	this.n[1] -= w.n[1];
};

/**
 * The scalar product of the instance and n (v*n)
 * @param {Float} n The scalar
 * @returns {undefined}
 */
Vector2.prototype.multiplyScalarEQ = function(n) {
	this.n[0] *= n;
	this.n[1] *= n;
};


/**
 * The copy of v
 * @param {Vector2} v The source
 * @returns {undefined}
 */
Vector2.prototype.copyOf = function(v) {
	this.n = v.n.slice(0, 2);
};


/**
 * The normal form of the instance
 * @returns {undefined}
 */
Vector2.prototype.normalize = function() {
	var x = this.n[0], y = this.n[1];
	var norm = 1.0 / Math.sqrt(x * x + y * y);
	this.n[0] *= norm; this.n[1] *= norm;
};


/**
 * Returns a string representation of the instance
 * @param {Uint} [digits=3] The decimal digits
 * @returns {String}
 */
Vector2.prototype.toString = function(digits) {
	if (digits === undefined) digits = 3;

	return this.constructor.toString() + "(" + 
		this.n[0].toFixed(digits) + " " + 
		this.n[1].toFixed(digits) + ")";
};

/**
 * Returns the <code>{@link Vector2#norm}</code> of the instance
 * @returns {Float}
 */
Vector2.prototype.valueOf = function() {
	return this.norm;
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Vector2
 * @type String
 */
Object.defineProperty(Vector2, 'VERSION', { value: "0.9.10" });


/**
 * Returns a unit instance from <code>rad</code>
 * @param {Float}    rad     The rotation in radians
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.Rotation = function(rad, target) {
	var n = [
		Math.cos(rad), 
		Math.sin(rad)
	];
	
	if (target !== undefined) target.n = n;
	else target = new Vector2(n);
	
	return target;
};

/**
 * Returns the resulting instance of <em>cw</em> triangle (v0,v1,v2) and barycentric coordinates (u,v)
 * @param {Vector2}  v0      The first corner
 * @param {Vector2}  v1      The second corner
 * @param {Vector2}  v2      The third corner
 * @param {Float}    u       The u-coordinate
 * @param {Float}    v       The v-coordinate
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.BarycentricUV = function(v0, v1, v2, u, v, target) {
	var n = [
		v0.n[0] + (v1.n[0] - v0.n[0]) * u + (v2.n[0] - v0.n[0]) * v,
		v0.n[1] + (v1.n[1] - v0.n[1]) * u + (v2.n[1] - v0.n[1]) * v
	];
	
	if (target !== undefined) target.n = n;
	else target = new Vector2(n);
	
	return target;
};


/**
 * Returns the sum of v and w (v+w)
 * @param {Vector2} v The first summand
 * @param {Vector2} w The second summand
 * @returns {Vector2}
 */
Vector2.add = function(v, w) {
	return new Vector2([
		v.n[0] + w.n[0],
		v.n[1] + w.n[1]
	]);
};

/**
 * Returns the difference of v and w (v-w)
 * @param {Vector2} v The minuend
 * @param {Vector2} w The subtrahend
 * @returns {Vector2}
 */
Vector2.subtract = function(v, w) {
	return new Vector2([
		v.n[0] - w.n[0],
		v.n[1] - w.n[1]
	]);
};

/**
 * Returns the scalar product of v and n (v*n)
 * @param {Vector2} v The vector
 * @param {Float}   n The scalar
 * @returns {Vector2}
 */
Vector2.multiplyScalar = function(v, n) {
	return new Vector2([
		v.n[0] * n,
		v.n[1] * n
	]);
};


/**
 * Returns the outer product of v and w (v cross w)
 * @param {Vector2} v The first vector
 * @param {Vector2} w The second vector
 * @returns {Float}
 */
Vector2.cross = function(v, w) {
	return v.n[0] * w.n[1] - v.n[1] * w.n[0];
};


/**
 * Returns the inner product of v and w (v dot w)
 * @param {Vector2} v The first vector
 * @param {Vector2} w The second vector
 * @returns {Float}
 */
Vector2.dot = function(v, w) {
	return v.n[0] * w.n[0] + v.n[1] * w.n[1];
};

/**
 * Returns the transformation of v (m*v)
 * @param {Matrix2} m The transform
 * @param {Vector2} v The vector
 * @returns {Vector2}
 */
Vector2.multiplyMatrix2 = function(m, v) {
	var res = new Vector2();
	res.multiplyMatrix2(m, v);
	return res;
};

/**
 * Returns the 2x3 transformation of v (m*v)
 * @param {Matrix3} m The transform
 * @param {Vector2} v The vector
 * @returns {Vector2}
 */
Vector2.multiply2x3Matrix3 = function(m, v) {
	var res = new Vector2();
	res.multiply2x3Matrix3(m, v);
	return res;
};

/**
 * Returns the transformation of v (m*v)
 * @param {Matrix3} m The transform
 * @param {Vector2} v The vector
 * @returns {Vector2}
 */
Vector2.multiplyMatrix3 = function(m, v) {
	var res = new Vector2();
	res.multiplyMatrix3(m, v);
	return res;
};


/**
 * Returns a copy of v
 * @param {Vector2} v The source
 * @returns {Vector2}
 */
Vector2.copy = function(v) {
	return new Vector2(v.n.slice(0, 2));
};


/**
 * Returns <code>true</code> if<code>v</code> and <code>w</code> are equal, <code>false</code> otherwise
 * @param {Vector2} v The protagonist
 * @param {Vector2} w The antagonist
 * @returns {Boolean}
 */
Vector2.isEQ = function(v, w) {
	var vn = v.n, wn = w.n;

	return vn[0] === wn[0] && vn[1] === wn[1];
};


/**
 * Returns a type-version string
 * @returns {String}
 */
Vector2.toString = function() {
	return "[Vector2-" + Vector2.VERSION + "]";
};