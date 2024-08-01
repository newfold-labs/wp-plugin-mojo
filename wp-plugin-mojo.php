<?php
/**
 * see legacy root file at mojo-marketplace.php
 */

namespace Mojo;

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

	$plugin_check->min_php_version = '7.1';
	$plugin_check->min_wp_version  = '6.0';

	$plugin_check->check_plugin_requirements();
}

// Check NFD plugin incompaatibilities
require_once MOJO_PLUGIN_DIR . '/inc/plugin-nfd-compat-check.php';
$nfd_plugins_check = new NFD_Plugin_Compat_Check( MOJO_PLUGIN_FILE );
// Defer to Incompatible plugin, self-deactivate
$nfd_plugins_check->incompatible_plugins = array(
	'The Bluehost Plugin'      => 'bluehost-wordpress-plugin/bluehost-wordpress-plugin.php',
	'The HostGator Plugin'     => 'wp-plugin-hostgator/wp-plugin-hostgator.php',
	'The Web.com Plugin'       => 'wp-plugin-web/wp-plugin-web.php',
	'The Crazy Domains Plugin' => 'wp-plugin-crazy-domains/wp-plugin-crazy-domains.php',
);
// Deactivate legacy plugin
$nfd_plugins_check->legacy_plugins = array(
	'The MOJO Marketplace' => 'mojo-marketplace-wp-plugin/mojo-marketplace.php', // old mojo
);
$pass_nfd_check                    = $nfd_plugins_check->check_plugin_requirements();

// Check PHP version before initializing to prevent errors if plugin is incompatible.
if ( $pass_nfd_check && version_compare( PHP_VERSION, '5.3', '>=' ) ) {
	require __DIR__ . '/bootstrap.php';
}
