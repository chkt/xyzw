import Math from './Math';
import Matrix4 from './Matrix4';



/**
 * The minimal vertical field of view
 * @type Float
 */
export const FOV_MIN = 1.0e-10;
/**
 * The maximal vertical field of view
 * @type Float
 */
export const FOV_MAX = Math.PI * 2.0;
/**
 * The default vertical field of view
 * @type Float
 */
export const FOV_DEFAULT = Math.PI;
/**
 * The minimal projection aspect ratio (w/h)
 * @type Float
 */
export const ASPECT_MIN = 1.0e-10;
/**
 * The maximal projection aspect ratio (w/h)
 * @type Float
 */
export const ASPECT_MAX = 1.0e10;
/**
 * The default projection aspect ratio (w/h)
 * @type Float
 */
export const ASPECT_DEFAULT = 16.0 / 9.0;
/**
 * The minimal z-plane distance
 * @type Float
 */
export const ZPLANE_MIN = 1.0e-10;
/**
 * The maximal z-plane distance
 * @type Float
 */
export const ZPLANE_MAX = Number.MAX_VALUE;



const _fov = new WeakMap();
const _aspect = new WeakMap();
const _near = new WeakMap();
const _far = new WeakMap();



/**
 * Perspectivic projection matrix
 */
export default class Matrix4Frustrum extends Matrix4 {

	/**
	 * Returns a copy of m
	 * @constructor
	 * @param {Matrix4Frustrum}  m - The source
	 * @param {Matrix4Frustrum} [target] - The target instance
	 * @returns {Matrix4Frustrum}
	 */
	static Copy(m, target) {
		if (target !== undefined) return target.copyOf(m);
		else return new Matrix4Frustrum(m.fov, m.aspect, m.near, m.far);
	}



	/**
	 * Creates a new instance
	 * @param {Float} [fov=FOV_DEFAULT] - The vertical field of view, in radians
	 * @param {Float} [aspect=ASPECT_DEFAULT] - The aspect ratio (w/h)
	 * @param {Float} [near=ZPLANE_MIN] - The distance of the near plane
	 * @param {Float} [far=ZPLANE_MAX] - The distance of the far plane
	 */
	constructor(
		fov = FOV_DEFAULT,
		aspect = ASPECT_DEFAULT,
		near = ZPLANE_MIN,
		far = ZPLANE_MAX
	) {
		super();

		this.define(fov, aspect, near, far);
	}


	/**
	 * (Re)defines the instance
	 * @param {Float} [fov=FOV_DEFAULT] - The vertical field of view, in radians
	 * @param {Float} [aspect=ASPECT_DEFAULT] - The aspect ratio (w/h)
	 * @param {Float} [near=ZPLANE_MIN] - The near plane distance
	 * @param {Float} [far=ZPLANE_MAX] - The far plane distance
	 * @returns {Matrix4Frustrum}
	 */
	define(fov, aspect, near, far) {
		const clamp  = Math.clamp;

		fov    = clamp(fov   , FOV_MIN   , FOV_MAX   );
		aspect = clamp(aspect, ASPECT_MIN, ASPECT_MAX);
		near   = clamp(near  , ZPLANE_MIN, ZPLANE_MAX);
		far    = clamp(far   , near      , ZPLANE_MAX);

		_fov.set(this, fov);
		_aspect.set(this, aspect);
		_near.set(this, near);
		_far.set(this, far);

		const near2 = near * 2.0;
		const zdiff = far - near;

		const ymax  =  near * Math.tan(fov * 0.5);
		const ymin  = -ymax;
		const ydiff =  ymax - ymin;

		const xmin  =  ymin * aspect;
		const xmax  =  ymax * aspect;
		const xdiff =  xmax - xmin;

		this.n = [
			near2 / xdiff,
			0.0,
			0.0,
			0.0,

			0.0,
			near2 / ydiff,
			0.0,
			0.0,

			(xmax + xmin) / xdiff,
			(ymax + ymin) / ydiff,
			-(far + near) / zdiff,
			-1.0,

			0.0,
			0.0,
			-near2 * far / zdiff,
			0.0
		];

		return this;
	}


	/**
	 * The vertical field of view, in radians
	 * @type Float
	 */
	get fov() {
		return _fov.get(this);
	}

	/**
	 * The projection aspect ratio (w/h)
	 * @type Float
	 */
	get aspect() {
		return _aspect.get(this);
	}

	/**
	 * The distance of the near plane
	 * @type Float
	 */
	get near() {
		return _near.get(this);
	}

	/**
	 * The distance of the far plane
	 * @type Float
	 */
	get far() {
		return _far.get(this);
	}


	/**
	 * The copy of m
	 * @param {Matrix4Frustrum} m - The source
	 * @returns {Matrix4Frustrum}
	 */
	copyOf(m) {
		_fov.set(this, _fov.get(m));
		_aspect.set(this, _aspect.get(m));
		_near.set(this, _near.get(m));
		_far.set(this, _far.get(m));

		this.n = m.n.slice(0, 16);

		return this;
	}
}
