import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import image from '@rollup/plugin-image'
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [typescript(), image()],
  output: [
    {
      name: 'bggen',
      file: pkg.browser,
      format: 'umd',
      sourceMap: true,
      plugins: [terser()]
    },
    {
      name: 'bggen',
      file: 'dist/bg-gen.umd.js',
      format: 'umd',
      sourceMap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      plugins: [terser()],
      sourceMap: true
    },
    {
      file: 'dist/bg-gen.esm.js',
      format: 'es',
      sourceMap: true
    }
  ],
  globals: {
    'pixi.js': 'PIXI'
  },
  externals: ['pixi.js']
}