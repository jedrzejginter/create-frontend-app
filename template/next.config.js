const envalid = require("envalid");

const env = envalid.cleanEnv(process.env, {
  API_URL: envalid.url(),
});

// Filter env variables for Next config.
// https://github.com/zeit/next.js/blob/master/errors/env-key-not-allowed.md
function filterEnvForNextjs(allEnv) {
  const cleanEnv = {};

  for (const envName in allEnv) {
    if (!/^(__|NODE_)/.test(envName)) {
      cleanEnv[envName] = allEnv[envName];
    }
  }

  return cleanEnv;
}

module.exports = {
  env: filterEnvForNextjs(env),
  poweredByHeader: false,

  // React's Strict Mode is a development mode only feature for highlighting potential problems
  // in an application. It helps to identify unsafe lifecycles, legacy API usage, and a number
  // of other features.
  reactStrictMode: true,
};
