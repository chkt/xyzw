"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var ExtMath = Object.create(Math);

/**
 * Returns the clamped value of n
 * @param {Number} n - The value
 * @param {Number} min - The minimal value
 * @param {Number} max - The maximal value
 * @returns {Number}
 */
ExtMath.clamp = function (n, min, max) {
  return n < min ? min : n > max ? max : n;
};

/**
 * Returns the linear interpolation of a and b
 * @param {Number} a - The first value
 * @param {Number} b - The second value
 * @param {Number} bf - The weight of the second value
 * @returns {Number}
 */
ExtMath.mix = function (a, b, bf) {
  return a * (1.0 - bf) + b * bf;
};

/**
 * Returns the reflected value of n against r
 * @param {Number} n - The value
 * @param {Number} r - The reflection value
 * @returns {Number}
 */
ExtMath.reflect = function (n, r) {
  return 2.0 * r - n;
};

/**
 * Returns a random number between min and max
 * @param {Number} min - The minimal value
 * @param {Number} max - The maximal value
 * @param {Int} [intervals] - The number of discreet intervals
 * @returns {Number}
 */
ExtMath.range = function (min, max, intervals) {
  var n = Math.random();
  var f = intervals === undefined ? n : Math.floor(n * (intervals + 1)) / intervals;

  return min + (max - min) * f;
};

/**
 * Returns true if ranges (a0 a1) and (b0 b1) overlap, false otherwise
 * @param {Number} a0 - The first limit of range a
 * @param {Number} a1 - The second limit of range a
 * @param {Number} b0 - The first limit of range b
 * @param {Number} b1 - The second limit of range b
 * @returns {Boolean}
 */
ExtMath.overlap = function (a0, a1, b0, b1) {
  var _ref = a0 < a1 ? [a0, a1] : [a1, a0];

  var _ref2 = _slicedToArray(_ref, 2);

  a0 = _ref2[0];
  a1 = _ref2[1];

  var _ref3 = b0 < b1 ? [b0, b1] : [b1, b0];

  var _ref4 = _slicedToArray(_ref3, 2);

  b0 = _ref4[0];
  b1 = _ref4[1];


  return a1 - b0 >= 0 && b1 - b0 >= 0;
};

exports.default = ExtMath;