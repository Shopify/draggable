const inquirer = require('inquirer')
const chalk = require('chalk')

const onlyAlphaNumeric = /[^a-z0-9]+/i
const startsWithNumber = /^[0-9]/i

const invalidExampleNameErrorMessage = `
${chalk.red('Naming error')}

${chalk.yellow(`Example name can only start with $, _, or alphabetical characters
Example name can only contain alpha-numeric characters`)}
`

const validExampleName = name => {
  return (
    name.search(onlyAlphaNumeric) === -1 &&
    name.search(startsWithNumber) === -1 &&
    name !== ''
  )
}

const typeOptions = [
  {
    type: 'list',
    name: 'type',
    message: 'Under what group does this Example belong?',
    choices: [
      {
        name: 'Draggable',
        value: 'Draggable'
      },
      {
        name: 'Droppable',
        value: 'Droppable'
      },
      {
        name: 'Sortable',
        value: 'Sortable'
      },
      {
        name: 'Swappable',
        value: 'Swappable'
      },
      {
        name: 'Plugins',
        value: 'Plugins'
      }
    ]
  }
]

const nameOption = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of this Example?',
    validate: name =>
      validExampleName(name) ? true : invalidExampleNameErrorMessage
  }
]

const descOption = [
  {
    type: 'input',
    name: 'description',
    message: 'Provide a roughly 150-character description of this example.'
  }
]

const inquireExampleDetails = async () => {
  const type = await inquirer.prompt(typeOptions)
  const name = await inquirer.prompt(nameOption)
  const description = await inquirer.prompt(descOption)

  return {
    ...description,
    ...name,
    ...type
  }
}

module.exports = inquireExampleDetails
