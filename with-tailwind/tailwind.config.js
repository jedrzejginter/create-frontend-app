const theme = require("tailwindcss/defaultTheme");

function createIncrement(initialValue = 1) {
  let value = initialValue;

  return function increment() {
    value += 1;
    return value;
  };
}

const zIndex = createIncrement();

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: [
    'pages/**/*.ts',
    'pages/**/*.tsx',
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
  theme: {
    colors: {
      black: "#000",
      transparent: "transparent",
      white: "#fff",
    },
    fontFamily: {
      sans: [...theme.fontFamily.sans],
    },
    zIndex: {
      base: zIndex(),
    },
    extend: {
      borderWidth: {
        px: "1px",
      },
    },
  },
  variants: {},
  plugins: [],
};
