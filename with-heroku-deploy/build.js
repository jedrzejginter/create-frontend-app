/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { quote } = require("shell-quote");
const t = require("@babel/types");
const jsYml = require('js-yaml');

const codemod = require("../codemod");

function here(...segments) {
  return path.join(__dirname, ...segments);
}

function q(s) {
  return quote([s]);
}

function sortKeys(o) {
  return Object.keys(o)
    .sort()
    .reduce((acc, k) => {
      return { ...acc, [k]: o[k] };
    }, {});
}

// 1. Copy CD workflow
// 2. Replace HEROKU_APP_NAME env variable
// 3. (optional) Set up deploy branch innstead of main
module.exports = function withHerokuDeploy(options) {
  function out(...segments) {
    return path.join(process.cwd(), options.dir, ...segments);
  }

  let workflow = fs.readFileSync(here('.github/workflows/cd.yml'), 'utf-8');

  workflow = workflow.replace(/(HEROKU_APP).+/m, `$1: ${options.app}`);

  if (options.deployBranch) {
    workflow = workflow.replace(/(branches): \[main\]/i, `$1: ['${options.deployBranch}']`)
  }

  fs.writeFileSync(out('.github/workflows/cd.yml'), workflow, 'utf-8')
};
