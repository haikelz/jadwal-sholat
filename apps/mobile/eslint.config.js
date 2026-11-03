// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", ".expo/*"],
  },
  {
    // TypeScript already checks namespace members; this rule misreads
    // expo-notifications' re-exported enums.
    rules: { "import/namespace": "off" },
  },
]);
