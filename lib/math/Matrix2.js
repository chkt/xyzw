/**
 * Creates a new instance
 * @class 2x2 transformations
 * @author <a href="mailto:ck@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param  {Float[]} [n] Array containing 2x2 column-major ordered components
 *   <p>Arrays different than 2x2 will return the identity matrix.</p>
 * @return {Matrix2}
 */
function Matrix2(n) {
	/**
	 * The array representation
	 * <p>The 4 column-major ordered components.</p>
	 * <p>n[0]:n00 n[2]:n01</p>
	 * <p>n[1]:n10 n[3]:n11</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor == Array && n.length == 4 ? n : [1.0, 0.0, 0.0, 1.0]);
}

Matrix2.prototype = {};

/**
 * The constructor
 * @type Function
 */
Matrix2.prototype.constructor = Matrix2;


/**
 * (Re)defines the instance
 * @param {Float[]} [n] Array containing the 2x2 column-major ordered compoents
 *   <p>Array different than 2x2 will return the identity matrix.</p>
 * @return {void}
 */
Matrix2.prototype.define = function(n) {
	Matrix2.call(this, n);
};


/**
 * row 0, col 0, n[0]
 * @see Matrix2#n
 * @name n00
 * @memberOf Matrix2#
 * @type Float
 */
Object.defineProperty(Matrix2.prototype, 'n00', {
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
 * row 0, col 1, n[2]
 * @see Matrix2#n
 * @name n01
 * @memberOf Matrix2#
 * @type Float
 */
Object.defineProperty(Matrix2.prototype, 'n01', {
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
 * row 1, col 0, n[1]
 * @see Matrix2#n
 * @name n10
 * @memberOf Matrix2#
 * @type Float
 */
Object.defineProperty(Matrix2.prototype, 'n10', {
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
 * row 1, col 1, n[3]
 * @see Matrix2#n
 * @name n11
 * @memberOf Matrix2#
 * @type Float
 */
Object.defineProperty(Matrix2.prototype, 'n11', {
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
 * The determinant
 * <p>[readonly]</p>
 * @name determinant
 * @memberOf Matrix2#
 * @type Float
 */
Object.defineProperty(Matrix2.prototype, 'determinant', {
	get : function() {
		return this.n[0] * this.n[3] - this.n[2] * this.n[1];
	},
	configurable : true,
	enumerable : true
});


/**
 * The sum of a and b (a+b)
 * @param  {Matrix2} a The first summand
 * @param  {Matrix2} b The second summand
 * @return {void}
 */
Matrix2.prototype.add = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	for (var i = 0; i < 4; i++) n[i] = an[i] + bn[i];
};

/**
 * The difference of a and b (a-b)
 * @param  {Matrix2} a The minuend
 * @param  {Matrix2} b The subtrahend
 * @return {void}
 */
Matrix2.prototype.subtract = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	for (var i = 0; i < 4; i++) n[i] = an[i] + bn[i];
};

/**
 * The concatenation of a and b (a*b)
 * @param  {Matrix2} a The first transform
 * @param  {Matrix2} b The second transform
 * @return {void}
 */
Matrix2.prototype.multiply = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	
	var a00 = an[0], a01 = an[2];
	var a10 = an[1], a11 = an[3];
	
	var b00 = bn[0], b01 = bn[2];
	var b10 = bn[1], b11 = bn[3];
	
	n[0] = a00 * b00 + a01 * b10;
	n[2] = a00 * b01 + a01 * b11;
	
	n[1] = a10 * b00 + a11 * b10;
	n[3] = a10 * b01 + a11 * b11;
};


/**
 * The inverse of m
 * <p>Returns <code>false</code> if m is assumed to be singular, <code>true</code> otherwise
 * @param  {Matrix2} m The source
 * @return {Boolean}
 */
Matrix2.prototype.inverseOf = function(m) {
	var n = this.n, mn = m.n;
	
	var m00 = mn[0], m01 = mn[2];
	var m10 = mn[1], m11 = mn[3];
	
	var d = m00 * m11 - m01 * m10;
	
	if (Math.abs(d) < 1.0e-10) return false;
	
	d = 1.0 / d;
	
	n[0] =  d * m11, n[2] = -d * m01;
	n[1] = -d * m10, n[3] =  d * m00;
	
	return true;
};

/**
 * The transpose of m
 * @param  {Matrix2} m The source
 * @return {void}
 */
Matrix2.prototype.transposeOf = function(m) {
	this.n[2] = m.n[1];
	this.n[1] = m.n[2];
};

/**
 * The copy of m
 * @param  {Matrix2} m The source
 * @return {void}
 */
Matrix2.prototype.copyOf = function(m) {
	this.n = m.n.slice(0, 4);
};


/**
 * The inverse of the instance
 * <p>Returns <code>false</code> if the instance is assumed to singular, <code>true</code> otherwise.</p>
 * @return {Boolean}
 */
Matrix2.prototype.invert = function() {
	return this.inverseOf(this);
};

/**
 * The transpose of the instance
 * @return {void}
 */
Matrix2.prototype.transpose = function() {
	var swap = this.n[1];
	this.n[1] = this.n[2];
	this.n[2] = swap;
};


/**
 * Returns a string representation of the instance
 * @return {String}
 */
Matrix2.prototype.toString = function() {
	var res = this.constructor;
	for (var i = 0; i < 4; i++) res += (i % 2.0 == 0.0 ? "\n" : "\t") + this.n[i].toString().replace(/(\.\d{3})\d*$/, "$1");
	return res;
};



/**
 * The version string
 * @static
 * @constant
 * @name VERSION
 * @memberOf Matrix2
 * @type String
 */
Object.defineProperty(Matrix2, 'VERSION', {value : "0.5.0"});


/**
 * A dereferenced instance of the 2x2 identity matrix
 * <p>[readonly]</p>
 * @static
 * @name IDENTITY
 * @memberOf Matrix2
 * @type Matrix2
 */
Object.defineProperty(Matrix2, 'IDENTITY', {
	get : function() {
		return new Matrix2();
	},
	configurable : true,
	enumerable : true
});


/**
 * Returns a new instance from z-axis rotation
 * @static
 * @param  {Float}   rad      The rotation in radians
 * @param  {Matrix2} [target] The target instance
 * @return {Matrix2}
 */
Matrix2.Rotation = function(rad, target) {
	if (!target) target = new Matrix2();
	
	var n = target.n;
	
	var sin = Math.sin(rad);
	var cos = Math.cos(rad);
	
	n[0] = cos, n[2] = -sin;
	n[1] = sin, n[3] =  cos;
	
	return target;
};

/**
 * Returns a new instance from scale vector
 * @static
 * @param  {Vector2} v        The source
 * @param  {Matrix2} [target] The target instance
 * @return {void}
 */
Matrix2.Scale = function(v, target) {
	if (!target) target = new Matrix2();
	
	target.n[0] = v.n[0];
	target.n[3] = v.n[1];
	
	return target;
};

/** 
 * Returns a new instance from axes (x, y)
 * @static
 * @param  {Vector2} x        The x-axis vector
 * @param  {Vector2} y        The y-axis vector
 * @param  {Matrix2} [target] The target instance
 * @return {Matrix2}
 */
Matrix2.Vector2 = function(x, y, target) {	
	var n = [].concat(x.n, y.n);
	
	if (target) target.n = n;
	else target = new Matrix2(n);
	
	return target;
};


/**
 * Returns a new instance from converted m
 * <p>The instance will be cropped to 2x2 by removing the third row & column of m.</p>
 * @static
 * @param  {Matrix3} m        The source
 * @param  {Matrix2} [target] The target instance
 * @return {Matrix2}
 */
Matrix2.Matrix3 = function(m, target) {
	var n = m.n.slice(0, 5);
	n.splice(2, 1);
	
	if (target) target.n = n;
	else target = new Matrix2(n);
	
	return target;
};

/**
 * Returns the sum of a and b (a+b)
 * @static
 * @param  {Matrix2} a The first summand
 * @param  {Matrix2} b The second summand
 * @return {Matrix2}
 */
Matrix2.add = function(a, b) {
	var res = new Matrix2();
	res.add(a, b);
	return res;
};

/**
 * Returns the difference of a and b (a-b)
 * @static
 * @param  {Matrix2} a The minuend
 * @param  {Matrix2} b The subtrahend
 * @return {Matrix2}
 */
Matrix2.subtract = function(a, b) {
	var res = new Matrix2();
	res.subtract(a, b);
	return res;
};

/**
 * Returns the concatenation of a and b (a*b)
 * @static
 * @param  {Matrix2} a The first matrix
 * @param  {Matrix2} b The second matrix
 * @return {Matrix2}
 */
Matrix2.multiply = function(a, b) {
	var res = new Matrix2();
	res.multiply(a, b);
	return res;
};


/**
 * Returns the inverse of m
 * <p>Returns <code>null</code> if m is assumed to be singular, the new instance otherwise
 * @static
 * @param  {Matrix2}      m The source
 * @return {Matrix2|null}
 */
Matrix2.inverse = function(m) {
	var res = new Matrix2();
	return res.inverseOf(m) ? res : null;
};

/**
 * Returns the transpose of m
 * @static
 * @param  {Matrix2} m The source
 * @return {Matrix2}
 */
Matrix2.transpose = function(m) {
	return new Matrix2([m.n[0], m.n[2], m.n[1], m.n[3]]);
};

/**
 * Returns a copy of m
 * @static
 * @param  {Matrix2} m The source
 * @return {Matrix2}
 */
Matrix2.copy = function(m) {
	return new Matrix2(m.n.slice(0, 4));
};


/**
 * Returns <code>true</code> if <code>a</code> and <code>b</code> are equal, <code>false</code> otherwise
 * @param  {Matrix2} a The first matrix
 * @param  {Matrix2} b The second matrix
 * @return {Boolean}
 */
Matrix2.isEQ = function(a, b) {
	var an = a.n, bn = b.n;
	
	for (var i = 0; i < 4; i++) {
		if (an[i] != bn[i]) return false;
	}
	
	return true;
};


/**
 * Returns a type-version string
 * @static
 * @return {String}
 */
Matrix2.toString = function() {
	return "[Matrix2-" + Matrix2.VERSION + "]";
};