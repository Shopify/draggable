const args = process.argv.filter((_, index) => index >= 2);

export const useAnalyser = args.some((value) => value === '--analyser');
export const isProd = args.find((value) => value === '--production');
export const rootPath = `${__dirname}/../../`;
export const targetPath = isProd
  ? `${rootPath}lib/`
  : `${rootPath}examples/packages/@shopify/draggable`;
export const resolveModules = ['node_modules', 'src/'];
