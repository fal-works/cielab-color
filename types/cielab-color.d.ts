import { Illuminant } from './XyzColorConstants';
export { illuminants } from './XyzColorConstants';
/**
 * Sets the current illuminant. (e.g. D50, D65 etc.)
 * @param illuminant - Any element of illuminants.
 * @example import * as c from 'cielab-color'; c.setIlluminant(c.illuminants.D65);
 */
export declare function setIlluminant(illuminant: Illuminant): void;
/**
 * Converts CIELAB values to an array of RGB values (0 - 255).
 * @param {number} lValue - L*: Lightness (0 - 100)
 * @param {number} aValue - a* (0 - ca. 100)
 * @param {number} bValue - b* (0 - ca. 100)
 * @param {number} [alphaValue] - Alhpa value (0 - 255)
 * @returns New Array of sRGB values.
 */
export declare function cielabColor(lValue: number, aValue: number, bValue: number, alphaValue?: number): number[];
/**
 * Converts CIELCh values to an array of RGB values (0 - 255).
 * @param {number} lValue - L*: Lightness (0 - 100)
 * @param {number} cValue - C*: Chroma (0 - ca. 100)
 * @param {number} hValue - h*: Hue (0 - 2PI)
 * @param {number} [alphaValue] - Alhpa value (0 - 255)
 */
export declare function cielchColor(lValue: number, cValue: number, hValue: number, alphaValue?: number): number[];
