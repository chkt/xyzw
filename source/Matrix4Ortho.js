import Math from './Math';
import Matrix4 from './Matrix4';



/**
 * The minimal vertical extend of the viewcube
 * @type Float
 */
export const EXTEND_MIN = 1.0e-10;
/**
 * The maximal vertical extend of the viewcube
 * @type Float
 */
export const EXTEND_MAX = 1.0e10;
/**
 * The default vertical extend of the viewcube
 * @type Float
 */
export const EXTEND_DEFAULT = 100.0;
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



const _extend = new WeakMap();
const _aspect = new WeakMap();
const _near = new WeakMap();
const _far = new WeakMap();



/**
 * Orthographic projection Matrix
 */
export default class Matrix4Ortho extends Matrix4 {

	/**
	 * Returns a copy of m
	 * @constructor
	 * @param {Matrix4Ortho} m - The source
	 * @param {Matrix4Ortho} [target] - The target instance
	 * @returns {Matrix4Ortho}
	 */
	static Copy(m, target) {
		if (target !== undefined) return target.copyOf(m);
		else return new Matrix4Ortho(m.extend, m.aspect, m.near, m.far);
	}



	/**
	 * Creates a new instance
	 * @param {Float} [extend=EXTEND_DEFAULT] - The vertical extend of the viewcube
	 * @param {Float} [aspect=ASPECT_DEFAULT] - The aspect ratio (w/h)
	 * @param {Float} [near=ZPLANE_MIN] - The near plane distance
	 * @param {Float} [far=ZPLANE_MAX] - The far plane distance
	 */
	constructor(
		extend = EXTEND_DEFAULT,
		aspect = ASPECT_DEFAULT,
		near = ZPLANE_MIN,
		far = ZPLANE_MAX
	) {
		super();

		this.define(extend, aspect, near, far);
	}


	/**
	 * (Re)defines the instance
	 * @param {Float} [extend=EXTEND_DEFAULT] - The vertical extend of the viewcube
	 * @param {Float} [aspect=ASPECT_DEFAULT] - The aspect ratio (w/h)
	 * @param {Float} [near=ZPLANE_MIN] - The near plane distance
	 * @param {Float} [far=ZPLANE_MAX] - The far plane distance
	 * @returns {Matrix4Ortho}
	 */
	define(extend, aspect, near, far) {
		const clamp  = Math.clamp;

		extend =  clamp(extend, EXTEND_MIN, EXTEND_MAX);
		aspect =  clamp(aspect, ASPECT_MIN, ASPECT_MAX);
		near   = -clamp(near  , ZPLANE_MIN, ZPLANE_MAX);
		far    = -clamp(far   , -near     , ZPLANE_MAX);

		_extend.set(this, extend);
		_aspect.set(this, aspect);
		_near.set(this, near);
		_far.set(this, far);

		const zdiff =  far - near;

		const ymax  =  extend * 0.5;
		const ymin  = -ymax;

		const xmin  =  ymin   * aspect;
		const xmax  =  ymax   * aspect;
		const xdiff =  extend * aspect;

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
			-(far + near) / zdiff,
			1.0
		];

		return this;
	}


	/**
	 * The vertical extend of the viewcube
	 * @type Float
	 */
	get extend() {
		return _extend.get(this);
	}

	/**
	 * The aspect ratio (w/h)
	 * @type Float
	 */
	get aspect() {
		return _aspect.get(this);
	}

	/**
	 * The near plane distance
	 * @type Float
	 */
	get near() {
		return _near.get(this);
	}

	/**
	 * The far plane distance
	 * @type Float
	 */
	get far() {
		return _far.get(this);
	}


	/**
	 * The copy of m
	 * @param {Matrix4Ortho} m - The source
	 * @returns {Matrix4Ortho}
	 */
	copyOf(m) {
		_extend.set(this, _extend.get(m));
		_aspect.set(this, _aspect.get(m));
		_near.set(this, _near.get(m));
		_far.set(this, _far.get(m));

		this.n = m.n.slice(0, 16);

		return this;
	}
}
