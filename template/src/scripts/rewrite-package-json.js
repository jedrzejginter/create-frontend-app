const isDocker = require("is-docker");
const isCI = require("is-ci");
const fs = require("fs");

// Prevent overwriting package.json locally.
if (!isDocker() && !isCI) {
  process.stderr.write('This script can be run only in CI or Docker.\n')
  process.exit(1);
}

function filterDependencies(oldDependencies, shouldBeRemoved) {
  const newDependencies = {};

  for (const dependencyName in oldDependencies) {
    if (!shouldBeRemoved(dependencyName)) {
      newDependencies[dependencyName] = oldDependencies[dependencyName];
    }
  }

  return newDependencies;
}

// We cannot just remove devDependencies,
// because we still need "@types/.." for transpilation.
function checkIfShouldBeRemoved(dependencyName) {
  return (
    /^(eslint|@typescript-eslint\/|@testing-library\/)/.test(dependencyName) ||
    [
      "husky",
      "jest",
      "lint-staged",
      "prettier",
    ].includes(dependencyName)
  );
}

const packageJson = require("../package.json");

packageJson.dependencies = filterDependencies(packageJson.dependencies, checkIfShouldBeRemoved);
packageJson.devDependencies = filterDependencies(
  packageJson.devDependencies,
  checkIfShouldBeRemoved,
);

// This will be saved in directory the script is run from.
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2), "utf-8");
