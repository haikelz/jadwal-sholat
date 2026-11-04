// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", ".expo/*"],
  },
  {
    rules: {
      // TypeScript already checks namespace members; this rule misreads
      // expo-notifications' re-exported enums.
      "import/namespace": "off",
      // Metro doesn't tree-shake, so the package index bundles every icon
      // (about 3.9 MB of source). Type imports are erased and stay allowed.
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lucide-react-native",
              message: 'Import each icon from "lucide-react-native/icons/<name>".',
              allowTypeImports: true,
            },
          ],
        },
      ],
    },
  },
]);
