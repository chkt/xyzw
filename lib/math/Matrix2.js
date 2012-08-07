function Matrix2(n) {
	this.n = (n && n.constructor == Array && n.length == 4 ? n : [1.0, 0.0, 0.0, 1.0]);
}

Matrix2.prototype = {};

Matrix2.prototype.constructor = Matrix2;


Matrix2.prototype.define = function(n) {
	Matrix2.call(this, n);
};


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


Object.defineProperty(Matrix2.prototype, 'determinant', {
	get : function() {
		return this.n[0] * this.n[3] - this.n[2] * this.n[1];
	},
	configurable : true,
	enumerable : true
});


Matrix2.prototype.add = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	for (var i = 0; i < 4; i++) n[i] = an[i] + bn[i];
};

Matrix2.prototype.subtract = function(a, b) {
	var n = this.n, an = a.n, bn = b.n;
	for (var i = 0; i < 4; i++) n[i] = an[i] + bn[i];
};

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

Matrix2.prototype.transposeOf = function(m) {
	this.n[2] = m.n[1];
	this.n[1] = m.n[2];
};


Matrix2.prototype.copyOf = function(m) {
	this.n = m.n.slice(0, 4);
};


Matrix2.prototype.invert = function() {
	return this.inverseOf(this);
};

Matrix2.prototype.transpose = function() {
	var swap = this.n[1];
	this.n[1] = this.n[2];
	this.n[2] = swap;
};


Matrix2.prototype.toString = function() {
	var res = this.constructor;
	for (var i = 0; i < 4; i++) res += (i % 2.0 == 0.0 ? "\n" : "\t") + this.n[i].toString().replace(/(\.\d{3})\d*$/, "$1");
	return res;
};



Object.defineProperty(Matrix2, 'VERSION', {value : "0.5.0"});


Object.defineProperty(Matrix2, 'IDENTITY', {
	get : function() {
		return new Matrix2();
	},
	configurable : true,
	enumerable : true
});


Matrix2.Rotation = function(rad, target) {
	if (!target) target = new Matrix2();
	
	var n = target.n;
	
	var sin = Math.sin(rad);
	var cos = Math.cos(rad);
	
	n[0] = cos, n[2] = -sin;
	n[1] = sin, n[3] =  cos;
	
	return target;
};

Matrix2.Scale = function(v, target) {
	if (!target) target = new Matrix2();
	
	target.n[0] = v.n[0];
	target.n[3] = v.n[1];
	
	return target;
};


Matrix2.Vector2 = function(x, y, target) {	
	var n = [].concat(x.n, y.n);
	
	if (target) target.n = n;
	else target = new Matrix2(n);
	
	return target;
};


Matrix2.Matrix3 = function(m, target) {
	var n = m.n.slice(0, 5);
	n.splice(2, 1);
	
	if (target) target.n = n;
	else target = new Matrix2(n);
	
	return target;
};


Matrix2.add = function(a, b) {
	var res = new Matrix2();
	res.add(a, b);
	return res;
};

Matrix2.subtract = function(a, b) {
	var res = new Matrix2();
	res.subtract(a, b);
	return res;
};

Matrix2.multiply = function(a, b) {
	var res = new Matrix2();
	res.multiply(a, b);
	return res;
};


Matrix2.inverse = function(m) {
	var res = new Matrix2();
	return res.inverseOf(m) ? res : null;
};

Matrix2.copy = function(m) {
	return new Matrix2(m.n.slice(0, 4));
};


Matrix2.isEQ = function(a, b) {
	var an = a.n, bn = b.n;
	
	for (var i = 0; i < 4; i++) {
		if (an[i] != bn[i]) return false;
	}
	
	return true;
};


Matrix2.toString = function() {
	return "[Matrix2-" + Matrix2.VERSION + "]";
};