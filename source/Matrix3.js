/**
 * Creates a new instance
 * @class 2x3 and 3x3 transformations
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float[]} [n] Array represeting 3x3 column-major ordered components
 *	<p>Arrays of length <em>!== 9</em> will return the identity matrix.</p>
 * @returns {Matrix3}
 * @license Licensed under the MIT License
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
	this.n = (n && n.constructor === Array && n.length === 9 ? n : [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]);
}


/**
 * (Re)defines the instance
 * @param {Float[]} [n] Array representing 3x3 column-major ordered components
 *	<p>Arrays of length <em>!== 9</em> will return the identity matrix.</p>
 * @returns {Matrix3}
 */
Matrix3.prototype.define = function(n) {
	Matrix3.call(this, n);
	
	return this;
};


/**
 * row 0, col 0, <code>{@link Matrix3#n}[0]</code>
 * @name n00
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n00', {
	get : function() {
		return this.n[0];
	},
	set : function(n) {
		this.n[0] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 0, col 1, <code>{@link Matrix3#n}[3]</code>
 * @name n01
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n01', {
	get : function() {
		return this.n[3];
	},
	set : function(n) {
		this.n[3] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 0, col 2, <code>{@link Matrix3#n}[6]</code>
 * @name n02
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n02', {
	get : function() {
		return this.n[6];
	},
	set : function(n) {
		this.n[6] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 1, col 0, <code>{@link Matrix3#n}[1]</code>
 * @name n10
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n10', {
	get : function() {
		return this.n[1];
	},
	set : function(n) {
		this.n[1] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 1, col 1, <code>{@link Matrix3#n}[4]</code>
 * @name n11
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n11', {
	get : function() {
		return this.n[4];
	},
	set : function(n) {
		this.n[4] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 1, col 2, <code>{@link Matrix3#n}[7]</code>
 * @name n12
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n12', {
	get : function() {
		return this.n[7];
	},
	set : function(n) {
		this.n[7] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 2, col 0, <code>{@link Matrix3#n}[2]</code>
 * @name n20
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n20', {
	get : function() {
		return this.n[2];
	},
	set : function(n) {
		this.n[2] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 2, col 1, <code>{@link Matrix3#n}[5]</code>
 * @name n21
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n21', {
	get : function() {
		return this.n[5];
	},
	set : function(n) {
		this.n[5] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 2, col 2, <code>{@link Matrix3#n}[8]</code>
 * @name n22
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'n22', {
	get : function() {
		return this.n[8];
	},
	set : function(n) {
		this.n[8] = n;
	},
	configurable : true,
	enumerable :true
});


/**
 * The determinant
 * @readonly
 * @name determinant
 * @memberOf Matrix3#
 * @type Float
 */
Object.defineProperty(Matrix3.prototype, 'determinant', {
	get: function() {
		var n = this.n;
		
		var n10 = n[1], n11 = n[4], n12 = n[7];
		var n20 = n[2], n21 = n[5], n22 = n[8];
		
		return n[0] * (n11 * n22 - n12 * n21) + n[3] * (n12 * n20 - n10 * n22) + n[6] * (n10 * n21 - n11 * n20);	
	},
	configurable: true,
	enumerable: true
});


/**
 * The sum of a and b (a+b)
 * @param {Matrix3} a The first summand
 * @param {Matrix3} b The second summand
 * @returns {Matrix3}
 */
Matrix3.prototype.add = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	
	for (var i = 0; i < 9; i++) n[i] = an[i] + bn[i];
	
	return this;
};

/**
 * The difference of a and b (a-b)
 * @param {Matrix3} a The minuend
 * @param {Matrix3} b The subtrahend
 * @returns {Matrix3}
 */
Matrix3.prototype.subtract = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	
	for (var i = 0; i < 9; i++) n[i] = an[i] - bn[i];
	
	return this;
};

/**
 * The 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Matrix2(Matrix2.Scale(v)))
 * <p>Components 2x are assumed to be (0.0,0.0,1.0).</p>
 * @param {Matrix3} m The matrix
 * @param {Vector2} v The vector
 * @returns {Matrix3}
 */
Matrix3.prototype.multiply2x3Vector2Scale = function(m, v) {
	var n = this.n = m.n.slice(0), vn = v.n;
	
	var v00 = vn[0], v11 = vn[1];
	
	n[0] *= v00, n[3] *= v11;
	n[1] *= v00, n[4] *= v11;
	n[2] *= v00, n[6] *= v11;
	
	return this;
};

/**
 * The 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Translation(v))
 * <p>Components 2x are assumed to be (0.0,0.0,1.0).</p>
 * @param {Matrix3} m The matrix
 * @param {Vector2} v The vector
 * @returns {Matrix3}
 */	
Matrix3.prototype.multiply2x3Vector2Translation = function(m, v) {
	var n = this.n, mn = m.n, vn = v.n;

	var m00 = mn[0], m01 = mn[3], m02 = mn[6];
	var m10 = mn[1], m11 = mn[4], m12 = mn[7];
	var m20 = mn[2], m21 = mn[5], m22 = mn[8];

	var v02 = vn[0], v12 = vn[1];

	n[0] = m00, n[3] = m01, n[6] = m00 * v02 + m01 * v12 + m02;
	n[1] = m10, n[4] = m11, n[7] = m10 * v02 + m11 * v12 + m12;
	n[2] = m20,	n[5] = m21,	n[8] = m20 * v02 + m21 * v12 + m22;
	
	return this;
};
	
/**
 * The 2x3 concatenation of a and b (a*b)
 * <p>Components 2x are assumed to be (0.0,0.0,1.0).</p>
 * @param {Matrix3} a The first transform
 * @param {Matrix3} b The second transform
 * @returns {Matrix3}
 */	
Matrix3.prototype.multiply2x3 = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;

	var a00 = an[0], a01 = an[3], a02 = an[6];
	var a10 = an[1], a11 = an[4], a12 = an[7];

	var b00 = bn[0], b01 = bn[3], b02 = bn[6];
	var b10 = bn[1], b11 = bn[4], b12 = bn[7];

	n[0] = a00 * b00 + a01 * b10;
	n[3] = a00 * b01 + a01 * b11;
	n[6] = a00 * b02 + a01 * b12 + a02;

	n[1] = a10 * b00 + a11 * b10;
	n[4] = a10 * b01 + a11 * b11;
	n[7] = a10 * b02 + a11 * b12 + a12;

	n[2] = n[5] = 0.0;
	n[8] = 1.0;
	
	return this;
};
	
/**
 * The concatenation of a and b (a*b)
 * @param {Matrix3} a The first transform
 * @param {Matrix3} b The second transform
 * @returns {Matrix3}
 */
Matrix3.prototype.multiply = function(a, b) {
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
	
	return this;
};


/**
 * The inverse of m
 * <p>Beware: method is <strong>NOT</stong> chainable.</p>
 * @param {Matrix3} m The source
 * @returns {Boolean}
 *  <p>Returns <code>false</code> if <code>m</code> is assumed to be singular, <code>true</code> otherwise.</p>
 */
Matrix3.prototype.inverseOf = function(m) {
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
};

/**
 * The transpose of m
 * @param {Matrix3} m The source
 * @returns {Matrix3}
 */
Matrix3.prototype.transposeOf = function(m) {
	var n = this.n, mn = m.n.slice(0, 9);
	
	n[3] = mn[1], n[6] = mn[2];
	n[1] = mn[3], n[7] = mn[5];
	n[2] = mn[6], n[5] = mn[7];
	
	return this;
};

/**
 * The copy of m
 * @param {Matrix3} m The source
 * @returns {Matrix3}
 */
Matrix3.prototype.copyOf = function(m) {
	this.n = m.n.slice(0, 9);
	
	return this;
};


/**
 * The inverse of the instance
 * <p>Beware: method is <strong>NOT</strong> chainable.</p>
 * <p>Returns <code>false</code> if the instance is assumed to be singular, <code>true</code> otherwise.</p>
 * @returns {Boolean}
 */
Matrix3.prototype.invert = function() {
	return this.inverseOf(this);
};

/**
 * The transpose of the instance
 * @returns {Matrix3}
 */
Matrix3.prototype.transpose = function() {
	return this.transposeOf(this);
};


/**
 * Returns a (x,y,z) ordered (y,x,z) euler angle representation of the instance
 * @returns {Float[]}
 */
Matrix3.prototype.toEulerYXZ = function() {
	var n = this.n, x = Math.asin(-n[7]);

	if (Math.abs(n[7]) !== 1.0) {
		var y = Math.atan2(n[6], n[8]);
		var z = Math.atan2(n[1], n[4]);
	} else  {
		y = Math.atan2(n[3], n[0]);
		z = 0.0;
	}

	return [x, y, z];
};

/**
 * Returns a (x,y,z) ordered (z,x,y) euler angle representation of the instance
 * @returns {Float[]}
 */
Matrix3.prototype.toEulerZXY = function() {
	var n = this.n, x = Math.asin(-n[5]);

	if (Math.abs(n[5]) !== 1.0) {
		var y = Math.atan2(-n[2], n[8]);
		var z = Math.atan2(-n[3], n[4]);
	} else {
		y = 0.0;
		z = Math.atan2(n[1], n[0]);
	}

	return [x, y, z];
};


/**
 * Returns a css-formated 2x3 string representation of the instance
 * <p>Components 2x are assumed to be (0.0,0.0,1.0).</p>
 * @returns {String}
 */
Matrix3.prototype.toCSS2x3 = function() {
	return "matrix(" +
		this.n[0] + "," + this.n[1] + "," +
		this.n[3] + "," + this.n[4] + "," +
		this.n[6] + "," + this.n[7] + ")";
};

/**
 * Returns a css-formated 3x3 string representation of the instance
 * @returns {String}
 */	
Matrix3.prototype.toCSS = function() {
	return "matrix3d(" +
		this.n[0] + "," + this.n[1] + "," + this.n[2] + "," +
		this.n[3] + "," + this.n[4] + "," + this.n[5] + "," +
		this.n[6] + "," + this.n[7] + "," + this.n[8] + ")";
};

/**
 * Returns a string representation of the instance
 * @param {Uint} [digits=3] The decimal digits
 * @returns {String}
 */
Matrix3.prototype.toString = function(digits) {
	if (digits === undefined) digits = 3;

	var res = this.constructor.toString();

	for (var i = 0; i < 9; i++) res += (i % 3.0 === 0.0 ? "\n" : "\t") + this.n[i].toFixed(digits);

	return res;
};

/**
 * Returns the <code>{@link Matrix3#determinant}</code> of the instance
 * @returns {Float}
 */
Matrix3.prototype.valueOf = function() {
	return this.determinant;
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Matrix3
 * @type String
 */
Object.defineProperty(Matrix3, 'VERSION', { value: "0.5.6" });


/**
 * Returns a instance of axis and rotation
 * @param {Vector3}  axis    The rotation axis
 * @param {Float}    rad     The rotation in radians
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Rotation = function(axis, rad, target) {
	var n = [];
	
	var x = axis.n[0], y = axis.n[1], z = axis.n[2];
	var sin = Math.sin(rad), cos = Math.cos(rad), vers = 1.0 - cos;
	
	var xSin = x * sin, ySin = y * sin, zSin = z * sin;
	var xyVers = x * y * vers, xzVers = x * z * vers, yzVers = y * z * vers;
	
	n[0] = cos + vers * x * x; n[3] = xyVers - zSin;      n[6] = xzVers + ySin;
	n[1] = xyVers + zSin;      n[4] = cos + vers * y * y; n[7] = yzVers - xSin;
	n[2] = xzVers - ySin;      n[5] = yzVers + xSin;      n[8] = cos + vers * z * z;
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of x-axis rotation
 * @param {Float}    rad     The rotation in radians
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.RotationX = function(rad, target) {
	var sin = Math.sin(rad);
	var cos = Math.cos(rad);
	
	var n = [
		 1.0,  0.0,  0.0,
		 0.0,  cos,  sin,
		 0.0, -sin,  cos
	];
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of y-axis rotation
 * @param {Float}    rad     The rotation in radians
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.RotationY = function(rad, target) {
	var sin = Math.sin(rad);
	var cos = Math.cos(rad);
	
	var n = [
		 cos,  0.0,  sin,
		 0.0,  1.0,  0.0,
		-sin,  0.0,  cos
	];

	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of z-axis rotation
 * @param {Float}    rad     The rotation in radians
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.RotationZ = function(rad, target) {
	var sin = Math.sin(rad);
	var cos = Math.cos(rad);

	var n = [
		 cos,  sin, 0.0,
		-sin,  cos, 0.0,
		 0.0,  0.0, 1.0
	];

	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of (x,y,z) ordered euler angles
 * @param {Float}    x       The first  (x-axis) rotation in radians
 * @param {Float}    y       The second (y-axis) rotation in radians
 * @param {Float}    z       The third  (z-axis) rotation in radians
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.EulerXYZ = function(x, y ,z, target) {
	var sx = Math.sin(x), cx = Math.cos(x);
	var sy = Math.sin(y), cy = Math.cos(y);
	var sz = Math.sin(z), cz = Math.cos(z);

	var n = [];	
	
	n[0] =  cy * cz;
	n[3] = -cy * sz;
	n[6] =  sy;
	
	n[1] =  cx * sz + sx * sy * cz;
	n[4] =  cx * cz - sx * sy * sz;
	n[7] = -sx * cy;
	
	n[2] =  sx * sz - cx * sy * cz;
	n[5] =  sx * cz + cx * sy * sz;
	n[8] =  cx * cy;
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of (y,x,z) ordered euler angles
 * @param {Float}    x       The second (x-axis) rotation in radians
 * @param {Float}    y       The first  (y-axis) rotation in radians
 * @param {Float}    z       The third  (z-axis) rotation in radians
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 * 
 */
Matrix3.EulerYXZ = function(x, y, z, target) {
	var sx = Math.sin(x), cx = Math.cos(x);
	var sy = Math.sin(y), cy = Math.cos(y);
	var sz = Math.sin(z), cz = Math.cos(z);
	
	var n = [];
	
	n[0] =  cy * cz + sy * sx * sz;
	n[3] = -cy * sz + sy * sx * cz;
	n[6] =  sy * cx;
	
	n[1] =  cx * sz;
	n[4] =  cx * cz;
	n[7] = -sx;
	
	n[2] = -sy * cz + cy * sx * sz;
	n[5] =  sy * sz + cy * sx * cz;
	n[8] =  cy * cx;
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of (z,x,y) ordered euler angles
 * @param {Float}    x       The second (x-axis) rotation in radians
 * @param {Float}    y       The third  (y-axis) rotation in radians
 * @param {Float}    z       The first  (z-axis) rotation in radians
 * @param {Matrix3} [target] The target instance
 * @return {Matrix3}
 */
Matrix3.EulerZXY = function(x, y, z, target) {
	var sx = Math.sin(x), cx = Math.cos(x);
	var sy = Math.sin(y), cy = Math.cos(y);
	var sz = Math.sin(z), cz = Math.cos(z);
	
	var n = [];
		
	n[0] =  cz * cy - sz * sx * sy;
	n[3] = -sz * cx;
	n[6] =  cz * sy + sz * sx * cy;
	
	n[1] =  sz * cy + cz * sx * sy;
	n[4] =  cz * cx;
	n[7] =  sz * sy - cz * sx * cy;
	
	n[2] = -cx * sy;
	n[5] =  sx;
	n[8] =  cx * cy;
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of scale vector
 * @param {Vector3}  v       The source
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Scale = function(v, target) {
	var vn = v.n;
	
	var n = [
		vn[0],   0.0,   0.0,
		  0.0, vn[1],   0.0,
		  0.0,   0.0, vn[2]
	];
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of translation vector
 * @param {Vector2}  v       The source
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Translation = function(v, target) {
	var vn = v.n, n = [
		  1.0,   0.0,   0.0,
		  0.0,   1.0,   0.0,
		vn[0], vn[1],   1.0
	];
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};


/**
 * Returns a instance of axes (x, y, z)
 * @param {Vector3}  x       The x-axis vector
 * @param {Vector3}  y       The y-axis vector
 * @param {Vector3}  z       The z-axis vector
 * @param {Matrix3} [target] The target instance
 * @return {Matrix3}
 */
Matrix3.Vector3 = function(x, y, z, target) {
	var n = [].concat(x.n, y.n, z.n);
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of <em>unit-quaternion</em> q
 * @param {Vector4}  q       The source
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Vector4 = function(q, target) {
	var qn = q.n, n = [];
	
	var x = qn[0], y = qn[1], z = qn[2], w = qn[3];
	
	var xx = x * x, yy = y * y, zz = z * z;
	var xy = x * y, yz = y * z, xz = x * z;
	var xw = x * w, yw = y * w, zw = z * w;	
	
	var s = 2.0 / Math.sqrt(xx + yy + zz + w * w);
	
	n[0] = 1.0 - s * (yy + zz); n[1] =       s * (xy + zw); n[2] =       s * (xz - yw);
	n[3] =       s * (xy - zw); n[4] = 1.0 - s * (xx + zz); n[5] =       s * (yz + xw);
	n[6] =       s * (xz + yw); n[7] =       s * (yz - xw); n[8] = 1.0 - s * (xx + yy);
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of m
 * <p>The instance will be padded to 3x3.</p>
 * @param {Matrix2}  m       The source
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Matrix2 = function(m, target) {
	var n = m.n.concat([0.0, 0.0, 0.0, 1.0]);
	n.splice(2, 0, 0.0);
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of m
 * <p>The instance will be cropped to 3x3 by removing the fourth row & column of m.</p>
 * @param {Matrix4}  m       The source
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Matrix4 = function(m, target) {
	var n = m.n.slice(0, 11);
	n.splice(7, 1);
	n.splice(3, 1);
	
	if (target === undefined) target = new Matrix3(n);
	else target.n = n;
	
	return target;
};


/**
 * Returns the sum of a and b (a+b)
 * @param {Matrix3}  a       The first summand
 * @param {Matrix3}  b       The second summand
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Add = function(a, b, target) {
	return (target === undefined ? new Matrix3() : target).add(a, b);
};

/**
 * Returns the difference of a and b (a-b)
 * @param {Matrix3}  a       The minuend
 * @param {Matrix3}  b       The subtrahend
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Subtract = function(a, b, target) {
	return (target === undefined ? new Matrix3() : target).subtract(a, b);
};

/**
 * Returns the 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Matrix2(Matrix2.Scale(v)))
 * <p>Components 2x are assumed to be (0.0,0.0,1.0).</p>
 * @param {Matrix3}  m       The matrix
 * @param {Vector2}  v       The vector
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Multiply2x3Vector2Scale = function(m, v, target) {
	return (target === undefined ? new Matrix3() : target).multiply2x3Vector2Scale(m, v);
};

/**
 * Returns the 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Translation(v))
 * @param {Matrix3}  m       The matrix
 * @param {Vector2}  v       The vector
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Multiply2x3Vector2Translation = function(m, v, target) {
	return (target === undefined ? new Matrix3() : target).multiply2x3Vector2Translation(m, v);
};

/**
 * Returns the 2x3 concatenation of a and b (a*b)
 * <p>Components 2x are assumed to be (0.0,0.0,1.0).</p>
 * @param {Matrix3}  a       The first transform
 * @param {Matrix3}  b       The second transform
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Multiply2x3 = function(a, b, target) {
	return (target === undefined ? new Matrix3() : target).multiply2x3(a, b);
};

/**
 * Returns the concatenation of a and b (a*b)
 * @param {Matrix3}  a       The first transform
 * @param {Matrix3}  b       The second transform
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Multiply = function(a, b, target) {
	return (target === undefined ? new Matrix3() : target).multiply(a, b);
};


/**
 * Returns the inverse of m
 * <p>Returns <code>null</code> if <code>m</code> is assumed to be singular, the inverse of <code>m</code> otherwise.</p>
 * @param {Matrix3}  m       The source
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3|null}
 */
Matrix3.Inverse = function(m, target) {
	if (target === undefined) target = new Matrix3();
	
	return target.inverseOf(m) ? target : null;
};

/**
 * Returns the transpose of m
 * @param {Matrix3}  m       The source
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Transpose = function(m, target) {
	return (target === undefined ? new Matrix3() : target).transposeOf(m);
};


/**
 * Returns a copy of m
 * @param {Matrix3}  m       The source
 * @param {Matrix3} [target] The target instance
 * @returns {Matrix3}
 */
Matrix3.Copy = function(m, target) {
	return (target === undefined ? new Matrix3() : target).copyOf(m);
};


/**
 * Returns <code>true</code> if <code>a</code> and <code>b</code> are equal, <code>false</code> otherwise
 * @param {Matrix3}  a The protagonist
 * @param {Matrix3}  b The antagonist
 * @returns {Boolean}
 */
Matrix3.isEQ = function(a, b) {
	if (a === b) return true;
	
	var an = a.n, bn = b.n;
	
	for (var i = 0; i < 9; i++) {
		if (an[i] !== bn[i]) return false;
	}
	
	return true;
};


/**
 * Returns a type-version string
 * @returns {String}
 */
Matrix3.toString = function() {
	return "[Matrix3-" + Matrix3.VERSION + "]";
};