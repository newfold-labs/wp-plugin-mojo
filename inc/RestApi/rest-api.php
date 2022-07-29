<?php
/**
 * This file sets up custom api controllers for the plugin.
 *
 * @package WPPluginMojo
 */

namespace Mojo;

/**
 * Instantiate controllers and register routes.
 */
function init_rest_api() {

	$controllers = array(
		'MOJO\\RestApi\\CachingController',
		'MOJO\\RestApi\\SettingsController',
	);

	foreach ( $controllers as $controller ) {
		/**
		 * Get an instance of the WP_REST_Controller.
		 *
		 * @var $instance WP_REST_Controller
		 */
		$instance = new $controller();
		$instance->register_routes();
	}
}

add_action( 'rest_api_init', __NAMESPACE__ . '\\init_rest_api' );
