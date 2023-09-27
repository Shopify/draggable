import {readFileSync} from 'fs';
import * as path from 'path';

import {RollupOptions} from 'rollup';
import {babel, RollupBabelInputPluginOptions} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import includePaths from 'rollup-plugin-includepaths';
import cleanupPlugin from 'rollup-plugin-cleanup';

const packageJSON = readFileSync(
  new URL('./package.json', import.meta.url).pathname,
) as unknown;

const pkg = JSON.parse(packageJSON as string);
const extensions = ['.js', '.ts'];

export function generateConfig({
  output,
  targets,
}: {
  output: RollupOptions['output'];
  targets: RollupBabelInputPluginOptions['targets'];
}): RollupOptions {
  return {
    input: './src/index',
    plugins: [
      includePaths({
        include: {
          shared: 'src/shared',
        },
        paths: ['src/'],
        extensions: [...extensions],
      }),
      nodeResolve({extensions: [...extensions]}),
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        envName: 'production',
        targets,
      }),
      cleanupPlugin({
        extensions: [...extensions],
        maxEmptyLines: 1,
      }),
    ],
    output,
  };
}

const config = [
  generateConfig({
    targets: [...pkg.browserslist],
    output: [
      {
        format: 'cjs',
        dir: path.dirname(pkg.main),
        preserveModules: true,
        entryFileNames: '[name].cjs',
        exports: 'named',
      },
      {
        format: 'esm',
        dir: path.dirname(pkg.module),
        preserveModules: true,
        entryFileNames: '[name].mjs',
      },
      {
        format: 'umd',
        dir: path.dirname(pkg.umd),
        name: 'Draggable',
      },
    ],
  }),
  generateConfig({
    targets: 'last 1 chrome versions',
    output: [
      {
        format: 'esm',
        dir: path.dirname(pkg.esnext),
        preserveModules: true,
        entryFileNames: '[name].mjs',
      },
    ],
  }),
];

export default config;
