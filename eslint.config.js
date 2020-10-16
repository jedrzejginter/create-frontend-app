const [OFF, , ERROR] = [0, 1, 2];

module.exports = {
  extends: ["airbnb/base", "prettier", "plugin:prettier/recommended"],
  plugins: ["jest"],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "consistent-return": OFF,
    "default-case": OFF,
    "no-nested-ternary": OFF,
    "no-param-reassign": OFF,
    "no-restricted-globals": OFF,
    "no-restricted-syntax": OFF,
    "no-underscore-dangle": OFF,
    "prettier/prettier": ERROR,
  },
};
