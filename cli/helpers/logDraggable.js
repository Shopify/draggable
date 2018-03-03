const chalk = require('chalk')
const figlet = require('figlet')

const logDraggable = () =>
  console.log(chalk.green.hex('#95BF47').bold(figlet.textSync('Draggable')))

module.exports = logDraggable
