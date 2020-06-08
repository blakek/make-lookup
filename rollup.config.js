import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const entry = './src/index.ts';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const externals = [...Object.keys(pkg.dependencies)];
const name = /[a-z-]+$/i.exec(pkg.name)[0];

const buildSystemConfig = {
  external: externals,

  input: entry,

  output: [
    {
      exports: 'named',
      file: pkg.main,
      format: 'commonjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    }
  ],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ babelHelpers: 'bundled', extensions, include: ['src/**/*'] })
  ]
};

const browserConfig = {
  input: entry,

  output: {
    exports: 'named',
    file: pkg.browser,
    format: 'umd',
    globals: externals.reduce((globals, name) => {
      globals[name] = name;
      return globals;
    }),
    name,
    sourcemap: true
  },

  plugins: [
    resolve({
      mainFields: ['module', 'browser', 'main']
    }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({
      babelHelpers: 'runtime',
      extensions,
      plugins: ['@babel/plugin-transform-runtime'],
      presets: [
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            forceAllTransforms: true,
            loose: true,
            modules: false,
            targets: '> 0.25%, not dead'
          }
        ]
      ]
    }),

    terser()
  ]
};

export default [buildSystemConfig, browserConfig];
