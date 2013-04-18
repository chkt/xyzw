/**
 * Vector4
 * @class Four component vector aka quaternion
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array containing the four components
 *	<p>Arrays of length !== 4 will return the identity vector.</p>
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
 */
function Vector4(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y, n[2]:z, n[3]:w</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor === Array && n.length === 4 ? n : [0.0, 0.0, 0.0, 1.0]);
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
	 *	<p>Arrays of length !== 4 will result in the identity vector.</p>
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
	 * @param  {UInt}   [digits=3] The decimal digits
	 * @return {String}
	 */
	toString : function(digits) {
		if (digits === undefined) digits = 3;
		
		return this.constructor + "(" +
			this.n[0].toFixed(digits) + " " +
			this.n[1].toFixed(digits) + " " +
			this.n[2].toFixed(digits) + " " +
			this.n[3].toFixed(digits) + ")";
	},
	
	/**
	 * Returns the <code>{@link Vector4#norm}</code> of the instance
	 * @return {Float}
	 */
	valueOf : function() {
		return this.norm;
	}
};




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
Vector4.dot = function(q, r) {
	return q.n[0] * r.n[0] + q.n[1] * r.n[1] + q.n[2] * r.n[2] + q.n[3] * r.n[3];
};


/**
 * Returns a copy of q
 * @static
 * @param  {Vector4} q The source
 * @return {Vector4}
 */
Vector4.copy = function(q) {
	return new Vector4(q.n.slice(0, 4));
};


/**
 * Tests q and r for equality
 * @param  {Vector4} q The first vector
 * @param  {Vector4} r The second vector
 * @return {Boolean}
 */
Vector4.isEQ = function(q, r) {
	var qn = q.n, rn = r.n;
	
	return qn[0] === rn[0] && qn[1] === rn[1] && qn[2] === rn[2] && qn[3] === rn[3];
};


/**
 * Returns the type-version string
 * @static
 * @return {String}
 */
Vector4.toString = function() {
	return "[Vector4-" + Vector4.version + "]";
};

/**
 * The version string
 * @constant
 * @static
 * @type String
 */
Vector4.version = "0.5.3";
