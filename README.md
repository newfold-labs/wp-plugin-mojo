<a href="https://mojo.com/" target="_blank">
    <img src="https://raw.githubusercontent.com/newfold-labs/wp-plugin-mojo/main/assets/images/New-Logo-Black.png" alt="mojo.com Logo" title="mojo.com" align="right" height="85" width="630" />
</a>

# Mojo WordPress Plugin

[![Version Number](https://img.shields.io/github/v/release/newfold-labs/wp-plugin-mojo?color=21a0ed&labelColor=333333)](https://github.com/newfold-labs/wp-plugin-mojo/releases)
[![Lint PHP](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/lint-php.yml/badge.svg?branch=main)](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/lint-php.yml)
[![Lint YML](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/lint-yml.yml/badge.svg)](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/lint-yml.yml)
[![WP Internationalization](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/wp-i18n.yml/badge.svg)](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/wp-i18n.yml)
[![Cypress](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/cypress.yml/badge.svg?branch=main)](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/cypress.yml)
[![Build Plugin](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/upload-artifact-on-push.yml/badge.svg)](https://github.com/newfold-labs/wp-plugin-mojo/actions/workflows/upload-artifact-on-push.yml)

WordPress plugin that integrates a WordPress site with Hosting.

# Installation

Find the `wp-plugin-mojo.zip` asset for your preferred version at: https://github.com/newfold-labs/wp-plugin-mojo/releases/.

Alternatively, check the updater endpoint for the latest version at: https://hiive.cloud/workers/release-api/plugins/newfold-labs/wp-plugin-mojo, this also includes a download link to the latest zip file or use this link to access the latest download: https://hiive.cloud/workers/release-api/plugins/newfold-labs/wp-plugin-mojo/download/.

# Releasing Updates

This plugin has version number set in 3 distinct places in 2 files:

- the plugin header info (wp-plugin-mojo/wp-plugin-mojo.php line 14) - this is used in the plugin php code.
- the constant MOJO_PLUGIN_VERSION (wp-plugin-mojo/wp-plugin-mojo.php line 34) - this is used by
  WordPress.
- in the package.json version value (wp-plugin-mojo/package.json line 5) this is used by the build step to place
  the release files within a matching version directory for convenient cache busting. All 3 instances need to be
  incremented in conjuction with new releases via github tagging.
  (In a perfect world, we have a runner increment and/or validate this)

# Style Guide
For color pallet and typography usage: https://www.figma.com/file/HlR2CaEJpAn5wNexp4Xf3K/WP-Plugin-Mojo?node-id=0%3A1&t=crLTyppTYg7sraei-1
