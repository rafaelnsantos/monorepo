/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = (customConfig) => ({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },

  ...customConfig,
});

module.exports = customJestConfig;
