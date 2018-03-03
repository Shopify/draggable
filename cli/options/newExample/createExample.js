const path = require('path')
const chalk = require('chalk')
const inquireExampleDetails = require('./inquireExampleDetails')

const helpersDir = path.resolve(__dirname, './cli/helpers')
const createExampleFiles = require('./createExampleFiles.js')
const addToExamplesConfig = require('./addToExamplesConfig.js')
const logDraggable = require('../../helpers/logDraggable.js')

const loading = '\nGenerating files\n'

const appMessages = [
  `\n\n${chalk.blue(
    'Answer the following questions and a blank new page template will be generated for you'
  )}.\n`,
  loading,
  `The following new files have been created: \n`,
  `Okay, all set! The following files have been modified:\n`,
]

const createExample = async () => {
  // Log stylish 'Draggable' to the console
  logDraggable()

  // Show prompt to action message
  console.log(appMessages.shift())

  const exampleDetails = await inquireExampleDetails()

  // Show wait message
  console.log((exampleDetails, appMessages.shift()))

  // Create files and return name of created files
  const createdFileNames = await createExampleFiles(exampleDetails)

  // Show outcome message
  console.log(appMessages.shift())

  // Show created files
  console.log(...createdFileNames, `\n`)

  // Edit examples init/configuration file and return name of modified file
  const modifiedFileNames = await addToExamplesConfig(exampleDetails)

  // Show modification message
  console.log(appMessages.shift())

  // Show modified file nameOption
  console.log(...modifiedFileNames)

  // 👍🤞
}
module.exports = createExample
