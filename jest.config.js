/** @type {import("jest").Config} */
const config = {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest", { tsconfig: { module: "commonjs" } }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
module.exports = config;
