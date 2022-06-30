/// <reference types="vite/client" />

import {defineConfig} from 'vite';
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';
import {viteCommonjs} from '@originjs/vite-plugin-commonjs';
import {createHtmlPlugin} from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      outputDir: 'lib',
      entryRoot: 'src/index.ts'
    }),
    viteCommonjs(),
    envCompatible(),
    createHtmlPlugin(),
    tsconfigPaths()
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'draggable',
      fileName: (format) => `draggable.${format}.js`
    }
  },
});
