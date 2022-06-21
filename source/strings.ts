interface StringifyOptionsCommon {
	readonly delimiter : string;
	readonly precision : number;
	readonly nanString : string;
	readonly posInfString : string;
	readonly negInfString : string;
}

type VectorRecord<T> = Record<keyof T, number>;

export interface StringifyOptions<T> extends StringifyOptionsCommon {
	readonly clampMin : VectorRecord<T>;
	readonly clampMax : VectorRecord<T>;
}

export type stringify<T> = (v:VectorRecord<T>) => string;


export const PRECISION_SAFE = 1e21 - 1e5;

export const stringifyDefaultsCommon:StringifyOptionsCommon = {
	delimiter : ',',
	precision : 3,
	nanString : 'NaN',
	posInfString : '+Infinity',
	negInfString : '-Infinity'
};


export function stringify<T>(opts:StringifyOptions<T>, v:VectorRecord<T>) : string {
	const keys = Object.keys(opts.clampMin) as (keyof T)[];
	let res = '';

	for (const k of keys) {
		const n = Math.min(Math.max(v[k], opts.clampMin[k]), opts.clampMax[k]);

		if (Number.isFinite(n)) res += n.toFixed(opts.precision);
		else if (Number.isNaN(n)) res += opts.nanString;
		else if (n > 0.0) res += opts.posInfString;
		else res += opts.negInfString;

		res += opts.delimiter;
	}

	return res.slice(0, -opts.delimiter.length);
}
