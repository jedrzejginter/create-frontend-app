#!/usr/bin/env node
const yargs = require("yargs/yargs");
const createReactProject = require("./core");

const { argv } = yargs(yargs.hideBin(process.argv))
  .locale("en")
  .option("out", {
    alias: "o",
    type: "string",
    demandOption: true,
    description: "Output directory for project files",
  })
  .option("name", {
    alias: "n",
    type: "string",
    demandOption: true,
    description: "Project name to set in package.json",
  })
  .option("force", {
    alias: "f",
    type: "boolean",
    default: false,
    description: "Allow writing to non-empty directory (specified by --out)",
  })
  .option("withTailwind", {
    type: "boolean",
    default: false,
    description: "Add Tailwind setup",
  });

(async () => {
  try {
    await createReactProject(argv);
    process.exit(0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
})();
