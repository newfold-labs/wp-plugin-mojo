<?php
/**
 * Handle updates for version 3.3.1
 *
 * AUTO_INCREMENT fix for the options table.
 *
 * @package WPPluginMojo
 */

use Mojo\AutoIncrement;

require_once __DIR__ . '/../AutoIncrement.php';

global $wpdb;

( new AutoIncrement( $wpdb ) )
	->fix_auto_increment( 'options', 'option_id' );
