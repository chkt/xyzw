/**
 * Creates a new instance
 * @class 3x4 and 4x4 transformations
 * @author Christoph Kettelhoit <ck@christoph-kettelhoit.de>
 * @param {Float[]} [n] Array representing 4x4 column-major ordered components
 *	<p>Arrays of length <em>!== 16</em> will return the identity matrix.</p>
 * @returns {Matrix4}
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
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
	this.n = (n && n.constructor === Array && n.length === 16 ? n : [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
}


/**
 * (Re)defines the instance
 * @param {Float[]} [n] Array representing 4x4 column-major ordered components
 *	<p>Arrays of length <em>!== 16</em> will return the identity matrix.</p>
 * @returns {Matrix4}
 */
Matrix4.prototype.define = function(n) {
	Matrix4.call(this, n);
	
	return this;
};


/**
 * row 0, col 0, <code>{@link Matrix4#n}[0]</code>
 * @name n00
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n00', {
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
 * row 0, col 1, <code>{@link Matrix4#n}[4]</code>
 * @name n01
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n01', {
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
 * row 0, col 2, <code>{@link Matrix4#n}[8]</code>
 * @name n02
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n02', {
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
 * row 0, col 3, <code>{@link Matrix4#n}[12]</code>
 * @name n03
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n03', {
	get : function() {
		return this.n[12];
	},
	set : function(n) {
		this.n[12] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 1, col 0, <code>{@link Matrix4#n}[1]</code>
 * @name n10
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n10', {
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
 * row 1, col 1, <code>{@link Matrix4#n}[5]</code>
 * @name n11
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n11', {
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
 * row 1, col 2, <code>{@link Matrix4#n}[9]</code>
 * @name n12
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n12', {
	get : function() {
		return this.n[9];
	},
	set : function(n) {
		this.n[9] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 1, col 3, <code>{@link Matri4#n}[13]</code>
 * @name n13
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n13', {
	get : function() {
		return this.n[13];
	},
	set : function(n) {
		this.n[13] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 2, col 0, <code>{@link Matrix4#n}[2]</code>
 * @name n20
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n20', {
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
 * row 2, col 1, <code>{@link Matrix4#n}[6]</code>
 * @name n21
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n21', {
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
 * row 2, col 2, <code>{@link Matrix4#n}[10]</code>
 * @name n22
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n22', {
	get : function() {
		return this.n[10];
	},
	set : function(n) {
		this.n[10] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 2, col 3, <code>{@link Matrix4#n}[14]</code>
 * @name n23
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n23', {
	get : function() {
		return this.n[14];
	},
	set : function(n) {
		this.n[14] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 3, col 0, <code>{@link Matrix4#n}[3]</code>
 * @name n30
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n30', {
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
 * row 3, col 1, <code>{@link Matrix4#n}[7]</code>
 * @name n31
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n31', {
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
 * row 3, col 2, <code>{@link Matrix4#n}[11]</code>
 * @name n32
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n32', {
	get : function() {
		return this.n[11];
	},
	set : function(n) {
		this.n[11] = n;
	},
	configurable : true,
	enumerable :true
});

/**
 * row 3, col 3, <code>{@link Matrix4#n}[15]</code>
 * @name n33
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'n33', {
	get : function() {
		return this.n[15];
	},
	set : function(n) {
		this.n[15] = n;
	},
	configurable : true,
	enumerable :true
});


/**
 * The determinant
 * @readonly
 * @name determinant
 * @memberOf Matrix4#
 * @type Float
 */
Object.defineProperty(Matrix4.prototype, 'determinant', {
	get: function() {
		var n = this.n;
	
		var n10 = n[1], n11 = n[5], n12 = n[9],  n13 = n[13];
		var n30 = n[3], n31 = n[7], n32 = n[11], n33 = n[15];
		
		return n[0] * n[10] * (n11 * n33 - n13 * n31) + n[4] * n[14] * (n12 * n30 - n10 * n32) + n[8] * n[2] * (n13 * n31 - n11 * n33) + n[12] * n[6] * (n10 * n32 - n12 * n30);		
	},
	configurable: true,
	enumerable: true
});


/**
 * The sum of a and b (a+b)
 * @param {Matrix4} a The first summand
 * @param {Matrix4} b The second summand
 * @returns {Matrix4}
 */
Matrix4.prototype.add = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	
	for (var i = 0; i < 16; i++) n[i] = an[i] + bn[i];
	
	return this;
};

/**
 * The difference of a and b (a-b)
 * @param {Matrix4} a The minuend
 * @param {Matrix4} b The subtrahend
 * @returns {Matrix4}
 */
Matrix4.prototype.subtract = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	
	for (var i = 0; i < 16; i++) n[i] = an[i] - bn[i];
	
	return this;
};

/**
 * The 3x4 concatenation of m and matrix-transformed v (m*Matrix4.Matrix3(Matrix3.Scale(v)))
 * <p>Components 3x are assumed to be (0.0,0.0,0.0,1.0).</p>
 * @param {Matrix4} m The matrix
 * @param {Vector3} v The vector
 * @returns {Matrix4}
 */
Matrix4.prototype.multiply3x4Vector3Scale = function(m, v) {
	var n = this.n = m.n.slice(0, 16), vn = v.n;
	
	var v00 = vn[0], v11 = vn[1], v22 = vn[2];
	
	n[0] *= v00, n[4] *= v11, n[8]  *= v22;
	n[1] *= v00, n[5] *= v11, n[9]  *= v22;
	n[2] *= v00, n[6] *= v11, n[10] *= v22;
	n[3] *= v00, n[7] *= v11, n[11] *= v22;
	
	return this;
};

/**
 * The 3x4 concatenation of a and b (a*b)
 * <p>Components 3x are assumed to be (0.0,0.0,0.0,1.0).</p>
 * @param {Matrix4} a The first matrix
 * @param {Matrix3} b The second matrix
 * @returns {Matrix4}
 */
Matrix4.prototype.multiply3x4Matrix3 = function(a, b) {
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
	
	return this;
};

/**
 * The 3x4 concatenation of a and b (a*b)
 * <p>Components 3x are assumed to be (0.0,0.0,0.0,1.0).</p>
 * @param {Matrix4} a The first transform
 * @param {Matrix4} b The second transform
 * @returns {Matrix4}
 */
Matrix4.prototype.multiply3x4 = function(a, b) {
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
	
	return this;
};

/**
 * The concatenation of a and b (a*b)
 * @param {Matrix4} a The first transform
 * @param {Matrix4} b The second transform
 * @returns {Matrix4}
 */
Matrix4.prototype.multiply = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;

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
	
	return this;
};


/**
 * The 3x4 inverse of m
 * <p>Beware: method is <strong>NOT</strong> chainable.</p>
 * <p>Components 3x are assumed to be (0.0,0.0,0.0,1.0).</p>
 * <p>Returns <code>false</code> if <code>m</code> is assumed to be singular, <code>true</code> otherwise.</p>
 * @param {Matrix4} m The 3x4 source
 * @returns {Boolean}
 */
Matrix4.prototype.inverse3x4Of = function(m) {
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
};

/**
 * The inverse of m
 * <p>Beware: method is <strong>NOT</strong> chainable.</p>
 * <p>Using the adjoint method - m[ij] = 1 / d * (-1)^(i + j) * det(adj(m[ji])).</p>
 * <p>Returns <code>false</code> if <code>m</code> is assumed to be singular, <code>true</code> otherwise.</p>
 * @param {Matrix4} m The source
 * @returns {Boolean}
 */
Matrix4.prototype.inverseOf = function(m) {
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
};

/**
 * The inverse of m
 * <p>Beware: method is <strong>NOT</strong> chainable.</p>
 * <p>Using gauss-jordan elimination.</p>
 * <p>returns <code>false</code> if <code>m</code> is singular, <code>false</code> otherwise.</p>
 * @param {Matrix4} m The source
 * @returns {Boolean}
 */	
Matrix4.prototype.inverseGaussOf = function(m) {
	var a = m.n.slice(0), b = new Matrix4().n, abs = Math.abs;

	for (var r1 = 0; r1 < 4; r1++) {
		var max = r1, rcol = r1 * 4;

		for (var r2 = r1 + 1; r2 < 4; r2++) {
			if (abs(a[r2 + rcol]) > abs(a[max + rcol])) max = r2;
		}

		if (max !== r1) {
			for (var c = 0; c < 4; c++) {
				var ccol = c * 4;

				var swap = a[r1 + ccol];
				a[r1 + ccol] = a[max + ccol];
				a[max + ccol] = swap;

				swap = b[r1 + ccol];
				b[r1 + ccol] = b[max + ccol];
				b[max + ccol] = swap;
			}
		}

		if (abs(a[r1 + rcol]) < 1.0e-10) return false;

		for (r2 = r1 + 1; r2 < 4; r2++) {
			var n = a[r2 + rcol] / a[r1 + rcol];

			for (c = 0; c < 4; c++) {
				ccol = c * 4;

				b[r2 + ccol] -= b[r1 + ccol] * n;

				if (c <= r1) continue;

				a[r2 + ccol] -= a[r1 + ccol] * n;
			}
		}
	}

	for (r1 = 3; r1 > -1; r1--) {
		rcol = r1 * 4;
		n = 1.0 / a[r1 + rcol];

		for (r2 = 0; r2 < r1; r2++) {
			var f = a[r2 + rcol] * n;

			for (c = 0; c < 4; c++) {
				ccol = c * 4;
				b[r2 + ccol] -= b[r1 + ccol] * f;

				if (c <= r1) continue;

				a[r2 + ccol] -= a[r1 + ccol] + f;
			}
		}

		a[rcol] *= n;

		for (c = 0; c < 4; c++) b[r1 + c * 4] *= n;
	}

	this.n = b;

	return true;
};

/**
 * The transpose of m
 * @param {Matrix4} m The source
 * @returns {Matrix4}
 */
Matrix4.prototype.transposeOf = function(m) {
	var n = this.n, mn = m.n.slice(0);
	
	n[4] = mn[1] , n[8] = mn[2] , n[12] = mn[3];
	n[1] = mn[4] , n[9] = mn[6] , n[13] = mn[7];
	n[2] = mn[8] , n[6] = mn[9] , n[14] = mn[11];
	n[3] = mn[12], n[7] = mn[13], n[11] = mn[14];
	
	return this;
};


/**
 * The copy of m
 * @param {Matrix4} m The source
 * @returns {Matrix4}
 */
Matrix4.prototype.copyOf = function(m) {
	this.n = m.n.slice(0, 16);
	
	return this;
};


/**
 * The 3x4 inverse of the instance
 * <p>Beware: method is <strong>NOT</strong> chainable</p>
 * <p>Components 3x are assumed to be (0.0,0.0,0.0,1.0).</p>
 * @returns {Boolean}
 *	<p>Returns <code>false</code> if the instance is assumed to be singular, <code>true</code> otherwise.</p>
 */
Matrix4.prototype.invert3x4 = function() {
	return this.inverse3x4Of(this);
};

/**
 * The inverse of the instance
 * <p>Beware: method is <strong>NOT</strong> chainable</p>
 * <p>Using the adjoint method.</p>
 * @returns {Boolean} 
 *	<p>Returns <code>false</code> if the instance is assumed to be singular, <code>true</code> otherwise.</p>
 */
Matrix4.prototype.invert = function() {
	return this.inverseOf(this);
};

/**
 * The inverse of the instance
 * <p>Beware: method is <strong>NOT</strong> chainable</p>
 * <p>using gauss-jordan elimination.</p>
 * @returns {Boolean}
 *	<p>Returns <code>false</code> if the instance is singular, <code>true</code> otherwise.</p>
 */
Matrix4.prototype.invertGauss = function() {
	return this.inverseGaussOf(this);
};


/**
 * The transpose of the instance
 * @returns {Matrix4}
 */
Matrix4.prototype.transpose = function() {
	return this.transposeOf(this);
};
	
	
/**
 * Returns a string representation of the instance
 * @param {Uint} [digits=3] The number of digits
 * @returns {String}
 */
Matrix4.prototype.toString = function(digits) {
	if (digits === undefined) digits = 3;

	var res = this.constructor.toString();

	for (var i = 0; i < 16; i++) res += (i % 4.0 === 0.0 ? "\n" : "\t") + this.n[i].toFixed(digits);

	return res;
};

/**
 * Returns the <code>{@link Matrix4#determinant}</code> of the instance
 * @returns {Float}
 */
Matrix4.prototype.valueOf = function() {
	return this.determinant;
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Matrix4
 * @type String
 */
Object.defineProperty(Matrix4, 'VERSION', { value: "0.9.15" });


/**
 * Returns a instance of translation vector
 * @param {Vector3}  v       The source
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Translation = function(v, target) {
	var vn = v.n;
	
	var n = [
		  1.0,   0.0,   0.0,   0.0,
		  0.0,   1.0,   0.0,   0.0,
		  0.0,   0.0,   1.0,   0.0,
		vn[0], vn[1], vn[2],   1.0
	];

	if (target === undefined) target = new Matrix4(n);
	else target.n = n;
	
	return target;
};


/**
 * Returns a instance of axes (x,y,z) and translation (t)
 * @param {Vector3}  x       The x-axis vector
 * @param {Vector3}  y       The y-axis vector
 * @param {Vector3}  z       The z-axis vector
 * @param {Vector3}  t       The translation vector
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Vector3 = function(x, y, z, t, target) {
	var n = [].concat(x.n, 0.0, y.n, 0.0, z.n, 0.0, t.n, 1.0);
	
	if (target === undefined) target = new Matrix4(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of m
 * <p>The instance will be padded to 4x4.</p>
 * @param {Matrix3}  m       The source
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Matrix3 = function(m, target) {
	var n = m.n.concat([0.0, 0.0, 0.0, 0.0, 1.0]);
	n.splice(3, 0, 0.0);
	n.splice(7, 0, 0.0);
	
	if (target === undefined) target = new Matrix4(n);
	else target.n = n;
	
	return target;
};


/**
 * Returns the sum of a and b (a+b)
 * @param {Matrix4}  a       The first summand
 * @param {Matrix4}  b       The second summand
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Add = function(a, b, target) {
	return (target === undefined ? new Matrix4() : target).add(a, b);
};

/**
 * Returns the difference of a and b (a-b)
 * @param {Matrix4}  a       The minuend
 * @param {Matrix4}  b       The subtrahend
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Subtract = function(a, b, target) {
	return (target === undefined ? new Matrix4() : target).subtract(a, b);
};

/**
 * Returns the 3x4 concatenation of a and v (a * Matrix4.Matrix3(Matrix3.Scale(v)))
 * <p>Components 3x are assumed to be (0.0,0.0,0.0,1.0).</p>
 * @param {Matrix4}  m       The matrix
 * @param {Vector3}  v       The vector
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Multiply3x4Vector3Scale = function(m, v, target) {
	return (target === undefined ? new Matrix4() : target).multiply3x4Vector3Scale(m, v);
};

/**
 * Returns the 3x4 concatenation of a and b (a*b)
 * <p>Components 3x are assumed to be (0.0,0.0,0.0,1.0).</p>
 * @param {Matrix4}  a       The first matrix
 * @param {Matrix3}  b       The second matrix
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Multiply3x4Matrix3 = function(a, b, target) {
	return (target === undefined ? new Matrix4() : target).multiply3x4Matrix3(a, b);
};

/**
 * Returns the 3x4 concatenation of a and b (a*b)
 * <p>Components 3x are assumed to be (0.0,0.0,0.0,1.0).</p>
 * @param {Matrix4}  a       The first matrix
 * @param {Matrix4}  b       The second matrix
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Multiply3x4 = function(a, b, target) {
	return (target === undefined ? new Matrix4() : target).multiply3x4(a, b);
};

/**
 * Returns the concatenation of a and b (a*b)
 * @param {Matrix4}  a       The first matrix
 * @param {Matrix4}  b       The second matrix
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Multiply = function(a, b, target) {
	return (target === undefined ? new Matrix4() : target).multiply(a, b);
};


/**
 * Returns the 3x4 inverse of m
 * <p>Components 3x are to be (0.0,0.0,0.0,1.0).</p>
 * <p>Returns <code>null</code> if <code>m</code> is assumed to be singular, the 3x4 inverse of <code>m</code> otherwise.</p>
 * @param {Matrix4}  m       The source
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4|null} 
 */
Matrix4.Inverse3x4 = function(m, target) {
	if (target === undefined) target = new Matrix4();
	
	return target.inverse3x4Of(m) ? target : null;
};

/**
 * Returns the inverse of m
 * <p>Using the adjoint method.</p>
 * <p>Returns <code>null</code> if <code>m</code> is assumed to be singular, the 4x4 inverse of <code>m</code> otherwise.</p>
 * @param {Matrix4}  m       The source
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4|null} 
 */
Matrix4.Inverse = function(m, target) {
	if (target === undefined) target = new Matrix4();
	
	return target.inverseOf(m) ? target : null;
};

/**
 * Returns the inverse of m
 * <p>Using gauss-jordan elimination.</p>
 * <p>Returns <code>null</code> if <code>m</code> is singular, the 4x4 inverse of <code>m</code> otherwise.</p>
 * @param {Matrix4}  m       The source
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4|null} 
 */
Matrix4.InverseGauss = function(m, target) {
	if (target === undefined) target = new Matrix4();
	
	return target.inverseGaussOf(m) ? target : null;
};

/**
 * Returns the transpose of m
 * @param {Matrix4}  m       The source
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Transpose = function(m, target) {
	return (target === undefined ? new Matrix4() : target).transposeOf(m);
};

/**
 * Returns a copy of m
 * @param {Matrix4}  m       The source
 * @param {Matrix4} [target] The target instance
 * @returns {Matrix4}
 */
Matrix4.Copy = function(m, target) {
	return (target === undefined ? new Matrix4() : target).copyOf(m);
};


/**
 * Returns <code>true</code> if <code>a</code> and <code>b</code> are equal, <code>false</code> otherwise (a == b)
 * @param {Matrix4} a The protagonist
 * @param {Matrix4} b The antagonist
 * @returns {Boolean}
 */
Matrix4.isEQ = function(a, b) {
	if (a === b) return true;
	
	var an = a.n, bn = b.n;
	
	for (var i = 0; i < 16; i++) {
		if (an[i] !== bn[i]) return false;
	}
	
	return true;
};


/**
 * Returns a type-version string
 * @returns {String}
 */
Matrix4.toString = function() {
	return "[Matrix4-" + Matrix4.VERSION + "]";
};