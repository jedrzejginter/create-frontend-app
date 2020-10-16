const fs = require("fs");
const path = require("path");

const OUT_DIR = process.env.CRP_ARG_OUT;
const PROJECT_NAME = process.env.CRP_ARG_NAME;

function outPath(...segments) {
  return path.join(process.cwd(), OUT_DIR, ...segments);
}

function readOutFile(...segments) {
  return fs.readFileSync(outPath(...segments), "utf-8");
}

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(require.resolve(outPath("package.json")));

describe(".gitignore", () => {
  it("should not ignore typings directory", () => {
    expect(readOutFile(".gitignore")).toEqual(
      expect.not.stringMatching(/^typings/im)
    );
  });
});

describe("package.json", () => {
  it("should have project name set", () => {
    expect(pkg.name).toBe(PROJECT_NAME);
  });

  it("should have husky config set", () => {
    expect(pkg).not.toHaveProperty("__husky");
    expect(pkg).toHaveProperty("husky");
  });

  it("should have all packages with exact versions", () => {
    const inexact = [];
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    for (const dependency in deps) {
      if (!/^[\da-z]/.test(deps[dependency])) {
        inexact.push(dependency);
      }
    }

    expect(inexact).toStrictEqual([]);
  });
});
