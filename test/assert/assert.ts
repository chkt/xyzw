import * as assert from 'assert';
import * as vec2 from '../../source/vector2';
import * as vec3 from '../../source/vector3';
import * as vec4 from '../../source/vector4';
import * as mat2 from '../../source/matrix2';
import * as mat3 from '../../source/matrix3';
import * as mat4 from '../../source/matrix4';


export function assertEqualsScalar(actual:number, expected:number, e:number, message?:string) : void {
	if (Number.isNaN(actual) !== Number.isNaN(expected) || Math.abs(actual - expected) > e) {
		throw new assert.AssertionError({
			message,
			actual,
			expected,
			operator : `!==[${ e }]`
		});
	}
}

export function assertEqualsVec2(actual:vec2.Vector2, expected:vec2.Vector2, e:number, message?:string) : void {
	if (
		Number.isNaN(actual.x) !== Number.isNaN(expected.x) || Math.abs(actual.x - expected.x) > e ||
		Number.isNaN(actual.y) !== Number.isNaN(expected.y) || Math.abs(actual.y - expected.y) > e
	) {
		throw new assert.AssertionError({
			message,
			actual,
			expected,
			operator : `!==[${ e }]`
		});
	}
}

export function assertEqualsVec3(actual:vec3.Vector3, expected:vec3.Vector3, e:number, message?:string) : void {
	if (
		Number.isNaN(actual.x) !== Number.isNaN(expected.x) || Math.abs(actual.x - expected.x) > e ||
		Number.isNaN(actual.y) !== Number.isNaN(expected.y) || Math.abs(actual.y - expected.y) > e ||
		Number.isNaN(actual.z) !== Number.isNaN(expected.z) || Math.abs(actual.z - expected.z) > e
	) {
		throw new assert.AssertionError({
			message,
			actual,
			expected,
			operator : `!==[${ e }]`
		});
	}
}

export function assertEqualsVec4(actual:vec4.Vector4, expected:vec4.Vector4, e:number, message?:string) : void {
	if (
		Number.isNaN(actual.x) !== Number.isNaN(expected.x) || Math.abs(actual.x - expected.x) > e ||
		Number.isNaN(actual.y) !== Number.isNaN(expected.y) || Math.abs(actual.y - expected.y) > e ||
		Number.isNaN(actual.z) !== Number.isNaN(expected.z) || Math.abs(actual.z - expected.z) > e ||
		Number.isNaN(actual.w) !== Number.isNaN(expected.w) || Math.abs(actual.w - expected.w) > e
	) {
		throw new assert.AssertionError({
			message,
			actual,
			expected,
			operator : `!==[${ e }]`
		});
	}
}

export function assertEqualsMat2(actual:mat2.Matrix2, expected:mat2.Matrix2, e:number, message?:string) : void {
	if (
		Number.isNaN(actual.r00) !== Number.isNaN(expected.r00) || Math.abs(actual.r00 - expected.r00) > e ||
		Number.isNaN(actual.r10) !== Number.isNaN(expected.r10) || Math.abs(actual.r10 - expected.r10) > e ||
		Number.isNaN(actual.r01) !== Number.isNaN(expected.r01) || Math.abs(actual.r01 - expected.r01) > e ||
		Number.isNaN(actual.r11) !== Number.isNaN(expected.r11) || Math.abs(actual.r11 - expected.r11) > e
	) {
		throw new assert.AssertionError({
			actual,
			expected,
			message,
			operator : `!==[${ e }]`
		});
	}
}

export function assertEqualsMat3(actual:mat3.Matrix3, expected:mat3.Matrix3, e:number, message?:string) : void {
	/* eslint-disable array-element-newline */
	for (const i of [
		'r00', 'r10', 'r20',
		'r01', 'r11', 'r21',
		'r02', 'r12', 'r22'
	] as readonly (keyof mat3.Matrix3)[]) {
		if (Number.isNaN(actual[i]) !== Number.isNaN(expected[i]) || Math.abs(actual[i] - expected[i]) > e) {
			throw new assert.AssertionError({
				actual,
				expected,
				message,
				operator : `!==[${ e }]`
			});
		}
	}
	/* eslint-enable array-element-newline */
}

export function assertEqualsMat4(actual:mat4.Matrix4, expected:mat4.Matrix4, e:number, message?:string) : void {
	/* eslint-disable array-element-newline */
	for (const i of [
		'r00', 'r10', 'r20', 'r30',
		'r01', 'r11', 'r21', 'r31',
		'r02', 'r12', 'r22', 'r32',
		'r03', 'r13', 'r23', 'r33'
	] as readonly (keyof mat4.Matrix4)[]) {
		if (Number.isNaN(actual[i]) !== Number.isNaN(expected[i]) || Math.abs(actual[i] - expected[i]) > e) {
			throw new assert.AssertionError({
				actual,
				expected,
				message,
				operator : `!==[${ e }]`
			});
		}
	}
	/* eslint-enable array-element-newline */
}
