// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    video: false,
    specPattern: 'cypress/e2e',
    supportFile: 'cypress/support/index.ts',
    baseUrl: 'http://localhost:3000',
  },
})
