const fs = require('fs');
const cpDir = require('copy-dir');
const path = require('path');
const hbs = require('handlebars');
const config = require('./config');

function __in(...segments) {
  return path.join(__dirname, 'src', ...segments)
}

function __out(...segments) {
  return path.join(__dirname, 'out', ...segments)
}

(() => {
  fs.mkdirSync(__out(), { recursive: true });

  const data = {
    projectName: config.PROJECT_NAME,
    hasEmotion: false,
  }

  function renderFile(fp, dp) {
    const t = fs.readFileSync(fp, 'utf-8')
    const res = hbs.compile(t)(data)
    fs.mkdirSync(path.dirname(dp), { recursive: true })
    fs.writeFileSync(dp, res, 'utf-8');
  }

  fs.copyFileSync(__in('.gitignore'), __out('.gitignore'));
  fs.copyFileSync(__in('.nvmrc'), __out('.nvmrc'));
  fs.copyFileSync(__in('babel.config.js'), __out('babel.config.js'));
  fs.copyFileSync(__in('eslint.config.js'), __out('eslint.config.js'));
  fs.copyFileSync(__in('tsconfig.json'), __out('tsconfig.json'));
  fs.copyFileSync(__in('tsconfig.eslint.json'), __out('tsconfig.eslint.json'));
  cpDir.sync(__in('src'), __out('src'), {});
  renderFile(__in('pages/index.ts'), __out('pages/index.ts'));

  const pkgJson = require("./src/package.json");
  pkgJson.name = data.projectName;

  fs.writeFileSync(__out('package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8')
})()
