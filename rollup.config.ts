import {readFileSync} from 'fs';
import * as path from 'path';

import {RollupOptions} from 'rollup';
import {babel, RollupBabelInputPluginOptions} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import includePaths from 'rollup-plugin-includepaths';

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
        extensions: ['.js', '.ts'],
      }),
      nodeResolve({extensions}),
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        envName: 'production',
        targets,
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
        entryFileNames: '[name].js',
        exports: 'named',
      },
      {
        format: 'esm',
        dir: path.dirname(pkg.module),
        preserveModules: true,
        entryFileNames: '[name].js',
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
        entryFileNames: '[name].esnext',
      },
    ],
  }),
];

export default config;
