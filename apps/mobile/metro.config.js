const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Metro watches the whole monorepo. Skip the web's build output and tool
// caches so the file map stays small (the laptop is memory constrained).
const root = path.resolve(__dirname, "../..");
const escape = (value) => value.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&");
const ignored = [
  "apps/web/dist",
  "apps/web/.astro",
  "apps/web/cypress",
  "apps/web/public",
  ".moon/cache",
  "graft",
].map((dir) => new RegExp(`^${escape(path.join(root, dir))}(/.*)?$`));
config.resolver.blockList = [
  ...[].concat(config.resolver.blockList ?? []),
  ...ignored,
];

module.exports = withNativeWind(config, {
  input: "./src/global.css",
  inlineRem: 16,
});
