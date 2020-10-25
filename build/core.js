/* eslint-disable import/no-dynamic-require, global-require */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const cpy = require("cpy");
const { quote } = require("shell-quote");

function root(...segments) {
  return path.join(__dirname, "..", ...segments);
}

function q(s) {
  return quote([s]);
}

function requireJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

module.exports = async function createReactProject(options) {
  // Prevent writing to non-empty directory if flag "--force" HAS NOT been set.
  if (!options.force && fs.existsSync(options.dir)) {
    throw new Error(
      `Cannot write files to non-empty directory ${q(
        path.resolve(options.dir)
      )}`
    );
  }

  // Create out dir, so `cp` will work correctly.
  fs.mkdirSync(q(options.dir), { recursive: true });

  // Copy template directories to output.
  for (const dir of [
    ".github",
    ".vscode",
    "babel",
    "pages",
    "public",
    "scripts",
    "src",
    "typings",
  ]) {
    // "-P" don't allow symbolic links
    execSync(`cp -R -P ${root(`template/${dir}`)} ${q(options.dir)}`, {
      stdio: "inherit",
    });
  }

  // Copy top-level files from template dir.
  await cpy([root("template/*"), root("template/.*")], options.dir, {
    // Make sure we will copy top-level files only.
    expandDirectories: false,
    // Ignore paths specified in gitignore.
    gitignore: true,
  });

  const pkg = requireJSON(path.join(options.dir, "package.json"));

  // Set correct project name in package.json
  pkg.name = options.name;

  fs.writeFileSync(
    path.join(options.dir, "package.json"),
    JSON.stringify(pkg, null, 2),
    "utf-8"
  );

  execSync(`(cd ${q(options.dir)} && yarn)`, {
    stdio: "inherit",
  });

  // Format generated project.
  execSync(`(cd ${q(options.dir)} && yarn lint --fix)`, { stdio: "inherit" });
};
