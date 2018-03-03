#!/usr/bin/env node

const thenReadJson = require('then-read-json')
const program = require('commander')
const controlAsync = require('./helpers/controlAsync.js')
const newExample = require('./options/newExample')

const programOptions = {
  newPage: {
    commands: '-n, --new-page',
    description: 'Creates a new example page'
  }
}

const draggable = async function() {
  const result = await controlAsync(thenReadJson('./package.json'))

  if (result.error) {
    return console.error(result.error)
  }

  const packageJson = result.success
  const draggableVersion = packageJson.version

  program
    .version(draggableVersion)
    .option(programOptions.newPage.commands, programOptions.newPage.description)
    .parse(process.argv)

  if (program.newPage) {
    newExample()
  }
}

draggable()

module.exports = draggable
