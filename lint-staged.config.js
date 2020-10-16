// eslint-disable-next-line import/no-extraneous-dependencies
const { CLIEngine } = require("eslint");

const cli = new CLIEngine({});

module.exports = {
  "*.{json,md}": "prettier --write",
  "*.js": (filenames) => {
    return [
      `yarn lint --fix ${filenames
        .filter((file) => !cli.isPathIgnored(file))
        .map((f) => `"${f}"`)
        .join(" ")}`,
    ];
  },
};
