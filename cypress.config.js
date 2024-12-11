const { defineConfig } = require('cypress')
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
    pluginSlug: 'mojo',
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

        // Tests requires Woo, so exclude if not supported due to WP or PHP versions
        if ( ! supportsWoo( config.env ) ) {
            config.excludeSpecPattern = config.excludeSpecPattern.concat( [
                'vendor/newfold-labs/wp-module-coming-soon/tests/cypress/integration/coming-soon-woo.cy.js',
            ] );
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
        'vendor/newfold-labs/wp-module-coming-soon/tests/cypress/integration/coming-soon.cy.js', // excluding until either adding ecommerce module or removing coming soon components in ecommerce module
        'vendor/newfold-labs/wp-module-deactivation/tests/cypress/integration/deactivation-survey.cy.js' // excluding due to the mismatched slug name
    ],
    experimentalRunAllSpecs: true,
  },
  retries: 1,
  experimentalMemoryManagement: true,
})

// Check against plugin support at https://wordpress.org/plugins/woocommerce/
const supportsWoo = ( env ) => {
	const semver = require( 'semver' );
	if (
		semver.satisfies( env.wpSemverVersion, '>=6.5.0' ) &&
		semver.satisfies( env.phpSemverVersion, '>=7.4.0' )
	) {
		return true;
	}
	return false;
};