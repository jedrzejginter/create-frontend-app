#!/usr/bin/env node
const yargs = require('yargs/yargs');
const createReactProject = require('./core');

const argv = yargs(yargs.hideBin(process.argv))
  .locale('en')
  .option('out', {
    type: "string",
    demandOption: true,
    description: "Output directory for project files",
  })
  .option("name", {
    type: 'string',
    demandOption: true,
    description: 'Project name to set in package.json'
  })
  .argv;

(async() => {
  try {
    await createReactProject(argv);
    process.exit(0);
  } catch {
    process.exit(1);
  }
})()
