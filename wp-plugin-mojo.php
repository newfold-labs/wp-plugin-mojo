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
 * Description:       WordPress plugin that integrates a WordPress site with Hosting.
 * Version:           2.0.8
 * Tested up to:      6.3
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Author:            Bluehost
 * Author URI:        https://bluehost.com
 * Text Domain:       wp-plugin-mojo
 * Domain Path:       /languages
 * License:           GPL 2.0 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

namespace Mojo;

// Do not allow multiple copies of the MOJO Plugin to be active
if ( defined( 'MOJO_PLUGIN_VERSION' ) ) {
	exit;
}

// Define constants
define( 'MOJO_PLUGIN_VERSION', '2.0.8' );
define( 'MOJO_PLUGIN_FILE', __FILE__ );
define( 'MOJO_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'MOJO_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
if ( ! defined( 'NFD_HIIVE_URL' ) ) {
	define( 'NFD_HIIVE_URL', 'https://hiive.cloud/api' );
}

define( 'MOJO_BUILD_DIR', MOJO_PLUGIN_DIR . 'build/' . MOJO_PLUGIN_VERSION );
define( 'MOJO_BUILD_URL', MOJO_PLUGIN_URL . 'build/' . MOJO_PLUGIN_VERSION );

global $pagenow;
if ( 'plugins.php' === $pagenow ) {

	require MOJO_PLUGIN_DIR . '/inc/plugin-php-compat-check.php';

	$plugin_check = new Plugin_PHP_Compat_Check( __FILE__ );

	$plugin_check->min_php_version = '5.3';
	$plugin_check->min_wp_version  = '4.7';

	$plugin_check->check_plugin_requirements();
}

// Check NFD plugin incompaatibilities
require_once MOJO_PLUGIN_DIR . '/inc/plugin-nfd-compat-check.php';
$nfd_plugins_check = new NFD_Plugin_Compat_Check( MOJO_PLUGIN_FILE );
// Defer to Incompatible plugin, self-deactivate
$nfd_plugins_check->incompatible_plugins = array(
	'The Bluehost Plugin'  => 'bluehost-wordpress-plugin/bluehost-wordpress-plugin.php',
	'The HostGator Plugin' => 'wp-plugin-hostgator/wp-plugin-hostgator.php',
	'The Web.com Plugin'   => 'wp-plugin-web/wp-plugin-web.php',
);
// Deactivate legacy plugin
$nfd_plugins_check->legacy_plugins = array(
	'The MOJO Marketplace' => 'mojo-marketplace-wp-plugin/mojo-marketplace.php', // old mojo
);
$pass_nfd_check = $nfd_plugins_check->check_plugin_requirements();

// Check PHP version before initializing to prevent errors if plugin is incompatible.
if ( $pass_nfd_check && version_compare( PHP_VERSION, '5.3', '>=' ) ) {
	require dirname( __FILE__ ) . '/bootstrap.php';
}
