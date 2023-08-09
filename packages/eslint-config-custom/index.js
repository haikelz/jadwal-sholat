module.exports = {
  extends: ["next", "turbo", "next/core-web-vitals", "prettier", "plugin:jsx-a11y/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  plugins: ["jsx-a11y"],
};
