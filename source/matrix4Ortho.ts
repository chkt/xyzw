import { Matrix4 } from './matrix4';


export interface OrthographicLens {
	readonly extend : number;
	readonly aspect : number;
	readonly near : number;
	readonly far : number;
}


const maxOf = Math.max;
const minOf = Math.min;

const EXTEND_MIN = 1e-10;
const EXTEND_MAX = 1e10;
const ASPECT_MIN = 1e-10;
const ASPECT_MAX = 1e10;
const ZPLANE_MIN = 1e-10;
const ZPLANE_MAX = Number.MAX_VALUE;


export function Ortho(lens:OrthographicLens) : Matrix4 {
	return ortho({
		/* eslint-disable object-property-newline */
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		/* eslint-enable object-property-newline */
	}, lens);
}

export function ortho<R extends Matrix4>(r:R, lens:OrthographicLens) : R {
	const extend = minOf(maxOf(lens.extend, EXTEND_MIN), EXTEND_MAX);
	const aspect = minOf(maxOf(lens.aspect, ASPECT_MIN), ASPECT_MAX);
	const near = -minOf(maxOf(lens.near, ZPLANE_MIN), ZPLANE_MAX);
	const far = -minOf(maxOf(lens.far, near), ZPLANE_MAX);

	const zdiff = 1.0 / (far - near);

	const ymax = extend * 0.5;
	const ymin = -ymax;
	const ydiff = 1.0 / extend;

	const xmin = ymin * aspect;
	const xmax = ymax * aspect;
	const xdiff = 1.0 / (xmax - xmin);

	r.r00 = 2.0 * xdiff;
	r.r10 = 0.0;
	r.r20 = 0.0;
	r.r30 = 0.0;
	r.r01 = 0.0;
	r.r11 = 2.0 * ydiff;
	r.r21 = 0.0;
	r.r31 = 0.0;
	r.r02 = 0.0;
	r.r12 = 0.0;
	r.r22 = 2.0 * zdiff;
	r.r32 = 0.0;
	r.r03 = -(xmax + xmin) * xdiff;
	r.r13 = -(ymax + ymin) * ydiff;
	r.r23 = -(far + near) * zdiff;
	r.r33 = 1.0;

	return r;
}
