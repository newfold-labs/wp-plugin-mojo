<?php
/**
 * Register Admin page and features.
 *
 * @package WPPluginMojo
 */

namespace Mojo;

use function NewfoldLabs\WP\Module\Features\isEnabled;

/**
 * \MOJO\Admin
 */
final class Admin {

	/**
	 * Register functionality using WordPress Actions.
	 */
	public function __construct() {
		/* Add Page to WordPress Admin Menu. */
		\add_action( 'admin_menu', array( __CLASS__, 'page' ) );
		/* Load Page Scripts & Styles. */
		\add_action( 'load-toplevel_page_mojo', array( __CLASS__, 'assets' ) );
		/* Add Links to WordPress Plugins list item. */
		\add_filter( 'plugin_action_links_mojo-marketplace-wp-plugin/mojo-marketplace.php', array( __CLASS__, 'actions' ) ); // for build
		\add_filter( 'plugin_action_links_wp-plugin-mojo/mojo-marketplace.php', array( __CLASS__, 'actions' ) ); // for local dev
		/* Add inline style to hide subnav link */
		\add_action( 'admin_head', array( __CLASS__, 'admin_nav_style' ) );
		/* Add runtime for data store */
		\add_filter( 'newfold_runtime', array( __CLASS__, 'add_to_runtime' ) );
		/* Add redirect from old url */
		\add_action( 'admin_menu', array( __CLASS__, 'old_admin_pages' ) );
		\add_action( 'admin_init', array( __CLASS__, 'old_admin_redirect' ) );

		if ( isset( $_GET['page'] ) && strpos( filter_input( INPUT_GET, 'page', FILTER_UNSAFE_RAW ), 'mojo' ) >= 0 ) { // phpcs:ignore
			\add_action( 'admin_footer_text', array( __CLASS__, 'add_brand_to_admin_footer' ) );
		}
	}
	/**
	 * Add to runtime
	 *
	 * @param array $sdk - runtime properties from module
	 *
	 * @return array
	 */
	public static function add_to_runtime( $sdk ) {
		include MOJO_PLUGIN_DIR . '/inc/Data.php';
		return array_merge( $sdk, Data::runtime() );
	}

	/**
	 * Subpages to register with add_submenu_page().
	 *
	 * Order or array items determines menu order.
	 *
	 * @return array
	 */
	public static function subpages() {
		$home        = array(
			'mojo#/home' => __( 'Home', 'wp-plugin-mojo' ),
		);
		$marketplace = array(
			'mojo#/marketplace' => __( 'Marketplace', 'wp-plugin-mojo' ),
		);
		// add performance if enabled
		$performance = isEnabled( 'performance' )
			? array(
				'mojo#/performance' => __( 'Performance', 'wp-plugin-mojo' ),
			)
			: array();
		$settings    = array(
			'mojo#/settings' => __( 'Settings', 'wp-plugin-mojo' ),
		);
		$help        = array(
			'mojo#/help' => __( 'Help', 'wp-plugin-mojo' ),
		);

		return array_merge(
			$home,
			$marketplace,
			$performance,
			$settings,
			$help
		);
	}

	/**
	 * Add inline script to admin screens
	 *  - hide extra link in subnav
	 */
	public static function admin_nav_style() {
		echo '<style>';
		echo 'li#toplevel_page_mojo a.toplevel_page_mojo div.wp-menu-image.svg { transition: fill 0.15s; background-size: 24px auto !important; }';
		echo 'ul#adminmenu a.toplevel_page_mojo.wp-has-current-submenu:after, ul#adminmenu>li#toplevel_page_mojo.current>a.current:after { border-right-color: #fff !important; }';
		echo 'li#toplevel_page_mojo > ul > li.wp-first-item { display: none !important; }';
		echo '#wp-toolbar #wp-admin-bar-mojo-coming_soon .ab-item { padding: 0; }';
		echo '</style>';
	}

	/**
	 * Add WordPress Page to Appearance submenu.
	 *
	 * @return void
	 */
	public static function page() {
		$icon_hash = get_transient( 'mm_icon_hash', false );
		if ( false === $icon_hash ) {
			$file = MOJO_PLUGIN_DIR . '/assets/svg/default-icon.svg';
			if ( file_exists( $file ) ) {
				$content   = file_get_contents( $file );
				$icon_hash = 'data:image/svg+xml;base64, ' . base64_encode( $content );
				set_transient( 'mm_icon_hash', $icon_hash, WEEK_IN_SECONDS );
			}
		}

		\add_menu_page(
			__( 'MOJO', 'wp-plugin-mojo' ),
			__( 'MOJO', 'wp-plugin-mojo' ),
			'manage_options',
			'mojo',
			array( __CLASS__, 'render' ),
			$icon_hash,
			0
		);

		// If we're outside of App, add subpages to App menu
		if ( false === ( isset( $_GET['page'] ) && strpos( filter_input( INPUT_GET, 'page', FILTER_UNSAFE_RAW ), 'mojo' ) >= 0 ) ) { // phpcs:ignore
			foreach ( self::subpages() as $route => $title ) {
				\add_submenu_page(
					'mojo',
					$title,
					$title,
					'manage_options',
					$route,
					array( __CLASS__, 'render' )
				);
			}
		}
	}

	/**
	 * Render DOM element for React to load onto.
	 *
	 * @return void
	 */
	public static function render() {
		global $wp_version;

		echo '<!-- MOJO -->' . PHP_EOL;

		if ( version_compare( $wp_version, '5.4', '>=' ) ) {
			echo '<div id="wppm-app" class="wppm wppm_app"></div>' . PHP_EOL;
		} else {
			// fallback messaging for WordPress older than 5.4
			echo '<div id="wppm-app" class="wppm wppm_app">' . PHP_EOL;
			echo '<header class="wppm-header" style="min-height: 90px; padding: 1rem; margin-bottom: 1.5rem;"><div class="wppm-header-inner"><div class="wppm-logo-wrap">' . PHP_EOL;
			echo '<img src="' . esc_url( MOJO_PLUGIN_URL . 'assets/svg/mojo-logo.svg' ) . '" alt="MOJO logo" />' . PHP_EOL;
			echo '</div></div></header>' . PHP_EOL;
			echo '<div class="wrap">' . PHP_EOL;
			echo '<div class="card" style="margin-left: 20px;"><h2 class="title">' . esc_html__( 'Please update to a newer WordPress version.', 'wp-plugin-mojo' ) . '</h2>' . PHP_EOL;
			echo '<p>' . esc_html__( 'There are new WordPress components which this plugin requires in order to render the interface.', 'wp-plugin-mojo' ) . '</p>' . PHP_EOL;
			echo '<p><a href="' . esc_url( admin_url( 'update-core.php' ) ) . '" class="button component-button is-primary button-primary" variant="primary">' . esc_html__( 'Please update now', 'wp-plugin-mojo' ) . '</a></p>' . PHP_EOL;
			echo '</div></div></div>' . PHP_EOL;
		}

		echo '<!-- /MOJO -->' . PHP_EOL;
	}

	/**
	 * Load Page Scripts & Styles.
	 *
	 * @return void
	 */
	public static function assets() {
		$asset_file = MOJO_BUILD_DIR . '/index.asset.php';

		if ( is_readable( $asset_file ) ) {
			$asset = include_once $asset_file;
		} else {
			return;
		}

		\wp_register_script(
			'mojo-script',
			MOJO_BUILD_URL . '/index.js',
			array_merge( $asset['dependencies'], array( 'newfold-features', 'nfd-runtime' ) ),
			$asset['version'],
			true
		);

		\wp_register_style(
			'mojo-style',
			MOJO_BUILD_URL . '/index.css',
			array( 'wp-components' ),
			$asset['version']
		);

		$screen = get_current_screen();
		if ( false !== strpos( $screen->id, 'mojo' ) ) {
			\wp_enqueue_script( 'mojo-script' );
			\wp_enqueue_style( 'mojo-style' );
		}
	}

	/**
	 * Add Links to WordPress Plugins list item for MOJO.
	 *
	 * @param  array $actions - array of action links for Plugin row item.
	 * @return array
	 */
	public static function actions( $actions ) {
		return array_merge(
			array(
				'overview' => '<a href="' . \admin_url( 'admin.php?page=mojo#/home' ) . '">' . __( 'Home', 'wp-plugin-mojo' ) . '</a>',
				'settings' => '<a href="' . \admin_url( 'admin.php?page=mojo#/settings' ) . '">' . __( 'Settings', 'wp-plugin-mojo' ) . '</a>',
			),
			$actions
		);
	}

	/**
	 * Filter WordPress Admin Footer Text "Thank you for creating with..."
	 *
	 * @param string $footer_text footer text
	 * @return string
	 */
	public static function add_brand_to_admin_footer( $footer_text ) {
		$footer_text = \sprintf( \__( 'Thank you for creating with <a href="https://wordpress.org/">WordPress</a> and <a href="https://mojomarketplace.com/about">MOJO</a>.', 'wp-plugin-mojo' ) );
		return $footer_text;
	}

	/**
	 * Old Mojo Url ids
	 *
	 * @return array
	 */
	public static function get_old_url_ids() {
		return array(
			'mojo-marketplace',
			'mojo-performance',
			'mojo-staging',
			'mojo-home',
			'mojo-hosting-panel',
			'mojo-jetpack-connect-bounce',
			'mojo-marketplace-page',
		);
	}

	/**
	 * Keep dummy links for old admin pages
	 * so we can redirect to the new page.
	 *
	 * @return void
	 */
	public static function old_admin_pages() {
		// Add old plugin pages (for redirecting)
		foreach ( self::get_old_url_ids() as $id ) {
			\add_submenu_page(
				'',
				__( 'MOJO', 'wp-plugin-mojo' ),
				__( 'MOJO', 'wp-plugin-mojo' ),
				'manage_options',
				$id,
				false,
				null
			);
		}
	}

	/**
	 * Redirect old admin page to new admin page,
	 * only applies on first nav click after update or a bookmark.
	 *
	 * @return void
	 */
	public static function old_admin_redirect() {
		global $pagenow;
		if ( 'admin.php' === $pagenow && in_array( $_GET['page'], self::get_old_url_ids() ) ) {
			wp_redirect( admin_url( 'admin.php?page=mojo' ) );
			exit;
		}
	}
} // END \MOJO\Admin
