/**
* @module cielab-color
* @author FAL <falworks.contact@gmail.com>
* @license MIT
* @version 0.1.1
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.cielab = {})));
}(this, (function (exports) { 'use strict';

function createCielabToXyzFunc() {
    const delta = 6 / 29;
    const constantA = 16 / 116;
    const constantB = 3 * delta * delta;
    return (value) => {
        if (value > delta)
            return value * value * value;
        return (value - constantA) * constantB;
    };
}
const cielabToXyzFunc = createCielabToXyzFunc();
/**
 * Converts color values from CIELAB (D65) to XYZ.
 * @param {number[]} cielabValue - Value array of L*, a*, b* (D65).
 * @param {Illuminant} illuminant - Instance of Illuminant.
 * @param {number[]} [target] - Target array for receiving the result.
 * @returns {number[]} XYZ value array.
 */
function cielabValueToXyzValue(cielabValue, illuminant, target) {
    const yFactor = (cielabValue[0] + 16.0) / 116.0;
    const xFactor = yFactor + cielabValue[1] / 500.0;
    const zFactor = yFactor - cielabValue[2] / 200.0;
    if (target) {
        target[0] = illuminant.tristimulusValues[0] * cielabToXyzFunc(xFactor);
        target[1] = illuminant.tristimulusValues[1] * cielabToXyzFunc(yFactor);
        target[2] = illuminant.tristimulusValues[2] * cielabToXyzFunc(zFactor);
        return target;
    }
    return [
        illuminant.tristimulusValues[0] * cielabToXyzFunc(xFactor),
        illuminant.tristimulusValues[1] * cielabToXyzFunc(yFactor),
        illuminant.tristimulusValues[2] * cielabToXyzFunc(zFactor),
    ];
}

/**
 * Multiplies the given matrix and array.
 * The number of matrix columns and the array length must be identical.
 * @param {number[][]} matrix - Any matrix.
 * @param {number[]} array - Any one-dimensional array of numbers.
 * @param {number[]} [target] - Target array for receiving the result.
 * @returns Product of the given values as an array.
 */
function multiplyMatrixAndArray(matrix, array, target) {
    const matrixRowCount = matrix.length;
    const matrixColumnCount = matrix[0].length;
    /* tslint:disable:prefer-array-literal */
    const resultArray = target || new Array(matrixRowCount);
    /* tslint:enable */
    for (let row = 0; row < matrixRowCount; row += 1) {
        resultArray[row] = 0;
        for (let col = 0; col < matrixColumnCount; col += 1) {
            resultArray[row] += matrix[row][col] * array[col];
        }
    }
    return resultArray;
}

/**
 * Matrix for conversion color values from XYZ to linear RGB.
 * Values from "7. Conversion from XYZ (D65) to linear sRGB values" in
 * http://www.color.org/chardata/rgb/sRGB.pdf (April 2015)
 * @constant {number[][]} xyzToLinearRgbConversionMatrix
 */
const xyzToLinearRgbConversionMatrix = [
    [3.2406255, -1.537208, -0.4986286],
    [-0.9689307, 1.8757561, 0.0415175],
    [0.0557101, -0.2040211, 1.0569959],
];
/**
 * Matrix for converting color values from linear RGB to XYZ.
 * This is an inversed matrix of xyzToLinearRgbConversionMatrix
 * which is pre-calculated by math.js.
 * @constant {number[][]} linearRgbToXyzConversionMatrix
 */

/**
 * CIE standard illuminant.
 */
class Illuminant {
    constructor(name, tristimulusValues) {
        this.name = name;
        this.tristimulusValues = tristimulusValues;
    }
}
/**
 * Map of illuminants.
 */
const illuminants = {
    D50: new Illuminant('D50', [0.9642, 1.0000, 0.8251]),
    D55: new Illuminant('D55', [0.9568, 1.0000, 0.9214]),
    D65: new Illuminant('D65', [0.95047, 1.00000, 1.08883]),
    E: new Illuminant('E', [1, 1, 1]),
};

/**
 * Applies display gamma correction to the given number.
 * @param value - any number in a linear color space (0 - 1).
 */
function degamma(value) {
    if (value <= 0.0031308)
        return 12.92 * value;
    return 1.055 * Math.pow(value, 1.0 / 2.4) - 0.055;
}

let currentIlluminant = illuminants.D50;
/**
 * Sets the current illuminant. (e.g. D50, D65 etc.)
 * @param illuminant - Any element of illuminants.
 * @example import * as c from 'cielab-color'; c.setIlluminant(c.illuminants.D65);
 */
function setIlluminant(illuminant) {
    currentIlluminant = illuminant;
}
const temporalArray1 = [0, 0, 0];
const temporalArray2 = [0, 0, 0];
const temporalArray3 = [0, 0, 0];
const temporalArray4 = [0, 0, 0];
function assignArray(array, v0, v1, v2) {
    array[0] = v0;
    array[1] = v1;
    array[2] = v2;
    return array;
}
/**
 * Clips the given linear RGB factor to the valid range (0 - 1)
 * and converts it to an sRGB value (0 - 255).
 * @param factor - Factor of either red, green or blue in the linear RGB color space.
 * @returns sRGB value.
 */
function linearRgbFactorToSrgbValue(factor) {
    return degamma(Math.min(Math.max(factor, 0), 1)) * 255;
}
/**
 * Converts CIELAB values to an array of RGB values (0 - 255).
 * @param {number} lValue - L*: Lightness (0 - 100)
 * @param {number} aValue - a* (0 - ca. 100)
 * @param {number} bValue - b* (0 - ca. 100)
 * @param {number} [alphaValue] - Alhpa value (0 - 255)
 * @returns New Array of sRGB values.
 */
function cielabColor(lValue, aValue, bValue, alphaValue) {
    const labValue = assignArray(temporalArray1, lValue, aValue, bValue);
    const xyzValue = cielabValueToXyzValue(labValue, currentIlluminant, temporalArray2);
    const rgbFactor = multiplyMatrixAndArray(xyzToLinearRgbConversionMatrix, xyzValue, temporalArray3);
    const srgbValue = assignArray(temporalArray4, linearRgbFactorToSrgbValue(rgbFactor[0]), linearRgbFactorToSrgbValue(rgbFactor[1]), linearRgbFactorToSrgbValue(rgbFactor[2]));
    return alphaValue ? [
        srgbValue[0],
        srgbValue[1],
        srgbValue[2],
        alphaValue,
    ] : [
        srgbValue[0],
        srgbValue[1],
        srgbValue[2],
    ];
}
/**
 * Converts CIELCh values to an array of RGB values (0 - 255).
 * @param {number} lValue - L*: Lightness (0 - 100)
 * @param {number} cValue - C*: Chroma (0 - ca. 100)
 * @param {number} hValue - h*: Hue (0 - 2PI)
 * @param {number} [alphaValue] - Alhpa value (0 - 255)
 */
function cielchColor(lValue, cValue, hValue, alphaValue) {
    return cielabColor(lValue, cValue * Math.cos(hValue), cValue * Math.sin(hValue), alphaValue);
}

exports.setIlluminant = setIlluminant;
exports.cielabColor = cielabColor;
exports.cielchColor = cielchColor;
exports.illuminants = illuminants;

Object.defineProperty(exports, '__esModule', { value: true });

})));
