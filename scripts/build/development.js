const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {targetPath, resolveModules} = require('./config');

function createConfig({analyser}) {
  const plugins = [];
  const minimize = Boolean(analyser);

  if (analyser) {
    plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false}));
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
}

module.exports = {createConfig};
