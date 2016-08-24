/**
 * Creates a new instance
 * @class Two component vector
 * @author Christoph Kettelhoit <ck@christoph-kettelhoit.de>
 * @param {Float[]} [n] Array representing the two components
 *	<p>Arrays of <em>length !== 2</em> will return the zero (0,0) vector.</p>
 * @returns {Vector2}
 * @license Licensed under the MIT License
 */
function Vector2(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor === Array && n.length === 2 ? n : [0.0, 0.0]);
}


/**
 * (Re)defines the instance
 * @param {Float[]} [n] Array representing the two components
 *	<p>Arrays of <em>length !== 2</em> will return the zero (0,0) vector.</p>
 * @returns {Vector2}
 */
Vector2.prototype.define = function(n) {
	Vector2.call(this, n);
	
	return this;
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
 * @readonly
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
 * The square of the norm (norm*norm)
 * @readonly
 * @name normSquared
 * @memberOf Vector2#
 * @type {Float}
 */
Object.defineProperty(Vector2.prototype, 'normSquared', {
	get: function() {
		var x = this.n[0], y = this.n[1];
		
		return x * x + y * y;
	},
	configurable: true,
	enumerable: true
});


/**
 * The sum of v and w (v+w)
 * @param {Vector2} v The first summand
 * @param {Vector2} w The second summand
 * @returns {Vector2}
 */
Vector2.prototype.add = function(v, w) {
	this.n[0] = v.n[0] + w.n[0];
	this.n[1] = v.n[1] + w.n[1];
	
	return this;
};

/**
 * The difference of v and w (v-w)
 * @param {Vector2} v The minuend
 * @param {Vector2} w The subtrahend
 * @returns {Vector2}
 */
Vector2.prototype.subtract = function(v, w) {
	this.n[0] = v.n[0] - w.n[0];
	this.n[1] = v.n[1] - w.n[1];
	
	return this;
};

/**
 * The scalar product of v and n (v*n)
 * @param {Vector2} v The vector
 * @param {Float}   n The scalar
 * @returns {Vector2}
 */
Vector2.prototype.multiplyScalar = function(v, n) {
	this.n[0] = v.n[0] * n;
	this.n[1] = v.n[1] * n;
	
	return this;
};

/**
 * The transformation of v (m*v)
 * @param {Matrix2} m The transform
 * @param {Vector2} v The vector
 * @returns {Vector2}
 */
Vector2.prototype.multiplyMatrix2 = function(m, v) {
	var mn = m.n, x = v.n[0], y = v.n[1];

	this.n[0] = x * mn[0] + y * mn[2];
	this.n[1] = x * mn[1] + y * mn[3];
	
	return this;
};

/**
 * The 2x3 transformation of v (m*v)
 * @param {Matrix3} m The transform
 * @param {Vector2} v The vector
 * @returns {Vector2}
 */
Vector2.prototype.multiply2x3Matrix3 = function(m, v) {
	var mn = m.n, x = v.n[0], y = v.n[1];

	this.n[0] = x * mn[0] + y * mn[3] + mn[6];
	this.n[1] = x * mn[1] + y * mn[4] + mn[7];
	
	return this;
};

/**
 * The transformation of v (m*v)
 * @param {Matrix3} m The transform
 * @param {Vector2} v The vector
 * @returns {Vector2}
 */
Vector2.prototype.multiplyMatrix3 = function(m, v) {
	var mn = m.n, x = v.n[0], y = v.n[1];
	var w = 1.0 / (x * mn[2] + y * mn[5] + mn[8]);

	this.n[0] = (x * mn[0] + y * mn[3] + mn[6]) * w;
	this.n[1] = (x * mn[1] + y * mn[4] + mn[7]) * w;
	
	return this;
};

/**
 * The orthogonal projection of w on v
 * @param {Vector2} v The projection vector
 * @param {Vector2} w The projected vector
 * @returns {Vector2}
 */
Vector2.prototype.project = function(v, w) {
	var vx = v.n[0], vy = v.n[1];
	
	var n = (vx * w.n[0] + vy * w.n[1]) / (vx * vx + vy * vy);
	
	this.n[0] = vx * n, this.n[1] = vy * n;
	
	return this;
};


/**
 * The componentwise minimum of v and w (min(v,w))
 * @param {Vector2} v The first vector
 * @param {Vector2} w The second vector
 * @returns {Vector2}
 */	
Vector2.prototype.minXY = function(v, w) {
	var vn = v.n, wn = w.n;

	this.n[0] = vn[0] < wn[0] ? vn[0] : wn[0];
	this.n[1] = vn[1] < wn[1] ? vn[1] : wn[1];
	
	return this;
};

/**
 * The componentwise maximum of v and w (max(v,w))
 * @param {Vector2} v The first vector
 * @param {Vector2} w The second vector
 * @returns {Vector2}
 */	
Vector2.prototype.maxXY = function(v, w) {
	var vn = v.n, wn = w.n;

	this.n[0] = vn[0] > wn[0] ? vn[0] : wn[0];
	this.n[1] = vn[1] > wn[1] ? vn[1] : wn[1];
	
	return this;
};


/**
 * The sum of the instance and w (v+w)
 * @param {Vector2} w The second summand
 * @returns {Vector2}
 */
Vector2.prototype.addEQ = function(w) {
	this.n[0] += w.n[0];
	this.n[1] += w.n[1];
	
	return this;
};

/**
 * The difference of the instance and w (v-w)
 * @param {Vector2} w The subtrahend
 * @returns {Vector2}
 */
Vector2.prototype.subtractEQ = function(w) {
	this.n[0] -= w.n[0];
	this.n[1] -= w.n[1];
	
	return this;
};

/**
 * The scalar product of the instance and n (v*n)
 * @param {Float} n The scalar
 * @returns {Vector2}
 */
Vector2.prototype.multiplyScalarEQ = function(n) {
	this.n[0] *= n;
	this.n[1] *= n;
	
	return this;
};

/**
 * The orthogonal projection of w on the instance
 * @param {Vector2} w The projected vector
 * @returns {Vector2}
 */
Vector2.prototype.projectEQ = function(w) {
	var n = this.n, x = n[0], y = n[1];
	
	var f = (x * w.n[0] + y * w.n[1]) / (x * x + y * y);
	
	n[0] *= f, n[1] *= f;
	
	return this;
};


/**
 * The normal form of v
 * @param {Vector2} v The source
 * @returns {Vector2}
 */
Vector2.prototype.normalizationOf = function(v) {
	var n = this.n, vn = v.n, vx = vn[0], vy = vn[1];
	var norm = vx * vx + vy * vy;
	
	if (norm !== 0.0 && norm !== 1.0) norm = 1.0 / Math.sqrt(norm);
	
	n[0] = vx * norm, n[1] = vy * norm;
	
	return this;
};

/**
 * The copy of v
 * @param {Vector2} v The source
 * @returns {Vector2}
 */
Vector2.prototype.copyOf = function(v) {
	this.n = v.n.slice(0, 2);
	
	return this;
};


/**
 * The normal form of the instance
 * @returns {Vector2}
 */
Vector2.prototype.normalize = function() {
	var n = this.n, x = n[0], y = n[1];
	var norm = x * x + y * y;
	
	if (norm === 0.0 || norm === 1.0) return this;

	norm = 1.0 / Math.sqrt(norm);
	n[0] *= norm, n[1] *= norm;
	
	return this;
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
Object.defineProperty(Vector2, 'VERSION', { value: "0.9.13" });


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
	
	if (target === undefined) target = new Vector2(n);
	else target.n = n;
	
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
	
	if (target === undefined) target = new Vector2(n);
	else target.n = n;
	
	return target;
};


/**
 * Returns the sum of v and w (v+w)
 * @param {Vector2}  v       The first summand
 * @param {Vector2}  w       The second summand
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.Add = function(v, w, target) {
	return (target === undefined ? new Vector2() : target).add(v, w);
};

/**
 * Returns the difference of v and w (v-w)
 * @param {Vector2}  v       The minuend
 * @param {Vector2}  w       The subtrahend
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.Subtract = function(v, w, target) {
	return (target === undefined ? new Vector2() : target).subtract(v, w);
};

/**
 * Returns the scalar product of v and n (v*n)
 * @param {Vector2}  v       The vector
 * @param {Float}    n       The scalar
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.MultiplyScalar = function(v, n, target) {
	return (target === undefined ? new Vector2() : target).multiplyScalar(v, n);
};


/**
 * Returns the transformation of v (m*v)
 * @param {Matrix2}  m       The transform
 * @param {Vector2}  v       The vector
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.MultiplyMatrix2 = function(m, v, target) {
	return (target === undefined ? new Vector2() : target).multiplyMatrix2(m, v);
};

/**
 * Returns the 2x3 transformation of v (m*v)
 * @param {Matrix3}  m       The transform
 * @param {Vector2}  v       The vector
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.Multiply2x3Matrix3 = function(m, v, target) {
	return (target === undefined ? new Vector2() : target).multiply2x3Matrix3(m, v);
};

/**
 * Returns the transformation of v (m*v)
 * @param {Matrix3}  m       The transform
 * @param {Vector2}  v       The vector
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.MultiplyMatrix3 = function(m, v, target) {
	return (target === undefined ? new Vector2() : target).multiplyMatrix3(m, v);
};


/**
 * Returns the orthogonal projection of w on v
 * @param {Vector2}  v       The projection vector
 * @param {Vector2}  w       The projected vector
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.Project = function(v, w, target) {
	return (target === undefined ? new Vector2() : target).project(v, w);
};


/**
 * Returns a normal form of v
 * @param {Vector2}  v       The source
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.Normalize = function(v, target) {
	return (target === undefined ? new Vector2() : target).normalizationOf(v);
};

/**
 * Returns a copy of v
 * @param {Vector2} v The source
 * @param {Vector2} [target] The target instance
 * @returns {Vector2}
 */
Vector2.Copy = function(v, target) {
	return (target === undefined ? new Vector2() : target).copyOf(v);
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
 * Returns the angle in radians between v and w (acos(v dot w))
 * @param {Vector2} v The first vector
 * @param {Vector2} w The second vector
 * @returns {Float}
 */
Vector2.rad = function(v, w) {
	return Math.acos(v.n[0] * w.n[0] + v.n[1] * w.n[1]);
};


/**
 * Returns <code>true</code> if<code>v</code> and <code>w</code> are equal, <code>false</code> otherwise
 * @param {Vector2} v The protagonist
 * @param {Vector2} w The antagonist
 * @returns {Boolean}
 */
Vector2.isEQ = function(v, w) {
	var vn = v.n, wn = w.n;

	return v === w || vn[0] === wn[0] && vn[1] === wn[1];
};


/**
 * Returns a type-version string
 * @returns {String}
 */
Vector2.toString = function() {
	return "[Vector2-" + Vector2.VERSION + "]";
};