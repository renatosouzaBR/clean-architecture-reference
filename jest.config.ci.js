/* eslint @typescript-eslint/no-var-requires: "off" */
const config = require('./jest.config')

module.exports = {
  ...config,
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  coverageThreshold: {
    global: {
      branches: 100,
    },
  },
}
