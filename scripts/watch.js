const webpack = require('webpack');
const {createConfig: createDevelopmentConfig} = require('./build/development');
const {runner} = require('./build/utils');

const compiler = webpack(createDevelopmentConfig({analyser: false}));

compiler.watch(
  {
    aggregateTimeout: 300,
    poll: 1000,
  },
  runner,
);
