const promisify = require('util').promisify
const path = require('path')
const chalk = require('chalk')
const writeFile = require('../../helpers/writeFile.js')
const addToDataPagesJson = require('./addToDataPagesJson.js')

const readFileAsync = promisify(require('fs').readFile)

// contains file path details and edits to be made to the file
const fileEdits = [
  {
    file: {
      extension: 'js',
      name: 'index',
      path: `./examples/src/content/`,
    },
    changesToBeMade: [
      {
        placeholder: '__Import new example__',
        text: (name, type) => `\nimport ${name} from './${type}/${name};'`,
      },
      {
        placeholder: '__Initialize new example__',
        text: (name, type) => `  ${name},`,
      },
    ],
  },
  {
    file: {
      extension: 'scss',
      name: 'examples-app',
      path: `./examples/src/styles/`,
    },
    changesToBeMade: [
      {
        placeholder: '__Import new example__',
        text: (name, type) => `@import 'content/${type}/${name}/${name}';`,
      },
    ],
  },
]

const splitAtNewlineBeforeStr = (content, str) => {
  const pos = content.search(str)
  const index = content.slice(0, pos).lastIndexOf('\n')

  const before = content.slice(0, index)
  const after = content.slice(index, content.length)
  return [before, after]
}

const concatStrs = (...strs) => {
  return strs.join('')
}

const splitAndConcat = (content, str) => {
  const [before, after] = splitAtNewlineBeforeStr(content, str)
  return str => concatStrs(before, str, after)
}

const editTexts = [
  {
    positionPlaceholder: '__Import new example__',
    text: (name, type) =>
      `\nimport ${name} from '../content/${type}/${name}'\n`,
  },
  {
    positionPlaceholder: '__Initialize new example__',
    text: (name, type) => `\n${name}()\n`,
  },
]

const addToExamplesConfig = ({ name, type }) => {
  return Promise.all(
    // edit contains file details and changes to be made to file contents
    fileEdits.map(async ({ file, changesToBeMade }) => {
      // retreive file
      const content = await readFileAsync(
        `${file.path}${file.name}.${file.extension}`,
        {
          encoding: 'utf-8',
        }
      )

      // Add new contents
      const data = changesToBeMade.reduce((acc, val) => {
        return splitAndConcat(acc, val.placeholder)(val.text(name, type))
      }, content)

      // save updated file
      return writeFile({
        content: data,
        extension: file.extension,
        name: file.name,
        path: file.path,
      }).then(
        () => `${chalk.red('m:')} ${file.path}${file.name}.${file.extension}\n`
      )
    })
  ).then(editedFileNames => {
    return addToDataPagesJson(name, type).then(fileName => [
      ...editedFileNames,
      fileName,
    ])
  })
}

module.exports = addToExamplesConfig
