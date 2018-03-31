const write = require('write')

const writeFile = ({ content = '', extension, name, path = '' }) =>
  write(`${path}${name}.${extension}`, content)

module.exports = writeFile
