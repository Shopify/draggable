/* globals module, __dirname */

const target = '/lib/';

function createConfig({name, filename = name, source, path = ''}) {
  return {
    entry: `./src/${source}`,
    output: {
      path: __dirname + target + path,
      filename: `${filename}.js`,
      library: name,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    resolve: {
      modules: [
        'node_modules',
        'src/',
      ],
    },
    module: {
      loaders: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['shopify/web'],
          },
        },
      ],
    },
  };
}

module.exports = [
  createConfig({name: 'Draggable', filename: 'draggable.bundle', source: 'index'}),

  createConfig({name: 'Draggable', filename: 'draggable', source: 'Draggable/index'}),
  createConfig({name: 'Sortable', filename: 'sortable', source: 'Sortable/index'}),
  createConfig({name: 'Swappable', filename: 'swappable', source: 'Swappable/index'}),
  createConfig({name: 'Droppable', filename: 'droppable', source: 'Droppable/index'}),

  createConfig({name: 'Plugins', filename: 'plugins', source: 'Plugins/index'}),
  createConfig({name: 'Collidable', filename: 'collidable', path: 'plugins/', source: 'Plugins/Collidable/index'}),
  createConfig({name: 'Snappable', filename: 'snappable', path: 'plugins/', source: 'Plugins/Snappable/index'}),

  createConfig({name: 'utils', filename: 'utils', source: 'shared/utils/index'}),
];
