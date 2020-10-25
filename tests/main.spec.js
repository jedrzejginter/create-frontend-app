const fs = require("fs");
const path = require("path");
const glob = require("glob");

const OUT_DIR = process.env.PROJECT_OUT;
const { PROJECT_NAME } = process.env;

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
    })
    .map((p) => path.relative(outPath(), p));

  expect(projectPaths).toContain(".github/workflows/cd.yml");
  expect(projectPaths).toContain(".github/workflows/ci.yml");
  expect(projectPaths).toContain(".vscode/settings.json");
  expect(projectPaths).toContain("babel/plugin-resolve-imports.js");
  expect(projectPaths).toContain("pages/404.tsx");
  expect(projectPaths).toContain("pages/_app.ts");
  expect(projectPaths).toContain("pages/_document.ts");
  expect(projectPaths).toContain("pages/dashboard.tsx");
  expect(projectPaths).toContain("pages/index.ts");
  expect(projectPaths).toContain("pages/login.ts");
  expect(projectPaths).toContain("pages/create-account/activate.ts");
  expect(projectPaths).toContain("pages/create-account/index.ts");
  expect(projectPaths).toContain("pages/forgot-password/index.ts");
  expect(projectPaths).toContain("pages/forgot-password/reset.ts");
  expect(projectPaths).toContain("public/mockServiceWorker.js");
  expect(projectPaths).toContain("public/robots.txt");
  expect(projectPaths).toContain("scripts/lint-package-json.js");
  expect(projectPaths).toContain("scripts/rewrite-package-json.js");
  expect(projectPaths).toContain("scripts/setup.sh");
  expect(projectPaths).toContain("src/assets/icons/home.svg");
  expect(projectPaths).toContain("src/components/FormError/FormError.tsx");
  expect(projectPaths).toContain("src/components/FormError/index.ts");
  expect(projectPaths).toContain("src/components/Spinner/Spinner.tsx");
  expect(projectPaths).toContain("src/components/Spinner/index.ts");
  expect(projectPaths).toContain("src/containers/Session/Session.tsx");
  expect(projectPaths).toContain("src/containers/Session/index.ts");
  expect(projectPaths).toContain("src/next/App/App.tsx");
  expect(projectPaths).toContain("src/next/App/index.ts");
  expect(projectPaths).toContain("src/next/Document/Document.tsx");
  expect(projectPaths).toContain("src/next/Document/index.ts");
  expect(projectPaths).toContain("src/pages/404/404.tsx");
  expect(projectPaths).toContain("src/pages/404/index.ts");
  expect(projectPaths).toContain(
    "src/pages/ActivateAccount/ActivateAccount.tsx"
  );
  expect(projectPaths).toContain("src/pages/ActivateAccount/index.ts");
  expect(projectPaths).toContain("src/pages/CreateAccount/CreateAccount.tsx");
  expect(projectPaths).toContain("src/pages/CreateAccount/index.ts");
  expect(projectPaths).toContain("src/pages/CreateAccount/types.ts");
  expect(projectPaths).toContain("src/pages/Dashboard/Dashboard.tsx");
  expect(projectPaths).toContain("src/pages/Dashboard/index.ts");
  expect(projectPaths).toContain("src/pages/ForgotPassword/ForgotPassword.tsx");
  expect(projectPaths).toContain("src/pages/ForgotPassword/index.ts");
  expect(projectPaths).toContain("src/pages/ForgotPassword/types.ts");
  expect(projectPaths).toContain("src/pages/Home/Home.tsx");
  expect(projectPaths).toContain("src/pages/Home/index.ts");
  expect(projectPaths).toContain("src/pages/Login/Login.tsx");
  expect(projectPaths).toContain("src/pages/Login/index.ts");
  expect(projectPaths).toContain("src/pages/Login/types.ts");
  expect(projectPaths).toContain("src/pages/ResetPassword/ResetPassword.tsx");
  expect(projectPaths).toContain("src/pages/ResetPassword/index.ts");
  expect(projectPaths).toContain("src/pages/ResetPassword/types.ts");
  expect(projectPaths).toContain("src/services/api/client.ts");
  expect(projectPaths).toContain("src/services/api/index.ts");
  expect(projectPaths).toContain("src/services/api/utils.ts");
  expect(projectPaths).toContain("src/services/auth/api.ts");
  expect(projectPaths).toContain("src/services/auth/const.ts");
  expect(projectPaths).toContain("src/services/auth/index.ts");
  expect(projectPaths).toContain("src/services/auth/utils.ts");
  expect(projectPaths).toContain("src/services/mock-server/browser.ts");
  expect(projectPaths).toContain("src/services/mock-server/handlers.ts");
  expect(projectPaths).toContain("src/services/mock-server/index.ts");
  expect(projectPaths).toContain("src/services/mock-server/server.ts");
  expect(projectPaths).toContain("src/types/core.ts");
  expect(projectPaths).toContain("src/utils/misc.ts");
  expect(projectPaths).toContain("typings/inline-react-svg.d.ts");
  expect(projectPaths).toContain("typings/node.d.ts");
  expect(projectPaths).toContain(".dockerignore");
  expect(projectPaths).toContain(".env.example");
  expect(projectPaths).toContain(".eslintignore");
  expect(projectPaths).toContain(".gitignore");
  expect(projectPaths).toContain(".nvmrc");
  expect(projectPaths).toContain("Dockerfile");
  expect(projectPaths).toContain("README.md");
  expect(projectPaths).toContain("babel.config.js");
  expect(projectPaths).toContain("eslint.config.js");
  expect(projectPaths).toContain("jest.config.js");
  expect(projectPaths).toContain("jest.setup.js");
  expect(projectPaths).toContain("lint-staged.config.js");
  expect(projectPaths).toContain("next-env.d.ts");
  expect(projectPaths).toContain("next.config.js");
  expect(projectPaths).toContain("package.json");
  expect(projectPaths).toContain("prettier.config.js");
  expect(projectPaths).toContain("tsconfig.eslint.json");
  expect(projectPaths).toContain("tsconfig.json");
  expect(projectPaths).toContain("utils.js");
  expect(projectPaths).toContain("yarn.lock");

  expect(projectPaths).not.toContain(".env");
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
