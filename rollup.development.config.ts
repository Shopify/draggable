import {generateConfig} from './rollup.config';

const config = generateConfig({
  targets: 'last 1 chrome versions',
  output: [
    {
      format: 'umd',
      dir: './examples/packages/@shopify/draggable',
      name: 'Draggable',
    },
  ],
});

export default config;
