import path from 'path';
import initPlugins from './webpack.plugins';

const distPath = path.resolve(__dirname, '../dist'); // eslint-disable-line no-undef
const assetsPath = '/assets/js/';
const srcApp = 'src/scripts/examples-app.js';
const vendorScripts = ['core-js/es6/object', 'core-js/es6/map'];

export const webpackConfig = {
  context: distPath,
  devtool: 'source-map',
  entry: {
    'examples-vendor': vendorScripts,
    'examples-app': `../${srcApp}`,
  },
  output: {
    path: distPath + assetsPath,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  // this slows down compile time, but since we are consuming the `lib` draggable,
  // this makes our `import` paths cleaner and consistent
  resolve: {
    modules: [
      path.resolve(__dirname, '../../../draggable'), // eslint-disable-line no-undef
      path.resolve(__dirname, '../node_modules'), // eslint-disable-line no-undef
    ],
  },
  plugins: initPlugins(),
};
