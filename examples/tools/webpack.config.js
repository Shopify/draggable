/* eslint-env node */

import path from 'path';

import initPlugins from './webpack.plugins';

const distPath = path.resolve(__dirname, '../dist');
const assetsPath = '/assets/js/';
const isProd = process.env.NODE_ENV === 'production';
const srcApp = 'src/scripts/examples-app.js';
const regexNodeMods = /[\\/]node_modules[\\/]/;

export const webpackConfig = {
  mode: isProd ? 'production' : 'development',
  context: distPath,
  devtool: 'source-map',
  entry: {
    'examples-app': `../${srcApp}`,
  },
  output: {
    path: distPath + assetsPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: regexNodeMods,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'examples-runtime',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: regexNodeMods,
          name: 'examples-vendor',
          chunks: 'all',
        },
      },
    },
  },
  // this slows down compile time, but since we are consuming the `lib` draggable,
  // this makes our `import` paths cleaner and consistent
  resolve: {
    modules: [path.resolve(__dirname, '../packages'), path.resolve(__dirname, '../node_modules')],
  },
  plugins: initPlugins(isProd),
};
