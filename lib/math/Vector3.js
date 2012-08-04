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
Vector3.dot = function(v, w) {
	return v.n[0] * w.n[0] + v.n[1] * w.n[1] + v.n[2] * w.n[2];
};

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