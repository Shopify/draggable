import * as bundleAnalyzer from 'webpack-bundle-analyzer';

export default function initPlugins(isProd = false) {
  const plugins = [];

  if (isProd) {
    console.log('Running in `production`');
  }

  plugins.push(
    new bundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../../../bundle-report.html',
    }),
  );

  return plugins;
}
