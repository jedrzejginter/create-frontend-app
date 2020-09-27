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
  fs.mkdirSync(targetPath(), { recursive: true });

  mirrorFile('.dockerignore');
  mirrorFile('.env.example');
  mirrorFile('.eslintignore');
  mirrorFile('.gitignore');
  mirrorFile('.nvmrc');
  mirrorFile('babel.config.js');
  mirrorFile('Dockerfile');
  mirrorFile('eslint.config.js');
  mirrorFile('next-env.d.ts');
  mirrorFile('next.config.js');
  mirrorFile('README.md');
  mirrorFile('tsconfig.eslint.json');
  mirrorFile('tsconfig.json');
  mirrorFile('yarn.lock');

  mirrorDir('babel');
  mirrorDir('pages');
  mirrorDir('public');
  mirrorDir('scripts');
  mirrorDir('src');
  mirrorDir('typings');

  const pkgJson = require("./template/package.json");
  pkgJson.name = config.PROJECT_NAME;

  fs.writeFileSync(targetPath('package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8')
})()
