import baseConfig from "./vitest.config";

const unitConfig = {
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["src/**/*.unit.test.ts"],
  },
};

export default unitConfig;
