<?php
/**
 * File containing invalid uri class
 *
 * @since 1.0.0
 * @package Quizess\Exception
 */

declare( strict_types=1 );

namespace Quizess\Exception;

/**
 * Class Invalid_URI.
 */
class Invalid_URI extends \InvalidArgumentException implements General_Exception {

  /**
   * Create a new instance of the exception for a file that is not accessible
   * or not readable.
   *
   * @param string $uri URI of the file that is not accessible or not
   *                    readable.
   *
   * @return static
   */
  public static function from_uri( $uri ) {
    $message = sprintf(
      'The View URI "%s" is not accessible or readable.',
      $uri
    );

    return new static( $message );
  }
}
