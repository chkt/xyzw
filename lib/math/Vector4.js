/**
 * Creates a new instance
 * @class Four component vector
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array representing the four components
 *	<p>Arrays of length <em>!== 4</em> will return the identity (0.0,0.0,0.0,1.0) vector.</p>
 * @returns {Vector4}
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


Vector4.prototype = {};
/**
 * The constructor
 * @type Function
 */
Vector4.prototype.constructor = Vector4;


/**
 * (Re)defines the instance
 * @param {Float[]} [n] Array representing the four components
 *	<p>Arrays of length <em>!== 4</em> will return the identity (0.0,0.0,0.0,1.0) vector.</p>
 * @return {undefined}
 */
Vector4.prototype.define = function(n) {
	Vector4.call(this, n);
};


/**
 * The x component, <code>{@link Vector4#n}[0]</code>
 * @name x
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4.prototype, 'x', {
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
 * The y component, <code>{@link Vector4#n}[1]</code>
 * @name y
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4.prototype, 'y', {
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
 * The z component, <code>{@link Vector4#n}[2]</code>
 * @name z
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4.prototype, 'z', {
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
 * The w component, <code>{@link Vector4#n}[3]</code>
 * @name w
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4.prototype, 'w', {
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
 * The r component
 * <p>Alias of <code>{@link Vector4#x}</code>.</p>
 * @name r
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4.prototype, 'r', {
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
Object.defineProperty(Vector4.prototype, 'g', {
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
Object.defineProperty(Vector4.prototype, 'b', {
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
Object.defineProperty(Vector4.prototype, 'a', {
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
 * The norm of the instance
 * <p>[readonly]</p>
 * @name norm
 * @memberOf Vector4#
 * @type Float
 */
Object.defineProperty(Vector4.prototype, 'norm', {
	get: function() {
		var x = this.n[0], y = this.n[1], z = this.n[2], w = this.n[3];
		return Math.sqrt(x * x + y * y + z * z + w * w);
	},
	configurable: true,
	enumerable: true
});


/**
 * The sum of q and r (q+r)
 * @param {Vector4} q The first summand
 * @param {Vector4} r The second summand
 * @returns {undefined}
 */
Vector4.prototype.add = function(q, r) {
   this.n[0] = q.n[0] + r.n[0];
   this.n[1] = q.n[1] + r.n[1];
   this.n[2] = q.n[2] + r.n[2];
   this.n[3] = q.n[3] + r.n[3];
};

/**
 * The difference of q and r (q-r)
 * @param {Vector4} q The minuend
 * @param {Vector4} r The subtrahend
 * @returns {undefined}
 */
Vector4.prototype.subtract = function(q, r) {
   this.n[0] = q.n[0] - r.n[0];
   this.n[1] = q.n[1] - r.n[1];
   this.n[2] = q.n[2] - r.n[2];
   this.n[3] = q.n[3] - r.n[3];
};

/**
 * The scalar product of q and n (q*n)
 * @param {Vector4} q The vector
 * @param {Float}   n The scalar
 * @returns {undefined}
 */
Vector4.prototype.multiplyScalar = function(q, n) {
   this.n[0] = q.n[0] * n;
   this.n[1] = q.n[1] * n;
   this.n[2] = q.n[2] * n;
   this.n[3] = q.n[3] * n;
};

/**
 * The exterior product of q and r (q cross r)
 * @param {Vector4} q The first vector
 * @param {Vector4} r The second vector
 * @returns {undefined}
 */
Vector4.prototype.multiply = function(q, r) {
   var qx = q.n[0], qy = q.n[1], qz = q.n[2], qw = q.n[3];
   var rx = r.n[0], ry = r.n[1], rz = r.n[2], rw = r.n[3];

   this.n[0] = qz * ry - qy * rz + qx * rw + qw * rx;
   this.n[1] = qx * rz - qz * rx + qy * rw + qw * ry;
   this.n[2] = qy * rx - qx * ry + qz * rw + qw * rz;
   this.n[3] = qw * rw - qx * rx - qy * ry - qz * rz;
};


/**
 * The sum of the instance and q
 * @param {Vector4} q The second summand
 * @returns {undefined}
 */
Vector4.prototype.addEQ = function(q) {
   this.n[0] += q.n[0];
   this.n[1] += q.n[1];
   this.n[2] += q.n[2];
   this.n[3] += q.n[3];
};

/**
 * The difference of the instance and q
 * @param {Vector4} q The subtrahend
 * @returns {undefined}
 */
Vector4.prototype.subtractEQ = function(q) {
   this.n[0] -= q.n[0];
   this.n[1] -= q.n[1];
   this.n[2] -= q.n[2];
   this.n[3] -= q.n[3];
};

/**
 * The scalar product of the instance and n
 * @param {Float} n the scalar
 * @returns {undefined}
 */
Vector4.prototype.multiplyScalarEQ = function(n) {
   this.n[0] *= n;
   this.n[1] *= n;
   this.n[2] *= n;
   this.n[3] *= n;
};


/**
 * The conjugate of q
 * @param {Vector4} q The source
 * @returns {undefined}
 */
Vector4.prototype.conjugateOf = function(q) {
	this.n[0] = -q.n[0] * -1.0;
	this.n[1] = -q.n[1] * -1.0;
	this.n[2] = -q.n[2] * -1.0;
	this.n[3] = q.n[3];
};

/**
 * The inverse of q
 * @param {Vector4} q The source
 * @returns {undefined}
 */
Vector4.prototype.inverseOf = function(q) {
	var x = q.n[0], y = q.n[1], z = q.n[2], w = q.n[3];
	var norm = 1.0 / (x * x + y * y + z * z + w * w);

	this.n[0] = x * -norm;
	this.n[1] = y * -norm;
	this.n[2] = z * -norm;
	this.n[3] = w *  norm;
};

/**
 * The copy of q
 * @param {Vector4} q The source
 * @returns {undefined}
 */
Vector4.prototype.copyOf = function(q) {
	this.n = q.n.slice(0, 4);
};

	
/**
 * The normal form of the instance
 * @returns {undefined}
 */
Vector4.prototype.normalize = function() {
	var x = this.n[0], y = this.n[1], z = this.n[2], w = this.n[3];
	var norm = 1.0 / Math.sqrt(x * x + y * y + z * z + w * w);
	this.n[0] *= norm; this.n[1] *= norm; this.n[2] *= norm;
};

/**
 * The conjugate of the instance
 * @returns {undefined}
 */
Vector4.prototype.conjugate = function() {
	var q = new Vector4(this.n.slice(0, 4));
	this.conjugateOf(q);
};

/**
 * The inverse of the instance
 * @returns {undefined}
 */
Vector4.prototype.invert = function() {
	var q = new Vector4(this.n.slice(0, 4));
	this.inverseOf(q);
};


/**
 * Returns a string representation of the instance
 * @param {Uint} [digits=3] The decimal digits
 * @returns {String}
 */
Vector4.prototype.toString = function(digits) {
	if (digits === undefined) digits = 3;

	return this.constructor + "(" +
		this.n[0].toFixed(digits) + " " +
		this.n[1].toFixed(digits) + " " +
		this.n[2].toFixed(digits) + " " +
		this.n[3].toFixed(digits) + ")";
};

/**
 * Returns the <code>{@link Vector4#norm}</code> of the instance
 * @returns {Float}
 */
Vector4.prototype.valueOf = function() {
	return this.norm;
};


/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Vector4
 * @type String
 */
Object.defineProperty(Vector4, 'VERSION', { value: "0.5.4" });


/**
 * Returns a <em>unit-quaternion</em> instance of axis and rotation
 * @param {Vector3}  axis    The rotation axis
 * @param {Float}    rad     The rotation in radians
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Rotation = function(axis, rad, target) {
	var sin = Math.sin(rad * 0.5);
	
	var n = [
		axis.n[0] * sin,
		axis.n[1] * sin,
		axis.n[2] * sin,
		Math.cos(rad * 0.5)
	];
	
	if (target !== undefined) target.n = n;
	else target = new Vector4(n);
	
	target.normalize();
	
	return target;
};

/**
 * Returns a <em>unit-quaternion</em> instance of Spherical Linear intERPolation
 * @param {Vector4}  q       The starting <em>unit quaternion</em>
 * @param {Vector4}  r       The ending <em>unit quaternion</em>
 * @param {Float}    t       The interpolation factor
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.SLERP = function(q, r, t, target) {
	var qx = q.n[0], qy = q.n[1], qz = q.n[2], qw = q.n[3];
	var rx = r.n[0], ry = r.n[1], rz = r.n[2], rw = r.n[3];
	
	var a = Math.acos(qx * rx + qy * ry + qz * rz + qw * rw);
	
	var sin = 1.0 / Math.sin(a);
	var sinQ = Math.sin(a * (1.0 - t));
	var sinR = Math.sin(a * t);
	
	var n = [
		sinQ * sin * q.n[0] + sinR * sin * r.n[0],
		sinQ * sin * q.n[1] + sinR * sin * r.n[1],
		sinQ * sin * q.n[2] + sinR * sin * r.n[2],
		sinQ * sin * q.n[3] + sinR * sin * r.n[3]
	];
	
	if (target) target.n = n;
	else target = new Vector4(n);
	
	return target;
};

/**
 * Returns a <em>unit-quaternion</em> instance of a rotation matrix
 * @param {Matrix3}  m       The source 3x3 transform
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Matrix3 = function(m, target) {
	var mn = m.n, n = [0.0, 0.0, 0.0, 1.0];
	var s = mn[0] + mn[4] + mn[8] + 1.0;
	
	if (s > 0.0) {
		s = Math.sqrt(s), n[3] = 0.5 * s;	// 1/2 sqrt(trace)
		s = 0.5 / s;	// 1 / (4 * 1/2 sqrt(trace))
		
		n[0] = (mn[5] - mn[7]) * s;
		n[1] = (mn[6] - mn[2]) * s;
		n[2] = (mn[1] - mn[3]) * s;
	}
	else if (mn[0] > mn[4] && mn[0] > mn[8]) {
		s = 0.5 / Math.sqrt(1.0 + mn[0] - mn[4] - mn[8]);
		
		n[0] = 0.5 * s;
		n[1] = (mn[1] + mn[3]) * s;
		n[2] = (mn[2] + mn[6]) * s;
		n[3] = (mn[5] + mn[7]) * s;		
	}
	else if (mn[4] > mn[8]) {
		s = 0.5 / Math.sqrt(1.0 + mn[4] - mn[0] - mn[8]);
		
		n[0] = (mn[1] + mn[3]) * s;
		n[1] = 0.5 * s;
		n[2] = (mn[5] + mn[7]) * s;
		n[3] = (mn[2] + mn[6]) * s;				
	}
	else {
		s = 0.5 / Math.sqrt(1.0 + mn[8] - mn[0] - mn[4]);
				
		n[0] = (mn[2] + mn[6]) * s;
		n[1] = (mn[5] + mn[7]) * s;
		n[2] = 0.5 * s;
		n[3] = (mn[1] + mn[3]) * s;
	}
	
	if (target !== undefined) target.n = n;
	else target = new Vector4(n);
};

/**
 * Returns a instance of Vector3
 * @param {Vector3}  v       The source
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Vector3 = function(v, target) {
	var n = v.n.concat(1.0);
	
	if (target !== undefined) target.n = n;
	else target = new Vector4(n);
	
	return target;
};


/**
 * Returns the sum of q and r (q+r)
 * @param {Vector4} q The first summand
 * @param {Vector4} r The second summand
 * @returns {Vector4}
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
 * @param {Vector4} q The minuend
 * @param {Vector4} r The subtrahend
 * @returns {Vector4}
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
 * @param {Vector4} q The vector
 * @param {Float}   n The scalar
 * @returns {Vector4}
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
 * @param {Vector4} q The first vector
 * @param {Vector4} r The second vector
 * @returns {Vector4}
 */
Vector4.multiply = function(q, r) {
	var res = new Quaternion();
	res.multiply(q, r);
	return res;
};

/**
 * Returns the inner product of q and r
 * @param {Vector4} q The first vector
 * @param {Vector4} r The second vector
 * @returns {Vector4}
 */
Vector4.dot = function(q, r) {
	return q.n[0] * r.n[0] + q.n[1] * r.n[1] + q.n[2] * r.n[2] + q.n[3] * r.n[3];
};


/**
 * Returns a copy of q
 * @param {Vector4} q The source
 * @returns {Vector4}
 */
Vector4.copy = function(q) {
	return new Vector4(q.n.slice(0, 4));
};


/**
 * Returns <code>true</code> if <code>q</code> and <code>r</code> are equal, <code>false</code> otherwise (q==r)
 * @param {Vector4} q The protagonist
 * @param {Vector4} r The antagonist
 * @returns {Boolean}
 */
Vector4.isEQ = function(q, r) {
	var qn = q.n, rn = r.n;
	
	return qn[0] === rn[0] && qn[1] === rn[1] && qn[2] === rn[2] && qn[3] === rn[3];
};


/**
 * Returns the type-version string
 * @returns {String}
 */
Vector4.toString = function() {
	return "[Vector4-" + Vector4.VERSION + "]";
};