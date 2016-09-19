/**
 * Four component vector
 */
export default class Vector4 {

	/**
	 * Returns a unit-quaternion instance of axis and rotation
	 * @constructor
	 * @param {Vector3} axis - The rotation axis
	 * @param {Float} rad - The rotation in radians
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Rotation(axis, rad, target) {
		const sin = Math.sin(rad * 0.5);

		const n = [
			axis.n[0] * sin,
			axis.n[1] * sin,
			axis.n[2] * sin,
			Math.cos(rad * 0.5)
		];

		if (target === undefined) target = new this(n);
		else target.n = n;

		return target.normalize();
	}

	/**
	 * Returns a unit-quaternion instance of Spherical Linear intERPolation
	 * @constructor
	 * @param {Vector4} q - The starting <em>unit quaternion</em>
	 * @param {Vector4} r - The ending <em>unit quaternion</em>
	 * @param {Float} t - The interpolation factor
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static SLERP(q, r, t, target) {
		const qx = q.n[0], qy = q.n[1], qz = q.n[2], qw = q.n[3];
		const rx = r.n[0], ry = r.n[1], rz = r.n[2], rw = r.n[3];

		const a = Math.acos(qx * rx + qy * ry + qz * rz + qw * rw);

		const sin = 1.0 / Math.sin(a);
		const sinQ = Math.sin(a * (1.0 - t));
		const sinR = Math.sin(a * t);

		const n = [
			sinQ * sin * q.n[0] + sinR * sin * r.n[0],
			sinQ * sin * q.n[1] + sinR * sin * r.n[1],
			sinQ * sin * q.n[2] + sinR * sin * r.n[2],
			sinQ * sin * q.n[3] + sinR * sin * r.n[3]
		];

		if (target === undefined) target = new this(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a unit-quaternion instance of a rotation matrix
	 * @constructor
	 * @param {Matrix3} m - The source 3x3 transform
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Matrix3(m, target) {
		const mn = m.n, n = [0.0, 0.0, 0.0, 1.0];
		let s = mn[0] + mn[4] + mn[8] + 1.0;

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

		if (target === undefined) target = new this(n);
		else target.n = n;

		return target;
	}

	/**
	 * Returns a instance of Vector3
	 * @constructor
	 * @param {Vector3} v - The source
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Vector3(v, target) {
		const n = v.n.concat(1.0);

		if (target === undefined) target = new this(n);
		else target.n = n;

		return target;
	}


	/**
	 * Returns the sum of q and r (q+r)
	 * @constructor
	 * @param {Vector4} q - The first summand
	 * @param {Vector4} r - The second summand
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Add(q, r, target) {
		return (target === undefined ? new this() : target).add(q, r);
	}

	/**
	 * Returns the difference of q and r (q-r)
	 * @constructor
	 * @param {Vector4} q - The minuend
	 * @param {Vector4} r - The subtrahend
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Subtract(q, r, target) {
		return (target === undefined ?  new this() : target).subtract(q, r);
	}

	/**
	 * Returns the scalar product of q and n (q*n)
	 * @constructor
	 * @param {Vector4} q - The vector
	 * @param {Float} n - The scalar
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static MultiplyScalar(q, n, target) {
		return (target === undefined ? new this() : target).multiplyScalar(q, n);
	}

	/**
	 * Returns the exterior product of q and r (q*r)
	 * @constructor
	 * @param {Vector4} q - The first vector
	 * @param {Vector4} r - The second vector
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Multiply(q, r, target) {
		return (target === undefined ? new this() : target).multiply(q, r);
	}


	/**
	 * Returns the normal form of q
	 * @constructor
	 * @param {Vector4} q - The source
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Normalize(q, target) {
		return (target === undefined ? new this() : target).normalizationOf(q);
	}

	/**
	 * Returns the conjugate of q
	 * @constructor
	 * @param {Vector4} q - The source
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Conjugate(q, target) {
		return (target === undefined ? new this() : target).conjugateOf(q);
	}

	/**
	 * Returns the inverse of q
	 * @constructor
	 * @param {Vector4} q - The source
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Inverse(q, target) {
		return (target === undefined ? new this() : target).inverseOf(q);
	}

	/**
	 * Returns a copy of q
	 * @constructor
	 * @param {Vector4} q - The source
	 * @param {Vector4} [target] - The target instance
	 * @returns {Vector4}
	 */
	static Copy(q, target) {
		return (target === undefined ? new this() : target).copyOf(q);
	}


	/**
	 * Returns the inner product of q and r
	 * @param {Vector4} q - The first vector
	 * @param {Vector4} r - The second vector
	 * @returns {Float}
	 */
	static dot(q, r) {
		return q.n[0] * r.n[0] + q.n[1] * r.n[1] + q.n[2] * r.n[2] + q.n[3] * r.n[3];
	}


	/**
	 * Returns true if q and r are equal, false otherwise (q==r)
	 * @param {Vector4} q - The protagonist
	 * @param {Vector4} r - The antagonist
	 * @returns {Boolean}
	 */
	static isEQ(q, r) {
		const qn = q.n, rn = r.n;

		return q === r || qn[0] === rn[0] && qn[1] === rn[1] && qn[2] === rn[2] && qn[3] === rn[3];
	}



	/**
	 * Creates a new instance
	 * @param {Float[]} [n] - Array representing the four components
	 * Arrays of length !== 4 will return the identity (0.0,0.0,0.0,1.0) vector
	 */
	constructor(n) {
		this.n = (n && n.constructor === Array && n.length === 4 ? n : [0.0, 0.0, 0.0, 1.0]);
	}


	/**
	 * Redefines the instance
	 * @param {Float[]} [n] - Array representing the four components
	 * Arrays of length <em>!== 4</em> will return the identity (0.0,0.0,0.0,1.0) vector
	 * @returns {Vector4}
	 */
	define(n) {
		this.constructor.call(this, n);

		return this;
	}


	/**
	 * The x component, {@link Vector4#n}[0]
	 * @type Float
	 */
	get x() {
		return this.n[0];
	}

	set x(n) {
		this.n[0] = n;
	}


	/**
	 * The y component, {@link Vector4#n}[1]
	 * @type Float
	 */
	get y() {
		return this.n[1];
	}

	set y(n) {
		this.n[1] = n;
	}


	/**
	 * The z component, {@link Vector4#n}[2]
	 * @type Float
	 */
	get z() {
		return this.n[2];
	}

	set z(n) {
		this.n[2] = n;
	}


	/**
	 * The w component, {@link Vector4#n}[3]
	 * @type Float
	 */
	get w() {
		return this.n[3];
	}

	set w(n) {
		this.n[3] = n;
	}


	/**
	 * The norm of the instance
	 * @type Float
	 */
	get norm() {
		const x = this.n[0], y = this.n[1], z = this.n[2], w = this.n[3];

		return Math.sqrt(x * x + y * y + z * z + w * w);
	}


	/**
	 * The sum of q and r (q+r)
	 * @param {Vector4} q - The first summand
	 * @param {Vector4} r - The second summand
	 * @returns {Vector4}
	 */
	add(q, r) {
		this.n[0] = q.n[0] + r.n[0];
		this.n[1] = q.n[1] + r.n[1];
		this.n[2] = q.n[2] + r.n[2];
		this.n[3] = q.n[3] + r.n[3];

		return this;
	}

	/**
	 * The difference of q and r (q-r)
	 * @param {Vector4} q - The minuend
	 * @param {Vector4} r - The subtrahend
	 * @returns {Vector4}
	 */
	subtract(q, r) {
		this.n[0] = q.n[0] - r.n[0];
		this.n[1] = q.n[1] - r.n[1];
		this.n[2] = q.n[2] - r.n[2];
		this.n[3] = q.n[3] - r.n[3];

		return this;
	}

	/**
	 * The scalar product of q and n (q*n)
	 * @param {Vector4} q - The vector
	 * @param {Float} n - The scalar
	 * @returns {Vector4}
	 */
	multiplyScalar(q, n) {
		this.n[0] = q.n[0] * n;
		this.n[1] = q.n[1] * n;
		this.n[2] = q.n[2] * n;
		this.n[3] = q.n[3] * n;

		return this;
	}

	/**
	 * The exterior product of q and r (q cross r)
	 * @param {Vector4} q - The first vector
	 * @param {Vector4} r - The second vector
	 * @returns {Vector4}
	 */
	multiply(q, r) {
		const qx = q.n[0], qy = q.n[1], qz = q.n[2], qw = q.n[3];
		const rx = r.n[0], ry = r.n[1], rz = r.n[2], rw = r.n[3];

		this.n[0] = qz * ry - qy * rz + qx * rw + qw * rx;
		this.n[1] = qx * rz - qz * rx + qy * rw + qw * ry;
		this.n[2] = qy * rx - qx * ry + qz * rw + qw * rz;
		this.n[3] = qw * rw - qx * rx - qy * ry - qz * rz;

		return this;
	}


	/**
	 * The sum of the instance and q
	 * @param {Vector4} q - The second summand
	 * @returns {Vector4}
	 */
	addEQ(q) {
		this.n[0] += q.n[0];
		this.n[1] += q.n[1];
		this.n[2] += q.n[2];
		this.n[3] += q.n[3];

		return this;
	}

	/**
	 * The difference of the instance and q
	 * @param {Vector4} q - The subtrahend
	 * @returns {Vector4}
	 */
	subtractEQ(q) {
		this.n[0] -= q.n[0];
		this.n[1] -= q.n[1];
		this.n[2] -= q.n[2];
		this.n[3] -= q.n[3];

		return this;
	}

	/**
	 * The scalar product of the instance and n
	 * @param {Float} n - the scalar
	 * @returns {Vector4}
	 */
	multiplyScalarEQ(n) {
		this.n[0] *= n;
		this.n[1] *= n;
		this.n[2] *= n;
		this.n[3] *= n;

		return this;
	}


	/**
	 * The normalization of q
	 * @param {Vector4} q - The source vector
	 * @returns {Vector4}
	 */
	normalizationOf(q) {
		const qn = q.n, qx = qn[0], qy = qn[1], qz = qn[2], qw = qn[3];
		let n = this.n, norm = qx * qx + qy * qy + qz * qz + qw * qw;

		if (norm !== 0.0 && norm !== 1.0) norm = 1.0 / Math.sqrt(norm);

		n[0] = qx * norm, n[1] = qy * norm, n[2] = qz * norm, n[3] = qw * norm;

		return this;
	}

	/**
	 * The conjugate of q
	 * @param {Vector4} q - The source
	 * @returns {Vector4}
	 */
	conjugateOf(q) {
		this.n[0] = -q.n[0] * -1.0;
		this.n[1] = -q.n[1] * -1.0;
		this.n[2] = -q.n[2] * -1.0;
		this.n[3] =  q.n[3];

		return this;
	}

	/**
	 * The inverse of q
	 * @param {Vector4} q - The source
	 * @returns {Vector4}
	 */
	inverseOf(q) {
		const x = q.n[0], y = q.n[1], z = q.n[2], w = q.n[3];
		const norm = 1.0 / (x * x + y * y + z * z + w * w);

		this.n[0] = x * -norm;
		this.n[1] = y * -norm;
		this.n[2] = z * -norm;
		this.n[3] = w *  norm;

		return this;
	}

	/**
	 * The copy of q
	 * @param {Vector4} q - The source
	 * @returns {Vector4}
	 */
	copyOf(q) {
		this.n = q.n.slice(0, 4);

		return this;
	}


	/**
	 * The normal form of the instance
	 * @returns {Vector4}
	 */
	normalize() {
		const n = this.n, x = n[0], y = n[1], z = [2], w = n[3];
		let norm = x * x + y * y + z * z + w * w;

		if (norm === 0.0 || norm === 1.0) return this;

		norm = 1.0 / Math.sqrt(norm);
		n[0] *= norm, n[1] *= norm, n[2] *= norm, n[3] *= norm;

		return this;
	}

	/**
	 * The conjugate of the instance
	 * @returns {Vector4}
	 */
	conjugate() {
		return this.conjugateOf(this);
	}

	/**
	 * The inverse of the instance
	 * @returns {Vector4}
	 */
	invert() {
		return this.inverseOf(this);
	}


	/**
	 * Returns a string representation of the instance
	 * @param {Uint} [digits=3] - The decimal digits
	 * @returns {String}
	 */
	toString(digits = 3) {
		const str = this.n
			.map((item, index, source) => item.toFixed(digits))
			.join(" ");

		return `[Vector4](${ str })`;
	}

	/**
	 * Returns the {@link Vector4#norm} of the instance
	 * @returns {Float}
	 */
	valueOf() {
		return this.norm;
	}
}
