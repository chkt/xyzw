const ExtMath = Object.create(Math);



/**
 * Returns the clamped value of n
 * @param {Number} n - The value
 * @param {Number} min - The minimal value
 * @param {Number} max - The maximal value
 * @returns {Number}
 */
ExtMath.clamp = function(n, min, max) {
	return n < min ? min : (n > max ? max : n);
};

/**
 * Returns the linear interpolation of a and b
 * @param {Number} a - The first value
 * @param {Number} b - The second value
 * @param {Number} bf - The weight of the second value
 * @returns {Number}
 */
ExtMath.mix = function(a, b, bf) {
	return a * (1.0 - bf) + b * bf;
};

/**
 * Returns the reflected value of n against r
 * @param {Number} n - The value
 * @param {Number} r - The reflection value
 * @returns {Number}
 */
ExtMath.reflect = function(n, r) {
	return 2.0 * r - n;
};

/**
 * Returns a random number between min and max
 * @param {Number} min - The minimal value
 * @param {Number} max - The maximal value
 * @returns {Number}
 */
ExtMath.range = function(min, max) {
	return min + (max - min) * Math.random();
};


/**
 * Returns true if ranges (a0 a1) and (b0 b1) overlap, false otherwise
 * @param {Number} a0 - The first limit of range a
 * @param {Number} a1 - The second limit of range a
 * @param {Number} b0 - The first limit of range b
 * @param {Number} b1 - The second limit of range b
 * @returns {Boolean}
 */
ExtMath.overlap = function(a0, a1, b0, b1) {
	[a0, a1] = a0 < a1 ? [a0, a1] : [a1, a0];
	[b0, b1] = b0 < b1 ? [b0, b1] : [b1, b0];

	return a1 - b0 >= 0 && b1 - b0 >= 0;
};



export default ExtMath;
