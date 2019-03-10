<?php
/**
 * The object helper specific functionality inside classes.
 * Used in admin or theme side but only inside a class.
 *
 * @since   3.0.0
 * @package Quizess\Helpers
 */

namespace Quizess\Helpers;

/**
 * Class Object Helper
 */
trait Object_Helper {

  /**
   * Check if XML is valid file used for svg.
   *
   * @param xml $xml Full xml document.
   * @return boolean
   *
   * @since 3.0.0 Moved to trait.
   * @since 1.0.0
   */
  public function is_valid_xml( $xml ) {
    libxml_use_internal_errors( true );
    $doc = new \DOMDocument( '1.0', 'utf-8' );
    $doc->loadXML( $xml );
    $errors = libxml_get_errors();
    return empty( $errors );
  }

  /**
   * Trim urls to be relative for the frontend.
   *
   * @param string $link Url string.
   *
   * @return string
   *
   * @since 1.0.0
   */
  public function trim_url( string $link ) : string {

    if ( ! $link ) {
      return '';
    }

    $parse = \wp_parse_url( $link );
    $path  = $this->get_array_value( 'path', $parse );
    $query = $this->get_array_value( 'query', $parse );

    if ( ! empty( $query ) ) {
      return $query;
    }

    return \rtrim( $path, '/' );
  }

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
   * Saves value to the options table
   *
   * @param string $new_value to be saved to options table.
   * @param string $option_name options table name.
   */
  public static function save_options( string $new_value, string $option_name ) : void {

    $old_value = get_option( $option_name );

    if ( empty( $old_value ) ) {

      delete_option( $option_name );
      add_option( $option_name, $new_value );

    }
    if ( $new_value !== $old_value ) {
      update_option( $option_name, $new_value );
    }

  }

}
