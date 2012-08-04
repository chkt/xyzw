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
		
		for (var r1 = 0; r1 < 4; r1++) {
			var max = r1, rcol = r1 * 4;
			
			for (var r2 = r1 + 1; r2 < 4; r2++) {
				if (abs(a[r2 + rcol]) > abs(a[max + rcol])) max = r2;
			}
			
			if (max != r1) {
				for (c = 0; c < 4; c++) {
					ccol = c * 4;
					
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
				
				for (var c = 0; c < 4; c++) {
					var ccol = c * 4;
					
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