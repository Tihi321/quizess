<?php
/**
 * Plugin main file starting point
 *
 * @since             1.0.0
 * @package           Quizess
 *
 * @wordpress-plugin
 * Plugin Name:       Quizess
 * Plugin URI:
 * Description:       Quizess plugin provides all functionality for Quizess theme.
 * Version:           1.0.0
 * Author:            Tihomir Selak <tknox.dr@gmail.com>
 * Author URI:        https://tihomir-selak.form.hr/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       quizess
 */

namespace Quizess;

use Quizess\Includes as Includes;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
  die;
}

/**
 * Global assets public path
 *
 * @since 1.0.0
 */
define( 'QZ_ASSETS_PUBLIC_PATH', __DIR__ . '/skin/public/' );

/**
 * Include the autoloader so we can dynamically include the rest of the classes.
 *
 * @since 1.0.0
 */
require __DIR__ . '/vendor/autoload.php';

/**
 * Define enviroment.
 *
 * @since 1.0.0
 */
define( 'QIZ_ENV', 'develop' );

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since 1.0.0
 */
function init_plugin() {
  ( new Includes\Main() )->run();
  // ( new Quizess\Core\Main() )->register();
}

init_plugin();
