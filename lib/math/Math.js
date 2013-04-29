/**
 * Returns the sign of n
 * @param {Number} n The value
 * @returns {Int}
 */
Math.sgn = function(n) {
	return (n > 0.0) - (0.0 > n);
};

/**
 * Returns the clamped value of n
 * @param {Number} n   The value
 * @param {Number} min The minimal value
 * @param {Number} max The maximal value
 * @returns {Number}
 */
Math.clamp = function(n, min, max) {
	return n < min ? min : (n > max ? max : n);
};