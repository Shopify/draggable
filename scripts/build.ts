import webpack from 'webpack';

import {isProd, useAnalyser} from './build/config';
import {createConfig as createDevelopmentConfig} from './build/development';
import {createConfig as createProductionConfig} from './build/production';
import {runner} from './build/runner';

let compiler;

if (isProd) {
  compiler = webpack(createProductionConfig({analyser: useAnalyser}));
} else {
  compiler = webpack(createDevelopmentConfig({analyser: useAnalyser}));
}

compiler.run(runner);
