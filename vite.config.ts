/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      outputDir: 'dist',
      entryRoot: 'src/index.ts',
      skipDiagnostics: false,
      logDiagnostics: true,
    }),
    tsconfigPaths(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'draggable',
      formats: ['es'],
      fileName: () => 'index.js',
    },
  },
});
