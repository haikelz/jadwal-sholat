// nativewind/babel adds three plugins: the JSX transform and the worklets
// plugin by bare name, plus NativeWind's createElement rewrite. Bun's
// isolated install doesn't put those bare names where Babel looks on EAS, and
// babel-preset-expo already adds the first two, so only the rewrite is
// loaded here, by absolute require.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: [require("react-native-css-interop/dist/babel-plugin").default],
  };
};
