<?php
/**
 * Register AdminBar help button.
 *
 * @package WPPluginWeb
 */

namespace Web;

/**
 * \Web\AdminBar
 */
class AdminBar {

	/**
	 * Initialize WP admin bar customizations.
	 */
	public static function init() {
		add_action( 'wp_before_admin_bar_render', array( __CLASS__, 'on_before_admin_bar_render' ) );
	}

	/**
	 * Customize the WP admin bar.
	 */
	public static function on_before_admin_bar_render() {
		/**
		 * Reference to the global WordPress admin bar instance.
		 *
		 * @var \WP_Admin_Bar
		 */
		global $wp_admin_bar;
		$wp_admin_bar->add_menu(
			array(
				'id'    => 'web-support',
				'title' => __( 'Need help?', 'wp-plugin-web' ),
				'href'  => admin_url( 'admin.php?page=web#/help' ),
				'meta'  => array(
					'title' => esc_attr__( 'We\'re here for you!', 'wp-plugin-web' ),
				),
			)
		);
	}

}
