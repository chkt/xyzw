/**
 * 2x2 transformations
 */
export default class Matrix2 {

	/**
	 * Returns a instance of z-axis rotation
	 * @param {number} rad - The rotation in radians
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Rotation(rad, target) {
		const sin = Math.sin(rad);
		const cos = Math.cos(rad);

		const n = [
			cos, sin,
			-sin, cos
		];

		if (target === undefined) target = new Matrix2(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of scale vector
	 * @param {Vector2} v - The source
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Scale(v, target) {
		const n = [
			v.n[0], 0.0,
			0.0, v.n[1]
		];

		if (target === undefined) target = new Matrix2(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a new instance of axes (x, y)
	 * @param {Vector2} x - The x-axis vector
	 * @param {Vector2} [y] - The y-axis vector
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Vector2(x, y, target) {
		const xn = x.n, yn = y !== undefined ? y.n : [-xn[1], xn[0]];
		const n = [].concat(xn, yn);

		if (target === undefined) target = new Matrix2(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a new instance of converted m
	 * The instance will be cropped to 2x2 by removing the third row & column of m
	 * @param {Matrix3} m - The source
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Matrix3(m, target) {
		const n = m.n.slice(0, 5);

		n.splice(2, 1);

		if (target === undefined) target = new Matrix2(n);
		else target.n = n;

		return target;
	}


	/**
	 * Returns the sum of a and b (a+b)
	 * @param {Matrix2} a - The first summand
	 * @param {Matrix2} b - The second summand
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Add(a, b, target) {
		return (target === undefined ? new Matrix2() : target).add(a, b);
	}

	/**
	 * Returns the difference of a and b (a-b)
	 * @param {Matrix2} a - The minuend
	 * @param {Matrix2} b - The subtrahend
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Subtract(a, b, target) {
		return (target === undefined ? new Matrix2() : target).subtract(a, b);
	}

	/**
	 * Returns the concatenation of a and b (a*b)
	 * @param {Matrix2} a - The first matrix
	 * @param {Matrix2} b - The second matrix
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Multiply(a, b, target) {
		return (target === undefined ? new Matrix2() : target).multiply(a, b);
	}


	/**
	 * Returns the inverse of m
	 * Returns null if m is assumed to be singular, the new instance otherwise
	 * @param {Matrix2} m - The source
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2|null}
	 */
	static Inverse(m, target) {
		if (target === undefined) target = new Matrix2();

		return target.inverseOf(m) ? target : null;
	}

	/**
	 * Returns the transpose of m
	 * @param {Matrix2} m - The source
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Transpose(m, target) {
		return (target === undefined ? new Matrix2() : target).transposeOf(m);
	}

	/**
	 * Returns a copy of m
	 * @param {Matrix2} m - The source
	 * @param {Matrix2} [target] - The target instance
	 * @returns {Matrix2}
	 */
	static Copy(m, target) {
		return (target === undefined ? new Matrix2() : target).copyOf(m);
	}


	/**
	 * Returns true if a and b are equal, false otherwise (a==b)
	 * @param {Matrix2} a - The first matrix
	 * @param {Matrix2} b - The second matrix
	 * @returns {boolean}
	 */
	static isEQ(a, b) {
		if (a === b) return true;

		const an = a.n, bn = b.n;

		for (var i = 0; i < 4; i++) {
			if (an[i] !== bn[i]) return false;
		}

		return true;
	}



	/**
	 * Creates a new instance
	 * @param {number[]} [n] - Array representing 2x2 column-major ordered components
	 * Arrays of length !== 4 will return the identity matrix
	 */
	constructor(n) {
		/**
		 * The array representation
		 * The 4 column-major ordered components
		 * n[0]:n00 n[2]:n01
		 * n[1]:n10 n[3]:n11
		 * @type {number[]}
		 */
		this.n = (n && n.constructor === Array && n.length === 4 ? n : [1.0, 0.0, 0.0, 1.0]);
	}


	/**
	 * Redefines the instance
	 * @param {number[]} [n] - Array representing the 2x2 column-major ordered compoents
	 * Array of length !== 4 will return the identity matrix
	 * @returns {Matrix2}
	 */
	define(n) {
		this.constructor.call(this, n);

		return this;
	}


	/**
	 * row 0, col0, {@link Matrix2#n}[0]
	 * @type {number}
	 */
	get n00() {
		return this.n[0];
	}

	set n00(n) {
		this.n[0] = n;
	}


	/**
	 * row 0, col1, {@link Matrix2#n}[2]
	 * @type {number}
	 */
	get n01() {
		return this.n[2];
	}

	set n01(n) {
		this.n[2] = n;
	}


	/**
	 * row 1, col0, {@link Matrix2#n}[1]
	 * @type {number}
	 */
	get n10() {
		return this.n[1];
	}

	set n10(n) {
		this.n[1] = n;
	}


	/**
	 * row 1, col1, {@link Matrix2#n}[3]
	 * @type {number}
	 */
	get n11() {
		return this.n[3];
	}

	set n11(n) {
		this.n[3] = n;
	}


	/**
	 * The determinant
	 * @type {number}
	 */
	get determinant() {
		return this.n[0] * this.n[3] - this.n[2] * this.n[1];
	}


	/**
	 * The sum of a and b (a+b)
	 * @param {Matrix2} a - The first summand
	 * @param {Matrix2} b - The second summand
	 * @returns {Matrix2}
	 */
	add(a, b) {
		const n = this.n, an = a.n, bn = b.n;

		for (var i = 0; i < 4; i++) n[i] = an[i] + bn[i];

		return this;
	}

	/**
	 * The difference of a and b (a-b)
	 * @param {Matrix2} a - The minuend
	 * @param {Matrix2} b - The subtrahend
	 * @returns {Matrix2}
	 */
	subtract(a, b) {
		const n = this.n, an = a.n, bn = b.n;

		for (var i = 0; i < 4; i++) n[i] = an[i] + bn[i];

		return this;
	}

	/**
	 * The concatenation of a and b (a*b)
	 * @param {Matrix2} a - The first transform
	 * @param {Matrix2} b - The second transform
	 * @returns {Matrix2}
	 */
	multiply(a, b) {
		const n = this.n, an = a.n, bn = b.n;

		const a00 = an[0], a01 = an[2];
		const a10 = an[1], a11 = an[3];

		const b00 = bn[0], b01 = bn[2];
		const b10 = bn[1], b11 = bn[3];

		n[0] = a00 * b00 + a01 * b10;
		n[2] = a00 * b01 + a01 * b11;

		n[1] = a10 * b00 + a11 * b10;
		n[3] = a10 * b01 + a11 * b11;

		return this;
	}


	/**
	 * The inverse of m
	 * Beware: method is NOT chainable
	 * Returns false if m is assumed to be singular, true otherwise
	 * @param {Matrix2} m - The source
	 * @returns {Boolean}
	 */
	inverseOf(m) {
		const n = this.n, mn = m.n;

		const m00 = mn[0], m01 = mn[2];
		const m10 = mn[1], m11 = mn[3];

		let d = m00 * m11 - m01 * m10;

		if (Math.abs(d) < 1.0e-10) return false;

		d = 1.0 / d;

		n[0] =  d * m11, n[2] = -d * m01;
		n[1] = -d * m10, n[3] =  d * m00;

		return true;
	}

	/**
	 * The transpose of m
	 * @param {Matrix2} m - The source
	 * @returns {Matrix2}
	 */
	transposeOf(m) {
		const mn2 = m.n[2];

		this.n[2] = m.n[1];
		this.n[1] = mn2;

		return this;
	}

	/**
	 * The copy of m
	 * @param {Matrix2} m - The source
	 * @returns {Matrix2}
	 */
	copyOf(m) {
		this.n = m.n.slice(0, 4);

		return this;
	}


	/**
	 * The inverse of the instance
	 * Returns false if the instance is assumed to singular, true otherwise
	 * @returns {boolean}
	 */
	invert() {
		return this.inverseOf(this);
	}

	/**
	 * The transpose of the instance
	 * @returns {Matrix2}
	 */
	transpose() {
		return this.transposeOf(this);
	}


	/**
	 * Returns a string representation of the instance
	 * @param {int} [digits=3] - The decimal digits
	 * @returns {string}
	 */
	toString(digits = 3) {
		const str = this.n
			.map((item, index, source) => (index % 2.0 === 0.0 ? "\n" : "\t") + item.toFixed(digits))
			.join("");

		return `[Matrix2]${ str }`;
	}

	/**
	 * Returns the {@link Matrix2#determinant} of the instance
	 * @returns {number}
	 */
	valueOf() {
		return this.determinant;
	}
}
