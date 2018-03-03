const chalk = require('chalk')
const writeFile = require('../../helpers/writeFile.js')
const exampleTemplates = require('./templates')

// pass arguments according to signature
const getExampleTemplate = (title, signature, data) =>
  Promise.resolve(exampleTemplates[title](...signature.map(arg => data[arg])))

const templates = [
  {
    title: 'newExampleHtml',
    signature: [],
    name: str => str,
    extension: 'html',
  },
  {
    title: 'newExampleJs',
    signature: ['name', 'type'],
    name: str => 'index',
    extension: 'js',
  },
  {
    title: 'newExampleScss',
    signature: ['name'],
    name: str => str,
    extension: 'scss',
  },
  {
    title: 'viewHtml',
    signature: ['description', 'name', 'type'],
    name: str => str,
    extension: 'html',
    path: './examples/src/views/',
  },
]

module.exports = ({ description, name: $name, type }) => {
  //wait for all async processes
  return Promise.all(
    templates.map(
      ({
        extension,
        name,
        path = `./examples/src/content/${type}/${$name}/`,
        signature,
        title,
      }) =>
        // get template strings and interpolate values
        getExampleTemplate(title, signature, {
          description,
          name: $name,
          type,
        })
          .then(
            // write the string to their respective files
            content =>
              writeFile({
                content,
                extension,
                name: name($name),
                path,
              })
          )
          .then(
            () => `${chalk.green('n:')} ${path}/${name($name)}.${extension}\n`
          )
    )
  )
}
