/// <reference types="vite/client" />

import {defineConfig} from 'vite';
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';
import {viteCommonjs} from '@originjs/vite-plugin-commonjs';
import {createHtmlPlugin} from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.json'],
  },
  plugins: [viteCommonjs(), envCompatible(), createHtmlPlugin(), tsconfigPaths()],
  build: {},
});
