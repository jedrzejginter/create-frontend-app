const fs = require("fs");
const path = require("path");
const glob = require("glob");

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

test("should have correct files structure", () => {
  const projectPaths = glob
    .sync(outPath("**/*"), {
      nodir: true,
      dot: true,
      ignore: ["**/node_modules/**", "**/.git/**"],
    })
    .map((p) => path.relative(outPath(), p))
    .sort((pathA, pathB) => {
      let dirA = path.dirname(pathA);
      let dirB = path.dirname(pathB);

      if (pathA === pathB) {
        return 0;
      }

      if (dirA === dirB) {
        return pathA > pathB ? 1 : -1;
      }

      dirA = dirA === "." ? "x" : dirA;
      dirB = dirB === "." ? "x" : dirB;

      return dirA > dirB ? 1 : -1;
    });

  expect(projectPaths).toMatchSnapshot();
});

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
