const fs = require("fs");
const path = require("path");
const recast = require("recast");

const code = fs.readFileSync(process.argv[2], "utf-8");

const ast = recast.parse(code, {
  parser: {
    parse: (code) => require("@babel/parser").parse(code, {
      sourceType: "module",
      strictMode: false,
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      startLine: 1,
      tokens: true,
      retainLines: true,
      plugins: [
        "asyncGenerators",
        "bigInt",
        "classPrivateMethods",
        "classPrivateProperties",
        "classProperties",
        "decorators-legacy",
        "doExpressions",
        "dynamicImport",
        "exportDefaultFrom",
        "exportExtensions",
        "exportNamespaceFrom",
        "functionBind",
        "functionSent",
        "importMeta",
        "nullishCoalescingOperator",
        "numericSeparator",
        "objectRestSpread",
        "optionalCatchBinding",
        "optionalChaining",
        ["pipelineOperator", { proposal: "minimal" }],
        "throwExpressions",

        "jsx",
        "typescript",
      ]
    })
  }
});

recast.visit(ast, require('./visitor'));

const printResult = recast.print(ast);
const output = printResult.code;

fs.mkdirSync(path.dirname(process.argv[3] || process.argv[2]), { recursive: true });
fs.writeFileSync(process.argv[3] || process.argv[2], output, "utf-8");
