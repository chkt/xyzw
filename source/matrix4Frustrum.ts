import { Matrix4 } from './matrix4';


export interface PerspectiveLens {
	readonly fov : number;
	readonly aspect : number;
	readonly near : number;
	readonly far : number;
}


const minOf = Math.min;
const maxOf = Math.max;
const tanOf = Math.tan;

const FOV_MIN = 1e-10;
const FOV_MAX = Math.PI * 2.0;
const ASPECT_MIN = 1e-10;
const ASPECT_MAX = 1e10;
const ZPLANE_MIN = 1e-10;
const ZPLANE_MAX = Number.MAX_VALUE;


export function Frustrum(lens:PerspectiveLens) : Matrix4 {
	return frustrum({
		/* eslint-disable object-property-newline */
		r00 : 1.0, r10 : 0.0, r20 : 0.0, r30 : 0.0,
		r01 : 0.0, r11 : 1.0, r21 : 0.0, r31 : 0.0,
		r02 : 0.0, r12 : 0.0, r22 : 1.0, r32 : 0.0,
		r03 : 0.0, r13 : 0.0, r23 : 0.0, r33 : 1.0
		/* eslint-enable object-property-newline */
	}, lens);
}

export function frustrum<R extends Matrix4>(r:R, lens:PerspectiveLens) : R {
	const fov = minOf(maxOf(lens.fov, FOV_MIN), FOV_MAX);
	const aspect = minOf(maxOf(lens.aspect, ASPECT_MIN), ASPECT_MAX);
	const near = minOf(maxOf(lens.near, ZPLANE_MIN), ZPLANE_MAX);
	const far = minOf(maxOf(lens.far, near), ZPLANE_MAX);

	const near2 = near * 2.0;
	const zdiff = 1.0 / (far - near);

	const ymax = near * tanOf(fov * 0.5);
	const ymin = -ymax;
	const ydiff = 1.0 / (ymax - ymin);

	const xmin = ymin * aspect;
	const xmax = ymax * aspect;
	const xdiff = 1.0 / (xmax - xmin);

	r.r00 = near2 * xdiff;
	r.r10 = 0.0;
	r.r20 = 0.0;
	r.r30 = 0.0;
	r.r01 = 0.0;
	r.r11 = near2 * ydiff;
	r.r21 = 0.0;
	r.r31 = 0.0;
	r.r02 = (xmax + xmin) * xdiff;
	r.r12 = (ymax + ymin) * ydiff;
	r.r22 = -(far + near) * zdiff;
	r.r32 = -1.0;
	r.r03 = 0.0;
	r.r13 = 0.0;
	r.r23 = -near2 * far * zdiff;
	r.r33 = 0.0;

	return r;
}
