const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");
const { quote } = require("shell-quote");
const t = require("@babel/types");

const codemod = require('../codemod')

function here(...segments) {
  return path.join(__dirname, ...segments);
}

function q(s) {
  return quote([s]);
}

function sortKeys(o) {
  return Object.keys(o).sort().reduce((acc, k) => {
    return { ...acc, [k]: o[k] }
  }, {});
}

// 1. Copy tailwind config
// 2. Copy tailwind css file
// 3. Add script to package.json
// 4. Add import to pages/_app.ts
// 5. Git-ignore tailwind output
// 6. Add tailwind to dev deps
module.exports = function withTailwind(options) {
  function out(...segments) {
    return path.join(process.cwd(), options.out, ...segments)
  }

  const cpMap = [
    [here("tailwind.config.js"), path.join(options.out, 'tailwind.config.js')],
    [here("src/assets/css/tailwind.css"), path.join(options.out, 'src/assets/css/tailwind.css')],
  ]

  for (const [source, target] of cpMap) {
    fs.mkdirSync(path.dirname(target), { recursive: true });

    execSync(`cp -R -P ${q(source)} ${q(target)}`, {
      stdio: "inherit",
    });
  }

  const outPkgJsonPath = require.resolve(out('package.json'));
  const currentPkgJson = require('./package.json');

  const pkg = require(outPkgJsonPath);

  pkg.scripts = sortKeys({
    ...pkg.scripts,
    ...currentPkgJson.scripts,
  })

  pkg.dependencies = sortKeys({
    ...pkg.dependencies,
    ...currentPkgJson.dependencies
  })

  fs.writeFileSync(outPkgJsonPath, JSON.stringify(pkg, null, 2), 'utf-8');

  codemod({
    source: out('pages/_app.ts'),
    visitor: {
      visitProgram(path) {
        path.value.body.unshift(
          t.importDeclaration([],t.stringLiteral("@/assets/css/tailwind.out.css")
          )
        );

        return false
      }
    }
  })

  const gitignorePath = out('.gitignore')
  let gitignore = fs.readFileSync(gitignorePath, 'utf-8')

  gitignore = [gitignore, fs.readFileSync(here(".gitignore"), 'utf-8')].join("\n")

  fs.writeFileSync(gitignorePath, gitignore, 'utf-8')

}
