/* eslint @typescript-eslint/no-var-requires: "off" */
const config = require('./jest.config')

module.exports = {
  ...config,
  roots: ['<rootDir>/__tests__'],
}
