<?php
/**
 * Class that updates to brand plugin.
 *
 * @package Mojo Marketplace
 */

/**
 * Class NFD_Plugin_Upgrade
 *
 * This class is responsible for upgrading from an old plugin.
 */
class NFD_Plugin_Upgrade {

	/**
	 * Class instance.
	 *
	 * @var stdClass
	 */
	protected static $instance;

	/**
	 * A reference to the main plugin file
	 *
	 * @var string
	 */
	private static $file = 'wp-plugin-mojo/wp-plugin-mojo.php';

	/**
	 * Plugin name
	 *
	 * @var string
	 */
	private static $name = 'Mojo';

	/**
	 * Valid string values for a context
	 *
	 * @var array
	 */
	private static $contexts = array( 'bluehost', 'hostgator' );

	/**
	 * Newfold Brand plugins
	 *
	 * @var array
	 */
	private static $nfd_plugins = array(
		'bluehost' => array( 
            'name' => 'Bluehost',
            'file' => 'bluehost-wordpress-plugin/bluehost-wordpress-plugin.php',
            'zip'  => 'https://hiive.cloud/workers/release-api/plugins/bluehost/bluehost-wordpress-plugin/download/',
        ),
        'hostgator' => array(
            'name' => 'HostGator',
            'file' => 'hostgator-wordpress-plugin/hostgator-wordpress-plugin.php',
            'zip'  => 'https://hiive.cloud/workers/release-api/plugins/newfold-labs/wp-plugin-hostgator/download/',

        )
	);

	/**
	 * Get class instance.
	 *
	 * @return \Newfold\Plugin\NFD_Plugin_Upgrade\Pages|stdClass
	 */
	public static function return_instance() {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof \NFD_Plugin_Upgrade ) ) {
			self::$instance = new \NFD_Plugin_Upgrade();
			self::$instance->primary_init();
		}

		return self::$instance;
	}

	/**
	 * Initialize class.
	 */
	protected function primary_init() {
		add_action( 'wp_loaded', array( NFD_Plugin_Upgrade::class, 'intercept_query_parameter' ) );
    }

    /**
	 * Manage nfdplugin param
	 *
	 * @return void
	 */
	public static function intercept_query_parameter() {
		// bail if no `nfdplugin` url parameter found, and not on add new page url
		if ( ! isset( $_GET['nfdplugin'] ) ) {
			return;
		}

		// get context for default content
		$context = filter_input( INPUT_GET, 'nfdplugin', FILTER_SANITIZE_STRING );
		// bail if improper context
		if ( ! is_string( $context ) ||
			! in_array( $context, self::$contexts )
		) {
			return;
		}

		// send plugin to upgrade
		$the_upgrade = self::plugin_upgrade( $context );

		// redirect link to plugin page after install
		$redirect_url = \get_admin_url(
			null,
			'plugins.php'
		);

		if ( \wp_safe_redirect( $redirect_url ) ) {
			exit;
		}

	}

    /**
     * Get desired plugin from nfdplugin param.
     *
     */
    public static function plugin_upgrade( $plugin ) {
        $file = self::$nfd_plugins[$plugin]['file'];
        $zip = self::$nfd_plugins[$plugin]['zip'];

        // if not installed, install via zip
        if ( ! self::is_plugin_installed( $file ) ) {
            self::install_plugin( $zip );
        }

        // if not active, activate
        if ( ! \is_plugin_active( $file ) ) {
            \activate_plugin( $file );
        }

        // now self deactivate
        self::self_deactivate();
    }

    /**
     * Determine if plugin is installed
     *
     * @param string $slug - slug/path for the plugin to check
     * @return boolean - for if plugin is installed
     */
    public static function is_plugin_installed( $slug ) {
        if ( ! function_exists( 'get_plugins' ) ) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        $all_plugins = \get_plugins();
        if ( ! empty( $all_plugins[ $slug ] ) ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Install plugin with provided zip
     *
     * @param string $plugin_zip - url to zip file to install
     * @return boolean - if install is successful
     */
    public static function install_plugin( $plugin_zip ) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/misc.php';
        require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        // New Skin that doesn't give feedback and redirects on completion
        // require_once 'class-plugin-quiet-upgrader-skin.php';

        \wp_cache_flush();
        // $quiet_skin = new \Plugin_Quiet_Upgrader_Skin();
        // $upgrader   = new \Plugin_Upgrader( $quiet_skin );
        $upgrader   = new \Plugin_Upgrader();
        $installed  = $upgrader->install( $plugin_zip );

        return $installed;
    }

	/**
	 * Deactivate this plugin
	 */
	public function self_deactivate() {
		require_once ABSPATH . '/wp-admin/includes/plugin.php';
		if ( function_exists( 'deactivate_plugins' ) ) {
			deactivate_plugins( self::$file );
		}
	}

	/**
	 * Display error messages in the admin
	 */
	public function admin_notices() {
		echo '<div class="error">';
		foreach ( $this->errors->get_error_messages() as $msg ) {
			echo '<p>' . esc_html( $msg ) . '</p>';
		}
		echo '<p>';
		/* translators: plugin name */
		printf( esc_html__( 'The "%s" plugin has been deactivated.', 'mojo-marketplace-wp-plugin' ), esc_html( $this->name ) );
		echo '</p></div>';
	}

}
