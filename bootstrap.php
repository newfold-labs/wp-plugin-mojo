<?php
/**
 * Plugin bootstrap file
 *
 * @package WPPluginMojo
 */

namespace Mojo;

use Mojo\UpgradeHandler;
use WP_Forge\WPUpdateHandler\PluginUpdater;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\ModuleLoader\Plugin;
use function NewfoldLabs\WP\ModuleLoader\container as setContainer;

// Composer autoloader
if ( is_readable( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
} else {
	if ( 'local' === wp_get_environment_type() ) {
		wp_die( esc_html( __( 'Please install the Mojo Plugin dependencies.', 'wp-plugin-mojo' ) ) );
	}
	return;
}

/*
 * Initialize coming soon module via container
 */
$mojo_module_container = new Container(
	array(
		'cache_types' => array( 'browser', 'file', 'skip404' ),
	)
);

// Set plugin to container
$mojo_module_container->set(
	'plugin',
	$mojo_module_container->service(
		function() {
			return new Plugin(
				array(
					'id'   => 'mojo',
					'file' => MOJO_PLUGIN_FILE,
				)
			);
		}
	)
);

// Set marketplace brand from mm_brand and hg_region values in container
if ( get_option( 'mm_brand', false ) ) {
	$mojo_module_container->set(
		'marketplace_brand',
		strtolower( get_option( 'mm_brand', false ) )
	);
}

// Set coming soon values
$mojo_module_container->set(
	'comingsoon',
	array(
		'admin_app_url'       => admin_url( 'admin.php?page=mojo#/home' ),
		'template_h1'         => __( 'Coming Soon!', 'wp-plugin-mojo' ),
		'template_h2'         => __( 'A New WordPress Site', 'wp-plugin-mojo' ),
		'template_footer_t'   => sprintf(
			/* translators: %1$s is replaced with opening link tag taking you to mojomarketplace.com/wordpress, %2$s is replaced with closing link tag, %3$s is replaced with opening link tag taking you to login page, %4$s is replaced with closing link tag, %5$s is replaced with opening link tag taking you to my.mojomarketplace.com, %6$s is replaced with closing link tag */
			esc_html__( 'Is this your website? Log in to %3$sWordPress%4$s or %5$sMOJO%6$s.', 'wp-plugin-mojo' ) . '&nbsp;',
			'<a href="' . esc_url( 'https://www.mojomarketplace.com/websites/wordpress' ) . '" target="_blank" rel="noopener noreferrer nofollow">',
			'</a>',
			'<a href="' . esc_url( wp_login_url() ) . '">',
			'</a>',
			'<a href="' . esc_url( 'https://www.mojomarketplace.com/login' ) . '" target="_blank" rel="noopener noreferrer nofollow">',
			'</a>'
		),
		'template_page_title' => sprintf(
			/* translators: %s: Blog name */
			__( '%s &mdash; Coming Soon', 'wp-plugin-mojo' ),
			esc_html( get_option( 'blogname' ) )
		),
		'admin_bar_text'      => '<div style="background-color: #FEC101; color: #000; padding: 0 1rem;">' . __( 'Coming Soon Active', 'wp-plugin-mojo' ) . '</div>',
		'admin_notice_text'   => sprintf(
			/* translators: %1$s is replaced with the opening link tag to preview the page, and %2$s is replaced with the closing link tag, %3$s is the opening link tag, %4$s is the closing link tag. */
			__( 'Your site is currently displaying a %1$scoming soon page%2$s. Once you are ready, %3$slaunch your site%4$s.', 'wp-plugin-mojo' ),
			'<a href="' . get_home_url() . '?preview=coming_soon" title="' . __( 'Preview the coming soon landing page', 'wp-plugin-mojo' ) . '">',
			'</a>',
			'<a href="' . esc_url( admin_url( 'admin.php?page=mojo#/home' ) ) . '">',
			'</a>'
		),
		'template_styles'     => esc_url( MOJO_PLUGIN_URL . 'assets/styles/coming-soon.css' ),
	)
);
setContainer( $mojo_module_container );

// Set up the updater endpoint and map values
$updateurl     = 'https://hiive.cloud/workers/release-api/plugins/newfold-labs/wp-plugin-mojo'; // Custom API GET endpoint
$mojo_plugin_updater = new PluginUpdater( MOJO_PLUGIN_FILE, $updateurl );
$mojo_plugin_updater->setDataMap(
	array(
		'version'       => 'version.latest',
		'download_link' => 'download',
		'last_updated'  => 'updated',
		'requires'      => 'requires.wp',
		'requires_php'  => 'requires.php',
		'tested'        => 'tested.wp',
	)
);

// Handle any upgrade routines
if ( is_admin() ) {

	// Handle plugin upgrades
	require MOJO_PLUGIN_DIR . '/inc/UpgradeHandler.php';
	$upgrade_handler = new UpgradeHandler(
		MOJO_PLUGIN_DIR . '/inc/upgrades',
		get_option( 'mojo_plugin_version', '2.0.0' ),
		MOJO_PLUGIN_VERSION
	);

	$did_upgrade = $upgrade_handler->maybe_upgrade();
	if ( $did_upgrade ) {
		update_option( 'mojo_plugin_version', MOJO_PLUGIN_VERSION, true );
	}
}

// Required files
require MOJO_PLUGIN_DIR . '/inc/Admin.php';
require MOJO_PLUGIN_DIR . '/inc/AdminBar.php';
require MOJO_PLUGIN_DIR . '/inc/base.php';
require MOJO_PLUGIN_DIR . '/inc/jetpack.php';
require MOJO_PLUGIN_DIR . '/inc/partners.php';
require MOJO_PLUGIN_DIR . '/inc/performance.php';
require MOJO_PLUGIN_DIR . '/inc/RestApi/CachingController.php';
require MOJO_PLUGIN_DIR . '/inc/RestApi/SettingsController.php';
require MOJO_PLUGIN_DIR . '/inc/RestApi/rest-api.php';
require MOJO_PLUGIN_DIR . '/inc/settings.php';
require MOJO_PLUGIN_DIR . '/inc/updates.php';
require MOJO_PLUGIN_DIR . '/inc/plugin-nfd-upgrade.php';

NFD_Plugin_Upgrade::return_instance();

/* WordPress Admin Page & Features */
if ( is_admin() ) {
	new Admin();
}

AdminBar::init();
