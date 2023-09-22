import webpack from 'webpack';

import {createConfig as createDevelopmentConfig} from './build/development';
import {runner} from './build/runner';

const compiler = webpack(createDevelopmentConfig({analyser: false}));

compiler.watch(
  {
    aggregateTimeout: 300,
    poll: 1000,
  },
  runner,
);
