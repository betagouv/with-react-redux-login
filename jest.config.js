module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  'testURL': 'http://localhost',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'
  ],
  verbose: true
}
