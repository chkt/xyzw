import { Vector2 } from './vector2';


/**
 * zw, z = a + bi, w = c + di
 */
export function Multiply(z:Vector2, w:Vector2) : Vector2 {
	return multiply({x : 0.0, y : 0.0}, z, w);
}

/**
 * r⃗ = zw, z = a + bi, w = c + di
 */
export function multiply<R extends Vector2>(r:R, z:Vector2, w:Vector2) : R {
	const {x : a, y : b} = z;
	const {x : c, y : d} = w;

	r.x = a * c - b * d;
	r.y = a * d + b * c;

	return r;
}

/**
 * zw̅ / ww̅, z = a + bi, w = c = di
 */
export function Divide(z:Vector2, w:Vector2) : Vector2 {
	return divide({ x : 0.0, y : 0.0 }, z , w);
}

/**
 * r⃗ = zw̅ / ww̅, z = a + bi, w = c = di
 */
export function divide<R extends Vector2>(r:R, z:Vector2, w:Vector2) : R {
	const {x : a, y : b} = z;
	const {x : c, y : d} = w;
	const den = 1.0 / (c ** 2 + d ** 2);

	r.x = (a * c + b * d) * den;
	r.y = (b * c - a * d) * den;

	return r;
}

/**
 * z̅
 */
export function Conjugate(z:Vector2) : Vector2 {
	return { x : z.x, y : -z.y };
}

/**
 * r⃗ = z̅
 */
export function conjugate<R extends Vector2>(r:R, v:Vector2) : R {
	r.x = v.x;
	r.y = -v.y;

	return r;
}

/**
 * z⁻¹
 */
export function Inverse(z:Vector2) : Vector2 {
	return inverse({ x : 0.0, y : 0.0 }, z);
}

/**
 * r⃗ = z⁻¹
 */
export function inverse<R extends Vector2>(r:R, z:Vector2) : Vector2 {
	const {x : a, y : b} = z;
	const den = 1.0 / (a ** 2 + b ** 2);

	r.x =  a * den;
	r.y = -b * den;

	return r;
}
