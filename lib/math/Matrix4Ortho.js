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
	 * <p>[readonly]</p>
	 * @type Float
	 * @default EXTEND_DEFAULT
	 */
	Object.defineProperty(this, 'extend', {
		value: 0.0,
		configurable: true,
		enumerable: true
	});
	/**
	 * The aspect ratio (w/h)
	 * <p>[readonly]</p>
	 * @type Float
	 * @default ASPECT_DEFAULT
	 */
	Object.defineProperty(this, 'aspect', {
		value: 0.0,
		configurable: true,
		enumerable: true
	});
	/**
	 * The near plane distance
	 * <p>[readonly]</p>
	 * @type Float
	 * @default ZPLANE_MIN
	 */
	Object.defineProperty(this, 'near', {
		value: 0.0,
		configurable: true,
		enumerable: true
	});
	/**
	 * The far plane distance
	 * <p>[readonly]</p>
	 * @type Float
	 * @default ZPLANE_MAX
	 */
	Object.defineProperty(this, 'far', {
		value: 0.0,
		configurable: true,
		enumerable: true
	});
	
	this.define(extend, aspect, near, far);
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
	var clamp  = Math.clamp;
	var extend =  clamp(this.extend, this.EXTEND_MIN, this.EXTEND_MAX);
	var aspect =  clamp(this.aspect, this.ASPECT_MIN, this.ASPECT_MAX);
	var near   = -clamp(this.near  , this.ZPLANE_MIN, this.ZPLANE_MAX);
	var far    = -clamp(this.far   , -near          , this.ZPLANE_MAX);
	
	Object.defineProperty(this, 'extend', { value: extend });
	Object.defineProperty(this, 'aspect', { value: aspect });
	Object.defineProperty(this, 'near'  , { value: near });
	Object.defineProperty(this, 'far'   , { value: far });
	
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
	Object.defineProperty(this, 'fov'   , { value: m.fov });
	Object.defineProperty(this, 'extend', { value: m.extend });
	Object.defineProperty(this, 'near'  , { value: m.near });
	Object.defineProperty(this, 'far'   , { value: m.far });
	
	this.n      = m.n.slice(0, 16);
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Matrix4Ortho
 * @type String
 */
Object.defineProperty(Matrix4Ortho, 'VERSION', {value : "0.5.3"});


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
