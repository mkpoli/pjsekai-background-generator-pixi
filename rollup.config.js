import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import image from '@rollup/plugin-image'
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [typescript(({ tsconfig: './tsconfig.json' })), image()],
  output: [
    {
      name: 'bggen',
      file: pkg.browser,
      format: 'umd',
      plugins: [terser()],
      globals: {
        'pixi.js': 'PIXI'
      },
      sourcemap: true
    },
    {
      name: 'bggen',
      file: 'dist/bg-gen.umd.js',
      format: 'umd',
      globals: {
        'pixi.js': 'PIXI'
      },
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      plugins: [terser()],
      globals: {
        'pixi.js': 'PIXI'
      },
      sourcemap: true
    },
    {
      file: 'dist/bg-gen.esm.js',
      format: 'es',
      globals: {
        'pixi.js': 'PIXI'
      },
      sourcemap: true
    }
  ],
  external: ['pixi.js']
}