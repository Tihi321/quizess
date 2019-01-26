<?php
/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since   1.0.0
 * @package Quizess\Includes
 */

namespace Quizess\Includes;

use Quizess\Includes\Config;

/**
 * Class Internationalization
 */
class Internationalization extends Config {

  /**
   * Load the plugin text domain for translation.
   *
   * @since 1.0.0
   */
  public function load_plugin_textdomain() {
    load_plugin_textdomain(
      static::PLUGIN_NAME,
      false,
      dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
    );
  }
}
