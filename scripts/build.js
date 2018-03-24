const webpack = require('webpack');
const {isProd, useAnalyser} = require('./build/config');
const {createConfig: createDevelopmentConfig} = require('./build/development');
const {createConfig: createProductionConfig} = require('./build/production');
const {runner} = require('./build/utils');

let compiler;

if (isProd) {
  compiler = webpack(createProductionConfig({analyser: useAnalyser}));
} else {
  compiler = webpack(createDevelopmentConfig({analyser: useAnalyser}));
}

compiler.run(runner);
