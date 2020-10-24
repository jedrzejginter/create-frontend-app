// eslint-disable-next-line import/no-extraneous-dependencies
const { CLIEngine } = require("eslint");

const cli = new CLIEngine({});

// Filter out files that should be omitted by lint-staged.
function filterFiles(filenames) {
  return filenames
    .filter((file) => !cli.isPathIgnored(file))
    .map((f) => `"${f}"`)
    .join(" ");
}

module.exports = {
  "*.{json,md}": "prettier --write",
  "*.js": (filenames) => `yarn lint --fix ${filterFiles(filenames)}`,
};
