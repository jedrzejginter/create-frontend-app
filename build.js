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

(() => {
  fs.mkdirSync(targetPath(), { recursive: true });

  fs.copyFileSync(templatePath('.gitignore'), targetPath('.gitignore'));
  fs.copyFileSync(templatePath('.nvmrc'), targetPath('.nvmrc'));
  fs.copyFileSync(templatePath('babel.config.js'), targetPath('babel.config.js'));
  fs.copyFileSync(templatePath('eslint.config.js'), targetPath('eslint.config.js'));
  fs.copyFileSync(templatePath('tsconfig.json'), targetPath('tsconfig.json'));
  fs.copyFileSync(templatePath('tsconfig.eslint.json'), targetPath('tsconfig.eslint.json'));
  cpDir.sync(templatePath('src'), targetPath('src'), {});
  cpDir.sync(templatePath('pages'), targetPath('pages'), {});
  cpDir.sync(templatePath('scripts'), targetPath('scripts'), {});

  const pkgJson = require("./template/package.json");
  pkgJson.name = config.PROJECT_NAME;

  fs.writeFileSync(targetPath('package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8')
})()
