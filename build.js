const fs = require('fs');
const cpDir = require('copy-dir');
const path = require('path');

const config = require('./config');

function templatePath(...segments) {
  return path.join(__dirname, 'template', ...segments)
}

function targetPath(...segments) {
  return path.join(__dirname, 'out', ...segments)
}

function mirrorFile(fileName) {
  fs.copyFileSync(templatePath(fileName), targetPath(fileName));
}

function mirrorDir(dirName) {
  cpDir.sync(templatePath(dirName), targetPath(dirName), {});
}

(() => {
  const pkgJson = require("./template/package.json");
  pkgJson.name = config.PROJECT_NAME;

  fs.writeFileSync(targetPath('package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8')
})()
