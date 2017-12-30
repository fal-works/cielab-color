import typescript from 'rollup-plugin-typescript2';

const moduleName = 'cielab-color';
const umdName = 'cielab';
const version = '0.1.2';

const myBanner = `/**
* @module ${moduleName}
* @author FAL <falworks.contact@gmail.com>
* @license MIT
* @version ${version}
*/
`;

export default {
  input: `src/${moduleName}.ts`,
  output: [
    {
      file: `lib/${moduleName}.js`,
      format: 'umd',
      name: umdName,
      sourcemap: false,
      banner: myBanner
    },
    {
      file: `lib/${moduleName}.mjs`,
      format: 'es',
      sourcemap: false,
      banner: myBanner
    }
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ]
}
