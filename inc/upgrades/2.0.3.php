<?php
/**
 * Handle updates for version 2.0.3
 *
 * @package WPPluginMojo
 */

// Clear newfold_marketplace transient with update in wp-module-marketplace@1.4.0
if ( get_transient( 'newfold_marketplace' ) ) {
	delete_transient( 'newfold_marketplace' );
}
