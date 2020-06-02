module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom-global',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  testURL: 'http://localhost',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
  ],
  verbose: true,
}
