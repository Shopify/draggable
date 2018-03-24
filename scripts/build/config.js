/* eslint-disable no-process-env */

const args = process.argv.filter((value, index) => index >= 2);
const useAnalyser = args.find((value) => value === '--analyser');
const isProd = args.find((value) => value === '--production');

const rootPath = `${__dirname}/../../`;
const targetPath = isProd ? `${rootPath}lib/` : `${rootPath}examples/packages/@shopify/draggable`;
const resolveModules = ['node_modules', 'src/'];

module.exports = {
  isProd,
  rootPath,
  targetPath,
  resolveModules,
  useAnalyser,
};

/* eslint-enable no-process-env */
