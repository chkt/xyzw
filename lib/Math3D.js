/**
 * Vector2
 * @class Two component vector
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array containing the two components
 *	<p>Arrays of length != 2 will return the zero vector.</p>
 */
function Vector2(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor == Array && n.length == 2 ? n : [0.0, 0.0]);
}

Vector2.prototype = {
	
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Vector2,
	
	
	/**
	 * (Re)defines the instance
	 * @param  {Float[]} [n] Array containing the two components
	 *	<p>Array of length != 2 will return the zero vector.</p>
	 * @return {void}
	 */
	define : function(n) {
		Vector2.call(this, n);
	},


	/**
	 * The x component, n[0]
	 * @see Vector2#n
	 * @name x
	 * @memberOf Vector2#
	 * @type Float
	 */
	get x()  {return this.n[0];},
	set x(n) {this.n[0] = n;},
	
	/**
	 * The y component, n[1]
	 * @see Vector2#n
	 * @name y
	 * @memberOf Vector2#
	 * @type Float
	 */
	get y()  {return this.n[1];},
	set y(n) {this.n[1] = n;},
	
	/**
	 * The s component
	 * <p>Alias of Vector2.prototype.x.</p>
	 * @see Vector2#x
	 * @name s
	 * @memberOf Vector2#
	 * @type Float
	 */
	get s()  {return this.n[0];},
	set s(n) {this.n[0] = n;},
	
	/**
	 * The t component
	 * <p>Alias of Vector2.prototype.y</p>
	 * @see Vector2#y
	 * @name t
	 * @memberOf Vector2#
	 * @type Float
	 */
	get t()  {return this.n[1];},
	set t(n) {this.n[1] = n;},

	
	/**
	 * The norm
	 * <p>[readonly]</p>
	 * @name norm
	 * @memberOf Vector2#
	 * @type {Float}
	 */
	get norm() {
		var x = this.n[0], y = this.n[1];
		return Math.sqrt(x * x + y * y);
	},
	
	
	/**
	 * The sum of v and w (v+w)
	 * @param  {Vector2} v The first summand
	 * @param  {Vector2} w The second summand
	 * @return {void}
	 */
	add : function(v, w) {
		this.n[0] = v.n[0] + w.n[0];
		this.n[1] = v.n[1] + w.n[1];
	},
	
	/**
	 * The difference of v and w (v-w)
	 * @param  {Vector2} v The minuend
	 * @param  {Vector2} w The subtrahend
	 * @return {void}
	 */
	subtract : function(v, w) {
		this.n[0] = v.n[0] - w.n[0];
		this.n[1] = v.n[1] - w.n[1];
	},
	
	/**
	 * The scalar product of v and n (v*n)
	 * @param  {Vector2} v The vector
	 * @param  {Float}   n The scalar
	 * @return {void}
	 */
	multiplyScalar : function(v, n) {
		this.n[0] = v.n[0] * n;
		this.n[1] = v.n[1] * n;
	},
	
	
	/**
	 * The copy of v
	 * @param  {Vector2} v The source
	 * @return {void}
	 */
	copyOf : function(v) {
		this.n = v.n.slice(0, 2);
	},
	
	
	/**
	 * The normal form of the instance
	 * @return {void}
	 */
	normalize : function() {
		var x = this.n[0], y = this.n[1];
		var norm = 1.0 / Math.sqrt(x * x + y * y);
		this.n[0] *= norm; this.n[1] *= norm;
	},
	
	
	/**
	 * Returns a string representation of the instance
	 * @return {String}
	 */
	toString : function() {
		return this.constructor + "(" + this.n[0] + "\t" + this.n[1] + ")";
	}
};


/**
 * Returns the resulting vector of triangle (v0,v1,v2) and barycentric coordinates (u,v)
 * @static
 * @param  {Vector2} v0 The first corner
 * @param  {Vector2} v1 The second corner
 * @param  {Vector2} v2 The third corner
 * @param  {Float}   u  The u-coordinate
 * @param  {Float}   v  The v-coordinate
 * @return {Vector2}
 */
Vector2.BarycentricUV = function(v0, v1, v2, u, v) {
	var res = new Vector2();
	res.n[0] = v0.n[0] + (v1.n[0] - v0.n[0]) * u + (v2.n[0] - v0.n[0]) * v;
	res.n[1] = v0.n[1] + (v1.n[1] - v0.n[1]) * u + (v2.n[1] - v0.n[1]) * v;
	return res;
};


/**
 * Returns the sum of v and w (v+w)
 * @static
 * @param  {Vector2} v The first summand
 * @param  {Vector2} w The second summand
 * @return {Vector2}
 */
Vector2.add = function(v, w) {
	return new Vector2([
		v.n[0] + w.n[0],
		v.n[1] + w.n[1]
	]);
};

/**
 * Returns the difference of v and w (v-w)
 * @static
 * @param  {Vector2} v The minuend
 * @param  {Vector2} w The subtrahend
 * @return {Vector2}
 */
Vector2.subtract = function(v, w) {
	return new Vector2([
		v.n[0] - w.n[0],
		v.n[1] - w.n[1]
	]);
};

/**
 * Returns the scalar product of v and n (v*n)
 * @static
 * @param  {Vector2} v The vector
 * @param  {Vector2} n The scalar
 * @return {Vector2}
 */
Vector2.multiplyScalar = function(v, n) {
	return new Vector2([
		v.n[0] * n,
		v.n[1] * n
	]);
};


/**
 * Creates a copy of v
 * @static
 * @param  {Vector2} v The source
 * @return {Vector2}
 */
Vector2.copy = function(v) {
	return new Vector2(v.n.slice(0, 2));
};


/**
 * Tests v and w for equality
 * @param  {Vector2} v The first vector
 * @param  {Vector2} w The second vector
 * @return {Boolean}
 */
Vector2.isEQ = function(v, w) {
	if (v.n[0] != w.n[0] || v.n[1] != w.n[1]) return false;
	return true;
};


/**
 * Returns the type-version string
 * @static
 * @return {String}
 */
Vector2.toString = function() {return "[Vector2-" + Vector2.version + "]";};

/**
 * The version string
 * @constant
 * @static
 * @type String
 */
Vector2.version = "0.9.4";




/**
 * Vector3
 * @class Three component vector
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array containing the three components
 *	<p>Arrays of length != 3 will return the zero vector.</p>
 */
function Vector3(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y, n[2]:z</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor == Array && n.length == 3 ? n : [0.0, 0.0, 0.0]);
}

Vector3.prototype = {
		
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Vector3,
	
	
	/**
	 * (Re)define the instance
	 * @param  {Float[]} [n] Array containing the three components
	 *	<p>Arrays of length != 3 will result in the zero vector.</p>
	 * @return {void}
	 */
	define : function(n) {
		Vector3.call(this, n);
	},


	/**
	 * The x component, n[0]
	 * @see Vector3#n
	 * @name x
	 * @memberOf Vector3#
	 * @type Float
	 */
	get x()  {return this.n[0];},
	set x(n) {this.n[0] = n;},
	
	/**
	 * The y component, n[1]
	 * @see Vector3#n
	 * @name y
	 * @memberOf Vector3#
	 * @type Float
	 */
	get y()  {return this.n[1];},
	set y(n) {this.n[1] = n;},
	
	/**
	 * The z component, n[2]
	 * @see Vector3#n
	 * @name z
	 * @memberOf Vector3#
	 * @type Float
	 */
	get z()  {return this.n[2];},
	set z(n) {this.n[2] = n;},
	
	/**
	 * The r component
	 * <p>Alias of Vector3.prototype.x.</p>
	 * @see Vector3#x
	 * @name r
	 * @memberOf Vector3#
	 * @type Float
	 */
	get r()  {return this.n[0];},
	set r(n) {this.n[0] = n;},
	
	/**
	 * The g component
	 * <p>Alias of Vector3.prototype.y.</p>
	 * @see Vector3#y
	 * @name g
	 * @memberOf Vector3#
	 * @type Float
	 */
	get g()  {return this.n[1];},
	set g(n) {this.n[1] = n;},
	
	/**
	 * The b component
	 * <p>Alias of Vector3.prototype.z.</p>
	 * @see Vector3#z
	 * @name b
	 * @memberOf Vector3#
	 * @type Float
	 */
	get b()  {return this.n[2];},
	set b(n) {this.n[2] = n;},
	
	
	/**
	 * The norm
	 * <p>[readonly]</p>
	 * @name norm
	 * @memberOf Vector3#
	 * @type Float
	 */
	get norm() {
		var x = this.n[0], y = this.n[1], z = this.n[2];
		return Math.sqrt(x * x + y * y + z * z);
	},
	
	/**
	 * The square of the norm (norm*norm)
	 * <p>[readonly]</p>
	 * @name normSquared
	 * @memberOf Vector3#
	 * @type Float
	 */
	get normSquared() {
		var x = this.n[0], y = this.n[1], z = this.n[2];
		return x * x + y * y + z * z;
	},
	
	
	/**
	 * The sum of v and w (v+w)
	 * @param  {Vector3} v The first summand
	 * @param  {Vector3} w The second summand
	 * @return {void}
	 */
	add : function(v, w) {
		this.n[0] = v.n[0] + w.n[0];
		this.n[1] = v.n[1] + w.n[1];
		this.n[2] = v.n[2] + w.n[2];
	},
	
	/**
	 * The difference of v and w (v-w)
	 * @param  {Vector3} v The minuend
	 * @param  {Vector3} w The subtrahend
	 * @return {void}
	 */
	subtract : function(v, w) {
		this.n[0] = v.n[0] - w.n[0];
		this.n[1] = v.n[1] - w.n[1];
		this.n[2] = v.n[2] - w.n[2];
	},
	
	/**
	 * The scalar product of v and n (v*n)
	 * @param  {Vector3} v The vector
	 * @param  {Float}   n The scalar
	 * @return {void}
	 */
	multiplyScalar : function(v, n) {
		this.n[0] = v.n[0] * n;
		this.n[1] = v.n[1] * n;
		this.n[2] = v.n[2] * n;
	},
	
	/**
	 * The exterior product of v and w (v cross w)
	 * @param  {Vector3} v The first vector
	 * @param  {Vector3} w The second vector
	 * @return {void}
	 */
	cross : function(v, w) {
		this.n[0] = v.n[1] * w.n[2] - v.n[2] * w.n[1];
		this.n[1] = v.n[2] * w.n[0] - v.n[0] * w.n[2];
		this.n[2] = v.n[0] * w.n[1] - v.n[1] * w.n[0];
	},
	
	/**
	 * The transformation of v (m*v)
	 * @param  {Matrix3} m The transform
	 * @param  {Vector3} v The source
	 * @return {Vector3}
	 */
	multiplyMatrix3 : function(m, v) {
		var n = this.n, mn = m.n, vn = v.n;
		var x = vn[0], y = vn[1], z = vn[2];
		
		n[0] = x * mn[0] + y * mn[3] + z * mn[6];
		n[1] = x * mn[1] + y * mn[4] + z * mn[7];
		n[2] = x * mn[2] + y * mn[5] + z * mn[8];
	},
	
	/**
	 * The 3x4 transformation of v (m*v)
	 * @param  {Matrix4} m The transform
	 * @param  {Vector3} v The vector
	 * @return {void}
	 */
	multiply3x4Matrix4 : function(m, v) {
		var x = v.n[0];
		var y = v.n[1];
		var z = v.n[2];
		
		this.n[0] = x * m.n[0] + y * m.n[4] + z * m.n[8]  + m.n[12];
		this.n[1] = x * m.n[1] + y * m.n[5] + z * m.n[9]  + m.n[13];
		this.n[2] = x * m.n[2] + y * m.n[6] + z * m.n[10] + m.n[14];
	},
	
	/**
	 * The transformation of v (m*v)
	 * @param  {Matrix4} m The transform
	 * @param  {Vector3} v The vector
	 * @return {void}
	 */
	multiplyMatrix4 : function(m, v) {
		var x = v.n[0];
		var y = v.n[1];
		var z = v.n[2];
		var w = 1.0 / (x * m.n[3] + y * m.n[7] + z * m.n[11] + m.n[15]);
		
		this.n[0] = (x * m.n[0] + y * m.n[4] + z * m.n[8]  + m.n[12]) * w;
		this.n[1] = (x * m.n[1] + y * m.n[5] + z * m.n[9]  + m.n[13]) * w;
		this.n[2] = (x * m.n[2] + y * m.n[6] + z * m.n[10] + m.n[14]) * w;
	},

	
	/**
	 * The sum of the instance and w
	 * @param  {Vector3} w The second summand
	 * @return {void}
	 */
	addEQ : function(w) {
		this.n[0] += w.n[0];
		this.n[1] += w.n[1];
		this.n[2] += w.n[2];
	},
	
	/**
	 * The difference of the instance and w
	 * @param  {Vector3} w The subtrahend
	 * @return {void}
	 */
	subtractEQ : function(w) {
		this.n[0] -= w.n[0];
		this.n[1] -= w.n[1];
		this.n[2] -= w.n[2];
	},
	
	/**
	 * The scalar product of the instance and n
	 * @param  {Float} n the scalar
	 * @return {void}
	 */
	multiplyScalarEQ : function(n) {
		this.n[0] *= n;
		this.n[1] *= n;
		this.n[2] *= n;
	},

	
	/**
	 * The copy of v
	 * @param  {Vector3} v The source
	 * @return {void}
	 */
	copyOf : function(v) {this.n = v.n.slice(0, 3);},
	
	
	/**
	 * The normal form of the instance
	 * @return {void}
	 */
	normalize : function() {
		var x = this.n[0], y  = this.n[1], z = this.n[2];
		var norm = Math.sqrt(x * x + y * y + z * z);

		if (norm == 0.0 || norm == 1.0) return;

		norm = 1.0 / norm;
		this.n[0] *= norm; this.n[1] *= norm; this.n[2] *= norm;
	},


	/**
	 * The orthonormalization of the instance against v
	 * <p>Gram-Schmidt-Normalization: t -= n * (t dot n).</p>
	 * @param  {Vector3} v The vector to orthonormalize against
	 * @return {void}
	 */
	orthoNormalizeEQ : function(v) {
		var x = v.n[0], y = v.n[1], z = v.n[2];
		var dot = this.n[0] * x + this.n[1] * y + this.n[2] * z;
		this.n[0] -= x * dot;
		this.n[1] -= y * dot;
		this.n[2] -= z * dot;
	},
	
	
	/**
	 * Tests if norm is less than n (norm&lt;n)
	 * @param  {Float}   n The scalar to test against
	 * @return {Boolean}   True if norm is less than n, false otherwise
	 */
	isNormLT : function(n) {return this.normSquared < n * n;},

	/**
	 * Tests if norm is more than n (norm&gt;n)
	 * @param  {Float}   n The scalar to test against
	 * @return {Boolean}   True if norm is more than n, false otherwise
	 */
	isNormGT : function(n) {return this.normSquared > n * n;},

	/**
	 * Tests if norm equals n (norm==n)
	 * @param  {Float}   n The scalar to test against
	 * @return {Boolean}   True if norm equals n, false otherwise
	 */
	isNormEQ : function(n) {return this.normSquared == n * n;},


	/**
	 * Returns the string representation of the instance
	 * @return {String}
	 */
	toString : function() {
		return this.constructor + "(" + this.n[0] + "\t" + this.n[1] + "\t" + this.n[2] + ")";
	}
};


/**
 * A instance of the zero vector (0.0, 0.0, 0.0)
 * <p>[readonly]</p>
 * @static
 * @name ZERO
 * @memberOf Vector3
 * @type Vector3
 */
Object.defineProperty(Vector3, 'ZERO', {
	get : function() {return new Vector3();},
	enumerable : true,
	configurable : true
});

/**
 * A instance of the x-axis vector (1.0, 0.0, 0.0)
 * <p>[readonly]</p>
 * @static
 * @name X
 * @memberOf Vector3
 * @type Vector3
 */
Object.defineProperty(Vector3, 'X', {
	get : function() {return new Vector3([1.0, 0.0, 0.0]);},
	enumerable : true,
	configurable : true
});

/**
 * A instance of the y-axis vector (0.0, 1.0, 0.0)
 * <p>[readonly]</p>
 * @static
 * @name Y
 * @memberOf Vector3
 * @type Vector3
 */
Object.defineProperty(Vector3, 'Y', {
	get : function() {return new Vector3([0.0, 1.0, 0.0]);},
	enumerable : true,
	configurable : true
});

/**
 * A instance of the z-axis vector (0.0, 0.0, 1.0)
 * <p>[readonly]</p>
 * @static
 * @name Z
 * @memberOf Vector3
 * @type Vector3
 */
Object.defineProperty(Vector3, 'Z', {
	get : function() {return new Vector3([0.0, 0.0, 1.0]);},
	enumerable : true,
	configurable : true
});


/**
 * Returns the resulting vector of triangle (v0,v1,v2) and barycentric coordinates (u,v)
 * @static
 * @param  {Vector3} v0 The first corner
 * @param  {Vector3} v1 The second corner
 * @param  {Vector3} v2 The third corner
 * @param  {Float}   u  The u-coordinate
 * @param  {Float}   v  The v-coordinate
 * @return {Vector3}
 */
Vector3.BarycentricUV = function(v0, v1, v2, u, v) {
	var res = new Vector3();
	res.n[0] = v0.n[0] + (v1.n[0] - v0.n[0]) * u + (v2.n[0] - v0.n[0]) * v;
	res.n[1] = v0.n[1] + (v1.n[1] - v0.n[1]) * u + (v2.n[1] - v0.n[1]) * v;
	res.n[2] = v0.n[2] + (v1.n[2] - v0.n[2]) * u + (v2.n[2] - v0.n[2]) * v;
	return res;
};


/**
 * Returns the sum of v and w (v+w)
 * @static
 * @param  {Vector3} v The first summand
 * @param  {Vector3} w The second summand
 * @return {Vector3}
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
 * @static
 * @param  {Vector3} v The minuend
 * @param  {Vector3} w The subtrahend
 * @return {Vector3}
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
 * @static
 * @param  {Vector3} v The vector
 * @param  {Float}   n The scalar
 * @return {Vector3}
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
 * @static
 * @param  {Vector3} v The first vector
 * @param  {Vector3} w The second vector
 * @return {Vector3}
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
 * @static
 * @param  {Vector3} v The first vector
 * @param  {Vector3} w The second vector
 * @return {Float}
 */
Vector3.dot = function(v, w) {return v.n[0] * w.n[0] + v.n[1] * w.n[1] + v.n[2] * w.n[2];};

/**
 * Returns the transformation of v (m*v)
 * @static
 * @param  {Matrix3} m The transform
 * @param  {Vector3} v The source
 * @return {Vector3}
 */
Vector3.multiplyMatrix3 = function(m, v) {
	var res = new Vector3();
	res.multiplyMatrix3(m, v);
	return res;
}

/**
 * Returns the 3x4 transformation of v (m*v)
 * @static
 * @param  {Matrix4} m The transform
 * @param  {Vector3} v The vector
 * @return {Vector3}
 */
Vector3.multiply3x4Matrix4 = function(m, v) {
	var res = new Vector3();
	res.multiply3x4Matrix4(m, v);
	return res;
};

/**
 * Returns the transformation of v (m*v)
 * @static
 * @param  {Matrix4} m The transform
 * @param  {Vector3} v The vector
 * @return {Vector3}
 */
Vector3.multiplyMatrix4 = function(m, v) {
	var res = new Vector3();
	res.multiplyMatrix4x4(m, v);
	return res;
};


/**
 * Creates a copy of v
 * @param  {Vector3} v The source
 * @return {Vector3}
 */
Vector3.copy = function(v) {return new Vector3(v.n.slice(0, 3));};


/**
 * Tests v and w for equality
 * @param  {Vector3} v The first vector
 * @param  {Vector3} w The second vector
 * @return {Boolean}
 */
Vector3.isEQ = function(v, w) {
	if (v.n[0] != w.n[0] || v.n[1] != w.n[1] || v.n[2] != w.n[2]) return false;
	return true;
};


/**
 * Returns the type-version string
 * @static
 * @return {String}
 */
Vector3.toString = function() {return "[Vector3-" + Vector3.version + "]";};

/**
 * The version string
 * @constant
 * @static
 * @type String
 */
Vector3.version = "0.9.12";




/**
 * Vector4
 * @class Four component vector aka quaternion
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array containing the four components
 *	<p>Arrays of length != 4 will return the identity vector.</p>
 */
function Vector4(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y, n[2]:z, n[3]:w</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor == Array && n.length == 4 ? n : [0.0, 0.0, 0.0, 1.0]);
}

Vector4.prototype = {
	
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Vector4,
	
	
	/**
	 * (Re)defines the instance
	 * @param  {Float[]} [n] Array containing the four components
	 *	<p>Arrays of length != 4 will result in the identity vector.</p>
	 * @return {void}
	 */
	define : function(n) {
		Vector4.call(this, n);
	},
	
	
	/**
	 * The x component, n[0]
	 * @see Vector4#n
	 * @name x
	 * @memberOf Vector4#
	 * @type Float
	 */
	get x()  {return this.n[0];},
	set x(n) {this.n[0] = n;},
	
	/**
	 * The y component, n[1]
	 * @see Vector4#n
	 * @name y
	 * @memberOf Vector4#
	 * @type Float
	 */
	get y()  {return this.n[1];},
	set y(n) {this.n[1] = n;},
	
	/**
	 * The z component, n[2]
	 * @see Vector4#n
	 * @name z
	 * @memberOf Vector4#
	 * @type Float
	 */
	get z()  {return this.n[2];},
	set z(n) {this.n[2] = n;},
	
	/**
	 * The w component, n[3]
	 * @see Vector4#n
	 * @name w
	 * @memberOf Vector4#
	 * @type Float
	 */
	get w()  {return this.n[3];},
	set w(n) {this.n[3] = n;},
	
	/**
	 * The r component
	 * <p>Alias of Vector4.prototype.x.</p>
	 * @see Vector4#x
	 * @name r
	 * @memberOf Vector4#
	 * @type Float
	 */
	get r()  {return this.n[0];},
	set r(n) {this.n[0] = n;},
	
	/**
	 * The g component
	 * <p>Alias of Vector4.prototype.y</p>
	 * @see Vector4#y
	 * @name g
	 * @memberOf Vector4#
	 * @type Float
	 */
	get g()  {return this.n[1];},
	set g(n) {this.n[1] = n;},
	
	/**
	 * The b component
	 * <p>Alias of Vector4.prototype.z</p>
	 * @see Vector4#z
	 * @name b
	 * @memberOf Vector4#
	 * @type Float
	 */
	get b()  {return this.n[2];},
	set b(n) {this.n[2] = n;},
	
	/**
	 * The a component
	 * <p>Alias of Vector4.prototype.w</p>
	 * @see Vector4#w
	 * @name a
	 * @memberOf Vector4#
	 * @type Float
	 */
	get a()  {return this.n[3];},
	set a(n) {this.n[3] = n;},
	
	
	/**
	 * The norm of the instance
	 * <p>[readonly]</p>
	 * @name norm
	 * @memberOf Vector4#
	 * @type Float
	 */
	get norm () {
		var x = this.n[0], y = this.n[1], z = this.n[2], w = this.n[3];
		return Math.sqrt(x * x + y * y + z * z + w * w);
	},
	
	
	/**
	 * The sum of q and r (q+r)
	 * @param  {Vector4} q The first summand
	 * @param  {Vector4} r The second summand
	 * @return {void}
	 */
	add : function(q, r) {
		this.n[0] = q.n[0] + r.n[0];
		this.n[1] = q.n[1] + r.n[1];
		this.n[2] = q.n[2] + r.n[2];
		this.n[3] = q.n[3] + r.n[3];
	},
	
	/**
	 * The difference of q and r (q-r)
	 * @param  {Vector4} q The minuend
	 * @param  {Vector4} r The subtrahend
	 * @return {void}
	 */
	subtract : function(q, r) {
		this.n[0] = q.n[0] - r.n[0];
		this.n[1] = q.n[1] - r.n[1];
		this.n[2] = q.n[2] - r.n[2];
		this.n[3] = q.n[3] - r.n[3];
	},
	
	/**
	 * The scalar product of q and n (q*n)
	 * @param  {Vector4} q The vector
	 * @param  {Float}   n The scalar
	 * @return {void}
	 */
	multiplyScalar : function(q, n) {
		this.n[0] = q.n[0] * n;
		this.n[1] = q.n[1] * n;
		this.n[2] = q.n[2] * n;
		this.n[3] = q.n[3] * n;
	},
	
	/**
	 * The exterior product of q and r (q cross r)
	 * @param  {Vector4} q The first vector
	 * @param  {Vector4} r The second vector
	 * @return {void}
	 */
	multiply : function(q, r) {
		var qx = q.n[0], qy = q.n[1], qz = q.n[2], qw = q.n[3];
		var rx = r.n[0], ry = r.n[1], rz = r.n[2], rw = r.n[3];
		
		this.n[0] = qz * ry - qy * rz + qx * rw + qw * rx;
		this.n[1] = qx * rz - qz * rx + qy * rw + qw * ry;
		this.n[2] = qy * rx - qx * ry + qz * rw + qw * rz;
		this.n[3] = qw * rw - qx * rx - qy * ry - qz * rz;
	},
	
	
	/**
	 * The sum of the instance and q
	 * @param  {Vector4} q The second summand
	 * @return {void}
	 */
	addEQ : function(q) {
		this.n[0] += q.n[0];
		this.n[1] += q.n[1];
		this.n[2] += q.n[2];
		this.n[3] += q.n[3];
	},
	
	/**
	 * The difference of the instance and q
	 * @param  {Vector4} q The subtrahend
	 * @return {void}
	 */
	subtractEQ : function(q) {
		this.n[0] -= q.n[0];
		this.n[1] -= q.n[1];
		this.n[2] -= q.n[2];
		this.n[3] -= q.n[3];
	},
	
	/**
	 * The scalar product of the instance and n
	 * @param  {Float} n the scalar
	 * @return {void}
	 */
	multiplyScalarEQ : function(n) {
		this.n[0] *= n;
		this.n[1] *= n;
		this.n[2] *= n;
		this.n[3] *= n;
	},
	
	
	/**
	 * The conjugate of q
	 * @param  {Vector4} q The source
	 * @return {void}
	 */
	conjugateOf : function(q) {
		this.n[0] = -q.n[0] * -1.0;
		this.n[1] = -q.n[1] * -1.0;
		this.n[2] = -q.n[2] * -1.0;
		this.n[3] = q.n[3];
	},
	
	/**
	 * The inverse of q
	 * @param  {Vector4} q The source
	 * @return {void}
	 */
	inverseOf : function(q) {
		var x = q.n[0], y = q.n[1], z = q.n[2], w = q.n[3];
		var norm = 1.0 / (x * x + y * y + z * z + w * w);
		
		this.n[0] = x * -norm;
		this.n[1] = y * -norm;
		this.n[2] = z * -norm;
		this.n[3] = w *  norm;
	},

	/**
	 * The copy of q
	 * @param  {Vector4} q The source
	 * @return {void}
	 */
	copyOf : function(q) {this.n = q.n.slice(0, 4);},
	
	
	/**
	 * The normal form of the instance
	 * @return {void}
	 */
	normalize : function() {
		var x = this.n[0], y = this.n[1], z = this.n[2], w = this.n[3];
		var norm = 1.0 / Math.sqrt(x * x + y * y + z * z + w * w);
		this.n[0] *= norm; this.n[1] *= norm; this.n[2] *= norm;
	},
	
	/**
	 * The conjugate of the instance
	 * @return {void}
	 */
	conjugate : function() {
		var q = new Quaternion(this.n.slice(0, 4));
		this.conjugateOf(q);
	},
	
	/**
	 * The inverse of the instance
	 * @return {void}
	 */
	invert : function() {
		var q = new Quaternion(this.n.slice(0, 4));
		this.inverseOf(q);
	},
	
	
	/**
	 * Returns the string representation of the instance
	 * @return {String}
	 */
	toString : function() {
		return this.constructor + "(" + this.n[0] + "\t" + this.n[1] + "\t" + this.n[2] + "\t" + this.n[3] + ")";
	}
}



/**
 * A instance of the identity vector (0.0, 0.0, 0.0, 1.0)
 * <p>[readonly]</p>
 * @static
 * @name IDENTITY
 * @memberOf Vector4
 * @type Vector4
 */
Object.defineProperty(Vector4, 'IDENTITY', {
	get : function() {return new Vector4();},
	enumerable : true,
	configurable : true
});


/**
 * Creates a unit-quaternion instance from axis and rotation
 * @static
 * @param  {Vector3} axis The rotation axis
 * @param  {Float}   rad  The rotation in radians
 * @return {Vector4}
 */
Vector4.Rotation = function(axis, rad) {
	var sin = Math.sin(rad * 0.5);
	
	var res = new Vector4();
	res.n[0] = axis.n[0] * sin;
	res.n[1] = axis.n[1] * sin;
	res.n[2] = axis.n[2] * sin;
	res.n[3] = Math.cos(rad * 0.5);
	res.normalize();
	return res;
};

/**
 * Creates a unit-quaternion instance from Spherical Linear intERPolation
 * @static
 * @param  {Vector4} q The starting unit quaternion
 * @param  {Vector4} r The ending unit quaternion
 * @param  {Float}   t The interpolation factor
 * @return {Vector4}
 */
Vector4.SLERP = function(q, r, t) {
	var qx = q.n[0], qy = q.n[1], qz = q.n[2], qw = q.n[3];
	var rx = r.n[0], ry = r.n[1], rz = r.n[2], rw = r.n[3];
	
	var a = Math.acos(qx * rx + qy * ry + qz * rz + qw * rw);
	
	var sin = 1.0 / Math.sin(a);
	var sinQ = Math.sin(a * (1.0 - t));
	var sinR = Math.sin(a * t);
	
	var res = new Vector4();
	res.n[0] = sinQ * sin * q.n[0] + sinR * sin	* r.n[0];
	res.n[1] = sinQ * sin * q.n[1] + sinR * sin * r.n[1];
	res.n[2] = sinQ * sin * q.n[2] + sinR * sin * r.n[2];
	res.n[3] = sinQ * sin * q.n[3] + sinR * sin * r.n[3];
	return res;
};

/**
 * Creates a unit-quaternion instance from a rotation matrix
 * UPDATE
 * @static
 * @param  {Matrix4} m The source 3x3 transform
 * @return {Vector4}
 */
Vector4.Matrix4 = function(m) {
	var res = new Vector4();
	
	var s = m.n[0] + m.n[5] + m.n[10] + m.n[15];
	
	if (s > 0.0) {
		s = Math.sqrt(s);
		res.n[3] = 0.5 * s;		// 1/2 sqrt(trace)
		
		s = 0.5 / s;			// 1 / (4 * 1/2 sqrt(trace))
		res.n[0] = (m.n[6] - m.n[9]) * s;
		res.n[1] = (m.n[8] - m.n[2]) * s;
		res.n[2] = (m.n[1] - m.n[4]) * s;
		
		return res;
	}
	
	var a = m.n[0] > m.n[5]  ? 0 : 5;
	    a = m.n[a] > m.n[10] ? a : 10;
	
	switch (a) {
		case 0  :
			s = 0.5 / Math.sqrt(1.0 + m.n[0] - m.n[5] - m.n[10]);
			res.n[0] = 0.5 * s;
			res.n[1] = (m.n[1] + m.n[4]) * s;
			res.n[2] = (m.n[2] + m.n[8]) * s;
			res.n[3] = (m.n[6] + m.n[9]) * s;
			return res;
		case 5  :
			s = 0.5 / Math.sqrt(1.0 + m.n[5] - m.n[0] - m.n[10]);
			res.n[0] = (m.n[1] + m.n[4]) * s;
			res.n[1] = 0.5 * s;
			res.n[2] = (m.n[6] + m.n[9]) * s;
			res.n[3] = (m.n[2] + m.n[8]) * s;
			return res;
		case 10 :
			s = 0.5 / Math.sqrt(1.0 + m.n[10] - m.n[0] - m.n[5]);
			res.n[0] = (m.n[2] + m.n[8]) * s;
			res.n[1] = (m.n[6] + m.n[9]) * s;
			res.n[2] = 0.5 * s;
			res.n[3] = (m.n[1] + m.n[4]) * s;
		default : return res;
	}
};

/**
 * Creates an instance from Vector3
 * @static
 * @param  {Vector3} v The source
 * @return {Vector4}
 */
Vector4.Vector3 = function(v) {return new Vector4(v.n.concat(1.0));};


/**
 * Returns the sum of q and r (q+r)
 * @static
 * @param  {Vector4} q The first summand
 * @param  {Vector4} r The second summand
 * @return {Vector4}
 */
Vector4.add = function(q, r) {
	return new Vector4([
		q.n[0] + r.n[0],
		q.n[1] + r.n[1],
		q.n[2] + r.n[2],
		q.n[3] + r.n[3]
	]);
};

/**
 * Returns the difference of q and r (q-r)
 * @static
 * @param  {Vector4} q The minuend
 * @param  {Vector4} r The subtrahend
 * @return {Vector4}
 */
Vector4.subtract = function(q, r) {
	return new Vector4([
		q.n[0] - r.n[0],
		q.n[1] - r.n[1],
		q.n[2] - r.n[2],
		q.n[3] - r.n[3]
	]);
};

/**
 * Returns the scalar product of q and n (q*n)
 * @static
 * @param  {Vector4} q The vector
 * @param  {Float}   n The scalar
 * @return {Vector4}
 */
Vector4.multiplyScalar = function(q, n) {
	return new Vector4([
		q.n[0] * n,
		q.n[1] * n,
		q.n[2] * n,
		q.n[3] * n
	]);
};

/**
 * Returns the exterior product of q and r (q*r)
 * @static
 * @param  {Vector4} q The first vector
 * @param  {Vector4} r The second vector
 * @return {Vector4}
 */
Vector4.multiply = function(q, r) {
	var res = new Quaternion();
	res.multiply(q, r);
	return res;
};

/**
 * Returns the inner product of q and r
 * @static
 * @param  {Vector4} q The first vector
 * @param  {Vector4} r The second vector
 * @return {Vector4}
 */
Vector4.dot = function(q, r) {return q.n[0] * r.n[0] + q.n[1] * r.n[1] + q.n[2] * r.n[2] + q.n[3] * r.n[3];}


/**
 * Returns a copy of q
 * @static
 * @param  {Vector4} q The source
 * @return {Vector4}
 */
Vector4.copy = function(q) {return new Vector4(q.n.slice(0, 4));};


/**
 * Tests q and r for equality
 * @param  {Vector4} q The first vector
 * @param  {Vector4} r The second vector
 * @return {Boolean}
 */
Vector4.isEQ = function(q, r) {
	if (q.n[0] != r.n[0] || q.n[1] != r.n[1] || q.n[2] != r.n[2] || q.n[3] != r.n[3]) return false;
	return true;
};


/**
 * Returns the type-version string
 * @static
 * @return {String}
 */
Vector4.toString = function() {return "[Vector4-" + Vector4.version + "]";};

/**
 * The version string
 * @constant
 * @static
 * @type String
 */
Vector4.version = "0.5.2";




/**
 * Matrix3
 * @class 3x3 transformations
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param  {Float[]} [n] Array containing 3x3 column-major ordered components
 *	<p>Arrays different than 3x3 will return the identity matrix.</p>
 */
function Matrix3(n) {
	/**
	 * The array representation
	 * <p>Contains the 9 column-major ordered components of the instance.</p>
	 * <p>n[0]:n00 n[3]:n01 n[6]:n02</p>
	 * <p>n[1]:n10 n[4]:n11 n[7]:n12</p>
	 * <p>n[2]:n20 n[5]:n21 n[8]:n22</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor == Array && n.length == 9 ? n : [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]);
}

Matrix3.prototype = {
	
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Matrix3,
	
	
	/**
	 * (Re)defines the instance
	 * @param  {Float[]} [n] Array containing the 3x3 column-major ordered components
	 *	<p>Arrays different than 3x3 will return the identity matrix.</p>
	 * @return {void}
	 * 
	 */
	define : function(n) {
		Matrix3.call(this, n);
	},
	
	
	/**
	 * row 0, col 0, n[0]
	 * @see Matrix3#n
	 * @name n00
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n00()  {return this.n[0];},
	set n00(n) {this.n[0] = n;},

	/**
	 * row 0, col 1, n[3]
	 * @see Matrix3#n
	 * @name n01
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n01()  {return this.n[3];},
	set n01(n) {this.n[3] = n;},

	/**
	 * row 0, col 2, n[6]
	 * @see Matrix3#n
	 * @name n02
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n02()  {return this.n[6];},
	set n02(n) {this.n[6] = n;},

	/**
	 * row 1, col 0, n[1]
	 * @see Matrix3#n
	 * @name n10
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n10()  {return this.n[1];},
	set n10(n)  {this.n[1] = n;},
	
	/**
	 * row 1, col 1, n[4]
	 * @see Matrix3#n
	 * @name n11
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n11()  {return this.n[4];},
	set n11(n) {this.n[4] = n;},

	/**
	 * row 1, col 2, n[7]
	 * @see Matrix3#n
	 * @name n12
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n12()  {return this.n[7];},
	set n12(n) {this.n[7] = n;},
	
	/**
	 * row 2, col 0, n[2]
	 * @see Matrix3#n
	 * @name n20
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n20()  {return this.n[2];},
	set n20(n) {this.n[2] = n;},
	
	/**
	 * row 2, col 1, n[5]
	 * @see Matrix3#n
	 * @name n21
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n21()  {return this.n[5];},
	set n21(n) {this.n[5] = n;},
	
	/**
	 * row 2, col 2, n[8]
	 * @see Matrix3#n
	 * @name n22
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get n22()  {return this.n[8];},
	set n22(n) {this.n[8] = n;},
	
	
	/**
	 * The determinant
	 * <p>[readonly]</p>
	 * @name determinant
	 * @memberOf Matrix3#
	 * @type Float
	 */
	get determinant() {
		var n = this.n;
		
		var n10 = n[1], n11 = n[4], n12 = n[7];
		var n20 = n[2], n21 = n[5], n22 = n[8];
		
		return n[0] * (n11 * n22 - n12 * n21) + n[3] * (n12 * n20 - n10 * n22) + n[6] * (n10 * n21 - n11 * n20);	
	},
	
	
	/**
	 * The sum of a and b (a+b)
	 * @param  {Matrix3} a The first summand
	 * @param  {Matrix3} b The second summand
	 * @return {void}
	 */
	add : function(a, b) {
		var n = this.n, an = a.n, bn = b.n;
		for (var i = 0; i < 9; i++) n[i] = an[i] + bn[i];
	},
	
	/**
	 * The difference of a and b (a-b)
	 * @param  {Matrix3} a The minuend
	 * @param  {Matrix3} b The subtrahend
	 * @return {void}
	 */
	subtract : function(a, b) {
		var n = this.n, an = a.n, bn = b.n;
		for (var i = 0; i < 9; i++) n[i] = an[i] - bn[i];
	},
	
	/**
	 * The concatenation of a and b (a*b)
	 * @param {Matrix3} a The first transform
	 * @param {Matrix3} b The second transform
	 * @return {void}
	 */
	multiply : function(a, b) {
		var n = this.n, an = a.n, bn = b.n;
		
		var a00 = an[0], a01 = an[3], a02 = an[6];
		var a10 = an[1], a11 = an[4], a12 = an[7];
		var a20 = an[2], a21 = an[5], a22 = an[8];

		var b00 = bn[0], b01 = bn[3], b02 = bn[6];
		var b10 = bn[1], b11 = bn[4], b12 = bn[7];
		var b20 = bn[2], b21 = bn[5], b22 = bn[8];

		n[0] = a00 * b00 + a01 * b10 + a02 * b20;
		n[3] = a00 * b01 + a01 * b11 + a02 * b21;
		n[6] = a00 * b02 + a01 * b12 + a02 * b22;

		n[1] = a10 * b00 + a11 * b10 + a12 * b20;
		n[4] = a10 * b01 + a11 * b11 + a12 * b21;
		n[7] = a10 * b02 + a11 * b12 + a12 * b22;

		n[2] = a20 * b00 + a21 * b10 + a22 * b20;
		n[5] = a20 * b01 + a21 * b11 + a22 * b21;
		n[8] = a20 * b02 + a21 * b12 + a22 * b22;
	},
	
	/**
	 * The inverse of m
	 * @param  {Matrix3} m The source
	 * @return {Boolean}
	 *  <p>Returns false if m is assumed to be singular, true otherwise.</p>
	 */
	inverseOf : function(m) {
		var n = this.n, mn = m.n, d = m.determinant;
		
		if (Math.abs(d) < 1.0e-10) return false;
		
		d = 1.0 / d;
		
		var m00 = mn[0], m01 = mn[3], m02 = mn[6];
		var m10 = mn[1], m11 = mn[4], m12 = mn[7];
		var m20 = mn[2], m21 = mn[5], m22 = mn[8];
		
		n[0] =  d * (m11 * m22 - m12 * m21);
		n[3] = -d * (m01 * m22 - m02 * m21);
		n[6] =  d * (m01 * m12 - m02 * m11);
		
		n[1] = -d * (m10 * m22 - m12 * m20);
		n[4] =  d * (m00 * m22 - m02 * m20);
		n[7] = -d * (m00 * m12 - m02 * m10);
		
		n[2] =  d * (m10 * m21 - m11 * m20);
		n[5] = -d * (m00 * m21 - m01 * m20);
		n[8] =  d * (m00 * m11 - m01 * m10);
		
		return true;
	},
	
	/**
	 * The transpose of m
	 * @param  {Matrix3} m The source
	 * @return {void}
	 */
	transposeOf : function(m) {
		var n = this.n, mn = m.n;
		
		n[3] = mn[1]; n[6] = mn[2];
		n[1] = mn[3]; n[7] = mn[5];
		n[2] = mn[6]; n[5] = mn[7];
	},
	
	/**
	 * The copy of m
	 * @param  {Matrix3} m The source
	 * @return {void}
	 */
	copyOf : function(m) {
		this.n = m.n.slice(0, 9);
	},
	
	
	/**
	 * The inverse of the instance
	 * @return {Boolean}
	 *	<p>Returns false if the instance is assumed to be singular, true otherwise.</p>
	 */
	invert : function() {
		return this.inverseOf(this);
	},
	
	/**
	 * The transpose of the instance
	 * @return {void}
	 */
	transpose : function() {
		var m = new Matrix3(this.n.slice(0, 9));
		this.transposeOf(m);
	},
	
	
	/**
	 * Returns a (y, x, z) ordered euler angle representation of the instance
	 * @return {Float[x, y, z]}
	 */
	toEulerYXZ : function() {
		var n = this.n, x = Math.asin(-n[7]);
		
		if (Math.abs(n[7]) != 1.0) {
			var y = Math.atan2(n[6], n[8]);
			var z = Math.atan2(n[1], n[4]);
		} else  {
			y = Math.atan2(n[3], n[0]);
			z = 0.0;
		}

		return [x, y, z];
	},
	
	/**
	 * Returns a (z, x, y) ordered euler angle representation of the instance
	 * @return {Float[x, y, z]}
	 */
	toEulerZXY : function() {
		var n = this.n, x = Math.asin(-n[5]);
		
		if (Math.abs(n[5]) != 1.0) {
			var y = Math.atan2(-n[2], n[8]);
			var z = Math.atan2(-n[3], n[4]);
		} else {
			y = 0.0;
			z = Math.atan2(n[1], n[0]);
		}
		
		return [x, y, z];
	},
	
	
	/**
	 * Returns a string representation of the instance
	 * @return {String}
	 */
	toString : function() {
		var res = this.constructor;
		for (var i = 0; i < 9; i++) res += (i % 3.0 == 0.0 ? "\n" : "\t") + this.n[i];
		return res;
	}
};



/**
 * A instance of the identity matrix
 * @static
 * @name IDENTITY
 * @memberOf Matrix3
 * @type Matrix3
 */
Object.defineProperty(Matrix3, 'IDENTITY', {
	get : function() {return new Matrix3();},
	enumerable : true,
	configurable : true
});


/**
 * Creates a instance from axis and rotation
 * @static
 * @param  {Vector3} axis The rotation axis
 * @param  {Float}   rad  The rotation in radians
 * @return {Matrix3}
 */
Matrix3.Rotation = function(axis, rad) {
	var res = new Matrix3(), n = res.n;
	
	var x = axis.n[0], y = axis.n[1], z = axis.n[2];
	var sin = Math.sin(rad), cos = Math.cos(rad), vers = 1.0 - cos;
	
	var xSin = x * sin, ySin = y * sin, zSin = z * sin;
	var xyVers = x * y * vers, xzVers = x * z * vers, yzVers = y * z * vers;
	
	n[0] = cos + vers * x * x; n[3] = xyVers - zSin;      n[6] = xzVers + ySin;
	n[1] = xyVers + zSin;      n[4] = cos + vers * y * y; n[7] = yzVers - xSin;
	n[2] = xzVers - ySin;      n[5] = yzVers + xSin;      n[8] = cos + vers * z * z;
	
	return res;

};

/**
 * Creates a instance from a x-axis rotation
 * @static
 * @param  {Float}   rad The rotation in radians
 * @return {Matrix3}
 */
Matrix3.RotationX = function(rad) {
	var res = new Matrix3(), n = res.n;

	var sin = Math.sin(rad);
	var cos = Math.cos(rad);

	n[4] =  cos;
	n[7] = -sin;
	n[5] =  sin;
	n[8] =  cos;

	return res;
};

/**
 * Creates a instance from a y-axis rotation
 * @static
 * @param  {Float}   rad The rotation in radians
 * @return {Matrix3}
 */
Matrix3.RotationY = function(rad) {
	var res = new Matrix3(), n = res.n;

	var sin = Math.sin(rad);
	var cos = Math.cos(rad);

	n[0] =  cos;
	n[6] = -sin;
	n[2] =  sin;
	n[8] =  cos;

	return res;

};

/**
 * Creates a instance from a z-axis rotation
 * @static
 * @param  {Float}   rad The rotation in radians
 * @return {Matrix3}
 */
Matrix3.RotationZ = function(rad) {
	var res = new Matrix3(), n = res.n;

	var sin = Math.sin(rad);
	var cos = Math.cos(rad);

	n[0] =  cos;
	n[3] = -sin;
	n[1] =  sin;
	n[4] =  cos;

	return res;
};

/**
 * Creates a instance from (x, y, z) ordered euler angles
 * @static
 * @param  {Float}   x The first  (x-axis) rotation in radians
 * @param  {Float}   y The second (y-axis) rotation in radians
 * @param  {Float}   z The third  (z-axis) rotation in radians
 * @return {Matrix3}
 */
Matrix3.EulerXYZ = function(x, y ,z) {
	var res = new Matrix3(), n = res.n;
	
	var sx = Math.sin(x), cx = Math.cos(x);
	var sy = Math.sin(y), cy = Math.cos(y);
	var sz = Math.sin(z), cz = Math.cos(z);
	
	n[0] =  cy * cz;
	n[3] = -cy * sz;
	n[6] =  sy;
	
	n[1] =  cx * sz + sx * sy * cz;
	n[4] =  cx * cz - sx * sy * sz;
	n[7] = -sx * cy;
	
	n[2] =  sx * sz - cx * sy * cz;
	n[5] =  sx * cz + cx * sy * sz;
	n[8] =  cx * cy;
	
	return res;
};

/**
 * Creates a instance from (y, x, z) ordered euler angles
 * @static
 * @param  {Float}   x The second (x-axis) rotation in radians
 * @param  {Float}   y The first  (y-axis) rotation in radians
 * @param  {Float}   z The third  (z-axis) rotation in radians
 * @return {Matrix3}
 * 
 */
Matrix3.EulerYXZ = function(x, y, z) {
	var res = new Matrix3(), n = res.n;

	var sx = Math.sin(x), cx = Math.cos(x);
	var sy = Math.sin(y), cy = Math.cos(y);
	var sz = Math.sin(z), cz = Math.cos(z);
	
	n[0] =  cy * cz + sy * sx * sz;
	n[3] = -cy * sz + sy * sx * cz;
	n[6] =  sy * cx;
	
	n[1] =  cx * sz;
	n[4] =  cx * cz;
	n[7] = -sx;
	
	n[2] = -sy * cz + cy * sx * sz;
	n[5] =  sy * sz + cy * sx * cz;
	n[8] =  cy * cx;
	
	return res;
};

/**
 * Creates a instance from (z, x, y) ordered euler angles
 * @static
 * @param  {Float}   x The second (x-axis) rotation in radians
 * @param  {Float}   y The third  (y-axis) rotation in radians
 * @param  {Float}   z The first  (z-axis) rotation in radians
 * @return {Matrix3}
 */
Matrix3.EulerZXY = function(x, y, z) {
	var res = new Matrix3(), n = res.n;	

	var sx = Math.sin(x), cx = Math.cos(x);
	var sy = Math.sin(y), cy = Math.cos(y);
	var sz = Math.sin(z), cz = Math.cos(z);
		
	n[0] =  cz * cy - sz * sx * sy;
	n[3] = -sz * cx;
	n[6] =  cz * sy + sz * sx * cy;
	
	n[1] =  sz * cy + cz * sx * sy;
	n[4] =  cz * cx;
	n[7] =  sz * sy - cz * sx * cy;
	
	n[2] = -cx * sy;
	n[5] =  sx;
	n[8] =  cx * cy;
	
	return res;
};

/**
 * Creates a instance from scale vector
 * @static
 * @param  {Vector3} v The source
 * @return {Matrix3}
 */
Matrix3.Scale = function(v) {
	var res = new Matrix3();
	var n = res.n, vn = v.n;
	
	n[0] = vn[0];
	n[4] = vn[1];
	n[8] = vn[2];
	
	return res;
};


/**
 * Creates a instance from axes (x, y, z)
 * @static
 * @param  {Vector3} x The x-axis vector
 * @param  {Vector3} y The y-axis vector
 * @param  {Vector3} z The z-axis vector
 * @return {Matrix3}
 */
Matrix3.Vector3 = function(x, y, z) {
	var n = [].concat(x.n, y.n, z.n);
	return new Matrix3(n);
};

/**
 * Creates a instance from unit-quaternion q
 * @static
 * @param  {Vector4} q The source
 * @return {Matrix3}
 */
Matrix3.Vector4 = function(q) {
	var res = new Matrix4();
	var n = res.n, qn = q.n;
	
	var x = qn[0], y = qn[1], z = qn[2], w = qn[3];
	
	var xx = x * x, yy = y * y, zz = z * z;
	var xy = x * y, yz = y * z, xz = x * z;
	var xw = x * w, yw = y * w, zw = z * w;	
	
	var s = 2.0 / Math.sqrt(xx + yy + zz + w * w);
	
	n[0] = 1.0 - s * (yy + zz); n[1] =       s * (xy + zw); n[2] =       s * (xz - yw);
	n[3] =       s * (xy - zw); n[4] = 1.0 - s * (xx + zz); n[5] =       s * (yz + xw);
	n[6] =       s * (xz + yw); n[5] =       s * (yz - xw); n[8] = 1.0 - s * (xx + yy);
	
	return res;
};

/**
 * Creates a instance from m
 * <p>The instance will be cropped to 3x3 by removing the fourth row & column of m.</p>
 * @static
 * @param  {Matrix4} m The source
 * @return {Matrix3}
 */
Matrix3.Matrix4 = function(m) {
	var n = m.n.slice(0, 11);
	n.splice(7, 1);
	n.splice(3, 1);
	
	return new Matrix3(n);
};


/**
 * Returns the sum of a and b (a+b)
 * @static
 * @param  {Matrix3} a The first summand
 * @param  {Matrix3} b The second summand
 * @return {Matrix3}
 */
Matrix3.add = function(a, b) {
	var res = new Matrix3();
	res.add(a, b);
	return res;
};

/**
 * Returns the difference of a and b (a-b)
 * @static
 * @param  {Matrix3} a The minuend
 * @param  {Matrix3} b The subtrahend
 * @return {Matrix3}
 */
Matrix3.subtract = function(a, b) {
	var res = new Matrix3();
	res.subtract(a, b);
	return res;
};

/**
 * Returns the concatenation of a and b (a*b)
 * @static
 * @param  {Matrix3} a The first transform
 * @param  {Matrix3} b The second transform
 * @return {Matrix3}
 */
Matrix3.multiply = function(a, b) {
	var res = new Matrix3();
	res.multiply(a, b);
	return res;
};


/**
 * Returns the inverse of m
 * @static
 * @param  {Matrix3}        m The source
 * @return {Matrix3 | null}
 *	<p>Returns null if m is assumed to be singular, the inverse of m otherwise.</p>
 */
Matrix3.inverse = function(m) {
	var res = new Matrix3();
	return res.inverseOf(m) ? res : null;
};

/**
 * Returns the transpose of m
 * @static
 * @param  {Matrix3} m The source
 * @return {Matrix3}
 */
Matrix3.transpose = function(m) {
	var res = new Matrix3();
	res.transposeOf(m);
	return res;
};

/**
 * Creates a copy of m
 * @static
 * @param  {Matrix3} m The source
 * @return {Matrix3}
 */
Matrix3.copy = function(m) {
	return new Matrix3(m.n.slice(0, 9));
};


/**
 * Tests a and b for equality
 * @param  {Matrix3}  a The first matrix
 * @param  {Matrix3}  b The second matrix
 * @return {Boolean}
 */
Matrix3.isEQ = function(a, b) {
	var an = a.n, bn = b.n;
	
	for (var i = 0; i < 9; i++) {
		if (an[i] != bn[i]) return false;
	}
	
	return true;
};


/**
 * Returns the type-version string
 * @static
 * @return {String}
 */
Matrix3.toString = function() {return "[Matrix3-" + Matrix3.version + "]";};

/**
 * The version string
 * @constant
 * @static
 * @type String
 */
Matrix3.version = "0.5.0";




/**
 * Matrix4
 * @class 3x4 and 4x4 transformations
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array containing 4x4 column-major ordered components
 *	<p>Arrays different than 4x4 will return the identity matrix.</p>
 */
function Matrix4(n) {
	/**
	 * The array representation
	 * <p>Contains the 16 column-major ordered components of the instance.</p>
	 * <p>n[0]:n00 n[4]:n01 n[8] :n02 n[12]:n03</p>
	 * <p>n[1]:n10 n[5]:n11 n[9] :n12 n[13]:n13</p>
	 * <p>n[2]:n20 n[6]:n21 n[10]:n22 n[14]:n23</p>
	 * <p>n[3]:n30 n[7]:n31 n[11]:n32 n[15]:n33</p> 
	 * @type Float[]
	 */
	this.n = (n && n.constructor == Array && n.length == 16 ? n : [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
}

Matrix4.prototype = {
	
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Matrix4,

	
	/**
	 * (Re)defines the instance
	 * @param  {Float[]} [n] Array containing the 4x4 column-major ordered components
	 *	<p>Arrays different than 4x4 will return the identity matrix.</p>
	 * @return {void}
 	 */
	define : function(n) {
		Matrix4.call(this, n);
	},
	
	
	/**
	 * row 0, col 0, n[0]
	 * @see Matrix4#n
	 * @name n00
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n00()  {return this.n[0];},
	set n00(n) {this.n[0] = n;},
	
	/**
	 * row 0, col 1, n[4]
	 * @see Matrix4#n
	 * @name n01
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n01()  {return this.n[4];},
	set n01(n) {this.n[4] = n;},
	
	/**
	 * row 0, col 2, n[8]
	 * @see Matrix4#n
	 * @name n02
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n02()  {return this.n[8];},
	set n02(n) {this.n[8] = n;},
	
	/**
	 * row 0, col 3, n[12]
	 * @see Matrix4#n
	 * @name n03
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n03()  {return this.n[12];},
	set n03(n) {this.n[12] = n;},
	
	/**
	 * row 1, col0, n[1]
	 * @see Matrix4#n
	 * @name n10
	 * @memberOf Matrix4#
	 * @type Float
	 */
	
	get n10()  {return this.n[1];},
	set n10(n) {this.n[1] = n;},
	
	/**
	 * row 1, col1, n[5]
	 * @see Matrix4#n
	 * @name n11
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n11()  {return this.n[5];},
	set n11(n) {this.n[5] = n;},
	
	/**
	 * row 1, col2, n[9]
	 * @see Matrix4#n
	 * @name n12
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n12()  {return this.n[9];},
	set n12(n) {this.n[9] = n;},
	
	/**
	 * row 1, col3, n[13]
	 * @see Matrix4#n
	 * @name n13
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n13()  {return this.n[13];},
	set n13(n) {this.n[13] = n;},
	
	/**
	 * row2, col0, n[2]
	 * @see Matrix4#n
	 * @name n20
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n20()  {return this.n[2];},
	set n20(n) {this.n[2] = n;},
	
	/**
	 * row 2, col1, n[6]
	 * @see Matrix4#n
	 * @name n21
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n21()  {return this.n[6];},
	set n21(n) {this.n[6] = n;},
	
	/**
	 * row 2, col2, n[10]
	 * @see Matrix4#n
	 * @name n22
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n22()  {return this.n[10];},
	set n22(n) {this.n[10] = n;},
	
	/**
	 * row 2, col3, n[14]
	 * @see Matrix4#n
	 * @name n23
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n23()  {return this.n[14];},
	set n23(n) {this.n[14] = n;},
	
	/**
	 * row 3, col0, n[3]
	 * @see Matrix4#n
	 * @name n30
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n30()  {return this.n[3];},
	set n30(n) {this.n[3] = n;},
	
	/**
	 * row 3, col1, n[7]
	 * @see Matrix4#n
	 * @name n31
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n31()  {return this.n[7];},
	set n31(n) {this.n[7] = n;},
	
	/**
	 * row 3, col2, n[11]
	 * @see Matrix4#n
	 * @name n32
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n32()  {return this.n[11];},
	set n32(n) {this.n[11] = n;},
	
	/**
	 * row 3, col3, n[15]
	 * @see Matrix4#n
	 * @name n33
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n33()  {return this.n[15];},
	set n33(n) {this.n[15] = n;},
	
	
	/**
	 * The determinant
	 * <p>[readonly]</p>
	 * @name determinant
	 * @memberOf Matrix4#
	 * @type Float
	 */		
	get determinant() {	
		var n = this.n;
	
		var n10 = n[1], n11 = n[5], n12 = n[9],  n13 = n[13];
		var n30 = n[3], n31 = n[7], n32 = n[11], n33 = n[15];
		
		return n[0] * n[10] * (n11 * n33 - n13 * n31) + n[4] * n[14] * (n12 * n30 - n10 * n32) + n[8] * n[2] * (n13 * n31 - n11 * n33) + n[12] * n[6] * (n10 * n32 - n12 * n30);
	},
	
	
	/**
	 * The sum of a and b (a+b)
	 * @param  {Matrix4} a The first summand
	 * @param  {Matrix4} b The second summand
	 * @return {void}
	 */
	add : function(a, b) {
		var n = this.n, an = a.n, bn = b.n;
		for (var i = 0; i < 16; i++) n[i] = an[i] + bn[i];
	},
	
	/**
	 * The difference of a and b (a-b)
	 * @param  {Matrix4} a The minuend
	 * @param  {Matrix4} b The subtrahend
	 * @return {void}
	 */
	subtract : function(a, b) {
		var n = this.n, an = a.n, bn = b.n;
		for (var i = 0; i < 16; i++) n[i] = an[i] - bn[i];
	},
	
	/**
	 * The 3x4 concatenation of m and matrix-transformed v (m*Matrix4.Matrix3(Matrix3.Scale(v)))
	 * <p>Components 3x are assumed to be (0, 0, 0, 1).</p>
	 * @param  {Matrix4} m The matrix
	 * @param  {Vector3} v The vector
	 * @return {void}
	 */
	multiply3x4Vector3Scale : function(m, v) {
		var n = this.n; mn = m.n, vn = v.n;

		var m00 = mn[0], m01 = mn[4], m02 = mn[8],  m03 = mn[12];
		var m10 = mn[1], m11 = mn[5], m12 = mn[9],  m13 = mn[13];
		var m20 = mn[2], m21 = mn[6], m22 = mn[10], m23 = mn[14];
		var m30 = mn[3], m31 = mn[7], m32 = mn[11], m33 = mn[15];
		
		var v00 = vn[0], v11 = vn[1], v22 = vn[2];
		
		n[0]  = m00 * v00; n[4]  = m01 * v11; n[8]  = m02 * v22; n[12] = m03;
		n[1]  = m10 * v00; n[5]  = m11 * v11; n[9]  = m12 * v22; n[13] = m13;
		n[2]  = m20 * v00; n[6]  = m21 * v11; n[10] = m22 * v22; n[14] = m23;
		n[3]  = m30 * v00; n[7]  = m31 * v11; n[11] = m32 * v22; n[15] = m33;
	},
	
	/**
	 * The 3x4 concatenation of a and b (a*b)
	 * <p>Components 3x are assumed to be (0, 0, 0, 1).</p>
	 * @param  {Matrix4} a The first matrix
	 * @param  {Matrix3} b The second matrix
	 * @return {void}
	 */
	multiply3x4Matrix3 : function(a, b) {
		var n = this.n, an = a.n, bn = b.n;
		
		var a00 = an[0], a01 = an[4], a02 = an[8],  a03 = an[12];
		var a10 = an[1], a11 = an[5], a12 = an[9],  a13 = an[13];
		var a20 = an[2], a21 = an[6], a22 = an[10], a23 = an[14];
		
		var b00 = bn[0], b01 = bn[3], b02 = bn[6];
		var b10 = bn[1], b11 = bn[4], b12 = bn[7];
		var b20 = bn[2], b21 = bn[5], b22 = bn[8];
		
		n[0]  = a00 * b00 + a01 * b10 + a02 * b20;
		n[4]  = a00 * b01 + a01 * b11 + a02 * b21;
		n[8]  = a00 * b02 + a01 * b12 + a02 * b22;
		n[12] = a03;
		
		n[1]  = a10 * b00 + a11 * b10 + a12 * b20;
		n[5]  = a10 * b01 + a11 * b11 + a12 * b21;
		n[9]  = a10 * b02 + a11 * b12 + a12 * b22;
		n[13] = a13;
		
		n[2]  = a20 * b00 + a21 * b10 + a22 * b20;
		n[6]  = a20 * b01 + a21 * b11 + a22 * b21;
		n[10] = a20 * b02 + a21 * b12 + a22 * b22;
		n[14] = a23;
		
		n[3] = n[7]  = n[11] = 0.0;
		n[15] = 1.0;		
	},
	
	/**
	 * The 3x4 concatenation of a and b (a*b)
	 * <p>Components 3x are assumed to be (0, 0, 0, 1).</p>
	 * @param  {Matrix4} a The first transform
	 * @param  {Matrix4} b The second transform
	 * @return {void}
	 */
	multiply3x4 : function(a, b) {
		var n = this.n, an = a.n, bn = b.n;
		
		var a00 = an[0], a01 = an[4], a02 = an[8],  a03 = an[12];
		var a10 = an[1], a11 = an[5], a12 = an[9],  a13 = an[13];
		var a20 = an[2], a21 = an[6], a22 = an[10], a23 = an[14];
		
		var b00 = bn[0], b01 = bn[4], b02 = bn[8],  b03 = bn[12];
		var b10 = bn[1], b11 = bn[5], b12 = bn[9],  b13 = bn[13];
		var b20 = bn[2], b21 = bn[6], b22 = bn[10], b23 = bn[14];
		
		n[0]  = a00 * b00 + a01 * b10 + a02 * b20;
		n[4]  = a00 * b01 + a01 * b11 + a02 * b21;
		n[8]  = a00 * b02 + a01 * b12 + a02 * b22;
		n[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03;
		
		n[1]  = a10 * b00 + a11 * b10 + a12 * b20;
		n[5]  = a10 * b01 + a11 * b11 + a12 * b21;
		n[9]  = a10 * b02 + a11 * b12 + a12 * b22;
		n[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13;
		
		n[2]  = a20 * b00 + a21 * b10 + a22 * b20;
		n[6]  = a20 * b01 + a21 * b11 + a22 * b21;
		n[10] = a20 * b02 + a21 * b12 + a22 * b22;
		n[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23;
		
		n[3] = n[7] = n[11] = 0.0;
		n[15] = 1.0;
	},
	
	/**
	 * The concatenation of a and b (a*b)
	 * @param {Matrix4} a The first transform
	 * @param {Matrix4} b The second transform
	 * @return {void}
	 */
	multiply : function(a, b) {
		var n = this.n; an = a.n, bn = b.n;

		var a00 = an[0], a01 = an[4], a02 = an[8],  a03 = an[12];
		var a10 = an[1], a11 = an[5], a12 = an[9],  a13 = an[13];
		var a20 = an[2], a21 = an[6], a22 = an[10], a23 = an[14];
		var a30 = an[3], a31 = an[7], a32 = an[11], a33 = an[15];
		
		var b00 = bn[0], b01 = bn[4], b02 = bn[8],  b03 = bn[12];
		var b10 = bn[1], b11 = bn[5], b12 = bn[9],  b13 = bn[13];
		var b20 = bn[2], b21 = bn[6], b22 = bn[10], b23 = bn[14];
		var b30 = bn[3], b31 = bn[7], b32 = bn[11], b33 = bn[15];
		
		n[0]  = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
		n[4]  = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
		n[8]  = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
		n[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
		
		n[1]  = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
		n[5]  = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
		n[9]  = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
		n[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
		
		n[2]  = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
		n[6]  = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
		n[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
		n[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
		
		n[3]  = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
		n[7]  = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
		n[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
		n[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
	},

	
	/**
	 * The 3x4 inverse of m
	 * <p>Components 3x are assumed to be (0, 0, 0, 1).</p>
	 * @param  {Matrix4} m The 3x4 source
	 * @return {Boolean}
	 *	<p>Returns false if m is assumed to singular, true otherwise.</p>
	 */
	inverse3x4Of : function(m) {
		var n = this.n, mn = m.n, d = Matrix3.Matrix4(this).determinant;
		
		if (Math.abs(d) < 1.0e-10) return false;
		
		d = 1.0 / d;
		
		var m00 = mn[0], m01 = mn[4], m02 = mn[8],  m03 = mn[12];
		var m10 = mn[1], m11 = mn[5], m12 = mn[9],  m13 = mn[13];
		var m20 = mn[2], m21 = mn[6], m22 = mn[10], m23 = mn[14];
		
		n[0]  =  d * (m11 * m22 - m12 * m21);
		n[4]  = -d * (m01 * m22 - m02 * m21);
		n[8]  =  d * (m01 * m12 - m02 * m11);
		n[12] = -d * (m01 * (m12 * m23 - m13 * m22) + m02 * (m13 * m21 - m11 * m23) + m03 * (m11 * m22 - m12 * m21));
		
		n[1]  = -d * (m10 * m22 - m12 * m20);
		n[5]  =  d * (m00 * m22 - m02 * m20);
		n[9]  = -d * (m00 * m12 - m02 * m10);
		n[13] =  d * (m00 * (m12 * m23 - m13 * m22) + m02 * (m13 * m20 - m10 * m23) + m03 * (m10 * m22 - m12 * m20));
		
		n[2]  =  d * (m10 * m21 - m11 * m20);
		n[6]  = -d * (m00 * m21 - m01 * m20);
		n[10] =  d * (m00 * m11 - m01 * m10);
		n[14] = -d * (m00 * (m11 * m23 - m13 * m21) + m01 * (m13 * m20 - m10 * m23) + m03 * (m10 * m21 - m11 * m20));
		
		n[3]  = n[7]  = n[11] =  0.0;
		n[15] =  1.0;
		
		return true;
	},
	
	/**
	 * The inverse of m
	 * <p>Using the adjoint method - m[ij] = 1 / d * (-1)^(i + j) * det(adj(m[ji])).</p>
	 * @param  {Matrix4} m The source
	 * @return {Boolean}
	 *	<p>Returns false if m is assumed to be singular, true otherwise.</p>
	 */
	inverseOf : function(m) {
		var n = this.n, mn = m.n, d = m.determinant;

		if (Math.abs(d) < 1.0e-10) return false;

		d = 1.0 / d;

		var m00 = mn[0], m01 = mn[4], m02 = mn[8],  m03 = mn[12];
		var m10 = mn[1], m11 = mn[5], m12 = mn[9],  m13 = mn[13];
		var m20 = mn[2], m21 = mn[6], m22 = mn[10], m23 = mn[14];
		var m30 = mn[3], m31 = mn[7], m32 = mn[11], m33 = mn[15];

		var m0011 = m00 * m11, m0112 = m01 * m12, m0213 = m02 * m13, m0310 = m03 * m10;
		var m2031 = m20 * m31, m2132 = m21 * m32, m2233 = m22 * m33, m2330 = m23 * m30;

		var m0312 = m03 * m12, m0211 = m02 * m11, m0110 = m01 * m10, m0013 = m00 * m13;
		var m2332 = m23 * m32, m2231 = m22 * m31, m2130 = m21 * m30, m2033 = m20 * m33;

		var m0012 = m00 * m12, m0113 = m01 * m13, m0210 = m02 * m10, m0311 = m03 * m11;
		var m2032 = m20 * m32, m2133 = m21 * m33, m2230 = m22 * m30, m2331 = m23 * m31;

		n[0]  =  d * (m11 * m2233 + m12 * m2331 + m13 * m2132 - m13 * m2231 - m12 * m2133 - m11 * m2332);
		n[4]  = -d * (m01 * m2233 + m02 * m2331 + m03 * m2132 - m03 * m2231 - m02 * m2133 - m01 * m2332);
		n[8]  =  d * (m0112 * m33 + m0213 * m31 + m0311 * m32 - m0312 * m31 - m0211 * m33 - m0113 * m32);
		n[12] = -d * (m0112 * m23 + m0213 * m21 + m0311 * m22 - m0312 * m21 - m0211 * m23 - m0113 * m22);

		n[1]  = -d * (m10 * m2233 + m12 * m2330 + m13 * m2032 - m13 * m2230 - m12 * m2033 - m10 * m2332);
		n[5]  =  d * (m00 * m2233 + m02 * m2330 + m03 * m2032 - m03 * m2230 - m02 * m2033 - m00 * m2332);
		n[9]  = -d * (m0012 * m33 + m0213 * m30 + m0310 * m32 - m0312 * m30 - m0210 * m33 - m0013 * m32);
		n[13] =  d * (m0012 * m23 + m0213 * m20 + m0310 * m22 - m0312 * m20 - m0210 * m23 - m0013 * m22);

		n[2]  =  d * (m10 * m2133 + m11 * m2330 + m13 * m2031 - m13 * m2130 - m11 * m2033 - m10 * m2331);
		n[6]  = -d * (m00 * m2133 + m01 * m2330 + m03 * m2031 - m03 * m2130 - m01 * m2033 - m00 * m2331);
		n[10] =  d * (m0011 * m33 + m0113 * m30 + m0310 * m31 - m0311 * m30 - m0110 * m33 - m0013 * m31);
		n[14] = -d * (m0011 * m23 + m0113 * m20 + m0310 * m21 - m0311 * m20 - m0110 * m23 - m0013 * m21);

		n[3]  = -d * (m10 * m2132 + m11 * m2230 + m12 * m2031 - m12 * m2130 - m11 * m2032 - m10 * m2231);
		n[7]  =  d * (m00 * m2132 + m01 * m2230 + m02 * m2031 - m02 * m2130 - m01 * m2032 - m00 * m2231);
		n[11] = -d * (m0011 * m32 + m0112 * m30 + m0210 * m31 - m0211 * m30 - m0110 * m32 - m0012 * m31);
		n[15] =  d * (m0011 * m22 + m0112 * m20 + m0210 * m21 - m0211 * m20 - m0110 * m22 - m0012 * m21);
		
		return true;
	},
	
	/**
	 * The inverse of m
	 * <p>using gauss-jordan elimination.</p>
	 * @param  {Matrix4} m The source
	 * @return {Boolean}
	 *	<p>returns true if m is not singular, false otherwise.</p>
	 */
	inverseGaussOf : function(m) {
		Matrix4.call(this);
		
		var a = m.n.slice(0), b = this.n, abs = Math.abs;
		
		for (var i = 0; i < 4; i++) {
			var row = i * 4, max = row;
			
			for (var j = i + 1; j < 4; j++) {
				if (abs(a[j * 4 + i]) > abs(a[max + i])) max = j * 4;
			}
			
			if (abs(a[max + i]) < 1.0e-10) return false;
			
			if (row != max) {
				a.splice(max, 4, a.splice(row, 4, a.slice(max, max + 4)));
				b.splice(max, 4, b.splice(row, 4, b.slice(max, max + 4)));
			}
			
			for (j = i + 1; j < 4; j++) {
				var cmp = j * 4;

				var n = a[cmp + i] / a[row + i];
				
				for (var col = i; col < 4; col++) {
					a[cmp + col] -= a[row + col] * n;
					b[cmp + col] -= b[row + col] * n;
				}
			}
		}
		
		for (i = 3; i > -1; i--) {
			row = i * 4;
			n = 1.0 / a[row + i];
			
			for (j = 0; j < i; j++) {
				cmp = j * 4;
				
				var an = a[cmp + i] * n;
				var bn = b[cmp + i] * n;
				
				for (col = 3; col >= i; col--) {
					a[cmp + col] -= a[row + col] * an;
					b[cmp + col] -= b[row + col] * bn;
				}
			}
			
			a[row + i] *= n;
			b[row + i] *= n;
		}
		
		this.n = b;
		return true;		
	},
	
	/**
	 * The transpose of m
	 * @param  {Matrix4} m The source
	 * @return {void}
	 */
	transposeOf : function(m) {
		this.n[4] = m.n[1];  this.n[8] = m.n[2];  this.n[12] = m.n[3];
		this.n[1] = m.n[4];  this.n[9] = m.n[6];  this.n[13] = m.n[7];
		this.n[2] = m.n[8];  this.n[6] = m.n[9];  this.n[14] = m.n[11];
		this.n[3] = m.n[12]; this.n[7] = m.n[13]; this.n[11] = m.n[14];
	},
	
	/**
	 * The copy of m
	 * @param  {Matrix4} m The source
	 * @return {void}
	 */
	copyOf : function(m) {
		this.n = m.n.slice(0, 16);
	},
	
	
	/**
	 * The 3x4 inverse of the instance
	 * <p>Components 3x are assumed to be (0, 0, 0, 1).</p>
	 * @return {Boolean}
	 *	<p>Returns false if the instance is assumed to be singular, true otherwise.</p>
	 */
	invert3x4 : function() {
		return this.inverse3x4Of(this);
	},
	
	/**
	 * The inverse of the instance
	 * <p>Using the adjoint method.</p>
	 * @return {Boolean} 
	 *	<p>Returns false if the instance is assumed to be singular, true otherwise.</p>
	 */
	invert : function() {
		return this.inverseOf(this);
	},
	
	/**
	 * The inverse of the instance
	 * <p>using gauss-jordan elimination.</p>
	 * @return {Boolean}
	 *	<p>Returns false if the instance is singular, true otherwise.</p>
	 */
	invertGauss : function() {
		var m = new Matrix4(this.n.slice(0));
		var inv = this.inverseGaussOf(m);
		if (!inv) this.n = m.n;
		return inv;
	},
	
	
	/**
	 * The transpose of the instance
	 * @return {void}
	 */
	transpose : function() {
		var m = new Matrix4(this.n.slice(0, 16));
		this.transposeOf(m);
	},
	
	
	/**
	 * Returns a string representation of the instance
	 * @return {String}
	 */
	toString : function() {
		var res = this.constructor;
		for (var i = 0; i < 16; i++) res += (i % 3.0 == 0.0 ? "\n" : "\t") + this.n[i];
		return res;
	}
};



/**
 * A instance of the 4x4 identity matrix
 * @static
 * @name IDENTITY
 * @memberOf Matrix4
 * @type Matrix4
 */
Object.defineProperty(Matrix4, 'IDENTITY', {
	get : function() {return new Matrix4();},
	enumerable : true,
	configurable : true
});


/**
 * Creates a instance from translation vector
 * @static
 * @param  {Vector3} v The source
 * @return {Matrix4}
 */
Matrix4.Translation = function(v) {
	var res = new Matrix4();
	var n = res.n, vn = v.n;

	n[12] = vn[0];
	n[13] = vn[1];
	n[14] = vn[2];

	return res;
};


/**
 * Creates a instance from axes (x, y, z) and translation (t)
 * @static
 * @param {Vector3}  x The x-axis vector
 * @param {Vector3}  y The y-axis vector
 * @param {Vector3}  z The z-axis vector
 * @param {Vector3}  t The translation vector
 * @return {Matrix4}
 */
Matrix4.Vector3 = function(x, y, z, t) {
	var n = [].concat(x.n, 0.0, y.n, 0.0, z.n, 0.0, t.n, 1.0);
	return new Matrix4(n);
};

/**
 * Creates a instance from m
 * <p>The instance will be padded to 4x4.</p>
 * @static
 * @param  {Matrix3} The source
 * @return {Matrix4}
 */
Matrix4.Matrix3 = function(m) {
	var n = m.n.concat([0.0, 0.0, 0.0, 0.0, 1.0]);
	n.splice(3, 0, 0.0);
	n.splice(7, 0, 0.0);
	
	return new Matrix4(n);
};


/**
 * Returns the sum of a and b (a+b)
 * @static
 * @param  {Matrix4} a The first summand
 * @param  {Matrix4} b The second summand
 * @return {Matrix4}
 */
Matrix4.add = function(a, b) {
	var res = new Matrix4();
	res.add(a, b);
	return res;
};

/**
 * Returns the difference of a and b (a-b)
 * @static
 * @param  {Matrix4} a The minuend
 * @param  {Matrix4} b The subtrahend
 * @return {Matrix4}
 */
Matrix4.subtract = function(a, b) {
	var res = new Matrix4();
	res.subtract(a, b);
	return res;
};

/**
 * Returns the 3x4 concatenation of a and v (a * Matrix4.Matrix3(Matrix3.Scale(v)))
 * <p>Components 3x are assumed to be (0, 0, 0, 1).</p>
 * @static
 * @param  {Matrix4} a The matrix
 * @param  {Vector3} v The vector
 * @return {Matrix4}
 */
Matrix4.multiply3x4Vector3Scale = function(m, v) {
	var res = new Matrix4();
	res.multiply3x4Vector3Scale(m, v);
	return res;
};

/**
 * Returns the 3x4 concatenation of a and b (a*b)
 * <p>Components 3x are assumed to be (0, 0, 0, 1).</p>
 * @static
 * @param  {Matrix4} a The first matrix
 * @param  {Matrix3} b The second matrix
 * @return {Matrix4}
 */
Matrix4.multiply3x4Matrix3 = function(a, b) {
	var res = new Matrix4();
	res.multiply3x4Matrix3(a, b);
	return res;
};

/**
 * Returns the 3x4 concatenation of a and b (a*b)
 * <p>Components 3x are assumed to be (0, 0, 0, 1).</p>
 * @static
 * @param  {Matrix4} a The first matrix
 * @param  {Matrix4} b The second matrix
 * @return {Matrix4}
 */
Matrix4.multiply3x4 = function(a, b) {
	var res = new Matrix4();
	res.multiply3x4(a, b);
	return res;
};

/**
 * Returns the concatenation of a and b (a*b)
 * @static
 * @param  {Matrix4} a The first matrix
 * @param  {Matrix4} b The second matrix
 * @return {Matrix4}
 */
Matrix4.multiply = function(a, b) {
	 var res = new Matrix4();
	 res.multiply(a, b);
	 return res;
};


/**
 * Returns the 3x4 inverse of m
 * <p>Components 3x will be assumed to be (0, 0, 0, 1).</p>
 * @static
 * @param  {Matrix4}        m The source
 * @return {Matrix4 | null} 
 *	<p>Returns null if m is assumed to be singular, the 3x4 inverse of m otherwise.</p>
 */
Matrix4.inverse3x4 = function(m) {
	var res = new Matrix4();
	return res.inverse3x4Of(m) ? res : null;
};

/**
 * Returns the inverse of m
 * <p>Using the adjoint method.</p>
 * @static
 * @param  {Matrix4}        m The source
 * @return {Matrix4 | null} 
 *	<p>Returns null if m is assumed to be singular, the 4x4 inverse of m otherwise.</p>
 */
Matrix4.inverse = function(m) {
	var res = new Matrix4();
	return res.inverseOf(this) ? res : null;
};

/**
 * Returns the inverse of m
 * <p>Using gauss-jordan elimination.</p>
 * @static
 * @param {Matrix4}       m The source
 * @return {Matrix4|null} 
 *	<p>Returns null if m is singular, the 4x4 inverse of m otherwise.</p>
 */
Matrix4.inverseGauss = function(m) {
	var res = new Matrix4();
	return res.inverseGaussOf(m) ? res : null;
};

/**
 * Returns the transpose of m
 * @static
 * @param  {Matrix4} m The source
 * @return {Matrix4}
 */
Matrix4.transpose = function(m) {
	var res = new Matrix4();
	res.transposeOf(m);
	return res;
};

/**
 * Creates a copy of m
 * @static
 * @param  {Matrix4} m The source
 * @return {Matrix4}
 */
Matrix4.copy = function(m) {
	return new Matrix4(m.n.slice(0, 16));
};


/**
 * Tests a and b for equality
 * @param {Matrix4}  a The first matrix
 * @param {Matrix4}  b The second matrix
 * @return {Boolean}
 */
Matrix4.isEQ = function(a, b) {
	var an = a.n, bn = b.n;
	
	for (var i = 0; i < 16; i++) {
		if (an[i] != bn[i]) return false;
	}
	
	return true;
};


/**
 * Returns the type-version string
 * @static
 * @return {String}
 */
Matrix4.toString = function() {return "[Matrix4-" + Matrix4.version + "]";};

/**
 * The version string
 * @constant
 * @static
 * @type String
 */
Matrix4.version = "0.9.11";