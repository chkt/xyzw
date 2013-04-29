/**
 * Creates a new instance
 * @class Perspectivic projection matrix
 * @extends Matrix4
 * @author <a href="mailto:mail@christoph-kettelhoit.de">Christoph Kettelhoit</a>
 * @param {Float} [fov=FOV_DEFAULT]       The vertical <em>field of view</em>, in radians
 * @param {Float} [aspect=ASPECT_DEFAULT] The aspect ratio (w/h)
 * @param {Float} [near=ZPLANE_MIN]       The distance of the near plane
 * @param {Float} [far=ZPLANE_MAX]        The distance of the far plane
 * @returns {Matrix4Frustrum}
 * @license Licensed under the LGPL 3 (http://www.gnu.org/licenses/lgpl.html)
 */
function Matrix4Frustrum(fov, aspect, near, far) {
	Matrix4.call(this);
	
	/**
	 * The vertical <em>field of view</em>, in radians
	 * @type Float
	 * @default FOV_DEFAULT
	 */
	this.fov = fov !== undefined ? fov : this.FOV_DEFAULT;
	/**
	 * The projection aspect ratio (w/h)
	 * @type Float
	 * @default ASPECT_DEFAULT
	 */
	this.aspect = aspect !== undefined ? aspect : this.ASPECT_DEFAULT;
	/**
	 * The distance of the near plane
	 * @type Float
	 * @default ZPLANE_NEAR
	 */
	this.near = near !== undefined ? near : this.ZPLANE_MIN;
	/**
	 * The distance of the far plane
	 * @type Float
	 * @default ZPLANE_MAX
	 */
	this.far = far !== undefined ? far : this.ZPLANE_MAX;

	this.update();
}


Matrix4Frustrum.prototype = new Matrix4();
/**
 * The constructor
 * @type Function
 */
Matrix4Frustrum.prototype.constructor = Matrix4Frustrum;


/**
 * The minimal vertical <em>field of view</em>
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Frustrum.prototype, 'FOV_MIN', {
	value: 1.0e-10,
	enumerable: true
});
/**
 * The maximal vertical <em>field of view</em>
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Frustrum.prototype, 'FOV_MAX', {
	value: Math.PI * 2.0,
	enumerable: true
});
/**
 * The default vertical <em>field of view</em>
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Frustrum.prototype, 'FOV_DEFAULT', {
	value: Math.PI,
	enumerable: true
});
/**
 * The minimal projection aspect ratio (w/h)
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Frustrum.prototype, 'ASPECT_MIN', {
	value: 1.0e-10,
	enumerable: true
});
/**
 * The maximal projection aspect ratio (w/h)
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Frustrum.prototype, 'ASPECT_MAX', {
		value: 1.0e10,
	enumerable: true
});
/**
 * The default projection aspect ratio (w/h)
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Frustrum.prototype, 'ASPECT_DEFAULT', {
	value: 16.0 / 9.0,
	enumerable: true
});
/**
 * The minimal z-plane distance
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Frustrum.prototype, 'ZPLANE_MIN', {
	value: 1.0e-10,
	enumerable: true
});
/**
 * The maximal z-plane distance
 * @constant
 * @type Float
 */
Object.defineProperty(Matrix4Frustrum.prototype, 'ZPLANE_MAX', {
	value: Number.MAX_VALUE,
	enumerable: true
});


/**
 * (Re)defines the instance
 * @param {Float} [fov=FOV_DEFAULT]       The vertical <em>field of view</em>, in radians
 * @param {Float} [aspect=ASPECT_DEFAULT] The aspect ratio (w/h)
 * @param {Float} [near=ZPLANE_MIN]       The near plane distance
 * @param {Float} [far=ZPLANE_MAX]        The far plane distance
 * @returns {undefined}
 */
Matrix4Frustrum.prototype.define = function(fov, aspect, near, far) {
	Matrix4Frustrum.call(this, fov, aspect, near, far);
};


/**
 * (Re)creates the transform of the instance
 * @returns {undefined}
 */
Matrix4Frustrum.prototype.update = function() {
	var clamp  = Math.clamp;
	var fov    = clamp(this.fov   , this.FOV_MIN   , this.FOV_MAX);
	var aspect = clamp(this.aspect, this.ASPECT_MIN, this.ASPECT_MAX);
	var near   = clamp(this.near  , this.ZPLANE_MIN, this.ZPLANE_MAX);
	var far    = clamp(this.far   , near           , this.ZPLANE_MAX);
	
	var near2 = near * 2.0;
	var zdiff = far - near;
	
	var ymax  =  near * Math.tan(fov * 0.5);
	var ymin  = -ymax;
	var ydiff =  ymax - ymin;
	
	var xmin  =  ymin * aspect;
	var xmax  =  ymax * aspect;
	var xdiff =  xmax - xmin;
	
	this.n = [
		 near2         / xdiff,
		 0.0,
		 0.0,
		 0.0,
		
		 0.0,
		 near2         / ydiff,
		 0.0,
		 0.0,
		
		 (xmax + xmin) / xdiff,
		 (ymax + ymin) / ydiff,
		-(far + near)  / zdiff,
		-1.0,
	
		 0.0,
		 0.0,
		-near2 * far   / zdiff,
		 0.0
	];
};


/**
 * The copy of m
 * @param {Matrix4Frustrum} m The source
 * @returns {undefined}
 */
Matrix4Frustrum.prototype.copyOf = function(m) {
	this.fov  = m.fov , this.aspect = m.aspect;
	this.near = m.near, this.far    = m.far;
	
	this.n = m.n.slice(0, 16);
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Matrix4Frustrum
 * @type String
 */
Object.defineProperty(Matrix4Frustrum, 'VERSION', {
	value: "0.9.3",
	enumerable: true
});


/**
 * Returns a copy of m
 * @param {Matrix4Frustrum} m The source
 * @returns {Matrix4Frustrum}
 */
Matrix4Frustrum.copy = function(m) {
	return new Matrix4Frustrum(m.fov, m.aspect, m.near, m.far);
};


/**
 * Returns a type-version string
 * @returns {String}
 */
Matrix4Frustrum.toString = function() {
	return "[Matrix4Frustrum-" + this.VERSION + "]";
};