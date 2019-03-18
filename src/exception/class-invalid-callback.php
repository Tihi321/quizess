<?php
/**
 * File containing the invalid callback exception class
 *
 * @since 1.0.0
 * @package Quizess\Exception
 */

namespace Quizess\Exception;

/**
 * Class Invalid_Callback.
 */
class Invalid_Callback extends \InvalidArgumentException implements General_Exception {

  /**
   * Create a new instance of the exception for a callback class name that is
   * not recognized.
   *
   * @param string $callback Class name of the callback that was not recognized.
   *
   * @return static
   */
  public static function from_callback( $callback ) {
    $message = sprintf(
      'The callback "%s" is not recognized and cannot be registered.',
      is_object( $callback )
        ? get_class( $callback )
        : (string) $callback
    );

    return new static( $message );
  }
}
