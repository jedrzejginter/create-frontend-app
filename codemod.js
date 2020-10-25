const fs = require("fs");
const recast = require("recast");
const babelParser = require("@babel/parser");

const recastOptions = {
  parser: {
    parse: (code) => babelParser.parse(code, {
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
};

module.exports = (options) => {
  const code = fs.readFileSync(options.source, 'utf-8');
  const ast = recast.parse(code, recastOptions);

  recast.visit(ast, options.visitor);

  const printResult = recast.print(ast);
  const output = printResult.code;

  fs.writeFileSync(options.target || options.source, output, 'utf-8');
}
