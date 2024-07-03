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
	 * Data loaded onto window.NewfoldRuntime
	 *
	 * @return array
	 */
	public static function runtime() {
		global $mojo_module_container;

		$runtime = array(
			'plugin' => array(
				'url'     => MOJO_BUILD_URL,
				'version' => MOJO_PLUGIN_VERSION,
				'assets'  => MOJO_PLUGIN_URL . 'assets/',
				'brand'   => $mojo_module_container->plugin()->brand,
			),
		);
		return $runtime;
	}
}
