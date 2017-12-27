import { Illuminant } from './XyzColorConstants';
/**
 * Converts color values from CIELAB (D65) to XYZ.
 * @param {number[]} cielabValue - Value array of L*, a*, b* (D65).
 * @param {Illuminant} illuminant - Instance of Illuminant.
 * @param {number[]} [target] - Target array for receiving the result.
 * @returns {number[]} XYZ value array.
 */
export default function cielabValueToXyzValue(cielabValue: [number, number, number], illuminant: Illuminant, target?: [number, number, number]): [number, number, number];
