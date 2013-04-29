/**
 * Creates a new instance
 * @class Three component vector
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array representing the three components
 *	<p>Arrays of length <em>!== 3</em> will return the zero (0.0,0.0,0.0) vector.</p>
 * @returns {Vector3}
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
 */
function Vector3(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y, n[2]:z</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor === Array && n.length === 3 ? n : [0.0, 0.0, 0.0]);
}


Vector3.prototype = {};
/**
 * The constructor
 * @type Function
 */
Vector3.prototype.constructor = Vector3;


/**
 * (Re)define the instance
 * @param  {Float[]} [n] Array representing the three components
 *	<p>Arrays of length <em>!== 3</em> will return the zero (0.0,0.0,0.0) vector.</p>
 * @returns {undefined}
 */
Vector3.prototype.define = function(n) {
	Vector3.call(this, n);
};


/**
 * The x component, <code>{@link Vector3#n}[0]</code>
 * @name x
 * @memberOf Vector3#
 * @type Float
 */
Object.defineProperty(Vector3.prototype, 'x', {
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
 * The y component, <code>{@link Vector3#n}[1]</code>
 * @name y
 * @memberOf Vector3#
 * @type Float
 */
Object.defineProperty(Vector3.prototype, 'y', {
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
 * The z component, <code>{@link Vector3#n}[2]</code>
 * @name z
 * @memberOf Vector3#
 * @type Float
 */
Object.defineProperty(Vector3.prototype, 'z', {
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
 * The r component
 * <p>Alias of <code>{@link Vector3#x}</code>.</p>
 * @name r
 * @memberOf Vector3#
 * @type Float
 */
Object.defineProperty(Vector3.prototype, 'r', {
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
 * @memberOf Vector3#
 * @type Float
 */
Object.defineProperty(Vector3.prototype, 'g', {
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
 * @memberOf Vector3#
 * @type Float
 */
Object.defineProperty(Vector3.prototype, 'b', {
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
 * The norm
 * <p>[readonly]</p>
 * @name norm
 * @memberOf Vector3#
 * @type Float
 */
Object.defineProperty(Vector3.prototype, 'norm', {
	get : function() {
		var x = this.n[0], y = this.n[1], z = this.n[2];
		return Math.sqrt(x * x + y * y + z * z);
	},
	configurable : true,
	enumerable   : true
});

/**
 * The square of the norm (norm*norm)
 * <p>[readonly]</p>
 * @name normSquared
 * @memberOf Vector3#
 * @type Float
 */
Object.defineProperty(Vector3.prototype, 'normSquared', {
	get: function() {
		var x = this.n[0], y = this.n[1], z = this.n[2];
		return x * x + y * y + z * z;
	},
	configurable: true,
	enumerable: true
});


/**
 * The sum of v and w (v+w)
 * @param {Vector3} v The first summand
 * @param {Vector3} w The second summand
 * @returns {undefined}
 */
Vector3.prototype.add = function(v, w) {
	this.n[0] = v.n[0] + w.n[0];
	this.n[1] = v.n[1] + w.n[1];
	this.n[2] = v.n[2] + w.n[2];
};

/**
 * The difference of v and w (v-w)
 * @param {Vector3} v The minuend
 * @param {Vector3} w The subtrahend
 * @returns {undefined}
 */
Vector3.prototype.subtract = function(v, w) {
	this.n[0] = v.n[0] - w.n[0];
	this.n[1] = v.n[1] - w.n[1];
	this.n[2] = v.n[2] - w.n[2];
};

/**
 * The scalar product of v and n (v*n)
 * @param {Vector3} v The vector
 * @param {Float}   n The scalar
 * @returns {undefined}
 */
Vector3.prototype.multiplyScalar = function(v, n) {
	this.n[0] = v.n[0] * n;
	this.n[1] = v.n[1] * n;
	this.n[2] = v.n[2] * n;
};

/**
 * The exterior product of v and w (v cross w)
 * @param {Vector3} v The first vector
 * @param {Vector3} w The second vector
 * @returns {undefined}
 */
Vector3.prototype.cross = function(v, w) {
	this.n[0] = v.n[1] * w.n[2] - v.n[2] * w.n[1];
	this.n[1] = v.n[2] * w.n[0] - v.n[0] * w.n[2];
	this.n[2] = v.n[0] * w.n[1] - v.n[1] * w.n[0];
};

/**
 * The transformation of v (m*v)
 * @param {Matrix3} m The transform
 * @param {Vector3} v The source
 * @returns {undefined}
 */
Vector3.prototype.multiplyMatrix3 = function(m, v) {
	var n = this.n, mn = m.n, vn = v.n;
	var x = vn[0], y = vn[1], z = vn[2];

	n[0] = x * mn[0] + y * mn[3] + z * mn[6];
	n[1] = x * mn[1] + y * mn[4] + z * mn[7];
	n[2] = x * mn[2] + y * mn[5] + z * mn[8];
};

/**
 * The 3x4 transformation of v (m*v)
 * @param {Matrix4} m The transform
 * @param {Vector3} v The vector
 * @returns {undefined}
 */
Vector3.prototype.multiply3x4Matrix4 = function(m, v) {
	var x = v.n[0], y = v.n[1], z = v.n[2];

	this.n[0] = x * m.n[0] + y * m.n[4] + z * m.n[8]  + m.n[12];
	this.n[1] = x * m.n[1] + y * m.n[5] + z * m.n[9]  + m.n[13];
	this.n[2] = x * m.n[2] + y * m.n[6] + z * m.n[10] + m.n[14];
};

/**
 * The transformation of v (m*v)
 * @param {Matrix4} m The transform
 * @param {Vector3} v The vector
 * @returns {undefined}
 */
Vector3.prototype.multiplyMatrix4 = function(m, v) {
	var x = v.n[0], y = v.n[1], z = v.n[2];
	var w = 1.0 / (x * m.n[3] + y * m.n[7] + z * m.n[11] + m.n[15]);

	this.n[0] = (x * m.n[0] + y * m.n[4] + z * m.n[8]  + m.n[12]) * w;
	this.n[1] = (x * m.n[1] + y * m.n[5] + z * m.n[9]  + m.n[13]) * w;
	this.n[2] = (x * m.n[2] + y * m.n[6] + z * m.n[10] + m.n[14]) * w;
};


/**
 * The sum of the instance and w
 * @param {Vector3} w The second summand
 * @returns {undefined}
 */
Vector3.prototype.addEQ = function(w) {
	this.n[0] += w.n[0];
	this.n[1] += w.n[1];
	this.n[2] += w.n[2];
};

/**
 * The difference of the instance and w
 * @param {Vector3} w The subtrahend
 * @returns {undefined}
 */
Vector3.prototype.subtractEQ = function(w) {
	this.n[0] -= w.n[0];
	this.n[1] -= w.n[1];
	this.n[2] -= w.n[2];
};

/**
 * The scalar product of the instance and n
 * @param {Float} n the scalar
 * @returns {undefined}
 */
Vector3.prototype.multiplyScalarEQ = function(n) {
	this.n[0] *= n;
	this.n[1] *= n;
	this.n[2] *= n;
};


/**
 * The copy of v
 * @param {Vector3} v The source
 * @returns {undefined}
 */
Vector3.prototype.copyOf = function(v) {
	this.n = v.n.slice(0, 3);
};


/**
 * The normal form of the instance
 * @returns {undefined}
 */
Vector3.prototype.normalize = function() {
	var x = this.n[0], y  = this.n[1], z = this.n[2];
	var norm = Math.sqrt(x * x + y * y + z * z);

	if (norm === 0.0 || norm === 1.0) return;

	norm = 1.0 / norm;
	this.n[0] *= norm, this.n[1] *= norm, this.n[2] *= norm;
};

/**
 * The orthonormalization of the instance against v
 * <p>Gram-Schmidt-Normalization: t -= n * (t dot n).</p>
 * @param {Vector3} v The antagonist
 * @returns {undefined}
 */
Vector3.prototype.orthoNormalizeEQ = function(v) {
	var x = v.n[0], y = v.n[1], z = v.n[2];
	var dot = this.n[0] * x + this.n[1] * y + this.n[2] * z;
	this.n[0] -= x * dot;
	this.n[1] -= y * dot;
	this.n[2] -= z * dot;
};


/**
 * Returns a string representation of the instance
 * @param {Uint} [digits=3] The decimal digits
 * @returns {String}
 */
Vector3.prototype.toString = function(digits) {
	if (digits === undefined) digits = 3;

	return this.constructor + "(" + 
		this.n[0].toFixed(digits) + " " +
		this.n[1].toFixed(digits) + " " +
		this.n[2].toFixed(digits) + ")";
};

/**
 * Returns the <code>{@link Vector3#norm}</code> of the instance
 * @returns {Float}
 */
Vector3.prototype.valueOf = function() {
	return this.norm;
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Vector3
 * @type String
 */
Object.defineProperty(Vector3, 'VERSION', { value : "0.9.14" });


/**
 * Returns a representation of the x-axis vector (1.0,0.0,0.0)
 * @returns {Vector3}
 */
Vector3.X = function() {
	return new Vector3([1.0, 0.0, 0.0]);
};

/**
 * Returns a representation of the y-axis vector (0.0,1.0,0.0)
 * @returns {Vector3}
 */
Vector3.Y = function() {
	return new Vector3([0.0, 1.0, 0.0]);
};

/**
 * Returns a representation of the z-axis vector (0.0,0.0,1.0)
 * @returns {Vector3}
 */
Vector3.Z = function() {
	return new Vector3([0.0, 0.0, 1.0]);
};


/**
 * Returns the resulting instance of <em>cw</em> triangle (v0,v1,v2) and barycentric coordinates (u,v)
 * @param {Vector3}  v0      The first corner
 * @param {Vector3}  v1      The second corner
 * @param {Vector3}  v2      The third corner
 * @param {Float}    u       The u-coordinate
 * @param {Float}    v       The v-coordinate
 * @param {Vector3} [target] The target instance
 * @returns {Vector3}
 */
Vector3.BarycentricUV = function(v0, v1, v2, u, v, target) {
	var n = [
		v0.n[0] + (v1.n[0] - v0.n[0]) * u + (v2.n[0] - v0.n[0]) * v,
		v0.n[1] + (v1.n[1] - v0.n[1]) * u + (v2.n[1] - v0.n[1]) * v,
		v0.n[2] + (v1.n[2] - v0.n[2]) * u + (v2.n[2] - v0.n[2]) * v
	];
	
	if (target !== undefined) target.n = n;
	else target = new Vector3(n);
	
	return target;
};


/**
 * Returns the sum of v and w (v+w)
 * @param {Vector3} v The first summand
 * @param {Vector3} w The second summand
 * @returns {Vector3}
 */
Vector3.add = function(v, w) {
	return new Vector3([
		v.n[0] + w.n[0],
		v.n[1] + w.n[1],
		v.n[2] + w.n[2]
	]);
};

/**
 * Returns the difference between v and w (v-w)
 * @param {Vector3} v The minuend
 * @param {Vector3} w The subtrahend
 * @returns {Vector3}
 */
Vector3.subtract = function(v, w) {
	return new Vector3([
		v.n[0] - w.n[0],
		v.n[1] - w.n[1],
		v.n[2] - w.n[2]
	]);
};

/**
 * Returns the scalar product of v and n (v*n)
 * @param {Vector3} v The vector
 * @param {Float}   n The scalar
 * @returns {Vector3}
 */
Vector3.multiplyScalar = function(v, n) {
	return new Vector3([
		v.n[0] * n,
		v.n[1] * n,
		v.n[2] * n
	]);
};

/**
 * Returns the exterior product of v and w (v cross w)
 * @param {Vector3} v The first vector
 * @param {Vector3} w The second vector
 * @returns {Vector3}
 */
Vector3.cross = function(v, w) {
	return new Vector3([
		v.n[1] * w.n[2] - v.n[2] * w.n[1],
		v.n[2] * w.n[0] - v.n[0] * w.n[2],
		v.n[0] * w.n[1] - v.n[1] * w.n[0]
	]);
};

/**
 * Returns the inner product of v and w (v dot w)
 * @param {Vector3} v The first vector
 * @param {Vector3} w The second vector
 * @returns {Float}
 */
Vector3.dot = function(v, w) {
	return v.n[0] * w.n[0] + v.n[1] * w.n[1] + v.n[2] * w.n[2];
};

/**
 * Returns the transformation of v (m*v)
 * @param {Matrix3} m The transform
 * @param {Vector3} v The source
 * @returns {Vector3}
 */
Vector3.multiplyMatrix3 = function(m, v) {
	var res = new Vector3();
	res.multiplyMatrix3(m, v);
	return res;
};

/**
 * Returns the 3x4 transformation of v (m*v)
 * @param {Matrix4} m The transform
 * @param {Vector3} v The vector
 * @returns {Vector3}
 */
Vector3.multiply3x4Matrix4 = function(m, v) {
	var res = new Vector3();
	res.multiply3x4Matrix4(m, v);
	return res;
};

/**
 * Returns the transformation of v (m*v)
 * @param {Matrix4} m The transform
 * @param {Vector3} v The vector
 * @returns {Vector3}
 */
Vector3.multiplyMatrix4 = function(m, v) {
	var res = new Vector3();
	res.multiplyMatrix4x4(m, v);
	return res;
};


/**
 * Returns a copy of v
 * @param {Vector3} v The source
 * @returns {Vector3}
 */
Vector3.copy = function(v) {
	return new Vector3(v.n.slice(0, 3));
};


/**
 * Returns <code>true</code> if <code>v</code> and <code>w</code> are equal, <code>false</code> otherwise (u==v)
 * @param {Vector3} v The protagonist
 * @param {Vector3} w The antagonist
 * @returns {Boolean}
 */
Vector3.isEQ = function(v, w) {
	var vn = v.n, wn = w.n;
	
	return vn[0] === wn[0] && vn[1] === wn[1] && vn[2] === wn[2];
};

/**
 * Returns <code>true</code> if the norm of <code>v</code> is less than <code>n</code>, <code>false</code> otherwise (v.norm&lt;n)
 * @param {Vector3} v The protagonist
 * @param {Float}   n The antagonist
 * @returns {Boolean}
 */
Vector3.isNormLT = function(v, n) {
	return v.normSquared < n * n;
};

/**
 * Returns <code>true</code> if the norm of <code>v</code> is greater than <code>n</code>, <code>false</code> otherwise (v.norm>n)
 * @param {Vector3} v The protagonist
 * @param {Float}   n The antagonist
 * @returns {Boolean}
 */
Vector3.isNormGT = function(v, n) {
	return v.normSquared > n * n;
};

/**
 * Returns <code>true</code> if the norm of <code>v</code> and <code>n</code> are equal, <code>false</code> otherwise (v.norm===n)
 * @param {Vector3} v The protagonist
 * @param {Float}  n The antagonist
 * @returns {Boolean}
 */
Vector3.isNormEQ = function(v, n) {
	return v.normSquared === n * n;
};


/**
 * Returns a type-version string
 * @return {String}
 */
Vector3.toString = function() {
	return "[Vector3-" + Vector3.VERSION + "]";
};