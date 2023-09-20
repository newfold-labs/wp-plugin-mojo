const { defineConfig } = require('cypress')
const cypressReplay = require("@replayio/cypress")
const {phpVersion, core} = require('./.wp-env.json')
const wpVersion = /[^/]*$/.exec(core)[0]

module.exports = defineConfig({
  projectId: "c5q4rq",
  env: {
    wpUsername: 'admin',
    wpPassword: 'password',
    wpVersion,
    phpVersion,
    pluginId: 'mojo',
    appId: 'wppm',
  },
  downloadsFolder: 'tests/cypress/downloads',
  fixturesFolder: 'tests/cypress/fixtures',
  screenshotsFolder: 'tests/cypress/screenshots',
  video: true,
  videosFolder: 'tests/cypress/videos',
  chromeWebSecurity: false,
  viewportWidth: 1024,
  viewportHeight: 768,
  blockHosts: [
      '*doubleclick.net',
      '*jnn-pa.googleapis.com',
      '*youtube.com',
  ],
  e2e: {
      setupNodeEvents(on, config) {

        const semver = require('semver');

        // Setup Replay
        cypressReplay.default(on, config);

        // Ensure that the base URL is always properly set.
        if (config.env && config.env.baseUrl) {
            config.baseUrl = config.env.baseUrl;
        }

        // Ensure that we have a semantically correct WordPress version number for comparisons.
        if (config.env.wpVersion) {
            if (config.env.wpVersion.split('.').length !== 3) {
                config.env.wpSemverVersion = `${config.env.wpVersion}.0`;
            } else {
                config.env.wpSemverVersion = config.env.wpVersion;
            }
        }

        if (config.env.phpVersion) {
            if (config.env.phpVersion.split('.').length !== 3) {
                config.env.phpSemverVersion = `${config.env.phpVersion}.0`;
            } else {
                config.env.phpSemverVersion = config.env.phpVersion;
            }
        }

        on('task', {
            log(message) {
                console.log(message)

                return null
            },
            table(message) {
                console.table(message)

                return null
            }
        })

        return config;
    },
    baseUrl: 'http://localhost:8880',
    specPattern: [
      'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
      'vendor/newfold-labs/**/tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    ],
    supportFile: 'tests/cypress/support/index.js',
    testIsolation: false,
		excludeSpecPattern: [
      'vendor/newfold-labs/wp-module-coming-soon/tests/cypress/integration/', // until ecommerce module is added use the local coming soon test instead
      'vendor/newfold-labs/wp-module-marketplace/tests/cypress/integration/', // until ui is updated use local marketplace tests instead
    ],
  },
  retries: 1,
})
