module.exports = (api) => {
  const presets = ["next/babel"];
  const plugins = ["inline-react-svg"];

  if (api.env("production") && !api.env("test")) {
    plugins.push("jsx-remove-data-test-id");
  }

  return { presets, plugins };
};
