module.exports = {
  verbose: true,
  onlyChanged: true,
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'lcov'],
  setupTestFrameworkScriptFile: '<rootDir>/app/components/__tests__/setupTests.js',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverageFrom: ['app/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', 'setupTests.js'],
};
