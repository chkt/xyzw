/**
 * Vector2
 * @class Two component vector
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n=[0.0, 0.0]] Array containing the two components of the vector
 */
function Vector2(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y</p>
	 * @type Float[]
	 */
	this.n = [];
	this.define(n);
}

/**
 * The prototype
 * @constant
 * @type Object
 */
Vector2.prototype = {
	
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Vector2,
	
	
	/**
	 * (Re)define the instance
	 * @param  {Float[]} [n=[0.0, 0.0]] Array containing the two components of the vector
	 * @return {void}
	 */
	define : function(n) {
		if (!n || n.constructor != Array || n.length != 2) this.n = [0.0, 0.0];
		else this.n = n;
	},


	/**
	 * The x component, n[0]
	 * @see Vector2#n
	 * @name x
	 * @memberOf Vector2#
	 * @type Float
	 */
	get x() {return this.n[0];},
	/**
	 * The y component, n[1]
	 * @see Vector2#n
	 * @name y
	 * @memberOf Vector2#
	 * @type Float
	 */
	get y() {return this.n[1];},
	
	/**
	 * The s component
	 * <p>Alt for Vector2.prototype.x.</p>
	 * @see Vector2#x
	 * @name s
	 * @memberOf Vector2#
	 * @type Float
	 */
	get s() {return this.n[0];},
	/**
	 * The t component
	 * <p>Alt for Vector2.prototype.y</p>
	 * @see Vector2#y
	 * @name t
	 * @memberOf Vector2#
	 * @type Float
	 */
	get t() {return this.n[1];},
	
	set x(n) {if (typeof n == 'number') this.n[0] = n;},
	set y(n) {if (typeof n == 'number') this.n[1] = n;},

	set s(n) {if (typeof n == 'number') this.n[0] = n;},
	set t(n) {if (typeof n == 'number') this.n[1] = n;},


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
	 * The norm
	 * <p>[readonly]</p>
	 * @name modulo
	 * @memberOf Vector2#
	 * @type {Float}
	 */
	get modulo() {
		var x = this.n[0], y = this.n[1];
		return Math.sqrt(x * x + y * y);
	},
	
	
	/**
	 * Normalize the instance
	 * @return {void}
	 */
	normalize : function() {
		var x = this.n[0], y = this.n[1];
		var norm = 1.0 / Math.sqrt(x * x + y * y);
		this.n[0] *= norm; this.n[1] *= norm;
	},

	
	/**
	 * The copy of v
	 * @param  {Vector2} v The source
	 * @return {void}
	 */
	copy : function(v) {this.n = v.n.slice(0, 2);},
	
	
	/**
	 * Returns the string representation of the instance
	 * @return {String}
	 */
	toString : function() {return Vector2 + " " + this.n[0] + "\t" + this.n[1];}
};


/**
 * Returns the resulting vector of triangle (v0,v1,v2) and barycentric coordinates (u,v)
 * @static
 * @param  {Vector2} v0 The first vector
 * @param  {Vector2} v1 The second vector
 * @param  {Vector2} v2 The third vector
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
Vector2.copy = function(v) {return new Vector2(v.n.slice(0, 2));};


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
Vector2.version = "0.9.1";




/**
 * Vector3
 * @class Three component vector
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n=[0.0, 0.0, 0.0]] Array containing the three components of the vector
 */
function Vector3(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y, n[2]:z</p>
	 * @type Float[]
	 */
	this.n = [];
	this.define(n);
}

/**
 * The prototype
 * @constant
 * @type Object 
 */
Vector3.prototype = {
		
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Vector3,
	
	
	/**
	 * (Re)define the instance
	 * @param  {Float[]} [n=[0.0, 0.0, 0.0]] Array containing the three components of the vector
	 * @return {void}
	 */
	define : function(n) {
		if (!n || n.constructor != Array || n.length != 3) this.n = [0.0, 0.0, 0.0];
		else this.n = n;
	},


	/**
	 * The x component, n[0]
	 * @see Vector3#n
	 * @name x
	 * @memberOf Vector3#
	 * @type Float
	 */
	get x() {return this.n[0];},
	/**
	 * The y component, n[1]
	 * @see Vector3#n
	 * @name y
	 * @memberOf Vector3#
	 * @type Float
	 */
	get y() {return this.n[1];},
	/**
	 * The z component, n[2]
	 * @see Vector3#n
	 * @name z
	 * @memberOf Vector3#
	 * @type Float
	 */
	get z() {return this.n[2];},
	
	/**
	 * The r component
	 * <p>Alt for Vector3.prototype.x.</p>
	 * @see Vector3#x
	 * @name r
	 * @memberOf Vector3#
	 * @type Float
	 */
	get r() {return this.n[0];},
	/**
	 * The g component
	 * <p>Alt for Vector3.prototype.y.</p>
	 * @see Vector3#y
	 * @name g
	 * @memberOf Vector3#
	 * @type Float
	 */
	get g() {return this.n[1];},
	/**
	 * The b component
	 * <p>Alt for Vector3.prototype.z.</p>
	 * @see Vector3#z
	 * @name b
	 * @memberOf Vector3#
	 * @type Float
	 */
	get b() {return this.n[2];},

	set x(n) {if (typeof n == 'number') this.n[0] = n;},
	set y(n) {if (typeof n == 'number') this.n[1] = n;},
	set z(n) {if (typeof n == 'number') this.n[2] = n;},

	set r(n) {if (typeof n == 'number') this.n[0] = n;},
	set g(n) {if (typeof n == 'number') this.n[1] = n;},
	set b(n) {if (typeof n == 'number') this.n[2] = n;},
	
	
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
	 * The difference between v and w (v-w)
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
	 * The 3x3 transformation of v (m*v)
	 * @param {Matrix4} m The 3x3 transform
	 * @param {Vector3} v The vector
	 * @return {void}
	 */
	multiply3x3Matrix4 : function(m, v) {
		var x = v.n[0];
		var y = v.n[1];
		var z = v.n[2];
		
		this.n[0] = x * m.n[0] + y * m.n[4] + z * m.n[8];
		this.n[1] = x * m.n[1] + y * m.n[5] + z * m.n[9];
		this.n[2] = x * m.n[2] + y * m.n[6] + z * m.n[10];
	},
	
	/**
	 * The 3x4 transformation of v (m*v)
	 * @param  {Matrix4} m The 3x4 transform
	 * @param  {Vector3} v The vector
	 * @return {void}
	 */
	multiplyMatrix4 : function(m, v) {
		var x = v.n[0];
		var y = v.n[1];
		var z = v.n[2];
		
		this.n[0] = x * m.n[0] + y * m.n[4] + z * m.n[8]  + m.n[12];
		this.n[1] = x * m.n[1] + y * m.n[5] + z * m.n[9]  + m.n[13];
		this.n[2] = x * m.n[2] + y * m.n[6] + z * m.n[10] + m.n[14];
	},
	
	/**
	 * The 4x4 transformation of v (m*v)
	 * @param  {Matrix4} m The 4x4 transform
	 * @param  {Vector3} v The vector
	 * @return {void}
	 */
	multiply4x4Matrix4 : function(m, v) {
		var x = v.n[0];
		var y = v.n[1];
		var z = v.n[2];
		var w = 1.0 / (x * m.n[3] + y * m.n[7] + z * m.n[11] + m.n[15]);
		
		this.n[0] = (x * m.n[0] + y * m.n[4] + z * m.n[8]  + m.n[12]) * w;
		this.n[1] = (x * m.n[1] + y * m.n[5] + z * m.n[9]  + m.n[13]) * w;
		this.n[2] = (x * m.n[2] + y * m.n[6] + z * m.n[10] + m.n[14]) * w;
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
	 * The norm
	 * <p>[readonly]</p>
	 * @name modulo
	 * @memberOf Vector3#
	 * @type Float
	 */
	get modulo() {
		var x = this.n[0], y = this.n[1], z = this.n[2];
		return Math.sqrt(x * x + y * y + z * z);
	},
	
	/**
	 * The square of the norm (norm*norm)
	 * <p>[readonly]</p>
	 * @name moduloSquared
	 * @memberOf Vector3#
	 * @type Float
	 */
	get moduloSquared() {
		var x = this.n[0], y = this.n[1], z = this.n[2];
		return x * x + y * y + z * z;
	},


	/**
	 * Tests if norm is less than n (norm&lt;n)
	 * @param  {Float}   n The scalar to test against
	 * @return {Boolean}   True if norm is less than n, false otherwise
	 */
	isModuloLT : function(n) {return this.moduloSquared < n * n;},

	/**
	 * Tests if norm is more than n (norm&gt;n)
	 * @param  {Float}   n The scalar to test against
	 * @return {Boolean}   True if norm is more than n, false otherwise
	 */
	isModuloGT : function(n) {return this.moduloSquared > n * n;},

	/**
	 * Tests if norm equals n (norm==n)
	 * @param  {Float}   n The scalar to test against
	 * @return {Boolean}   True if norm equals n, false otherwise
	 */
	isModuloEQ : function(n) {return this.moduloSquared == n * n;},

	
	/**
	 * Normalize the instance
	 * @return {void}
	 */
	normalize : function() {
		var x = this.n[0], y  = this.n[1], z = this.n[2];
		var mod = Math.sqrt(x * x + y * y + z * z);

		if (mod == 0.0 || mod == 1.0) return;

		mod = 1.0 / mod;
		this.n[0] *= mod; this.n[1] *= mod; this.n[2] *= mod;
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
	 * The copy of v
	 * @param  {Vector3} v The source
	 * @return {void}
	 */
	copy : function(v) {this.n = v.n.slice(0, 3);},


	/**
	 * Returns the string representation of the instance
	 * @return {String}
	 */
	toString : function() {return this.constructor + " " + this.n[0] + "\t" + this.n[1] + "\t" + this.n[2];}
};


/**
 * Instance of the zero vector (0.0, 0.0, 0.0)
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
 * Instance of the x-axis vector (1.0, 0.0, 0.0)
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
 * Instance of the y-axis vector (0.0, 1.0, 0.0)
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
 * Instance of the z-axis vector (0.0, 0.0, 1.0)
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
 * @param  {Vector3} v0 The first vector
 * @param  {Vector3} v1 The second vector
 * @param  {Vector3} v2 The third vector
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
 * Returns the 3x3 transformation of v (m*v)
 * @static
 * @param  {Matrix4} m The 3x3 transform
 * @param  {Vector3} v The vector
 * @return {Vector3}
 */
Vector3.multiply3x3Matrix4 = function(m, v) {
	var res = new Vector3();
	res.multiplyMatrix3x3(m, v);
	return res;
}

/**
 * Returns the 3x4 transformation of v (m*v)
 * @static
 * @param  {Matrix4} m The 3x4 transform
 * @param  {Vector3} v The vector
 * @return {Vector3}
 */
Vector3.multiplyMatrix4 = function(m, v) {
	var res = new Vector3();
	res.multiplyMatrix4(m, v);
	return res;
};

/**
 * Returns the 4x4 transformation of v (m*v)
 * @static
 * @param  {Matrix4} m The 4x4 transform
 * @param  {Vector3} v The vector
 * @return {Vector3}
 */
Vector3.multiply4x4Matrix4 = function(m, v) {
	var res = new Vector3();
	res.multiplyMatrix4x4(m, v);
	return res;
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
 * Creates a copy of v
 * @param  {Vector3} v The source
 * @return {Vector3}
 */
Vector3.copy = function(v) {return new Vector3(v.n.slice(0));};


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
Vector3.version = "0.9.9";




/**
 * Vector4
 * @class Four component vector aka quaternion
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n=[0.0, 0.0, 0.0, 1.0]] Array containing the four components of the vector
 */
function Vector4(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y, n[2]:z, n[3]:w</p>
	 */
	this.n = [];
	this.define(n);
}

/**
 * The prototype
 * @constant
 * @type Object
 */
Vector4.prototype = {
	
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Vector4,
	
	
	/**
	 * (Re)define the instance
	 * @param  {Float[]} [n=[0.0, 0.0, 0.0, 1.0]] Array containing the four components of the vector
	 * @return {void}
	 */
	define : function(n) {
		if (!n || n.constructor != Array || n.length != 4) this.n = [0.0, 0.0, 0.0, 1.0];
		this.n = n;		
	},
	
	
	/**
	 * The x component, n[0]
	 * @see Vector4#n
	 * @name x
	 * @memberOf Vector4#
	 * @type Float
	 */
	get x() {return this.n[0];},
	/**
	 * The y component, n[1]
	 * @see Vector4#n
	 * @name y
	 * @memberOf Vector4#
	 * @type Float
	 */
	get y() {return this.n[1];},
	/**
	 * The z component, n[2]
	 * @see Vector4#n
	 * @name z
	 * @memberOf Vector4#
	 * @type Float
	 */
	get z() {return this.n[2];},
	/**
	 * The w component, n[3]
	 * @see Vector4#n
	 * @name w
	 * @memberOf Vector4#
	 * @type Float
	 */
	get w() {return this.n[3];},
	
	/**
	 * The r component
	 * <p>Alt for Vector4.prototype.x.</p>
	 * @see Vector4#x
	 * @name r
	 * @memberOf Vector4#
	 * @type Float
	 */
	get r() {return this.n[0];},
	/**
	 * The g component
	 * <p>Alt for Vector4.prototype.y</p>
	 * @see Vector4#y
	 * @name g
	 * @memberOf Vector4#
	 * @type Float
	 */
	get g() {return this.n[1];},
	/**
	 * The b component
	 * <p>Alt for Vector4.prototype.z</p>
	 * @see Vector4#z
	 * @name b
	 * @memberOf Vector4#
	 * @type Float
	 */
	get b() {return this.n[2];},
	/**
	 * The a component
	 * <p>Alt for Vector4.prototype.w</p>
	 * @see Vector4#w
	 * @name a
	 * @memberOf Vector4#
	 * @type Float
	 */
	get a() {return this.n[3];},

	set x(n) {if (typeof n == 'number') this.n[0] = n;},
	set y(n) {if (typeof n == 'number') this.n[1] = n;},
	set z(n) {if (typeof n == 'number') this.n[2] = n;},
	set w(n) {if (typeof n == 'number') this.n[3] = n;},

	set r(n) {if (typeof n == 'number') this.n[0] = n;},
	set g(n) {if (typeof n == 'number') this.n[1] = n;},
	set b(n) {if (typeof n == 'number') this.n[2] = n;},
	set a(n) {if (typeof n == 'number') this.n[3] = n;},
	
	
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
	 * The Scalar product of q and n (q*n)
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
	 * Normalize the instance
	 * @return {void}
	 */
	normalize : function() {
		var x = this.n[0], y = this.n[1], z = this.n[2], w = this.n[3];
		var norm = 1.0 / Math.sqrt(x * x + y * y + z * z + w * w);
		this.n[0] *= norm; this.n[1] *= norm; this.n[2] *= norm;
	},
	
	
	/**
	 * The copy of q
	 * @param  {Vector4} q The source
	 * @return {void}
	 */
	copy : function(q) {this.n = q.n.slice(0, 4);},
	
	
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
	toString : function() {return Quaternion + " " + this.n[0] + "\t" + this.n[1] + "\t" + this.n[2] + "\t" + this.n[3];}
}


/**
 * Instance of the identity vector (0.0, 0.0, 0.0, 1.0)
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
 * Create a unit-quaternion instance from a rotation matrix
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
 * Create an instance from Vector3
 * @static
 * @param  {Vector3} v The source
 * @return {Vector4}
 */
Vector4.Vector3 = function(v) {return new Vector4(v.n.concat(1.0));};

/**
 * Create a unit-quaternion instance from axis and rotation
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
 * Create a unit-quaternion instance from Spherical Linear intERPolation
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
 * Returns a copy of q
 * @static
 * @param  {Vector4} q The source
 * @return {Vector4}
 */
Vector4.copy = function(q) {return new Vector4(q.n.slice(0, 4));};


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
Vector4.version = "0.5.0";




/**
 * Matrix4
 * @class 3x3, 3x4 and 4x4 transforms
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array containing the 3x3, 3x4 or 4x4 components of the matrix in column-major order
 */
function Matrix4(n) {
	/**
	 * The array representation
	 * <p>The array contains the 16 components of the instance in column-major order.</p>
	 * <p>n[0]:n00 n[4]:n01 n[8] :n02 n[12]:n03</p>
	 * <p>n[1]:n10 n[5]:n11 n[9] :n12 n[13]:n13</p>
	 * <p>n[2]:n20 n[6]:n21 n[10]:n22 n[14]:n23</p>
	 * <p>n[3]:n30 n[7]:n31 n[11]:n32 n[15]:n33</p> 
	 * @type Float[]
	 */
	this.n = [];
	this.define(n);
}

/**
 * The prototype
 * @constant
 * @type Object
 */
Matrix4.prototype = {
	
	/**
	 * The constructor
	 * @constant
	 * @type Function
	 */
	constructor : Matrix4,

	
	/**
	 * (Re)define the instance
	 * @param  {Float[]} [n] Array containing the 3x3, 3x4 or 4x4 components of the Matrix, in column-major order
	 *                       <p>Arrays containing 3x3 or 3x4 components will be spliced to 4x4 format, other sizes will be ignored and the 4x4 identity matrix created instead.</p>
	 * @return {void}
 	 */
	define : function(n) {
		if (!n || n.constructor != Array) n = [];
		
		switch (n.length) {
			case 16 : break;
			
			case 12 :
				n.splice( 3, 0, 0.0);
				n.splice( 7, 0, 0.0);
				n.splice(11, 0, 0.0);
				n.splice(15, 0, 1.0);
				break;
			
			case  9 :
				n.splice( 3, 0, 0.0);
				n.splice( 7, 0, 0.0);
				n.splice(11, 0, 0.0, 0.0, 0.0, 0.0, 1.0);
				break;
			
			default :
				n.splice(0, n.length, 
					1.0, 0.0, 0.0, 0.0,
					0.0, 1.0, 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					0.0, 0.0, 0.0, 1.0
				);
		}
		
		this.n = n;
	},
	
	
	/**
	 * row 0, col 0, n[0]
	 * @see Matrix4#n
	 * @name n00
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n00() {return this.n[0];},
	/**
	 * row 0, col 1, n[4]
	 * @see Matrix4#n
	 * @name n01
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n01() {return this.n[4];},
	/**
	 * row 0, col 2, n[8]
	 * @see Matrix4#n
	 * @name n02
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n02() {return this.n[8];},
	/**
	 * row 0, col 3, n[12]
	 * @see Matrix4#n
	 * @name n03
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n03() {return this.n[12];},
	/**
	 * row 1, col0, n[1]
	 * @see Matrix4#n
	 * @name n10
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n10() {return this.n[1];},
	/**
	 * row 1, col1, n[5]
	 * @see Matrix4#n
	 * @name n11
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n11() {return this.n[5];},
	/**
	 * row 1, col2, n[9]
	 * @see Matrix4#n
	 * @name n12
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n12() {return this.n[9];},
	/**
	 * row 1, col3, n[13]
	 * @see Matrix4#n
	 * @name n13
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n13() {return this.n[13];},
	/**
	 * row2, col0, n[2]
	 * @see Matrix4#n
	 * @name n20
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n20() {return this.n[2];},
	/**
	 * row 2, col1, n[6]
	 * @see Matrix4#n
	 * @name n21
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n21() {return this.n[6];},
	/**
	 * row 2, col2, n[10]
	 * @see Matrix4#n
	 * @name n22
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n22() {return this.n[10];},
	/**
	 * row 2, col3, n[14]
	 * @see Matrix4#n
	 * @name n23
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n23() {return this.n[14];},
	/**
	 * row 3, col0, n[3]
	 * @see Matrix4#n
	 * @name n30
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n30() {return this.n[3];},
	/**
	 * row 3, col1, n[7]
	 * @see Matrix4#n
	 * @name n31
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n31() {return this.n[7];},
	/**
	 * row 3, col2, n[11]
	 * @see Matrix4#n
	 * @name n32
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n32() {return this.n[11];},
	/**
	 * row 3, col3, n[15]
	 * @see Matrix4#n
	 * @name n33
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get n33() {return this.n[15];},

	set n00(n) {if (typeof n == 'number') this.n[0]  = n;},
	set n01(n) {if (typeof n == 'number') this.n[4]  = n;},
	set n02(n) {if (typeof n == 'number') this.n[8]  = n;},
	set n03(n) {if (typeof n == 'number') this.n[12] = n;},
	set n10(n) {if (typeof n == 'number') this.n[1]  = n;},
	set n11(n) {if (typeof n == 'number') this.n[5]  = n;},
	set n12(n) {if (typeof n == 'number') this.n[9]  = n;},
	set n13(n) {if (typeof n == 'number') this.n[13] = n;},
	set n20(n) {if (typeof n == 'number') this.n[2]  = n;},
	set n21(n) {if (typeof n == 'number') this.n[6]  = n;},
	set n22(n) {if (typeof n == 'number') this.n[10] = n;},
	set n23(n) {if (typeof n == 'number') this.n[14] = n;},
	set n30(n) {if (typeof n == 'number') this.n[3]  = n;},
	set n31(n) {if (typeof n == 'number') this.n[7]  = n;},
	set n32(n) {if (typeof n == 'number') this.n[11] = n;},
	set n33(n) {if (typeof n == 'number') this.n[15] = n;},
	
	
	/**
	 * The 4x4 sum of a and b (a+b)
	 * @param  {Matrix4} a The first summand
	 * @param  {Matrix4} b The second summand
	 * @return {void}
	 */
	add : function(a, b) {for (var i = 0; i < 16; i++) this.n[i] = a.n[i] + b.n[i];},
	
	/**
	 * The 4x4 difference of a and b (a-b)
	 * @param  {Matrix4} a The minuend
	 * @param  {Matrix4} b The subtrahend
	 * @return {void}
	 */
	subtract : function(a, b) {for (var i = 0; i < 16; i++) this.n[i] = a.n[i] - b.n[i];},
	
	/**
	 * The 3x3 concatenation of a and b (a*b)
	 * <p>Components outside the 3x3 range will be ignored.</p>
	 * @param  {Matrix4} a The first transform
	 * @param  {Matrix4} b The second transform
	 * @return {void}
	 */
	multiply3x3 : function(a, b) {		
		var a00 = a.n[0], a01 = a.n[4], a02 = a.n[8];
		var a10 = a.n[1], a11 = a.n[5], a12 = a.n[9];
		var a20 = a.n[2], a21 = a.n[6], a22 = a.n[10];

		var b00 = b.n[0], b01 = b.n[4], b02 = b.n[8];
		var b10 = b.n[1], b11 = b.n[5], b12 = b.n[9];
		var b20 = b.n[2], b21 = b.n[6], b22 = b.n[10];

		this.n[0]  = a00 * b00 + a01 * b10 + a02 * b20;
		this.n[4]  = a00 * b01 + a01 * b11 + a02 * b21;
		this.n[8]  = a00 * b02 + a01 * b12 + a02 * b22;

		this.n[1]  = a10 * b00 + a11 * b10 + a12 * b20;
		this.n[5]  = a10 * b01 + a11 * b11 + a12 * b21;
		this.n[9]  = a10 * b02 + a11 * b12 + a12 * b22;

		this.n[2]  = a20 * b00 + a21 * b10 + a22 * b20;
		this.n[6]  = a20 * b01 + a21 * b11 + a22 * b21;
		this.n[10] = a20 * b02 + a21 * b12 + a22 * b22;
	},
	
	/**
	 * The 3x4 concatenation of a and b (a*b)
	 * <p>Components outside the 3x4 range will be ignored.</p>
	 * @param  {Matrix4} a The first transform
	 * @param  {Matrix4} b The second transform
	 * @return {void}
	 */
	multiply : function(a, b) {
		var a00 = a.n[0], a01 = a.n[4], a02 = a.n[8],  a03 = a.n[12];
		var a10 = a.n[1], a11 = a.n[5], a12 = a.n[9],  a13 = a.n[13];
		var a20 = a.n[2], a21 = a.n[6], a22 = a.n[10], a23 = a.n[14];
		
		var b00 = b.n[0], b01 = b.n[4], b02 = b.n[8],  b03 = b.n[12];
		var b10 = b.n[1], b11 = b.n[5], b12 = b.n[9],  b13 = b.n[13];
		var b20 = b.n[2], b21 = b.n[6], b22 = b.n[10], b23 = b.n[14];
		
		this.n[0]  = a00 * b00 + a01 * b10 + a02 * b20;
		this.n[4]  = a00 * b01 + a01 * b11 + a02 * b21;
		this.n[8]  = a00 * b02 + a01 * b12 + a02 * b22;
		this.n[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03;
		
		this.n[1]  = a10 * b00 + a11 * b10 + a12 * b20;
		this.n[5]  = a10 * b01 + a11 * b11 + a12 * b21;
		this.n[9]  = a10 * b02 + a11 * b12 + a12 * b22;
		this.n[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13;
		
		this.n[2]  = a20 * b00 + a21 * b10 + a22 * b20;
		this.n[6]  = a20 * b01 + a21 * b11 + a22 * b21;
		this.n[10] = a20 * b02 + a21 * b12 + a22 * b22;
		this.n[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23;
	},
	
	/**
	 * The 4x4 concatenation of a and b (a*b)
	 * @param {Matrix4} a The first transform
	 * @param {Matrix4} b The second transform
	 * @return {void}
	 */
	multiply4x4 : function(a, b) {		
		var a00 = a.n[0], a01 = a.n[4], a02 = a.n[8],  a03 = a.n[12];
		var a10 = a.n[1], a11 = a.n[5], a12 = a.n[9],  a13 = a.n[13];
		var a20 = a.n[2], a21 = a.n[6], a22 = a.n[10], a23 = a.n[14];
		var a30 = a.n[3], a31 = a.n[7], a32 = a.n[11], a33 = a.n[15];
		
		var b00 = b.n[0], b01 = b.n[4], b02 = b.n[8],  b03 = b.n[12];
		var b10 = b.n[1], b11 = b.n[5], b12 = b.n[9],  b13 = b.n[13];
		var b20 = b.n[2], b21 = b.n[6], b22 = b.n[10], b23 = b.n[14];
		var b30 = b.n[3], b31 = b.n[7], b32 = b.n[11], b33 = b.n[15];
		
		this.n[0]  = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
		this.n[4]  = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
		this.n[8]  = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
		this.n[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
		
		this.n[1]  = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
		this.n[5]  = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
		this.n[9]  = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
		this.n[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
		
		this.n[2]  = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
		this.n[6]  = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
		this.n[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
		this.n[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
		
		this.n[3]  = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
		this.n[7]  = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
		this.n[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
		this.n[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
	},


	/**
	 * The 3x3 inverse of m
	 * <p>Components outside the 3x3 range will be ignored.</p>
	 * @param  {Matrix4} m The 3x3 source
	 * @return {void}
	 */
	inverse3x3Of : function(m) {
		var d = m.determinant;
		
		if (Math.abs(d) < 1.0e-10) return;
		
		d = 1.0 / d;
		
		var m00 = m.n[0], m01 = m.n[4], m02 = m.n[8];
		var m10 = m.n[1], m11 = m.n[5], m12 = m.n[9];
		var m20 = m.n[2], m21 = m.n[6], m22 = m.n[10];
		
		this.n[0]  =  d * (m11 * m22 - m12 * m21);
		this.n[4]  = -d * (m01 * m22 - m02 * m21);
		this.n[8]  =  d * (m01 * m12 - m02 * m11);
		this.n[12] =  0.0;
		
		this.n[1]  = -d * (m10 * m22 - m12 * m20);
		this.n[5]  =  d * (m00 * m22 - m02 * m20);
		this.n[9]  = -d * (m00 * m12 - m02 * m10);
		this.n[13] =  0.0;
		
		this.n[2]  =  d * (m10 * m21 - m11 * m20);
		this.n[6]  = -d * (m00 * m21 - m01 * m20);
		this.n[10] =  d * (m00 * m11 - m01 * m10);
		this.n[14] =  0.0;
		
		this.n[3]  =  0.0;
		this.n[7]  =  0.0;
		this.n[11] =  0.0;
		this.n[15] =  1.0;
	},
	
	/**
	 * The 3x4 inverse of m
	 * <p>Components outside the 3x4 range will be ignored.</p>
	 * @param  {Matrix4} m The 3x4 source
	 * @return {void}
	 */
	inverseOf : function(m) {
		var d = m.determinant;
		
		if (Math.abs(d) < 1.0e-10) return;
		
		d = 1.0 / d;
		
		var m00 = m.n[0], m01 = m.n[4], m02 = m.n[8],  m03 = m.n[12];
		var m10 = m.n[1], m11 = m.n[5], m12 = m.n[9],  m13 = m.n[13];
		var m20 = m.n[2], m21 = m.n[6], m22 = m.n[10], m23 = m.n[14];
		
		this.n[0]  =  d * (m11 * m22 - m12 * m21);
		this.n[4]  = -d * (m01 * m22 - m02 * m21);
		this.n[8]  =  d * (m01 * m12 - m02 * m11);
		this.n[12] = -d * (m01 * (m12 * m23 - m13 * m22) + m02 * (m13 * m21 - m11 * m23) + m03 * (m11 * m22 - m12 * m21));
		
		this.n[1]  = -d * (m10 * m22 - m12 * m20);
		this.n[5]  =  d * (m00 * m22 - m02 * m20);
		this.n[9]  = -d * (m00 * m12 - m02 * m10);
		this.n[13] =  d * (m00 * (m12 * m23 - m13 * m22) + m02 * (m13 * m20 - m10 * m23) + m03 * (m10 * m22 - m12 * m20));
		
		this.n[2]  =  d * (m10 * m21 - m11 * m20);
		this.n[6]  = -d * (m00 * m21 - m01 * m20);
		this.n[10] =  d * (m00 * m11 - m01 * m10);
		this.n[14] = -d * (m00 * (m11 * m23 - m13 * m21) + m01 * (m13 * m20 - m10 * m23) + m03 * (m10 * m21 - m11 * m20));
		
		this.n[3]  =  0.0;
		this.n[7]  =  0.0;
		this.n[11] =  0.0;
		this.n[15] =  1.0;
	},
	
	/**
	 * The 4x4 inverse of m
	 * @param  {Matrix4} m The source
	 * @return {void}
	 */
	inverse4x4Of : function(m) {
		var d = m.determinant4x4;

		if (Math.abs(d) < 1.0e-10) return;

		d = 1.0 / d;

		var m00 = m.n[0], m01 = m.n[4], m02 = m.n[8],  m03 = m.n[12];
		var m10 = m.n[1], m11 = m.n[5], m12 = m.n[9],  m13 = m.n[13];
		var m20 = m.n[2], m21 = m.n[6], m22 = m.n[10], m23 = m.n[14];
		var m30 = m.n[3], m31 = m.n[7], m32 = m.n[11], m33 = m.n[15];

		var m0011 = m00 * m11, m0112 = m01 * m12, m0213 = m02 * m13, m0310 = m03 * m10;
		var m2031 = m20 * m31, m2132 = m21 * m32, m2233 = m22 * m33, m2330 = m23 * m30;

		var m0312 = m03 * m12, m0211 = m02 * m11, m0110 = m01 * m10, m0013 = m00 * m13;
		var m2332 = m23 * m32, m2231 = m22 * m31, m2130 = m21 * m30, m2033 = m20 * m33;

		var m0012 = m00 * m12, m0113 = m01 * m13, m0210 = m02 * m10, m0311 = m03 * m11;
		var m2032 = m20 * m32, m2133 = m21 * m33, m2230 = m22 * m30, m2331 = m23 * m31;

		//m[ij] = 1 / d * (-1)^(i + j) * det(adj(m[ji]));
		this.n[0]  =  d * (m11 * m2233 + m12 * m2331 + m13 * m2132 - m13 * m2231 - m12 * m2133 - m11 * m2332);
		this.n[4]  = -d * (m01 * m2233 + m02 * m2331 + m03 * m2132 - m03 * m2231 - m02 * m2133 - m01 * m2332);
		this.n[8]  =  d * (m0112 * m33 + m0213 * m31 + m0311 * m32 - m0312 * m31 - m0211 * m33 - m0113 * m32);
		this.n[12] = -d * (m0112 * m23 + m0213 * m21 + m0311 * m22 - m0312 * m21 - m0211 * m23 - m0113 * m22);

		this.n[1]  = -d * (m10 * m2233 + m12 * m2330 + m13 * m2032 - m13 * m2230 - m12 * m2033 - m10 * m2332);
		this.n[5]  =  d * (m00 * m2233 + m02 * m2330 + m03 * m2032 - m03 * m2230 - m02 * m2033 - m00 * m2332);
		this.n[9]  = -d * (m0012 * m33 + m0213 * m30 + m0310 * m32 - m0312 * m30 - m0210 * m33 - m0013 * m32);
		this.n[13] =  d * (m0012 * m23 + m0213 * m20 + m0310 * m22 - m0312 * m20 - m0210 * m23 - m0013 * m22);

		this.n[2]  =  d * (m10 * m2133 + m11 * m2330 + m13 * m2031 - m13 * m2130 - m11 * m2033 - m10 * m2331);
		this.n[6]  = -d * (m00 * m2133 + m01 * m2330 + m03 * m2031 - m03 * m2130 - m01 * m2033 - m00 * m2331);
		this.n[10] =  d * (m0011 * m33 + m0113 * m30 + m0310 * m31 - m0311 * m30 - m0110 * m33 - m0013 * m31);
		this.n[14] = -d * (m0011 * m23 + m0113 * m20 + m0310 * m21 - m0311 * m20 - m0110 * m23 - m0013 * m21);

		this.n[3]  = -d * (m10 * m2132 + m11 * m2230 + m12 * m2031 - m12 * m2130 - m11 * m2032 - m10 * m2231);
		this.n[7]  =  d * (m00 * m2132 + m01 * m2230 + m02 * m2031 - m02 * m2130 - m01 * m2032 - m00 * m2231);
		this.n[11] = -d * (m0011 * m32 + m0112 * m30 + m0210 * m31 - m0211 * m30 - m0110 * m32 - m0012 * m31);
		this.n[15] =  d * (m0011 * m22 + m0112 * m20 + m0210 * m21 - m0211 * m20 - m0110 * m22 - m0012 * m21);
	},
	
	/**
	 * The 3x3 transpose of m
	 * <p>Components outside the 3x3 range will be ignored.</p>
	 * @param  {Matrix4} m The 3x3 source
	 * @return {void}
	 */
	transpose3x3Of : function(m) {
		this.n[4] = m.n[1]; this.n[8] = m.n[2];
		this.n[1] = m.n[4]; this.n[9] = m.n[6];
		this.n[2] = m.n[8]; this.n[6] = m.n[9];
	},
	
	/**
	 * The 4x4 transpose of m
	 * @param  {Matrix4} m The 4x4 source
	 * @return {void}
	 */
	transposeOf : function(m) {
		this.n[4] = m.n[1];  this.n[8] = m.n[2];  this.n[12] = m.n[3];
		this.n[1] = m.n[4];  this.n[9] = m.n[6];  this.n[13] = m.n[7];
		this.n[2] = m.n[8];  this.n[6] = m.n[9];  this.n[14] = m.n[11];
		this.n[3] = m.n[12]; this.n[7] = m.n[13]; this.n[11] = m.n[14];
	},


	/**
	 * The 3x3 determinant
	 * <p>Components outside the 3x3 range will be ignored.</p>
	 * @name determinant
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get determinant() {
		var n10 = this.n[1], n11 = this.n[5], n12 = this.n[9];
		var n20 = this.n[2], n21 = this.n[6], n22 = this.n[10];
		return this.n[0] * (n11 * n22 - n12 * n21) + this.n[4] * (n12 * n20 - n10 * n22) + this.n[8] * (n10 * n21 - n11 * n20);
	},
	
	/**
	 * The 4x4 determinant
	 * @name determinant4x4
	 * @memberOf Matrix4#
	 * @type Float
	 */
	get determinant4x4() {
		var n10 = this.n[1], n11 = this.n[5], n12 = this.n[9],  n13 = this.n[13];
		var n30 = this.n[3], n31 = this.n[7], n32 = this.n[11], n33 = this.n[15];
		return this.n[0] * this.n[10] * (n11 * n33 - n13 * n31) + this.n[4] * this.n[14] * (n12 * n30 - n10 * n32) + this.n[8] * this.n[2] * (n13 * n31 - n11 * n33) + this.n[12] * this.n[6] * (n10 * n32 - n12 * n30);
	},


	/**
	 * The 3x3 copy of m
	 * <p>Components outside the 3x3 range will be ignored.</p>
	 * @param  {Matrix4} m The 3x3 source
	 * @return {void}
	 */
	copy3x3 : function(m) {
		this.n = m.n.slice(0, 16);
		this.n.splice(12, 4, 0.0, 0.0, 0.0, 1.0);
		return this;
	},
	
	/**
	 * The 4x4 copy of m
	 * @param  {Matrix4} m The 4x4 source
	 * @return {void}
	 */
	copy : function(m) {
		this.n = m.n.slice(0, 16);
		return this;
	},

	
	/**
	 * The 3x3 inverse of the instance
	 * <p>Components outside the 3x3 range will be ignored.</p>
	 * @return {void}
	 */
	invert3x3 : function() {
		var m = new Matrix4(this.n);
		this.inverse3x3Of(m);
	},
	
	/**
	 * The 3x4 inverse of the instance
	 * <p>Components outside the 3x4 range will be ignored.</p>
	 * @return {void}
	 */
	invert : function() {
		var m = new Matrix4(this.n);
		this.inverseOf(m);
	},
	
	/**
	 * The 4x4 inverse of the instance
	 * @return {void}
	 */
	invert4x4 : function() {
		var m = new Matrix4(this.n);
		this.inverse4x4Of(m);
	},

	
	/**
	 * The 3x3 transpose of the instance
	 * <p>Components outside the 3x3 range will be ignored.</p>
	 * @return {void}
	 */
	transpose3x3 : function() {
		var m = new Matrix4(this.n.slice(0, 12));
		this.transpose3x3Of(m);
	},
	
	/**
	 * The 4x4 transpose of the instance
	 * @return {void}
	 */
	transpose : function() {
		var m = new Matrix4(this.n.slice(0, 16));
		this.transposeOf(m);
	},
	
	
	/**
	 * Returns the euler angles of the instance in order (y,x,z)
	 * @return {Float[x, y, z]}
	 */
	toEulerYXZ : function() {
		var x = Math.asin(-this.n[9]);
		
		if (Math.abs(this.n[9]) != 1.0) {
			var y = Math.atan2(this.n[8], this.n[10]);
			var z = Math.atan2(this.n[1], this.n[5]);
		} else {
			y = Math.atan2(this.n[4], this.n[0]);
			z = 0.0;
		}
		
		return [x, y, z];
	},
	
	/**
	 * Returns the euler angles of the instance in order (z,x,y)
	 * @return {Float[x, y, z]}
	 */
	toEulerZXY : function() {
		var x = Math.asin(this.n[6]);
		
		if (Math.abs(this.n[6]) != 1.0) { 
			var y = Math.atan2(-this.n[2], this.n[10]);
			var z = Math.atan2(-this.n[4], this.n[5]);
		} else {
			y = 0.0;
			z = Math.atan2(this.n[1], this.n[0])
		}
		
		return [x, y, z];		
	},
	
	
	/**
	 * Returns the string representation of the instance
	 * @return {String}
	 */
	toString : function() {
		var res = Matrix4 + "\n";

		res += this.n[0] + "\t" + this.n[4] + "\t" + this.n[8]  + "\t" + this.n[12] + "\n";
		res += this.n[1] + "\t" + this.n[5] + "\t" + this.n[9]  + "\t" + this.n[13] + "\n";
		res += this.n[2] + "\t" + this.n[6] + "\t" + this.n[10] + "\t" + this.n[14] + "\n";
		res += this.n[3] + "\t" + this.n[7] + "\t" + this.n[11] + "\t" + this.n[15];

		return res;
	}
};


/**
 * Instance of the 4x4 identity matrix
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
 * Creates a 3x3 instance from axis and rotation
 * @static
 * @param  {Vector3} axis The rotation axis
 * @param  {Float}   rad  The rotation in radians
 * @return {Matrix4}
 */
Matrix4.Rotation = function(axis, rad) {
	var res = new Matrix4();
	
	var x = axis.n[0], y = axis.n[1], z = axis.n[2];
	var sin = Math.sin(rad), cos = Math.cos(rad), vers = 1.0 - cos;
	
	var xSin = x * sin, ySin = y * sin, zSin = z * sin;
	var xyVers = x * y * vers, xzVers = x * z * vers, yzVers = y * z * vers;
	
	res.n[0] = cos + vers * x * x; res.n[4] = xyVers - zSin;      res.n[8]  = xzVers + ySin;
	res.n[1] = xyVers + zSin;      res.n[5] = cos + vers * y * y; res.n[9]  = yzVers - xSin;
	res.n[2] = xzVers - ySin;      res.n[6] = yzVers + xSin;      res.n[10] = cos + vers * z * z;
	
	return res;
};

/**
 * Creates a 3x3 instance from a rotation around the x-axis
 * @static
 * @param  {Float}   rad the rotation in radians
 * @return {Matrix4}
 */
Matrix4.RotationX = function(rad) {
	var res = new Matrix4();

	var sin = Math.sin(rad);
	var cos = Math.cos(rad);

	res.n[5]  = cos;		//n11
	res.n[9]  = -sin;		//n12
	res.n[6]  = sin;		//n21
	res.n[10] = cos;		//n22

	return res;
};

/**
 * Creates a 3x3 instance from a rotation around the y-axis
 * @static
 * @param  {Float}   rad the rotation in radians
 * @return {Matrix4}
 */
Matrix4.RotationY = function(rad) {
	var res = new Matrix4();

	var sin = Math.sin(rad);
	var cos = Math.cos(rad);

	res.n[0]  =  cos;		//n00
	res.n[8]  = -sin;		//n02
	res.n[2]  =  sin;		//n20
	res.n[10] =  cos;		//n22

	return res;
};

/**
 * Creates a 3x3 instance from a rotation around the z-axis
 * @static
 * @param  {Float}   rad the rotation in radians
 * @return {Matrix4}
 */
Matrix4.RotationZ = function(rad) {
	var res = new Matrix4();

	var sin = Math.sin(rad);
	var cos = Math.cos(rad);

	res.n[0] =  cos;		//n00
	res.n[4] = -sin;		//n01
	res.n[1] =  sin;		//n10
	res.n[5] =  cos;		//n11

	return res;
};

/**
 * Creates a 3x3 instance from euler angles in order (x,y,z)
 * @static
 * @param  {Float}   x The rotation around the x-axis in radians
 * @param  {Float}   y The rotation around the y-axis in radians
 * @param  {Float}   z The rotation around the z-axis in radians
 * @return {Matrix4}
 */
Matrix4.EulerXYZ = function(x, y, z) {
	
	var sx = Math.sin(x);
	var cx = Math.cos(x);
	var sy = Math.sin(y);
	var cy = Math.cos(y);
	var sz = Math.sin(z);
	var cz = Math.cos(z);
	
	var res = new Matrix4();
	
	res.n[0]  =  cy * cz;
	res.n[4]  = -cy * sz;
	res.n[8]  =  sy;
	
	res.n[1]  =  cx * sz + sx * sy * cz;
	res.n[5]  =  cx * cz - sx * sy * sz;
	res.n[9]  = -sx * cy;
	
	res.n[2]  =  sx * sz - cx * sy * cz;
	res.n[6]  =  sx * cz + cx * sy * sz;
	res.n[10] =  cx * cy;
	
	return res;
};

/**
 * Creates a 3x3 instance from euler angles in order (y,x,z)
 * @static
 * @param {Float} x The rotation around the x-axis in radians
 * @param {Float} y The rotation around the y-axis in radians
 * @param {Float} z The rotation around the z-axis in radians
 * @return {Matrix4}
 */
Matrix4.EulerYXZ = function(x, y ,z) {
	
	var sx = Math.sin(x);
	var cx = Math.cos(x);
	var sy = Math.sin(y);
	var cy = Math.cos(y);
	var sz = Math.sin(z);
	var cz = Math.cos(z);
	
	var res = new Matrix4();
	
	res.n[0]  =  cy * cz + sy * sx * sz;
	res.n[4]  = -cy * sz + sy * sx * cz;
	res.n[8]  =  sy * cx;
	
	res.n[1]  =  cx * sz;
	res.n[5]  =  cx * cz;
	res.n[9]  = -sx;
	
	res.n[2]  = -sy * cz + cy * sx * sz;
	res.n[6]  =  sy * sz + cy * sx * cz;
	res.n[10] =  cy * cx;
	
	return res;
};

/**
 * Creates a 3x3 instance from euler angles in order (z,x,y)
 * @static
 * @param  {Float}   x The rotation around the x-axis in radians
 * @param  {Float}   y The rotation around the y-axis in radians
 * @param  {Float}   z The rotation around the z-axis in radians
 * @return {Matrix4}
 */
Matrix4.EulerZXY = function(x, y, z) {
	
	var sx = Math.sin(x);
	var cx = Math.cos(x);
	var sy = Math.sin(y);
	var cy = Math.cos(y);
	var sz = Math.sin(z);
	var cz = Math.cos(z);
	
	var res = new Matrix4();	
	
	res.n[0]  =  cz * cy - sz * sx * sy;
	res.n[4]  = -sz * cx;
	res.n[8]  =  cz * sy + sz * sx * cy;
	
	res.n[1]  =  sz * cy + cz * sx * sy;
	res.n[5]  =  cz * cx;
	res.n[9]  =  sz * sy - cz * sx * cy;
	
	res.n[2]  = -cx * sy;
	res.n[6]  =  sx;
	res.n[10] =  cx * cy;
	
	return res;
};

/**
 * Creates a 3x4 instance from vector
 * @static
 * @param  {Vector3} v The position vector
 * @return {Matrix4}
 */
Matrix4.Translation = function(v) {
	var res = new Matrix4();

	res.n[12] = v.n[0];		//n03
	res.n[13] = v.n[1];		//n13
	res.n[14] = v.n[2];		//n23

	return res;
};

/**
 * Creates a 3x3 instance from vector
 * @static
 * @param  {Vector3} v The scale vector
 * @return {Matrix4}
 */
Matrix4.Scale = function(v) {
	var res = new Matrix4();

	res.n[0]  = v.n[0];		//n00
	res.n[5]  = v.n[1];		//n11
	res.n[10] = v.n[2];		//n22

	return res;
};


/**
 * Returns the 3x3 inverse of m
 * <p>Components outside the 3x3 range will be ignored.</p>
 * @static
 * @param  {Matrix4} m The 3x3 source
 * @return {Matrix4}
 */
Matrix4.Inverse3x3 = function(m) {
	var res = new Matrix4();
	res.inverse3x3Of(m);
	return res;
};

/**
 * Returns the 3x4 inverse of m
 * <p>Components outside the 3x4 range will be ignored.</p>
 * @static
 * @param  {Matrix4} m The 3x4 source
 * @return {Matrix4}
 */
Matrix4.Inverse = function(m) {
	var res = new Matrix4();
	res.inverseOf(m);
	return res;
};

/**
 * Returns the 4x4 inverse of m
 * @static
 * @param  {Matrix4} m The 4x4 source
 * @return {Matrix4}
 */
Matrix4.Inverse4x4 = function(m) {
	var res = new Matrix4();
	res.inverse4x4Of(m);
	return res;
}


/**
 * Returns the 3x3 transpose of m
 * <p>Components outside the 3x3 range will be ignored.</p>
 * @static
 * @param  {Matrix4} m The 3x3 source
 * @return {Matrix4}
 */
Matrix4.Transpose3x3 = function(m) {
	var res = new Matrix4();
	res.transpose3x3Of(m);
	return res;
};

/**
 * Returns the 4x4 transpose of m
 * @static
 * @param  {Matrix4} m The 4x4 source
 * @return {Matrix4}
 */
Matrix4.Transpose = function(m) {
	var res = new Matrix4();
	res.transposeOf(m);
	return res;
};


/**
 * Creates a 3x4 instance from axes (x,y,z) and translation t
 * @static
 * @param  {Vector3} x The x-axis vector
 * @param  {Vector3} y The y-axis vector
 * @param  {Vector3} z The z-axis vector
 * @param  {Vector3} t The position vector
 * @return {Matrix4}
 */
Matrix4.Vector3 = function(x, y, z, t) {	
	var n = x.n.concat(0.0, y.n, 0.0, z.n, 0.0, t.n, 1.0);
	return new Matrix4(n);
};

/**
 * Creates a 3x3 instance from unit-quaternion q
 * @static
 * @param  {Vector4} q The source
 * @return {Matrix4}
 */
Matrix4.Vector4 = function(q) {
	var res = new Matrix4();
	
	var x = q.n[0], y = q.n[1], z = q.n[2], w = q.n[3];
	
	var xx = x * x, yy = y * y, zz = z * z;
	var xy = x * y, yz = y * z, xz = x * z;
	var xw = x * w, yw = y * w, zw = z * w;	
	
	var s = 2.0 / Math.sqrt(xx + yy + zz + w * w);
	
	res.n[0] = 1.0 - s * (yy + zz); res.n[1] =       s * (xy + zw); res.n[2]  =       s * (xz - yw);
	res.n[4] =       s * (xy - zw); res.n[5] = 1.0 - s * (xx + zz); res.n[6]  =       s * (yz + xw);
	res.n[8] =       s * (xz + yw); res.n[9] =       s * (yz - xw); res.n[10] = 1.0 - s * (xx + yy);
	
	return res;
};


/**
 * Returns the 4x4 sum of a and b (a+b)
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
 * Returns the 3x4 concatenation of a and b (a*b)
 * @static
 * @param  {Matrix4} a The first transform
 * @param  {Matrix4} b The second transform
 * @return {Matrix4}
 */
Matrix4.multiply = function(a, b) {
	var res = new Matrix4();
	res.multiply(a, b);
	return res;
};

/**
 * Returns the 3x3 concatenation of a and b (a*b)
 * @static
 * @param  {Matrix4} a The first transform
 * @param  {Matrix4} b The second transform
 * @return {Matrix4}
 */
Matrix4.multiply3x3 = function(a, b) {
	var res = new Matrix4();
	res.multiply3x3(a, b);
	return res;
};


/**
 * Creates a 3x3 copy of m
 * <p>Components outside the 3x3 range will be ignored.</p>
 * @static
 * @param  {Matrix4} m The 3x3 source
 * @return {Matrix4}
 */
Matrix4.copy3x3 = function(m) {return new Matrix4(m.n.slice(0, 12));};

/**
 * Creates a 4x4 copy of m
 * @static
 * @param  {Matrix4} m 4x4 The source
 * @return {Matrix4}
 */
Matrix4.copy = function(m) {return new Matrix4(m.n.slice(0));};


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
Matrix4.version = "0.9.7";