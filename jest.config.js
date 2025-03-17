const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // nextコンフィグへのパス
  dir: "./",
});

// Jestに渡すカスタム設定
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // エイリアスの設定
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
