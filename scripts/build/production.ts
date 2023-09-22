import type {Configuration} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

import {targetPath, resolveModules} from './config';
import {bundles} from './bundles';
import type {Bundle} from './bundles';

interface Options {
  analyser?: boolean;
}

function createBundleConfig(bundle: Bundle, {analyser}: Options) {
  const outputPath = bundle.path || '';
  const minimize = Boolean(analyser);
  const plugins: Configuration['plugins'] = [];
  const es5Plugins: Configuration['plugins'] = [];

  if (analyser) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: `${bundle.filename}.html`,
      }),
    );
  }

  const config: Configuration = {
    mode: 'production',
    entry: `./src/${bundle.source}.js`,
    output: {
      path: `${targetPath}${outputPath}`,
      filename: `${bundle.filename}.js`,
      library: bundle.name,
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

  if (analyser) {
    es5Plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: `${bundle.filename}.html`,
      }),
    );
  }

  const es5Config = {
    ...config,
    output: {
      ...config.output,
      path: `${targetPath}es5/${outputPath}`,
    },
    plugins: es5Plugins,
    module: {
      rules: [
        {
          test: /(\.js)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [['@shopify/babel-preset']],
          },
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

  return [config, es5Config];
}

export function createConfig(options: Options): Configuration[] {
  return bundles.reduce<Configuration[]>(
    (configs, bundle) => [...configs, ...createBundleConfig(bundle, options)],
    [],
  );
}
