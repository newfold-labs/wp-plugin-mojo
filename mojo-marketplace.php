<?php
/**
 * MOJO WordPress Plugin
 *
 * @package           WPPluginMojo
 * @author            Newfold Digital
 * @copyright         Copyright 2023 by Newfold Digital - All rights reserved.
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       The MOJO Plugin
 * Plugin URI:        https://mojomarketplace.com
 * Update URI:        https://github.com/newfold-labs/wp-plugin-mojo/
 * Description:       WordPress plugin that integrates a WordPress site with Hosting.
 * Version:           3.1.0
 * Tested up to:      6.4.1
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Author:            Bluehost
 * Author URI:        https://bluehost.com
 * Text Domain:       wp-plugin-mojo
 * Domain Path:       /languages
 * License:           GPL 2.0 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

// Do not allow multiple copies of the MOJO Plugin to be active
if ( defined( 'MOJO_PLUGIN_VERSION' ) ) {
	exit;
}

// Define constants
define( 'MOJO_PLUGIN_VERSION', '3.1.0' );
require_once __DIR__ . 'wp-plugin-mojo.php';