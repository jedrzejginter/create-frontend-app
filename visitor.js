const t = require('@babel/types')

const replacements = require("./config.json");

module.exports = {
  visitCallExpression(path) {
    const callee = path.node.callee;

    if (callee.name !== '__') {
      return false
    }

    const arg0 = path.node.arguments[0];

    if (arg0.value in replacements) {
      const replaceValue = replacements[arg0.value];
      let replacement;

      if (typeof replaceValue === 'boolean') {
        replacement = t.booleanLiteral(replaceValue);
      } else if (typeof replaceValue === 'number') {
        replacement = t.numericLiteral(replaceValue);
      } else if (typeof replaceValue === 'string') {
        replacement = t.stringLiteral(replaceValue);
      }

      if (replacement) {
        path.replace(replacement)
      }
    }

    return false
  },
}
