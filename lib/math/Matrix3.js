/**
 * Matrix3
 * @class 3x3 transformations
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param  {Float[]} [n] Array containing 3x3 column-major ordered components
 *	<p>Arrays different than 3x3 will return the identity matrix.</p>
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
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
	 * The 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Matrix2(Matrix2.Scale(v)))
	 * <p>Components 2x are assumed to be (0, 0, 1).</p>
	 * @param  {Matrix3} m The matrix
	 * @param  {Vector2} v The vector
	 * @return {void}
	 */
	multiply2x3Vector2Scale : function(m, v) {
		var n = this.n, mn = m.n, vn = v.n;
		
		var m00 = mn[0], m01 = mn[3], m02 = mn[6];
		var m10 = mn[1], m11 = mn[4], m12 = mn[7];
		var m20 = mn[2], m21 = mn[5], m22 = mn[8];
		
		var v00 = vn[0], v11 = vn[1];
		
		n[0] = m00 * v00, n[3] = m01 * v11,	n[6] = m02;
		n[1] = m10 * v00, n[4] = m11 * v11,	n[7] = m12;
		n[2] = m20 * v00, n[5] = m21 * v11,	n[8] = m22;
	},
	
	/**
	 * The 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Translation(v))
	 * <p>Components 2x are assumed to be (0, 0, 1).</p>
	 * @param  {Matrix3} m The matrix
	 * @param  {Vector2} v The vector
	 * @return {void}
	 */	
	multiply2x3Vector2Translation : function(m, v) {
		var n = this.n, mn = m.n, vn = v.n;
		
		var m00 = mn[0], m01 = mn[3], m02 = mn[6];
		var m10 = mn[1], m11 = mn[4], m12 = mn[7];
		var m20 = mn[2], m21 = mn[5], m22 = mn[8];
		
		var v02 = vn[0], v12 = vn[1];

		n[0] = m00, n[3] = m01, n[6] = m00 * v02 + m01 * v12 + m02;
		n[1] = m10, n[4] = m11, n[7] = m10 * v02 + m11 * v12 + m12;
		n[2] = m20,	n[5] = m21,	n[8] = m20 * v02 + m21 * v12 + m22;
	},
	
	/**
	 * The 2x3 concatenation of a and b (a*b)
	 * <p>Components 2x are assumed to be (0, 0, 1).</p>
	 * @param  {Matrix3} a The first transform
	 * @param  {Matrix3} b The second transform
	 * @return {void}
	 */	
	multiply2x3 : function(a, b) {
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
		
		if (Math.abs(n[7]) !== 1.0) {
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
		
		if (Math.abs(n[5]) !== 1.0) {
			var y = Math.atan2(-n[2], n[8]);
			var z = Math.atan2(-n[3], n[4]);
		} else {
			y = 0.0;
			z = Math.atan2(n[1], n[0]);
		}
		
		return [x, y, z];
	},
	
	
	/**
	 * Returns a css-formated 2x3 string representation of the instance
	 * <p>Components 2x are assumed to be (0, 0, 1).</p>
	 * @return {String}
	 */
	toCSS2x3 : function() {
		return "matrix(" +
			this.n[0] + "," + this.n[1] + "," +
			this.n[3] + "," + this.n[4] + "," +
			this.n[6] + "," + this.n[7] + ")";
	},
	
	/**
	 * Returns a css-formated 3x3 string representation of the instance
	 * @returns {String}
	 */	
	toCSS : function() {
		return "matrix3d(" +
			this.n[0] + "," + this.n[1] + "," + this.n[2] + "," +
			this.n[3] + "," + this.n[4] + "," + this.n[5] + "," +
			this.n[6] + "," + this.n[7] + "," + this.n[8] + ")";
	},
	
	/**
	 * Returns a string representation of the instance
	 * @param  {Uint}   [digits=3] The decimal digits
	 * @return {String}
	 */
	toString : function(digits) {
		if (digits === undefined) digits = 3;
		
		var res = this.constructor.toString();
		
		for (var i = 0; i < 9; i++) res += (i % 3.0 === 0.0 ? "\n" : "\t") + this.n[i].toFixed(digits);
		
		return res;
	},
	
	/**
	 * Returns the <code>{@link Matrix3#determinant}</code> of the instance
	 * @return {Float}
	 */
	valueOf : function() {
		return this.determinant;
	}
};




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
	
	n[0] = vn[0], n[4] = vn[1],	n[8] = vn[2];
	
	return res;
};

/**
 * Creates a instance from translation vector
 * @param  {Vector2} v The source
 * @return {Matrix3}
 */
Matrix3.Translation = function(v) {
	var res = new Matrix3();
	var n = res.n, vn = v.n;
	
	n[6] = vn[0], n[7] = vn[1];
	
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
 * <p>The instance will be padded to 3x3.</p>
 * @static
 * @param  {Matrix2} m The source
 * @return {Matrix3}
 */
Matrix3.Matrix2 = function(m) {
	var n = m.n.concat([0.0, 0.0, 0.0, 1.0]);
	n.splice(2, 0, 0.0);
	
	return new Matrix3(n);
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
 * Returns the 2x3 concatenation of m and v (m*Matrix3.Matrix2(Matrix2.Scale(v)))
 * <p>Components 2x are assumed to be (0, 0, 1).</p>
 * @static
 * @param  {Matrix3} m The matrix
 * @param  {Vector2} v The vector
 * @return {Matrix3}
 */
Matrix3.multiply2x3Vector2Scale = function(m, v) {
	var res = new Matrix3();
	res.multiply2x3Vector2Scale(m, v);
	return res;
};

/**
 * Returns the 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Translation(v))
 * @param {Matrix3} m
 * @param {Vector2} v
 * @returns {Matrix3}
 */
Matrix3.multiply2x3Vector2Translation = function(m, v) {
	var res = new Matrix3();
	res.multiply2x3Vector2Translation(m, v);
	return res;
};

/**
 * Returns the 2x3 concatenation of a and b (a*b)
 * <p>Components 2x are assumed to be (0, 0, 1).</p>
 * @param  {Matrix3} a The first transform
 * @param  {Matrix3} b The second transform
 * @return {Matrix3}
 */
Matrix3.multiply2x3 = function(a, b) {
	var res = new Matrix3();
	res.multiply2x3(a, b);
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
		if (an[i] !== bn[i]) return false;
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
Matrix3.version = "0.5.4";