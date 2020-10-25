#!/usr/bin/env node
/* eslint-disable global-require */
const yargs = require("yargs/yargs");

// eslint-disable-next-line no-unused-expressions
yargs(yargs.hideBin(process.argv))
  .locale("en")
  .demandCommand(1)
  .command(
    "init",
    "Initialize project",
    (y) => {
      y.option("dir", {
        alias: "d",
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
          description:
            "Allow writing to non-empty directory (specified by --out)",
        });
    },
    async (argv) => {
      try {
        await require("./core")(argv);
        process.exit(0);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        process.exit(1);
      }
    }
  )
  .command(
    "with-tailwind",
    "Add Tailwind support",
    (y) => {
      y.option("dir", {
        alias: "d",
        type: "string",
        demandOption: true,
        description: "Project directory",
      });
    },
    (argv) => {
      require("../with-tailwind/build.js")(argv);
    }
  )
  .command(
    "with-heroku-deploy",
    "Add Heroku deployment",
    (y) => {
      y.option("dir", {
        alias: "d",
        type: "string",
        demandOption: true,
        description: "Project directory",
      })
        .option("app", {
          type: "string",
          demandOption: true,
          description: "Heroku app name",
        })
        .option("deployBranch", {
          type: "string",
          demandOption: false,
          default: "main",
          description: "Set deploy branch",
        });
    },
    (argv) => {
      require("../with-heroku-deploy/build.js")(argv);
    }
  ).argv;
