/**
 * Creates a new instance
 * @class Four component vector
 * @author Christoph Kettelhoit <ck@christoph-kettelhoit.de>
 * @param {Float[]} [n] Array representing the four components
 *	<p>Arrays of length <em>!== 4</em> will return the identity (0.0,0.0,0.0,1.0) vector.</p>
 * @returns {Vector4}
 * @license Licensed under the MIT License
 */
function Vector4(n) {
	/**
	 * The array representation
	 * <p>n[0]:x, n[1]:y, n[2]:z, n[3]:w</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor === Array && n.length === 4 ? n : [0.0, 0.0, 0.0, 1.0]);
}


/**
 * (Re)defines the instance
 * @param {Float[]} [n] Array representing the four components
 *	<p>Arrays of length <em>!== 4</em> will return the identity (0.0,0.0,0.0,1.0) vector.</p>
 * @return {Vector4}
 */
Vector4.prototype.define = function(n) {
	Vector4.call(this, n);
	
	return this;
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
 * The norm of the instance
 * @readonly
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
 * @returns {Vector4}
 */
Vector4.prototype.add = function(q, r) {
   this.n[0] = q.n[0] + r.n[0];
   this.n[1] = q.n[1] + r.n[1];
   this.n[2] = q.n[2] + r.n[2];
   this.n[3] = q.n[3] + r.n[3];
   
   return this;
};

/**
 * The difference of q and r (q-r)
 * @param {Vector4} q The minuend
 * @param {Vector4} r The subtrahend
 * @returns {Vector4}
 */
Vector4.prototype.subtract = function(q, r) {
   this.n[0] = q.n[0] - r.n[0];
   this.n[1] = q.n[1] - r.n[1];
   this.n[2] = q.n[2] - r.n[2];
   this.n[3] = q.n[3] - r.n[3];
   
   return this;
};

/**
 * The scalar product of q and n (q*n)
 * @param {Vector4} q The vector
 * @param {Float}   n The scalar
 * @returns {Vector4}
 */
Vector4.prototype.multiplyScalar = function(q, n) {
   this.n[0] = q.n[0] * n;
   this.n[1] = q.n[1] * n;
   this.n[2] = q.n[2] * n;
   this.n[3] = q.n[3] * n;
   
   return this;
};

/**
 * The exterior product of q and r (q cross r)
 * @param {Vector4} q The first vector
 * @param {Vector4} r The second vector
 * @returns {Vector4}
 */
Vector4.prototype.multiply = function(q, r) {
   var qx = q.n[0], qy = q.n[1], qz = q.n[2], qw = q.n[3];
   var rx = r.n[0], ry = r.n[1], rz = r.n[2], rw = r.n[3];

   this.n[0] = qz * ry - qy * rz + qx * rw + qw * rx;
   this.n[1] = qx * rz - qz * rx + qy * rw + qw * ry;
   this.n[2] = qy * rx - qx * ry + qz * rw + qw * rz;
   this.n[3] = qw * rw - qx * rx - qy * ry - qz * rz;
   
   return this;
};


/**
 * The sum of the instance and q
 * @param {Vector4} q The second summand
 * @returns {Vector4}
 */
Vector4.prototype.addEQ = function(q) {
   this.n[0] += q.n[0];
   this.n[1] += q.n[1];
   this.n[2] += q.n[2];
   this.n[3] += q.n[3];
   
   return this;
};

/**
 * The difference of the instance and q
 * @param {Vector4} q The subtrahend
 * @returns {Vector4}
 */
Vector4.prototype.subtractEQ = function(q) {
   this.n[0] -= q.n[0];
   this.n[1] -= q.n[1];
   this.n[2] -= q.n[2];
   this.n[3] -= q.n[3];
   
   return this;
};

/**
 * The scalar product of the instance and n
 * @param {Float} n the scalar
 * @returns {Vector4}
 */
Vector4.prototype.multiplyScalarEQ = function(n) {
   this.n[0] *= n;
   this.n[1] *= n;
   this.n[2] *= n;
   this.n[3] *= n;
   
   return this;
};


/**
 * The normalization of q
 * @param {Vector4} q The source vector
 * @returns {Vector4}
 */
Vector4.prototype.normalizationOf = function(q) {
	var qn = q.n, qx = qn[0], qy = qn[1], qz = qn[2], qw = qn[3];
	var n = this.n, norm = qx * qx + qy * qy + qz * qz + qw * qw;
	
	if (norm !== 0.0 && norm !== 1.0) norm = 1.0 / Math.sqrt(norm);
	
	n[0] = qx * norm, n[1] = qy * norm, n[2] = qz * norm, n[3] = qw * norm;
	
	return this;
};

/**
 * The conjugate of q
 * @param {Vector4} q The source
 * @returns {Vector4}
 */
Vector4.prototype.conjugateOf = function(q) {
	this.n[0] = -q.n[0] * -1.0;
	this.n[1] = -q.n[1] * -1.0;
	this.n[2] = -q.n[2] * -1.0;
	this.n[3] =  q.n[3];
	
	return this;
};

/**
 * The inverse of q
 * @param {Vector4} q The source
 * @returns {Vector4}
 */
Vector4.prototype.inverseOf = function(q) {
	var x = q.n[0], y = q.n[1], z = q.n[2], w = q.n[3];
	var norm = 1.0 / (x * x + y * y + z * z + w * w);

	this.n[0] = x * -norm;
	this.n[1] = y * -norm;
	this.n[2] = z * -norm;
	this.n[3] = w *  norm;
	
	return this;
};

/**
 * The copy of q
 * @param {Vector4} q The source
 * @returns {Vector4}
 */
Vector4.prototype.copyOf = function(q) {
	this.n = q.n.slice(0, 4);
	
	return this;
};

	
/**
 * The normal form of the instance
 * @returns {Vector4}
 */
Vector4.prototype.normalize = function() {
	var n = this.n, x = n[0], y = n[1], z = [2], w = n[3];
	var norm = x * x + y * y + z * z + w * w;
	
	if (norm === 0.0 || norm === 1.0) return this;
	
	norm = 1.0 / Math.sqrt(norm);
	n[0] *= norm, n[1] *= norm, n[2] *= norm, n[3] *= norm;
	
	return this;
};

/**
 * The conjugate of the instance
 * @returns {Vector4}
 */
Vector4.prototype.conjugate = function() {
	return this.conjugateOf(this);
};

/**
 * The inverse of the instance
 * @returns {Vector4}
 */
Vector4.prototype.invert = function() {
	return this.inverseOf(this);
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
Object.defineProperty(Vector4, 'VERSION', { value: "0.5.6" });


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
	
	if (target === undefined) target = new Vector4(n);
	else target.n = n;
	
	return target.normalize();
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
	
	if (target === undefined) target = new Vector4(n);
	else target.n = n;
	
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
	
	if (target === undefined) target = new Vector4(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of Vector3
 * @param {Vector3}  v       The source
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Vector3 = function(v, target) {
	var n = v.n.concat(1.0);
	
	if (target === undefined) target = new Vector4(n);
	else target.n = n;
	
	return target;
};


/**
 * Returns the sum of q and r (q+r)
 * @param {Vector4}  q       The first summand
 * @param {Vector4}  r       The second summand
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Add = function(q, r, target) {
	return (target === undefined ? new Vector4() : target).add(q, r);
};

/**
 * Returns the difference of q and r (q-r)
 * @param {Vector4}  q       The minuend
 * @param {Vector4}  r       The subtrahend
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Subtract = function(q, r, target) {
	return (target === undefined ?  new Vector4() : target).subtract(q, r);
};

/**
 * Returns the scalar product of q and n (q*n)
 * @param {Vector4}  q       The vector
 * @param {Float}    n       The scalar
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.MultiplyScalar = function(q, n, target) {
	return (target === undefined ? new Vector4() : target).multiplyScalar(q, n);
};

/**
 * Returns the exterior product of q and r (q*r)
 * @param {Vector4}  q       The first vector
 * @param {Vector4}  r       The second vector
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Multiply = function(q, r, target) {
	return (target === undefined ? new Vector4() : target).multiply(q, r);
};


/**
 * Returns the normal form of q
 * @param {Vector4}  q       The source 
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Normalize = function(q, target) {
	return (target === undefined ? new Vector4() : target).normalizationOf(q);
};

/**
 * Returns the conjugate of q
 * @param {Vector4}  q       The source
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Conjugate = function(q, target) {
	return (target === undefined ? new Vector4() : target).conjugateOf(q);
};

/**
 * Returns the inverse of q
 * @param {Vector4}  q       The source
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Inverse = function(q, target) {
	return (target === undefined ? new Vector4() : target).inverseOf(q); 
};

/**
 * Returns a copy of q
 * @param {Vector4}  q       The source
 * @param {Vector4} [target] The target instance
 * @returns {Vector4}
 */
Vector4.Copy = function(q, target) {
	return (target === undefined ? new Vector4() : target).copyOf(q);
};


/**
 * Returns the inner product of q and r
 * @param {Vector4} q The first vector
 * @param {Vector4} r The second vector
 * @returns {Float}
 */
Vector4.dot = function(q, r) {
	return q.n[0] * r.n[0] + q.n[1] * r.n[1] + q.n[2] * r.n[2] + q.n[3] * r.n[3];
};


/**
 * Returns <code>true</code> if <code>q</code> and <code>r</code> are equal, <code>false</code> otherwise (q==r)
 * @param {Vector4} q The protagonist
 * @param {Vector4} r The antagonist
 * @returns {Boolean}
 */
Vector4.isEQ = function(q, r) {	
	var qn = q.n, rn = r.n;
	
	return q === r || qn[0] === rn[0] && qn[1] === rn[1] && qn[2] === rn[2] && qn[3] === rn[3];
};


/**
 * Returns the type-version string
 * @returns {String}
 */
Vector4.toString = function() {
	return "[Vector4-" + Vector4.VERSION + "]";
};