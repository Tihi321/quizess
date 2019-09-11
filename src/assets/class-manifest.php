<?php
/**
 * The Manifest data specific functionality.
 * Used in admin or theme side.
 *
 * @since   1.0.0
 * @package Quizess\Assets
 */

namespace Quizess\Assets;

use Eightshift_Libs\Assets\Manifest as LibManifest;
use Eightshift_Libs\Core\Service;

/**
 * Class Mainfest
 *
 * @since 1.0.0
 */
class Manifest extends LibManifest {
  /**
   * Get Assets Manifest global variable name.
   *
   * @return string
   *
   * @since 1.0.0
   */
  protected function get_global_variable_name() : string {
    return 'QZ_ASSETS_PUBLIC_PATH';
  }

  /**
   * Get manifest.json url location.
   * If you are using a plugin or a different manifest location provide location with this method.
   *
   * @return string
   *
   * @since 0.6.0 Changed from abstract method to prefilled.
   * @since 0.1.0
   */
  protected function get_manifest_url() : string {
    return apply_filters( 'qz_get_base_url', 'path' ) . '/skin/public/manifest.json';
  }
}
