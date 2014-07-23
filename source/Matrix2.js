/**
 * Creates a new instance
 * @class 2x2 transformations
 * @author Christoph Kettelhoit <ck@christoph-kettelhoit.de>
 * @param  {Float[]} [n] Array representing 2x2 column-major ordered components
 *   <p>Arrays of length <em>!== 4</em> will return the identity matrix.</p>
 * @returns {Matrix2}
 * @license Licensed under the MIT License
 */
function Matrix2(n) {
	/**
	 * The array representation
	 * <p>The 4 column-major ordered components.</p>
	 * <p>n[0]:n00 n[2]:n01</p>
	 * <p>n[1]:n10 n[3]:n11</p>
	 * @type Float[]
	 */
	this.n = (n && n.constructor === Array && n.length === 4 ? n : [1.0, 0.0, 0.0, 1.0]);
}


/**
 * (Re)defines the instance
 * @param {Float[]} [n] Array representing the 2x2 column-major ordered compoents
 *   <p>Array of length <em>!== 4</em> will return the identity matrix.</p>
 * @returns {Matrix2}
 */
Matrix2.prototype.define = function(n) {
	Matrix2.call(this, n);
	
	return this;
};


/**
 * row 0, col 0, <code>{@link Matrix2#n}[0]</code>
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
 * row 0, col 1, <code>{@link Matrix2#n}[2]</code>
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
 * row 1, col 0, <code>{@link Matrix2#n}[1]</code>
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
 * row 1, col 1, <code>{@link Matrix2#n}[3]</code>
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
 * @readonly
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
 * @param {Matrix2} a The first summand
 * @param {Matrix2} b The second summand
 * @returns {Matrix2}
 */
Matrix2.prototype.add = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	
	for (var i = 0; i < 4; i++) n[i] = an[i] + bn[i];
	
	return this;
};

/**
 * The difference of a and b (a-b)
 * @param {Matrix2} a The minuend
 * @param {Matrix2} b The subtrahend
 * @returns {Matrix2}
 */
Matrix2.prototype.subtract = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	
	for (var i = 0; i < 4; i++) n[i] = an[i] + bn[i];
	
	return this;
};

/**
 * The concatenation of a and b (a*b)
 * @param {Matrix2} a The first transform
 * @param {Matrix2} b The second transform
 * @returns {Matrix2}
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
	
	return this;
};


/**
 * The inverse of m
 * <p>Beware: method is <strong>NOT</strong> chainable</p>
 * <p>Returns <code>false</code> if <code>m</code> is assumed to be singular, <code>true</code> otherwise</p>
 * @param {Matrix2} m The source
 * @returns {Boolean}
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
 * @param {Matrix2} m The source
 * @returns {Matrix2}
 */
Matrix2.prototype.transposeOf = function(m) {
	var mn2 = m.n[2];
	
	this.n[2] = m.n[1];
	this.n[1] = mn2;
	
	return this;
};

/**
 * The copy of m
 * @param {Matrix2} m The source
 * @returns {Matrix2}
 */
Matrix2.prototype.copyOf = function(m) {
	this.n = m.n.slice(0, 4);
	
	return this;
};


/**
 * The inverse of the instance
 * <p>Returns <code>false</code> if the instance is assumed to singular, <code>true</code> otherwise.</p>
 * @returns {Boolean}
 */
Matrix2.prototype.invert = function() {
	return this.inverseOf(this);
};

/**
 * The transpose of the instance
 * @returns {Matrix2}
 */
Matrix2.prototype.transpose = function() {
	return this.transposeOf(this);
};


/**
 * Returns a string representation of the instance
 * @param {Uint} [digits=3] The decimal digits
 * @returns {String}
 */
Matrix2.prototype.toString = function(digits) {
	if (digits === undefined) digits = 3;
		
	var res = this.constructor.toString();
	
	for (var i = 0; i < 4; i++) res += (i % 2.0 === 0.0 ? "\n" : "\t") + this.n[i].toFixed(digits);
	
	return res;
};

/**
 * Returns the <code>{@link Matrix2#determinant}</code> of the instance
 * @returns {Float}
 */
Matrix2.prototype.valueOf = function() {
	return this.determinant;
};




/**
 * The version string
 * @static
 * @constant
 * @name VERSION
 * @memberOf Matrix2
 * @type String
 */
Object.defineProperty(Matrix2, 'VERSION', {value : "0.5.3"});


/**
 * Returns a instance of z-axis rotation
 * @param {Float}    rad     The rotation in radians
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Rotation = function(rad, target) {	
	var sin = Math.sin(rad);
	var cos = Math.cos(rad);
	
	var n = [
		 cos,  sin,
		-sin,  cos
	];

	if (target === undefined) target = new Matrix2(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns a instance of scale vector
 * @param {Vector2}  v       The source
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Scale = function(v, target) {
	var n = [
		v.n[0],    0.0,
		   0.0, v.n[1]
	];
	
	if (target === undefined) target = new Matrix2(n);
	else target.n = n;
	
	return target;
};

/** 
 * Returns a new instance of axes (x, y)
 * @param {Vector2}  x       The x-axis vector
 * @param {Vector2}  y       The y-axis vector
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Vector2 = function(x, y, target) {	
	var n = [].concat(x.n, y.n);
	
	if (target === undefined) target = new Matrix2(n);
	else target.n = n;
	
	return target;
};


/**
 * Returns a new instance of converted m
 * <p>The instance will be cropped to 2x2 by removing the third row & column of m.</p>
 * @param {Matrix3}  m       The source
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Matrix3 = function(m, target) {
	var n = m.n.slice(0, 5);
	n.splice(2, 1);
	
	if (target === undefined) target = new Matrix2(n);
	else target.n = n;
	
	return target;
};

/**
 * Returns the sum of a and b (a+b)
 * @param {Matrix2}  a       The first summand
 * @param {Matrix2}  b       The second summand
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Add = function(a, b, target) {
	return (target === undefined ? new Matrix2() : target).add(a, b);
};

/**
 * Returns the difference of a and b (a-b)
 * @param {Matrix2}  a       The minuend
 * @param {Matrix2}  b       The subtrahend
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Subtract = function(a, b, target) {
	return (target === undefined ? new Matrix2() : target).add(a, b);
};

/**
 * Returns the concatenation of a and b (a*b)
 * @param {Matrix2}  a       The first matrix
 * @param {Matrix2}  b       The second matrix
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Multiply = function(a, b, target) {
	return (target === undefined ? new Matrix2() : target).multiply(a, b);
};


/**
 * Returns the inverse of m
 * <p>Returns <code>null</code> if <code>m</code> is assumed to be singular, the new instance otherwise
 * @param {Matrix2}  m       The source
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2|null}
 */
Matrix2.Inverse = function(m, target) {
	if (target === undefined) target = new Matrix2();
	
	return target.inverseOf(m) ? target : null;
};

/**
 * Returns the transpose of m
 * @param {Matrix2}  m       The source
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Transpose = function(m, target) {
	return (target === undefined ? new Matrix2() : target).transposeOf(m);
};


/**
 * Returns a copy of m
 * @param {Matrix2}  m       The source
 * @param {Matrix2} [target] The target instance
 * @returns {Matrix2}
 */
Matrix2.Copy = function(m, target) {
	return (target === undefined ? new Matrix2() : target).copyOf(m);
};


/**
 * Returns <code>true</code> if <code>a</code> and <code>b</code> are equal, <code>false</code> otherwise (a==b)
 * @param {Matrix2} a The first matrix
 * @param {Matrix2} b The second matrix
 * @returns {Boolean}
 */
Matrix2.isEQ = function(a, b) {
	if (a === b) return true;
	
	var an = a.n, bn = b.n;
	
	for (var i = 0; i < 4; i++) {
		if (an[i] !== bn[i]) return false;
	}
	
	return true;
};


/**
 * Returns a type-version string
 * @return {String}
 */
Matrix2.toString = function() {
	return "[Matrix2-" + Matrix2.VERSION + "]";
};