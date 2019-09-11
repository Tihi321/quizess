<?php
/**
 * The Manifest Helper specific functionality.
 * Important note: Use only in views where you cant control rendering methods.
 *
 * @since   1.0.0
 * @package Quizess\Assets
 */

namespace Quizess\Assets;

use Quizess\Assets\Manifest;

/**
 * Class Manifest_Helper
 *
 * @since 1.0.0
 */
class Manifest_Helper {

  /**
   * Get assets manifest value by providing a object key.
   *
   * @param string $key File name key you want to get from manifest.
   *
   * @return string
   *
   * @since 1.0.0
   */
  public static function get_assets_manifest_item( string $key ) : string {
    $manifest = new Manifest();
    return $manifest->get_assets_manifest_item( $key );
  }
}
