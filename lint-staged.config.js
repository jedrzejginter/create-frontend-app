// eslint-disable-next-line import/no-extraneous-dependencies
const { CLIEngine } = require("eslint");

const cli = new CLIEngine({});

function filterFiles(filenames) {
  return filenames
    .filter((file) => !cli.isPathIgnored(file))
    .map((f) => `"${f}"`)
    .join(" ");
}

module.exports = {
  "*.{json,md}": (filenames) => `prettier --write ${filterFiles(filenames)}`,
  "*.js": (filenames) => `yarn lint --fix ${filterFiles(filenames)}`,
};
