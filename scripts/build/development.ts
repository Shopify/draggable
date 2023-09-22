import type {Configuration} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

import {targetPath, resolveModules} from './config';

interface Options {
  analyser?: boolean;
}

export function createConfig({analyser}: Options): Configuration {
  const plugins: Configuration['plugins'] = [];
  const minimize = Boolean(analyser);

  if (analyser) {
    plugins.push(
      new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false}),
    );
  }

  return {
    mode: 'development',
    entry: `./src/index.js`,
    output: {
      path: targetPath,
      filename: `index.js`,
      library: 'Draggable',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    optimization: {
      minimize,
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: resolveModules,
    },
    plugins,
    module: {
      rules: [
        {
          test: /(\.js)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /(\.ts)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
  };
}
