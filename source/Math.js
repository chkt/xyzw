/**
 * @namespace
 * @name Math
 * @license Licensed under the MIT License
 */

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

/**
 * Returns the linear interpolation of a and b
 * @param {Number} a  The first value
 * @param {Number} b  The second value
 * @param {Number} bf The weight of the second value
 * @returns {Number}
 */
Math.mix = function(a, b, bf) {
	return a * (1.0 - bf) + b * bf;
};

/**
 * Returns the reflected value of <code>n</code> against <code>r</code>
 * @param {Number} n The value
 * @param {Number} r The reflection value
 * @returns {Number}
 */
Math.reflect = function(n, r) {
	return 2.0 * r - n;
};