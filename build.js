const fs = require('fs');
const cpDir = require('copy-dir');
const path = require('path');
const hbs = require('handlebars');

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

  mirrorFile('.gitignore');
  mirrorFile('.env.example');
  mirrorFile('.nvmrc');
  mirrorFile('babel.config.js');
  mirrorFile('eslint.config.js');
  mirrorFile('.dockerignore');
  mirrorFile('Dockerfile');
  mirrorFile('README.md');
  mirrorFile('next-env.d.ts');
  mirrorFile('next.config.js');
  mirrorFile('tsconfig.json');
  mirrorFile('tsconfig.eslint.json');

  mirrorDir('babel');
  mirrorDir('pages');
  mirrorDir('public');
  mirrorDir('scripts');
  mirrorDir('src');
  mirrorDir('typings');

  fs.unlinkSync(targetPath('typings/build.d.ts'))

  const pkgJson = require("./template/package.json");
  pkgJson.name = config.PROJECT_NAME;

  fs.writeFileSync(targetPath('package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8')
})()
