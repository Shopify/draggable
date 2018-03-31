const writeFile = require('../../helpers/writeFile.js')
const thenReadJson = require('then-read-json')
const chalk = require('chalk')

const filePath = './examples/src/views/'
const fileName = 'data-pages'

const addToDataPagesJson = async (name, type) => {
  const obj = await thenReadJson(`${filePath}${fileName}.json`)
  const typeList = obj.DataPages.map(obj => {
    if (obj[type]) {
      obj[type].unshift(name)
    }
    return obj
  })

  const content = JSON.stringify({ ...obj, DataPages: [...typeList] })

  return writeFile({
    content,
    extension: 'json',
    name: fileName,
    path: filePath,
  }).then(() => `${chalk.blue('m:')} ${filePath}${fileName}.json\n`)
}

module.exports = addToDataPagesJson
