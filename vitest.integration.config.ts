import baseConfig from "./vitest.config";

const integrationConfig = {
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["src/**/*.integration.test.ts"],
  },
};

export default integrationConfig;
