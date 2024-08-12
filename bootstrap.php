<?php
/**
 * Plugin bootstrap file
 *
 * @package WPPluginMojo
 */

namespace Mojo;

use WP_Forge\WPUpdateHandler\PluginUpdater;
use WP_Forge\UpgradeHandler\UpgradeHandler;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\ModuleLoader\Plugin;
use NewfoldLabs\WP\Module\Features\Features;

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
		function () {
			return new Plugin(
				array(
					'id'           => 'mojo',
					'file'         => MOJO_PLUGIN_FILE,
					'brand'        => get_option( 'mm_brand', 'mojo' ),
					'install_date' => get_option( 'mojo_plugin_install_date' ),
				)
			);
		}
	)
);

// Set marketplace brand from mm_brand
$marketplace_brand = strtolower( get_option( 'mm_brand', 'mojo' ) );
if ( false !== strpos( $marketplace_brand, 'bluehost' ) ) {
	// simplify bluehost brand for marketplace
	$marketplace_brand = 'bluehost';
} elseif ( false !== strpos( $marketplace_brand, 'hostgator' ) ) {
	// simplify hostgator brand for marketplace
	$marketplace_brand = 'hostgator';
} else {
	// if not set, make it mojo
	$marketplace_brand = 'mojo';
}
$mojo_module_container->set( 'marketplace_brand', $marketplace_brand );

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
$mojo_update_url     = 'https://hiive.cloud/workers/release-api/plugins/newfold-labs/wp-plugin-mojo?slug=mojo-marketplace-wp-plugin&file=mojo-marketplace.php '; // Custom API GET endpoint
$mojo_plugin_updater = new PluginUpdater( MOJO_PLUGIN_FILE, $mojo_update_url );
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

// Handle any upgrade routines (only in the admin)
if ( is_admin() ) {

	// Handle plugin upgrades
	$upgrade_handler = new UpgradeHandler(
		MOJO_PLUGIN_DIR . '/inc/upgrades',
		get_option( 'mojo_plugin_version', '2.0.0' ),
		MOJO_PLUGIN_VERSION
	);

	// Returns true if the old version doesn't match the new version
	$did_upgrade = $upgrade_handler->maybe_upgrade();

	if ( $did_upgrade ) {
		// If an upgrade occurred, update the new version in the database to prevent running the routine(s) again.
		update_option( 'mojo_plugin_version', MOJO_PLUGIN_VERSION, true );
	}
}

// Required files
require MOJO_PLUGIN_DIR . '/inc/Admin.php';
require MOJO_PLUGIN_DIR . '/inc/AdminBar.php';
require MOJO_PLUGIN_DIR . '/inc/base.php';
require MOJO_PLUGIN_DIR . '/inc/jetpack.php';
require MOJO_PLUGIN_DIR . '/inc/partners.php';
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

// Instantiate the Features singleton
Features::getInstance();

/**
 * Filter to add applicable BN code to paypal requests
 *
 * https://github.com/newfold-labs/wp-module-ecommerce/blob/trunk/bootstrap.php#L62-L101
 */
if ( function_exists( 'add_filter' ) ) {
	add_filter(
		'http_request_args',
		function ( $parsed_args, $url ) {

			// Bail early if the request is not to PayPal's v2 checkout API
			if ( false === stripos( wp_parse_url( $url, PHP_URL_HOST ), 'paypal.com' ) ) {
				return $parsed_args;
			}

			// Check for an existing bn_code
			$bn_code = isset( $parsed_args['headers']['PayPal-Partner-Attribution-Id'] ) ? $parsed_args['headers']['PayPal-Partner-Attribution-Id'] : null;

			// Ensure we only set when blank, or when using one of our stale codes
			if ( is_null( $bn_code ) || false !== stripos( $bn_code, 'yith' ) || false !== stripos( $bn_code, 'newfold' ) ) {
				// The correct code is case-sensitive. YITH brand is uppercase, but the code is not.
				$parsed_args['headers']['PayPal-Partner-Attribution-Id'] = 'Yith_PCP';
			}

			return $parsed_args;
		},
		10,
		2
	);

	add_filter(
		'script_loader_tag',
		function ( $tag, $handle, $source ) {
			if ( stripos( $source, 'paypal.com/sdk' ) !== false ) {
				$replacement = ' data-partner-attribution-id="Yith_PCP"';
				if ( stripos( $tag, 'partner-attribution-id' ) === false ) {
					$tag = str_replace( ' src=', $replacement . ' src=', $tag );
				} elseif ( stripos( $tag, 'NEWFOLD' ) || stripos( $tag, 'YITH' ) ) {
					$tag = preg_replace( '/ data-partner-attribution-id="(.*?)"/', $replacement, $tag );
				}
			}
			return $tag;
		},
		25,
		3
	);
}
