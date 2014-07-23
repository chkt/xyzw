/**
 * Creates a new instance
 * @class Perspectivic projection matrix
 * @extends Matrix4
 * @author Christoph Kettelhoit <ck@christoph-kettelhoit.de>
 * @param {Float} [fov=FOV_DEFAULT]       The vertical <em>field of view</em>, in radians
 * @param {Float} [aspect=ASPECT_DEFAULT] The aspect ratio (w/h)
 * @param {Float} [near=ZPLANE_MIN]       The distance of the near plane
 * @param {Float} [far=ZPLANE_MAX]        The distance of the far plane
 * @returns {Matrix4Frustrum}
 * @license Licensed under the MIT License
 */
function Matrix4Frustrum(fov, aspect, near, far) {
	Matrix4.call(this);
	
	/**
	 * The vertical <em>field of view</em>, in radians
	 * @readonly
	 * @type Float
	 * @default FOV_DEFAULT
	 */
	Object.defineProperty(this, 'fov', {
		value: 0.0,
		configurable: true,
		enumerable: true
	});
	/**
	 * The projection aspect ratio (w/h)
	 * @readonly
	 * @type Float
	 * @default ASPECT_DEFAULT
	 */
	Object.defineProperty(this, 'aspect', {
		value: 0.0,
		configurable: true,
		enumerable: true
	});
	
	/**
	 * The distance of the near plane
	 * @readonly
	 * @type Float
	 * @default ZPLANE_NEAR
	 */
	Object.defineProperty(this, 'near', {
		value: 0.0,
		configurable: true,
		enumerable: true
	});
	/**
	 * The distance of the far plane
	 * @readonly
	 * @type Float
	 * @default ZPLANE_MAX
	 */
	Object.defineProperty(this, 'far', {
		value: 0.0,
		configurable: true,
		enumerable: true
	});

	this.define(fov, aspect, near, far);
}


Matrix4Frustrum.prototype = Object.create(Matrix4.prototype);

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
 * @returns {Matrix4Frustrum}
 */
Matrix4Frustrum.prototype.define = function(fov, aspect, near, far) {
	var clamp  = Math.clamp;

	fov    = clamp(fov   , this.FOV_MIN   , this.FOV_MAX);
	aspect = clamp(aspect, this.ASPECT_MIN, this.ASPECT_MAX);
	near   = clamp(near  , this.ZPLANE_MIN, this.ZPLANE_MAX);
	far    = clamp(far   , near           , this.ZPLANE_MAX);
	
	Object.defineProperty(this, 'fov'   , { value: fov });
	Object.defineProperty(this, 'aspect', { value: aspect });
	Object.defineProperty(this, 'near'  , { value: near });
	Object.defineProperty(this, 'far'   , { value: far });
	
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
	
	return this;
};


/**
 * The copy of m
 * @param {Matrix4Frustrum} m The source
 * @returns {Matrix4Frustrum}
 */
Matrix4Frustrum.prototype.copyOf = function(m) {
	Object.defineProperty(this, 'fov'   , { value : m.fov });
	Object.defineProperty(this, 'aspect', { value : m.aspect });
	Object.defineProperty(this, 'near'  , { value: m.near });
	Object.defineProperty(this, 'far'   , { value: m.far });

	this.n = m.n.slice(0, 16);
	
	return this;
};



/**
 * The version string
 * @constant
 * @name VERSION
 * @memberOf Matrix4Frustrum
 * @type String
 */
Object.defineProperty(Matrix4Frustrum, 'VERSION', {
	value: "0.9.5",
	enumerable: true
});


/**
 * Returns a copy of m
 * @param {Matrix4Frustrum}  m       The source
 * @param {Matrix4Frustrum} [target] The target instance
 * @returns {Matrix4Frustrum}
 */
Matrix4Frustrum.Copy = function(m, target) {
	if (target !== undefined) return target.copyOf(m);
	else return new Matrix4Frustrum(m.fov, m.aspect, m.near, m.far);
};


/**
 * Returns a type-version string
 * @returns {String}
 */
Matrix4Frustrum.toString = function() {
	return "[Matrix4Frustrum-" + this.VERSION + "]";
};