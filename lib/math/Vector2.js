/**
 * Vector2
 * @class Two component vector
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
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
	 * The transformation of v (m*v)
	 * @param {Matrix2} m The transform
	 * @param {Vector2} v The vector
	 */
	multiplyMatrix2 : function(m, v) {
		var mn = m.n, x = v.n[0], y = v.n[1];
		
		this.n[0] = x * mn[0] + y * mn[2];
		this.n[1] = x * mn[1] + y * mn[3];
	},
	
	/**
	 * The 2x3 transformation of v (m*v)
	 * @param  {Matrix3} m The transform
	 * @param  {Vector2} v The vector
	 * @return {void}
	 */
	multiply2x3Matrix3 : function(m, v) {
		var mn = m.n, x = v.n[0], y = v.n[1];
		
		this.n[0] = x * mn[0] + y * mn[3] + mn[6];
		this.n[1] = x * mn[1] + y * mn[4] + mn[7];
	},
	
	/**
	 * The transformation of v (m*v)
	 * @param  {Matrix3} m The transform
	 * @param  {Vector2} v The vector
	 * @return {void}
	 */
	multiplyMatrix3 : function(m, v) {
		var mn = m.n, x = v.n[0], y = v.n[1];
		var w = 1.0 / (x * mn[2] + y * mn[5] + mn[8]);
		
		this.n[0] = (x * mn[0] + y * mn[3] + mn[6]) * w;
		this.n[1] = (x * mn[1] + y * mn[4] + mn[7]) * w;
	},
	
	
	/**
	 * The sum of the instance and w (v+w)
	 * @param  {Vector2} w The second summand
	 * @return {void}
	 */
	addEQ : function(w) {
		this.n[0] += w.n[0];
		this.n[1] += w.n[1];
	},
	
	/**
	 * The difference of the instance and w (v-w)
	 * @param  {Vector2} w The subtrahend
	 * @return {void}
	 */
	subtractEQ : function(w) {
		this.n[0] -= w.n[0];
		this.n[1] -= w.n[1];
	},
	
	/**
	 * The scalar product of the instance and n (v*n)
	 * @param  {Float} n The scalar
	 * @return {void}
	 */
	multiplyScalarEQ : function(n) {
		this.n[0] *= n;
		this.n[1] *= n;
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
 * A dereferenced instance of the zero vector(0.0, 0.0)
 * <p>[readonly]</p>
 * @static
 * @name ZERO
 * @memberOf Vector2
 * @type Vector2
 */
Object.defineProperty(Vector2, 'ZERO', {
	get : function() {
		return new Vector2();
	},
	configurable : true,
	enumerable : true
});


/**
 * Returns a new unit instance from <code>rad</code>
 * @param  {Float}   rad The rotation in radians
 * @return {Vector2}
 */
Vector2.Rotation = function(rad) {
	return new Vector2([Math.cos(rad), Math.sin(rad)]);
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
 * Returns the outer product of v and w (v cross w)
 * @static
 * @param  {Vector2} v The first vector
 * @param  {Vector2} w The second vector
 * @return {Float}
 */
Vector2.cross = function(v, w) {
	return v.n[0] * w.n[1] - v.n[1] * w.n[0];
};


/**
 * Returns the inner product of v and w (v dot w)
 * @static
 * @param  {Vector2} v The first vector
 * @param  {Vector2} w The second vector
 * @return {Float}
 */
Vector2.dot = function(v, w) {
	return v.n[0] * w.n[0] + v.n[1] * w.n[1];
};

/**
 * Returns the transformation of v (m*v)
 * @static
 * @param {Matrix2} m The transform
 * @param {Vector2} v The vector
 */
Vector2.multiplyMatrix2 = function(m, v) {
	var res = new Vector2();
	res.multiplyMatrix2(m, v);
	return res;
};

/**
 * Returns the 2x3 transformation of v (m*v)
 * @static
 * @param {Matrix3} m The transform
 * @param {Vector2} v The vector
 */
Vector2.multiply2x3Matrix3 = function(m, v) {
	var res = new Vector2();
	res.multiply2x3Matrix3(m, v);
	return res;
};

/**
 * Returns the transformation of v (m*v)
 * @static
 * @param {Matrix3} m The transform
 * @param {Vector2} v The vector
 */
Vector2.multiplyMatrix3 = function(m, v) {
	var res = new Vector2();
	res.multiplyMatrix3(m, v);
	return res;
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
Vector2.version = "0.9.7";