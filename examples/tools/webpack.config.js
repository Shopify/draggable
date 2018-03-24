import path from 'path';
import initPlugins from './webpack.plugins';

const distPath = path.resolve(__dirname, '../dist'); // eslint-disable-line no-undef
const assetsPath = '/assets/js/';
const isProd = process.env.NODE_ENV === 'production'; // eslint-disable-line no-process-env, no-undef
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
    modules: [
      path.resolve(__dirname, '../packages'), // eslint-disable-line no-undef
      path.resolve(__dirname, '../node_modules'), // eslint-disable-line no-undef
    ],
  },
  plugins: initPlugins(isProd),
};
