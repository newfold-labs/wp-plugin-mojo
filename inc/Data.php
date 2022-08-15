<?php
/**
 * All data retrieval and saving happens from this file.
 *
 * @package WPPluginMojo
 */

namespace Mojo;

/**
 * \MOJO\Data
 * This class does not have a constructor to get instantiated, just static methods.
 */
final class Data {

	/**
	 * Data loaded onto window.WPPM
	 *
	 * @return array
	 */
	public static function runtime() {
		global $wp_version;

		$runtime = array(
			'url'       => MOJO_BUILD_URL,
			'version'   => MOJO_PLUGIN_VERSION,
			'resturl'   => \get_home_url() . '/index.php?rest_route=',
			'wpversion' => $wp_version,
			'admin'     => \admin_url(),
			'assets'    => MOJO_PLUGIN_URL . 'assets/',
			'brand'     => strtolower( get_option( 'mm_brand', false ) ),
		);

		return $runtime;
	}

}
