/**
 * @extends Math
 */
const ExtMath = Object.create(Math);



/**
 * Returns the clamped value of n
 * @param {number} n - The value
 * @param {number} min - The minimal value
 * @param {number} max - The maximal value
 * @returns {number}
 */
ExtMath.clamp = function(n, min, max) {
	return n < min ? min : (n > max ? max : n);
};

/**
 * Returns the linear interpolation of a and b
 * @param {number} a - The first value
 * @param {number} b - The second value
 * @param {number} bf - The weight of the second value
 * @returns {number}
 */
ExtMath.mix = function(a, b, bf) {
	return a * (1.0 - bf) + b * bf;
};

/**
 * Returns the reflected value of n against r
 * @param {number} n - The value
 * @param {number} r - The reflection value
 * @returns {number}
 */
ExtMath.reflect = function(n, r) {
	return 2.0 * r - n;
};

/**
 * Returns a random number between min and max
 * @param {number} min - The minimal value
 * @param {number} max - The maximal value
 * @param {int} [intervals] - The number of discreet intervals
 * @returns {number}
 */
ExtMath.range = function(min, max, intervals) {
	const n = Math.random();
	const f = intervals === undefined ? n : Math.floor(n * (intervals + 1)) / intervals;

	return min + (max - min) * f;
};


/**
 * Returns true if ranges (a0 a1) and (b0 b1) overlap, false otherwise
 * @param {number} a0 - The first limit of range a
 * @param {number} a1 - The second limit of range a
 * @param {number} b0 - The first limit of range b
 * @param {number} b1 - The second limit of range b
 * @returns {boolean}
 */
ExtMath.overlap = function(a0, a1, b0, b1) {
	[a0, a1] = a0 < a1 ? [a0, a1] : [a1, a0];
	[b0, b1] = b0 < b1 ? [b0, b1] : [b1, b0];

	return a1 - b0 >= 0 && b1 - b0 >= 0;
};



export default ExtMath;
