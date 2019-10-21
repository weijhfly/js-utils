import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import {uglify} from 'rollup-plugin-uglify';
import banner from 'rollup-plugin-banner';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import merge from 'webpack-merge';

let year = new Date().getFullYear(),
    version = pkg.version;

let bannerText = `storage-util v${version}
(c) 2019-${year} weijhfly https://github.com/weijhfly/js-utils
Licensed under MIT`;

let config = {
  input: 'src/index.ts',
  output: {
    name:'StorageUtil',
    file: 'dist/storage-util.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    json(),
    typescript(),
    banner(bannerText),
  ]
};

let confinMin = merge({}, config),
    es = merge({}, config);

es.output.file = 'dist/storage-util.es.js';
es.output.format = 'es';

confinMin.output.file = 'dist/storage-util.min.js';
confinMin.plugins.unshift(uglify());
export default [config, confinMin, es];