/**
 * Creates a new instance
 * @class Orthographic projection Matrix
 * @extends Matrix4
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float} [extend=EXTEND_DEFAULT] The vertical extend of the viewcube
 * @param {Float} [aspect=ASPECT_DEFAULT] The aspect ratio (w/h)
 * @param {Float} [near=ZPLANE_MIN]       The near plane distance
 * @param {Float} [far=ZPLANE_MAX]        The far plane distance
 * @returns {Matrix4Ortho}
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
 */
function Matrix4Ortho(extend, aspect, near, far) {
	Matrix4.call(this);
	
	/**
	 * The vertical extend of the viewcube
	 * @type Float
	 * @default EXTEND_DEFAULT
	 */
	this.extend = extend !== undefined ? extend : this.EXTEND_DEFAULT;
	/**
	 * The aspect ratio (w/h)
	 * @type Float
	 * @default ASPECT_DEFAULT
	 */
	this.aspect = aspect !== undefined ? aspect : this.ASPECT_DEFAULT;
	/**
	 * The near plane distance
	 * @type Float
	 * @default ZPLANE_MIN
	 */
	this.near = near !== undefined ? near : this.ZPLANE_MIN;
	/**
	 * The far plane distance
	 * @type Float
	 * @default ZPLANE_MAX
	 */
	this.far = far !== undefined ? far : this.ZPLANE_MAX;
	
	this.update();
}


Matrix4Ortho.prototype = new Matrix4();
/**
 * The constructor
 * @type Function
 */
Matrix4Ortho.prototype.constructor = Matrix4Ortho;


/**
 * The minimal vertical extend of the viewcube
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Ortho.prototype, 'EXTEND_MIN', {
	value: 1.0e-10,
	enumerable: true
});
/**
 * The maximal vertical extend of the viewcube
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Ortho.prototype, 'EXTEND_MAX', {
	value: 1.0e10,
	enumerable: true
});
/**
 * The default vertical extend of the viewcube
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Ortho.prototype, 'EXTEND_DEFAULT', {
	value: 100.0,
	enumerable: true
});
/**
 * The minimal projection aspect ratio (w/h)
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Ortho.prototype, 'ASPECT_MIN', {
	value: 1.0e-10,
	enumerable: true
});
/**
 * The maximal projection aspect ratio (w/h)
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Ortho.prototype, 'ASPECT_MAX', {
	value: 1.0e10,
	enumerable: true
});
/**
 * The default projection aspect ratio (w/h)
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Ortho.prototype, 'ASPECT_DEFAULT', {
	value: 16.0 / 9.0,
	enumerable: true
});
/**
 * The minimal z-plane distance
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Ortho.prototype, 'ZPLANE_MIN', {
	value: 1.0e-10,
	enumerable: true
});
/**
 * The maximal z-plane distance
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Ortho.prototype, 'ZPLANE_MAX', {
	value: Number.MAX_VALUE,
	enumerable: true
});


/**
 * (Re)defines the instance
 * @param {Float} [extend=EXTEND_DEFAULT] The vertical extend of the viewcube
 * @param {Float} [aspect=ASPECT_DEFAULT] The aspect ratio (w/h)
 * @param {Float} [near=ZPLANE_MIN]       The near plane distance
 * @param {Float} [far=ZPLANE_MAX]        The far plane distance
 * @returns {undefined}
 */
Matrix4Ortho.prototype.define = function(extend, aspect, near, far) {
	Matrix4Ortho.call(this, extend, aspect, near, far);
};


/**
 * (Re)creates the transform of the instance
 * @returns {undefined}
 */
Matrix4Ortho.prototype.update = function() {
	var clamp  = Math.clamp;
	var extend =  clamp(this.extend, this.EXTEND_MIN, this.EXTEND_MAX);
	var aspect =  clamp(this.aspect, this.ASPECT_MIN, this.ASPECT_MAX);
	var near   = -clamp(this.near  , this.ZPLANE_MIN, this.ZPLANE_MAX);
	var far    = -clamp(this.far   , -near          , this.ZPLANE_MAX);
	
	var zdiff =  far - near;
	
	var ymax  =  extend * 0.5;
	var ymin  = -ymax;
	
	var xmin  =  ymin   * aspect;
	var xmax  =  ymax   * aspect;
	var xdiff =  extend * aspect;
	
	this.n = [
		 2.0 / xdiff,
		 0.0,
		 0.0,
		 0.0,
		 
		 0.0,
		 2.0 / extend,
		 0.0,
		 0.0,
		 
		 0.0,
		 0.0,
		 2.0 / zdiff,
		 0.0,
		 
		-(xmax + xmin) / xdiff,
		-(ymax + ymin) / extend,
		-(far + near)  / zdiff,
		 1.0
	];
};


/**
 * The copy of m
 * @param {Matrix4Ortho} m The source
 * @returns {void}
 */
Matrix4Ortho.prototype.copyOf = function(m) {
	this.extend = m.extend, this.aspect = m.aspect;
	this.near   = m.near  , this.far    = m.far;
	
	this.n      = m.n.slice(0, 16);
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Matrix4Ortho
 * @type String
 */
Object.defineProperty(Matrix4Ortho, 'VERSION', {value : "0.5.2"});


/**
 * Returns a copy of m
 * @param {Matrix4Ortho} m The source
 * @returns {Matrix4Ortho}
 */
Matrix4Ortho.copy = function(m) {
	return new Matrix4Ortho(m.extend, m.aspect, m.near, m.far);
};


/**
 * Returns a type-version string
 * @returns {String}
 */
Matrix4Ortho.toString =  function() {
	return "[Matrix4Ortho-" + this.VERSION + "]";
};
