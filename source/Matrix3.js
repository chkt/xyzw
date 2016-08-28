import Matrix2 from './Matrix2';



/**
 * 2x3 and 3x3 transformations
 */
export default class Matrix3 {

	/**
	 * Returns a instance of axis and rotation
	 * @constructor
	 * @param {Vector3} axis - The rotation axis
	 * @param {Float} rad - The rotation in radians
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Rotation(axis, rad, target) {
		const n = [];

		const x = axis.n[0], y = axis.n[1], z = axis.n[2];
		const sin = Math.sin(rad), cos = Math.cos(rad), vers = 1.0 - cos;

		const xSin = x * sin, ySin = y * sin, zSin = z * sin;
		const xyVers = x * y * vers, xzVers = x * z * vers, yzVers = y * z * vers;

		n[0] = cos + vers * x * x; n[3] = xyVers - zSin;      n[6] = xzVers + ySin;
		n[1] = xyVers + zSin;      n[4] = cos + vers * y * y; n[7] = yzVers - xSin;
		n[2] = xzVers - ySin;      n[5] = yzVers + xSin;      n[8] = cos + vers * z * z;

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of x-axis rotation
	 * @constructor
	 * @param {Float} rad - The rotation in radians
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static RotationX(rad, target) {
		const sin = Math.sin(rad);
		const cos = Math.cos(rad);

		const n = [
			1.0, 0.0, 0.0,
			0.0, cos, sin,
			0.0, -sin, cos
		];

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of y-axis rotation
	 * @constructor
	 * @param {Float} rad - The rotation in radians
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static RotationY(rad, target) {
		const sin = Math.sin(rad);
		const cos = Math.cos(rad);

		const n = [
			cos, 0.0, sin,
			0.0, 1.0, 0.0,
			-sin, 0.0, cos
		];

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of z-axis rotation
	 * @constructor
	 * @param {Float} rad - The rotation in radians
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static RotationZ(rad, target) {
		const sin = Math.sin(rad);
		const cos = Math.cos(rad);

		const n = [
			cos, sin, 0.0,
			-sin, cos, 0.0,
			0.0, 0.0, 1.0
		];

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}


	/**
	 * Returns a instance of (x,y,z) ordered euler angles
	 * @constructor
	 * @param {Float} x - The first (x-axis) rotation in radians
	 * @param {Float} y - The second (y-axis) rotation in radians
	 * @param {Float} z - The third (z-axis) rotation in radians
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static EulerXYZ(x, y, z, target) {
		const sx = Math.sin(x), cx = Math.cos(x);
		const sy = Math.sin(y), cy = Math.cos(y);
		const sz = Math.sin(z), cz = Math.cos(z);

		const n = [];

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
	}

	/**
	 * Returns a instance of (y,x,z) ordered euler angles
	 * @constructor
	 * @param {Float} x - The second (x-axis) rotation in radians
	 * @param {Float} y - The first (y-axis) rotation in radians
	 * @param {Float} z - The third (z-axis) rotation in radians
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 *
	 */
	static EulerYXZ(x, y, z, target) {
		const sx = Math.sin(x), cx = Math.cos(x);
		const sy = Math.sin(y), cy = Math.cos(y);
		const sz = Math.sin(z), cz = Math.cos(z);

		const n = [];

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
	}

	/**
	 * Returns a instance of (z,x,y) ordered euler angles
	 * @constructor
	 * @param {Float} x - The second (x-axis) rotation in radians
	 * @param {Float} y - The third (y-axis) rotation in radians
	 * @param {Float} z - The first (z-axis) rotation in radians
	 * @param {Matrix3} [target] - The target instance
	 * @return {Matrix3}
	 */
	static EulerZXY(x, y, z, target) {
		const sx = Math.sin(x), cx = Math.cos(x);
		const sy = Math.sin(y), cy = Math.cos(y);
		const sz = Math.sin(z), cz = Math.cos(z);

		const n = [];

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
	}


	/**
	 * Returns a instance of scale vector
	 * @constructor
	 * @param {Vector3} v - The source
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Scale(v, target) {
		const vn = v.n;

		const n = [
			vn[0], 0.0, 0.0,
			0.0, vn[1], 0.0,
			0.0, 0.0, vn[2]
		];

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of translation vector
	 * @constructor
	 * @param {Vector2} v - The source
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Translation(v, target) {
		const vn = v.n;

		const n = [
			1.0, 0.0, 0.0,
			0.0, 1.0, 0.0,
			vn[0], vn[1], 1.0
		];

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of axes (x, y, z)
	 * @constructor
	 * @param {Vector3} x - The x-axis vector
	 * @param {Vector3} y - The y-axis vector
	 * @param {Vector3} z - The z-axis vector
	 * @param {Matrix3} [target] - The target instance
	 * @return {Matrix3}
	 */
	static Vector3(x, y, z, target) {
		const n = [].concat(x.n, y.n, z.n);

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of unit-quaternion q
	 * @constructor
	 * @param {Vector4} q - The source
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Vector4(q, target) {
		const qn = q.n, n = [];

		const x = qn[0], y = qn[1], z = qn[2], w = qn[3];

		const xx = x * x, yy = y * y, zz = z * z;
		const xy = x * y, yz = y * z, xz = x * z;
		const xw = x * w, yw = y * w, zw = z * w;

		const s = 2.0 / Math.sqrt(xx + yy + zz + w * w);

		n[0] = 1.0 - s * (yy + zz); n[1] =       s * (xy + zw); n[2] =       s * (xz - yw);
		n[3] =       s * (xy - zw); n[4] = 1.0 - s * (xx + zz); n[5] =       s * (yz + xw);
		n[6] =       s * (xz + yw); n[7] =       s * (yz - xw); n[8] = 1.0 - s * (xx + yy);

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}


	/**
	 * Returns a instance of m
	 * The instance will be padded to 3x3
	 * @constructor
	 * @param {Matrix2} m - The source
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Matrix2(m, target) {
		const n = m.n.concat([0.0, 0.0, 0.0, 1.0]);

		n.splice(2, 0, 0.0);

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of m
	 * The instance will be cropped to 3x3 by removing the fourth row & column of m
	 * @constructor
	 * @param {Matrix4} m - The source
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Matrix4(m, target) {
		const n = m.n.slice(0, 11);

		n.splice(7, 1);
		n.splice(3, 1);

		if (target === undefined) target = new Matrix3(n);
		else target.n = n;

		return target;
	}


	/**
	 * Returns the sum of a and b (a+b)
	 * @constructor
	 * @param {Matrix3} a - The first summand
	 * @param {Matrix3} b - The second summand
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Add(a, b, target) {
		return (target === undefined ? new Matrix3() : target).add(a, b);
	}

	/**
	 * Returns the difference of a and b (a-b)
	 * @constructor
	 * @param {Matrix3} a - The minuend
	 * @param {Matrix3} b - The subtrahend
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Subtract(a, b, target) {
		return (target === undefined ? new Matrix3() : target).subtract(a, b);
	}

	/**
	 * Returns the 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Matrix2(Matrix2.Scale(v)))
	 * Components 2x are assumed to be (0.0,0.0,1.0)
	 * @constructor
	 * @param {Matrix3} m - The matrix
	 * @param {Vector2} v - The vector
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Multiply2x3Vector2Scale(m, v, target) {
		return (target === undefined ? new Matrix3() : target).multiply2x3Vector2Scale(m, v);
	}

	/**
	 * Returns the 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Translation(v))
	 * @constructor
	 * @param {Matrix3} m - The matrix
	 * @param {Vector2} v - The vector
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Multiply2x3Vector2Translation(m, v, target) {
		return (target === undefined ? new Matrix3() : target).multiply2x3Vector2Translation(m, v);
	}

	/**
	 * Returns the 2x3 concatenation of a and b (a*b)
	 * Components 2x are assumed to be (0.0,0.0,1.0)
	 * @constructor
	 * @param {Matrix3} a - The first transform
	 * @param {Matrix2} b - The second transform
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Multiply2x3Matrix2(a, b, target) {
		return (target === undefined ? new Matrix3() : target).multiply2x3Matrix2(a, b);
	}

	/**
	 * Returns the 2x3 concatenation of a and b (a*b)
	 * Components 2x are assumed to be (0.0,0.0,1.0)
	 * @constructor
	 * @param {Matrix3} a - The first transform
	 * @param {Matrix3} b - The second transform
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Multiply2x3(a, b, target) {
		return (target === undefined ? new Matrix3() : target).multiply2x3(a, b);
	}

	/**
	 * Returns the concatenation of a and b (a*b)
	 * @constructor
	 * @param {Matrix3} a - The first transform
	 * @param {Matrix3} b - The second transform
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Multiply(a, b, target) {
		return (target === undefined ? new Matrix3() : target).multiply(a, b);
	}


	/**
	 * Returns the inverse of m
	 * Returns null if m is assumed to be singular, the inverse of m otherwise
	 * @constructor
	 * @param {Matrix3} m - The source
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3|null}
	 */
	static Inverse(m, target) {
		if (target === undefined) target = new Matrix3();

		return target.inverseOf(m) ? target : null;
	}

	/**
	 * Returns the transpose of m
	 * @constructor
	 * @param {Matrix3} m - The source
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Transpose(m, target) {
		return (target === undefined ? new Matrix3() : target).transposeOf(m);
	}

	/**
	 * Returns a copy of m
	 * @constructor
	 * @param {Matrix3} m - The source
	 * @param {Matrix3} [target] - The target instance
	 * @returns {Matrix3}
	 */
	static Copy(m, target) {
		return (target === undefined ? new Matrix3() : target).copyOf(m);
	}


	/**
	 * Returns true if a and b are equal, false otherwise
	 * @param {Matrix3} a - The protagonist
	 * @param {Matrix3} b - The antagonist
	 * @returns {Boolean}
	 */
	static isEQ(a, b) {
		if (a === b) return true;

		const an = a.n, bn = b.n;

		for (var i = 0; i < 9; i++) {
			if (an[i] !== bn[i]) return false;
		}

		return true;
	}



	/**
	 * Creates a new instance
	 * @param {Float[]} [n] - Array represeting 3x3 column-major ordered components
	 * Arrays of length <em>!== 9</em> will return the identity matrix
	 */
	constructor(n) {
		/**
		 * The array representation
		 * Contains the 9 column-major ordered components of the instance
		 * n[0]:n00 n[3]:n01 n[6]:n02
		 * n[1]:n10 n[4]:n11 n[7]:n12
		 * n[2]:n20 n[5]:n21 n[8]:n22
		 * @type Float[]
		 */
		this.n = (n && n.constructor === Array && n.length === 9 ? n : [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]);
	}


	/**
	 * Redefines the instance
	 * @param {Float[]} [n] - Array representing 3x3 column-major ordered components
	 * Arrays of length <em>!== 9</em> will return the identity matrix.
	 * @returns {Matrix3}
	 */
	define(n) {
		this.constructor.call(this, n);

		return this;
	}


	/**
	 * row 0, col 0, {@link Matrix3#n}[0]
	 * @type Float
	 */
	get n00() {
		return this.n[0];
	}

	set n00(n) {
		this.n[0] = n;
	}


	/**
	 * row 0, col 1, {@link Matrix3#n}[3]
	 * @type Float
	 */
	get n01() {
		return this.n[3];
	}

	set n01(n) {
		this.n[3] = n;
	}


	/**
	 * row 0, col 2, {@link Matrix3#n}[6]
	 * @type Float
	 */
	get n02() {
		return this.n[6];
	}

	set n02(n) {
		this.n[6] = n;
	}


	/**
	 * row 1, col 0, {@link Matrix3#n}[1]
	 * @type Float
	 */
	get n10() {
		return this.n[1];
	}

	set n10(n) {
		this.n[1] = n;
	}


	/**
	 * row 1, col 1, {@link Matrix3#n}[4]
	 * @type Float
	 */
	get n11() {
		return this.n[4];
	}

	set n11(n) {
		this.n[4] = n;
	}


	/**
	 * row 1, col 2, {@link Matrix3#n}[7]
	 * @type Float
	 */
	get n12() {
		return this.n[7];
	}

	set n12(n) {
		this.n[7] = n;
	}


	/**
	 * row 2, col 0, {@link Matrix3#n}[2]
	 * @type Float
	 */
	get n20() {
		return this.n[2];
	}

	set n20(n) {
		this.n[2] = n;
	}


	/**
	 * row 2, col 1, {@link Matrix3#n}[5]
	 * @type Float
	 */
	get n21() {
		return this.n[5];
	}

	set n21(n) {
		this.n[5] = n;
	}


	/**
	 * row 2, col 2, {@link Matrix3#n}[8]
	 * @type Float
	 */
	get n22() {
		return this.n[8];
	}

	set n22(n) {
		this.n[8] = n;
	}


	/**
	 * The determinant
	 * @type Float
	 */
	get determinant() {
		const n = this.n;

		const n10 = n[1], n11 = n[4], n12 = n[7];
		const n20 = n[2], n21 = n[5], n22 = n[8];

		return n[0] * (n11 * n22 - n12 * n21) + n[3] * (n12 * n20 - n10 * n22) + n[6] * (n10 * n21 - n11 * n20);
	}


	/**
	 * The sum of a and b (a+b)
	 * @param {Matrix3} a - The first summand
	 * @param {Matrix3} b - The second summand
	 * @returns {Matrix3}
	 */
	add(a, b) {
		const n = this.n, an = a.n, bn = b.n;

		for (var i = 0; i < 9; i++) n[i] = an[i] + bn[i];

		return this;
	}

	/**
	 * The difference of a and b (a-b)
	 * @param {Matrix3} a - The minuend
	 * @param {Matrix3} b - The subtrahend
	 * @returns {Matrix3}
	 */
	subtract(a, b) {
		const n = this.n, an = a.n, bn = b.n;

		for (var i = 0; i < 9; i++) n[i] = an[i] - bn[i];

		return this;
	}

	/**
	 * The 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Matrix2(Matrix2.Scale(v)))
	 * Components 2x are assumed to be (0.0,0.0,1.0)
	 * @param {Matrix3} m - The matrix
	 * @param {Vector2} v - The vector
	 * @returns {Matrix3}
	 */
	multiply2x3Vector2Scale(m, v) {
		const n = this.n = m.n.slice(0), vn = v.n;

		const v00 = vn[0], v11 = vn[1];

		n[0] *= v00, n[3] *= v11;
		n[1] *= v00, n[4] *= v11;
		n[2] *= v00, n[5] *= v11;

		return this;
	}

	/**
	 * The 2x3 concatenation of m and matrix-transformed v (m*Matrix3.Translation(v))
	 * Components 2x are assumed to be (0.0,0.0,1.0)
	 * @param {Matrix3} m - The matrix
	 * @param {Vector2} v - The vector
	 * @returns {Matrix3}
	 */
	multiply2x3Vector2Translation(m, v) {
		const n = this.n, mn = m.n, vn = v.n;

		const m00 = mn[0], m01 = mn[3], m02 = mn[6];
		const m10 = mn[1], m11 = mn[4], m12 = mn[7];
		const m20 = mn[2], m21 = mn[5], m22 = mn[8];

		const v02 = vn[0], v12 = vn[1];

		n[0] = m00, n[3] = m01, n[6] = m00 * v02 + m01 * v12 + m02;
		n[1] = m10, n[4] = m11, n[7] = m10 * v02 + m11 * v12 + m12;
		n[2] = m20,	n[5] = m21,	n[8] = m20 * v02 + m21 * v12 + m22;

		return this;
	}

	/**
	 * The 2x3 concatenation of a and b (a*b)
	 * Components 2x are assumed to be (0.0,0.0,1.0)
	 * @param {Matrix3} a - The first transform
	 * @param {Matrix2} b - The second transform
	 * @returns {Matrix3}
	 */
	multiply2x3Matrix2(a, b) {
		const n = this.n;

		const [a00, a10, a20, a01, a11, a21, a02, a12, a22] = a.n;
		const [b00, b10, b01, b11] = b.n;

		n[0] = a00 * b00 + a01 * b10;
		n[3] = a00 * b01 + a01 * b11;
		n[6] = a02;

		n[1] = a10 * b00 + a11 * b10;
		n[4] = a10 * b01 + a11 * b11;
		n[7] = a12;

		n[2] = n[5] = 0.0;
		n[8] = 1.0;

		return this;
	}

	/**
	 * The 2x3 concatenation of a and b (a*b)
	 * Components 2x are assumed to be (0.0,0.0,1.0)
	 * @param {Matrix3} a - The first transform
	 * @param {Matrix3} b - The second transform
	 * @returns {Matrix3}
	 */
	multiply2x3(a, b) {
		const n = this.n, an = a.n, bn = b.n;

		const a00 = an[0], a01 = an[3], a02 = an[6];
		const a10 = an[1], a11 = an[4], a12 = an[7];

		const b00 = bn[0], b01 = bn[3], b02 = bn[6];
		const b10 = bn[1], b11 = bn[4], b12 = bn[7];

		n[0] = a00 * b00 + a01 * b10;
		n[3] = a00 * b01 + a01 * b11;
		n[6] = a00 * b02 + a01 * b12 + a02;

		n[1] = a10 * b00 + a11 * b10;
		n[4] = a10 * b01 + a11 * b11;
		n[7] = a10 * b02 + a11 * b12 + a12;

		n[2] = n[5] = 0.0;
		n[8] = 1.0;

		return this;
	}

	/**
	 * The concatenation of a and b (a*b)
	 * @param {Matrix3} a - The first transform
	 * @param {Matrix3} b - The second transform
	 * @returns {Matrix3}
	 */
	multiply(a, b) {
		const n = this.n, an = a.n, bn = b.n;

		const a00 = an[0], a01 = an[3], a02 = an[6];
		const a10 = an[1], a11 = an[4], a12 = an[7];
		const a20 = an[2], a21 = an[5], a22 = an[8];

		const b00 = bn[0], b01 = bn[3], b02 = bn[6];
		const b10 = bn[1], b11 = bn[4], b12 = bn[7];
		const b20 = bn[2], b21 = bn[5], b22 = bn[8];

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
	}


	/**
	 * The inverse of m
	 * Beware: method is NOT chainable
	 * @param {Matrix3} m - The source
	 * @returns {Boolean}
	 * Returns false if m is assumed to be singular, true otherwise
	 */
	inverseOf(m) {
		let n = this.n, mn = m.n, d = m.determinant;

		if (Math.abs(d) < 1.0e-10) return false;

		d = 1.0 / d;

		const m00 = mn[0], m01 = mn[3], m02 = mn[6];
		const m10 = mn[1], m11 = mn[4], m12 = mn[7];
		const m20 = mn[2], m21 = mn[5], m22 = mn[8];

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
	}

	/**
	 * The transpose of m
	 * @param {Matrix3} m - The source
	 * @returns {Matrix3}
	 */
	transposeOf(m) {
		const n = this.n, mn = m.n.slice(0, 9);

		n[3] = mn[1], n[6] = mn[2];
		n[1] = mn[3], n[7] = mn[5];
		n[2] = mn[6], n[5] = mn[7];

		return this;
	}

	/**
	 * The copy of m
	 * @param {Matrix3} m - The source
	 * @returns {Matrix3}
	 */
	copyOf(m) {
		this.n = m.n.slice(0, 9);

		return this;
	}


	/**
	 * The inverse of the instance
	 * Beware: method is NOT chainable
	 * @returns {Boolean}
	 * Returns false if the instance is assumed to be singular, true otherwise
	 */
	invert() {
		return this.inverseOf(this);
	}

	/**
	 * The transpose of the instance
	 * @returns {Matrix3}
	 */
	transpose() {
		return this.transposeOf(this);
	}


	/**
	 * Returns a (x,y,z) ordered (y,x,z) euler angle representation of the instance
	 * @returns {Float[]}
	 */
	toEulerYXZ() {
		const n = this.n, x = Math.asin(-n[7]);
		let y, z;

		if (Math.abs(n[7]) !== 1.0) {
			y = Math.atan2(n[6], n[8]);
			z = Math.atan2(n[1], n[4]);
		}
		else {
			y = Math.atan2(n[3], n[0]);
			z = 0.0;
		}

		return [x, y, z];
	}

	/**
	 * Returns a (x,y,z) ordered (z,x,y) euler angle representation of the instance
	 * @returns {Float[]}
	 */
	toEulerZXY() {
		const n = this.n, x = Math.asin(-n[5]);
		let y, z;

		if (Math.abs(n[5]) !== 1.0) {
			y = Math.atan2(-n[2], n[8]);
			z = Math.atan2(-n[3], n[4]);
		}
		else {
			y = 0.0;
			z = Math.atan2(n[1], n[0]);
		}

		return [x, y, z];
	}

	/**
	 * Returns a css-formated 2x3 string representation of the instance
	 * Components 2x are assumed to be (0.0,0.0,1.0)
	 * @param {Uint} [digits=3] - The decimal digits
	 * @returns {String}
	 */
	toCSS2x3(digits = 3) {
		const str = this.n
			.filter((item, index, source) => index % 3 !== 2)
			.map((item, index, source) => item.toFixed(digits))
			.join(",");

		return `matrix(${ str })`;
	}

	/**
	 * Returns a css-formated 3x3 string representation of the instance
	 * @param {Uint} [digits=3] - The decimal digits
	 * @returns {String}
	 */
	toCSS(digits = 3) {
		const str = this.n
			.map((item, index, source) => item.toFixed(digits))
			.join(",");

		return `matrix3d(${ str })`;
	}

	/**
	 * Returns a string representation of the instance
	 * @param {Uint} [digits=3] - The decimal digits
	 * @returns {String}
	 */
	toString(digits = 3) {
		const str = this.n
			.map((item, index, source) => (index % 3 === 0.0 ? "\n" : "\t") + item.toFixed(digits))
			.join("");

		return `[Matrix3]${ str }`;
	}

	/**
	 * Returns the {@link Matrix3#determinant} of the instance
	 * @returns {Float}
	 */
	valueOf() {
		return this.determinant;
	}
}
