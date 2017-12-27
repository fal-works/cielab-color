/**
 * Matrix for conversion color values from XYZ to linear RGB.
 * Values from "7. Conversion from XYZ (D65) to linear sRGB values" in
 * http://www.color.org/chardata/rgb/sRGB.pdf (April 2015)
 */
export declare const xyzToLinearRgbConversionMatrix: number[][];
/**
 * Matrix for converting color values from linear RGB to XYZ.
 * This is an inversed matrix of xyzToLinearRgbConversionMatrix
 * which is pre-calculated by math.js.
 */
export declare const linearRgbToXyzConversionMatrix: number[][];
/**
 * CIE standard illuminant.
 */
export declare class Illuminant {
    readonly name: string;
    readonly tristimulusValues: [number, number, number];
    constructor(name: string, tristimulusValues: [number, number, number]);
}
/**
 * Map of illuminants.
 */
export declare const illuminants: {
    [name: string]: Illuminant;
};
