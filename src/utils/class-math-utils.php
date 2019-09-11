<?php
/**
 * Sanitization Utility class.
 *
 * @since   1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Utils;

use Eightshift_Libs\Core\Service;

/**
 * Class Math_Utils
 *
 * This class handles srtings.
 *
 * @since 1.0.0
 */
class Math_Utils implements Service {

  /**
   * Register all the hooks
   *
   * @return void
   *
   * @since 1.0.0
   */
  public function register() {
    add_filter( 'qz_get_gercentage', [ $this, 'get_gercentage' ], 10, 2 );
  }

  /**
   * Calculates percentage of 2 numbers
   *
   * @param int $value number for which we calculate percent.
   * @param int $out_off number off which we calculate percent.
   * @return int returns percent number.
   */
  public static function get_gercentage( int $value, int $out_off ) : int {

    return ( $value * 100 ) / $out_off;

  }
}
