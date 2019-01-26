<?php
/**
 * The general helper specific functionality.
 *
 * @since   1.0.0
 * @package Quizess\Helpers
 */

namespace Quizess\Helpers;

use Quizess\Includes\Config;

/**
 * Class General Helper
 */
class General_Helper extends Config {

  /**
   * Check if array has key and return its value if true.
   * Useful if you want to be sure that key exists and return empty if it doesn't.
   *
   * @param string $key   Array key to check.
   * @param array  $array Array in which the key should be checked.
   * @return string       Value of the key if it exists, empty string if not.
   *
   * @since 1.0.0
   */
  public function get_array_value( $key, $array ) {
    return ( gettype( $array ) === 'array' && array_key_exists( $key, $array ) ) ? $array[ $key ] : '';
  }

  /**
   * Sanitise all values in array.
   *
   * @param array  $array                 Provided array.
   * @param string $sanitization_function Provided sanitization type to use on keys.
   * @return array
   *
   * @since 1.0.0
   */
  public function sanitize_array( $array, $sanitization_function ) {
    foreach ( $array as $key => $value ) {
      if ( is_array( $value ) ) {
          $value = sanitize_array( $value );
      }

      $value = $sanitization_function( $value );
    }

    return $array;
  }

  /**
   * Return full path for specific asset from manifest.json
   * This is used for cache busting assets.
   *
   * @param string $key File name key you want to get from manifest.
   * @return string Full path to asset.
   *
   * @since 1.0.0
   */
  public function get_manifest_assets_data( $key = null ) {
    if ( ! $key ) {
      return;
    }

    $data = json_decode( QI_ASSETS_MANIFEST );

    if ( ! $data ) {
      return;
    }

    $asset = $this->get_array_value( $key, (array) $data );

    if ( ! empty( $asset ) ) {
      return $asset;
    }
  }

  /**
   * Gets this plugin file.
   *
   * @since  1.0.0
   *
   * @return string
   */
  public function get_basename() {
    return plugin_basename( dirname( __FILE__, 3 ) ) . self::PLUGIN_NAME . '.php';
  }

  /**
   * Quizess needs WP 5.0+ or Gutenberg Plugin to work
   */
  public function check_compatibility() {
    global $wp_version;

    if ( ! version_compare( $wp_version, '5.0', '>=' ) && ! is_plugin_active( 'gutenberg/gutenberg.php' ) ) {
      return false;
    }
    return true;
  }

  /**
   * Deactivate if gutenberg not detected
   */
  public function no_gutenberg_deactivation() {

    // checks if gutenberg is activated.
    if ( ! $this->check_compatibility() ) {
      deactivate_plugins( $this->get_basename() );
      add_action( 'admin_notices', array( $this, 'compatibility_notice' ) );
    }

  }

  /**
   * Cmpatibility notice
   *
   * @return void
   */
  public function compatibility_notice() {
    ?>
    <div class="error notice is-dismissible">
        <p><?php esc_html_e( 'All Gutenberg Blocks requires WordPress 5.0 or Gutenberg plugin to be activated', 'quizess' ); ?></p>
    </div>
    <?php

  }
}
