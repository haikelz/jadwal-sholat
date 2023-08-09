const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./src/",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",

  // absolute import
  moduleNameMapper: {
    "^~components/(.*)$": "src/components/$1",
    "^~pages/(.*)$": "src/pages/$1",
    "^~lib/(.*)$": "src/lib/$1",
    "^~hooks$": "src/hooks",
    "^~store$": "src/store",
  },
};

module.exports = createJestConfig(customJestConfig);
