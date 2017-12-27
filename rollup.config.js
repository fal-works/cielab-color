import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/cielab-color.ts',
  output: {
    file: 'lib/cielab-color.js',
    format: 'umd',
    name: 'cielab',
    sourcemap: false,
    banner: `/**
 * @module cielab-color
 * @author FAL <falworks.contact@gmail.com>
 * @license MIT
 * @version 0.1.0
 */
`
  },
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ]
}
