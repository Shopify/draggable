const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {targetPath, resolveModules} = require('./config');
const {bundles} = require('./bundles');

function createBundleConfig(bundle, {analyser}) {
  const outputPath = bundle.path || '';
  const minimize = Boolean(analyser);
  const plugins = [];
  const es5Plugins = [];

  if (analyser) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: `${bundle.filename}.html`,
      }),
    );
  }

  const config = {
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
      modules: resolveModules,
    },
    plugins,
    module: {
      rules: [
        {
          test: /(\.js)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
              'transform-es2015-modules-commonjs',
            ],
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
            presets: [['shopify/web']],
          },
        },
      ],
    },
  };

  return [config, es5Config];
}

function createConfig(options) {
  return bundles.reduce((configs, bundle) => [...configs, ...createBundleConfig(bundle, options)], []);
}

module.exports = {createConfig};
