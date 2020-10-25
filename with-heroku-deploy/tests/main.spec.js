const jsyml = require("js-yaml");
const fs = require("fs");

let workflow;

beforeAll(() => {
  workflow = jsyml.safeLoad(
    fs.readFileSync("out/.github/workflows/cd.yml", "utf-8")
  );
});

test("has workflow file created", () => {
  expect(fs.existsSync("out/.github/workflows/cd.yml")).toBe(true);
});

test("has proper HEROKU_APP set", () => {
  expect(workflow.jobs["deploy-project"].env.HEROKU_APP).toBe("my-heroku-app");
});
