const { ESLINT_MODES } = require("@craco/craco");
var path = require("path");

module.exports = {
  plugins: [{ plugin: require("@semantic-ui-react/craco-less") }],
  eslint: {
    enable: true /* (default value) */,
    useEslintrc: true,
    mode: ESLINT_MODES.file,
  },
  webpack: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      '@authentication': path.resolve(__dirname, 'src/authentication/'),
      '@history': path.resolve(__dirname, 'src/history/'),
    },
  },
};
