import webpack from 'webpack';
import * as bundleAnalyzer from 'webpack-bundle-analyzer';

export default function initPlugins() {
  const PLUGINS = [];

  PLUGINS.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'examples-vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'examples-runtime',
    }),
    new bundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../../../bundle-report.html',
    }),
  );

  return PLUGINS;
}
